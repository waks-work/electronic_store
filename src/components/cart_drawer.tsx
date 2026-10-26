import { h } from "../h";
import { get_state, actions } from "../state";

export function CartDrawer(): HTMLElement {
    const state = get_state();
    if (!state.isCartOpen) return <div /> as HTMLElement;

    const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return (
        <div class="cart-overlay" onclick={() => actions.toggle_cart_open()}>
            <div class="cart-drawer" onclick={(e: Event) => e.stopPropagation()}>
                <div class="cart-header">
                    <h2>Your Cart ({state.cart.length})</h2>
                    <button class="close-btn" onclick={() => actions.toggle_cart_open()}>&times;</button>
                </div>

                <div class="cart-body">
                    {state.cart.length === 0 ? (
                        <p class="empty-cart">Your cart is empty.</p>
                    ) : (
                        state.cart.map((item) => (
                            <div class="cart-item">
                                <img src={item.product.image} alt={item.product.title} />
                                <div class="cart-item-info">
                                    <h4>{item.product.title}</h4>
                                    <p>${item.product.price.toFixed(2)}</p>
                                    <div class="qty-controls">
                                        <button onclick={() => actions.update_cart_qty(item.product.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onclick={() => actions.update_cart_qty(item.product.id, 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    class="remove-btn"
                                    onclick={() => actions.remove_from_cart(item.product.id)}
                                > 🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                <div class="cart-footer">
                    <div class="total-row">
                        <span>Subtotal:</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                    <button
                        class="btn btn-primary btn-full"
                        disabled={state.cart.length === 0}
                        onclick={() => alert("Proceeding to checkout!")}
                    > Checkout Now </button>
                </div>
            </div>
        </div>
    ) as HTMLElement;
}
