import { Const } from "./const";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//     Const.urlSupabase,
//     Const.anonBearer
//   );
// console.log(JSON.stringify(supabase.auth.user()));

// async function signIn(email: string, password: string) {
//     return await supabase.auth.signIn({
//         email: email,
//         password: password,
//     })
// }

export const logInSubmitted = (event: any) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;

//   signIn(email, password).then(user=>{
//     console.log(JSON.stringify(user))
//   }).catch(error => console.log(error))

//   supabase.auth.signIn({
//     email: email,
//     password: password,
//   }).then((resp) => {
//     console.log(JSON.stringify(resp))
//   }).catch((err) => {
//     console.log(JSON.stringify(err))
//   })

//   supabase.auth
//     .signIn({ email, password })
//     .then((response: any) => {
//         response.error ? alert(response.error.message) : setToken(response);
//         console.log(JSON.stringify(supabase.auth.user()));
//         console.log(JSON.stringify(response))
//     })
//     .catch((err: any) => {
//       alert(JSON.stringify(err));
//     });





fetch('https://gjclmptpvaepykpghadl.supabase.co/auth/v1/token?grant_type=password', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      "apikey": `${Const.anonBearer}`,
    },
    body: JSON.stringify({
      email: email,
      password: password
    }), // body data type must match "Content-Type" header
  })
    .then(function (response) {
      //disable loading animation
    //   togglePageLoadingAnimation(false);
      return response.json();
    })
    .then(function (myJson: any) {
      console.log(myJson);
    //   const isValid = myJson.success;
    //   const _errMsg = myJson.message;
    //   if (isValid) {
    //     displayStatusMessage(_errMsg); //debug purposes
    //     // window.location.href = "customer.html";
    //   } else {
    //     displayStatusMessage(_errMsg);
    //   }
    });






};

function setToken(response: any) {
  if (response.user.confirmation_sent_at && !response?.session?.access_token) {
    alert("Confirmation Email Sent");
  } else {
    // document.querySelector("#access-token")?.value =
    //   response.session.access_token;
    // document.querySelector("#refresh-token")?.value =
    //   response.session.refresh_token;
    console.log(response.session.access_token)
    console.log(response.session.refresh_token)

    alert("Logged in as " + response.user.email);
  }
}

