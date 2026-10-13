(function(){var cfg=JSON.parse(document.getElementById("tcfg").textContent),root=document.getElementById("td"),URL_="https://script.google.com/macros/s/AKfycbwooOqnegMs8yKB6N-ou18fDzZD-6YFwAfngy7HItCAOHNHmVq2vm535fI7ddYoY4zg/exec",all=[];
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function photo(p){if(!p)return"";p=String(p).trim();var m=p.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=view&)?id=)([-\w]{20,})/);if(m)return"https://drive.google.com/thumbnail?id="+m[1]+"&sz=w600";if(/^https?:\/\//.test(p))return p;return"/assets/teachers/"+p}
function ini(n){return String(n).split(/\s+/).slice(0,2).map(function(w){return w.charAt(0).toUpperCase()}).join("")}
function uniq(k){var s=[];all.forEach(function(t){var v=String(t[k]||"").trim();if(v&&s.indexOf(v)<0)s.push(v)});return s}
function sel(label,k,state){var l=h("label",null,label+" ");var s=document.createElement("select");var o=document.createElement("option");o.value="";o.textContent=cfg.tdAll;s.appendChild(o);uniq(k).forEach(function(v){var x=document.createElement("option");x.value=v;x.textContent=v;s.appendChild(x)});s.onchange=function(){state[k]=s.value;draw()};l.appendChild(s);return l}
var state={subject:"",area:""},grid;
function draw(){grid.innerHTML="";var n=0;all.forEach(function(t){if(state.subject&&String(t.subject).trim()!==state.subject)return;if(state.area&&String(t.area).trim()!==state.area)return;n++;grid.appendChild(card(t))});if(!n)grid.appendChild(h("p",null,cfg.tdEmpty))}
function card(t){var c=h("article","tcard"),ph=h("div","tph"),u=photo(t.photo);
if(u){var im=document.createElement("img");im.src=u;im.alt=t.name;im.loading="lazy";im.onerror=function(){im.remove();ph.textContent=ini(t.name)};ph.appendChild(im)}else ph.textContent=ini(t.name);c.appendChild(ph);
var b=h("div","tbody");b.appendChild(h("h3",null,t.name));var meta=[t.subject,t.levels].filter(Boolean).join(" · ");if(meta)b.appendChild(h("div","tmeta",meta));if(t.area)b.appendChild(h("div","tarea",t.area));if(t.bio)b.appendChild(h("p",null,t.bio));c.appendChild(b);
var f=document.createElement("form");f.className="treq";f.hidden=true;
var n=document.createElement("input");n.name="name";n.required=true;n.maxLength=100;n.placeholder=cfg.tdName;n.autocomplete="name";
var p=document.createElement("input");p.name="phone";p.type="tel";p.required=true;p.maxLength=30;p.placeholder=cfg.tdPhone;p.autocomplete="tel";p.dir="ltr";
var hp=document.createElement("input");hp.name="website";hp.tabIndex=-1;hp.autocomplete="off";hp.style.cssText="position:absolute;left:-9999px";hp.setAttribute("aria-hidden","true");
var sb=h("button","btn",cfg.tdSend);sb.type="submit";var msg=h("div","tmsg");
f.appendChild(n);f.appendChild(p);f.appendChild(hp);f.appendChild(sb);f.appendChild(msg);
f.onsubmit=function(e){e.preventDefault();if(hp.value)return;sb.disabled=true;var row={type:"request",date:new Date().toLocaleString("fr-MA",{timeZone:"Africa/Casablanca"}),teacherId:t.id,teacher:t.name,name:n.value,phone:p.value,lang:cfg.lang};
fetch(URL_,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(row)}).then(function(){msg.textContent=cfg.tdOk;f.reset()}).catch(function(){msg.textContent=cfg.tdErr;sb.disabled=false})};
var rq=h("button","btn tbtn",cfg.tdReq);rq.type="button";rq.onclick=function(){f.hidden=!f.hidden;if(!f.hidden)n.focus()};c.appendChild(rq);c.appendChild(f);return c}
root.textContent=cfg.tdLoad;
fetch(URL_).then(function(r){return r.json()}).then(function(d){all=Array.isArray(d)?d:[];root.textContent="";if(!all.length){root.appendChild(h("p",null,cfg.tdEmpty));return}
var fl=h("div","tfilters");fl.appendChild(sel(cfg.tdSubject,"subject",state));fl.appendChild(sel(cfg.tdArea,"area",state));root.appendChild(fl);grid=h("div","tgrid");root.appendChild(grid);draw()}).catch(function(){root.textContent=cfg.tdErr2});
})();
