import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';import {existsSync} from 'node:fs';
process.chdir(fileURLToPath(new URL('../',import.meta.url)));
function run(cmd,args,optional=false){const r=spawnSync(cmd,args,{encoding:'utf8',stdio:['inherit','pipe','pipe']});if(r.error||r.status!==0){if(optional)return null;console.error(r.error?.message||r.stderr||r.stdout);process.exit(1)}return r.stdout.trim()}
const mode=process.argv[2];if(!['setup','deploy'].includes(mode)){console.error('Usa npm run setup -- usuario/repositorio o npm run deploy');process.exit(1)}
if(!run('gh',['--version'],true)){console.error('Instala GitHub CLI: https://cli.github.com/ y ejecuta gh auth login. No se ha publicado nada.');process.exit(1)}run('gh',['auth','status']);
if(mode==='setup'){
 const repo=process.argv[3];if(!/^[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+$/.test(repo||'')){console.error('Indica usuario/repositorio: npm run setup -- tuusuario/portfolio');process.exit(1)}
 if(existsSync('.git')){console.error('Ya existe un repositorio local. Revisa el remote antes de configurarlo de nuevo.');process.exit(1)}
 run('git',['init','-b','main']);run('gh',['repo','create',repo,'--public','--source=.','--remote=origin']);
 console.log('Repositorio público creado. Aún sin despliegue. Ejecuta npm run deploy cuando hayas revisado la web.');process.exit(0)
}
if(!existsSync('.git')){console.error('Primero: npm run setup -- tuusuario/portfolio');process.exit(1)}
if(run('git',['branch','--show-current'])!=='main'){console.error('El despliegue requiere la rama main.');process.exit(1)}
const repo=JSON.parse(run('gh',['repo','view','--json','nameWithOwner'])).nameWithOwner;
run(process.execPath,['scripts/localize.mjs']);run(process.execPath,['scripts/check.mjs']);run(process.execPath,['scripts/build.mjs']);
run('git',['add','--','src','scripts','.github','package.json','.gitignore','justfile','README.md']);
if(run('git',['diff','--cached','--name-only']))run('git',['commit','-m','Update portfolio']);
run('git',['push','-u','origin','main']);
const pages=run('gh',['api','repos/'+repo+'/pages'],true);if(!pages)run('gh',['api','--method','POST','repos/'+repo+'/pages','-f','build_type=workflow']);else if(JSON.parse(pages).build_type!=='workflow')run('gh',['api','--method','PUT','repos/'+repo+'/pages','-f','build_type=workflow']);
run('gh',['workflow','run','pages.yml','--ref','main']);
console.log('Despliegue solicitado. Estado: https://github.com/'+repo+'/actions');console.log('Consulta la URL final en el job Deploy.');