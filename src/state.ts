import { l_product, l_cart_item, l_page_view, l_theme, Option, Some, None } from "./types";

type listener = () => void;

interface AppState {
    currentView: l_page_view;
    selectedProduct: Option<l_product>;
    recentlyViewed: readonly l_product[];
    cart: readonly l_cart_item[];
    wishlist: readonly string[]; // Array of product IDs
    searchQuery: string;
    selectedCategory: string;
    isCartOpen: boolean;
    theme: l_theme;
}

const state: AppState = {
    currentView: l_page_view.Home,
    selectedProduct: None(),
    recentlyViewed: [],
    cart: [],
    wishlist: [],
    searchQuery: "",
    selectedCategory: "All",
    isCartOpen: false,
    theme: (localStorage.getItem("theme") as l_theme) || l_theme.light
};

const listeners: Set<listener> = new Set();

export function get_state(): Readonly<AppState> {
    return state;
}

export function subscribe(listener: listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function notify() {
    listeners.forEach((fn) => fn());
}

// actions
export const actions = {
    set_view(view: l_page_view) {
        state.currentView = view;
        notify();
    },

    select_product(product: l_product) {
        state.selectedProduct = Some(product);
        state.currentView = l_page_view.PDP;

        // Add to recently viewed if not present
        if (!state.recentlyViewed.some((p) => p.id === product.id)) {
          state.recentlyViewed = [product, ...state.recentlyViewed].slice(0, 5);
        }
        notify();
    },

    add_to_cart(product: l_product, qty: number = 1) {
        const existingIndex = state.cart.findIndex((item) => item.product.id === product.id);
        if (existingIndex >= 0) {
            const updated = [...state.cart];
            const existing = updated[existingIndex];
            updated[existingIndex] = { ...existing, quantity: existing.quantity + qty };
            state.cart = updated;
        } else {
            state.cart = [...state.cart, { product, quantity: qty }];
        }
        notify();
    },

    update_cart_qty(productId: string, delta: number) {
        state.cart = state.cart
            .map((item) => {
                if (item.product.id === productId) {
                  const newQty = item.quantity + delta;
                  return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            })
            .filter((item): item is l_cart_item => item !== null);
        notify();
    },

    remove_from_cart(productId: string) {
        state.cart = state.cart.filter((item) => item.product.id !== productId);
        notify();
    },

    toggle_wishlist(productId: string) {
        if (state.wishlist.includes(productId)) {
            state.wishlist = state.wishlist.filter((id) => id !== productId);
        } else {
            state.wishlist = [...state.wishlist, productId];
        }
        notify();
    },

    toggle_cart_open() {
        state.isCartOpen = !state.isCartOpen;
        notify();
    },

    set_search_query(query: string) {
        state.searchQuery = query;
        notify();
    },

    set_category(category: string) {
        state.selectedCategory = category;
        notify();
    },

    toggle_theme() {
        state.theme = state.theme === l_theme.light ? l_theme.dark : l_theme.light;
        localStorage.setItem("theme", state.theme);
        document.documentElement.setAttribute("data-theme", state.theme);
        notify();
    }
};
