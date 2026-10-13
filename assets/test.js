(function(){var cfg=JSON.parse(document.getElementById("ltcfg").textContent),root=document.getElementById("lt");
var Q=[["She ___ a student.",["am","is","are","be"],1],["I ___ tea every day.",["drink","drinks","drinking","am drink"],0],["There ___ two books on the table.",["is","are","be","am"],1],["What time ___ you get up?",["do","does","are","have"],0],
["Yesterday we ___ to the beach.",["go","goes","went","gone"],2],["He is ___ than his brother.",["tall","taller","tallest","more tall"],1],["I'm going to ___ my grandmother this weekend.",["visit","visiting","visited","visits"],0],["How ___ water do you drink a day?",["many","much","long","often"],1],
["If it rains tomorrow, we ___ at home.",["stay","will stay","stayed","would stay"],1],["I have lived here ___ 2015.",["for","since","from","during"],1],["She asked me where ___.",["I lived","did I live","do I live","I do live"],0],["The film was so boring that I ___ asleep.",["fell","fall","falling","have fallen"],0],
["You ___ smoke here. It's forbidden.",["mustn't","don't have to","needn't","wouldn't"],0],["If I ___ you, I would apologise.",["am","was","were","will be"],2],["By next year, they ___ the building.",["will finish","will have finished","finish","are finishing"],1],["He suggested ___ a taxi.",["to take","taking","take","for taking"],1],
["I wish I ___ more time yesterday.",["had","have","had had","would have"],2],["Hardly ___ the house when it started to rain.",["he had left","had he left","he left","did he leave"],1],["It's high time we ___ a decision.",["make","made","will make","are making"],1],["The results were ___ with what the researchers had predicted.",["consistent","consequent","consisting","consistently"],0]];
var i=0,ans=[];
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function start(){root.innerHTML="";var b=h("button","btn",cfg.start);b.type="button";b.onclick=function(){i=0;ans=[];show()};root.appendChild(b)}
function show(){root.innerHTML="";var bar=h("div","lt-bar"),f=h("div","lt-fill");f.style.width=(i/Q.length*100)+"%";bar.appendChild(f);root.appendChild(bar);
root.appendChild(h("p","lt-n",cfg.q+" "+(i+1)+" "+cfg.of+" "+Q.length));var q=Q[i],s=h("h2","lt-q",q[0]);s.dir="ltr";s.style.textAlign="start";root.appendChild(s);
var box=h("div","lt-opts");box.dir="ltr";q[1].forEach(function(o,k){var b=h("button","lt-opt"+(ans[i]===k?" on":""),o);b.type="button";b.onclick=function(){ans[i]=k;show()};box.appendChild(b)});root.appendChild(box);
var nav=h("div","row");if(i>0){var p=h("button","btn alt",cfg.prev);p.type="button";p.onclick=function(){i--;show()};nav.appendChild(p)}
var n=h("button","btn"+(ans[i]===undefined?" dis":""),cfg.next);n.type="button";n.onclick=function(){if(ans[i]===undefined)return;if(i<Q.length-1){i++;show()}else result()};nav.appendChild(n);root.appendChild(nav)}
function result(){var sc=0;Q.forEach(function(q,k){if(ans[k]===q[2])sc++});var lvl=sc<=4?"A1":sc<=8?"A2":sc<=12?"B1":sc<=16?"B2":"C1";
root.innerHTML="";root.appendChild(h("p","lt-n",cfg.res));root.appendChild(h("div","lt-lvl",lvl+" · "+cfg.bands[lvl]));root.appendChild(h("p","lead",cfg.score+": "+sc+" / "+Q.length));
var row=h("div","row"),msg=cfg.msg.replace("{lvl}",lvl).replace("{score}",sc),a=h("a","btn",cfg.wa);a.href="https://wa.me/212654242024?text="+encodeURIComponent(msg);a.target="_blank";a.rel="noopener";row.appendChild(a);
var bk=h("a","btn alt",cfg.book);bk.href=cfg.contact;row.appendChild(bk);var ag=h("button","btn alt",cfg.again);ag.type="button";ag.onclick=start;row.appendChild(ag);root.appendChild(row)}
start()})();
