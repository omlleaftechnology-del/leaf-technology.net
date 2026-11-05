// Product photos stay within their model card.
document.querySelectorAll('.model-gallery').forEach(gallery=>{
 const main=gallery.querySelector('.model-gallery-main');
 const buttons=[...gallery.querySelectorAll('.model-thumbnail')];
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const photo=button.querySelector('img');main.src=photo.getAttribute('src');main.alt=photo.alt;
  buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 }));
});

// Smart Access hero photographs.
document.querySelectorAll('.intercom-hero-gallery').forEach(gallery=>{
 const photos=[...gallery.querySelectorAll('.intercom-hero-photo')];
 const controls=gallery.querySelector('.intercom-photo-controls');
 const pause=gallery.querySelector('[data-photo="pause"]');
 let current=0,paused=motion.matches,hover=false,focus=false,timer;
 function schedule(){clearTimeout(timer);if(!paused&&!hover&&!focus&&!document.hidden)timer=setTimeout(()=>show(current+1),6000);}
 function show(index){
  current=(index+photos.length)%photos.length;
  photos.forEach((photo,i)=>{photo.classList.toggle('is-active',i===current);photo.setAttribute('aria-hidden',String(i!==current));});
  pause.textContent=paused?copy.play:copy.pause;
  pause.setAttribute('aria-label',paused?copy.playLabel:copy.pauseLabel);
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

// Two model cards side by side: the description and each specification row take the taller
// of the pair, so the tables line up row by row in every language.
document.querySelectorAll('.intercom-model-grid').forEach(grid=>{
 const cards=[...grid.querySelectorAll(':scope>.intercom-model')];
 const parts=card=>[card.querySelector('h3'),card.querySelector('.intercom-model-copy>p'),...card.querySelectorAll('.model-specs>div')];
 function align(){
  cards.forEach(card=>parts(card).forEach(el=>el&&(el.style.minHeight='')));
  const columns=getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  if(columns<2)return;
  for(let i=0;i<cards.length;i+=columns){
   const row=cards.slice(i,i+columns).map(parts);
   const longest=Math.max(...row.map(p=>p.length));
   for(let k=0;k<longest;k++){
    const els=row.map(p=>p[k]).filter(Boolean);
    const tallest=Math.max(...els.map(el=>el.getBoundingClientRect().height));
    els.forEach(el=>el.style.minHeight=tallest+'px');
   }
  }
 }
 new ResizeObserver(align).observe(grid);
 document.fonts?.ready.then(align);
 align();
});
