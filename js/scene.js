import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// Original procedural sculpture. No reference-site models or textures are used.
export function createSculpture(host, {motion=true}={}) {
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setClearColor(0x000000,0);
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<650?1.35:1.75));
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  host.append(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(38,1,.1,50);
  camera.position.z=8;
  const pmrem=new THREE.PMREMGenerator(renderer);
  const room=new RoomEnvironment();
  const env=pmrem.fromScene(room,.04);
  scene.environment=env.texture;
  room.dispose();pmrem.dispose();
  const silver=new THREE.MeshPhysicalMaterial({color:0x8b9bab,metalness:1,roughness:.12,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:1.8});
  const darkSilver=new THREE.MeshPhysicalMaterial({color:0x687b8c,metalness:.97,roughness:.16,clearcoat:1,envMapIntensity:2.5});
  const pearl=new THREE.MeshPhysicalMaterial({color:0x94a5b6,metalness:1,roughness:.14,clearcoat:1,iridescence:.12,envMapIntensity:1.8});
  scene.add(new THREE.AmbientLight(0xe0ebff,.4));
  const key=new THREE.DirectionalLight(0xdce7ff,5);key.position.set(-2,3,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0xa4d2d3,4);rim.position.set(4,-1,2);scene.add(rim);

  const frameShape=new THREE.Shape();
  frameShape.moveTo(-.8,-.8);frameShape.lineTo(.8,-.8);frameShape.lineTo(.8,.8);frameShape.lineTo(-.8,.8);frameShape.closePath();
  const hole=new THREE.Path();hole.moveTo(-.43,-.43);hole.lineTo(-.43,.43);hole.lineTo(.43,.43);hole.lineTo(.43,-.43);hole.closePath();frameShape.holes.push(hole);
  const frameGeometry=new THREE.ExtrudeGeometry(frameShape,{depth:.23,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.085,bevelThickness:.085,curveSegments:8});
  frameGeometry.center();
  const knot=new THREE.Group();
  for(let i=0;i<3;i++){
    const frame=new THREE.Mesh(frameGeometry,i===1?darkSilver:silver);
    if(i===1)frame.rotation.y=Math.PI/2;
    if(i===2)frame.rotation.x=Math.PI/2;
    knot.add(frame);
  }
  scene.add(knot);

  const waveGeometry=new THREE.SphereGeometry(.78,72,48);
  const position=waveGeometry.attributes.position;
  for(let i=0;i<position.count;i++){
    const x=position.getX(i),y=position.getY(i),z=position.getZ(i);
    const theta=Math.atan2(z,x),phi=Math.acos(Math.max(-1,Math.min(1,y/.78)));
    const r=1+.09*Math.sin(phi*18+theta*3)*Math.sin(phi);
    position.setXYZ(i,x*r,y*r,z*r);
  }
  waveGeometry.computeVertexNormals();
  const wave=new THREE.Mesh(waveGeometry,pearl);scene.add(wave);
  const steps=new THREE.Group();
  const box=new RoundedBoxGeometry(.37,.37,.37,3,.035);
  for(let i=0;i<7;i++){
    const cube=new THREE.Mesh(box,i%2?pearl:silver);
    cube.position.set((i-3)*.24,Math.sin(i*.85)*.27,Math.cos(i*.85)*.27);steps.add(cube);
  }
  scene.add(steps);
  let visible=true,enabled=motion,lastFrame=0,time=0,progress=0,scroll=0,pointerX=0,pointerY=0,px=0,py=0,width=0,height=0;
  const smooth=value=>{const t=THREE.MathUtils.clamp(value,0,1);return t*t*(3-2*t);};
  function resize(){width=host.clientWidth;height=host.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();render(0,true);}
  function readScroll(){const hero=host.closest('.hero');const rect=hero.getBoundingClientRect();progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,hero.offsetHeight-innerHeight)));if(!enabled)render(0,true);}
  function pointer(event){pointerX=(event.clientX/innerWidth-.5)*2;pointerY=(event.clientY/innerHeight-.5)*2;}
  function render(stamp,force=false){
    if(!force&&(!visible||document.hidden||stamp-lastFrame<15))return;
    const delta=force?1/60:Math.max(0,Math.min((stamp-lastFrame)/1000,.06));if(!force)lastFrame=stamp;
    if(enabled)time+=Math.max(0,delta);
    px+=(enabled?pointerX*.18-px:-px)*.055;py+=(enabled?pointerY*.12-py:-py)*.055;
    const mobile=width<650;
    scroll=enabled?THREE.MathUtils.lerp(scroll,progress,1-Math.exp(-delta*15)):0;
    const approach=smooth(scroll/.8),burst=smooth((scroll-.36)/.64);
    camera.position.set(px*.3*(1-approach),-py*.2,8-approach*2.7);
    camera.rotation.z=-burst*.13;
    knot.position.set((mobile?.64:1.25)*(1-approach), (mobile?1.16:.83)*(1-approach)+Math.sin(time*.45)*.07,approach*1.1);
    knot.scale.setScalar((mobile?.45:.77)*(1+approach*1.6));
    knot.rotation.set(.4+py+time*.045+approach*.8,.52+px+time*.09+approach*1.6,-.18+approach*1.15);
    knot.children.forEach((piece,i)=>{
      piece.position.set([-.85,.8,0][i]*burst,[.4,.25,-.8][i]*burst,[-.1,.45,.5][i]*burst);
      piece.rotation.set((i===2?Math.PI/2:0)+burst*[.3,-.7,.8][i],(i===1?Math.PI/2:0)+burst*[-.6,.8,.25][i],burst*[.4,-.3,.6][i]);
    });
    wave.position.set((mobile?-.6:-.85)-approach*1.9,(mobile?-1.05:-1.6)+approach*1.2,.4+approach*3.8);
    wave.scale.setScalar((mobile?.32:.5)*(1+approach*.8));
    wave.rotation.set(.2+py+approach*1.3,time*.1+px+approach*2,-.25-approach);
    steps.position.set((mobile?-.55:-2.2)+approach*2,(mobile?1.73:1.7)+approach*1.1,-.4+approach*4);
    steps.scale.setScalar((mobile?.43:.62)*(1+approach*.7));
    steps.rotation.set(.4+py+approach*1.2,.3+time*.1+px+approach*2,-.3-approach*.7);
    steps.children.forEach((piece,i)=>{piece.position.set((i-3)*(.24+burst*.22),Math.sin(i*.85+burst*2)*(.27+burst*.25),Math.cos(i*.85)*.27);});
    renderer.render(scene,camera);
    host.classList.add('scene-ready');
  }
  function updateLoop(){renderer.setAnimationLoop(enabled&&visible&&!document.hidden?render:null);render(0,true);}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;updateLoop();});observer.observe(host);
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const visibility=()=>updateLoop();
  window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',readScroll,{passive:true});document.addEventListener('visibilitychange',visibility);
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();renderer.setAnimationLoop(null);host.classList.remove('scene-ready');});
  resize();readScroll();updateLoop();
  return {setMotion(value){enabled=value;updateLoop();},dispose(){renderer.setAnimationLoop(null);observer.disconnect();resizeObserver.disconnect();window.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',readScroll);document.removeEventListener('visibilitychange',visibility);for(const geo of [frameGeometry,waveGeometry,box])geo.dispose();for(const material of [silver,darkSilver,pearl])material.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();}};
}
