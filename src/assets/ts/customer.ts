import { Const, Orders, Reviews } from "./const";
import { createClient } from "@supabase/supabase-js";

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
document.querySelector("#menuLogout")?.addEventListener("click", menuLogout);

function menuReviewed() {
  retrieveReviews(userId);
}

function menuOrders() {
  retrieveOrders(userId, false);
}

function menuLogout() {
  supabase.auth.signOut().then((err) =>
    err.error ? console.log(err.error) : (window.location.href = "/")
  );
}

function showList(list: string) {
  const list_content = document.querySelector("#list-content") ?? null;
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

    result += `<div class='list-item'>`;
    result += `  <div>`;
    result += review_date.toLocaleDateString("en-US", date_options);
    result += `  </div>`;
    result += `  <div>`;
    result += review.name ?? "- no name -";
    result += `  </div>`;
    result += `  <div>`;
    result += review.title;
    result += `  </div>`;
    result += `  <div>`;
    result += review.score / 20; // <- should be shown in stars
    result += `  </div>`;
    result += `</div>`;
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
    let img_icon = order.sent
      ? "../assets/img/icon_sent.svg"
      : "../assets/img/icon_wait.svg";
    let img_class = order.sent
      ? "black-to-green-filter"
      : "black-to-yellow-filter";
    let review_date = new Date(order.created_at);

    result += `<div class='list-item'>`;
    result += `  <div>`;
    result += review_date.toLocaleDateString("en-US", date_options);
    result += `  </div>`;
    result += `  <div>`;
    result += order.email;
    result += `  </div>`;
    result += `  <div>`;
    result +=
      `    <img src='${img_icon}' class='${img_class}' width=40px height=40px>`;
    result += `  </div>`;
    result += `</div>`;
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
    .order("created_at", { ascending : false })
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
    .order("created_at", { ascending : false })
    .limit(15);

  if (!error) {
    showOrders(data);
  } else {
    console.log(error.message);
  }
}

// retrieveReviews(userId);
retrieveOrders(userId, false);
