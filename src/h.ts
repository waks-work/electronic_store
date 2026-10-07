export function h(
  tag: string,
  attrs: Record<string, any> | null,
  ...children: (Node | string)[]
): HTMLElement {
  const el = document.createElement(tag);

  if (attrs) {
    for (const [key, val] of Object.entries(attrs)) {
      if (key.startsWith("on") && typeof val === "function") {
        el.addEventListener(key.slice(2).toLowerCase(), val as EventListener);
      } else if (key === "class") {
        el.className = val as string;
      } else if (val !== false && val != null) {
        el.setAttribute(key, val as string);
      }
    }
  }

  for (const child of children) {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}   
