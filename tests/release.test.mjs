import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile,access,mkdtemp,rm} from 'node:fs/promises';
import {resolve,basename,sep} from 'node:path';
import {createHash} from 'node:crypto';

test('production pages use content-addressed assets and exclude historical code',async()=>{
 const output=await mkdtemp(resolve('.release-check-'));
 assert.ok(output.startsWith(resolve('.')+sep+'.release-check-'));
 try{
 execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,PORTFOLIO_TEST_OUT:basename(output)}});
 const html=await readFile(resolve(output,'index.html'),'utf8');
 const css=html.match(/href="(portfolio\.[a-f0-9]{12}\.css)"/)[1];
 const js=html.match(/src="(js\/portfolio\.[a-f0-9]{12}\.js)"/)[1];
 for(const path of [css,js]){
  const source=await readFile(resolve(output,path));
  assert.ok(source.byteLength>1000,'release assets must not be empty or truncated');
  const hash=createHash('sha256').update(source).digest('hex').slice(0,12);
  assert.ok(path.includes('.'+hash+'.'),path);
 }
 assert.ok((await readFile(resolve(output,'404.html'),'utf8')).includes('/'+css));
 for(const path of ['js/world.js','js/content.js','js/engine.js','package.json','.git/config','README.md'])await assert.rejects(access(resolve(output,path)));
 assert.ok(html.includes('https://jannikrichter.com/'));
 }finally{await rm(output,{recursive:true,force:true});}
});
