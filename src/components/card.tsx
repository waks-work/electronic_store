import { h } from "../h";
import { l_product, match_option } from "../types";
import { actions } from "../state";
import { show_toast } from "./toast";

interface CardProps {
  readonly product: l_product;
}

export function Card({ product }: CardProps): HTMLElement {
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

    const promoBadge = match_option(product.promotionTag, {
        some: (tag) => <span class="card-tag">{tag}</span>,
        none: () => null
    });

    return (
        <div
            class="product-card"
            onclick={() => actions.select_product(product)}
        >
            <div class="card-img-wrapper">
                {promoBadge}
                <img src={product.image} alt={product.title} class="card-img" />
            </div>

            <div class="card-body">
                <h3 class="card-title">{product.title}</h3>
                <p class="card-price">${product.price.toFixed(2)}</p>
                <div class="card-rating">{stars}</div>

                <div class="card-actions" onclick={(e: Event) => e.stopPropagation()}>
                    <button
                        class="btn btn-primary btn-full"
                        onclick={() => {
                            actions.add_to_cart(product, 1);
                            show_toast(`${product.title} added to cart!`);
                        }}
                    > Add to Cart </button>
                </div>
            </div>
        </div>
    ) as HTMLElement;
};   
