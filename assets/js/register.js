function _validateRegistrationForm() {
    //recaptcha-token
    var recaptchaToken = document.getElementById("g-recaptcha-response").value;
    if (recaptchaToken) {
        //user-email
        var userEmail = document.getElementById("user-email").value;
        // console.log(`${recaptchaToken} - ${userEmail}`);
        //toggle loading animation
        togglePageLoadingAnimation(true);
        fetch(urlRegitration, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ".concat(anonBearer)
            },
            body: JSON.stringify({
                email: userEmail,
                recaptcha: recaptchaToken
            })
        })
            .then(function (response) {
            //disable loading animation
            togglePageLoadingAnimation(false);
            return response.json();
        })
            .then(function (myJson) {
            console.log(myJson);
            var isValid = myJson.success;
            var _errMsg = myJson.message;
            if (isValid) {
                window.location.href = "mail-check.html";
            }
            else {
                displayStatusMessage(_errMsg);
            }
        });
    }
    else {
        displayStatusMessage("recaptcha not accepted");
    }
}
