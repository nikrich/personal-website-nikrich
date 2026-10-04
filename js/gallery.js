// Original abstract project studies, drawn as vectors rather than product mockups.
const studies=[
 {accent:'#acb9ef',art:`<g class="study-float">${[[160,90],[107,121],[213,121],[160,152],[107,183],[213,183],[160,214]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0-30 27-15 27 15 0 30-27 15-27-15Z" fill="url(#alloy)"/><path d="M-27-15 0 0 27-15M0 0V30" fill="none" stroke="#dbe3ff" stroke-opacity=".6"/><path d="M0-19 17-9 0 1-17-9Z" fill="var(--study-accent)" opacity=".55"/></g>`).join('')}</g>`},
 {accent:'#b2d2cc',art:'<g class="study-float"><path d="M73 249c21-41 8-50 19-109 6-41 24-68 62-70 41-3 73 31 79 77 5 41-1 68 25 102-33 11-31-20-49-11-23 12-20 30-44 15-20-13-24-18-42-3-20 18-37 11-50-1Z" fill="url(#alloy)"/><path d="M91 237c25-33 19-99 45-136M131 247c28-29 12-81 31-154M198 239c-25-45 3-88-16-143M225 237c-25-55 0-99-24-126" fill="none" stroke="#cbe0e9" stroke-opacity=".3" stroke-width="2"/><ellipse cx="143" cy="151" rx="8" ry="16" fill="#121d23"/><ellipse cx="183" cy="151" rx="8" ry="16" fill="#121d23"/></g>'},
 {accent:'#aecbbd',art:'<g class="study-float" transform="rotate(-24 160 160)"><path d="M83 160h39c32 0 15-50 44-50s12 100 45 100h35" fill="none" stroke="#101916" stroke-width="29"/><path d="M83 156h39c32 0 15-50 44-50s12 100 45 100h35" fill="none" stroke="url(#alloy)" stroke-width="21"/><path d="M84 153h38c32 0 15-50 44-50s12 100 45 100h35" fill="none" stroke="var(--study-accent)" stroke-width="2"/><rect x="44" y="123" width="57" height="65" rx="12" fill="url(#alloy)"/><ellipse cx="98" cy="155" rx="15" ry="33" fill="#212e31" stroke="#abc6bd"/><path d="M103 144h19m-19 20h19" stroke="#c6d9d1" stroke-width="6"/><rect x="236" y="174" width="42" height="65" rx="12" fill="url(#alloy)"/><path d="M240 185v42M250 181v51M260 181v51" stroke="#d3e4dc" stroke-opacity=".35"/></g>'},
 {accent:'#a7caca',art:`<g class="study-terrain" transform="translate(160 174) scale(1 .56) rotate(-38)">${[76,57,38,19,0].map((y,i)=>`<g transform="translate(0 ${y})"><path d="M-112-103H105V102H-112Z" fill="url(#alloy)" stroke="#9aaebd" stroke-opacity=".45"/>${i===4?'<path d="M-85 51C-102-31-18-38-21-65S83-90 77-9 44 68-17 77-68 85-85 51Zm17-10C-86-10-5-20-3-43S63-52 53-5 21 46-11 52-59 64-68 41Zm23-6C-67 5 10-7 14-23S40-33 35-7 14 29-5 32-36 49-45 35Z" fill="none" stroke="var(--study-accent)" stroke-width="2"/>':''}</g>`).join('')}</g>`},
 {accent:'#bcc5d0',art:'<g class="study-float" transform="rotate(-20 160 160)"><path d="M39 257c120 0 24-194 142-194h104M45 72c67 0 77 182 220 182" fill="none" stroke="#0a0f12" stroke-width="36"/><path d="M39 253c120 0 24-194 142-194h104M45 68c67 0 77 182 220 182" fill="none" stroke="url(#alloy)" stroke-width="27"/><path d="M39 253c120 0 24-194 142-194h104M45 68c67 0 77 182 220 182" fill="none" stroke="#e0e9ed" stroke-opacity=".8" stroke-dasharray="9 9" stroke-width="1.4"/><path d="M95 172c-50 5-46 63 0 57 40-5 46-62 0-57Z" fill="none" stroke="url(#alloy)" stroke-width="18"/></g>'},
 {accent:'#ccb7d4',art:`<g class="study-float">${[-22,0,22].map((angle,i)=>`<g transform="rotate(${angle} 160 245) translate(${i===1?0:i===0?-8:8} 0)"><rect x="103" y="67" width="116" height="184" rx="10" fill="url(#alloy)" stroke="#bfc7d3"/><rect x="112" y="77" width="98" height="164" rx="4" fill="#111922" opacity=".8"/><path d="M160 116 169 147 198 157 170 167 160 199 150 167 122 157 150 147Z" fill="var(--study-accent)" opacity=".7"/><path d="M122 92h13M122 225h13M185 92h13M185 225h13" stroke="#dce3eb"/></g>`).join('')}</g>`},
 {accent:'#b2bdde',art:`<g class="study-float">${[215,161,107].map((y,i)=>`<g transform="translate(160 ${y})"><path d="M-95-25 0-57 95-25V9L0 42-95 9Z" fill="url(#alloy)" stroke="#b0bccf" stroke-opacity=".5"/><path d="M-95-25 0 8 95-25M0 8V42" fill="none" stroke="#dce6ef" stroke-opacity=".5"/><path d="M-60-26 0-46 62-25 0-3Z" fill="#16212e" opacity=".7"/><circle cx="58" cy="4" r="3" fill="var(--study-accent)"/><circle cx="71" cy="0" r="2" fill="#dce6ef"/></g>`).join('')}</g>`},
 {accent:'#d0bda3',art:'<g class="study-float"><path d="M60 171c5 88 53 104 100 104s93-16 100-104Z" fill="url(#alloy)"/><ellipse cx="160" cy="173" rx="100" ry="36" fill="#172025" stroke="#c7cdd0" stroke-width="3"/><ellipse cx="160" cy="178" rx="80" ry="23" fill="none" stroke="var(--study-accent)" stroke-opacity=".6"/><path d="M115 176c-40-32 110-58 77-13s-102-2-37-18 82 49 1 44" fill="none" stroke="var(--study-accent)" stroke-width="3"/><path d="M162 122c-51-8-58-41-46-65 44 10 59 40 46 65Z" fill="url(#alloy)"/><path d="M160 117c30-7 49-24 51-53-34 0-55 25-51 53Z" fill="var(--study-accent)" opacity=".65"/><path d="M155 128 129 79" stroke="#d5dfd3"/></g>'},
 {accent:'#a9c0d7',art:'<g class="study-float"><path d="M160 48 255 139 215 236 160 278 89 224 63 129Z" fill="url(#alloy)" stroke="#9db1c2"/><path d="m160 48-17 101 112-10-95 139-17-129-80-20 97 149 55-42-72-87 17-101-71 176" fill="none" stroke="#d3e1eb" stroke-opacity=".65"/><path d="m143 149 112-10-95 139Z" fill="var(--study-accent)" opacity=".25"/><path d="m160 48-17 101-80-20Z" fill="#d5e5f1" opacity=".32"/></g>'},
 {accent:'#b5cfc6',art:'<g class="study-float"><circle cx="160" cy="160" r="72" fill="url(#orb)"/><g fill="none" stroke="var(--study-accent)" stroke-opacity=".55"><ellipse cx="160" cy="160" rx="137" ry="47" transform="rotate(-26 160 160)"/><ellipse cx="160" cy="160" rx="124" ry="45" transform="rotate(49 160 160)"/><ellipse cx="160" cy="160" rx="104" ry="51" transform="rotate(104 160 160)"/></g><circle cx="55" cy="222" r="9" fill="url(#alloy)"/><circle cx="222" cy="67" r="13" fill="url(#alloy)"/><path d="M130 183v-38a30 30 0 0 1 60 0v38l-15-9-15 11-15-11Z" fill="#c4d5d9" opacity=".7"/><path d="M149 141v14m22-14v14" stroke="#16202a" stroke-width="4"/></g>'}
];
const defs='<defs><linearGradient id="alloy" x1="0" y1="0" x2="1" y2=".85"><stop stop-color="#dde7ec"/><stop offset=".21" stop-color="#8496a6"/><stop offset=".43" stop-color="#2e3e4a"/><stop offset=".63" stop-color="#15212c"/><stop offset=".83" stop-color="#9daebb"/><stop offset="1" stop-color="#53697a"/></linearGradient><radialGradient id="orb" cx=".33" cy=".25"><stop stop-color="#dbe6ef"/><stop offset=".23" stop-color="#8babb7"/><stop offset=".62" stop-color="#344651"/><stop offset="1" stop-color="#101821"/></radialGradient></defs>';
function artwork(index,suffix){return `<svg viewBox="0 0 320 320" fill="none" aria-hidden="true">${(defs+studies[index].art).replaceAll('id="alloy"',`id="alloy-${suffix}"`).replaceAll('id="orb"',`id="orb-${suffix}"`).replaceAll('#alloy)',`#alloy-${suffix})`).replaceAll('#orb)',`#orb-${suffix})`)}</svg>`;}

export function createProjectGallery(){
 const list=document.querySelector('.project-list');
 const rows=[...list.querySelectorAll('.project-row')];
 const exhibition=document.createElement('div');exhibition.className='project-exhibition';list.before(exhibition);exhibition.append(list);
 const preview=document.createElement('aside');preview.className='project-preview';preview.setAttribute('aria-label','Selected project');
 preview.innerHTML='<div class="preview-art"><span class="preview-coordinate">INDEPENDENT EXPLORATIONS</span><span class="preview-number" aria-hidden="true"></span><div class="preview-sculpture"></div><span class="preview-caption">AN IDEA, TAKING SHAPE.</span></div><div class="preview-copy"><p class="preview-category"></p><h3></h3><p class="preview-description"></p><div class="preview-bottom"><span class="preview-status"></span><a target="_blank" rel="noopener noreferrer">Explore project <span aria-hidden="true">↗</span></a></div></div>';
 exhibition.append(preview);
 let active=-1;
 function activate(index){
  if(index===active)return;active=index;
  const row=rows[index],link=row.querySelector('h3 a');
  rows.forEach((item,i)=>item.classList.toggle('is-selected',i===index));
  preview.style.setProperty('--study-accent',studies[index].accent);
  preview.querySelector('.preview-number').textContent=String(index+1).padStart(2,'0');
  const sculpture=preview.querySelector('.preview-sculpture');
  sculpture.innerHTML=artwork(index,'preview');
  preview.querySelector('h3').textContent=link.textContent.replace('↗','').trim();
  preview.querySelector('.preview-category').textContent=row.querySelector('.row-title>span').textContent;
  preview.querySelector('.preview-description').textContent=row.querySelector(':scope>p').textContent;
  preview.querySelector('.preview-status').textContent=row.querySelector('.row-status').textContent;
  preview.querySelector('a').href=link.href;
  // Replace the copy node to restart its CSS entrance, with no forced layout reads.
  const copy=preview.querySelector('.preview-copy');copy.replaceWith(copy.cloneNode(true));
 }
 rows.forEach((row,index)=>{
  row.style.setProperty('--study-accent',studies[index].accent);
  const description=row.querySelector(':scope>p');description.id='project-description-'+index;
  row.querySelector('h3 a').setAttribute('aria-describedby',description.id);
  const thumbnail=document.createElement('div');thumbnail.className='row-study';thumbnail.setAttribute('aria-hidden','true');thumbnail.innerHTML=artwork(index,'row-'+index);row.prepend(thumbnail);
  row.addEventListener('pointerenter',()=>activate(index));row.addEventListener('focusin',()=>activate(index));
 });
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{if(rows[active].hidden)activate(rows.findIndex(row=>!row.hidden));}));
 document.body.classList.add('has-gallery');activate(0);
}
