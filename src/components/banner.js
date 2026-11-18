import { h } from "../h";
import { PRODUCTS } from "../data";
import { actions } from "../state";
export function Banner() {
    const mainProduct = PRODUCTS[0];
    return (h("div", { class: "hero-banner" },
        h("div", { class: "banner-content" },
            h("span", { class: "banner-badge" }, "SPECIAL DEAL"),
            h("h1", { class: "banner-title" }, mainProduct.title),
            h("p", { class: "banner-desc" }, mainProduct.description),
            h("div", { class: "banner-price" },
                "$",
                mainProduct.price.toFixed(2)),
            h("button", { class: "btn btn-primary btn-lg", onclick: () => actions.select_product(mainProduct) }, " Buy Now \u2192 ")),
        h("div", { class: "banner-image" },
            h("img", { src: mainProduct.image, alt: mainProduct.title }))));
}
