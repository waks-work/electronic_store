import { h } from "../h";
import { get_state, actions } from "../state";
export function CartDrawer() {
    const state = get_state();
    if (!state.isCartOpen)
        return h("div", null);
    const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return (h("div", { class: "cart-overlay", onclick: () => actions.toggle_cart_open() },
        h("div", { class: "cart-drawer", onclick: (e) => e.stopPropagation() },
            h("div", { class: "cart-header" },
                h("h2", null,
                    "Your Cart (",
                    state.cart.length,
                    ")"),
                h("button", { class: "close-btn", onclick: () => actions.toggle_cart_open() }, "\u00D7")),
            h("div", { class: "cart-body" }, state.cart.length === 0 ? (h("p", { class: "empty-cart" }, "Your cart is empty.")) : (state.cart.map((item) => (h("div", { class: "cart-item" },
                h("img", { src: item.product.image, alt: item.product.title }),
                h("div", { class: "cart-item-info" },
                    h("h4", null, item.product.title),
                    h("p", null,
                        "$",
                        item.product.price.toFixed(2)),
                    h("div", { class: "qty-controls" },
                        h("button", { onclick: () => actions.update_cart_qty(item.product.id, -1) }, "-"),
                        h("span", null, item.quantity),
                        h("button", { onclick: () => actions.update_cart_qty(item.product.id, 1) }, "+"))),
                h("button", { class: "remove-btn", onclick: () => actions.remove_from_cart(item.product.id) }, " \uD83D\uDDD1\uFE0F")))))),
            h("div", { class: "cart-footer" },
                h("div", { class: "total-row" },
                    h("span", null, "Subtotal:"),
                    h("strong", null,
                        "$",
                        total.toFixed(2))),
                h("button", { class: "btn btn-primary btn-full", disabled: state.cart.length === 0, onclick: () => actions.open_checkout() }, " Checkout Now ")))));
}
