import { h } from "../h";
export function show_toast(message) {
    const toast = (h("div", { class: "toast-notification" }, message));
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2500);
}
