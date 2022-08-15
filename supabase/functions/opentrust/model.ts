import { supabaseClient } from "../_shared/supabaseClient.ts";
import { definitions } from "./supabase.ts";

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

async function getCustomerWithPassword(
  email: string,
  password: string,
) {
  const result = await supabaseClient
    .from("customers")
    .select()
    .match({
      email: email,
      hashed_password: password,
    });
  return result.data;
}

async function storeAccessToken(
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

// get all orders not sent older than a week
async function getUnsentEmails() {
  const d = new Date();
  d.setDate(d.getDate()-1);
  const result = await supabaseClient
    .from<definitions["orders"]>("orders")
    .select()
    .lt('created_at', d.toISOString())
    .match({ sent: false });
  if(result.error)
    return [];
  return result.data;
}

async function setEmailSent(orderId: string) {
  const result = await supabaseClient
    .from<definitions["orders"]>("orders")
    .update({
      sent: true,
    })
    .match({ id: orderId });
  if(result.error)
    return [];
  return result.data;
}

export {
  addCustomer,
  getCustomer,
  getCustomerFromToken,
  getCustomerWithPassword,
  storeAccessToken,
  getUnsentEmails,
  setEmailSent,
};
