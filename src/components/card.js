import { h } from "../h";
import { match_option } from "../types";
import { actions } from "../state";
import { show_toast } from "./toast";
export function Card({ product }) {
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
    const promoBadge = match_option(product.promotionTag, {
        some: (tag) => h("span", { class: "card-tag" }, tag),
        none: () => null
    });
    return (h("div", { class: "product-card", onclick: () => actions.select_product(product) },
        h("div", { class: "card-img-wrapper" },
            promoBadge,
            h("img", { src: product.image, alt: product.title, class: "card-img" })),
        h("div", { class: "card-body" },
            h("h3", { class: "card-title" }, product.title),
            h("p", { class: "card-price" },
                "$",
                product.price.toFixed(2)),
            h("div", { class: "card-rating" }, stars),
            h("div", { class: "card-actions", onclick: (e) => e.stopPropagation() },
                h("button", { class: "btn btn-primary btn-full", onclick: () => {
                        actions.add_to_cart(product, 1);
                        show_toast(`${product.title} added to cart!`);
                    } }, " Add to Cart ")))));
}
;
