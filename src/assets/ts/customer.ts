import { Const } from "./const";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(Const.urlSupabase, Const.anonBearer);
// check if user is already logged in
if (!supabase.auth.user()) {
  window.location.href = "/";
}

// Buttons
document.querySelector("#menuReviewed")?.addEventListener(
  "click",
  _menuReviewed,
);
document.querySelector("#menuSent")?.addEventListener("click", _menuSent);
document.querySelector("#menuPending")?.addEventListener("click", _menuPending);
document.querySelector("#menuLogout")?.addEventListener("click", _menuLogout);

export function _menuReviewed() {
  console.log("reviewed!");
}
export function _menuSent() {
  console.log("sent!");
}
export function _menuPending() {
  console.log("pending!");
}
export function _menuLogout() {
  supabase.auth.signOut().then((err) =>
    err.error ? console.log(err.error) : (window.location.href = "/")
  );
}
