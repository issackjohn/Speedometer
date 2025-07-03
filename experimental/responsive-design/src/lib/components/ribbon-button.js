import { html } from "lit";
import { LightDOMLitElement } from "./base";

export class RibbonButton extends LightDOMLitElement {
    static properties = {
        text: { type: String },
        variant: { type: String },
        iconPosition: { type: String },
    };

    constructor() {
        super();
        this.text = "Button";
        this.variant = "secondary";
        this.iconPosition = "0px 0px";
    }

    _getButtonClasses() {
        const isPrimary = this.variant === "primary";
        const baseClasses = "relative inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-teal-800";

        const variantClasses = isPrimary
            ? "border border-orange-400/40 bg-orange-500 text-white shadow-md hover:bg-orange-600 focus:ring-orange-400/60"
            : "border border-teal-600/40 bg-teal-700/50 text-teal-100 hover:border-teal-500/60 hover:bg-teal-600/70 hover:text-white focus:ring-teal-400/50";

        return `${baseClasses} ${variantClasses}`;
    }

    _getIconStyle() {
        return `background: url(./public/images/icons-outline.webp); background-position: ${this.iconPosition}; background-size: auto; filter: brightness(0) invert(1);`;
    }

    render() {
        return html`
            <button class="${this._getButtonClasses()}">
                <!-- Heroicons are MIT licensed. See https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
                <span class="h-6 w-6 flex-shrink-0 opacity-90" style="${this._getIconStyle()}"></span>
                <span>${this.text}</span>
            </button>
        `;
    }
}

customElements.define("ribbon-button", RibbonButton);
