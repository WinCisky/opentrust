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
document.querySelector("#user-menu-mobile-logout")?.addEventListener("click", menuLogout);
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

function ratingToHtml(rating: number){
  let result = ""

  // rating goes from 1 to 5
  for (let i = 1; i <= 5; i++) {
    const star_color = i <= rating ? "text-yellow-500" : "text-slate-200"
    result += `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${star_color}" viewBox="0 0 20 20" fill="currentColor">
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    `
  }

  return result
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
    result += `    <div class="flex items-center">`;
    result += ratingToHtml(review.score);
    result += `    </div>`;
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
      ? "stroke-white"
      : "fill-yellow";
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


const snackbar = document.querySelector("#snackbar")
let snackbarStack: string[] = [];

function reset_animation(el: HTMLElement) {
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = ''; 
}

function processSnackbarQueue(){
  // check if there are no more elements
  if(snackbarStack.length <= 0)
    return

  // grab first element
  let textToShow = snackbarStack[0]
  // I assume the snackbar is hidden
  if(snackbar){
    reset_animation(snackbar as HTMLElement)
    snackbar.innerHTML = textToShow
    snackbar.classList.remove("hidden")
    setTimeout(() => {
      snackbar.classList.add("hidden")
      snackbarStack.shift()
      // recursion till the queue is empty
      processSnackbarQueue()
    }, 2000)
  }
}

function showOnSnackbar(text: string){
  let wasEmpty = (snackbarStack.length <= 0)
  snackbarStack.push(text)
  if(wasEmpty)
    processSnackbarQueue()
}

function copyUrl() {
  const copyText = document.querySelector("#url-to-copy")
  const permissionName = "clipboard-write" as PermissionName;
  let copyResult = "Can't copy to clipboard"
  navigator.permissions.query({ name : permissionName}).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      // /* write to the clipboard now */
      // console.log("permission granted")
      navigator.clipboard.writeText(copyText?.innerHTML.trim() ?? "").then(function() {
        /* clipboard successfully set */
        copyResult = "Copied to clipboard"
        // show result on snackbar
        showOnSnackbar(copyResult)
      }, function() {
        // /* clipboard write failed */
        // console.log("copy failed!")
        // show result on snackbar
        showOnSnackbar(copyResult)
      });
    } else {
      // show result on snackbar
      showOnSnackbar(copyResult)
    }
  });
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

function toggleMobileMenu() {
  document.querySelector("#mobile-menu")?.classList.toggle("hidden")
}

function hideMobileMenu() {
  document.querySelector("#mobile-menu")?.classList.toggle("hidden")
}

window.addEventListener('click', function (e) {
  if(!document.getElementById('user-menu-button')?.contains(e.target as Node))
    hideUserMenu();

  if(!document.getElementById('mobile-menu-button')?.contains(e.target as Node))
    hideMobileMenu();
})

document.querySelector("#user-menu-button")?.addEventListener("click", toggleUserMenu)
document.querySelector("#mobile-menu-button")?.addEventListener("click", toggleMobileMenu)
document.querySelector("#copy-button")?.addEventListener("click", copyUrl)
let urlToCopy = document.querySelector("#url-to-copy")
if(urlToCopy)
  urlToCopy.innerHTML = ENDPOINT_URL + userId
// retrieveReviews(userId);
retrieveReviews(userId);
