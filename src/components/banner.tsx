import { h } from "../h";
import { PRODUCTS } from "../data";
import { actions } from "../state";

export function Banner(): HTMLElement {
    const mainProduct = PRODUCTS[0];
    return (
        <div class="hero-banner">
            <div class="banner-content">
                <span class="banner-badge">SPECIAL DEAL</span>
                <h1 class="banner-title">{mainProduct.title}</h1>
                <p class="banner-desc">{mainProduct.description}</p>
                <div class="banner-price">${mainProduct.price.toFixed(2)}</div>
                <button
                    class="btn btn-primary btn-lg"
                    onclick={() => actions.select_product(mainProduct)}
                > Buy Now &rarr; </button>
            </div>
            <div class="banner-image">
                <img src={mainProduct.image} alt={mainProduct.title} />
            </div>
        </div>
    ) as HTMLElement;
}
