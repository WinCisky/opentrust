import { supabaseClient } from "../_shared/supabaseClient.ts";

async function addCustomer(
  email: string,
  refresh_token: string
) {
  const result = await supabaseClient
    .from("customers")
    .insert([
      {
        email: email,
        refresh_token: refresh_token,
      },
    ]);
  return [result.data, result.error] as const;
}

async function getCustomer(
  email: string
) {
  const result = await supabaseClient
    .from("customers")
    .select()
    .match({ email: email });
  return result.data;
}

async function updateCustomer(
  email: string,
  refresh_token: string
) {
  const result = await supabaseClient
    .from("customers")
    .update({ refresh_token: refresh_token })
    .match({ email: email });
  return [result.data, result.error] as const;
}

export { addCustomer, getCustomer, updateCustomer };
