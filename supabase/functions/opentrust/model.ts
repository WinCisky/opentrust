import { supabaseClient } from "../_shared/supabaseClient.ts";

async function addCustomer(
  email: string,
  hashed_password: string,
) {
  const result = await supabaseClient
    .from("customers")
    .insert([
      {
        email: email,
        hashed_password: hashed_password,
      },
    ]);
  return [result.data, result.error] as const;
}

async function getCustomer(
  email: string,
) {
  const result = await supabaseClient
    .from("customers")
    .select()
    .match({ email: email });
  return result.data;
}

async function refreshTokenCustomer(
  email: string,
  access_token: string,
) {
  const result = await supabaseClient
    .from("customers")
    .update({
      access_token: access_token,
      access_token_creation: ((new Date()).toISOString()).toLocaleString(),
    })
    .match({ email: email });
  return [result.data, result.error] as const;
}

async function getCustomerFromToken(
  access_token: string,
) {
  const result = await supabaseClient
    .from("customers")
    .select()
    .match({ access_token: access_token });
  return result.data;
}

export { addCustomer, getCustomer, getCustomerFromToken, refreshTokenCustomer };
