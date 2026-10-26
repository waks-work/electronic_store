export function h(
    tag: string | Function,
    attrs: Record<string, any> | null,
    ...children: any[]
): HTMLElement | DocumentFragment {
    if (typeof tag === "function") {
        return tag(attrs || {}, children);
    }

    const el = document.createElement(tag);
    if (attrs) {
        for (const [key, val] of Object.entries(attrs)) {
            if (key.startsWith("on") && typeof val === "function") {
                const eventName = key.slice(2).toLowerCase();
                el.addEventListener(eventName, val as EventListener);
            } else if (key === "class" || key === "className") {
                el.className = String(val);
            } else if (key === "style" && typeof val === "object") {
                Object.assign(el.style, val);
            } else if (val !== false && val != null) {
                el.setAttribute(key, String(val));
            }
        }
    }

    const appendChild = (child: any) => {
        if (child == null || child === false) return;
        if (Array.isArray(child)) {
            child.forEach(appendChild);
        } else if (child instanceof Node) {
            el.appendChild(child);
        } else {
            el.appendChild(document.createTextNode(String(child)));
        }
    };

    children.forEach(appendChild);
    return el;
}

export function Fragment(_attrs: any, children: any[]): DocumentFragment {
    const fragment = document.createDocumentFragment();
    children.forEach((child) => {
        if (child instanceof Node) {
            fragment.appendChild(child);
        } else if (typeof child === "string" || typeof child === "number") {
            fragment.appendChild(document.createTextNode(String(child)));
        }
    });
    return fragment;
}
