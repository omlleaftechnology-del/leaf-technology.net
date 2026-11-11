// One field: the message goes into an email the visitor sends themselves.
document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const message=new FormData(form).get('message');
 window.location.href='mailto:oml.leaftechnology@gmail.com?subject='+encodeURIComponent(copy.subject+' — '+document.title)+'&body='+encodeURIComponent(message);
 form.querySelector('[role=status]').textContent=copy.status;
}));
// A link to the form can start the message for the visitor (its aria-label is the text).
document.querySelectorAll('.contact-prefill').forEach(link=>link.addEventListener('click',()=>{
 const field=document.getElementById('contact-message');if(field)field.value=link.getAttribute('aria-label');
}));
