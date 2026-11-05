// The first screen: one direction per slide, turning on its own until the visitor takes over.
document.querySelectorAll('.banner').forEach(banner=>{
 const slides=[...banner.querySelectorAll('.banner-slide')];
 const selectors=[...banner.querySelectorAll('.slide-selector')];
 const pause=banner.querySelector('[data-carousel="pause"]');
 const status=banner.querySelector('.carousel-status');
 const time=7000;
 let current=0,paused=motion.matches,hover=false,focus=false,timer=0;
 banner.style.setProperty('--slide-time',time+'ms');
 function playing(){return !paused&&!hover&&!focus&&!document.hidden}
 function schedule(){clearTimeout(timer);banner.classList.toggle('is-playing',playing());if(playing())timer=setTimeout(()=>show(current+1,false),time);}
 function show(index,manual){
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{const on=i===current;slide.classList.toggle('is-active',on);slide.setAttribute('aria-hidden',String(!on));slide.inert=!on;selectors[i].setAttribute('aria-pressed',String(on));});
  if(manual){paused=true;status.textContent=selectors[current].textContent.trim();}
  pause.textContent=paused?copy.play:copy.pause;
  // restart the progress bar on the chosen tab
  banner.classList.remove('is-playing');void banner.offsetWidth;schedule();
 }
 selectors.forEach((button,i)=>button.addEventListener('click',()=>show(i,true)));
 banner.querySelector('[data-carousel="previous"]').addEventListener('click',()=>show(current-1,true));
 banner.querySelector('[data-carousel="next"]').addEventListener('click',()=>show(current+1,true));
 pause.addEventListener('click',()=>{paused=!paused;show(current,false);});
 banner.addEventListener('mouseenter',()=>{hover=true;schedule();});
 banner.addEventListener('mouseleave',()=>{hover=false;schedule();});
 banner.addEventListener('focusin',()=>{focus=true;schedule();});
 banner.addEventListener('focusout',e=>{if(!banner.contains(e.relatedTarget)){focus=false;schedule();}});
 document.addEventListener('visibilitychange',schedule);
 motion.addEventListener('change',e=>{if(e.matches){paused=true;show(current,false);}});
 banner.querySelector('.banner-controls').hidden=false;show(0,false);
});
