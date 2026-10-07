import { h } from "./h.js";

export class Card extends HTMLElement {
  private expanded = false;

  connectedCallback() {
    const title = this.getAttribute("title") ?? "Default";
    const content = this.getAttribute("content") ?? "";
    const price = this.getAttribute("price") ?? "0";
    const rating = parseInt(this.getAttribute("rating") ?? "0", 10);
    const image = this.getAttribute("image") ?? "";
    const details = this.getAttribute("details") ?? "";

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const detailsDiv = h("div", { class: "card-details" },
      <p>{details}</p>
    );
    detailsDiv.style.display = "none";

    const detailsBtn = h("button", {
      class: "btn btn-details",
      onclick: () => {
        this.expanded = !this.expanded;
        detailsDiv.style.display = this.expanded ? "block" : "none";
        detailsBtn.textContent = this.expanded ? "Hide Details" : "Show Details";
      }
    }, "Show Details");

    const cartBtn = h("button", {
      class: "btn btn-cart",
      onclick: () => {
        const toast = h("div", { class: "toast" }, `${title} added to cart!`);
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }
    }, "Add to Cart");

    this.appendChild(
      <div class="card">
        {image ? <img src={image} alt={title} class="card-img" /> : null}
        <div class="card-body">
          <h2>{title}</h2>
          <div class="card-rating">{stars}</div>
          <p class="card-price">${price}</p>
          <p class="card-content">{content}</p>
          {detailsDiv}
          <div class="card-actions">
            {detailsBtn}
            {cartBtn}
          </div>
        </div>
      </div>
    );
  }
}

customElements.define("my-card", Card);   
