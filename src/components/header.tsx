import { h } from "../h";
import { actions, get_state } from "../state";
import { l_page_view, match_option } from "../types";
import { PRODUCTS } from "../data";
import { show_toast } from "./toast";

export function Header(): HTMLElement {
    const state = get_state();
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const query = (state.searchQuery || "").toLowerCase().trim();

    const categories = [
        "All", "Audio", "Computing", "Wearables", 
        "Smartphones", "Cameras", "Gaming", "Smart Home", "Accessories"
    ];

    const searchSuggestions = query
        ? PRODUCTS.filter((p) =>
              p.title.toLowerCase().includes(query) ||
              p.category.toLowerCase().includes(query)
          ).slice(0, 5)
        : [];

    const userBadge = match_option(state.currentUser, {
        some: (user) => (
            <div class="user-menu-container">
                <button
                    class="user-profile-btn"
                    onclick={() => actions.toggle_user_menu()}
                >
                    <span class="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                    <span class="user-name-text">Hi, {user.name.split(" ")[0]}</span>
                    <span class="chevron">▾</span>
                </button>

                {state.isUserMenuOpen && (
                    <div class="user-dropdown-popup">
                        <div class="user-dropdown-header">
                            <strong>{user.name}</strong>
                            <small>{user.email}</small>
                        </div>
                        <hr class="dropdown-divider" />
                        <div class="user-dropdown-item" onclick={() => actions.open_profile()}>
                            👤 My Profile
                        </div>
                        <div class="user-dropdown-item" onclick={() => actions.open_wishlist()}>
                            ❤️ Wishlist ({state.wishlist.length})
                        </div>
                        <div class="user-dropdown-item" onclick={() => actions.open_history()}>
                            📜 Browsing History ({state.recentlyViewed.length})
                        </div>
                        <hr class="dropdown-divider" />
                        <button
                            class="user-dropdown-item switch-btn"
                            onclick={() => {
                                actions.logout_user();
                                actions.toggle_auth_open();
                            }}
                        >
                            🔄 Switch Account
                        </button>
                        <button
                            class="logout-btn"
                            onclick={() => {
                                actions.logout_user();
                                show_toast("Logged out successfully");
                            }}
                        >
                            🚪 Sign Out
                        </button>
                    </div>
                )}
            </div>
        ),
        none: () => (
            <button class="btn btn-signin" onclick={() => actions.toggle_auth_open()}>
                👤 Sign In
            </button>
        )
    });

    return (
        <header class="app-header">
            <div class="top-bar">
                <div class="header-container main-nav-row">
                    <a
                        href="#"
                        class="brand-name"
                        onclick={(e: Event) => {
                            e.preventDefault();
                            actions.set_view(l_page_view.Home);
                        }}
                    >
                        electronic_store
                    </a>

                    <div class="search-box-container">
                        <div class="search-box">
                            <input
                                id="header-search-input"
                                type="text"
                                placeholder="Search products, categories..."
                                value={state.searchQuery}
                                oninput={(e: Event) => {
                                    const target = e.target as HTMLInputElement;
                                    actions.set_search_query(target.value);
                                    if (state.currentView !== l_page_view.Home) {
                                        actions.set_view(l_page_view.Home);
                                    }
                                }}
                            />
                            {state.searchQuery ? (
                                <button
                                    class="search-clear-btn"
                                    onclick={() => actions.clear_search()}
                                >
                                    &times;
                                </button>
                            ) : null}
                            <button class="search-btn">Search</button>
                        </div>

                        {query.length > 0 && searchSuggestions.length > 0 && (
                            <div class="search-overlay-dropdown">
                                {searchSuggestions.map((item) => (
                                    <div
                                        class="dropdown-item"
                                        onclick={() => {
                                            actions.select_product(item);
                                            actions.clear_search();
                                        }}
                                    >
                                        <img src={item.image} alt={item.title} class="dropdown-img" />
                                        <div class="dropdown-info">
                                            <span class="dropdown-title">{item.title}</span>
                                            <span class="dropdown-category">{item.category}</span>
                                        </div>
                                        <span class="dropdown-price">${item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div class="header-actions">
                        {userBadge}

                        {/* More Menu Dropdown Icon */}
                        <div class="more-menu-container">
                            <button
                                class="icon-btn more-btn"
                                title="More options"
                                onclick={() => actions.toggle_user_menu()}
                            >
                                ⋯
                            </button>
                        </div>

                        <button
                            class="theme-toggle"
                            onclick={() => actions.toggle_theme()}
                        >
                            {state.theme === "light" ? "🌙" : "☀️"}
                        </button>

                        <button class="icon-btn" onclick={() => actions.toggle_cart_open()}>
                            🛒 <span class="cart-badge">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            <nav class="categories-bar">
                <div class="header-container categories-list">
                    {categories.map((cat) => (
                        <button
                            class={`category-tab ${state.selectedCategory === cat ? "active" : ""}`}
                            onclick={() => actions.set_category(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    ) as HTMLElement;
}
