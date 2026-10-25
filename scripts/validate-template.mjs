import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
const directory=await mkdtemp(path.join(tmpdir(),'webspeak-catalog-build-'));
try{
 const first=path.join(directory,'first.wplugin'),second=path.join(directory,'second.wplugin');
 for(const output of [first,second])execFileSync(process.execPath,['build.mjs','template',output],{stdio:'inherit'});
 const bytes=await readFile(first);assert.deepEqual(bytes,await readFile(second));const pack=JSON.parse(bytes);assert.equal(pack.manifest.apiVersion,2);assert.equal(pack.manifest.permissions,undefined);assert.ok(pack.files[pack.manifest.client.entry]);assert.ok(pack.files[pack.manifest.server.entry]);assert.equal(Object.keys(pack.files).length,4);console.log('Catalog v2 and reproducible application build verified.');
}finally{assert.equal(path.dirname(directory),tmpdir());await rm(directory,{recursive:true,force:true});}
