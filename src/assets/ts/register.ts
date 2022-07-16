import { togglePageLoadingAnimation, displayStatusMessage } from "./helper";
import { Const, ServerResponse } from "./const";

export function validateRegistrationForm() {
  //recaptcha-token
  const recaptchaToken =
    (document.getElementById("g-recaptcha-response") as HTMLInputElement).value;
  if (recaptchaToken) {
    //user-email
    const userEmail =
      (document.getElementById("user-email") as HTMLInputElement).value;

    // console.log(`${recaptchaToken} - ${userEmail}`);
    //toggle loading animation
    togglePageLoadingAnimation(true);

    fetch(Const.urlRegitration, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Const.anonBearer}`,
      },
      body: JSON.stringify({
        email: userEmail,
        recaptcha: recaptchaToken,
      }), // body data type must match "Content-Type" header
    })
      .then(function (response) {
        //disable loading animation
        togglePageLoadingAnimation(false);
        return response.json();
      })
      .then(function (myJson: ServerResponse) {
        console.log(myJson);
        const isValid = myJson.success;
        const _errMsg = myJson.message;
        if (isValid) {
          window.location.href = "mailcheck/";
        } else {
          displayStatusMessage(_errMsg);
        }
      });
  } else {
    displayStatusMessage("recaptcha not accepted");
  }
}
