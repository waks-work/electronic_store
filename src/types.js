export const Some = (value) => ({ tag: "Some", value });
export const None = () => ({ tag: "None" });
export const Ok = (value) => ({ tag: "Ok", value });
export const Err = (error) => ({ tag: "Err", error });
// helpers for option match 
export function match_option(opt, handlers) {
    return opt.tag === "Some" ? handlers.some(opt.value) : handlers.none();
}
export var l_page_view;
(function (l_page_view) {
    l_page_view["Home"] = "HOME";
    l_page_view["PDP"] = "PDP";
    l_page_view["Wishlist"] = "WISHLIST";
    l_page_view["History"] = "HISTORY";
    l_page_view["Profile"] = "PROFILE";
    l_page_view["Auth"] = "AUTH";
    l_page_view["Checkout"] = "CHECKOUT";
})(l_page_view || (l_page_view = {}));
export var l_stock_status;
(function (l_stock_status) {
    l_stock_status["in_stock"] = "IN_STOCK";
    l_stock_status["low_stock"] = "LOW_STOCK";
    l_stock_status["out_of_stock"] = "OUT_OF_STOCK";
})(l_stock_status || (l_stock_status = {}));
export var l_theme;
(function (l_theme) {
    l_theme["light"] = "light";
    l_theme["dark"] = "dark";
})(l_theme || (l_theme = {}));
export const defaultUserData = () => ({
    cart: [],
    wishlist: [],
    recentlyViewed: [],
    orders: [],
});
