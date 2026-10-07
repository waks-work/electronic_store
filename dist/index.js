import "./hello.js";
import "./card.js";
import { h } from "./h.js";
const root = h("main", { class: "container" }, h("my-card", { title: "Wireless Headphones", content: "Noise cancelling, 30hr battery", price: "149.99", rating: "4", image: "https://picsum.photos/320/180", details: "Bluetooth 5.3, USB-C charging, foldable design, 20g drivers." }), h("my-card", { title: "Mechanical Keyboard", content: "Hot-swappable, RGB backlit", price: "89.99", rating: "5", image: "https://picsum.photos/320/181", details: "Gasket mount, PBT keycaps, tri-mode connectivity." }));
document.body.appendChild(root);
//# sourceMappingURL=index.js.map