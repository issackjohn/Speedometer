import { html } from "lit";
import { when } from "lit/directives/when.js";
import { LightDOMLitElement } from "./base";
import { ribbonButtons } from "../../data/ribbon-buttons.js";
import "./ribbon-button.js";

class AppRibbon extends LightDOMLitElement {
    static properties = {
        buttons: { type: Array },
        visibleButtons: { type: Array },
        _isOverflowOpen: { type: Boolean },
    };

    constructor() {
        super();
        this.buttons = ribbonButtons;
        this.visibleButtons = this.buttons;
        this._isOverflowOpen = false;
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize && entry.contentBoxSize[0])
                    this._updateVisibleButtons(entry.contentBoxSize[0].inlineSize);
                else
                    this._updateVisibleButtons(entry.contentRect.width);
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.hasUpdated)
            this._resizeObserver.observe(this);
    }

    firstUpdated() {
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }

    async _updateVisibleButtons(width) {
        const breakpoints = [
            { minWidth: 1134, buttons: 12 },
            { minWidth: 1069, buttons: 11 },
            { minWidth: 985, buttons: 10 },
            { minWidth: 905, buttons: 9 },
            { minWidth: 818, buttons: 8 },
            { minWidth: 735, buttons: 7 },
            { minWidth: 660, buttons: 6 },
            { minWidth: 540, buttons: 5 },
            { minWidth: 440, buttons: 4 },
            { minWidth: 318, buttons: 3 },
        ];

        // ResizeObserver is used primarily to exercise this API as part of the benchmark.
        // While CSS or window.matchMedia could potentially be used instead.
        const breakpoint = breakpoints.find((bp) => width >= bp.minWidth);
        const newButtonCount = breakpoint ? breakpoint.buttons : 2;

        if (this.visibleButtons.length !== newButtonCount) {
            const overflowTrigger = this.querySelector('[aria-controls="overflow-navigation"]');
            const overflowPanel = this.querySelector("#overflow-navigation");
            const activeElement = this.getRootNode().activeElement;
            const visibleButtons = [...this.querySelectorAll("ribbon-button button")];
            const focusedButtonIndex = visibleButtons.indexOf(activeElement);
            const shouldRestoreFocus =
                activeElement === overflowTrigger ||
                overflowPanel?.contains(activeElement) ||
                focusedButtonIndex >= newButtonCount;
            this.visibleButtons = this.buttons.slice(0, newButtonCount);
            this._isOverflowOpen = false;
            if (shouldRestoreFocus) {
                await this.updateComplete;
                const nextOverflowTrigger = this.querySelector('[aria-controls="overflow-navigation"]');
                const visibleButtons = this.querySelectorAll("ribbon-button button");
                (nextOverflowTrigger ?? visibleButtons[visibleButtons.length - 1])?.focus();
            }
        }
    }

    async _toggleOverflow() {
        const wasOpen = this._isOverflowOpen;
        this._isOverflowOpen = !this._isOverflowOpen;
        if (wasOpen) {
            await this.updateComplete;
            this.querySelector('[aria-controls="overflow-navigation"]')?.focus();
        }
    }

    _getVisibleButtonsTemplate() {
        return this.visibleButtons.map(
            (button, index) => html`
                <ribbon-button id="${button.id}" text="${button.text}" variant="${button.variant}" iconPosition="${button.iconPosition}"></ribbon-button>
                ${when(index === 0, () => html`<div class="mx-0.5 h-6 border-l border-gray-300"></div>`)}
            `
        );
    }

    _getOverflowTemplate() {
        const hiddenButtons = this.buttons.slice(this.visibleButtons.length);
        if (!hiddenButtons.length)
            return null;

        return html`
            <div class="relative ml-auto">
                <button
                    @click="${this._toggleOverflow}"
                    aria-controls="overflow-navigation"
                    aria-expanded="${this._isOverflowOpen}"
                    aria-label="More navigation options"
                    title="More navigation options"
                    class="mx-1 inline-flex items-center justify-center rounded-md bg-teal-700 px-2 py-1 text-white shadow-md ring-1 ring-inset ring-gray-300 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                    <svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="5" cy="12" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="19" cy="12" r="1.5" />
                    </svg>
                </button>
                ${when(
        this._isOverflowOpen,
        () => html`
                        <div id="overflow-navigation" class="min-w-40 absolute right-1 top-full z-20 mt-1 rounded-md bg-white p-1 shadow-lg ring-1 ring-gray-300">
                            ${hiddenButtons.map(
        (button) => html`
                                    <button
                                        @click="${this._toggleOverflow}"
                                        class="focus-visible:outline-inset block w-full rounded px-3 py-2 text-left text-sm font-medium text-gray-800 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
                                    >
                                        ${button.text}
                                    </button>
                                `
    )}
                        </div>
                    `
    )}
            </div>
        `;
    }

    render() {
        return html`
            <nav class="relative mt-1 flex items-center justify-between p-1">
                <div class="flex flex-nowrap items-baseline overflow-x-hidden">${this._getVisibleButtonsTemplate()}</div>
                ${this._getOverflowTemplate()}
            </nav>
        `;
    }
}

customElements.define("app-ribbon", AppRibbon);
