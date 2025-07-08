import { html } from "lit";
import { carouselItems } from "../../data/carousel-items.js";
import { LightDOMLitElement } from "./base.js";

const ITEMS_PER_VIEW_XL = 5;
const ITEMS_PER_VIEW_DEFAULT = 3;

class RecipeCarousel extends LightDOMLitElement {
    static properties = {
        carouselItems: { type: Array },
        _currentIndex: { type: Number },
        _carouselWidth: { type: Number },
    };

    constructor() {
        super();
        this.carouselItems = carouselItems;
        this._currentIndex = 0;
        this._carouselWidth = 0;
        // ResizeObserver is used primarily to exercise this API as part of the benchmark.
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize && entry.contentBoxSize[0])
                    this._carouselWidth = entry.contentBoxSize[0].inlineSize;
                else
                    this._carouselWidth = entry.contentRect.width;
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.hasUpdated) {
            const carousel = this.querySelector(".carousel");
            if (carousel)
                this._resizeObserver.observe(carousel);
        }
    }

    firstUpdated() {
        const carousel = this.querySelector(".carousel");
        if (carousel)
            this._resizeObserver.observe(carousel);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }

    previousItem() {
        const carousel = this.querySelector(".carousel");
        if (carousel) {
            const itemsPerView = this._getItemsPerView();
            carousel.scrollBy({
                left: -carousel.clientWidth / itemsPerView,
                behavior: "instant",
            });
            this._currentIndex = Math.max(this._currentIndex - 1, 0);
        }
    }

    nextItem() {
        const carousel = this.querySelector(".carousel");
        if (carousel) {
            const itemsPerView = this._getItemsPerView();
            carousel.scrollBy({
                left: carousel.clientWidth / itemsPerView,
                behavior: "instant",
            });
            this._currentIndex = Math.min(this._currentIndex + 1, this.carouselItems.length - itemsPerView);
        }
    }

    _getItemsPerView() {
        return this._carouselWidth >= 800 ? ITEMS_PER_VIEW_XL : ITEMS_PER_VIEW_DEFAULT;
    }

    _getCarouselItemsTemplate() {
        return this.carouselItems.map(
            (item) => html`
                <div class="carousel-item mr-4 h-36 w-1/3 flex-none snap-center overflow-hidden rounded-lg xl:w-1/5">
                    <img src="${item.image}" alt="${item.alt}" class="h-full w-full rounded-t-lg object-cover drop-shadow-xl" />
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
                        class="absolute left-0.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-teal-600 bg-white text-teal-700 shadow-lg hover:bg-teal-50 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:left-3 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                        ?disabled="${this._currentIndex === 0}"
                        aria-label="Previous Recipe"
                    >
                        <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <div class="px-5 pb-1">
                        <div class="carousel scrollbar-hide flex w-full snap-x overflow-x-scroll scroll-smooth">${this._getCarouselItemsTemplate()}</div>
                    </div>
                    <button
                        id="next-item-carousel-btn"
                        @click="${this.nextItem}"
                        class="absolute right-0.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-teal-600 bg-white text-teal-700 shadow-lg hover:bg-teal-50 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:right-3 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                        ?disabled="${this._currentIndex === this.carouselItems.length - this._getItemsPerView()}"
                        aria-label="Next Recipe"
                    >
                        <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define("recipe-carousel", RecipeCarousel);
