// The backend sets a plain (non-httpOnly) "logged_in" cookie alongside the
// real httpOnly access_token/refresh_token whenever it issues a session,
// with the same 7-day lifetime as refresh_token. It carries no secret — it's
// just a marker the frontend can read synchronously (no network call) to
// decide instantly whether to redirect to /login on actions like Add to
// Cart or Wishlist, and it self-expires in sync with the real session
// instead of lingering indefinitely like an unbounded localStorage flag.

export const isLoggedIn = () => {
  return document.cookie
    .split("; ")
    .some((entry) => entry === "logged_in=1");
};

// Used when a refresh attempt confirms the session is actually dead (not just
// the 5-minute access token expiring, which silently refreshes) — there's no
// backend response in that path to clear the cookie via Set-Cookie, so the
// client clears it directly.
export const clearLoggedInFlag = () => {
  document.cookie = "logged_in=; path=/; max-age=0";
};
