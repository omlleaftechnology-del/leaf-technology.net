// The demos keep their own layout at a real device size and are scaled as one piece to fit:
// the resident app as a phone (390 px wide), the office as a full desktop window, on every screen.
document.querySelectorAll('.device').forEach(device=>{
 const view=device.querySelector('.device-view'),frame=view.querySelector('iframe');
 const fit=()=>{
  const phone=device.dataset.device==='phone';
  device.classList.toggle('is-phone',phone);device.classList.toggle('is-browser',!phone);
  const w=phone?390:Math.max(1100,view.clientWidth),h=phone?780:Math.round(w*.62),k=view.clientWidth/w;
  frame.style.width=w+'px';frame.style.height=h+'px';frame.style.transform='scale('+k+')';view.style.height=Math.round(h*k)+'px';
 };
 new ResizeObserver(fit).observe(device);fit();
});
