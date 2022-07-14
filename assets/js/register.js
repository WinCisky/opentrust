function _validateRegistrationForm() {
    // console.log("form submitted!");

    //recaptcha-token
    const recaptchaToken = document.getElementById('g-recaptcha-response').value;
    if(!recaptchaToken){
        displayStatusMessage(text = "recaptcha not accepted");
        return false;
    }
    
    //user-email
    const userEmail = document.getElementById('user-email').value;
    if(!userEmail){
        displayStatusMessage(text = "mail not specified");
        return false;
    }

    // console.log(`${recaptchaToken} - ${userEmail}`);
    //toggle loading animation
    togglePageLoadingAnimation(on = true);

    fetch(urlRegitration, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonBearer}`,
        },
        body: JSON.stringify({
            email : userEmail,
            recaptcha : recaptchaToken
        }) // body data type must match "Content-Type" header
    })
        .then(function (response) {
            //disable loading animation
            togglePageLoadingAnimation(on = false);
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            const isValid = myJson.success;
            const _errMsg = myJson.message;
            if(isValid)
                window.location.href = "mail-check.html";
            else
                displayStatusMessage(text = _errMsg);
        });
}
