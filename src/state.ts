import { l_product, l_cart_item, l_page_view, l_theme, Option, Some, None, User, UserData, defaultUserData, Order } from "./types";

type listener = () => void;

// Local storage key helpers
const USER_KEY = "es_current_user";
const STORAGE_PREFIX = "es_user_data_";

function loadSavedUser(): Option<User> {
    try {
        const data = localStorage.getItem(USER_KEY);
        return data ? Some(JSON.parse(data)) : None();
    } catch {
        return None();
    }
}

function loadUserData(userId: string): UserData {
    try {
        const data = localStorage.getItem(STORAGE_PREFIX + userId);
        return data ? JSON.parse(data) : defaultUserData();
    } catch {
        return defaultUserData();
    }
}

function saveUserData(userId: string, data: UserData) {
    try {
        localStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to persist user state:", e);
    }
}

interface AppState {
    currentView: l_page_view;
    selectedProduct: Option<l_product>;
    recentlyViewed: readonly l_product[];
    cart: readonly l_cart_item[];
    wishlist: readonly string[];
    searchQuery: string;
    selectedCategory: string;
    isCartOpen: boolean;
    isAuthOpen: boolean;
    isUserMenuOpen: boolean;
    currentUser: Option<User>;
    theme: l_theme;
    orders: readonly Order[];
    lastOrder: Option<Order>;
}

const initialUser = loadSavedUser();
const initialData = initialUser.tag === "Some" ? loadUserData(initialUser.value.id) : loadUserData("guest");


const state: AppState = {
    currentView: l_page_view.Home,
    selectedProduct: None(),
    recentlyViewed: initialData.recentlyViewed || [],
    cart: initialData.cart || [],
    wishlist: initialData.wishlist || [],
    searchQuery: "",
    selectedCategory: "All",
    isCartOpen: false,
    isAuthOpen: false,
    isUserMenuOpen: false,
    currentUser: initialUser,
    theme: (localStorage.getItem("theme") as l_theme) || l_theme.light,
    orders: initialData.orders || [],
    lastOrder: None(),
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
    // Automatically persist active user data on state change
    const activeId = state.currentUser.tag === "Some" ? state.currentUser.value.id : "guest";
    saveUserData(activeId, {
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        orders: state.orders,
    });
    listeners.forEach((fn) => fn());
}

export const actions = {
    set_view(view: l_page_view) {
        state.currentView = view;
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

    toggle_auth_open() {
        state.isAuthOpen = !state.isAuthOpen;
        notify();
    },

    toggle_user_menu() {
        state.isUserMenuOpen = !state.isUserMenuOpen;
        notify();
    },

    close_user_menu() {
        state.isUserMenuOpen = false;
        notify();
    },

    login_user(user: User) {
        state.currentUser = Some(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        // Load isolated user cart/wishlist
        const userData = loadUserData(user.id);
        state.cart = userData.cart || [];
        state.wishlist = userData.wishlist || [];
        state.recentlyViewed = userData.recentlyViewed || [];
        state.isUserMenuOpen = false;
        notify();
    },

    logout_user() {
        state.currentUser = None();
        localStorage.removeItem(USER_KEY);

        // Revert back to isolated guest state
        const guestData = loadUserData("guest");
        state.cart = guestData.cart || [];
        state.wishlist = guestData.wishlist || [];
        state.recentlyViewed = guestData.recentlyViewed || [];
        state.isUserMenuOpen = false;
        notify();
    },

    set_search_query(query: string) {
        state.searchQuery = query;
        notify();
    },

    clear_search() {
        state.searchQuery = "";
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
    },

    select_product(product: l_product) {
        state.selectedProduct = Some(product);
        state.currentView = l_page_view.PDP;
    
        // Add to recently viewed (deduplicated, latest 5)
        state.recentlyViewed = [
            product,
            ...state.recentlyViewed.filter((p) => p.id !== product.id)
        ].slice(0, 5);
    
        // Track full chronological browsing history (unlimited/deduplicated latest)
        const filteredHistory = (state.recentlyViewed || []).filter((p) => p.id !== product.id);
        state.recentlyViewed = [product, ...filteredHistory];
    
        notify();
    },
    
    open_wishlist() {
        state.currentView = l_page_view.Wishlist;
        state.isUserMenuOpen = false;
        notify();
    },
    
    open_history() {
        state.currentView = l_page_view.History;
        state.isUserMenuOpen = false;
        notify();
    },
    
    open_profile() {
        state.currentView = l_page_view.Profile;
        state.isUserMenuOpen = false;
        notify();
    },
 
    open_checkout() {
        state.isCartOpen = false;
        state.lastOrder = None();
        state.currentView = l_page_view.Checkout;
        notify();
    },
    
    complete_checkout(order: Order) {
        state.orders = [order, ...state.orders];
        state.lastOrder = Some(order);
        state.cart = [];
        notify();
    }
};
