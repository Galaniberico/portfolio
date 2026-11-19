import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const read = path => readFile(new URL('../'+path,import.meta.url),'utf8');
const pages=['index','es','catan','catan-es','moduledroid','moduledroid-es','accesos','accesos-es','experiencia','experiencia-es'];
for(const slug of pages) {
 const html=await read('dist/'+slug+'.html');
 assert(!/<!-- (CATAN_DEMO|ACCESS_SCENE) -->/.test(html),`Unexpanded component: ${slug}`);
 const nav=html.match(/<nav aria-label="(?:Navegación principal|Main navigation)"[\s\S]*?<\/nav>/)[0];
 const projects=['catan','accesos','moduledroid'];
 const projectLinks=[...nav.matchAll(/<a data-nav-section="(catan|accesos|moduledroid)"[^>]*>/g)];
 assert.deepEqual(projectLinks.map(match=>match[1]),projects,`Wrong project order in ${slug}`);
 const suffix=slug==='es'||slug.endsWith('-es')?'-es':'';
 for(const project of projects) {
  assert(nav.includes(`href="./${project}${suffix}.html"`),`Wrong project navigation in ${slug}`);
 }
 const page=slug.replace(/-es$/,'');
 const active=[...nav.matchAll(/data-nav-section="([^"]+)" aria-current="page"/g)].map(match=>match[1]);
 assert.deepEqual(active,[...projects,'experiencia'].includes(page)?[page]:[],`Wrong active page in ${slug}`);
 if(projects.includes(page)) {
  const next=projects[(projects.indexOf(page)+1)%projects.length];
  assert(html.includes(`class="next-project" href="./${next}${suffix}.html"`));
 }
 assert(!nav.includes('data-nav-section="proyectos"'));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`Duplicate ids in ${slug}`);
 for(const [,id] of html.matchAll(/url\(#([^)]+)\)/g)) assert(ids.includes(id),`Missing SVG reference ${id} in ${slug}`);
 for(const [,reference] of html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)) {
  await access(new URL('../dist/'+reference.split('#')[0],import.meta.url));
 }
}
for(const [home,detail] of [['index','catan'],['es','catan-es']]) {
 const board=html=>html.match(/<figure class="board-demo"[\s\S]*?<\/figure>/)[0];
 assert.equal(board(await read('dist/'+home+'.html')),board(await read('dist/'+detail+'.html')),'Board demos diverged');
}
for(const slug of ['moduledroid','moduledroid-es']) {
 const html=await read('dist/'+slug+'.html');
 assert(!html.includes('role="tablist"'),'Plugins still hidden behind tabs');
 assert.equal((html.match(/class="code-pane code-before"/g)||[]).length,3);
 assert.equal((html.match(/class="code-pane code-after"/g)||[]).length,3);
 assert.equal((html.match(/<pre>/g)||[]).length,6,'All six examples should be readable without JS');
}

// Exercise one-shot animation and verify scrolling past the project previews.
const code=await read('src/interactions.js');
function runPage(filename,{reduced=false,home=false}={}) {
 const events={},windowEvents={},replayEvents={},mediaEvents={};
 const links=['experiencia','catan','accesos','moduledroid','contacto'].map(id=>({dataset:{navSection:id},attrs:{},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}}));
 const classes=new Set();
 const scene={classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)},querySelector:()=>({addEventListener:(e,f)=>replayEvents[e]=f})};
 const sections=links.map((l,i)=>({id:l.dataset.navSection,getBoundingClientRect:()=>({top:i*500+400-context.window.scrollY,bottom:i*500+850-context.window.scrollY})}));
 const root={style:{setProperty(){}},scrollHeight:4000,addEventListener(){}};
 const doc={documentElement:root,hidden:false,body:{prepend(){}},createElement:()=>({setAttribute(){},style:{},classList:{add(){},remove(){}}}),
  getElementById:id=>home?sections.find(s=>s.id===id):null,
  querySelector:selector=>selector==='.profile'?(home?{}:null):selector==='.header-shell'?{getBoundingClientRect:()=>({bottom:80}),offsetHeight:80}:selector==='.main-nav .nav-contact'?links.at(-1):null,
  querySelectorAll:selector=>selector==='[data-nav-section]'?links:selector==='[data-access-scene]'?[scene]:[],
  addEventListener:(e,f)=>events[e]=f};
 let observerCallback,unobserved=0;
 const context={document:doc,location:{pathname:'/'+filename+'.html'},window:{innerHeight:900,scrollY:0,addEventListener:(e,f)=>(windowEvents[e]??=[]).push(f)},matchMedia:query=>({matches:query.includes('reduced')?reduced:true,addEventListener:(e,f)=>mediaEvents[e]=f}),
  requestAnimationFrame:f=>{frames.push(f);return frames.length;},cancelAnimationFrame(){},IntersectionObserver:function(callback){observerCallback=callback;this.observe=()=>{};this.unobserve=()=>unobserved++;}};
 const frames=[];
 const flush=()=>{while(frames.length)frames.shift()();};
 context.window.IntersectionObserver=context.IntersectionObserver;
 vm.runInNewContext(code,context);
 const scrollTo=y=>{context.window.scrollY=y;windowEvents.scroll.forEach(handler=>handler());flush();};
 return {links,scene,classes,replayEvents,observerCallback,get unobserved(){return unobserved;},scrollTo,flush};
}
for(const slug of ['es','index']) {
 const home=runPage(slug,{home:true});
 for(const y of [0,400,900,1400,1900,2300,3100]) {
  home.scrollTo(y);
  assert(home.links.slice(0,4).every(link=>!link.attrs['aria-current']),`Preview highlighted a page link at ${y}`);
 }
 assert.equal(home.links.at(-1).attrs['aria-current'],'location','Contact still marks the current section');
}
const motion=runPage('index');
motion.observerCallback([{target:motion.scene,isIntersecting:false}]);
assert.deepEqual([...motion.classes],['approach-ready'],'Hold the scene in its initial state before it is visible');
motion.observerCallback([{target:motion.scene,isIntersecting:true}]);
motion.flush();
assert.deepEqual([...motion.classes],['approach-playing']);
assert.equal(motion.unobserved,1,'Stop observing after first entry');
motion.replayEvents.click();
assert.deepEqual([...motion.classes],['approach-ready'],'Reset to the initial state on replay');
motion.flush();
assert(motion.classes.has('approach-playing'));
const still=runPage('index',{reduced:true});
still.observerCallback([{target:still.scene,isIntersecting:true}]);
still.replayEvents.click();
still.flush();
assert.equal(still.classes.size,0,'Reduced motion should keep the final still image');
console.log('Release checked: ten pages, direct project navigation, shared Catán demo, six visible code samples, SVG assets, active pages and reduced-motion animation behavior.');
