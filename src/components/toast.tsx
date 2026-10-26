import { h } from "../h";

export function show_toast(message: string) {
    const toast = (
        <div class="toast-notification">
            {message}
        </div>
    ) as HTMLElement;

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2500);
}
