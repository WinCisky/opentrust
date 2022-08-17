declare var lang: string | null
const REVIEW_URL = "https://review.deno.dev";
const total_stars = 5;
let stars_number = 4;

function selectedScore(selected_index: number) {
  for (let index = 1; index <= total_stars; index++) {
    const element = document.querySelector(`#star-${index}`);
    index <= selected_index
      ? element?.classList.add("text-amber-500")
      : element?.classList.remove("text-amber-500");
  }
  stars_number = selected_index;
}

function handleStarClick(evt: any) {
  const selected_index = evt.currentTarget.index;
  selectedScore(selected_index);
}

function findGetParameter(parameterName: string) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

export function validateReviewForm() {
  const order = findGetParameter("order");
  const name = findGetParameter("name");
  const description =
    (document.getElementById("description") as HTMLInputElement).value;
  fetch(REVIEW_URL + '/' + order, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        description: description, 
        score: stars_number,
        name: name
    })
  }).then(() => window.location.href = (lang && lang == "it") ? "/thanks/it/" : "/thanks/" );
}

function displayName(){
  const userName = findGetParameter("name");
  if(!userName || userName == "")
    return;
  const greeting = document.getElementById("greeting");
  let greetingText = greeting?.innerHTML ?? "";
  greetingText += userName + ",";
  if(greeting)
    greeting.innerHTML = greetingText;
}

function displayWebsite(){
  const shop = findGetParameter("shop");
  if(!shop || shop == "")
    return;
  const website = document.getElementById("website");
  let websiteText = website?.innerHTML ?? "";
  websiteText += shop;
  if(website)
    website.innerHTML = websiteText;
}

document.addEventListener("DOMContentLoaded", () => {
  displayName();
  displayWebsite();

  document.querySelector("#reviewForm")?.addEventListener(
    "submit",
    validateReviewForm,
  );
  for (let index = 1; index <= total_stars; index++) {
    const element: any = document.querySelector(`#star-${index}`);
    if (element) {
      element.index = index;
      element.addEventListener("click", handleStarClick, false);
    }
  }
  selectedScore(stars_number);
  
}, false);

export {};
