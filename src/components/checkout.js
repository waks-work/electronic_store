import { h } from "../h";
import { get_state, actions } from "../state";
import { l_page_view, match_option, Ok, Err } from "../types";
import { fetchl_products } from "../api";
import { set_products } from "../data";
import { show_toast } from "./toast";
async function submit_order(payload) {
    try {
        const res = await fetch("http://localhost:8000/checkout.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (res.ok && json.ok) {
            return Ok(json.order);
        }
        return Err(json.error || "Checkout failed");
    }
    catch (err) {
        return Err(err?.message || "Network error");
    }
}
export function CheckoutView() {
    const state = get_state();
    // If an order was just placed, render the confirmation receipt
    if (state.lastOrder.tag === "Some") {
        const order = state.lastOrder.value;
        return (h("div", { class: "checkout-container" },
            h("div", { class: "order-receipt-card" },
                h("div", { class: "receipt-badge" }, "\u2705 Order Confirmed"),
                h("h2", null,
                    "Thank you, ",
                    order.customerName,
                    "!"),
                h("p", { class: "receipt-id" },
                    "Order ID: ",
                    h("strong", null, order.id)),
                h("p", { class: "receipt-meta" },
                    "Shipping to: ",
                    order.shippingAddress,
                    " \u2022 Paid via ",
                    order.paymentMethod),
                h("div", { class: "receipt-items" }, order.items.map((item) => (h("div", { class: "summary-row" },
                    h("span", null,
                        item.quantity,
                        "x ",
                        item.title),
                    h("strong", null,
                        "$",
                        (item.price * item.quantity).toFixed(2)))))),
                h("div", { class: "summary-total" },
                    h("span", null, "Total Paid"),
                    h("strong", null,
                        "$",
                        order.totalAmount.toFixed(2))),
                h("button", { class: "btn btn-primary btn-full", onclick: () => actions.set_view(l_page_view.Home) }, "Continue Shopping"))));
    }
    const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = state.cart.reduce((sum, item) => sum + item.product.shippingCost, 0);
    const grandTotal = subtotal + shipping;
    const defaultName = match_option(state.currentUser, {
        some: (u) => u.name,
        none: () => ""
    });
    let customerName = defaultName;
    let shippingAddress = "";
    let paymentMethod = "Credit / Debit Card";
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (state.cart.length === 0)
            return;
        const userId = match_option(state.currentUser, {
            some: (u) => u.id,
            none: () => "guest"
        });
        const payload = {
            userId,
            customerName,
            shippingAddress,
            paymentMethod,
            items: state.cart.map((c) => ({
                id: c.product.id,
                title: c.product.title,
                price: c.product.price,
                quantity: c.quantity
            }))
        };
        const res = await submit_order(payload);
        if (res.tag === "Ok") {
            actions.complete_checkout(res.value);
            show_toast(`Order ${res.value.id} placed successfully!`);
            // Refresh product stock counts from SQLite
            const refreshed = await fetchl_products();
            if (refreshed.tag === "Ok") {
                set_products(refreshed.value);
            }
        }
        else {
            show_toast(`Checkout Error: ${res.error}`);
        }
    };
    return (h("div", { class: "checkout-container" },
        h("div", { class: "view-header" },
            h("h2", null, "Checkout"),
            h("button", { class: "btn btn-secondary", onclick: () => actions.set_view(l_page_view.Home) }, "\u2190 Back to Shop")),
        state.cart.length === 0 ? (h("div", { class: "empty-state" },
            h("h3", null, "Your cart is empty"),
            h("p", null, "Add items to your cart before checking out."))) : (h("div", { class: "checkout-grid" },
            h("form", { class: "checkout-form-card", onsubmit: handlePlaceOrder },
                h("h3", null, "1. Shipping Details"),
                h("div", { class: "form-group" },
                    h("label", null, "Full Name"),
                    h("input", { type: "text", required: true, value: customerName, placeholder: "Jane Doe", oninput: (e) => {
                            customerName = e.target.value;
                        } })),
                h("div", { class: "form-group" },
                    h("label", null, "Delivery Address"),
                    h("input", { type: "text", required: true, placeholder: "123 Tech Avenue, Nairobi", oninput: (e) => {
                            shippingAddress = e.target.value;
                        } })),
                h("h3", null, "2. Payment Method"),
                h("div", { class: "form-group" },
                    h("select", { onchange: (e) => {
                            paymentMethod = e.target.value;
                        } },
                        h("option", { value: "Credit / Debit Card" }, "\uD83D\uDCB3 Credit / Debit Card"),
                        h("option", { value: "Mobile Money" }, "\uD83D\uDCF1 Mobile Money (M-Pesa)"),
                        h("option", { value: "Cash on Delivery" }, "\uD83D\uDCB5 Cash on Delivery"))),
                h("button", { type: "submit", class: "btn btn-primary btn-lg btn-full" },
                    "Place Order ($",
                    grandTotal.toFixed(2),
                    ")")),
            h("div", { class: "checkout-summary-card" },
                h("h3", null,
                    "Order Summary (",
                    state.cart.length,
                    " items)"),
                h("div", { class: "summary-items" }, state.cart.map((item) => (h("div", { class: "summary-row" },
                    h("span", null,
                        item.quantity,
                        "x ",
                        item.product.title),
                    h("span", null,
                        "$",
                        (item.product.price * item.quantity).toFixed(2)))))),
                h("hr", { class: "dropdown-divider" }),
                h("div", { class: "summary-row" },
                    h("span", null, "Subtotal"),
                    h("span", null,
                        "$",
                        subtotal.toFixed(2))),
                h("div", { class: "summary-row" },
                    h("span", null, "Shipping"),
                    h("span", null, shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`)),
                h("div", { class: "summary-total" },
                    h("span", null, "Total"),
                    h("strong", null,
                        "$",
                        grandTotal.toFixed(2))))))));
}
