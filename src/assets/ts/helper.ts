export function togglePageLoadingAnimation(on: boolean) {
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

export function displayStatusMessage(text: string) {
  const sm = document.getElementById("status-message");
  if (sm) {
    sm.style.display = "inline";
    sm.innerHTML = text;
  }
}