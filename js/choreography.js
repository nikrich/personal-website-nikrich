import {createSectionStepper} from './section-scroll.js';

const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const ease=value=>{const t=clamp(value);return t*t*(3-2*t);};

// Scroll position drives the visuals; desktop gestures advance between scene stops.
export function createChoreography(){
 const hero=document.querySelector('.hero');
 const lines=[...document.querySelectorAll('.hero-line')];
 const reel=document.querySelector('.work-reel');
 const chapters=[...reel.querySelectorAll('.chapter')];
 const chapterNav=[...document.querySelectorAll('[data-chapter]')];
 const parts=chapters.map(chapter=>({chapter,word:chapter.querySelector('.chapter-word'),visual:chapter.querySelector('[data-parallax]'),top:chapter.querySelector('.chapter-top'),bottom:chapter.querySelector('.chapter-bottom')}));
 const world=parts[0].visual;
 const audioBack=document.querySelector('.audio-back');
 const audioFront=document.querySelector('.audio-front');
 const rings=document.querySelector('.sound-rings');
 const core=document.querySelector('.system-core');
 const nodes=[...document.querySelectorAll('.system-node')];
 const orbits=[...document.querySelectorAll('.system-orbit')];
 const animated=[...lines,...parts.flatMap(p=>[p.chapter,p.word,p.visual,p.top,p.bottom]),audioBack,audioFront,rings,core,...nodes,...orbits];
 let enabled=true,pinned=false,frame=0,last=0,current=window.scrollY||0,active=-1;
 const absoluteTop=element=>element.getBoundingClientRect().top+(window.scrollY||0);
 const chapterPosition=index=>absoluteTop(reel)+(index+.12)/2.6*(reel.offsetHeight-innerHeight);
 const stepper=createSectionStepper({getStops:()=>[
  0,absoluteTop(document.querySelector('#intro')),
  ...chapters.map((_,index)=>chapterPosition(index)),
  absoluteTop(document.querySelector('#all-work'))
 ]});
 const transform=(element,value)=>{element.style.transform=value;};
 function setActive(index){
  if(index===active)return;active=index;
  chapters.forEach((chapter,i)=>{chapter.inert=pinned&&i!==index;chapter.toggleAttribute('aria-hidden',pinned&&i!==index);if(pinned&&i!==index)chapter.setAttribute('aria-hidden','true');});
  chapterNav.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
 }
 function paint(){
  const y=current,heroTop=hero.getBoundingClientRect().top+(window.scrollY||0);
  const h=clamp((y-heroTop)/Math.max(1,hero.offsetHeight-innerHeight));
  const exit=ease((h-.08)/.86);
  lines.forEach((line,i)=>{
   const direction=i===1?1:-1;
   transform(line,`translate3d(${direction*exit*(i===2?70:42)}%,${-exit*(i+1)*26}px,0) scale(${1+exit*.28}) skewX(${direction*exit*7}deg)`);
   line.style.opacity=String(1-ease((h-.32)/.43));
  });
  hero.style.setProperty('--hero-progress',h.toFixed(4));
  if(pinned){
   const top=reel.getBoundingClientRect().top+(window.scrollY||0);
   const phase=clamp((y-top)/Math.max(1,reel.offsetHeight-innerHeight))*2.6;
   const transitions=[ease((phase-.38)/.62),ease((phase-1.38)/.62)];
   const index=transitions[1]>.5?2:transitions[0]>.5?1:0;
   setActive(index);
   reel.style.setProperty('--reel-progress',String(clamp(phase/2.6)));
   parts.forEach((part,i)=>{
    const enter=i===0?1:transitions[i-1];
    const leave=i===2?0:transitions[i];
    const incoming=1-enter;
    part.chapter.style.visibility=(i===0||enter>0)&&leave<1?'visible':'hidden';
    part.chapter.style.clipPath=i===0?'none':`polygon(0 ${incoming*115}%,100% ${incoming*85}%,100% 100%,0 100%)`;
    transform(part.word,`translate3d(${incoming*42-leave*38}%,${incoming*60-leave*90}px,0) scale(${1+leave*.45+incoming*.18})`);
    part.word.style.opacity=String(1-leave*.9);
    for(const chrome of [part.top,part.bottom]){
     chrome.style.opacity=String(clamp(enter*2-.7)*(1-ease(leave*2)));
     transform(chrome,`translate3d(0,${incoming*65-leave*45}px,0)`);
    }
   });
   const a=transitions[0],b=transitions[1];
   const drift=clamp(phase/ .38)*.04;
   transform(world,`perspective(1100px) translate3d(${-a*40}%,${-a*26}%,${a*620}px) rotateX(${5+a*16}deg) rotateY(${-8-a*25}deg) rotateZ(${-a*8}deg) scale(${1+drift})`);
   transform(parts[1].visual,`perspective(1500px) translate3d(0,${(1-a)*25-b*12}%,0) rotateZ(${(1-a)*-16+b*14}deg) scale(${.76+a*.24+b*.3})`);
   transform(audioBack,`translate3d(${(1-a)*95+b*85}%,${-(1-a)*60-b*70}%,${-220*(1-a)}px) rotate(${9+(1-a)*24+b*28}deg) rotateY(${-14-(1-a)*35}deg)`);
   transform(audioFront,`translate3d(${-(1-a)*75-b*100}%,${(1-a)*50+b*60}%,${b*180}px) rotate(${-9-(1-a)*25-b*25}deg) rotateY(${12+(1-a)*30}deg)`);
   transform(rings,`rotate(${-15+phase*38}deg) scale(${.8+a*.2+b*.65})`);
   transform(parts[2].visual,`translate3d(0,${(1-b)*70}%,0) scale(${.65+b*.35}) rotate(${-25*(1-b)}deg)`);
   transform(core,`rotateY(${-28+(1-b)*150}deg) rotateX(${14+(1-b)*35}deg) rotateZ(-10deg)`);
   nodes.forEach((node,i)=>transform(node,`translate3d(${(i===0?-1:1)*(1-b)*320}px,${(i===2?1:-1)*(1-b)*200}px,0) rotate(${[-10,7,-9][i]+(1-b)*60}deg)`));
   orbits.forEach((orbit,i)=>transform(orbit,`rotateX(${[60,0,45][i]}deg) rotateY(${[0,65,35][i]+(1-b)*120}deg) rotateZ(${[-20,30,0][i]+(1-b)*90}deg)`));
  }else{
   parts.forEach((part,i)=>{
    const r=part.chapter.getBoundingClientRect();
    const p=clamp((innerHeight-r.top)/innerHeight);
    const reveal=ease(p/.85);
    transform(part.word,`translate3d(${(1-reveal)*(i===1?-20:20)}%,0,0)`);
    transform(part.visual,`perspective(1000px) translate3d(0,${(1-reveal)*90}px,0) rotateY(${(1-reveal)*(i===1?22:-22)}deg) rotateZ(${(1-reveal)*(i===1?-8:8)}deg) scale(${.83+reveal*.17})`);
   });
  }
 }
 function tick(stamp){
  frame=0;if(!enabled)return;
  const target=window.scrollY||0;
  const delta=Math.min(64,stamp-last||16.7);last=stamp;
  current+=(target-current)*(1-Math.exp(-delta/65));
  if(Math.abs(target-current)<.15)current=target;
  paint();
  if(current!==target)frame=requestAnimationFrame(tick);
 }
 function request(){if(enabled&&!frame)frame=requestAnimationFrame(tick);}
 function configure(value=enabled){
  enabled=value;
  pinned=enabled&&innerWidth>=900&&innerHeight>=640;
  reel.classList.toggle('is-pinned',pinned);
  stepper.setEnabled(pinned);
  document.body.classList.toggle('has-scroll-scenes',enabled);
  for(const element of animated){element.style.removeProperty('transform');element.style.removeProperty('opacity');element.style.removeProperty('visibility');element.style.removeProperty('clip-path');}
  hero.style.removeProperty('--hero-progress');
  active=-1;setActive(0);current=window.scrollY||0;
  if(enabled)paint();
 }
 function goToChapter(index,behavior='smooth'){
  if(!pinned)return;
  const top=chapterPosition(index);
  if(behavior==='instant')window.scrollTo({top,behavior});else stepper.goTo(top);
 }
 chapterNav.forEach((link,index)=>link.addEventListener('click',event=>{
  if(!pinned)return;event.preventDefault();window.history.replaceState(null,'',link.getAttribute('href'));goToChapter(index);
 }));
 window.addEventListener('scroll',request,{passive:true});
 window.addEventListener('resize',()=>configure(),{passive:true});
 // Opening a saved project fragment must land on its chapter, not the shared sticky top.
 window.addEventListener('hashchange',()=>{const index=chapters.findIndex(chapter=>'#'+chapter.id===window.location.hash);if(index>=0)goToChapter(index);});
 function restoreFragment(){
  const hash=window.location.hash;if(!hash)return;
  const index=chapters.findIndex(chapter=>'#'+chapter.id===hash);
  if(index>=0&&pinned)goToChapter(index,'instant');
  else document.getElementById(hash.slice(1))?.scrollIntoView({block:'start',behavior:'instant'});
 }
 window.addEventListener('load',restoreFragment,{once:true});
 return {setMotion:configure,restoreFragment(){requestAnimationFrame(restoreFragment);}};
}
