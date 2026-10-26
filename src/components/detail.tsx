import { h } from "../h";
import { l_product, match_option } from "../types";
import { actions, get_state } from "../state";
import { show_toast } from "./toast";
import { PRODUCTS } from "../data";

interface DetailProps {
    readonly product: l_product;
}

export function Detail({ product }: DetailProps): HTMLElement {
    const state = get_state();
    const isWishlisted = state.wishlist.includes(product.id);
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

    const promoTag = match_option(product.promotionTag, {
        some: (tag) => <span class="promo-badge">{tag}</span>,
        none: () => null
    });

    return (
        <div class="pdp-container">
            {/* Top Main Section */}
            <div class="pdp-main-grid">
                {/* Left: Gallery */}
                <div class="pdp-gallery">
                    <div class="pdp-main-image">
                        <img id="main-pdp-img" src={product.image} alt={product.title} />
                    </div>
                    <div class="pdp-thumbnails">
                        {product.thumbnails.map((thumb) => (
                            <img
                                src={thumb} class="thumb-img"
                                onclick={(e: Event) => {
                                    const mainImg = document.getElementById("main-pdp-img") as HTMLImageElement;
                                    if (mainImg) mainImg.src = thumb;
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: l_product Meta Info */}
                <div class="pdp-info">
                    <div class="pdp-header">
                        <h1 class="pdp-title">{product.title}</h1>
                        <button
                          class={`wishlist-btn ${isWishlisted ? "active" : ""}`}
                          onclick={() => actions.toggle_wishlist(product.id)}
                        > {isWishlisted ? "❤️" : "🤍"} </button>
                    </div>

                    <div class="pdp-rating">{stars} (12 reviews)</div>
                    <div class="pdp-price">${product.price.toFixed(2)}</div>

                    <div class="pdp-meta-list">
                        <div class="meta-item">
                            <strong>Stock:</strong>{" "}
                            <span class="stock-tag">
                                {product.stockCount <= 5 ? `Only ${product.stockCount} left in stock!` : "In Stock"}
                            </span>
                        </div>
                        <div class="meta-item">
                            <strong>Shipping:</strong>{" "}
                            {product.shippingCost === 0 ? "FREE Shipping" : `$${product.shippingCost.toFixed(2)}`}
                        </div>
                        {promoTag}
                    </div>

                    <div class="pdp-actions">
                        <button
                            class="btn btn-primary btn-lg"
                            onclick={() => {
                                actions.add_to_cart(product, 1);
                                show_toast(`${product.title} added to cart!`);
                            }}
                        > Add to Cart </button>
                    </div>
                </div>
            </div>

            {/* Middle: Details & Specifications */}
            <div class="pdp-section">
                <h2>l_product Details</h2>
                <p>{product.details}</p>
            </div>

            <div class="pdp-section">
                <h2>Specifications</h2>
                <table class="specs-table">
                    <tbody>
                        {Object.entries(product.specifications).map(([key, val]) => (
                            <tr>
                                <td class="spec-key">{key}</td>
                                <td class="spec-val">{val}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Customer Feedback */}
            <div class="pdp-section">
                <h2>Customer Feedback</h2>
                <div class="feedback-card">
                    <strong>John D.</strong> ⭐⭐⭐⭐⭐
                    <p>"Outstanding build quality and fast shipping. Highly recommended!"</p>
                </div>
                <div class="feedback-card">
                    <strong>Sarah M.</strong> ⭐⭐⭐⭐☆
                    <p>"Works as expected, great value for money."</p>
                </div>
            </div>

            {/* Related l_products */}
            <div class="pdp-section">
                <h2>Related l_products</h2>
                <div class="related-grid">
                    {PRODUCTS.filter((p) => p.id !== product.id)
                        .slice(0, 3)
                        .map((item) => (
                            <div
                                class="related-card"
                                onclick={() => actions.select_product(item)}
                            >
                                <img src={item.image} alt={item.title} />
                                <p>{item.title}</p>
                                <strong>${item.price.toFixed(2)}</strong>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    ) as HTMLElement;
}
