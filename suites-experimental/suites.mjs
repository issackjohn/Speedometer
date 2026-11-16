import { BenchmarkTestStep } from "../resources/benchmark-runner.mjs";
import { getTodoText } from "../resources/shared/translations.mjs";
import { getNumberOfItemsToAdd } from "../resources/shared/todomvc-utils.mjs";
import { freezeSuites } from "../resources/suites-helper.mjs";

let responsiveResizeGeneration = 0;

async function resizeResponsivePageInSteps(page, widths, expectedCompactLayoutState, expectCompactLayoutTransition) {
    const generation = ++responsiveResizeGeneration;
    const completion = page.call("beginResponsiveResize", generation, widths.at(-1), {
        expectedCompactLayoutState,
        expectCompactLayoutTransition,
    });
    for (const width of widths) {
        page.setWidth(width);
        page.layout();
    }
    page.call("finishResponsiveResize", generation);
    await completion;
}

export const ExperimentalSuites = freezeSuites([
    {
        name: "TodoMVC-LocalStorage",
        url: "suites-experimental/todomvc-localstorage/dist/index.html",
        resources: "suites-experimental/todomvc-localstorage/dist/resources.txt",
        tags: ["todomvc", "experimental"],
        async prepare(page) {
            (await page.waitForElement(".new-todo")).focus();
            page.getLocalStorage().getItem("javascript-es5");
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const newTodo = page.querySelector(".new-todo");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    newTodo.setValue(getTodoText("ja", i));
                    newTodo.dispatchEvent("change");
                    newTodo.enter("keypress");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const checkboxes = page.querySelectorAll(".toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++)
                    checkboxes[i].click();
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const deleteButtons = page.querySelectorAll(".destroy");
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
                    deleteButtons[i].click();
            }),
        ],
    },
    {
        name: "TodoMVC-Emoji",
        url: "suites/todomvc/vanilla-examples/javascript-web-components/dist/index.html",
        resources: "suites/todomvc/vanilla-examples/javascript-web-components/dist/resources.txt",
        tags: ["todomvc", "experimental"],
        async prepare(page) {
            await page.waitForElement("todo-app");
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const input = page.querySelector(".new-todo-input", ["todo-app", "todo-topbar"]);
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    input.setValue(getTodoText("emoji", i));
                    input.dispatchEvent("input");
                    input.enter("keyup");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    const item = items[i].querySelectorInShadowRoot(".toggle-todo-input");
                    item.click();
                }
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                    const item = items[i].querySelectorInShadowRoot(".remove-todo-button");
                    item.click();
                }
            }),
        ],
    },
    {
        name: "TodoMVC-WebComponents-PostMessage",
        url: "suites/todomvc/vanilla-examples/javascript-web-components/dist/index.html",
        resources: "suites/todomvc/vanilla-examples/javascript-web-components/dist/resources.txt",
        tags: ["experimental", "todomvc", "webcomponents"],
        async prepare() {},
        type: "remote",
        /* config: {
            name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "TodoMVC-Jaspr-Dart2JS-O4",
        url: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2js-O4/index.html",
        resources: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2js-O4/resources.txt",
        tags: ["todomvc", "experimental"],
        async prepare(page) {
            (await page.waitForElement(".new-todo")).focus();
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const newTodo = page.querySelector(".new-todo");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    newTodo.setValue(getTodoText("ja", i));
                    newTodo.dispatchEvent("change");
                    newTodo.enter("keypress");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const checkboxes = page.querySelectorAll(".toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++)
                    checkboxes[i].click();
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const deleteButtons = page.querySelectorAll(".destroy");
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
                    deleteButtons[i].click();
            }),
        ],
    },
    {
        name: "TodoMVC-Jaspr-Dart2Wasm-O2",
        url: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2wasm-O2/index.html",
        resources: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2wasm-O2/resources.txt",
        tags: ["todomvc", "experimental"],
        disabled: true,
        async prepare(page) {
            (await page.waitForElement(".new-todo")).focus();
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const newTodo = page.querySelector(".new-todo");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    newTodo.setValue(getTodoText("ja", i));
                    newTodo.dispatchEvent("change");
                    newTodo.enter("keypress");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const checkboxes = page.querySelectorAll(".toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++)
                    checkboxes[i].click();
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const deleteButtons = page.querySelectorAll(".destroy");
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
                    deleteButtons[i].click();
            }),
        ],
    },
    {
        name: "NewsSite-PostMessage",
        url: "suites/newssite/news-next/dist/index.html",
        resources: "suites/newssite/news-next/dist/resources.txt",
        tags: ["experimental", "newssite", "language"],
        async prepare() {},
        type: "remote",
        /* config: {
          name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "TodoMVC-WebComponents-IndexedDB",
        url: "suites-experimental/javascript-wc-indexeddb/dist/index.html?useAsyncSteps=true&storageType=vanilla",
        resources: "suites-experimental/javascript-wc-indexeddb/dist/resources.txt",
        tags: ["todomvc", "webcomponents", "experimental"],
        async prepare() {},
        type: "remote",
        /* config: {
          name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "TodoMVC-WebComponents-DexieJS",
        url: "suites-experimental/javascript-wc-indexeddb/dist/index.html?useAsyncSteps=true&storageType=dexie",
        resources: "suites-experimental/javascript-wc-indexeddb/dist/resources.txt",
        tags: ["todomvc", "webcomponents", "experimental"],
        async prepare() {},
        type: "remote",
        /* config: {
          name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "Responsive-Design",
        url: "suites-experimental/responsive-design/dist/index.html",
        resources: "suites-experimental/responsive-design/dist/resources.txt",
        tags: ["responsive-design", "webcomponents", "experimental"],
        type: "async",
        asyncScheduler: "async-task",
        async prepare(page) {
            await page.waitForElement("cooking-app");
        },
        tests: [
            new BenchmarkTestStep("LoadChatAndExpandRecipes", async (page) => {
                const resumePreviousChatBtn = page.querySelector("#resume-previous-chat-btn", ["cooking-app", "chat-window"]);
                resumePreviousChatBtn.click();
                page.layout();

                const nextRestaurantBtn = page.querySelector("#next-restaurant-btn", ["cooking-app", "information-window"]);
                const restaurantCards = page.querySelectorAll("restaurant-card", ["cooking-app", "information-window"]);
                const numOfRestaurantCards = restaurantCards.length - 1;
                for (let i = 0; i < numOfRestaurantCards; i++) {
                    nextRestaurantBtn.click();
                    page.layout();
                }

                const showMoreBtn = page.querySelectorAll(".show-more-btn", ["cooking-app", "main-content", "recipe-grid"]);
                for (const btn of showMoreBtn) {
                    btn.click();
                    page.layout();
                }
            }),
            new BenchmarkTestStep("ReduceWidthIn5Steps", async (page) => {
                await resizeResponsivePageInSteps(page, [768, 704, 640], true, true);
                await resizeResponsivePageInSteps(page, [560, 480], true, false);

                await page.call("assertResponsiveResizeSettled", responsiveResizeGeneration);
            }),
            new BenchmarkTestStep("ScrollToChatAndSendMessages", async (page) => {
                const cvWorkComplete = new Promise((resolve) => {
                    page.addEventListener("video-grid-content-visibility-complete", resolve, { once: true });
                });

                const nextItemBtn = page.querySelector("#next-item-carousel-btn", ["cooking-app", "main-content", "recipe-carousel"]);
                const recipeCarouselItems = page.querySelectorAll(".carousel-item", ["cooking-app", "main-content", "recipe-carousel"]);
                const numOfCarouselItems = recipeCarouselItems.length - 3;
                for (let i = 0; i < numOfCarouselItems; i++) {
                    nextItemBtn.click();
                    page.layout();
                }

                // Collapse recipes
                const showMoreBtnCollapse = page.querySelectorAll(".show-more-btn", ["cooking-app", "main-content", "recipe-grid"]);
                for (const btn of showMoreBtnCollapse) {
                    btn.click();
                    page.layout();
                }

                const chatWindow = page.querySelector("#chat-window", ["cooking-app", "chat-window"]);
                chatWindow.scrollIntoView({ behavior: "instant" });
                page.layout();

                const messagesToBeSent = ["Please generate an image of Tomato Soup.", "Try again, but make the soup look thicker.", "Try again, but make the soup served in a rustic bowl and include a sprinkle of fresh herbs on top."];
                const chatInput = page.querySelector("#chat-input", ["cooking-app", "chat-window"]);
                for (const message of messagesToBeSent) {
                    chatInput.setValue(message);
                    chatInput.dispatchEvent("input");
                    chatInput.enter("keydown");
                    page.layout();
                }

                // Safari can overscroll the chat element here and never send the
                // video grid's contentvisibilityautostatechange event. See
                // https://github.com/WebKit/Speedometer/issues/525. Remove this
                // fallback once Speedometer CI runs a Safari with that WebKit fix.
                await Promise.race([cvWorkComplete, page.afterNextRenderingOpportunity()]);
            }),
            new BenchmarkTestStep("IncreaseWidthIn5Steps", async (page) => {
                await resizeResponsivePageInSteps(page, [560, 640, 704], false, true);
                await resizeResponsivePageInSteps(page, [768, 800], false, false);

                await page.call("assertResponsiveResizeSettled", responsiveResizeGeneration);
            }),
        ],
    },
]);
