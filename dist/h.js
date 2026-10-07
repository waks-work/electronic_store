export function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
        for (const [key, val] of Object.entries(attrs)) {
            if (key.startsWith("on") && typeof val === "function") {
                el.addEventListener(key.slice(2).toLowerCase(), val);
            }
            else if (key === "class") {
                el.className = val;
            }
            else if (val !== false && val != null) {
                el.setAttribute(key, val);
            }
        }
    }
    for (const child of children) {
        if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
        }
        else if (child instanceof Node) {
            el.appendChild(child);
        }
    }
    return el;
}
//# sourceMappingURL=h.js.map