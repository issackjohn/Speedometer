const RESIZE_COMPLETION_TIMEOUT = 5000;
const COMPACT_LAYOUT_QUERY = "(max-width: 640px)";

const completionChannel = new MessageChannel();
const completionTasks = [];
completionChannel.port1.addEventListener("message", () => completionTasks.shift()?.());
completionChannel.port1.start();

const diagnostics = globalThis.__collectResponsiveResizeDiagnostics ? [] : null;
let lastGeneration = 0;
let activeGeneration = null;
let completedGeneration = null;

function queueCompletionTask(callback) {
    completionTasks.push(callback);
    completionChannel.port2.postMessage(null);
}

function postGenerationClosure(state) {
    if (state.closurePosted)
        return;
    state.closurePosted = true;
    state.diagnostic.closurePostedAt = performance.now();
    queueCompletionTask(() => void closeResponsiveResizeGeneration(state.generation));
}

function recordFailure(state, type, participant = null) {
    state.diagnostic.failures.push({
        participant,
        type,
        timestamp: performance.now(),
    });
}

function validateCompletedGeneration() {
    if (!completedGeneration)
        return;

    const { diagnostic } = completedGeneration;
    if (diagnostic.failures.length || diagnostic.lateWork.length)
        throw new Error(`Responsive resize generation ${diagnostic.generation} did not settle cleanly: ${JSON.stringify({ failures: diagnostic.failures, lateWork: diagnostic.lateWork })}.`);
}

async function closeResponsiveResizeGeneration(generation) {
    const state = activeGeneration;
    if (!state || state.generation !== generation)
        return;

    state.registrationClosed = true;
    state.diagnostic.registrationClosedAt = performance.now();
    state.diagnostic.finalInnerWidth = innerWidth;
    state.diagnostic.finalInnerHeight = innerHeight;
    if (innerWidth !== state.requestedWidth)
        recordFailure(state, "unexpected-final-inner-width");

    const compactLayoutState = matchMedia(COMPACT_LAYOUT_QUERY).matches;
    state.diagnostic.finalCompactLayoutState = compactLayoutState;
    if (compactLayoutState !== state.expectedCompactLayoutState)
        recordFailure(state, "unexpected-media-query-state", "recipe-grid");
    if ((compactLayoutState !== state.initialCompactLayoutState) !== state.expectCompactLayoutTransition)
        recordFailure(state, "unexpected-media-query-transition", "recipe-grid");
    if (state.expectCompactLayoutTransition && !state.participants.has("recipe-grid"))
        recordFailure(state, "missing-media-query-participant", "recipe-grid");
    for (const [participant, registration] of state.participants) {
        if (!registration.commitPromise)
            recordFailure(state, "missing-commit-promise", participant);
    }

    if (state.diagnostic.loopErrors.length)
        recordFailure(state, "resize-observer-loop-error");

    try {
        await Promise.all([...state.participants.values()].map(({ commitPromise }) => commitPromise));
        document.documentElement.getBoundingClientRect();
        if (state.diagnostic.failures.length)
            throw new Error(`Responsive resize generation ${generation} failed: ${JSON.stringify(state.diagnostic.failures)}.`);

        state.diagnostic.completedAt = performance.now();
        clearTimeout(state.timeout);
        activeGeneration = null;
        completedGeneration = state;
        state.resolve(state.diagnostic);
    } catch (error) {
        clearTimeout(state.timeout);
        activeGeneration = null;
        completedGeneration = state;
        state.reject(error);
    }
}

function beginResponsiveResize(generation, requestedWidth, options) {
    if (!Number.isInteger(generation) || generation <= lastGeneration)
        throw new Error(`Responsive resize generation ${generation} must be greater than ${lastGeneration}.`);
    if (activeGeneration)
        throw new Error(`Responsive resize generation ${activeGeneration.generation} is still active.`);
    validateCompletedGeneration();
    completedGeneration = null;

    const { expectedCompactLayoutState, expectCompactLayoutTransition } = options;
    const initialCompactLayoutState = matchMedia(COMPACT_LAYOUT_QUERY).matches;
    lastGeneration = generation;
    const diagnostic = {
        generation,
        requestedWidth,
        initialCompactLayoutState,
        expectedCompactLayoutState,
        expectCompactLayoutTransition,
        initialInnerWidth: innerWidth,
        initialInnerHeight: innerHeight,
        starts: [],
        commits: [],
        failures: [],
        lateWork: [],
        loopErrors: [],
        startedAt: performance.now(),
    };
    diagnostics?.push(diagnostic);
    requestAnimationFrame(() => {
        diagnostic.prearmedAnimationFrameAt = performance.now();
    });

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            diagnostic.timedOutAt = performance.now();
            activeGeneration = null;
            reject(new Error(`Timed out after ${RESIZE_COMPLETION_TIMEOUT}ms waiting for responsive resize generation ${generation}.`));
        }, RESIZE_COMPLETION_TIMEOUT);
        activeGeneration = {
            generation,
            requestedWidth,
            initialCompactLayoutState,
            expectedCompactLayoutState,
            expectCompactLayoutTransition,
            participants: new Map(),
            registrationClosed: false,
            markerPosted: false,
            closurePosted: false,
            diagnostic,
            resolve,
            reject,
            timeout,
        };
    });
}

function finishResponsiveResize(generation) {
    const state = activeGeneration;
    if (!state || state.generation !== generation)
        throw new Error(`Responsive resize generation ${generation} is not active.`);
    if (state.markerPosted)
        throw new Error(`Responsive resize generation ${generation} already has a completion marker.`);

    state.markerPosted = true;
    if (state.expectCompactLayoutTransition) {
        if (state.participants.has("recipe-grid"))
            postGenerationClosure(state);
        return;
    }

    requestAnimationFrame(() => {
        state.diagnostic.markerAnimationFrameAt = performance.now();
        state.diagnostic.finalInnerWidth = innerWidth;
        state.diagnostic.finalInnerHeight = innerHeight;
        if (innerWidth !== state.requestedWidth)
            recordFailure(state, "unexpected-final-inner-width");
        postGenerationClosure(state);
    });
}

export function startResponsiveResize(participant) {
    const state = activeGeneration;
    if (!state) {
        if (completedGeneration && frameElement?.style.width === `${completedGeneration.requestedWidth}px`) {
            completedGeneration.diagnostic.lateWork.push({
                participant,
                phase: "start",
                timestamp: performance.now(),
            });
        }
        return null;
    }
    if (frameElement?.style.width !== `${state.requestedWidth}px`)
        return null;
    if (state.registrationClosed) {
        state.diagnostic.lateWork.push({
            participant,
            phase: "start",
            timestamp: performance.now(),
        });
        return null;
    }
    if (state.participants.has(participant)) {
        recordFailure(state, "duplicate-start", participant);
        return null;
    }

    state.participants.set(participant, { commitPromise: null });
    state.diagnostic.starts.push({
        participant,
        timestamp: performance.now(),
    });
    if (participant === "recipe-grid" && state.markerPosted && state.expectCompactLayoutTransition)
        postGenerationClosure(state);
    return state.generation;
}

export function attachResponsiveResizeCommit(participant, generation, commitPromise) {
    const state = activeGeneration;
    if (!state || state.generation !== generation) {
        if (completedGeneration?.generation === generation) {
            completedGeneration.diagnostic.lateWork.push({
                participant,
                phase: "commit",
                timestamp: performance.now(),
            });
        }
        return;
    }

    const registration = state.participants.get(participant);
    if (!registration) {
        recordFailure(state, "commit-without-start", participant);
        return;
    }
    if (registration.commitPromise) {
        recordFailure(state, "duplicate-commit", participant);
        return;
    }

    registration.commitPromise = Promise.resolve(commitPromise).then(() => {
        state.diagnostic.commits.push({
            participant,
            timestamp: performance.now(),
        });
    });
}

export async function awaitStableUpdate(element) {
    while (!await element.updateComplete) {
        // Lit resolves false when an update schedules another update.
    }
}

function assertResponsiveResizeSettled(generation) {
    if (!completedGeneration || completedGeneration.generation !== generation)
        throw new Error(`Responsive resize generation ${generation} is not the most recently completed generation.`);
    validateCompletedGeneration();
    completedGeneration.diagnostic.settledAt = performance.now();
    return completedGeneration.diagnostic;
}

addEventListener("error", (event) => {
    if (!activeGeneration || !String(event.message).startsWith("ResizeObserver loop"))
        return;
    activeGeneration.diagnostic.loopErrors.push({
        message: event.message,
        timestamp: performance.now(),
    });
});

globalThis.beginResponsiveResize = beginResponsiveResize;
globalThis.finishResponsiveResize = finishResponsiveResize;
globalThis.assertResponsiveResizeSettled = assertResponsiveResizeSettled;
globalThis.__responsiveResizeDiagnostics = diagnostics;
