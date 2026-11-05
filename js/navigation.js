// The phone menu, and in-page links that glide to their target.
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.navigation');
function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent=copy.menu;}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?copy.close:copy.menu;nav.classList.toggle('open',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();toggle.focus()}});

// In-page links glide to their target; the document itself keeps instant scrolling.
document.addEventListener('click',e=>{
 const link=e.target.closest('a[href^="#"]');if(!link||link.getAttribute('href').length<2)return;
 const target=document.getElementById(link.getAttribute('href').slice(1));if(!target)return;
 e.preventDefault();target.scrollIntoView({behavior:motion.matches?'auto':'smooth'});history.pushState(null,'',link.getAttribute('href'));
 if(target.id==='contact')setTimeout(()=>target.querySelector('input')?.focus({preventScroll:true}),motion.matches?0:600);
});
