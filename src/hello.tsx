import { h } from "./h.js";

export class Hello extends HTMLElement {
  connectedCallback() {
    this.appendChild(
      <div class="hello">
        Hello from TypeScript! my guys
      </div>
    );
  }
}

customElements.define("my-hello", Hello);   
