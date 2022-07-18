import { Const, Orders } from "./const";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(Const.urlSupabase, Const.anonBearer);
// check if user is already logged in
const userId = supabase.auth.user()?.id ?? ""
if (!userId || userId === "") {
  window.location.href = "/";
}

// Buttons
document.querySelector("#menuReviewed")?.addEventListener(
  "click",
  menuReviewed,
);
document.querySelector("#menuSent")?.addEventListener("click", menuSent);
document.querySelector("#menuPending")?.addEventListener("click", menuPending);
document.querySelector("#menuLogout")?.addEventListener("click", menuLogout);

function menuReviewed() {
  retrieveReviews(userId)
}
function menuSent() {
  retrieveOrders(userId, true)
}
function menuPending() {
  retrieveOrders(userId, false)
}
function menuLogout() {
  supabase.auth.signOut().then((err) =>
    err.error ? console.log(err.error) : (window.location.href = "/")
  );
}

function showList(list: string){
  const list_content = document.querySelector("#list-content") ?? null
  if(list_content) 
    list_content.innerHTML = list
}

function showReviews(_reviews: any[]){
  let result = ""

  showList(result)
}

function showOrders(orders: Orders[]){
  let result = ""
  orders.forEach(order => {
    result += `<div>${JSON.stringify(order.email)}</div>`
  });
  showList(result)
}

async function retrieveReviews(user_id : string){
  if(user_id === "")
    return;

  const reviews: any[] = []
    
  showReviews(reviews);
}

async function retrieveOrders(user_id : string, _sent: boolean){
  if(user_id === "")
    return;
  
  const { data, error } = await supabase
    .from('orders')
    .select()
    .eq('user_id', userId)

  if(!error)
    showOrders(data);
  else
    console.log(error.message)
}

// retrieveReviews(userId);
retrieveOrders(userId, false);