(function(){var $=function(s){return document.querySelector(s)};
var SHEET_URL="https://script.google.com/macros/s/AKfycbwooOqnegMs8yKB6N-ou18fDzZD-6YFwAfngy7HItCAOHNHmVq2vm535fI7ddYoY4zg/exec";
var lg=$("#lg");$("#logoBtn").onclick=function(){lg.showModal()};$("#lgx").onclick=function(){lg.close()};lg.onclick=function(e){if(e.target===lg)lg.close()};
var f=$("#f");
if(f){f.onsubmit=function(e){e.preventDefault();var d={};new FormData(f).forEach(function(v,k){d[k]=v});var m=$("#msg");if(d.website){return}
var row={date:new Date().toLocaleString("fr-MA",{timeZone:"Africa/Casablanca"}),name:d.name,phone:d.phone,level:d.level,goal:d.goal,message:d.message,lang:document.documentElement.lang};
fetch(SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(row)}).then(function(){m.textContent=f.dataset.ok;f.reset()}).catch(function(){m.textContent=f.dataset.err})}}
var P=window.PRICES||{};document.querySelectorAll("[data-price]").forEach(function(el){var v=P[el.dataset.price];if(v){el.textContent=v+" "+el.dataset.cur}});
})();
