import"./modulepreload-polyfill.b7f2da20.js";/* empty css              */const a="https://review.deno.dev",s=5;let i=4;function c(n){for(let e=1;e<=s;e++){const t=document.querySelector(`#star-${e}`);e<=n?t==null||t.classList.add("text-amber-500"):t==null||t.classList.remove("text-amber-500")}i=n}function d(n){const e=n.currentTarget.index;c(e)}function r(n){var e=null,t=[];return location.search.substr(1).split("&").forEach(function(o){t=o.split("="),t[0]===n&&(e=decodeURIComponent(t[1]))}),e}function l(){const n=r("order"),e=r("name"),t=document.getElementById("description").value;fetch(a+"/"+n,{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({description:t,score:i,name:e})}).then(()=>window.location.href=lang&&lang=="it"?"/thanks/it/":"/thanks/")}function u(){var o;const n=r("name");if(!n||n=="")return;const e=document.getElementById("greeting");let t=(o=e==null?void 0:e.innerHTML)!=null?o:"";t+=n+",",e&&(e.innerHTML=t)}function m(){var o;const n=r("shop");if(!n||n=="")return;const e=document.getElementById("website");let t=(o=e==null?void 0:e.innerHTML)!=null?o:"";t+=n,e&&(e.innerHTML=t)}document.addEventListener("DOMContentLoaded",()=>{var n;u(),m(),(n=document.querySelector("#reviewForm"))==null||n.addEventListener("submit",l);for(let e=1;e<=s;e++){const t=document.querySelector(`#star-${e}`);t&&(t.index=e,t.addEventListener("click",d,!1))}c(i)},!1);