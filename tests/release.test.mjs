import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

test('production HTML and module imports use content-addressed assets',async()=>{
 execFileSync(process.execPath,['scripts/build.mjs']);
 const html=await readFile('dist/index.html','utf8');
 const css=html.match(/href="(world\.[a-f0-9]{12}\.css)"/)[1];
 const js=html.match(/src="(js\/world\.[a-f0-9]{12}\.js)"/)[1];
 const script=await readFile('dist/'+js,'utf8');
 const imports=[...script.matchAll(/from '\.\/(\w+\.[a-f0-9]{12}\.js)'/g)].map(m=>'js/'+m[1]);
 assert.equal(imports.length,2);
 for(const path of [css,js,...imports]){
  const source=await readFile('dist/'+path);
  const hash=createHash('sha256').update(source).digest('hex').slice(0,12);
  assert.ok(path.includes('.'+hash+'.'),path);
 }
 assert.ok(!html.includes('href="world.css"'));
 assert.ok(!script.includes("from './engine.js'"));
 assert.ok(!(await readFile('dist/404.html','utf8')).includes('href="/world.css"'));
});
