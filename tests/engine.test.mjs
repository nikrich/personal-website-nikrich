import {test} from 'node:test';
import assert from 'node:assert/strict';
import {start,inside,move,nearest,stepToward,normalizeDiscoveries,projection,mapDestination} from '../js/engine.js';
import {projects} from '../js/content.js';
test('player starts inside the district; sustained movement cannot leave its boundary',()=>{assert.ok(inside(start));for(const [dx,dy] of [[0,.01],[0,-.01],[.01,0],[-.01,0],[.01,.01]]){let p={...start};for(let n=0;n<300;n++){p=move(p,dx,dy);assert.ok(inside(p));}}});
test('every project has a reachable entrance',()=>{for(const p of projects)assert.ok(inside(p.entry||p),p.id);});
test('click-to-walk reaches every entrance without overshooting',()=>{for(const p of projects){let result={point:{...start},arrived:false};let frames=0;while(!result.arrived&&frames++<1000)result=stepToward(result.point,p.entry||p,.005);assert.ok(result.arrived,p.id);assert.deepEqual(result.point,p.entry||p);}});
test('nearest entrance identifies each project independently',()=>{const entrances=projects.map(p=>({...p,...p.entry}));for(const p of entrances)assert.equal(nearest(p,entrances).id,p.id);});
test('local progress rejects corrupt types, removed projects, and duplicates',()=>{assert.equal(normalizeDiscoveries({},projects).size,0);assert.equal(normalizeDiscoveries(['club','club','old','save'],projects).size,2);assert.equal(normalizeDiscoveries(projects.map(p=>p.id),projects).size,6);});
test('mobile and desktop projections keep player and beacons on the image',()=>{for(const [w,h] of [[340,347],[390,398],[850,586],[1050,678]]){const v=projection(w,h);assert.ok(v.width>=w);assert.ok(v.height>=h);for(const p of projects){const x=v.x+p.x*v.width,y=v.y+p.y*v.height;assert.ok(x>0&&x<w,`${p.id}: ${x} within ${w}`);assert.ok(y>0&&y<h);}}});

test('map taps resolve to the same world position across responsive crops',()=>{for(const [w,h]of [[280,250],[390,348],[850,586]]){const v=projection(w,h),p={x:.6,y:.55};const actual=mapDestination(v.x+p.x*v.width,v.y+p.y*v.height,v);assert.ok(Math.abs(actual.x-p.x)<1e-10);assert.ok(Math.abs(actual.y-p.y)<1e-10);}});
test('taps outside the island stop on walkable ground',()=>{const v=projection(390,348);for(const [x,y]of [[0,0],[390,0],[390,348],[0,348],[195,0]])assert.ok(inside(mapDestination(x,y,v)));});
