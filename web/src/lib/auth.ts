// Client-side-only mock session for the prototype. There is no real backend
// yet (see research/PRD.md §3.1, §6) — this simulates "logged in" state so
// the app doesn't feel like it auto-logs you in as the demo persona, but it
// is not real authentication and never validates credentials.

const SESSION_KEY = "onramp_demo_session";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) === "true";
}

export function login(): void {
  window.localStorage.setItem(SESSION_KEY, "true");
}

export function logout(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
