// One deliberate wheel gesture per scene. Long reading sections remain native.
export function createSectionStepper({getStops}){
 let enabled=false,frame=0,from=0,destination=0,started=0;
 let lastWheel=-Infinity,consumed=false,amount=0,direction=0;
 const quietPeriod=240;
 const duration=1150;
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 const blocked=target=>document.body.classList.contains('modal-open')||target?.closest?.('dialog,[contenteditable="true"],input,textarea,select');
 function cancel(){
  if(frame)window.cancelAnimationFrame(frame);
  frame=0;document.body.classList.remove('is-section-transition');
 }
 function resetGesture(){lastWheel=-Infinity;consumed=false;amount=0;direction=0;}
 function tick(now){
  if(!enabled||blocked()){cancel();return;}
  const progress=Math.min(1,(now-started)/duration);
  window.scrollTo({top:from+(destination-from)*ease(progress),behavior:'instant'});
  if(progress<1)frame=window.requestAnimationFrame(tick);
  else{frame=0;document.body.classList.remove('is-section-transition');}
 }
 function goTo(top){
  cancel();from=window.scrollY;destination=Math.max(0,top);
  if(Math.abs(destination-from)<2)return;
  started=window.performance.now();
  document.body.classList.add('is-section-transition');
  frame=window.requestAnimationFrame(tick);
 }
 function nextStop(step){
  const stops=getStops(),y=window.scrollY,end=stops.at(-1);
  if(end===undefined||y>end+8||(step>0&&y>=end-8))return null;
  return step>0?stops.find(top=>top>y+12)??null:[...stops].reverse().find(top=>top<y-12)??null;
 }
 function wheel(event){
  if(!enabled||event.ctrlKey||event.metaKey||event.shiftKey||blocked(event.target)||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY)return;
  const now=window.performance.now(),fresh=now-lastWheel>quietPeriod;
  if(fresh){consumed=false;amount=0;direction=0;}
  lastWheel=now;
  // Suppress the whole gesture, including its inertial tail at the index boundary.
  if(frame||consumed){event.preventDefault();return;}
  const step=Math.sign(event.deltaY),top=nextStop(step);
  if(top===null)return;
  event.preventDefault();
  if(step!==direction){amount=0;direction=step;}
  amount+=Math.abs(event.deltaY)*(event.deltaMode===1?16:event.deltaMode===2?window.innerHeight:1);
  if(amount<32)return;
  consumed=true;amount=0;goTo(top);
 }
 function keyboard(event){
  if(!enabled||event.ctrlKey||event.metaKey||event.altKey||blocked(event.target))return;
  if(event.key==='Escape'){cancel();resetGesture();return;}
  if(event.target?.closest?.('button,a')&&event.key===' ')return;
  const step=['ArrowDown','PageDown'].includes(event.key)?1:['ArrowUp','PageUp'].includes(event.key)?-1:event.key===' '?(event.shiftKey?-1:1):0;
  if(!step)return;
  if(frame){event.preventDefault();return;}
  const top=nextStop(step);if(top===null)return;
  event.preventDefault();if(!event.repeat)goTo(top);
 }
 // Navigation clicks, the scrollbar and touch always take control immediately.
 function directInput(){cancel();resetGesture();}
 window.addEventListener('wheel',wheel,{passive:false});
 document.addEventListener('keydown',keyboard);
 document.addEventListener('pointerdown',directInput,{passive:true});
 window.addEventListener('touchstart',directInput,{passive:true});
 document.addEventListener('click',event=>{if(event.target?.closest?.('a[href^="#"]'))directInput();},true);
 return {goTo,setEnabled(value){enabled=value;cancel();resetGesture();document.body.classList.toggle('section-stepping',value);}};
}
