const en=document.documentElement.lang==='en';
const text=(es,enText)=>en?enText:es;
const plugins={
 navigator:{title:text('Recibir el resultado de otra pantalla.','Receive a result from another screen.'),before:
`private val editor = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == RESULT_OK) {
        val name = result.data?.getStringExtra("name")
        if (name != null) showName(name)
    }
}

fun openEditor() {
    editor.launch(Intent(this, EditActivity::class.java))
}`,after:
`Navigate.toReturn(EditActivity::class).andThen {
    val name = Navigate.getResult<String>("name")
    if (name != null) showName(name)
}`,beforeCaption:text('Registrar el launcher, lanzar el Intent y extraer el resultado.','Register the launcher, launch the Intent and extract the result.'),afterCaption:text('Abrir la pantalla y definir qué hacer al volver.','Open the screen and define what happens on return.'),copy:text('El ejemplo muestra el lado que recibe el resultado; se omite la pantalla de edición en ambos casos. Navigator encapsula la mecánica de navegación y retorno en una llamada encadenada.','This example shows the caller; the editing screen is omitted in both versions. Navigator encapsulates navigation and result handling in a chained call.')},
 configurator:{title:text('Guardar y leer una preferencia.','Save and read a preference.'),before:
`val preferences = getSharedPreferences(
    "settings", Context.MODE_PRIVATE
)
preferences.edit()
    .putBoolean("notifications", true)
    .apply()

val enabled = preferences.getBoolean(
    "notifications", false
)`,after:
`Configurator.set("notifications", true)

val enabled = Configurator.get(
    "notifications", false
)`,beforeCaption:text('Acceder al almacén y gestionar su editor.','Access the preference store and manage its editor.'),afterCaption:text('Leer y escribir desde una fachada tipada.','Read and write through a typed facade.'),copy:text('Encapsula SharedPreferences y su editor. El plugin también permite suscribirse a cambios y generar una pantalla de configuración.','Encapsulates SharedPreferences and its editor. The plugin also supports change subscriptions and a generated settings screen.')},
 restorer:{title:text('Conservar un contador al rotar la pantalla.','Keep a counter when the screen rotates.'),before:
`var count = 0

override fun onCreate(state: Bundle?) {
    super.onCreate(state)
    count = state?.getInt("count") ?: 0
}

override fun onSaveInstanceState(out: Bundle) {
    out.putInt("count", count)
    super.onSaveInstanceState(out)
}`,after:
`@Restore
var count = 0`,beforeCaption:text('Guardar y recuperar el campo en los callbacks.','Save and retrieve the field in lifecycle callbacks.'),afterCaption:text('Declarar qué campo debe conservar su valor.','Declare which field should keep its value.'),copy:text('El plugin conecta el guardado y la restauración al ciclo de vida mediante anotaciones. Este ejemplo se limita a recreaciones como la rotación; no demuestra equivalencia con Bundle tras la muerte del proceso.','The plugin connects saving and restoration to the lifecycle through annotations. This example is limited to recreation such as rotation; it does not establish equivalence with Bundle after process death.')}
};
const tabs=[...document.querySelectorAll('[role="tab"][data-plugin]')];
const escapeHtml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function highlight(code){const pattern=/(\/\/[^\n]*|"[^"\n]*"|@\w+|\b(?:val|var|fun|override|true|false|super)\b|\b(?:Navigate|Configurator|String|Int|Bundle|Intent|Context)\b)/g;let last=0;let output='';for(const match of code.matchAll(pattern)){output+=escapeHtml(code.slice(last,match.index));const token=match[0];const kind=token.startsWith('//')?'comment':token.startsWith('"')?'string':token.startsWith('@')?'annotation':/^[A-Z]/.test(token)?'type':'keyword';output+='<span class="token-'+kind+'">'+escapeHtml(token)+'</span>';last=match.index+token.length}return output+escapeHtml(code.slice(last))}
function selectTab(tab){const key=tab.dataset.plugin;const p=plugins[key];document.querySelector('#plugin-select').value=key;tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});document.querySelector('.code-demo').dataset.plugin=key;document.querySelector('#plugin-panel').setAttribute('aria-labelledby',tab.id);document.querySelector('#plugin-title').textContent=p.title;document.querySelector('#before-label').textContent=text('Sin el plugin','Without the plugin');document.querySelector('#after-label').textContent=text('Con ','With ')+tab.textContent;document.querySelector('#code-before').textContent=p.before;document.querySelector('#code-after').innerHTML=highlight(p.after);document.querySelector('#before-caption').textContent=p.beforeCaption;document.querySelector('#after-caption').textContent=p.afterCaption;document.querySelector('#plugin-copy').textContent=p.copy;document.querySelector('#code-source').href='https://github.com/agp221-ua/'+tab.textContent}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next]);tabs[next].focus()}})});selectTab(tabs[0]);
document.querySelector('#plugin-select').addEventListener('change',e=>selectTab(tabs.find(t=>t.dataset.plugin===e.target.value)));
document.querySelectorAll('[data-code-view]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.code-demo').dataset.view=button.dataset.codeView;document.querySelectorAll('[data-code-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}));
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
document.querySelectorAll('[data-language]').forEach(a=>{const url=new URL(a.href);url.hash=location.hash;a.href=url.href;a.addEventListener('click',()=>{const target=new URL(a.href);target.hash=location.hash;a.href=target.href})});
document.querySelectorAll('[data-cv]').forEach(a=>{const file='CV_Alejandro_Galan_'+(en?'EN':'ES')+'.pdf';a.href='./assets/'+file;if(a.hasAttribute('download'))a.download=file});
document.querySelector('#current-year').textContent=new Date().getFullYear();
