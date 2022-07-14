const urlRegitration =
  "https://gjclmptpvaepykpghadl.functions.supabase.co/opentrust/userRegistration";
const urlLogin =
  "https://gjclmptpvaepykpghadl.functions.supabase.co/opentrust/userLogin";
const anonBearer =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqY2xtcHRwdmFlcHlrcGdoYWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3OTQ4OTksImV4cCI6MTk3MjM3MDg5OX0.n-WN4gsTP7HgmXjnupOtu-j0fj2hIiACEhy3NagJZt4";

interface ServerResponse{
  success: boolean,
  message: string
}

function setCookie(name: string, value: string, days: number) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c?.charAt(0) == " ") c = c.substring(1, c.length);
    if (c?.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function togglePageLoadingAnimation(on: boolean) {
  const central_content = document.getElementById("central-content");
  const loading_animation = document.getElementById("loading-animation");
  if (on) {
    central_content?.classList.add("disabled");
    if (loading_animation) loading_animation.style.display = "inline";
  } else {
    central_content?.classList.remove("disabled");
    if (loading_animation) loading_animation.style.display = "none";
  }
}

function displayStatusMessage(text: string) {
  const sm = document.getElementById("status-message");
  if (sm) {
    sm.style.display = "inline";
    sm.innerHTML = text;
  }
}

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b : any) => b.toString(16).padStart(2, "0")).join(
    "",
  ); // convert bytes to hex string
  return hashHex;
}
