import { displayStatusMessage, togglePageLoadingAnimation } from "./helper";
import { Const, ServerResponse } from "./const";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(Const.urlSupabase, Const.anonBearer);
// check if user is already logged in
if(supabase.auth.user())
  window.location.href = "/customer/";

async function mailPasswordRegistration(
  email: string,
  password: string,
): Promise<ServerResponse> {
  let { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: JSON.stringify(user) };
}

export function validateRegistrationForm() {
  const userEmail =
    (document.getElementById("user-email") as HTMLInputElement).value;
  const userPassword =
    (document.getElementById("user-password") as HTMLInputElement).value;
  togglePageLoadingAnimation(true);
  mailPasswordRegistration(userEmail, userPassword).then((result) => {
    togglePageLoadingAnimation(false);
    if (result.success) {
      window.location.href = "/mailcheck/";
    } else {
      displayStatusMessage(result.message);
    }
  });
}
