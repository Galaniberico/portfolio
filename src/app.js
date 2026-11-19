const en=document.documentElement.lang==='en';
const text=(es,enText)=>en?enText:es;
if (document.querySelector('.architecture')) {
const phases=[
 {nodes:['mobile'],edges:[],title:text('Autenticación en el móvil','Authenticate on the phone'),copy:text('El usuario se autentica localmente antes de utilizar la credencial.','The user authenticates locally before using the credential.')},
 {nodes:['mobile','reader'],edges:['ble'],title:text('La credencial llega al lector','The credential reaches the reader'),copy:text('La app envía la credencial mediante BLE. Android también incorpora NFC/HCE.','The app transmits the credential over BLE. Android also includes NFC/HCE.')},
 {nodes:['reader','controller'],edges:['reader'],title:text('El lector transmite la solicitud','The reader forwards the request'),copy:text('El lector comunica la credencial a la controladora que gestiona el acceso.','The reader passes the credential to the controller responsible for the access point.')},
 {nodes:['controller'],edges:[],title:text('Decisión con la caché local','Check permissions in the local cache'),copy:text('La controladora consulta las credenciales y permisos disponibles en su caché.','The controller checks credentials and permissions available in its local cache.')},
 {nodes:['controller','door'],edges:['door'],title:text('Un permiso se convierte en apertura','Permission becomes a physical action'),copy:text('Si el acceso está autorizado, el sistema activa el relé de la puerta.','If access is authorised, the system activates the door relay.')},
 {nodes:['controller','server','db'],edges:['sync','db'],title:text('Registro y gestión centralizados','Centralise records and management'),copy:text('Por separado, los registros se envían al servidor y los permisos se gestionan desde la web. La flecha descendente representa la sincronización de permisos.','Separately, records are sent to the server and permissions are managed through the web panel. The downward arrow represents permission synchronisation.')}
];
let step=0,timer=null;const play=document.querySelector('#access-demo');
function drawStep(){const p=phases[step];document.querySelectorAll('[data-system-node]').forEach(n=>n.classList.toggle('active',p.nodes.includes(n.dataset.systemNode)));document.querySelectorAll('[data-system-edge]').forEach(n=>n.classList.toggle('active',p.edges.includes(n.dataset.systemEdge)));if(step===5)document.querySelector('.mobile-backend').open=true;document.querySelectorAll('.diagram-node').forEach(n=>n.classList.toggle('active',p.nodes.includes(n.id.replace('node-',''))));document.querySelectorAll('.diagram-edges>path').forEach(e=>e.classList.toggle('active',p.edges.includes(e.id.replace('edge-',''))));document.querySelector('#step-count').textContent=String(step+1).padStart(2,'0')+' / 06';document.querySelector('#step-title').textContent=p.title;document.querySelector('#step-copy').textContent=p.copy;document.querySelector('#step-prev').disabled=step===0;document.querySelector('#step-next').disabled=step===phases.length-1}
function stop(){clearInterval(timer);timer=null;play.textContent=step===phases.length-1?text('Repetir recorrido','Replay flow'):text('Reproducir recorrido','Play flow');play.setAttribute('aria-pressed','false')}
play.addEventListener('click',()=>{if(timer){stop();return}if(step===phases.length-1)step=0;drawStep();play.textContent=text('Pausar recorrido','Pause flow');play.setAttribute('aria-pressed','true');timer=setInterval(()=>{if(step<phases.length-1){step++;drawStep()}if(step===phases.length-1)stop()},1800)});
document.querySelector('#step-prev').addEventListener('click',()=>{stop();step=Math.max(0,step-1);drawStep()});document.querySelector('#step-next').addEventListener('click',()=>{stop();step=Math.min(phases.length-1,step+1);drawStep()});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});drawStep();
}
document.querySelectorAll('[data-language]').forEach(a=>{const url=new URL(a.href);url.hash=location.hash;a.href=url.href;a.addEventListener('click',()=>{const target=new URL(a.href);target.hash=location.hash;a.href=target.href})});
document.querySelectorAll('[data-cv]').forEach(a=>{const file='CV_Alejandro_Galan_'+(en?'EN':'ES')+'.pdf';a.href='./assets/'+file;if(a.hasAttribute('download'))a.download=file});
document.querySelector('#current-year').textContent=new Date().getFullYear();

const heroName = document.querySelector('.profile-name');
if (heroName) {
  const header = document.querySelector('.header-shell');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let animationFrame = 0;

  function updateName() {
    animationFrame = 0;
    const name = heroName.getBoundingClientRect();
    const distance = name.top + name.height * 0.5 - header.offsetHeight;
    const progress = 1 - Math.min(1, Math.max(0, distance / (name.height * 0.87)));
    header.classList.toggle('name-in-header', progress >= 0.62);
    if (reducedMotion.matches) {
      heroName.style.removeProperty('--name-scale');
      heroName.style.removeProperty('--name-opacity');
      return;
    }
    heroName.style.setProperty('--name-scale', String(1 - progress * 0.57));
    heroName.style.setProperty('--name-opacity', String(1 - progress));
  }

  function queueNameUpdate() {
    if (!animationFrame) animationFrame = requestAnimationFrame(updateName);
  }

  updateName();
  window.addEventListener('scroll', queueNameUpdate, { passive: true });
  window.addEventListener('resize', queueNameUpdate);
  window.addEventListener('pageshow', queueNameUpdate);
  reducedMotion.addEventListener('change', queueNameUpdate);
}

function drawExpandedExample(container) {
  // Coordinates are tile centres in the 540 × 1090 expansion screenshot.
  const columns = [
    { x: 117, firstY: 425, tiles: ['wheat', 'wood', 'clay', 'sheep'] },
    { x: 178, firstY: 389, tiles: ['stone', 'sheep', 'wheat', 'wood', 'clay'] },
    { x: 239, firstY: 354, tiles: ['wheat', 'wood', 'clay', 'sheep', 'stone', 'wheat'] },
    { x: 300, firstY: 389, tiles: ['clay', 'sheep', 'stone', 'wheat', 'desert', 'wood'] },
    { x: 361, firstY: 425, tiles: ['wood', 'wheat', 'sheep', 'stone', 'desert'] },
    { x: 422, firstY: 461, tiles: ['clay', 'wood', 'sheep', 'stone'] }
  ];
  const numbers = [
    'six', 'ten', 'three', 'eight', 'five', 'eleven', 'two', 'nine', 'four', 'twelve',
    'eight', 'four', 'eleven', 'six', 'nine', 'three', 'ten', 'five', 'twelve', 'two',
    'four', 'eight', 'eleven', 'five', 'nine', 'six', 'ten', 'three'
  ];
  const assets = './assets/catan-tiles/';
  let numberIndex = 0;
  for (const { x, firstY, tiles } of columns) {
    tiles.forEach((terrain, row) => {
      if (terrain === 'desert') return;
      const tile = document.createElement('span');
      tile.className = 'extended-tile';
      tile.style.left = `${x / 540 * 100}%`;
      tile.style.top = `${(firstY + row * 71.3) / 1090 * 100}%`;
      const artwork = new Image(400, 346);
      artwork.alt = '';
      artwork.src = assets + terrain + '.png';
      const number = new Image(400, 346);
      number.alt = '';
      number.className = 'tile-number';
      number.src = assets + numbers[numberIndex++] + '.png';
      tile.append(artwork, number);
      container.append(tile);
    });
  }
}

for (const demo of document.querySelectorAll('[data-board-demo]')) {
  const phone = demo.querySelector('.board-phone');
  const image = demo.querySelector('[data-board-image]');
  const expandedTiles = demo.querySelector('.extended-tiles');
  const status = demo.querySelector('[data-board-status]');
  const rules = demo.querySelector('.board-rules');
  const buttons = Object.fromEntries(
    [...demo.querySelectorAll('[data-board-action]')].map(button => [button.dataset.boardAction, button])
  );
  const boards = {
    empty: ['base', text('Tablero base sin terrenos', 'Empty base board')],
    terrain: ['terrenos', text('Terrenos listos para revelar los números', 'Terrain ready for the numbers')],
    numbered: ['tablero-oscuro', text('Tablero base con los números revelados', 'Base board with the numbers revealed')]
  };
  const expandedLabels = {
    empty: text('Tablero ampliado sin terrenos', 'Empty expanded board'),
    terrain: text('Tablero ampliado con terrenos', 'Expanded board with terrain'),
    numbered: text('Tablero ampliado con los números revelados', 'Expanded board with the numbers revealed')
  };
  let expanded = false;
  let phase = 'numbered';

  function showBoard(next) {
    phase = next;
    const [asset, label] = expanded ? ['ampliado', expandedLabels[phase]] : boards[phase];
    phone.dataset.size = expanded ? 'expanded' : 'base';
    phone.dataset.phase = phase;
    image.src = './assets/catan-' + asset + '.png';
    image.alt = label;
    status.textContent = label;
    expandedTiles.hidden = !expanded || phase === 'empty';
    if (!expandedTiles.hidden && !expandedTiles.childElementCount) drawExpandedExample(expandedTiles);
    buttons.size.setAttribute('aria-pressed', String(expanded));
    buttons.size.firstElementChild.src = expanded ? './assets/catan-group.svg' : './assets/catan-single.svg';
    buttons.size.title = expanded ?
      text('Cambiar a tablero base', 'Switch to base board') :
      text('Cambiar a tablero ampliado', 'Switch to expanded board');
    buttons.size.setAttribute('aria-label', buttons.size.title);
    buttons.generate.title = phase === 'terrain' ?
      text('Reiniciar tablero', 'Reset board') : text('Generar terrenos', 'Generate terrain');
    buttons.generate.setAttribute('aria-label', buttons.generate.title);
    buttons.generate.firstElementChild.textContent = phase === 'terrain' ? '↶' : '⟳';
    buttons.numbers.hidden = phase !== 'terrain';
  }

  function showRules(open) {
    rules.hidden = !open;
    buttons.settings.setAttribute('aria-expanded', String(open));
    (open ? buttons.close : buttons.settings).focus();
  }

  for (const button of [buttons.theme, buttons.settings, buttons.close]) {
    button.title = button.getAttribute('aria-label');
  }
  showBoard('numbered');

  buttons.theme.addEventListener('click', () => {
    const light = phone.classList.toggle('theme-light');
    buttons.theme.setAttribute('aria-pressed', String(light));
    buttons.theme.firstElementChild.textContent = light ? '☾' : '☀';
  });
  buttons.size.addEventListener('click', () => {
    expanded = !expanded;
    showBoard('empty');
  });
  buttons.generate.addEventListener('click', () => showBoard(phase === 'terrain' ? 'empty' : 'terrain'));
  buttons.numbers.addEventListener('click', () => {
    showBoard('numbered');
    buttons.generate.focus();
  });
  buttons.settings.addEventListener('click', () => showRules(rules.hidden));
  buttons.close.addEventListener('click', () => showRules(false));
  demo.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !rules.hidden) showRules(false);
  });
}
