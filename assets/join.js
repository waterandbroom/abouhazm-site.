(function(){
var box=document.getElementById("join");if(!box)return;
var URL="https://script.google.com/macros/s/AKfycbwooOqnegMs8yKB6N-ou18fDzZD-6YFwAfngy7HItCAOHNHmVq2vm535fI7ddYoY4zg/exec";
var L=document.documentElement.lang,S={
ar:{h:"انضم كأستاذ",p:"هل أنت أستاذ؟ املأ المعلومات أدناه. تتم مراجعة كل طلب قبل نشره، ولا يظهر رقم هاتفك للعموم أبداً.",name:"الاسم الكامل",subject:"المادة (مثال: الفرنسية، الرياضيات)",levels:"المستويات (مثال: إعدادي، ثانوي)",area:"المنطقة (مثال: الدار البيضاء)",bio:"نبذة قصيرة عنك (حتى 300 حرف)",phone:"رقم هاتفك / واتساب (خاص)",photo:"صورتك الشخصية",consent:"أوافق على نشر اسمي وصورتي ونبذتي في موقع abouhazm.ma. رقم هاتفي يبقى خاصاً.",send:"إرسال طلب الانضمام",ok:"تم استلام طلبك. سنراجعه ونتواصل معك قريباً.",err:"حدث خطأ. أعد المحاولة أو راسلنا عبر واتساب.",link:"هل أنت أستاذ؟ انضم إلى القائمة"},
fr:{h:"Rejoindre en tant qu'enseignant",p:"Vous êtes enseignant ? Remplissez les informations ci-dessous. Chaque demande est vérifiée avant publication, et votre numéro n'est jamais affiché publiquement.",name:"Nom complet",subject:"Matière (ex. : français, mathématiques)",levels:"Niveaux (ex. : collège, lycée)",area:"Zone (ex. : Casablanca)",bio:"Courte présentation (300 caractères max.)",phone:"Votre téléphone / WhatsApp (privé)",photo:"Votre photo",consent:"J'accepte la publication de mon nom, de ma photo et de ma présentation sur abouhazm.ma. Mon numéro reste privé.",send:"Envoyer ma candidature",ok:"Demande reçue. Nous la vérifions et vous recontactons bientôt.",err:"Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.",link:"Vous êtes enseignant ? Rejoignez la liste"},
en:{h:"Join as a teacher",p:"Are you a teacher? Fill in the details below. Every application is reviewed before it is published, and your phone number is never shown publicly.",name:"Full name",subject:"Subject (e.g. French, Maths)",levels:"Levels (e.g. middle school, high school)",area:"Area (e.g. Casablanca)",bio:"Short bio (300 characters max.)",phone:"Your phone / WhatsApp (private)",photo:"Your photo",consent:"I agree to my name, photo and bio being published on abouhazm.ma. My phone number stays private.",send:"Send my application",ok:"Application received. We will review it and contact you soon.",err:"Something went wrong. Please try again or message us on WhatsApp.",link:"Are you a teacher? Join the list"}}[L]||null;
if(!S)return;
function f(n,l,ex){return'<label><span>'+l+'</span>'+(ex||'<input name="'+n+'" required maxlength="120">')+'</label>'}
box.className="join";
box.innerHTML='<h2 class="h2s">'+S.h+'</h2><p>'+S.p+'</p><form id="jf" novalidate>'+f("name",S.name)+f("subject",S.subject)+f("levels",S.levels)+f("area",S.area)+
f("bio",S.bio,'<textarea name="bio" rows="3" maxlength="300" required></textarea>')+
f("phone",S.phone,'<input name="phone" required maxlength="20" inputmode="tel" autocomplete="tel">')+
f("photo",S.photo,'<input name="photo" type="file" accept="image/*">')+
'<input class="hp" name="website" tabindex="-1" autocomplete="off"><label class="ck"><input type="checkbox" name="consent" required> <span>'+S.consent+'</span></label><button class="btn" type="submit">'+S.send+'</button><div id="jm" role="status"></div></form>';
var lead=document.querySelector(".lead");if(lead){lead.insertAdjacentHTML("afterend",'<p><a href="#join">'+S.link+' ↓</a></p>')}
function shrink(file,cb){if(!file){cb("");return}var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var m=700,s=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.82))};im.onerror=function(){cb("")};im.src=r.result};r.onerror=function(){cb("")};r.readAsDataURL(file)}
var form=document.getElementById("jf"),msg=document.getElementById("jm");
form.onsubmit=function(e){e.preventDefault();var d=new FormData(form);if(d.get("website"))return;
 if(!form.checkValidity()){form.reportValidity();return}
 var b=form.querySelector("button");b.disabled=true;
 shrink(form.photo.files[0],function(img){
  var row={type:"teacher",date:new Date().toLocaleString("fr-MA",{timeZone:"Africa/Casablanca"}),name:d.get("name"),subject:d.get("subject"),levels:d.get("levels"),area:d.get("area"),bio:d.get("bio"),phone:d.get("phone"),photo:img,lang:L};
  fetch(URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(row)}).then(function(){msg.textContent=S.ok;form.reset();b.disabled=false}).catch(function(){msg.textContent=S.err;b.disabled=false})})};
})();
