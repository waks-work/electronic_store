import { h } from "./h.js";
export class Hello extends HTMLElement {
    connectedCallback() {
        this.appendChild(h("div", { class: "hello" }, "Hello from TypeScript! my guys"));
    }
}
customElements.define("my-hello", Hello);
//# sourceMappingURL=hello.js.map