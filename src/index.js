import { h } from "./h";
import { get_state, subscribe, actions } from "./state";
import { Header } from "./components/header";
import { Banner } from "./components/banner";
import { Card } from "./components/card";
import { Detail } from "./components/detail";
import { CartDrawer } from "./components/cart_drawer";
import { AuthModal } from "./components/auth_modal";
import { WishlistView, HistoryView, ProfileView } from "./components/account_views";
import { fetchl_products } from "./api";
import { PRODUCTS, set_products } from "./data";
import { l_page_view, match_option } from "./types";
import "./style.css";
import { CheckoutView } from "./components/checkout";
let headerEl = null;
let mainEl = null;
let cartEl = null;
let authEl = null;
function MainContent() {
    const state = get_state();
    const query = (state.searchQuery || "").toLowerCase().trim();
    const activeCategory = state.selectedCategory || "All";
    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = activeCategory === "All" ||
            product.category?.toLowerCase() === activeCategory.toLowerCase();
        if (!matchesCategory)
            return false;
        if (!query)
            return true;
        const inTitle = product.title?.toLowerCase().includes(query) ?? false;
        const inDesc = product.description?.toLowerCase().includes(query) ?? false;
        const inDetails = product.details?.toLowerCase().includes(query) ?? false;
        return inTitle || inDesc || inDetails;
    });
    const renderView = () => {
        switch (state.currentView) {
            case l_page_view.Wishlist:
                return h(WishlistView, null);
            case l_page_view.History:
                return h(HistoryView, null);
            case l_page_view.Profile:
                return h(ProfileView, null);
            case l_page_view.PDP:
                return match_option(state.selectedProduct, {
                    some: (prod) => h(Detail, { product: prod }),
                    none: () => h("div", null, "No product selected.")
                });
            case l_page_view.Checkout:
                return h(CheckoutView, null);
            case l_page_view.Home:
            default:
                return (h("div", null,
                    !query && activeCategory === "All" && h(Banner, null),
                    h("div", { class: "search-results-header" },
                        h("h2", null, query
                            ? `Search Results for "${state.searchQuery}" (${filteredProducts.length})`
                            : activeCategory !== "All"
                                ? `${activeCategory} (${filteredProducts.length})`
                                : "Best Selling Items"),
                        (query || activeCategory !== "All") && (h("button", { class: "btn btn-secondary", onclick: () => {
                                actions.clear_search();
                                actions.set_category("All");
                            } }, "Reset Filters"))),
                    filteredProducts.length === 0 ? (h("div", { class: "no-results" },
                        h("h3", null, "No matching products found"),
                        h("p", null, "Try searching for terms like \"Headphones\", \"4K\", or \"Wireless\"."))) : (h("div", { class: "products-grid" }, filteredProducts.map((product) => (h(Card, { product: product }))))),
                    !query && activeCategory === "All" && state.recentlyViewed.length > 0 && (h("section", { class: "recently-viewed" },
                        h("h2", null, "Recently Viewed"),
                        h("div", { class: "products-grid" }, state.recentlyViewed.map((product) => (h(Card, { product: product }))))))));
        }
    };
    return h("main", { class: "main-layout", id: "main-content" }, renderView());
}
function render() {
    const appContainer = document.getElementById("app");
    if (!appContainer)
        return;
    const activeSearchInput = document.getElementById("header-search-input");
    const isSearchFocused = document.activeElement === activeSearchInput;
    const cursorStart = activeSearchInput?.selectionStart ?? null;
    const cursorEnd = activeSearchInput?.selectionEnd ?? null;
    if (!headerEl) {
        appContainer.innerHTML = "";
        headerEl = Header();
        mainEl = MainContent();
        cartEl = CartDrawer();
        authEl = AuthModal();
        const root = (h("div", { class: "app-root" },
            headerEl,
            mainEl,
            cartEl,
            authEl));
        appContainer.appendChild(root);
        return;
    }
    const newHeader = Header();
    headerEl.replaceWith(newHeader);
    headerEl = newHeader;
    const newMain = MainContent();
    mainEl?.replaceWith(newMain);
    mainEl = newMain;
    const newCart = CartDrawer();
    cartEl?.replaceWith(newCart);
    cartEl = newCart;
    const newAuth = AuthModal();
    authEl?.replaceWith(newAuth);
    authEl = newAuth;
    if (isSearchFocused) {
        requestAnimationFrame(() => {
            const freshInput = document.getElementById("header-search-input");
            if (freshInput) {
                freshInput.focus();
                if (cursorStart !== null && cursorEnd !== null) {
                    freshInput.setSelectionRange(cursorStart, cursorEnd);
                }
            }
        });
    }
}
async function init() {
    const res = await fetchl_products();
    if (res.tag === "Ok") {
        set_products(res.value);
    }
    render();
}
document.documentElement.setAttribute("data-theme", get_state().theme);
subscribe(render);
document.addEventListener("DOMContentLoaded", init);
