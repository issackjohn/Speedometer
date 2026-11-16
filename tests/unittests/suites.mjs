import { ExperimentalSuites } from "../../suites-experimental/suites.mjs";
import { DefaultSuites } from "../../suites/default-suites.mjs";
import { BenchmarkRunner } from "../../resources/benchmark-runner.mjs";
import { SuiteRunner } from "../../resources/suite-runner.mjs";
import { skipInShell } from "../../resources/shared/helpers.mjs";

const Suites = {
    ExperimentalSuites,
    DefaultSuites,
};

for (const [name, suites] of Object.entries(Suites)) {
    describe(`${name}-common`, () => {
        it("should be frozen", () => {
            // FIXME: freeze suite
            // expect(Object.isFrozen(suites)).to.be(true);
        });
        it("should have tags array", () => {
            suites.forEach((suite) => {
                expect(suite.tags).to.be.an("array");
            });
        });
        it("should have frozen tags array", () => {
            // FIXME: freeze suite and tags
            // suites.forEach((suite) => {
            //     expect(Object.isFrozen(suite.tags)).to.be(true);
            // });
        });
        it("should have frozen steps array", () => {
            suites.forEach((suite) => {
                expect(Object.isFrozen(suite.steps)).to.be(true);
            });
        });
        it("should not have duplicate tags", () => {
            suites.forEach((suite) => {
                const uniqueTags = new Set(suite.tags);
                expect(suite.tags).to.eql(Array.from(uniqueTags));
            });
        });
        it("should have 'all' tag", () => {
            // FIXME: freeze suite and tags
            // suites.forEach((suite) => {
            //     expect(suite.tags.includes("all")).to.be(true);
            // });
        });
        it("should not have enabled property", () => {
            suites.forEach((suite) => {
                expect(suite.enabled).to.be(undefined);
            });
        });
        it("should have a name string", () => {
            suites.forEach((suite) => {
                expect(suite.name).to.be.a("string");
                expect(suite.name.length).to.be.greaterThan(0);
            });
        });
        it("should have unique names", () => {
            const uniqueNames = new Set();
            suites.forEach((suite) => {
                expect(uniqueNames.has(suite.name)).to.be(false);
                uniqueNames.add(suite.name);
            });
        });
        it("should have a url string", () => {
            suites.forEach((suite) => {
                expect(suite.url).to.be.a("string");
                expect(suite.url.length).to.be.greaterThan(0);
            });
        });
    });
}

describe("ExperimentalSuites", () => {
    it("should have 'experimental' tag", () => {
        ExperimentalSuites.forEach((suite) => {
            expect(suite.tags.includes("experimental")).to.be(true);
        });
    });
    it("should not have 'default' tag", () => {
        ExperimentalSuites.forEach((suite) => {
            expect(suite.tags.includes("default")).to.be(false);
        });
    });
});

describe("Responsive-Design", () => {
    describe("resize steps", () => {
        before(function () {
            skipInShell(this);
        });

        afterEach(() => sinon.restore());

        const RESIZE_STEP_NAMES = ["ReduceWidthIn5Steps", "IncreaseWidthIn5Steps"];

        // Minimal stand-in for the Responsive-Design app: a full-width .carousel at the path the
        // suite queries and generation acknowledgements from each responsive participant.
        function createFixture(frame, completionMode) {
            const contentWindow = frame.contentWindow;
            const doc = frame.contentDocument;
            doc.body.style.margin = "0";
            let parent = doc.body;
            for (const tagName of ["cooking-app", "main-content", "recipe-carousel"]) {
                const element = doc.createElement(tagName);
                element.style.display = "block";
                parent.appendChild(element);
                parent = element;
            }
            const carousel = doc.createElement("div");
            carousel.className = "carousel";
            parent.appendChild(carousel);

            const fixture = {
                compactQuery: contentWindow.matchMedia("(max-width: 640px)"),
                changeCount: 0,
                completedGenerations: [],
                loopErrors: [],
                observations: [],
            };
            const completionChannel = new contentWindow.MessageChannel();
            let activeGeneration;
            let completedGeneration;
            const completeGeneration = () => {
                if (!activeGeneration || activeGeneration.pendingParticipants.size)
                    return;
                fixture.completedGenerations.push(activeGeneration.generation);
                completedGeneration = activeGeneration.generation;
                activeGeneration.resolve();
                activeGeneration = null;
            };
            contentWindow.beginResponsiveResize = (generation, requestedWidth, { expectCompactLayoutTransition }) => {
                const completion = new Promise((resolve) => {
                    activeGeneration = {
                        generation,
                        requestedWidth,
                        pendingParticipants: new Set(["app-ribbon", "information-window", "recipe-carousel", ...expectCompactLayoutTransition ? ["recipe-grid"] : []]),
                        resolve,
                    };
                });
                contentWindow.requestAnimationFrame(() => {
                    if (completionMode === "legacy-match-media" && expectCompactLayoutTransition)
                        return;
                    completionChannel.port1.addEventListener("message", completeGeneration, { once: true });
                    completionChannel.port1.start();
                    completionChannel.port2.postMessage(null);
                });
                return completion;
            };
            contentWindow.finishResponsiveResize = () => {};
            const acknowledge = (participant) => {
                if (!activeGeneration || frame.style.width !== `${activeGeneration.requestedWidth}px`)
                    return;
                activeGeneration.pendingParticipants.delete(participant);
            };
            contentWindow.assertResponsiveResizeSettled = (generation) => {
                if (completedGeneration !== generation)
                    throw new Error(`Generation ${generation} did not complete.`);
            };
            new contentWindow.ResizeObserver((entries) => {
                for (const entry of entries)
                    fixture.observations.push({ frameWidth: frame.style.width, width: entry.contentRect.width });
                acknowledge("app-ribbon");
                acknowledge("information-window");
                acknowledge("recipe-carousel");
            }).observe(carousel);
            fixture.compactQuery.addEventListener("change", async () => {
                fixture.changeCount++;
                await Promise.resolve();
                if (completionMode === "legacy-match-media") {
                    fixture.completedGenerations.push(activeGeneration.generation);
                    completedGeneration = activeGeneration.generation;
                    activeGeneration.resolve();
                    activeGeneration = null;
                } else {
                    acknowledge("recipe-grid");
                }
            });
            contentWindow.addEventListener("error", (event) => {
                if (String(event.message).startsWith("ResizeObserver loop"))
                    fixture.loopErrors.push(event.message);
            });
            return fixture;
        }

        async function runResizeSteps(completionMode) {
            const suite = ExperimentalSuites.find((suite) => suite.name === "Responsive-Design");
            const steps = RESIZE_STEP_NAMES.map((name) => suite.tests.find((test) => test.name === name));
            const warn = sinon.stub(console, "warn");
            let fixture;
            // Keep rendering opportunities active in background WebDriver windows; the
            // benchmark page itself has continuous visual work while this fixture does not.
            const wakeTarget = document.createElement("div");
            document.body.appendChild(wakeTarget);
            const wakeAnimation = wakeTarget.animate([{ opacity: 1 }, { opacity: 0.999 }], { duration: 16, iterations: Infinity });
            const runner = new BenchmarkRunner(
                [
                    {
                        name: "Responsive-Design fixture",
                        enabled: true,
                        url: "about:blank",
                        async prepare(page) {
                            page.setWidth(800);
                            for (const step of steps) {
                                await new Promise((resolve, reject) => {
                                    const channel = new MessageChannel();
                                    channel.port1.onmessage = () => Promise.resolve(step.run(page)).then(resolve, reject);
                                    requestAnimationFrame(() => channel.port2.postMessage(null));
                                });
                            }
                        },
                        tests: [],
                    },
                ],
                {}
            );
            sinon.stub(SuiteRunner.prototype, "_loadFrame").callsFake(async function () {
                fixture = createFixture(this.frame, completionMode);
            });
            sinon.stub(SuiteRunner.prototype, "_runSuite").callsFake(async () => {});
            try {
                await runner.runAllSuites();
                return { fixture, warnings: warn.args.map(([message]) => message) };
            } finally {
                wakeAnimation.cancel();
                wakeTarget.remove();
            }
        }

        it("should let ResizeObserver observe the media query breakpoint width", async function () {
            this.timeout(10000);
            const { fixture, warnings } = await runResizeSteps("posted");
            expect(fixture.changeCount).to.be(2);
            expect(fixture.completedGenerations).to.have.length(4);
            expect(fixture.observations.map(({ frameWidth }) => frameWidth)).to.eql(["800px", "640px", "480px", "704px", "800px"]);
            expect(fixture.loopErrors).to.eql([]);
            expect(warnings).to.eql([]);
        });

        it("should reproduce the skipped breakpoint with the legacy matchMedia completion", async function () {
            this.timeout(10000);
            const { fixture, warnings } = await runResizeSteps("legacy-match-media");
            expect(fixture.observations.map(({ frameWidth }) => frameWidth)).to.eql(["800px", "480px", "800px"]);
            expect(warnings).to.eql([]);
        });
    });
});

describe("Suites", () => {
    it("should not have 'experimental' tag", () => {
        DefaultSuites.forEach((suite) => {
            expect(suite.tags.includes("experimental")).to.be(false);
        });
    });
    it("should not have enabled property", () => {
        ExperimentalSuites.forEach((suite) => {
            expect(suite.enabled).to.be(undefined);
        });
    });
});
