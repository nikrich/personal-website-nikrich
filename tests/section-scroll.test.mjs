import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Window} from 'happy-dom';
import {createSectionStepper} from '../js/section-scroll.js';

function harness(){
 const window=new Window();const document=window.document;
 Object.assign(globalThis,{window,document});
 let now=0,y=0,id=0;const frames=new Map();
 Object.defineProperty(window.performance,'now',{value:()=>now,configurable:true});
 Object.defineProperty(window,'scrollY',{get:()=>y});
 window.scrollTo=({top})=>{y=top;};
 window.requestAnimationFrame=callback=>{frames.set(++id,callback);return id;};
 window.cancelAnimationFrame=id=>frames.delete(id);
 const controller=createSectionStepper({getStops:()=>[0,800,1600,2600,3600,4800]});controller.setEnabled(true);
 const wheel=(deltaY,options={})=>{
  const event=new window.WheelEvent('wheel',{deltaY,bubbles:true,cancelable:true,...options});
  // Happy DOM's WheelEvent currently omits the native MouseEvent modifier fields.
  for(const key of ['ctrlKey','metaKey','shiftKey'])Object.defineProperty(event,key,{value:!!options[key]});
  document.body.dispatchEvent(event);return event.defaultPrevented;
 };
 const advance=ms=>{now+=ms;const callbacks=[...frames.values()];frames.clear();callbacks.forEach(callback=>callback(now));};
 return {window,document,controller,wheel,advance,get y(){return y;},set y(value){y=value;},get frames(){return frames.size;}};
}

test('one wheel gesture advances one scene and absorbs its momentum; a new gesture can reverse',async()=>{
 const h=harness();assert.ok(h.wheel(120));
 for(let i=0;i<16;i++){h.advance(100);assert.ok(h.wheel(14));}
 assert.equal(h.y,800);assert.equal(h.frames,0);
 h.advance(300);assert.ok(h.wheel(120));h.advance(1200);assert.equal(h.y,1600);
 h.advance(300);assert.ok(h.wheel(-120));h.advance(1200);assert.equal(h.y,800);
 await h.window.happyDOM.abort();
});

test('small trackpad deltas accumulate while reading sections, zoom, dialogs and motion-off remain native',async()=>{
 const h=harness();h.wheel(10);h.advance(20);h.wheel(10);assert.equal(h.frames,0);
 h.advance(20);h.wheel(12);assert.equal(h.frames,1);h.advance(1200);assert.equal(h.y,800);
 h.advance(300);assert.equal(h.wheel(120,{ctrlKey:true}),false);
 h.y=4800;assert.equal(h.wheel(120),false);assert.equal(h.frames,0);
 h.y=5300;assert.equal(h.wheel(-120),false);
 h.document.body.classList.add('modal-open');h.y=1600;assert.equal(h.wheel(120),false);
 h.document.body.classList.remove('modal-open');h.controller.setEnabled(false);assert.equal(h.wheel(120),false);
 assert.equal(h.frames,0);assert.equal(h.y,1600);
 await h.window.happyDOM.abort();
});

test('keyboard stepping respects native button activation and direct navigation can cancel a transition',async()=>{
 const h=harness();
 const key=(target,key,options={})=>{const event=new h.window.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...options});target.dispatchEvent(event);return event.defaultPrevented;};
 assert.ok(key(h.document.body,'PageDown'));h.advance(1200);assert.equal(h.y,800);
 const button=h.document.createElement('button');h.document.body.append(button);
 assert.equal(key(button,' '),false);assert.equal(h.frames,0);
 h.advance(300);h.wheel(120);h.advance(250);
 h.document.body.dispatchEvent(new h.window.PointerEvent('pointerdown',{bubbles:true}));
 assert.equal(h.frames,0);assert.ok(h.y>800&&h.y<1600);
 h.controller.setEnabled(false);assert.equal(key(h.document.body,'PageDown'),false);
 await h.window.happyDOM.abort();
});
