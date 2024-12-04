import { html } from "lit";
import { carouselItems } from "../../data/carousel-items.js";
import { LightDOMLitElement } from "./base.js";

class RecipeCarousel extends LightDOMLitElement {
    static properties = {
        carouselItems: { type: Array },
        _currentIndex: { type: Number },
    };

    constructor() {
        super();
        this.carouselItems = carouselItems;
        this._currentIndex = 0;
    }

    previousItem() {
        const carousel = this.querySelector(".carousel");
        if (carousel) {
            carousel.scrollBy({
                left: -carousel.clientWidth / 3,
                behavior: "smooth",
            });
            this._currentIndex = Math.max(this._currentIndex - 1, 0);
        }
    }

    nextItem() {
        const carousel = this.querySelector(".carousel");
        if (carousel) {
            carousel.scrollBy({
                left: carousel.clientWidth / 3,
                behavior: "smooth",
            });
            this._currentIndex = Math.min(this._currentIndex + 1, this.carouselItems.length - 3);
        }
    }

    _getCarouselItemsTemplate() {
        return this.carouselItems.map(
            (item) => html`
                <div class="mr-4 h-36 w-1/3 flex-none snap-center overflow-hidden rounded-lg">
                    <img src="${item.image}" alt="${item.alt}" class="h-full w-44 rounded-t-lg object-cover drop-shadow-xl" />
                </div>
            `
        );
    }

    render() {
        return html`
            <div class="box-border w-full bg-gray-100 shadow-md">
                <div class="relative flex w-full gap-4 overflow-hidden">
                    <button
                        @click="${this.previousItem}"
                        class="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full border-2 border-solid border-orange-300 bg-white bg-opacity-100 p-2 text-black shadow-md hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
                        ?disabled="${this._currentIndex === 0}"
                        aria-label="Previous Recipe"
                    >
                        &lt;
                    </button>
                    <div class="px-5 pb-1">
                        <div class="carousel scrollbar-hide flex w-full snap-x overflow-x-scroll scroll-smooth">${this._getCarouselItemsTemplate()}</div>
                    </div>
                    <button
                        @click="${this.nextItem}"
                        class="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full border-2 border-solid border-orange-300 bg-white bg-opacity-100 p-2 text-black hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
                        ?disabled="${this._currentIndex === this.carouselItems.length - 3}"
                        aria-label="Next Recipe"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define("recipe-carousel", RecipeCarousel);