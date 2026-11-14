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

let headerEl: HTMLElement | null = null;
let mainEl: HTMLElement | null = null;
let cartEl: HTMLElement | null = null;
let authEl: HTMLElement | null = null;

function MainContent(): HTMLElement {
    const state = get_state();
    const query = (state.searchQuery || "").toLowerCase().trim();
    const activeCategory = state.selectedCategory || "All";

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory =
            activeCategory === "All" ||
            product.category?.toLowerCase() === activeCategory.toLowerCase();

        if (!matchesCategory) return false;
        if (!query) return true;

        const inTitle = product.title?.toLowerCase().includes(query) ?? false;
        const inDesc = product.description?.toLowerCase().includes(query) ?? false;
        const inDetails = product.details?.toLowerCase().includes(query) ?? false;

        return inTitle || inDesc || inDetails;
    });

    const renderView = () => {
        switch (state.currentView) {
            case l_page_view.Wishlist:
                return <WishlistView />;
            case l_page_view.History:
                return <HistoryView />;
            case l_page_view.Profile:
                return <ProfileView />;
            case l_page_view.PDP:
                return match_option(state.selectedProduct, {
                    some: (prod) => <Detail product={prod} />,
                    none: () => <div>No product selected.</div>
                });
            case l_page_view.Home:
            default:
                return (
                    <div>
                        {!query && activeCategory === "All" && <Banner />}

                        <div class="search-results-header">
                            <h2>
                                {query
                                    ? `Search Results for "${state.searchQuery}" (${filteredProducts.length})`
                                    : activeCategory !== "All"
                                    ? `${activeCategory} (${filteredProducts.length})`
                                    : "Best Selling Items"}
                            </h2>
                            {(query || activeCategory !== "All") && (
                                <button
                                    class="btn btn-secondary"
                                    onclick={() => {
                                        actions.clear_search();
                                        actions.set_category("All");
                                    }}
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div class="no-results">
                                <h3>No matching products found</h3>
                                <p>Try searching for terms like "Headphones", "4K", or "Wireless".</p>
                            </div>
                        ) : (
                            <div class="products-grid">
                                {filteredProducts.map((product) => (
                                    <Card product={product} />
                                ))}
                            </div>
                        )}

                        {!query && activeCategory === "All" && state.recentlyViewed.length > 0 && (
                            <section class="recently-viewed">
                                <h2>Recently Viewed</h2>
                                <div class="products-grid">
                                    {state.recentlyViewed.map((product) => (
                                        <Card product={product} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                );
        }
    };

    return <main class="main-layout" id="main-content">{renderView()}</main> as HTMLElement;
}

function render() {
    const appContainer = document.getElementById("app");
    if (!appContainer) return;

    const activeSearchInput = document.getElementById("header-search-input") as HTMLInputElement | null;
    const isSearchFocused = document.activeElement === activeSearchInput;
    const cursorStart = activeSearchInput?.selectionStart ?? null;
    const cursorEnd = activeSearchInput?.selectionEnd ?? null;

    if (!headerEl) {
        appContainer.innerHTML = "";

        headerEl = Header();
        mainEl = MainContent();
        cartEl = CartDrawer();
        authEl = AuthModal();

        const root = (
            <div class="app-root">
                {headerEl}
                {mainEl}
                {cartEl}
                {authEl}
            </div>
        ) as HTMLElement;

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
            const freshInput = document.getElementById("header-search-input") as HTMLInputElement | null;
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
