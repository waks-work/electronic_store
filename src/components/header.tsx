import { h } from "../h";
import { actions, get_state } from "../state";
import { l_page_view } from "../types";

export function Header(): HTMLElement {
    const state = get_state();
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    const categories = ["All", "Audio", "Computing", "Wearables", "Deals"];
    return (
        <header class="app-header">
            {/* Top Banner Bar */}
            <div class="top-bar">
                <div class="header-container main-nav-row">
                    <a href="#" class="brand-name"
                        onclick={(e: Event) => {
                            e.preventDefault();
                            actions.set_view(l_page_view.Home);
                        }}
                    > electronic_store </a>

                    <div class="search-box">
                        <input
                            type="text"
                            placeholder="Search products, brands and categories..."
                            value={state.searchQuery}
                            oninput={(e: Event) => {
                                const target = e.target as HTMLInputElement;
                                actions.set_search_query(target.value);
                            }}
                        />
                        <button class="search-btn">Search</button>
                    </div>

                    <div class="header-actions">
                        <button
                            class="theme-toggle"
                            onclick={() => actions.toggle_theme()}
                            title="Toggle theme"
                        > {state.theme === "light" ? "🌙" : "☀️"} </button>

                        <button class="icon-btn" onclick={() => actions.toggle_cart_open()}>
                            🛒 <span class="cart-badge">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories Filter Bar */}
            <nav class="categories-bar">
                <div class="header-container categories-list">
                    {categories.map((cat) => (
                        <button
                          class={`category-tab ${state.selectedCategory === cat ? "active" : ""}`}
                          onclick={() => actions.set_category(cat)}
                        > {cat} </button>
                    ))}
                </div>
            </nav>
        </header>
    ) as HTMLElement;
}
