import { LitElement, html, adoptStyles } from "lit";
import { restaurants } from "../../data/restaurants.js";
import "./restaurant-card.js";

import chatWindowStyles from "../chat-window.constructable.js";
class InformationWindow extends LitElement {
    static properties = {
        _isChatExpanded: { type: Boolean },
        _currentIndex: { type: Number },
        chatWindow: { type: Object },
    };

    constructor() {
        super();
        this._restaurants = restaurants;
        this._isChatExpanded = true;
        this._currentIndex = 0;

        // ResizeObserver is used primarily to exercise this API as part of the benchmark.
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const height = entry.contentBoxSize && entry.contentBoxSize[0] ? entry.contentBoxSize[0].blockSize : entry.contentRect.height;
                this._isChatExpanded = height > 350;
                this._currentIndex = 0;
                this.updateCarousel();
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        adoptStyles(this.shadowRoot, [chatWindowStyles]);

        if (this.hasUpdated && this.chatWindow) {
            const chatWindowInner = this.chatWindow.shadowRoot.querySelector("#chat-window");
            if (chatWindowInner)
                this._resizeObserver.observe(chatWindowInner);
        }
    }

    firstUpdated() {
        if (this.chatWindow) {
            const chatWindowInner = this.chatWindow.shadowRoot.querySelector("#chat-window");
            if (chatWindowInner)
                this._resizeObserver.observe(chatWindowInner);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver)
            this._resizeObserver.disconnect();
    }

    handleChatResize(event) {
        this._isChatExpanded = event.detail.isExpanded;
        this._currentIndex = 0;
        this.updateCarousel();
    }

    previousCard() {
        if (this._currentIndex > 0) {
            this._currentIndex--;
            this.updateCarousel();
        }
    }

    nextCard() {
        if (this._currentIndex < this._restaurants.length - 1) {
            this._currentIndex++;
            this.updateCarousel();
        }
    }

    _goToCard(index) {
        this._currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const cardRow = this.shadowRoot.querySelector(".card-row");
        if (cardRow)
            cardRow.style.transform = `translateX(-${this._currentIndex * 100}%)`;

        this.requestUpdate();
    }

    _getExpandedTemplate() {
        return html`
            <div class="relative w-full overflow-hidden rounded-lg border border-teal-700 bg-gradient-to-b from-teal-50 to-white px-2 pb-2 shadow-xl">
                <button
                    class="absolute left-0.5 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-teal-600 bg-white text-teal-700 shadow-lg hover:bg-teal-50 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:left-3 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                    @click="${this.previousCard}"
                    ?disabled="${this._currentIndex === 0}"
                    aria-label="Previous restaurant"
                >
                    <svg class="h-2.5 w-2.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <div class="card-row flex w-full">
                    ${this._restaurants.map((restaurant) => html` <restaurant-card title="${restaurant.title}" distance="${restaurant.distance}" rating="${restaurant.rating}" class="box-border w-full flex-none p-2 lg:p-3"></restaurant-card> `)}
                </div>
                <button
                    id="next-restaurant-btn"
                    class="absolute right-0.5 top-1/2 z-20 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-teal-600 bg-white text-teal-700 shadow-lg hover:bg-teal-50 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:right-3 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                    @click="${this.nextCard}"
                    ?disabled="${this._currentIndex === this._restaurants.length - 1}"
                    aria-label="Next restaurant"
                >
                    <svg class="h-2.5 w-2.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>

                <!-- Pagination Dots -->
                <div class="mt-2 flex justify-center space-x-2">
                    ${this._restaurants.map(
        (_, index) => html`
                            <button
                                class="${index === this._currentIndex ? "bg-teal-600 w-4 sm:w-6" : "bg-teal-300 hover:bg-teal-400"} h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                                @click="${() => this._goToCard(index)}"
                                aria-label="Go to restaurant ${index + 1}"
                            ></button>
                        `
    )}
                </div>
            </div>
        `;
    }

    _getGridTemplate() {
        return html`
            <div class="to-teal-25 rounded-xl border border-teal-700 bg-gradient-to-br from-teal-50 via-white p-6 shadow-xl">
                <div class="grid grid-cols-2 gap-6">${this._restaurants.map((restaurant) => html` <restaurant-card title="${restaurant.title}" distance="${restaurant.distance}" rating="${restaurant.rating}"></restaurant-card> `)}</div>
            </div>
        `;
    }

    render() {
        return html`
            <div class="p-1 xl:p-8">
                <div class="mb-1 flex items-center justify-between">
                    <h4 class="text-base font-bold text-teal-800">Restaurants Near You</h4>
                    <div class="rounded-lg bg-teal-100 p-1 text-sm font-medium text-teal-700">${this._restaurants.length} found</div>
                </div>
                ${this._isChatExpanded ? this._getExpandedTemplate() : this._getGridTemplate()}
            </div>
        `;
    }
}

customElements.define("information-window", InformationWindow);
