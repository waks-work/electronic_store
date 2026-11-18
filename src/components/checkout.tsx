import { h } from "../h";
import { get_state, actions } from "../state";
import { l_page_view, match_option, Result, Ok, Err, Order } from "../types";
import { fetchl_products } from "../api";
import { set_products } from "../data";
import { show_toast } from "./toast";

async function submit_order(payload: {
    userId: string;
    customerName: string;
    shippingAddress: string;
    paymentMethod: string;
    items: { id: string; title: string; price: number; quantity: number }[];
}): Promise<Result<Order, string>> {
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
    } catch (err: any) {
        return Err(err?.message || "Network error");
    }
}

export function CheckoutView(): HTMLElement {
    const state = get_state();

    // If an order was just placed, render the confirmation receipt
    if (state.lastOrder.tag === "Some") {
        const order = state.lastOrder.value;
        return (
            <div class="checkout-container">
                <div class="order-receipt-card">
                    <div class="receipt-badge">✅ Order Confirmed</div>
                    <h2>Thank you, {order.customerName}!</h2>
                    <p class="receipt-id">Order ID: <strong>{order.id}</strong></p>
                    <p class="receipt-meta">Shipping to: {order.shippingAddress} • Paid via {order.paymentMethod}</p>

                    <div class="receipt-items">
                        {order.items.map((item) => (
                            <div class="summary-row">
                                <span>{item.quantity}x {item.title}</span>
                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>
                        ))}
                    </div>

                    <div class="summary-total">
                        <span>Total Paid</span>
                        <strong>${order.totalAmount.toFixed(2)}</strong>
                    </div>

                    <button
                        class="btn btn-primary btn-full"
                        onclick={() => actions.set_view(l_page_view.Home)}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        ) as HTMLElement;
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

    const handlePlaceOrder = async (e: Event) => {
        e.preventDefault();
        if (state.cart.length === 0) return;

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
        } else {
            show_toast(`Checkout Error: ${res.error}`);
        }
    };

    return (
        <div class="checkout-container">
            <div class="view-header">
                <h2>Checkout</h2>
                <button class="btn btn-secondary" onclick={() => actions.set_view(l_page_view.Home)}>
                    &larr; Back to Shop
                </button>
            </div>

            {state.cart.length === 0 ? (
                <div class="empty-state">
                    <h3>Your cart is empty</h3>
                    <p>Add items to your cart before checking out.</p>
                </div>
            ) : (
                <div class="checkout-grid">
                    {/* Left: Shipping & Payment Form */}
                    <form class="checkout-form-card" onsubmit={handlePlaceOrder}>
                        <h3>1. Shipping Details</h3>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                value={customerName}
                                placeholder="Jane Doe"
                                oninput={(e: Event) => {
                                    customerName = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>

                        <div class="form-group">
                            <label>Delivery Address</label>
                            <input
                                type="text"
                                required
                                placeholder="123 Tech Avenue, Nairobi"
                                oninput={(e: Event) => {
                                    shippingAddress = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>

                        <h3>2. Payment Method</h3>
                        <div class="form-group">
                            <select
                                onchange={(e: Event) => {
                                    paymentMethod = (e.target as HTMLSelectElement).value;
                                }}
                            >
                                <option value="Credit / Debit Card">💳 Credit / Debit Card</option>
                                <option value="Mobile Money">📱 Mobile Money (M-Pesa)</option>
                                <option value="Cash on Delivery">💵 Cash on Delivery</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg btn-full">
                            Place Order (${grandTotal.toFixed(2)})
                        </button>
                    </form>

                    {/* Right: Order Summary */}
                    <div class="checkout-summary-card">
                        <h3>Order Summary ({state.cart.length} items)</h3>
                        <div class="summary-items">
                            {state.cart.map((item) => (
                                <div class="summary-row">
                                    <span>{item.quantity}x {item.product.title}</span>
                                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <hr class="dropdown-divider" />
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div class="summary-total">
                            <span>Total</span>
                            <strong>${grandTotal.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) as HTMLElement;
}
