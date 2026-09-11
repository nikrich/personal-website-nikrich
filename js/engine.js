// World coordinates refer to the original district artwork. Keep logic independent of rendering.
export const start = {x:.55,y:.715};
export const walkable = [{x:.29,y:.58},{x:.46,y:.455},{x:.59,y:.39},{x:.76,y:.285},{x:.885,y:.455},{x:.74,y:.58},{x:.56,y:.75}];
export function inside(p, polygon=walkable){let result=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if(((a.y>p.y)!==(b.y>p.y))&&(p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x))result=!result;}return result;}
export function move(p,dx,dy){const next={x:p.x+dx,y:p.y+dy};if(inside(next))return next;const horizontal={x:p.x+dx,y:p.y};if(inside(horizontal))return horizontal;const vertical={x:p.x,y:p.y+dy};return inside(vertical)?vertical:p;}
export function nearest(p,places){return places.reduce((best,item)=>Math.hypot(item.x-p.x,item.y-p.y)<Math.hypot(best.x-p.x,best.y-p.y)?item:best,places[0]);}
export function stepToward(p,target,speed){const dx=target.x-p.x,dy=target.y-p.y,d=Math.hypot(dx,dy);if(d<=speed)return {point:{...target},arrived:true};return {point:{x:p.x+dx/d*speed,y:p.y+dy/d*speed},arrived:false};}
export function normalizeDiscoveries(value,places){return new Set(Array.isArray(value)?value.filter(id=>places.some(p=>p.id===id)):[]);}
export function projection(width,height){const scaledWidth=Math.max(width,height*1672/941),scaledHeight=scaledWidth*941/1672;return {width:scaledWidth,height:scaledHeight,x:(width-scaledWidth)*.65,y:(height-scaledHeight)*.5};}
export function mapDestination(x,y,view){
 const point={x:(x-view.x)/view.width,y:(y-view.y)/view.height};
 if(inside(point))return point;
 // Taps on sky or the island edge stop at the nearest walkable part of the map.
 let closest=null,distance=Infinity;
 for(let i=0;i<walkable.length;i++){
  const a=walkable[i],b=walkable[(i+1)%walkable.length],dx=b.x-a.x,dy=b.y-a.y;
  const t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.y-a.y)*dy)/(dx*dx+dy*dy)));
  const candidate={x:a.x+t*dx,y:a.y+t*dy},d=Math.hypot(point.x-candidate.x,point.y-candidate.y);
  if(d<distance){distance=d;closest=candidate;}
 }
 // Nudge off the boundary so subsequent keyboard movement remains valid.
 return {x:closest.x+(start.x-closest.x)*.001,y:closest.y+(start.y-closest.y)*.001};
}
