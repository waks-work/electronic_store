import { h } from "../h";
import { get_state, actions } from "../state";
import { PRODUCTS } from "../data";
import { Card } from "./card";
import { match_option, l_page_view } from "../types";

export function WishlistView(): HTMLElement {
    const state = get_state();
    const wishlistedProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

    return (
        <div class="account-view-container">
            <div class="view-header">
                <h2>❤️ My Saved Wishlist ({wishlistedProducts.length})</h2>
                <button class="btn btn-secondary" onclick={() => actions.set_view(l_page_view.Home)}>
                    &larr; Back to Shop
                </button>
            </div>

            {wishlistedProducts.length === 0 ? (
                <div class="empty-state">
                    <h3>Your wishlist is empty</h3>
                    <p>Click the heart icon on any product to save items for later!</p>
                </div>
            ) : (
                <div class="products-grid">
                    {wishlistedProducts.map((product) => (
                        <Card product={product} />
                    ))}
                </div>
            )}
        </div>
    ) as HTMLElement;
}

export function HistoryView(): HTMLElement {
    const state = get_state();

    return (
        <div class="account-view-container">
            <div class="view-header">
                <h2>📜 Browsing History ({state.recentlyViewed.length})</h2>
                <button class="btn btn-secondary" onclick={() => actions.set_view(l_page_view.Home)}>
                    &larr; Back to Shop
                </button>
            </div>

            {state.recentlyViewed.length === 0 ? (
                <div class="empty-state">
                    <h3>No browsing history yet</h3>
                    <p>Start viewing products and your recently viewed items will appear here.</p>
                </div>
            ) : (
                <div class="products-grid">
                    {state.recentlyViewed.map((product) => (
                        <Card product={product} />
                    ))}
                </div>
            )}
        </div>
    ) as HTMLElement;
}

export function ProfileView(): HTMLElement {
    const state = get_state();

    return match_option(state.currentUser, {
        some: (user) => (
            <div class="account-view-container">
                <div class="view-header">
                    <h2>👤 User Profile & Preferences</h2>
                    <button class="btn btn-secondary" onclick={() => actions.set_view(l_page_view.Home)}>
                        &larr; Back to Shop
                    </button>
                </div>

                <div class="profile-card-detail">
                    <div class="profile-header-badge">
                        <div class="profile-avatar-large">{user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <h3>{user.name}</h3>
                            <p class="user-email">{user.email}</p>
                        </div>
                    </div>

                    <div class="profile-meta-grid">
                        <div class="meta-card">
                            <strong>Saved Wishlist Items</strong>
                            <span>{state.wishlist.length} Items</span>
                        </div>
                        <div class="meta-card">
                            <strong>Total Cart Items</strong>
                            <span>{state.cart.reduce((s, i) => s + i.quantity, 0)} Items</span>
                        </div>
                        <div class="meta-card">
                            <strong>Browsing History</strong>
                            <span>{state.recentlyViewed.length} Viewed</span>
                        </div>
                        <div class="meta-card">
                            <strong>Account Type</strong>
                            <span>Verified Customer</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        none: () => (
            <div class="account-view-container">
                <div class="empty-state">
                    <h3>Not Signed In</h3>
                    <p>Please sign in to view your account profile details.</p>
                    <button class="btn btn-primary" onclick={() => actions.toggle_auth_open()}>
                        Sign In Now
                    </button>
                </div>
            </div>
        )
    }) as HTMLElement;
}
