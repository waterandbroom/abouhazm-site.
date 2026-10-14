(function(){
var cfg=JSON.parse(document.getElementById("ltcfg").textContent),root=document.getElementById("lt");if(!root)return;
var LV=["A1","A2","B1","B2","C1","C2"];
var B=[
[["My name ___ Sara.",["am","is","are","be"],1],["___ you from Morocco?",["Is","Are","Do","Does"],1],["I ___ two brothers.",["have","has","am","is"],0],["She ___ in a bank.",["work","works","working","is work"],1],["There ___ a cat on the sofa.",["is","are","am","be"],0],["I ___ coffee. I prefer tea.",["don't like","doesn't like","not like","no like"],0]],
[["Yesterday I ___ my friends in town.",["meet","met","meeted","meeting"],1],["She is ___ than her sister.",["tall","taller","tallest","more tall"],1],["We ___ dinner when the phone rang.",["have","were having","has","are having"],1],["How ___ sugar do you want in your tea?",["many","much","long","often"],1],["I'm going to ___ a doctor tomorrow.",["see","seeing","sees","saw"],0],["You ___ wear a seatbelt in the car. It's the law.",["must","mustn't","can't","might"],0]],
[["If it rains tomorrow, we ___ at home.",["stay","will stay","stayed","would stay"],1],["I have lived in Casablanca ___ 2015.",["for","since","from","during"],1],["She asked me where ___.",["I lived","did I live","do I live","I do live"],0],["This book was ___ by a famous author.",["write","wrote","written","writing"],2],["I'm not used to ___ up so early.",["get","getting","got","gets"],1],["He didn't come to the meeting ___ he was ill.",["because","although","so","but"],0]],
[["If she had studied harder, she ___ the exam.",["would pass","would have passed","will pass","had passed"],1],["He suggested ___ a taxi because it was late.",["to take","taking","take","for taking"],1],["By this time next year, they ___ the building.",["will finish","will have finished","finish","are finishing"],1],["I wish I ___ more time yesterday.",["had","have","had had","would have"],2],["The manager insisted ___ the report immediately.",["on receiving","to receive","for receiving","receiving of"],0],["She is ___ the most talented players in the team.",["by far","one of","much of","a lot"],1]],
[["Hardly ___ the house when it started to rain.",["he had left","had he left","he left","did he leave"],1],["It's high time we ___ a decision.",["make","made","will make","are making"],1],["The results were ___ with what the researchers had predicted.",["consistent","consequent","consisting","consistently"],0],["Not only ___ late, but he also forgot the documents.",["he arrived","did he arrive","arrived he","he did arrive"],1],["The proposal, ___ was widely criticised, was eventually withdrawn.",["which","what","that","who"],0],["His explanation was so ___ that nobody could follow it.",["convoluted","convenient","conclusive","convinced"],0]],
[["Had it not been for her intervention, the negotiations ___ collapsed.",["would have","will have","would","had"],0],["Critics dismissed the new policy as little more than a ___ to appease voters.",["sop","sip","sap","sup"],0],["Scarcely anyone ___ aware of the risks until it was too late.",["was","were","had been being","are"],0],["The minister's remarks were deliberately ___, allowing several interpretations.",["equivocal","equitable","equable","equidistant"],0],["Were he to resign, the party ___ in disarray.",["would be left","is left","will leave","had left"],0],["She has an uncanny ___ for spotting errors that others overlook.",["knack","nuance","notion","nook"],0]]];
var TOTAL=36,bi=0,qi=0,sc=[],asked=0,cur=[];
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function prep(b){cur=shuf(B[b]).map(function(q){var idx=shuf([0,1,2,3]);return{t:q[0],o:idx.map(function(k){return q[1][k]}),c:idx.indexOf(q[2])}})}
function start(){root.innerHTML="";document.querySelectorAll("tr.me").forEach(function(r){r.classList.remove("me");var y=r.querySelector(".you");if(y)y.remove()});
 var b=h("button","btn y",cfg.start);b.type="button";b.onclick=function(){bi=0;qi=0;sc=[0];asked=0;prep(0);show()};root.appendChild(b)}
function show(){root.innerHTML="";var bar=h("div","lt-bar"),f=h("div","lt-fill");f.style.width=(asked/TOTAL*100)+"%";bar.appendChild(f);root.appendChild(bar);
 root.appendChild(h("p","lt-n",cfg.q+" "+(asked+1)+" "+cfg.of+" "+TOTAL));
 var q=cur[qi],s=h("h2","lt-q",q.t);s.dir="ltr";s.style.textAlign="start";root.appendChild(s);
 var box=h("div","lt-opts");box.dir="ltr";
 q.o.forEach(function(o,k){var b=h("button","lt-opt",o);b.type="button";b.onclick=function(){pick(k===q.c)};box.appendChild(b)});
 var d=h("button","lt-opt idk",cfg.idk);d.type="button";d.onclick=function(){pick(false)};box.appendChild(d);root.appendChild(box)}
function pick(ok){if(ok)sc[bi]++;asked++;qi++;
 if(qi>=cur.length){ if(sc[bi]<3||bi>=5){finish();return} bi++;qi=0;sc[bi]=0;prep(bi)}
 show()}
function finish(){var n=sc.length,lvl=-1;for(var b=0;b<n;b++){if(sc[b]>=4)lvl=b;else break}
 var low=lvl<0;if(low)lvl=0;var code=LV[lvl],name=cfg.names[code],tot=sc.reduce(function(a,b){return a+b},0);
 var nxt=lvl+1<n&&sc[lvl+1]===3?lvl+1:-1;
 root.innerHTML="";var box=h("div","lt-res");box.appendChild(h("p","lt-n",cfg.res));
 var big=h("div","lt-big");big.appendChild(h("b","",code));big.appendChild(h("span","",name));box.appendChild(big);
 box.appendChild(h("p","lt-sc",cfg.score+": "+tot+" / "+asked));
 box.appendChild(h("p","",cfg.expl[code]));
 if(nxt>=0)box.appendChild(h("p","lt-close",cfg.close.replace("{n}",LV[nxt]).replace("{s}",sc[nxt])));
 if(lvl===5&&sc[5]>=4)box.appendChild(h("p","lt-close",cfg.top));
 var row=h("div","row");
 var wa=h("a","btn alt",cfg.wa);wa.href="https://wa.me/212654242024?text="+encodeURIComponent(cfg.msg.replace("{lvl}",code+" ("+name+")"));wa.target="_blank";wa.rel="noopener";
 var bk=h("a","btn y",cfg.book);bk.href=({ar:"/contact/",fr:"/fr/contact/",en:"/en/contact/"})[cfg.lang];
 var ag=h("button","btn alt",cfg.again);ag.type="button";ag.onclick=function(){start();root.scrollIntoView({behavior:"smooth"})};
 row.appendChild(bk);row.appendChild(wa);row.appendChild(ag);box.appendChild(row);root.appendChild(box);
 var tr=document.querySelector('tr[data-lv="'+code+'"]');
 document.querySelectorAll("tr.me").forEach(function(r){r.classList.remove("me")});
 if(tr){tr.classList.add("me");var c=tr.querySelector(".cef");if(c&&!tr.querySelector(".you")){var y=h("span","you",cfg.you);c.parentNode.appendChild(y)}}
 root.scrollIntoView({behavior:"smooth",block:"start"})}
start();
})();
