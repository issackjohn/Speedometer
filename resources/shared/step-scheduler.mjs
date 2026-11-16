class StepScheduler {
    constructor(syncCallback, asyncCallback, params) {
        this._syncCallback = syncCallback;
        this._asyncCallback = asyncCallback;
        this._params = params;
    }

    start() {
        return new Promise((resolve, reject) => {
            if (this._params.waitBeforeSync)
                setTimeout(() => this._scheduleCallbacks(resolve, reject), this._params.waitBeforeSync);
            else
                this._scheduleCallbacks(resolve, reject);
        });
    }
}

class RAFStepScheduler extends StepScheduler {
    _scheduleCallbacks(resolve) {
        requestAnimationFrame(() => this._syncCallback());
        requestAnimationFrame(() => {
            setTimeout(() => {
                this._asyncCallback();
                setTimeout(resolve, 0);
            }, 0);
        });
    }
}

class AsyncRAFStepScheduler extends StepScheduler {
    static mc = new MessageChannel();
    _scheduleCallbacks(resolve) {
        let gotTimer = false;
        let gotMessage = false;
        let gotPromise = false;

        const tryTriggerAsyncCallback = () => {
            if (!gotTimer || !gotMessage || !gotPromise)
                return;

            this._asyncCallback();
            setTimeout(resolve, 0);
        };

        requestAnimationFrame(async () => {
            await this._syncCallback();
            gotPromise = true;
            tryTriggerAsyncCallback();
        });

        requestAnimationFrame(() => {
            setTimeout(async () => {
                await Promise.resolve();
                gotTimer = true;
                tryTriggerAsyncCallback();
            });

            AsyncRAFStepScheduler.mc.port1.addEventListener(
                "message",
                async function () {
                    await Promise.resolve();
                    gotMessage = true;
                    tryTriggerAsyncCallback();
                },
                { once: true }
            );
            AsyncRAFStepScheduler.mc.port1.start();
            AsyncRAFStepScheduler.mc.port2.postMessage("speedometer");
        });
    }
}

class AsyncTaskStepScheduler extends StepScheduler {
    static mc = new MessageChannel();

    _scheduleCallbacks(resolve, reject) {
        AsyncTaskStepScheduler.mc.port1.addEventListener("message", async () => {
            try {
                await this._syncCallback();
                this._asyncCallback();
                setTimeout(resolve, 0);
            } catch (error) {
                reject(error);
            }
        }, { once: true });
        AsyncTaskStepScheduler.mc.port1.start();
        AsyncTaskStepScheduler.mc.port2.postMessage(null);
    }
}

export const STEP_SCHEDULER_LOOKUP = {
    __proto__: null,
    raf: RAFStepScheduler,
    async: AsyncRAFStepScheduler,
    "async-task": AsyncTaskStepScheduler,
};
