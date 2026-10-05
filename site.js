const ukrainian=document.documentElement.lang==='uk';
const french=document.documentElement.lang==='fr';
const russian=document.documentElement.lang==='ru';
const copy=ukrainian?{menu:'Меню',close:'Закрити',subject:'Запит до Leaf Technology — ',name:'Ім’я: ',email:'Електронна пошта: ',interest:'Цікавить: ',status:'Відкриється ваш поштовий застосунок із готовим листом. Перевірте його та натисніть «Надіслати». Якщо застосунок не відкрився, напишіть на oml.leaftechnology@gmail.com.'}:french?{menu:'Menu',close:'Fermer',subject:'Demande à Leaf Technology — ',name:'Nom : ',email:'Courriel : ',interest:'Intérêt : ',status:'Votre application de messagerie va s’ouvrir avec votre message. Vérifiez-le, puis cliquez sur Envoyer. Si elle ne s’ouvre pas, écrivez à oml.leaftechnology@gmail.com.'}:russian?{menu:'Меню',close:'Закрыть',subject:'Запрос в Leaf Technology — ',name:'Имя: ',email:'Электронная почта: ',interest:'Интересует: ',status:'Откроется ваше почтовое приложение с готовым письмом. Проверьте его и нажмите «Отправить». Если приложение не открылось, напишите на oml.leaftechnology@gmail.com.'}:{menu:'Menu',close:'Close',subject:'Leaf Technology enquiry — ',name:'Name: ',email:'Email: ',interest:'Interested in: ',status:'Your email app will open with your message. Review it and press Send there. If it does not open, email oml.leaftechnology@gmail.com.'};
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.navigation');
function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent=copy.menu;}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?copy.close:copy.menu;nav.classList.toggle('open',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();toggle.focus()}});
document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const subject=copy.subject+d.get('interest');const body=copy.name+d.get('name')+'\n'+copy.email+d.get('email')+'\n'+copy.interest+d.get('interest')+'\n\n'+d.get('message');window.location.href='mailto:oml.leaftechnology@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);form.querySelector('[role=status]').textContent=copy.status}));

// Keep text, illustration and destination synchronized for each solution.
const carousel=document.querySelector('.hero-carousel');
if(carousel){
 const slides=[...carousel.querySelectorAll('.hero-slide')];
 const selectors=[...carousel.querySelectorAll('.slide-selector')];
 const controls=carousel.querySelector('.carousel-controls');
 const pause=carousel.querySelector('[data-carousel="pause"]');
 const status=carousel.querySelector('.carousel-status');
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,paused=motion.matches,hovering=false,focused=false,timer=null;
 function schedule(){
  clearTimeout(timer);
  if(!paused&&!hovering&&!focused&&!document.hidden)timer=setTimeout(()=>{show(current+1,false)},8000);
 }
 function updatePause(){pause.textContent=paused?(ukrainian?'Продовжити':french?'Reprendre':russian?'Продолжить':'Play'):(ukrainian?'Пауза':french?'Pause':russian?'Пауза':'Pause');pause.setAttribute('aria-label',paused?(ukrainian?'Увімкнути зміну слайдів':french?'Démarrer le diaporama':russian?'Включить смену слайдов':'Start slide rotation'):(ukrainian?'Призупинити зміну слайдів':french?'Mettre le diaporama en pause':russian?'Приостановить смену слайдов':'Pause slide rotation'));}
 function show(index,manual){
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{const active=i===current;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));slide.inert=!active;selectors[i].setAttribute('aria-pressed',String(active));});
  if(manual){paused=true;status.textContent=(ukrainian?'Слайд ':french?'Diapositive ':russian?'Слайд ':'Slide ')+(current+1)+' / '+slides.length+': '+selectors[current].textContent.trim();}
  updatePause();schedule();
 }
 selectors.forEach((button,i)=>button.addEventListener('click',()=>show(i,true)));
 carousel.querySelector('[data-carousel="previous"]').addEventListener('click',()=>show(current-1,true));
 carousel.querySelector('[data-carousel="next"]').addEventListener('click',()=>show(current+1,true));
 pause.addEventListener('click',()=>{paused=!paused;updatePause();schedule();});
 carousel.addEventListener('mouseenter',()=>{hovering=true;schedule();});
 carousel.addEventListener('mouseleave',()=>{hovering=false;schedule();});
 carousel.addEventListener('focusin',()=>{focused=true;schedule();});
 carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){focused=false;schedule();}});
 document.addEventListener('visibilitychange',schedule);
 motion.addEventListener('change',e=>{if(e.matches){paused=true;updatePause();schedule();}});
 controls.hidden=false;show(0,false);
}
// The enquiry topic follows the product page, while visitors can change it.
const currentPage=location.pathname.split('/').filter(Boolean).pop()||'index.html';
if(/(?:(?:ru|fr|uk)-)?development(?:\.html)?$/.test(currentPage)||/(?:(?:ru|fr|uk)-)?residents(?:\.html)?$/.test(currentPage)){
 const topic=document.querySelector('select[name="interest"]');
 if(topic)topic.selectedIndex=currentPage.includes('development')?0:1;
}

// Product photos stay within their model card.
document.querySelectorAll('.model-gallery').forEach(gallery=>{
 const main=gallery.querySelector('.model-gallery-main');
 const buttons=[...gallery.querySelectorAll('.model-thumbnail')];
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const photo=button.querySelector('img');main.src=photo.getAttribute('src');main.alt=photo.alt;
  buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 }));
});

// Intercom lifestyle slideshow, independent of the home and product galleries.
document.querySelectorAll('.intercom-hero-gallery').forEach(gallery=>{
 const photos=[...gallery.querySelectorAll('.intercom-hero-photo')];
 const controls=gallery.querySelector('.intercom-photo-controls');
 const pause=gallery.querySelector('[data-photo="pause"]');
 const count=gallery.querySelector('.intercom-photo-count');
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,paused=motion.matches,hover=false,focus=false,timer;
 function schedule(){clearTimeout(timer);if(!paused&&!hover&&!focus&&!document.hidden)timer=setTimeout(()=>show(current+1),6000);}
 function show(index){
  current=(index+photos.length)%photos.length;
  photos.forEach((photo,i)=>{photo.classList.toggle('is-active',i===current);photo.setAttribute('aria-hidden',String(i!==current));});
  count.textContent=String(current+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');
  pause.textContent=paused?(ukrainian?'Продовжити':french?'Reprendre':russian?'Продолжить':'Play'):(ukrainian?'Пауза':french?'Pause':russian?'Пауза':'Pause');
  pause.setAttribute('aria-label',paused?(ukrainian?'Увімкнути зміну фотографій':french?'Démarrer le défilement des photos':russian?'Включить смену фотографий':'Start photo rotation'):(ukrainian?'Призупинити зміну фотографій':french?'Mettre les photos en pause':russian?'Приостановить смену фотографий':'Pause photo rotation'));
  schedule();
 }
 gallery.querySelector('[data-photo="previous"]').addEventListener('click',()=>{paused=true;show(current-1);});
 gallery.querySelector('[data-photo="next"]').addEventListener('click',()=>{paused=true;show(current+1);});
 pause.addEventListener('click',()=>{paused=!paused;show(current);});
 gallery.addEventListener('mouseenter',()=>{hover=true;schedule();});
 gallery.addEventListener('mouseleave',()=>{hover=false;schedule();});
 gallery.addEventListener('focusin',()=>{focus=true;schedule();});
 gallery.addEventListener('focusout',e=>{if(!gallery.contains(e.relatedTarget)){focus=false;schedule();}});
 document.addEventListener('visibilitychange',schedule);
 motion.addEventListener('change',e=>{if(e.matches){paused=true;show(current);}});
 controls.hidden=false;show(0);
});

// One manually controlled gallery for all administrator screens.
document.querySelectorAll('.admin-gallery').forEach(gallery=>{
 const buttons=[...gallery.querySelectorAll('.admin-gallery-thumb')];
 const main=gallery.querySelector('.admin-gallery-main');
 const full=gallery.querySelector('.admin-gallery-full');
 const open=gallery.querySelector('.admin-gallery-open');
 const title=gallery.querySelector('.admin-gallery-title');
 const count=gallery.querySelector('.admin-gallery-count');
 let current=0;
 function show(index){
  current=(index+buttons.length)%buttons.length;
  const button=buttons[current],src=button.querySelector('img').getAttribute('src'),label=button.querySelector('span').textContent;
  main.src=src;main.alt=label;full.href=src;open.href=src;title.textContent=label;count.textContent=(current+1)+' / '+buttons.length;
  buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));
 }
 buttons.forEach((button,i)=>button.addEventListener('click',()=>show(i)));
 gallery.querySelectorAll('[data-admin-step]').forEach(button=>button.addEventListener('click',()=>show(current+Number(button.dataset.adminStep))));
 gallery.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));if(buttons.includes(document.activeElement))buttons[current].focus();}
 });
});

// Scale the entire demo viewport uniformly, without cropping the interface.
document.querySelectorAll('.format-single-demo .resident-demo').forEach(display=>{
 const frame=display.querySelector('iframe');
 const resize=()=>{frame.style.transform='scale('+(display.clientWidth/390)+')';};
 new ResizeObserver(resize).observe(display);
 resize();
});
