(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const p="/assets/bot-61bdb6bf.svg",m="/assets/user-bcdeb18e.svg",a=document.querySelector("form"),c=document.querySelector("#chat_container");let d;function v(t){t.textContent="",d=setInterval(()=>{t.textContent+=".",t.textContent=="...."&&(t.textContent="")},300)}function y(t,r){let o=0,s=setInterval(()=>{o<r.length?(t.innerHTML+=r.charAt(o),o++):clearInterval(s)},20)}function h(){const t=Date.now(),r=Math.random().toString(16);return`id-${t}${r}`}function l(t,r,o){return`
     <div class="wrapper ${t&&"ai"}">
      <div class="chat">
        <div class="profile">
        <img 
        src="${t?p:m}"
        alt="${t?"bot":"user"}" />
        </div>
        <div class="message" id=${o}>${r}</div>
      </div>
    </div>
`}const u=async t=>{t.preventDefault();const o=new FormData(a).get("promt");a.reset(),c.innerHTML+=l(!1,o);const s=h();c.innerHTML+=l(!0,"",s),c.scrollTop=c.scrollHeight;const e=document.getElementById(s);v(e);const n=await fetch("https://skbot-seven.vercel.app/s",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt:o})});clearInterval(d),e.innerHTML="";const f=(await n.json()).bot.trim();y(e,f)};a.addEventListener("submit",u);a.addEventListener("keyup",t=>{t.keyCode===13&&u(t)});
