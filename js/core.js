// Shared by every script: the page language's interface words and the reduced-motion setting.
document.documentElement.classList.add('js');
const ukrainian=document.documentElement.lang==='uk';
const french=document.documentElement.lang==='fr';
const russian=document.documentElement.lang==='ru';
const copy=ukrainian?{menu:'Меню',close:'Закрити',subject:'Запит до Leaf Technology',play:'Продовжити',pause:'Пауза',playLabel:'Увімкнути зміну фотографій',pauseLabel:'Призупинити зміну фотографій',status:'Відкриється ваш поштовий застосунок із готовим листом. Перевірте його та натисніть «Надіслати». Якщо застосунок не відкрився, напишіть на oml.leaftechnology@gmail.com.'}:french?{menu:'Menu',close:'Fermer',subject:'Demande à Leaf Technology',play:'Reprendre',pause:'Pause',playLabel:'Démarrer le défilement des photos',pauseLabel:'Mettre les photos en pause',status:'Votre application de messagerie va s’ouvrir avec votre message. Vérifiez-le, puis cliquez sur Envoyer. Si elle ne s’ouvre pas, écrivez à oml.leaftechnology@gmail.com.'}:russian?{menu:'Меню',close:'Закрыть',subject:'Запрос в Leaf Technology',play:'Продолжить',pause:'Пауза',playLabel:'Включить смену фотографий',pauseLabel:'Приостановить смену фотографий',status:'Откроется ваше почтовое приложение с готовым письмом. Проверьте его и нажмите «Отправить». Если приложение не открылось, напишите на oml.leaftechnology@gmail.com.'}:{menu:'Menu',close:'Close',subject:'Leaf Technology enquiry',play:'Play',pause:'Pause',playLabel:'Start photo rotation',pauseLabel:'Pause photo rotation',status:'Your email app will open with your message. Review it and press Send there. If it does not open, email oml.leaftechnology@gmail.com.'};
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');

// A photograph that is still loading stays hidden and fades in once it arrives,
// instead of flashing in after its frame has already appeared.
function fadeInWhenLoaded(img){
 if(img.complete&&img.naturalWidth)return;
 img.classList.remove('is-loaded');img.classList.add('is-loading');
 const done=()=>{img.classList.remove('is-loading');img.classList.add('is-loaded');};
 img.addEventListener('load',done,{once:true});
 img.addEventListener('error',()=>img.classList.remove('is-loading'),{once:true});
}
document.querySelectorAll('main img:not(.intercom-hero-photo)').forEach(fadeInWhenLoaded);
