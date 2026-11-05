// The resident phone demo is drawn at 460 px wide; below that the whole phone is scaled down.
document.querySelectorAll('.resident-phone-demo').forEach(frame=>{
 const box=frame.parentElement,base=460,tall=940;
 const fit=()=>{const w=box.clientWidth;if(w<base){const k=w/base;frame.style.width=base+'px';frame.style.height=tall+'px';frame.style.transform='scale('+k+')';box.style.height=tall*k+'px';}else{frame.style.width='';frame.style.height='';frame.style.transform='';box.style.height='';}};
 new ResizeObserver(fit).observe(box);fit();
});
