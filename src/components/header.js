import { h } from "../h";
import { actions, get_state } from "../state";
import { l_page_view, match_option } from "../types";
import { PRODUCTS } from "../data";
import { show_toast } from "./toast";
export function Header() {
    const state = get_state();
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const query = (state.searchQuery || "").toLowerCase().trim();
    const categories = [
        "All", "Audio", "Computing", "Wearables",
        "Smartphones", "Cameras", "Gaming", "Smart Home", "Accessories"
    ];
    const searchSuggestions = query
        ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)).slice(0, 5)
        : [];
    const userBadge = match_option(state.currentUser, {
        some: (user) => (h("div", { class: "user-menu-container" },
            h("button", { class: "user-profile-btn", onclick: () => actions.toggle_user_menu() },
                h("span", { class: "user-avatar" }, user.name.charAt(0).toUpperCase()),
                h("span", { class: "user-name-text" },
                    "Hi, ",
                    user.name.split(" ")[0]),
                h("span", { class: "chevron" }, "\u25BE")),
            state.isUserMenuOpen && (h("div", { class: "user-dropdown-popup" },
                h("div", { class: "user-dropdown-header" },
                    h("strong", null, user.name),
                    h("small", null, user.email)),
                h("hr", { class: "dropdown-divider" }),
                h("div", { class: "user-dropdown-item", onclick: () => actions.open_profile() }, "\uD83D\uDC64 My Profile"),
                h("div", { class: "user-dropdown-item", onclick: () => actions.open_wishlist() },
                    "\u2764\uFE0F Wishlist (",
                    state.wishlist.length,
                    ")"),
                h("div", { class: "user-dropdown-item", onclick: () => actions.open_history() },
                    "\uD83D\uDCDC Browsing History (",
                    state.recentlyViewed.length,
                    ")"),
                h("hr", { class: "dropdown-divider" }),
                h("button", { class: "user-dropdown-item switch-btn", onclick: () => {
                        actions.logout_user();
                        actions.toggle_auth_open();
                    } }, "\uD83D\uDD04 Switch Account"),
                h("button", { class: "logout-btn", onclick: () => {
                        actions.logout_user();
                        show_toast("Logged out successfully");
                    } }, "\uD83D\uDEAA Sign Out"))))),
        none: () => (h("button", { class: "btn btn-signin", onclick: () => actions.toggle_auth_open() }, "\uD83D\uDC64 Sign In"))
    });
    return (h("header", { class: "app-header" },
        h("div", { class: "top-bar" },
            h("div", { class: "header-container main-nav-row" },
                h("a", { href: "#", class: "brand-name", onclick: (e) => {
                        e.preventDefault();
                        actions.set_view(l_page_view.Home);
                    } }, "electronic_store"),
                h("div", { class: "search-box-container" },
                    h("div", { class: "search-box" },
                        h("input", { id: "header-search-input", type: "text", placeholder: "Search products, categories...", value: state.searchQuery, oninput: (e) => {
                                const target = e.target;
                                actions.set_search_query(target.value);
                                if (state.currentView !== l_page_view.Home) {
                                    actions.set_view(l_page_view.Home);
                                }
                            } }),
                        state.searchQuery ? (h("button", { class: "search-clear-btn", onclick: () => actions.clear_search() }, "\u00D7")) : null,
                        h("button", { class: "search-btn" }, "Search")),
                    query.length > 0 && searchSuggestions.length > 0 && (h("div", { class: "search-overlay-dropdown" }, searchSuggestions.map((item) => (h("div", { class: "dropdown-item", onclick: () => {
                            actions.select_product(item);
                            actions.clear_search();
                        } },
                        h("img", { src: item.image, alt: item.title, class: "dropdown-img" }),
                        h("div", { class: "dropdown-info" },
                            h("span", { class: "dropdown-title" }, item.title),
                            h("span", { class: "dropdown-category" }, item.category)),
                        h("span", { class: "dropdown-price" },
                            "$",
                            item.price.toFixed(2)))))))),
                h("div", { class: "header-actions" },
                    userBadge,
                    h("div", { class: "more-menu-container" },
                        h("button", { class: "icon-btn more-btn", title: "More options", onclick: () => actions.toggle_user_menu() }, "\u22EF")),
                    h("button", { class: "theme-toggle", onclick: () => actions.toggle_theme() }, state.theme === "light" ? "🌙" : "☀️"),
                    h("button", { class: "icon-btn", onclick: () => actions.toggle_cart_open() },
                        "\uD83D\uDED2 ",
                        h("span", { class: "cart-badge" }, cartCount))))),
        h("nav", { class: "categories-bar" },
            h("div", { class: "header-container categories-list" }, categories.map((cat) => (h("button", { class: `category-tab ${state.selectedCategory === cat ? "active" : ""}`, onclick: () => actions.set_category(cat) }, cat)))))));
}
