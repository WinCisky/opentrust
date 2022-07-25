import { Const, Orders, Reviews } from "./const";
import { createClient } from "@supabase/supabase-js";
import imgIconSent from "../img/icon_sent.svg";
import imgIconWait from "../img/icon_wait.svg";

const ENDPOINT_URL = "https://neworder.deno.dev/";
const SHOPIFY_WEBHOOK_GUIDE =
  "https://help.shopify.com/en/manual/orders/notifications/webhooks#create-webhooks";
const supabase = createClient(Const.urlSupabase, Const.anonBearer);
// check if user is already logged in
const userId = supabase.auth.user()?.id ?? "";
if (!userId || userId === "") {
  window.location.href = "/";
}

// Buttons
document.querySelector("#menuReviewed")?.addEventListener(
  "click",
  menuReviewed,
);
document.querySelector("#menuOrders")?.addEventListener("click", menuOrders);
document.querySelector("#user-menu-logout")?.addEventListener("click", menuLogout);
document.querySelector("#menuCredentials")?.addEventListener(
  "click",
  menuCredentials,
);

function menuReviewed() {
  retrieveReviews(userId);
}

function menuOrders() {
  retrieveOrders(userId, false);
}

function menuCredentials() {
  const list_content = document.querySelector("#list-content") ?? null;
  if (list_content) {
    list_content.innerHTML = `
    <div>
      <div>
        <div class="row">
          <p>You need to setup a &nbsp;<a href="${SHOPIFY_WEBHOOK_GUIDE}"><strong>shopify webhook</strong></a>&nbsp;
          with the following URL: &nbsp;<strong>${ENDPOINT_URL + userId}</strong></p>
        </div>
        <div class="row">
          <p>Set &nbsp;<strong>Order payment</strong>&nbsp; as Event, &nbsp;<strong>JSON</strong>&nbsp;
          as Format and the API version with tag &nbsp;<strong>Latest</strong>.</p>
        </div>
      </div>
      <div>
        <div id='menuLogout' class='button'>Logout</div>
      </div>
    </div>
    `;
    document.querySelector("#menuLogout")?.addEventListener(
      "click",
      menuLogout,
    );
  }
}

function menuLogout() {
  supabase.auth.signOut().then((err) =>
    err.error ? console.log(err.error) : (window.location.href = "/")
  );
}

function showList(list: string) {
  const list_content = document.querySelector("#table-content") ?? null;
  if (list_content) {
    list_content.innerHTML = list;
  }
}

function showReviews(reviews: any[]) {
  let result = "";
  let date_options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  reviews.forEach((review: Reviews) => {
    let review_date = new Date(review.created_at);

    result += `<tr>`;
    result += `  <td class="border-b border-slate-100  p-4 pl-8 text-slate-500 ">`;
    result += review_date.toLocaleDateString("en-US", date_options);
    result += `  </td>`;
    result += `  <td class="border-b border-slate-100  p-4 text-slate-500 ">`;
    result += review.name ?? "- no name -";
    result += `  </td>`;
    result += `  <td class="border-b border-slate-100  p-4 text-slate-500 ">`;
    result += review.title;
    result += `  </td>`;
    result += `  <td class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">`;
    result += review.score / 20; // <- should be shown in stars
    result += `  </td>`;
    result += `</tr>`;
  });
  showList(result);
}

function showOrders(orders: Orders[]) {
  let result = "";
  let date_options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  orders.forEach((order) => {
    let img_icon = order.sent ? imgIconSent : imgIconWait;
    let img_class = order.sent
      ? "black-to-green-filter"
      : "black-to-yellow-filter";
    let review_date = new Date(order.created_at);

    result += `<tr>`;
    result += `  <td class="border-b border-slate-100  p-4 pl-8 text-slate-500 ">`;
    result += review_date.toLocaleDateString("en-US", date_options);
    result += `  </td>`;
    result += `  <td class="border-b border-slate-100  p-4 text-slate-500 ">`;
    result += order.email;
    result += `  </td>`;
    result += `  <td class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">`;
    result +=
      `    <img src='${img_icon}' class='${img_class}' width=40px height=40px>`;
    result += `  </td>`;
    result += `</tr>`;
  });
  showList(result);
}

async function retrieveReviews(user_id: string) {
  if (user_id === "") {
    return;
  }

  const { data, error } = await supabase
    .from("reviews")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  if (!error) {
    showReviews(data);
  } else {
    console.log(error.message);
  }
}

async function retrieveOrders(user_id: string, _sent: boolean) {
  if (user_id === "") {
    return;
  }

  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(15);

  if (!error) {
    showOrders(data);
  } else {
    console.log(error.message);
  }
}

function toggleUserMenu() {
  document.querySelector("#user-menu")?.classList.toggle("hidden")
}

function hideUserMenu() {
  document.querySelector("#user-menu")?.classList.add("hidden")
}

window.addEventListener('click', function (e) {
  if(!document.getElementById('user-menu-button')?.contains(e.target as Node))
    hideUserMenu();
  
  
})

document.querySelector("#user-menu-button")?.addEventListener("click", toggleUserMenu)
// retrieveReviews(userId);
retrieveOrders(userId, false);
