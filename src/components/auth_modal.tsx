import { h } from "../h";
import { get_state, actions } from "../state";
import { Result, Ok, Err, User, Some } from "../types";
import { show_toast } from "./toast";

async function auth_request(
    action: "login" | "signup",
    email: string,
    password: string,
    name: string
): Promise<Result<User, string>> {
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
    } catch (err: any) {
        return Err(err?.message || "Network error");
    }
}

export function AuthModal(): HTMLElement {
    const state = get_state();
    if (!state.isAuthOpen) return <div /> as HTMLElement;

    let isSignUpMode = false;
    let nameInput = "";
    let emailInput = "";
    let passwordInput = "";

    const toggleMode = (container: HTMLElement) => {
        isSignUpMode = !isSignUpMode;
        // Re-render modal inside container
        const newModal = renderContent();
        container.replaceWith(newModal);
    };

    const renderContent = (): HTMLElement => {
        const modalContainer = (
            <div class="cart-overlay" onclick={() => actions.toggle_auth_open()}>
                <div class="auth-modal-content" onclick={(e: Event) => e.stopPropagation()}>
                    <div class="auth-header">
                        <h2>{isSignUpMode ? "Create Account" : "Sign In to electronic_store"}</h2>
                        <button class="close-btn" onclick={() => actions.toggle_auth_open()}>&times;</button>
                    </div>

                    <form
                        onsubmit={async (e: Event) => {
                            e.preventDefault();
                            const mode = isSignUpMode ? "signup" : "login";
                            const res = await auth_request(mode, emailInput, passwordInput, nameInput);

                            if (res.tag === "Ok") {
                                actions.login_user(res.value);
                                actions.toggle_auth_open();
                                show_toast(isSignUpMode ? `Account created! Welcome, ${res.value.name}!` : `Welcome back, ${res.value.name}!`);
                            } else {
                                show_toast(`Error: ${res.error}`);
                            }
                        }}
                        class="auth-form"
                    >
                        {isSignUpMode && (
                            <div class="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    oninput={(e: Event) => {
                                        nameInput = (e.target as HTMLInputElement).value;
                                    }}
                                />
                            </div>
                        )}

                        <div class="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                oninput={(e: Event) => {
                                    emailInput = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                oninput={(e: Event) => {
                                    passwordInput = (e.target as HTMLInputElement).value;
                                }}
                            />
                        </div>

                        <button type="submit" class="btn btn-primary btn-full">
                            {isSignUpMode ? "Sign Up" : "Sign In"}
                        </button>

                        <div class="auth-toggle-mode">
                            <span>{isSignUpMode ? "Already have an account?" : "Don't have an account?"}</span>{" "}
                            <button
                                type="button"
                                class="link-btn"
                                onclick={() => toggleMode(modalContainer)}
                            >
                                {isSignUpMode ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) as HTMLElement;

        return modalContainer;
    };

    return renderContent();
}
