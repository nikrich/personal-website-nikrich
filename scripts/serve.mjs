import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {watch} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist'),port=Number(process.env.PORT||4174);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain'};
let version=Date.now(),timer;
function rebuild(){try{execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});version=Date.now();}catch{console.error('Build failed. Fix the source and save again.');}}
rebuild();
for(const dir of ['.','js','assets','scripts'])watch(dir,(event,file)=>{if(!file||!(/\.(html|css|m?js|svg|webp)$/.test(file)||file==='_headers'))return;clearTimeout(timer);timer=setTimeout(rebuild,180);});
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/__version'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({version}));return;}
  const path=resolve(root,'.'+decodeURIComponent(url.pathname).replace(/\/$/,'/index.html'));
  if(!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  let data=await readFile(path);
  if(extname(path)==='.html')data=Buffer.from(data.toString().replace('</body>',`<script>setInterval(async()=>{try{const r=await fetch('/__version');if((await r.json()).version!==${version})location.reload()}catch{}},1500)</script></body>`));
  res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(port,'127.0.0.1',()=>console.log(`Live preview: http://localhost:${port}`));
