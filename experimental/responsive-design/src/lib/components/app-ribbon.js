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
    }

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                this._updateVisibleButtons(width);
            }
        });
        this.resizeObserver.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.resizeObserver)
            this.resizeObserver.disconnect();
    }

    _updateVisibleButtons(width) {
        const breakpoints = [
            { minWidth: 1120, buttons: 12 },
            { minWidth: 1069, buttons: 11 },
            { minWidth: 985, buttons: 10 },
            { minWidth: 905, buttons: 9 },
            { minWidth: 818, buttons: 8 },
            { minWidth: 735, buttons: 7 },
            { minWidth: 660, buttons: 6 },
            { minWidth: 540, buttons: 5 },
            { minWidth: 497, buttons: 4 },
        ];

        const breakpoint = breakpoints.find((bp) => width >= bp.minWidth);
        this.visibleButtons = breakpoint ? this.buttons.slice(0, breakpoint.buttons) : this.buttons.slice(0, 3);
        this.requestUpdate();
    }

    _getVisibleButtonsTemplate() {
        return this.visibleButtons.map(
            (button, index) => html`
                <ribbon-button id="${button.id}" text="${button.text}" variant="${button.variant}" iconPosition="${button.iconPosition}"></ribbon-button>
                ${index === 0 ? html`<div class="mx-0.5 h-6 border-l border-gray-300"></div>` : ""}
            `
        );
    }

    render() {
        return html`
            <nav class="mt-1 flex items-center justify-between p-1">
                <div class="flex flex-nowrap items-baseline overflow-x-hidden">${this._getVisibleButtonsTemplate()}</div>
                <div class="3xl:hidden">
                    <button class="mx-1 inline-flex rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300">
                        <!-- Heroicons are MIT licensed. See https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
                        <span class="h-6 w-6" style="background: url(./public/images/icons-outline.webp); background-position: -96px 0px;"></span>
                    </button>
                </div>
            </nav>
        `;
    }
}

customElements.define("app-ribbon", AppRibbon);