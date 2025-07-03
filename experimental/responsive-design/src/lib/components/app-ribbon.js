import { html } from "lit";
import { LightDOMLitElement } from "./base";
import { ribbonButtons } from "../../data/ribbon-buttons.js";
import "./ribbon-button.js";

export class AppRibbon extends LightDOMLitElement {
    static properties = {
        buttons: { type: Array },
        visibleButtons: { type: Array },
    };

    constructor() {
        super();
        this.buttons = ribbonButtons;
        this.visibleButtons = this.buttons;
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

    _updateVisibleButtons(width) {
        const breakpoints = [
            { minWidth: 1612, buttons: 12 },
            { minWidth: 1478, buttons: 11 },
            { minWidth: 1360, buttons: 10 },
            { minWidth: 1134, buttons: 9 },
            { minWidth: 1069, buttons: 8 },
            { minWidth: 985, buttons: 7 },
            { minWidth: 818, buttons: 6 },
            { minWidth: 735, buttons: 5 },
            { minWidth: 540, buttons: 4 },
            { minWidth: 318, buttons: 3 },
        ];

        // ResizeObserver is used primarily to exercise this API as part of the benchmark.
        // While CSS or window.matchMedia could potentially be used instead.
        const breakpoint = breakpoints.find((bp) => width >= bp.minWidth);
        this.visibleButtons = breakpoint ? this.buttons.slice(0, breakpoint.buttons) : this.buttons.slice(0, 2);
    }

    _getVisibleButtonsTemplate() {
        return this.visibleButtons.map(
            (button, index) => html`
                <ribbon-button id="${button.id}" text="${button.text}" variant="${button.variant}" iconPosition="${button.iconPosition}"></ribbon-button>
                ${index === 0 ? html`<div class="mx-0.5 h-6 w-px bg-teal-600"></div>` : ""}
            `
        );
    }

    render() {
        return html`
            <nav class="mx-1 my-3 rounded-xl border border-teal-700 bg-teal-800 shadow-lg">
                <div class="max-w-full px-6 py-3">
                    <div class="flex items-center justify-between">
                        <div class="flex flex-nowrap items-baseline space-x-2 overflow-x-hidden">${this._getVisibleButtonsTemplate()}</div>
                        <div class="3xl:hidden ml-4">
                            <button
                                class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-teal-600 bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:ring-offset-teal-800"
                            >
                                <!-- Heroicons are MIT licensed. See https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
                                <span class="h-6 w-6" style="background: url(./public/images/icons-outline.webp); background-position: -96px 0px;"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define("app-ribbon", AppRibbon);
