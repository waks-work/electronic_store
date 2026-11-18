import { h } from "../h";
import { match_option } from "../types";
import { actions, get_state } from "../state";
import { show_toast } from "./toast";
import { PRODUCTS } from "../data";
export function Detail({ product }) {
    const state = get_state();
    const isWishlisted = state.wishlist.includes(product.id);
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
    const promoTag = match_option(product.promotionTag, {
        some: (tag) => h("span", { class: "promo-badge" }, tag),
        none: () => null
    });
    return (h("div", { class: "pdp-container" },
        h("div", { class: "pdp-main-grid" },
            h("div", { class: "pdp-gallery" },
                h("div", { class: "pdp-main-image" },
                    h("img", { id: "main-pdp-img", src: product.image, alt: product.title })),
                h("div", { class: "pdp-thumbnails" }, product.thumbnails.map((thumb) => (h("img", { src: thumb, class: "thumb-img", onclick: (e) => {
                        const mainImg = document.getElementById("main-pdp-img");
                        if (mainImg)
                            mainImg.src = thumb;
                    } }))))),
            h("div", { class: "pdp-info" },
                h("div", { class: "pdp-header" },
                    h("h1", { class: "pdp-title" }, product.title),
                    h("button", { class: `wishlist-btn ${isWishlisted ? "active" : ""}`, onclick: () => actions.toggle_wishlist(product.id) },
                        " ",
                        isWishlisted ? "❤️" : "🤍",
                        " ")),
                h("div", { class: "pdp-rating" },
                    stars,
                    " (12 reviews)"),
                h("div", { class: "pdp-price" },
                    "$",
                    product.price.toFixed(2)),
                h("div", { class: "pdp-meta-list" },
                    h("div", { class: "meta-item" },
                        h("strong", null, "Stock:"),
                        " ",
                        h("span", { class: "stock-tag" }, product.stockCount <= 5 ? `Only ${product.stockCount} left in stock!` : "In Stock")),
                    h("div", { class: "meta-item" },
                        h("strong", null, "Shipping:"),
                        " ",
                        product.shippingCost === 0 ? "FREE Shipping" : `$${product.shippingCost.toFixed(2)}`),
                    promoTag),
                h("div", { class: "pdp-actions" },
                    h("button", { class: "btn btn-primary btn-lg", onclick: () => {
                            actions.add_to_cart(product, 1);
                            show_toast(`${product.title} added to cart!`);
                        } }, " Add to Cart ")))),
        h("div", { class: "pdp-section" },
            h("h2", null, "Product Details"),
            h("p", null, product.details)),
        h("div", { class: "pdp-section" },
            h("h2", null, "Specifications"),
            h("table", { class: "specs-table" },
                h("tbody", null, Object.entries(product.specifications).map(([key, val]) => (h("tr", null,
                    h("td", { class: "spec-key" }, key),
                    h("td", { class: "spec-val" }, val))))))),
        h("div", { class: "pdp-section" },
            h("h2", null, "Customer Feedback"),
            h("div", { class: "feedback-card" },
                h("strong", null, "John D."),
                " \u2B50\u2B50\u2B50\u2B50\u2B50",
                h("p", null, "\"Outstanding build quality and fast shipping. Highly recommended!\"")),
            h("div", { class: "feedback-card" },
                h("strong", null, "Sarah M."),
                " \u2B50\u2B50\u2B50\u2B50\u2606",
                h("p", null, "\"Works as expected, great value for money.\""))),
        h("div", { class: "pdp-section" },
            h("h2", null, "Related l_products"),
            h("div", { class: "related-grid" }, PRODUCTS.filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((item) => (h("div", { class: "related-card", onclick: () => actions.select_product(item) },
                h("img", { src: item.image, alt: item.title }),
                h("p", null, item.title),
                h("strong", null,
                    "$",
                    item.price.toFixed(2)))))))));
}
