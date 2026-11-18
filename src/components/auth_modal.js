import { h } from "../h";
import { get_state, actions } from "../state";
import { Ok, Err } from "../types";
import { show_toast } from "./toast";
async function auth_request(action, email, password, name) {
    try {
        const res = await fetch("http://localhost:8000/auth.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, email, password, name })
        });
        const json = await res.json();
        if (res.ok && json.ok) {
            return Ok(json.user);
        }
        return Err(json.error || "Authentication failed");
    }
    catch (err) {
        return Err(err?.message || "Network error");
    }
}
export function AuthModal() {
    const state = get_state();
    if (!state.isAuthOpen)
        return h("div", null);
    let isSignUpMode = false;
    let nameInput = "";
    let emailInput = "";
    let passwordInput = "";
    const toggleMode = (container) => {
        isSignUpMode = !isSignUpMode;
        // Re-render modal inside container
        const newModal = renderContent();
        container.replaceWith(newModal);
    };
    const renderContent = () => {
        const modalContainer = (h("div", { class: "cart-overlay", onclick: () => actions.toggle_auth_open() },
            h("div", { class: "auth-modal-content", onclick: (e) => e.stopPropagation() },
                h("div", { class: "auth-header" },
                    h("h2", null, isSignUpMode ? "Create Account" : "Sign In to electronic_store"),
                    h("button", { class: "close-btn", onclick: () => actions.toggle_auth_open() }, "\u00D7")),
                h("form", { onsubmit: async (e) => {
                        e.preventDefault();
                        const mode = isSignUpMode ? "signup" : "login";
                        const res = await auth_request(mode, emailInput, passwordInput, nameInput);
                        if (res.tag === "Ok") {
                            actions.login_user(res.value);
                            actions.toggle_auth_open();
                            show_toast(isSignUpMode ? `Account created! Welcome, ${res.value.name}!` : `Welcome back, ${res.value.name}!`);
                        }
                        else {
                            show_toast(`Error: ${res.error}`);
                        }
                    }, class: "auth-form" },
                    isSignUpMode && (h("div", { class: "form-group" },
                        h("label", null, "Full Name"),
                        h("input", { type: "text", required: true, placeholder: "John Doe", oninput: (e) => {
                                nameInput = e.target.value;
                            } }))),
                    h("div", { class: "form-group" },
                        h("label", null, "Email Address"),
                        h("input", { type: "email", required: true, placeholder: "you@example.com", oninput: (e) => {
                                emailInput = e.target.value;
                            } })),
                    h("div", { class: "form-group" },
                        h("label", null, "Password"),
                        h("input", { type: "password", required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", oninput: (e) => {
                                passwordInput = e.target.value;
                            } })),
                    h("button", { type: "submit", class: "btn btn-primary btn-full" }, isSignUpMode ? "Sign Up" : "Sign In"),
                    h("div", { class: "auth-toggle-mode" },
                        h("span", null, isSignUpMode ? "Already have an account?" : "Don't have an account?"),
                        " ",
                        h("button", { type: "button", class: "link-btn", onclick: () => toggleMode(modalContainer) }, isSignUpMode ? "Sign In" : "Sign Up"))))));
        return modalContainer;
    };
    return renderContent();
}
