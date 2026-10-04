import {mkdir,copyFile,readFile,writeFile,stat,rm} from 'node:fs/promises';
import {resolve,dirname,join,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
const root=resolve('.'),folder=process.env.PORTFOLIO_TEST_OUT||'dist';
if(folder!=='dist'&&!/^\.release-check-[\w-]+$/.test(folder))throw new Error('Invalid output folder');
const out=resolve(root,folder);
if(out!==join(root,folder)||!out.startsWith(root+sep))throw new Error('Invalid output path');
const files=['index.html','portfolio.css','assets/logo/cinematic.svg','assets/portrait.jpg','assets/world/club.webp','assets/world/cape-town.webp','assets/audio/feral.webp','assets/audio/reverb.webp','404.html','_headers','robots.txt','sitemap.xml'];
for(const file of files)await stat(resolve(root,file));
for(const page of ['index.html','404.html']){
 const html=await readFile(page,'utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const url=match[1];
  if(/^(https?:|mailto:)/.test(url)||url==='/'||url==='js/portfolio.js')continue;
  if(!files.includes(url.replace(/^\//,'')))throw new Error('Unstaged dependency: '+url);
 }
}
await rm(out,{recursive:true,force:true});
for(const file of files){const target=resolve(out,file);await mkdir(dirname(target),{recursive:true});await copyFile(resolve(root,file),target);}
await build({entryPoints:['js/portfolio.js'],outfile:resolve(out,'js/portfolio.js'),bundle:true,minify:true,format:'esm',target:['es2022'],legalComments:'inline',logLevel:'silent'});
const revision=source=>createHash('sha256').update(source).digest('hex').slice(0,12);
const replacements={};
for(const file of ['portfolio.css','js/portfolio.js']){
 const source=await readFile(resolve(out,file),'utf8');
 const hashed=file.replace(/\.(css|js)$/,`.${revision(source)}.$1`);
 await writeFile(resolve(out,hashed),source);replacements[file]=hashed;
}
for(const page of ['index.html','404.html']){
 let html=await readFile(resolve(out,page),'utf8');
 for(const [file,hashed]of Object.entries(replacements))html=html.replaceAll(file,hashed);
 await writeFile(resolve(out,page),html);
}
console.log(`Built portfolio with bundled 3D runtime and fingerprinted assets.`);
