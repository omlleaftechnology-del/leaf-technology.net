// The company panel opens as it arrives; sections rise in part by part.
const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting||entry.boundingClientRect.bottom<0){entry.target.classList.add('is-in');reveal.unobserve(entry.target)}}),{threshold:0,rootMargin:'0px 0px 40% 0px'});
document.querySelectorAll('.story-panel').forEach(el=>reveal.observe(el));
document.querySelectorAll('main>section:not(.banner),.contact').forEach(section=>{
 const parts=[...section.querySelectorAll('h2,h3,.section-heading>p,.feature,.unitly-info-card,.intercom-model,.distributor,.portfolio-project,.timeline article,.format-phone-card,.contact-field,.contact-rows>div,.page-intro p,.band,.about-work-item,.about-city')].filter(el=>!el.closest('.reveal')&&el.getBoundingClientRect().top>innerHeight);
 const rows=new Map();
 parts.forEach(el=>{el.classList.add('reveal');const top=Math.round(el.getBoundingClientRect().top/40);const n=rows.get(top)||0;rows.set(top,n+1);el.style.setProperty('--delay',Math.min(n,4)*70+'ms');reveal.observe(el);});
});
