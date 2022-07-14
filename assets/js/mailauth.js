// auth call
var CLIENT_ID = "825971864111-8k5j2td85vp6vijbc9ogjjsdvstu6kuo.apps.googleusercontent.com";
var REDIRECT_URI = "https://wincisky.github.io/opentrust/test.html";
var uriEnc = encodeURIComponent(REDIRECT_URI);
var scopeEnc = encodeURIComponent("https://mail.google.com/ https://www.googleapis.com/auth/userinfo.email");
var response = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=".concat(uriEnc, "&prompt=consent&response_type=code&client_id=").concat(CLIENT_ID, "&scope=").concat(scopeEnc, "&access_type=offline");
function _startGoogleAuth() {
    window.location.href = response;
}
