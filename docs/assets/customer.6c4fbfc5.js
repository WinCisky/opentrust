import{c as L,C as a}from"./index.65e6a27d.js";/* empty css             */const _=""+new URL("icon_sent.575f91f5.svg",import.meta.url).href,y=""+new URL("icon_wait.05ce8f12.svg",import.meta.url).href,b="https://neworder.deno.dev/",S="https://help.shopify.com/en/manual/orders/notifications/webhooks#create-webhooks",r=L(a.urlSupabase,a.anonBearer);var d,l;const i=(l=(d=r.auth.user())==null?void 0:d.id)!=null?l:"";(!i||i==="")&&(window.location.href="/");var u;(u=document.querySelector("#menuReviewed"))==null||u.addEventListener("click",E);var m;(m=document.querySelector("#menuOrders"))==null||m.addEventListener("click",O);var v;(v=document.querySelector("#menuLogout"))==null||v.addEventListener("click",f);var g;(g=document.querySelector("#menuCredentials"))==null||g.addEventListener("click",k);function E(){I(i)}function O(){p(i)}function k(){var e,n;const t=(e=document.querySelector("#list-content"))!=null?e:null;t&&(t.innerHTML=`
    <div>
      <div>
        <div class="row">
          <p>You need to setup a &nbsp;<a href="${S}"><strong>shopify webhook</strong></a>&nbsp;
          with the following URL: &nbsp;<strong>${b+i}</strong></p>
        </div>
        <div class="row">
          <p>Set &nbsp;<strong>Order payment</strong>&nbsp; as Event, &nbsp;<strong>JSON</strong>&nbsp;
          as Format and the API version with tag &nbsp;<strong>Latest</strong>.</p>
        </div>
      </div>
      <div>
        <div id='menuLogout' class='button'>Logout</div>
      </div>
    </div>
    `,(n=document.querySelector("#menuLogout"))==null||n.addEventListener("click",f))}function f(){r.auth.signOut().then(t=>t.error?console.log(t.error):window.location.href="/")}function h(t){var n;const e=(n=document.querySelector("#list-content"))!=null?n:null;e&&(e.innerHTML=t)}function q(t){let e="",n={year:"numeric",month:"long",day:"numeric"};t.forEach(o=>{var s;let c=new Date(o.created_at);e+="<div class='list-item'>",e+="  <div>",e+=c.toLocaleDateString("en-US",n),e+="  </div>",e+="  <div>",e+=(s=o.name)!=null?s:"- no name -",e+="  </div>",e+="  <div>",e+=o.title,e+="  </div>",e+="  <div>",e+=o.score/20,e+="  </div>",e+="</div>"}),h(e)}function R(t){let e="",n={year:"numeric",month:"long",day:"numeric"};t.forEach(o=>{let c=o.sent?_:y,s=o.sent?"black-to-green-filter":"black-to-yellow-filter",w=new Date(o.created_at);e+="<div class='list-item'>",e+="  <div>",e+=w.toLocaleDateString("en-US",n),e+="  </div>",e+="  <div>",e+=o.email,e+="  </div>",e+="  <div>",e+=`    <img src='${c}' class='${s}' width=40px height=40px>`,e+="  </div>",e+="</div>"}),h(e)}async function I(t){if(t==="")return;const{data:e,error:n}=await r.from("reviews").select().eq("user_id",i).order("created_at",{ascending:!1}).limit(10);n?console.log(n.message):q(e)}async function p(t,e){if(t==="")return;const{data:n,error:o}=await r.from("orders").select().eq("user_id",i).order("created_at",{ascending:!1}).limit(15);o?console.log(o.message):R(n)}p(i);
