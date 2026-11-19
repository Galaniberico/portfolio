import {cp,mkdir,rm,writeFile,readFile} from 'node:fs/promises';
const dist=new URL('../dist/',import.meta.url);
await rm(dist,{recursive:true,force:true}); await mkdir(dist,{recursive:true});
await cp(new URL('../src/',import.meta.url),dist,{recursive:true});
const demo=await readFile(new URL('../src/partials/catan-demo.html',import.meta.url),'utf8');
const access=await readFile(new URL('../src/partials/access-scene.html',import.meta.url),'utf8');
for(const page of ['es','catan-es','moduledroid-es','accesos-es','experiencia-es']) {
 const target=new URL(page+'.html',dist);
 await writeFile(target,(await readFile(target,'utf8')).replace('<!-- CATAN_DEMO -->',demo).replace('<!-- ACCESS_SCENE -->',access));
}
await writeFile(new URL('.nojekyll',dist),''); console.log('Build listo: dist/');
