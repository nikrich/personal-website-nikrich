import {createChoreography} from './choreography.js';
import {createProjectGallery} from './gallery.js';
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let motion=!reducedMotion.matches;
let sculpture;
const motionButton=document.querySelector('#motion-toggle');
const filters=[...document.querySelectorAll('[data-filter]')];
const rows=[...document.querySelectorAll('[data-category]')];
for(const button of filters)button.addEventListener('click',()=>{
  let count=0;
  for(const row of rows){row.hidden=button.dataset.filter!=='all'&&row.dataset.category!==button.dataset.filter;if(!row.hidden)count++;}
  for(const item of filters)item.setAttribute('aria-pressed',String(item===button));
  document.querySelector('.result-count').textContent=`${count} ${count===1?'project':'projects'}`;
});
document.querySelector('.filter-bar').hidden=false;
document.querySelector('#year').textContent=new Date().getFullYear();

const menuButton=document.querySelector('.mobile-menu');
const menu=document.querySelector('#mobile-nav');
function setMenuBackground(inert){document.querySelector('main').inert=inert;document.querySelector('footer').inert=inert;}
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');document.body.classList.remove('modal-open');setMenuBackground(false);}
menuButton.addEventListener('click',()=>{const opening=menu.hidden;menu.hidden=!opening;menuButton.setAttribute('aria-expanded',String(opening));menuButton.setAttribute('aria-label',opening?'Close menu':'Open menu');document.body.classList.toggle('modal-open',opening);setMenuBackground(opening);});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
document.addEventListener('keydown',event=>{if(event.key!=='Tab'||menu.hidden)return;const links=[menuButton,...menu.querySelectorAll('a')];const first=links[0],last=links.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});
matchMedia('(min-width: 651px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const projects={
 club:{kind:'01 / GAME DEVELOPMENT',title:'The Club at the Center of the World',intro:'An action RPG set in a divided future Cape Town. The ultra-rich rule through The Agora. You begin in the Bo-Kaap, finding a way into their world through conversations, gambling and knowledge you were never meant to have.',image:'assets/world/club.webp',alt:'Actual development screenshot from The Club',features:['A Cape Town built from geographic data, with an evolving world-building toolchain.','Conversations, suspicion and knowledge that change what becomes possible.','Crowd identities and rumours, alongside card-based combat in development.','An independent game in active development. The images shown are development captures.'],link:'https://www.youtube.com/@nikrich',cta:'Follow development',note:'Want to explore the tooling behind it? Visit unrealtools.com.'},
 audio:{kind:'02 / HUNGRY GHOST AUDIO',title:'Sound is a place to explore.',intro:'A collection of fifty audio tools for producers and sound designers. Dynamics, tone, colour, space and motion, with a distinct workflow for each job and a shared tactile design language.',image:'assets/audio/feral.webp',alt:'The actual FERAL dynamic EQ and compression interface',features:['FERAL: dynamic EQ and compression, with an interactive frequency display.','REVERB: spaces shaped with early reflections, damping, modulation and ducking.','A wider collection built for real sessions, with listening comparisons on the Audio site.','On the workbench: HAUNT vocal pitch correction and new audio workflows.'],link:'https://hungryghostaudio.com/#listen',cta:'Listen for yourself',note:'Product visuals show the actual native plugin interfaces. Visit the Audio site for current releases and platform support.'},
 lockstep:{kind:'03 / DEVELOPER TOOLS',title:'Big worlds. Your storage.',intro:'Lockstep is Git-based source control for game projects. It brings large-file storage and exclusive file locking together around buckets you control, so the source and the assets can belong in the same workflow.',features:['Git LFS workflows for large binary assets.','Exclusive file locking for assets that cannot be merged safely.','Bring your own storage, with clients transferring directly to the bucket.','Fair-source software. The public repository documents capabilities, licensing and the roadmap.'],link:'https://github.com/nikrich/lockstep',cta:'Explore Lockstep',note:'Unreal and Unity workflows are the focus. Check the repository for the current integration status.'}
};
const dialog=document.querySelector('#project-dialog');
const dialogContent=document.querySelector('#dialog-content');
let returnFocus;
function openProject(key,opener){
 const project=projects[key];if(!project)return;
 const body=document.createElement('div');body.className='dialog-body';
 const label=document.createElement('p');label.className='section-label';label.textContent=project.kind;body.append(label);
 const heading=document.createElement('h2');heading.id='dialog-title';heading.textContent=project.title;body.append(heading);
 const intro=document.createElement('p');intro.textContent=project.intro;body.append(intro);
 if(project.image){const image=document.createElement('img');image.src=project.image;image.alt=project.alt;body.append(image);}
 const features=document.createElement('div');features.className='dialog-features';for(const feature of project.features){const p=document.createElement('p');p.textContent=feature;features.append(p);}body.append(features);
 const link=document.createElement('a');link.className='pill';link.href=project.link;link.target='_blank';link.rel='noopener noreferrer';link.textContent=project.cta+' ↗';body.append(link);
 const note=document.createElement('p');note.className='dialog-note';note.textContent=project.note;body.append(note);
 dialogContent.replaceChildren(body);returnFocus=opener;dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;
}
document.querySelectorAll('.project-open').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project,button)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus({preventScroll:true});});
document.body.classList.add('has-enhancements');
createProjectGallery();

const choreography=createChoreography();
const header=document.querySelector('.header');
const statement=document.querySelector('.statement');
const words=statement.textContent.trim().split(/\s+/);
statement.replaceChildren(...words.map((word,index)=>{const span=document.createElement('span');span.className='word';span.textContent=word+(index===words.length-1?'':' ');return span;}));
const wordSpans=[...statement.children];
let queued=false;
function updateScroll(){
 queued=false;header.classList.toggle('is-scrolled',scrollY>60);
 const textRect=statement.getBoundingClientRect();const settledIntro=document.body.classList.contains('section-stepping')&&textRect.top>=0&&textRect.bottom<=innerHeight;
 const read=settledIntro?1:Math.max(0,Math.min(1,(innerHeight*.83-textRect.top)/(textRect.height+innerHeight*.12)));
 statement.classList.toggle('is-tracking',motion);
 wordSpans.forEach((word,index)=>word.classList.toggle('is-read',!motion||index/wordSpans.length<read));
}
function queueScroll(){if(!queued){queued=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',queueScroll,{passive:true});window.addEventListener('resize',queueScroll,{passive:true});
function updateMotion(){document.body.classList.toggle('motion-paused',!motion);motionButton.setAttribute('aria-pressed',String(motion));motionButton.querySelector('.motion-label').textContent=motion?'Motion on':'Motion off';sculpture?.setMotion(motion);choreography.setMotion(motion);updateScroll();}
motionButton.addEventListener('click',()=>{motion=!motion;updateMotion();});
reducedMotion.addEventListener('change',event=>{motion=!event.matches;updateMotion();});
document.querySelector('.scene-controls').hidden=false;
updateMotion();
choreography.restoreFragment();
if(!navigator.connection?.saveData){
 import('./scene.js').then(({createSculpture})=>{sculpture=createSculpture(document.querySelector('#sculpture'),{motion});}).catch(()=>{document.querySelector('#sculpture').classList.remove('scene-ready');});
}
