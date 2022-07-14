function _validateLoginForm() {
    //recaptcha-token
    var recaptchaToken = document.getElementById("g-recaptcha-response").value;
    // debug purposes
    if (recaptchaToken || true) {
        //user-email
        var userEmail_1 = document.getElementById("user-email").value;
        var userPassword = document.getElementById("user-password").value;
        togglePageLoadingAnimation(true);
        digestMessage(userPassword).then(function (hashedPassword) {
            console.log(hashedPassword);
            fetch(urlLogin, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer ".concat(anonBearer)
                },
                body: JSON.stringify({
                    email: userEmail_1,
                    recaptcha: recaptchaToken,
                    hashedPassword: hashedPassword
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
                    displayStatusMessage(_errMsg); //debug purposes
                    // window.location.href = "customer.html";
                }
                else {
                    displayStatusMessage(_errMsg);
                }
            });
        });
    }
    else {
        displayStatusMessage("recaptcha not accepted");
    }
}
