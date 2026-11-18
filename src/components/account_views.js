import { h } from "../h";
import { get_state, actions } from "../state";
import { PRODUCTS } from "../data";
import { Card } from "./card";
import { match_option, l_page_view } from "../types";
export function WishlistView() {
    const state = get_state();
    const wishlistedProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));
    return (h("div", { class: "account-view-container" },
        h("div", { class: "view-header" },
            h("h2", null,
                "\u2764\uFE0F My Saved Wishlist (",
                wishlistedProducts.length,
                ")"),
            h("button", { class: "btn btn-secondary", onclick: () => actions.set_view(l_page_view.Home) }, "\u2190 Back to Shop")),
        wishlistedProducts.length === 0 ? (h("div", { class: "empty-state" },
            h("h3", null, "Your wishlist is empty"),
            h("p", null, "Click the heart icon on any product to save items for later!"))) : (h("div", { class: "products-grid" }, wishlistedProducts.map((product) => (h(Card, { product: product })))))));
}
export function HistoryView() {
    const state = get_state();
    return (h("div", { class: "account-view-container" },
        h("div", { class: "view-header" },
            h("h2", null,
                "\uD83D\uDCDC Browsing History (",
                state.recentlyViewed.length,
                ")"),
            h("button", { class: "btn btn-secondary", onclick: () => actions.set_view(l_page_view.Home) }, "\u2190 Back to Shop")),
        state.recentlyViewed.length === 0 ? (h("div", { class: "empty-state" },
            h("h3", null, "No browsing history yet"),
            h("p", null, "Start viewing products and your recently viewed items will appear here."))) : (h("div", { class: "products-grid" }, state.recentlyViewed.map((product) => (h(Card, { product: product })))))));
}
export function ProfileView() {
    const state = get_state();
    return match_option(state.currentUser, {
        some: (user) => (h("div", { class: "account-view-container" },
            h("div", { class: "view-header" },
                h("h2", null, "\uD83D\uDC64 User Profile & Preferences"),
                h("button", { class: "btn btn-secondary", onclick: () => actions.set_view(l_page_view.Home) }, "\u2190 Back to Shop")),
            h("div", { class: "profile-card-detail" },
                h("div", { class: "profile-header-badge" },
                    h("div", { class: "profile-avatar-large" }, user.name.charAt(0).toUpperCase()),
                    h("div", null,
                        h("h3", null, user.name),
                        h("p", { class: "user-email" }, user.email))),
                h("div", { class: "profile-meta-grid" },
                    h("div", { class: "meta-card" },
                        h("strong", null, "Saved Wishlist Items"),
                        h("span", null,
                            state.wishlist.length,
                            " Items")),
                    h("div", { class: "meta-card" },
                        h("strong", null, "Total Cart Items"),
                        h("span", null,
                            state.cart.reduce((s, i) => s + i.quantity, 0),
                            " Items")),
                    h("div", { class: "meta-card" },
                        h("strong", null, "Browsing History"),
                        h("span", null,
                            state.recentlyViewed.length,
                            " Viewed")),
                    h("div", { class: "meta-card" },
                        h("strong", null, "Account Type"),
                        h("span", null, "Verified Customer")))))),
        none: () => (h("div", { class: "account-view-container" },
            h("div", { class: "empty-state" },
                h("h3", null, "Not Signed In"),
                h("p", null, "Please sign in to view your account profile details."),
                h("button", { class: "btn btn-primary", onclick: () => actions.toggle_auth_open() }, "Sign In Now"))))
    });
}
