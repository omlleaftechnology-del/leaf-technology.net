// The demos keep their own layout at a real device size and are scaled as one piece to fit:
// a phone (390 px wide) on narrow screens and for the resident app, a desktop window otherwise.
document.querySelectorAll('.device').forEach(device=>{
 const view=device.querySelector('.device-view'),frame=view.querySelector('iframe');
 const fit=()=>{
  const phone=device.dataset.device==='phone'||device.clientWidth<640;
  device.classList.toggle('is-phone',phone);device.classList.toggle('is-browser',!phone);
  const w=phone?390:Math.max(1100,view.clientWidth),h=phone?780:Math.round(w*.62),k=view.clientWidth/w;
  frame.style.width=w+'px';frame.style.height=h+'px';frame.style.transform='scale('+k+')';view.style.height=Math.round(h*k)+'px';
 };
 new ResizeObserver(fit).observe(device);fit();
});
