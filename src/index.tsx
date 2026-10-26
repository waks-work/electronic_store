import { h } from "./h";
import { get_state, subscribe } from "./state";
import { Header } from "./components/header";
import { Banner } from "./components/banner";
import { Card } from "./components/card";
import { Detail } from "./components/detail";
import { CartDrawer } from "./components/cart_drawer";
import { PRODUCTS } from "./data";
import { l_page_view, match_option } from "./types";
import "./style.css";

function App(): HTMLElement {
    const state = get_state();

    const filteredProducts = PRODUCTS.filter((p) => {
        const matchesCategory = state.selectedCategory === "All" || p.category === state.selectedCategory;
        const matchesSearch = p.title
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div class="app-root">
            <Header />
            <main class="main-layout">
                {state.currentView === l_page_view.Home ? (
                    <div>
                        <Banner />
                        <h2>Best Selling Items</h2>
                        <div class="products-grid">
                            {filteredProducts.map((product) => (
                                <Card product={product} />
                            ))}
                        </div>

                        {state.recentlyViewed.length > 0 && (
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
                ) : (
                    match_option(state.selectedProduct, {
                        some: (prod) => <Detail product={prod} />,
                        none: () => <div>No product selected.</div>
                    })
                )}
            </main>
            <CartDrawer />
        </div>
    ) as HTMLElement;
}

function render() {
    const appContainer = document.getElementById("app");
    if (appContainer) {
        appContainer.innerHTML = "";
        appContainer.appendChild(App());
    }
}

// Initial theme configuration
document.documentElement.setAttribute("data-theme", get_state().theme);

// Subscribe & initial render
subscribe(render);
document.addEventListener("DOMContentLoaded", render);;   
