import { addCustomer, getCustomer, updateCustomer } from "./model.ts";

const CLIENT_ID = "670645219148-5f7edl6705d4lmaro7h01oucuh24rsv2.apps.googleusercontent.com";
const CLIENT_SECRET = Deno.env.get("CLIENT_SECRET") ?? "";
const REDIRECT_URI = "https://wincisky.github.io/opentrust/test.html";

const REFRESH_TOKEN_URI = "https://oauth2.googleapis.com/token";
const SEND_MAIL_URI = "https://gmail.googleapis.com/gmail/v1/users/{userId}/messages/send";


async function processCustomerCode(code: string) {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`
      })
      // console.log(JSON.stringify(await response.text()));
      const tokens = await response.json();
      const access_token = tokens.access_token;
      const refresh_token = tokens.refresh_token;
      const _id_token = tokens.id_token;

      const infoResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`)
      const info = await infoResponse.json()
      const mail = info.email;
  
      return await addCustomer(mail, refresh_token);
    } catch (error) {
      console.log(error);      
    }
}

async function refreshAccessToken(refresh_token: string) {
  const response = await fetch(REFRESH_TOKEN_URI, {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${refresh_token}&grant_type=refresh_token`
  });
  const tokens = await response.json();
  return tokens.access_token;
}

async function sendTestMail() {
  const recipient = "xsimone97@hotmail.it";
  const userId = "simonellassimo@gmail.com";
  const subject = "test";
  const message = `from:${userId}\nto:${recipient}\nsubject:${subject}\n\nhello world!`;
  const encodedMessage = btoa(message);
  const dataCustomer = await getCustomer(userId);
  if(!dataCustomer)
    return "error!";
  const refresh_token = dataCustomer[0].refresh_token;
  const access_token = await refreshAccessToken(refresh_token);
  const response = await fetch(SEND_MAIL_URI.replace("{userId}",userId), {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${access_token}`
    },
    body: `{"raw":"${encodedMessage}"}`
  });
  return JSON.stringify(await response.json());
}

export { processCustomerCode, sendTestMail };
