import {mkdir,copyFile,readFile,writeFile,stat,rm} from 'node:fs/promises';
import {resolve,dirname,join,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {projects} from '../js/content.js';
const root=resolve('.'),out=resolve(root,'dist');
if(out!==join(root,'dist')||!out.startsWith(root+sep))throw new Error('Invalid output path');
const files=['index.html','world.css','js/world.js','js/content.js','js/engine.js','assets/logo/monogram.svg','assets/portrait.jpg','assets/world/district.webp','assets/world/club.webp','assets/tools/road.jpg','assets/tools/deck.jpg','assets/tools/save.jpg','404.html','_headers','robots.txt'];
for(const file of files)await stat(resolve(root,file));
const html=await readFile('index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const url=match[1];if(/^(https?:|mailto:|\.\/)/.test(url))continue;if(!files.includes(url))throw new Error('Unstaged HTML dependency: '+url);}
for(const project of projects){if(project.image&&!files.includes(project.image))throw new Error('Unstaged project image');for(const [,url]of project.links)if(!url.startsWith('https://'))throw new Error('Invalid external project link');}
await rm(out,{recursive:true,force:true});
let bytes=0;for(const file of files){const target=resolve(out,file);await mkdir(dirname(target),{recursive:true});await copyFile(resolve(root,file),target);bytes+=(await stat(target)).size;}
console.log(`Built ${files.length} public files (${(bytes/1024/1024).toFixed(2)} MB). All local references and project assets resolved.`);
// Fingerprint modules from the leaves up, so a cached page never mixes releases.
// These paths also bypass browser caches on the custom domain, which can set a
// longer cache lifetime than the workers.dev endpoint.
const revision=source=>createHash('sha256').update(source).digest('hex').slice(0,12);
const moduleNames={};
for(const name of ['content','engine','world']){
 let source=await readFile(resolve(out,`js/${name}.js`),'utf8');
 for(const [dependency,hashed]of Object.entries(moduleNames))source=source.replaceAll(`'./${dependency}.js'`,`'./${hashed}'`);
 const hashed=`${name}.${revision(source)}.js`;
 await writeFile(resolve(out,'js',hashed),source);
 moduleNames[name]=hashed;
}
const css=await readFile(resolve(out,'world.css'),'utf8');
const cssName=`world.${revision(css)}.css`;
await writeFile(resolve(out,cssName),css);
for(const page of ['index.html','404.html']){
 let content=await readFile(resolve(out,page),'utf8');
 content=content.replaceAll('world.css',cssName).replaceAll('js/world.js',`js/${moduleNames.world}`);
 await writeFile(resolve(out,page),content);
}
console.log(`Release assets: ${cssName}, ${moduleNames.world}`);
