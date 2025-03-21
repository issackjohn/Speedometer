import { html } from "lit";
import { LightDOMLitElement } from "./base";
import { chefTips } from "../../data/tips.js";
import "./section-heading.js";

class ChefTips extends LightDOMLitElement {
    static properties = {
        chefTips: {},
    };

    constructor() {
        super();
        this.chefTips = chefTips;
    }

    _getChefTipsTemplate() {
        return this.chefTips.map((tip) => {
            return html`
                <blockquote class="relative overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg">
                    <p class="relative z-10 font-medium italic text-gray-700">"${tip.quote}"</p>
                    <div class="mt-4 flex items-center justify-end">
                        <footer class="text-right text-sm font-semibold text-gray-600">- ${tip.author}</footer>
                    </div>
                </blockquote>
            `;
        });
    }

    render() {
        return html`
            <div class="p-4">
                <section-heading title="Chef's Tips & Wisdom"></section-heading>
                <div class="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">${this._getChefTipsTemplate()}</div>
            </div>
        `;
    }
}

customElements.define("chef-tips", ChefTips);
