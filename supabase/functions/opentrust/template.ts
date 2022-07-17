const ENDPOINT_URL =
  "https://neworder.deno.dev/";
const SHOPIFY_WEBHOOK_GUIDE =
  "https://help.shopify.com/en/manual/orders/notifications/webhooks#create-webhooks";

function verifyTemplateContent(
    link: string
) : string {
    return `
    <!doctype html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Opentrust Verify Email</title>
            <style>
            </style>
        </head>
        <body>
            <div class="content">
                <div class="row">
                    <h2>
                        You've requested to be registered on Opentrust
                    </h2>
                </div>
                <div class="row">
                    <p>Follow &nbsp;<a href="${link}"><strong>this link</strong></a>&nbsp; to verify your email</p>
                </div>
                <br>
                <div>
                    <p>from opentrust 🪴</p>
                </div>
            </div>
        </body>
    </html>`;
}

function registrationTemplateContent(
  email: string,
  password: string,
  uuid: string,
): string {
  return `
<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Opentrust Registration Email</title>
        <style>
        </style>
    </head>
    <body>
        <div class="content">
            <div class="row">
                <h2>
                    Thank you for registering 🎉
                </h2>
            </div>
            <div class="row">
                <p>Your can now login with &nbsp;<strong>${email}</strong>&nbsp; as email and &nbsp;<strong>${password}</strong>&nbsp; as password.</p>
            </div>
            <div class="row">
                <p>You need to setup a &nbsp;<a href="${SHOPIFY_WEBHOOK_GUIDE}"><strong>shopify webhook</strong></a>&nbsp; with the following URL: &nbsp;<strong>${ENDPOINT_URL + uuid}</strong></p>
            </div>
            <div class="row">
                <p>Set &nbsp;<strong>Order payment</strong>&nbsp; as Event, &nbsp;<strong>JSON</strong>&nbsp; as Format and the API version with tag &nbsp;<strong>Latest</strong>.</p>
            </div>
            <br>
            <div>
                <p>from opentrust 🪴</p>
            </div>
        </div>
    </body>
</html>`;
}

export { registrationTemplateContent, verifyTemplateContent };
