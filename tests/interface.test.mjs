import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Window} from 'happy-dom';

test('static content, filters, project dialogs, motion preference and mobile navigation remain accessible',async()=>{
 const window=new Window({url:'http://localhost:4174',settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true,disableJavaScriptEvaluation:true}});
 const document=window.document;
 document.write(await readFile('index.html','utf8'));
 const rows=[...document.querySelectorAll('[data-category]')];
 assert.equal(rows.length,10);assert.ok(rows.every(row=>!row.hidden));
 assert.ok(document.querySelector('.filter-bar').hidden);
 assert.equal(document.querySelectorAll('.fallback-link[href^="https://"]').length,3);
 const mediaListeners=[];
 Object.assign(globalThis,{window,document,innerWidth:390,innerHeight:844,scrollY:0,requestAnimationFrame:()=>1,matchMedia:()=>({matches:true,addEventListener:(name,fn)=>mediaListeners.push(fn)})});
 Object.defineProperty(globalThis,'navigator',{value:{connection:{saveData:true}},configurable:true});
 await import('../js/portfolio.js');
 assert.equal(document.querySelector('.filter-bar').hidden,false);
 assert.equal(document.querySelector('#motion-toggle').getAttribute('aria-pressed'),'false');
 const click=selector=>document.querySelector(selector).click();
 for(const [category,expected]of [['ai',2],['unreal',5],['other',3],['all',10]]){
  click(`[data-filter="${category}"]`);
  assert.equal(rows.filter(row=>!row.hidden).length,expected);
  assert.equal(document.querySelector('.result-count').textContent,`${expected} projects`);
  assert.equal(document.querySelectorAll('.filters [aria-pressed="true"]').length,1);
 }
 rows[3].querySelector('h3 a').focus();
 assert.equal(document.querySelector('.preview-copy h3').textContent,'GeoScape');
 assert.equal(document.querySelector('.preview-bottom a').href,'https://geoscape.unrealtools.com/');
 assert.ok(rows[3].classList.contains('is-selected'));
 click('[data-filter="ai"]');
 assert.equal(document.querySelector('.preview-copy h3').textContent,'Hive IDE');
 assert.equal(document.querySelectorAll('.project-row.is-selected:not([hidden])').length,1);
 click('[data-filter="all"]');
 const ids=[...document.querySelectorAll('[id]')].map(element=>element.id);
 assert.equal(new Set(ids).size,ids.length,'artwork gradients and descriptions have unique IDs');
 const dialog=document.querySelector('#project-dialog');
 for(const [key,pattern,destination]of [['club',/The Club/,'https://www.youtube.com/@nikrich'],['audio',/Sound is a place/,'https://hungryghostaudio.com/#listen'],['lockstep',/Big worlds/,'https://github.com/nikrich/lockstep']]){
  const opener=document.querySelector(`[data-project="${key}"]`);opener.click();
  assert.equal(dialog.open,true);assert.match(document.querySelector('#dialog-title').textContent,pattern);
  assert.equal(dialog.querySelector('a').href,destination);assert.equal(dialog.querySelectorAll('.dialog-features p').length,4);
  click('.dialog-close');assert.equal(dialog.open,false);assert.equal(document.activeElement,opener);assert.ok(!document.body.classList.contains('modal-open'));
 }
 click('.mobile-menu');assert.equal(document.querySelector('#mobile-nav').hidden,false);assert.ok(document.querySelector('main').inert);
 document.dispatchEvent(new window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 assert.equal(document.querySelector('#mobile-nav').hidden,true);assert.equal(document.querySelector('main').inert,false);
 click('.mobile-menu');click('#mobile-nav a');assert.equal(document.querySelector('#mobile-nav').hidden,true);
 click('#motion-toggle');assert.equal(document.querySelector('#motion-toggle').getAttribute('aria-pressed'),'true');
 mediaListeners.at(-1)({matches:true});assert.equal(document.querySelector('#motion-toggle').getAttribute('aria-pressed'),'false');
 for(const link of document.querySelectorAll('a[href^="#"]'))assert.ok(document.querySelector(link.getAttribute('href')),link.outerHTML);
 for(const link of document.querySelectorAll('a[target="_blank"]'))assert.ok(link.rel.includes('noopener'));
 assert.equal(document.querySelectorAll('h1').length,1);
 await window.happyDOM.abort();
});

test('turning motion off restores every chapter after a pinned desktop sequence',async()=>{
 const window=new Window({url:'http://localhost:4174',settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true,disableJavaScriptEvaluation:true}});
 const document=window.document;document.write(await readFile('index.html','utf8'));
 Object.assign(globalThis,{window,document,innerWidth:1280,innerHeight:800});
 const {createChoreography}=await import('../js/choreography.js');
 const scenes=createChoreography();scenes.setMotion(true);
 assert.ok(document.querySelector('.work-reel').classList.contains('is-pinned'));
 assert.equal(document.querySelectorAll('.chapter[aria-hidden="true"]').length,2);
 scenes.setMotion(false);
 assert.equal(document.querySelectorAll('.chapter[aria-hidden]').length,0);
 assert.ok([...document.querySelectorAll('.chapter')].every(chapter=>!chapter.inert&&!chapter.style.visibility&&!chapter.style.clipPath));
 assert.ok(!document.querySelector('.work-reel').classList.contains('is-pinned'));
 globalThis.innerWidth=390;scenes.setMotion(true);
 assert.equal(document.querySelectorAll('.chapter[aria-hidden]').length,0);
 assert.ok(!document.querySelector('.work-reel').classList.contains('is-pinned'));
 await window.happyDOM.abort();
});
