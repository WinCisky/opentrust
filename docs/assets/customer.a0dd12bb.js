import"./modulepreload-polyfill.b7f2da20.js";/* empty css              */import{c as O,C as m}from"./index.77536023.js";import{i as T,a as C}from"./icon_wait.ae8f9c92.js";const E="https://neworder.deno.dev/",H="https://help.shopify.com/en/manual/orders/notifications/webhooks#create-webhooks",s=O(m.urlSupabase,m.anonBearer);var g,p;const r=(p=(g=s.auth.user())==null?void 0:g.id)!=null?p:"";(!r||r==="")&&(window.location.href="/");var v;(v=document.querySelector("#menuReviewed"))==null||v.addEventListener("click",K);var b;(b=document.querySelector("#menuOrders"))==null||b.addEventListener("click",R);var y;(y=document.querySelector("#user-menu-logout"))==null||y.addEventListener("click",u);var h;(h=document.querySelector("#user-menu-mobile-logout"))==null||h.addEventListener("click",u);var w;(w=document.querySelector("#menuCredentials"))==null||w.addEventListener("click",U);function K(){x(r)}function R(){W(r)}function U(){var e,n;const t=(e=document.querySelector("#list-content"))!=null?e:null;t&&(t.innerHTML=`
    <div>
      <div>
        <div class="row">
          <p>You need to setup a &nbsp;<a href="${H}"><strong>shopify webhook</strong></a>&nbsp;
          with the following URL: &nbsp;<strong>${E+r}</strong></p>
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
    `,(n=document.querySelector("#menuLogout"))==null||n.addEventListener("click",u))}function u(){s.auth.signOut().then(t=>t.error?console.log(t.error):window.location.href="/")}function q(t){var n;const e=(n=document.querySelector("#table-content"))!=null?n:null;e&&(e.innerHTML=t)}function B(t){let e="";for(let n=1;n<=5;n++)e+=`
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${n<=t?"text-yellow-500":"text-slate-200"}" viewBox="0 0 20 20" fill="currentColor">
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    `;return e}function D(t){let e="",n={year:"numeric",month:"long",day:"numeric"};t.forEach(o=>{var d;let i=new Date(o.created_at);e+="<tr>",e+='  <td class="border-b border-slate-100  p-4 pl-8 text-slate-500 ">',e+=i.toLocaleDateString("en-US",n),e+="  </td>",e+='  <td class="border-b border-slate-100  p-4 text-slate-500 ">',e+=(d=o.name)!=null?d:"- no name -",e+="  </td>",e+='  <td class="border-b border-slate-100  p-4 text-slate-500 ">',e+=o.title,e+="  </td>",e+='  <td class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">',e+='    <div class="flex items-center">',e+=B(o.score),e+="    </div>",e+="  </td>",e+="</tr>"}),q(e)}function $(t){let e="",n={year:"numeric",month:"long",day:"numeric"};t.forEach(o=>{let i=o.sent?T:C,d=o.sent?"stroke-white":"fill-yellow",M=new Date(o.created_at);e+="<tr>",e+='  <td class="border-b border-slate-100  p-4 pl-8 text-slate-500 ">',e+=M.toLocaleDateString("en-US",n),e+="  </td>",e+='  <td class="border-b border-slate-100  p-4 text-slate-500 ">',e+=o.email,e+="  </td>",e+='  <td class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">',e+=`    <img src='${i}' class='${d}' width=40px height=40px>`,e+="  </td>",e+="</tr>"}),q(e)}async function x(t){if(t==="")return;const{data:e,error:n}=await s.from("reviews").select().eq("user_id",r).order("created_at",{ascending:!1}).limit(10);n?console.log(n.message):D(e)}const a=document.querySelector("#snackbar");let c=[];function N(t){t.style.animation="none",t.offsetHeight,t.style.animation=""}function I(){if(c.length<=0)return;let t=c[0];a&&(N(a),a.innerHTML=t,a.classList.remove("hidden"),setTimeout(()=>{a.classList.add("hidden"),c.shift(),I()},1950))}function l(t){let e=c.length<=0;c.push(t),e&&I()}function P(){const t=document.querySelector("#url-to-copy"),e="clipboard-write";let n="Can't copy to clipboard";navigator.permissions.query({name:e}).then(o=>{var i;o.state=="granted"||o.state=="prompt"?navigator.clipboard.writeText((i=t==null?void 0:t.innerHTML.trim())!=null?i:"").then(function(){n="Copied to clipboard",l(n)},function(){l(n)}):l(n)})}function F(){const t=document.getElementById("verification-key");if(t){const e=s.auth.user().user_metadata;if("verification_key"in e){const n=e.verification_key;t.value=n}}}function V(){let t="Error, not saved";const e=document.getElementById("verification-key");if(e){const n=e.value.trim();n.length>0&&s.auth.update({data:{verification_key:n}}).then(o=>{o.error?t=o.error.message:t="Key saved",l(t)})}else l(t)}async function W(t,e){if(t==="")return;const{data:n,error:o}=await s.from("orders").select().eq("user_id",r).order("created_at",{ascending:!1}).limit(15);o?console.log(o.message):$(n)}function Y(){var t;(t=document.querySelector("#user-menu"))==null||t.classList.toggle("hidden")}function z(){var t;(t=document.querySelector("#user-menu"))==null||t.classList.add("hidden")}function A(){var t;(t=document.querySelector("#mobile-menu"))==null||t.classList.toggle("hidden")}function G(){var t;(t=document.querySelector("#mobile-menu"))==null||t.classList.add("hidden")}window.addEventListener("click",function(t){var e,n;(e=document.getElementById("user-menu-button"))!=null&&e.contains(t.target)||z(),(n=document.getElementById("mobile-menu-button"))!=null&&n.contains(t.target)||G()});var L;(L=document.querySelector("#user-menu-button"))==null||L.addEventListener("click",Y);var S;(S=document.querySelector("#mobile-menu-button"))==null||S.addEventListener("click",A);var k;(k=document.querySelector("#copy-button"))==null||k.addEventListener("click",P);var _;(_=document.querySelector("#save-verification-key"))==null||_.addEventListener("click",V);let f=document.querySelector("#url-to-copy");f&&(f.innerHTML=E+r);x(r);F();
