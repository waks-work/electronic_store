import { h } from "./h.js";
export class Card extends HTMLElement {
    expanded = false;
    connectedCallback() {
        const title = this.getAttribute("title") ?? "Default";
        const content = this.getAttribute("content") ?? "";
        const price = this.getAttribute("price") ?? "0";
        const rating = parseInt(this.getAttribute("rating") ?? "0", 10);
        const image = this.getAttribute("image") ?? "";
        const details = this.getAttribute("details") ?? "";
        const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
        const detailsDiv = h("div", { class: "card-details" }, h("p", null, details));
        detailsDiv.style.display = "none";
        const detailsBtn = h("button", {
            class: "btn btn-details",
            onclick: () => {
                this.expanded = !this.expanded;
                detailsDiv.style.display = this.expanded ? "block" : "none";
                detailsBtn.textContent = this.expanded ? "Hide Details" : "Show Details";
            }
        }, "Show Details");
        const cartBtn = h("button", {
            class: "btn btn-cart",
            onclick: () => {
                const toast = h("div", { class: "toast" }, `${title} added to cart!`);
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }
        }, "Add to Cart");
        this.appendChild(h("div", { class: "card" },
            image ? h("img", { src: image, alt: title, class: "card-img" }) : null,
            h("div", { class: "card-body" },
                h("h2", null, title),
                h("div", { class: "card-rating" }, stars),
                h("p", { class: "card-price" },
                    "$",
                    price),
                h("p", { class: "card-content" }, content),
                detailsDiv,
                h("div", { class: "card-actions" },
                    detailsBtn,
                    cartBtn))));
    }
}
customElements.define("my-card", Card);
//# sourceMappingURL=card.js.map