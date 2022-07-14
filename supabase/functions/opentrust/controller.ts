import {
  addCustomer,
  getCustomer,
  getCustomerWithPassword,
  storeAccessToken,
} from "./model.ts";
import { registrationTemplateContent } from "./template.ts";
import { LoginCredentials, RegistrationCredentials } from "./interfaces.ts";

const MAIL_ACTUAL = "simonellassimo@gmail.com";
const MAIL_ALIAS = "register@opentrust.it";

const PWD_CHARS =
  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PWD_MIN = 12;
const PWD_MAX = 16;

const CLIENT_ID =
  "825971864111-8k5j2td85vp6vijbc9ogjjsdvstu6kuo.apps.googleusercontent.com";
const CLIENT_SECRET = Deno.env.get("CLIENT_SECRET") ?? "";
const REDIRECT_URI = "https://wincisky.github.io/opentrust/test.html";

const REFRESH_TOKEN_URI = "https://oauth2.googleapis.com/token";
const SEND_MAIL_URI =
  "https://gmail.googleapis.com/gmail/v1/users/{userId}/messages/send";

const CAPTCHA_SECRET = Deno.env.get("CAPTCHA_SECRET") ?? "";
const VERIFY_CAPTCHA_URI = "https://www.google.com/recaptcha/api/siteverify";

const REFRESH_TOKEN = Deno.env.get("REFRESH_TOKEN") ?? "";

async function processCustomerCode(code: string) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`,
    });
    // console.log(JSON.stringify(await response.text()));
    const tokens = await response.json();
    const access_token = tokens.access_token;
    const refresh_token = tokens.refresh_token;
    const _id_token = tokens.id_token;

    const infoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
    );
    const info = await infoResponse.json();
    const mail = info.email;

    return await addCustomer(mail, refresh_token);
  } catch (error) {
    console.log(error);
  }
}

async function refreshAccessToken(refresh_token: string) {
  const response = await fetch(REFRESH_TOKEN_URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${refresh_token}&grant_type=refresh_token`,
  });
  const tokens = await response.json();
  return tokens.access_token;
}

function b64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}

async function sendMail(
  recipient: string,
  subject: string,
  content: string,
  utf8 = false,
) {
  const userId = MAIL_ACTUAL;
  const message = "from:" + MAIL_ALIAS + "\r\n" +
    "to:" + recipient + "\r\n" +
    "subject:" + subject + "\r\n" +
    "Content-Type: text/html; charset='UTF-8'\r\n" +
    "Content-Transfer-Encoding: base64\r\n\r\n" + content;
  const encodedMessage = utf8 ? b64EncodeUnicode(message) : btoa(message);
  const access_token = await refreshAccessToken(REFRESH_TOKEN);
  const response = await fetch(SEND_MAIL_URI.replace("{userId}", userId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    },
    body: `{"raw":"${encodedMessage}"}`,
  });
  return JSON.stringify(await response.json());
}

function createPassword(): string {
  const passwordLength = Math.floor(
    Math.random() * (PWD_MAX - PWD_MIN + 1) + PWD_MIN,
  );
  let password = "";
  let randomNumber = 0;
  for (let i = 0; i <= passwordLength; i++) {
    randomNumber = Math.floor(Math.random() * PWD_CHARS.length);
    password += PWD_CHARS.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  ); // convert bytes to hex string
  return hashHex;
}

async function userRegistration(
  data: RegistrationCredentials,
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(VERIFY_CAPTCHA_URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${CAPTCHA_SECRET}&response=${data.recaptcha}`,
  });
  const challenge = await response.json();
  if (!challenge.success) {
    return {
      success: challenge.success,
      message: challenge["error-codes"] ?? "",
    };
  }

  const customer = await getCustomer(data.email);
  if (!customer || customer.length > 0) {
    return { success: false, message: "the email is already registered" };
  }

  const password = createPassword();
  const hashedPassword = await digestMessage(password);

  //save on db
  const [resultAdd, errorAdd] = await addCustomer(data.email, hashedPassword);
  if (errorAdd) {
    return { success: false, message: errorAdd.message };
  }
  if (resultAdd?.length != 1) {
    return {
      success: false,
      message: "more than one account with that password?!",
    };
  }
  const uuid = resultAdd[0].uuid; //can safely get the value

  //send email
  const sendResp = await sendMail(
    data.email,
    "Opentrust registration completed",
    registrationTemplateContent(data.email, password, uuid),
    true,
  );

  console.log(sendResp);

  return { success: true, message: sendResp };
}

async function userLogin(
  data: LoginCredentials,
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(VERIFY_CAPTCHA_URI, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${CAPTCHA_SECRET}&response=${data.recaptcha}`,
  });
  const challenge = await response.json();
  if (!challenge.success) {
    return {
      success: challenge.success,
      message: challenge["error-codes"] ?? "",
    };
  }

  console.log("user login recaptcha success");

  const customer = await getCustomerWithPassword(
    data.email,
    data.hashedPassword,
  );
  if (!customer || customer.length > 0) {
    //create new random token
    const pwd = createPassword();
    const randomToken = await digestMessage(pwd);
    //TODO: check if another user has the same token -> make new token
    //store the token and the timestamp for creation
    const [ _resultStore, errorStore ] = await storeAccessToken(data.email, randomToken);
    if(errorStore)
      return { success: false, message: errorStore.message };    

    return { success: true, message: JSON.stringify({ token : randomToken }) };
  }

  return {
    success: false,
    message: "user not found or wrong email password combination",
  };
}

export { processCustomerCode, sendMail, userLogin, userRegistration };
