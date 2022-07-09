const urlRegitration = "https://gjclmptpvaepykpghadl.functions.supabase.co/opentrust";
const anonBearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqY2xtcHRwdmFlcHlrcGdoYWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3OTQ4OTksImV4cCI6MTk3MjM3MDg5OX0.n-WN4gsTP7HgmXjnupOtu-j0fj2hIiACEhy3NagJZt4";

function validateRegistrationForm() {
    console.log("form submitted!");

    //recaptcha-token
    const recaptchaToken = document.getElementById('g-recaptcha-response').value;
    if(recaptchaToken)
    {
    //user-email
    const userEmail = document.getElementById('user-email').value;

    console.log(`${recaptchaToken} - ${userEmail}`);
    document.getElementById('central-content').classList.add("disabled");

    return;

    fetch(urlRegitration, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonBearer}`,
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        });

    }else{
        const sm = document.getElementById('status-message');
        sm.style.display = "inline";
        sm.innerHTML = "recaptcha not accepted";    
    }
}

// $('#submitButton').on('click',function(){
//     $.ajax({
//           url: "http://localhost:15797/api/values",
//           type: 'POST',
//           data: { 
//                   firstName: $('#firstName').val(),
//                   lastName: $('#lastName').val()
//                 },
//           contentType: 'application/json',
//           headers: {
//                     "Authorization": "Bearer " + $('#tokenField').val()
//                  },
//           async: false
//             })
// });


