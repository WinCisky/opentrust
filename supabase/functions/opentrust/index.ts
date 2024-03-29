// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
  processCustomerCode,
  sendMail,
  userRegistration,
  userLogin,
  userRegistrationTest,
  getUnsentEmails,
  sendEmails,
} from "./controller.ts";

console.log("Hello from Functions!");

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.pathname.replace("/opentrust", "");
    // console.log(url.pathname);
    switch (pathname) {
      // deno-lint-ignore no-case-declarations
      case "/test":
        const { code } = await req.json();
        await processCustomerCode(code);
        break;
      case "/test2":
        console.log(await getUnsentEmails());
        // console.log(await sendMail("xsimone97@hotmail.it", "test", "content!"));
        break;
      case "/sendEmails":
        await sendEmails();
        break;
      case "/neworder":
        console.log(req.json());
        break;
      case "/userRegistration":
        // return new Response(
        //   JSON.stringify(await userRegistration(await req.json())),
        //   {
        //     headers: { ...corsHeaders, "Content-Type": "application/json" },
        //     status: 200,
        //   },
        // );
        return new Response(
          JSON.stringify(await userRegistrationTest(await req.json())),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      case "/userLogin":
        return new Response(
          JSON.stringify(await userLogin(await req.json())),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );

      default:
        //newOrder
        if (
          pathname.includes("/neworder/") && pathname.indexOf("/neworder/") == 0
        ) {
          const uuid = pathname.replace("/neworder/", "");
          console.log(uuid);
          console.log(req.json());
        }
        break;
    }

    return new Response(JSON.stringify("ok"), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
