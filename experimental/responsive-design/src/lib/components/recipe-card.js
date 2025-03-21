import { html } from "lit";
import { LightDOMLitElement } from "./base";

class RecipeCard extends LightDOMLitElement {
    static properties = {
        recipe: { type: Object },
        isExpanded: { type: Boolean },
    };

    constructor() {
        super();
        this.recipe = {
            text: "Recipe Card",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: "5 mins",
            calories: "200 cals",
            servingSize: "2 servs",
            tags: ["DeliciousRecipes", "HomeCooking", "FoodLovers"],
            ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
            steps: ["Step 1", "Step 2", "Step 3"],
        };
        this.isExpanded = false;
    }

    _toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.dispatchEvent(
            new Event("toggle-expand", {
                bubbles: true,
                composed: true,
            })
        );
    }

    _getStepsTemplate() {
        return this.recipe.steps.map(
            (step, index) => html`
                <li class="flex items-center space-x-2 text-xs mb-2">
                    <span class="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-800">${index + 1}</span>
                    <span class="ml-1">${step}</span>
                </li>
            `
        );
    }

    _getExpandedTemplate() {
        return html`
            <div class="grid grid-cols-2 gap-3 p-3 bg-white rounded-md mx-2 mb-2 shadow-sm">
                <div>
                    <h4 class="text-xs font-semibold text-gray-800 mb-2">Ingredients:</h4>
                    <ul class="space-y-1 pl-1 text-xs text-gray-700">
                        ${this.recipe.ingredients.map((ingredient) => html`<li class="flex items-center"><span class="h-1 w-1 rounded-full bg-orange-400 mr-2"></span>${ingredient}</li>`)}
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-semibold text-gray-800 mb-2">Steps:</h4>
                    <ol class="space-y-1 pl-1 text-gray-700">
                        ${this._getStepsTemplate()}
                    </ol>
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <div class="row-span-6 grid grid-rows-subgrid rounded-lg bg-gradient-to-br from-blue-50 to-green-50 text-left shadow-md overflow-hidden border border-gray-100">
                <img src="${this.recipe.image}" alt="${this.recipe.text}" class="row-start-1 h-32 w-full object-cover" />
                <h3 class="row-start-2 px-2 py-2 text-sm font-medium text-gray-800">${this.recipe.text}</h3>
                <div class="row-start-3 flex justify-between px-2 pb-2 text-xs text-gray-500 font-medium">
                    <p class="flex items-center"><span class="inline-block h-1 w-1 rounded-full bg-gray-400 mr-1"></span>${this.recipe.time}</p>
                    <p class="flex items-center"><span class="inline-block h-1 w-1 rounded-full bg-gray-400 mr-1"></span>${this.recipe.calories}</p>
                    <p class="flex items-center"><span class="inline-block h-1 w-1 rounded-full bg-gray-400 mr-1"></span>${this.recipe.servingSize}</p>
                </div>
                <p class="row-start-4 truncate text-pretty px-2 py-1 text-xs text-gray-600">${this.recipe.description}</p>
                <div class="absolute -top-4 left-0 right-0 flex justify-center space-x-2 p-2">
                    ${this.recipe.tags.map((tag) => html`<span class="inline-flex items-center rounded-md bg-orange-100 px-1 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-orange-500/10">${tag}</span> `)}
                </div>
                ${this.isExpanded ? this._getExpandedTemplate() : ""}
                <button @click="${this._toggleExpand}" class="show-more-btn w-full justify-self-end border-t border-gray-100 bg-gray-50 py-1 text-xs font-medium text-blue-600">${this.isExpanded ? "Show Less" : "Show More Details"}</button>
            </div>
        `;
    }
}

customElements.define("recipe-card", RecipeCard);
