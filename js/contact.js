// One field: the message goes into an email the visitor sends themselves.
document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const message=new FormData(form).get('message');
 window.location.href='mailto:oml.leaftechnology@gmail.com?subject='+encodeURIComponent(copy.subject+' — '+document.title)+'&body='+encodeURIComponent(message);
 form.querySelector('[role=status]').textContent=copy.status;
}));
