import {readFile,writeFile} from 'node:fs/promises';
const translations={
  "El móvil se acerca al lector y la puerta se abre": "The phone approaches the reader and the door opens",
  "¡Hola! Te enseño lo que hago.": "Hi! Let me show you what I’ve been building.",
  "Preparar una partida de Catán, abrir una puerta con el móvil o quitar tareas repetitivas del trabajo. Son cosas distintas, pero todas me han dado una excusa para crear software que haga algo un poco más fácil.": "Setting up a game of Catan, unlocking a door with a phone or cutting out repetitive tasks at work. Different things, but each gave me a reason to build software that makes something a little easier.",
  "Lo mío es el desarrollo móvil, aunque ahora también creo herramientas internas en Embention. Por aquí puedes probar algunas demos y ver qué hay detrás de cada proyecto.": "Mobile development is my thing, and these days I also build internal tools at Embention. Have a look around, try a few demos and see how each project came together.",
  "Estudié Informática y el Máster en Desarrollo de Software para Dispositivos Móviles en la Universidad de Alicante, donde recibí el premio extraordinario del máster.": "I studied Computer Engineering and Mobile Software Development at the University of Alicante, where I received the Extraordinary Master’s Degree Award.",
  "Saltar al contenido": "Skip to content",
  "Proyectos": "Projects",
  "Sobre mí": "About",
  "Hablemos": "Let’s talk",
  "Ideas claras.": "Clear ideas.",
  "Software que": "Software that",
  "lo hace fácil.": "makes it easy.",
  "Soy Alejandro Galán, ingeniero de software.": "I’m Alejandro Galán, a software engineer.",
  "Desarrollo aplicaciones móviles y herramientas que simplifican el trabajo de quienes las usan.": "I build mobile apps and tools that make everyday work simpler.",
  "Explorar proyectos": "Explore projects",
  "Ver CV ↗": "View CV ↗",
  "Menos fricción. Más intención. ↙": "Less friction. More purpose. ↙",
  "TRABAJO SELECCIONADO": "SELECTED WORK",
  "Dos proyectos, de la idea a la implementación.": "Two projects, from idea to implementation.",
  "Menos código repetitivo.": "Less boilerplate.",
  "Más espacio para tu app.": "More room for your app.",
  "Una librería modular en Kotlin que reúne tareas habituales de Android detrás de una interfaz más sencilla. Navegar, configurar y conservar el estado sin repetir la misma infraestructura en cada aplicación.": "A modular Kotlin library that brings common Android tasks behind a simpler interface. Navigate, manage preferences and preserve state without rebuilding the same infrastructure in every app.",
  "MISMA TAREA. MENOS INFRAESTRUCTURA.": "SAME TASK. LESS INFRASTRUCTURE.",
  "Pasar datos a otra pantalla.": "Pass data to another screen.",
  "Sin el plugin": "Without the plugin",
  "Con Navigator": "With Navigator",
  "Fragmentos de uso simplificados. Se omiten imports, clase Activity e inicialización del framework.": "Simplified usage snippets. Imports, the Activity class and framework initialisation are omitted.",
  "Ver API del plugin ↗": "View the plugin API ↗",
  "EL RETO": "THE CHALLENGE",
  "Lo habitual no debería": "Routine work shouldn’t",
  "escribirse desde cero.": "start from scratch.",
  "Navegación, preferencias y recreación de Activities suelen traer código auxiliar repartido por la app. El objetivo: encapsularlo y facilitar su reutilización.": "Navigation, preferences and Activity recreation often scatter supporting code throughout an app. The goal: encapsulate it and make it reusable.",
  "MI APORTACIÓN": "MY CONTRIBUTION",
  "Diseñar la base.": "Design the foundation.",
  "Construir las piezas.": "Build the pieces.",
  "Diseñé e implementé el microkernel, sus fachadas y los tres plugins, con gestión del ciclo de vida y una aplicación de ejemplo para comparar el desarrollo.": "I designed and implemented the microkernel, its facades and all three plugins, including lifecycle management and a sample app to compare the development approaches.",
  "EN LA PRUEBA DE CONCEPTO": "IN THE PROOF OF CONCEPT",
  "−81,7": "−81.7",
  "Caracteres de código en la pantalla de configuración: de 3.026 a 555, excluyendo XML.": "Code characters in the settings screen: from 3,026 to 555, excluding XML.",
  "Cómo se midió": "How it was measured",
  "Comparación de una agenda de cumpleaños implementada por mí con Android convencional y con ModuleDroid. Es un único caso, con efecto posible del aprendizaje entre versiones; no mide líneas, rendimiento ni una mejora general de productividad.": "A birthday planner I implemented with conventional Android and with ModuleDroid. This is a single case, potentially affected by learning between versions. It does not measure lines of code, runtime performance or a general productivity gain.",
  "Explorar en GitHub ↗": "Explore on GitHub ↗",
  "Un poco más de ingeniería": "More engineering detail",
  "Arquitectura extensible.": "Extensible architecture.",
  "Núcleo, fachadas y bus de datos para separar responsabilidades e incorporar plugins. Inicialización mediante metadatos del manifiesto.": "A core, facades and a data bus separate responsibilities and support plugins. Initialisation uses manifest metadata.",
  "Integración con Android.": "Android integration.",
  "Application y ActivityLifecycleCallbacks para conectar los plugins al ciclo de vida de la app.": "Application and ActivityLifecycleCallbacks connect plugins to the app lifecycle.",
  "Validación.": "Validation.",
  "Más de cien pruebas instrumentadas declaradas en la documentación del proyecto. Distribución planteada con JitPack.": "Over one hundred instrumented tests reported in the project documentation. Distribution designed around JitPack.",
  "Tu móvil.": "Your phone.",
  "Tu acceso.": "Your access.",
  "Software que conecta": "Connecting software",
  "la pantalla con el mundo físico.": "to the physical world.",
  "Dos aplicaciones nativas, Android e iOS, dentro de un sistema de control de accesos. Desde la autenticación en el teléfono hasta la comunicación con lectores físicos y la gestión desde el servidor.": "Two native apps, Android and iOS, within a physical access control system. From local authentication on the phone to communication with physical readers and server-side management.",
  "ARQUITECTURA DEL SISTEMA": "SYSTEM ARCHITECTURE",
  "Una credencial. Todo el recorrido.": "One credential. The whole journey.",
  "La controladora valida el acceso con la caché local. El servidor centraliza la gestión y los registros.": "The controller checks access against its local cache. The server centralises management and records.",
  "Ver el recorrido": "Play the flow",
  "Del móvil a la puerta": "From phone to door",
  "El móvil envía una credencial al lector. El lector la transmite a la controladora, que consulta su caché y ordena la apertura. El servidor recibe registros y gestiona permisos desde la web con una base de datos.": "The phone sends a credential to the reader. The reader forwards it to the controller, which checks its cache and triggers opening. The server receives records and manages permissions through a web panel and database.",
  "gestión": "management",
  "datos": "data",
  "credencial": "credential",
  "apertura": "open door",
  "registros ↑": "records ↑",
  "↓ permisos": "↓ permissions",
  "Panel web": "Web panel",
  "Usuarios y permisos": "Users and permissions",
  "Servidor": "Server",
  "Laravel · API REST": "Laravel · REST API",
  "Base de datos": "Database",
  "App móvil": "Mobile app",
  "Lector": "Reader",
  "Recibe la credencial": "Receives the credential",
  "Controladora": "Controller",
  "Caché local · permisos": "Local cache · permissions",
  "Puerta": "Door",
  "Activación del relé": "Relay activation",
  "* BLE en Android e iOS · NFC/HCE en Android": "* BLE on Android and iOS · NFC/HCE on Android",
  "Esquema funcional simplificado. Código del lector y comunicación controladora–lector: aportación de otros miembros del equipo.": "Simplified diagram. Reader code and controller–reader communication: contribution by other team members.",
  "Autenticación en el móvil": "Authenticate on the phone",
  "El usuario se autentica localmente antes de utilizar la credencial.": "The user authenticates locally before using the credential.",
  "Recorrido ilustrativo de un acceso autorizado; no representa una conexión a hardware ni tiempos reales. La sincronización con el servidor se muestra aparte de la apertura.": "Illustrative flow for an authorised access request; no live hardware connection or real timings. Server synchronisation is shown separately from door opening.",
  "DOS PLATAFORMAS NATIVAS": "TWO NATIVE PLATFORMS",
  "Android e iOS,": "Android and iOS,",
  "cada una en su lenguaje.": "each in its own language.",
  "Kotlin y Jetpack Compose en Android. Swift y SwiftUI en iOS. Arquitectura MVVM y autenticación local en ambas; BLE en las dos y NFC/HCE en Android.": "Kotlin and Jetpack Compose on Android. Swift and SwiftUI on iOS. MVVM architecture and local authentication on both; BLE on both, and NFC/HCE on Android.",
  "De la experiencia móvil": "From the mobile experience",
  "al backend y la web.": "to the backend and web.",
  "Implementé las apps, el backend, la web y el resto del software, salvo el código del lector y la comunicación controladora–lector, realizados por otros miembros del equipo.": "I implemented the apps, backend, web interface and remaining software, except the reader code and controller–reader communication, which other team members developed.",
  "VALIDACIÓN DEL SISTEMA": "SYSTEM VALIDATION",
  "Usuarios activos en la validación del sistema, con lectores físicos.": "Active users during system validation with physical readers.",
  "Proyecto desarrollado en la Universidad de Alicante, vinculado a las prácticas y al trabajo de fin de máster.": "Developed at the University of Alicante as part of my internship and master’s thesis.",
  "Código no público · Confidencialidad": "Code not public · Confidentiality",
  "Decisiones técnicas y alcance": "Technical decisions and scope",
  "Credenciales en el dispositivo.": "Credentials on the device.",
  "Protección local con claves gestionadas por Android Keystore y, en iOS, cifrado AES con clave en Keychain.": "Local protection with keys managed by Android Keystore and, on iOS, AES encryption with a key stored in Keychain.",
  "Interacción con hardware.": "Hardware interaction.",
  "Escaneo BLE filtrado por UUID, conexión, envío de credenciales y tratamiento de errores y tiempos de espera.": "UUID-filtered BLE scanning, connection, credential transmission, error handling and timeouts.",
  "Alcance documentado.": "Documented scope.",
  "NFC/HCE implementado en Android. La integración con el servicio externo de autenticación y la supervisión web en tiempo real no estaban completadas en la versión documentada.": "NFC/HCE implemented on Android. Integration with the external authentication service and real-time web monitoring were not completed in the documented version.",
  "UN POCO SOBRE MÍ": "A LITTLE ABOUT ME",
  "Me interesa cómo funciona.": "How it works matters.",
  "Y cómo se usa.": "So does how it feels.",
  "Mi foco está en el desarrollo móvil, con experiencia también en backend, automatización y herramientas para otros ingenieros.": "My focus is mobile development, with experience in backend systems, automation and tools for other engineers.",
  "En Embention desarrollo herramientas internas para simplificar flujos de ingeniería. Antes trabajé en aplicaciones móviles y sistemas conectados en la Universidad de Alicante, y en software C++ para sensores y alarmas en SEDNI.": "At Embention, I develop internal tools that simplify engineering workflows. Previously, I worked on mobile apps and connected systems at the University of Alicante, and C++ software for sensors and alarms at SEDNI.",
  "Me gusta entender el problema, ordenar las piezas y construir una solución que resulte cómoda tanto para quien la usa como para quien la mantiene.": "I like understanding the problem, organising the pieces and building something that is straightforward to use and maintain.",
  "FORMACIÓN": "EDUCATION",
  "Máster en Desarrollo de Software para Dispositivos Móviles": "MSc in Mobile Software Development",
  "Universidad de Alicante · Premio extraordinario": "University of Alicante · Extraordinary Master’s Degree Award",
  "Grado en Ingeniería Informática": "Bachelor’s Degree in Computer Engineering",
  "Universidad de Alicante": "University of Alicante",
  "CV en español ↗": "CV in Spanish ↗",
  "CV in English ↗": "CV in English ↗",
  "SIGUIENTE CONVERSACIÓN": "THE NEXT CONVERSATION",
  "¿Lo construimos?": "Let’s build it.",
  "Si buscas a alguien para desarrollar aplicaciones": "Looking for someone to build applications",
  "y hacer más sencillo lo complejo, hablemos.": "and make complex things simpler? Let’s talk.",
  "Volver arriba ↑": "Back to top ↑",
  "Alejandro Galán, inicio": "Alejandro Galán, home",
  "Navegación principal": "Main navigation",
  "Idioma": "Language",
  "Plugins de ModuleDroid": "ModuleDroid plugins",
  "Código sin plugin": "Code without the plugin",
  "Código con plugin": "Code with the plugin",
  "Diagrama de la arquitectura del sistema": "System architecture diagram",
  "Paso anterior": "Previous step",
  "Paso siguiente": "Next step",
  "Alejandro Galán Pérez. Ingeniero de software: aplicaciones móviles, herramientas para desarrolladores y sistemas conectados.": "Alejandro Galán Pérez. Software engineer building mobile apps, developer tools and connected systems."
};
Object.assign(translations,{"Conóceme":"About me","Ver CV":"View CV","Descargar CV":"Download CV","Seleccionar plugin":"Choose a plugin","Comparar código":"Compare code","Sin plugin":"Without plugin","Con plugin":"With plugin","Arquitectura del acceso en vista móvil":"Mobile view of the access architecture","Credencial por BLE / NFC en Android":"Credential over BLE / NFC on Android","Solicitud de acceso":"Access request","Orden de apertura":"Opening command","Servidor, base de datos y web":"Server, database and web panel","La controladora sincroniza registros y permisos con el servidor, por separado del recorrido de apertura.":"The controller synchronises records and permissions with the server, separately from the opening flow.","BLE en ambas plataformas; NFC/HCE en Android. Código del lector y comunicación controladora–lector: aportación de otros miembros del equipo.":"BLE on both platforms; NFC/HCE on Android. Reader code and controller–reader communication: contribution by other team members.","Anterior":"Previous","Siguiente":"Next","▥":"▥"});
const identity=new Set(["Alejandro Galán — Software & Mobile","ag","↗","Alejandro Galán","EN","ES","SOFTWARE ENGINEER · MOBILE & TOOLS","PORTFOLIO / 01","↓","_","think.","build.","simplify.","Kotlin & Android","Swift & iOS","Backend","Developer tools","01 / DEVELOPER TOOLS","2024","ModuleDroid","Navigator","Configurator","Restorer","Kotlin / Android","ModuleDroid ↗","↳","%","Kotlin","Android SDK","Microkernel","JUnit4 · Espresso","+","02 / MOBILE & CONNECTED SYSTEMS","2025","→","BLE / NFC*","⌘","{ }","≡","MySQL","▯","Android / iOS",")))","⊞","01 / 06","←","100","Compose","SwiftUI","BLE · NFC","Laravel","alexgalanp@gmail.com","Alejandro Galán Pérez ·","2026","GitHub ↗","LinkedIn ↗"]);
Object.assign(translations, {
  "Contacto": "Contact",
  "Ingeniero de software · Desarrollo móvil": "Software engineer · Mobile development",
  "Desarrollo aplicaciones móviles y, en Embention, herramientas internas que simplifican el trabajo de otros ingenieros. Me gusta cuidar cómo se usa el software y cómo se mantiene.": "I build mobile apps and develop internal tools at Embention to make other engineers’ work easier. I care about how software feels to use and how easy it is to maintain.",
  "Me formé en la Universidad de Alicante, donde cursé el Grado en Ingeniería Informática y el Máster en Desarrollo de Software para Dispositivos Móviles, con premio extraordinario en el máster.": "I studied at the University of Alicante, where I earned a degree in Computer Engineering and a master’s in Mobile Software Development, receiving the programme’s Extraordinary Master’s Degree Award.",
  "Aplicación Android · Kotlin": "Android app · Kotlin",
  "Generador de mapas de Catán": "Catan Map Generator",
  "Una app para preparar el tablero antes de jugar. Elige el tamaño, ajusta las reglas y genera una distribución de terrenos y números.": "An app for setting up the board before a game. Pick a board size, adjust the rules and generate a layout of terrain and number tokens.",
  "Vistas de la app": "App screens",
  "Tablero": "Board",
  "Ajustes": "Settings",
  "Tema claro": "Light theme",
  "Cómo está hecha": "How I built it",
  "Dibujé el tablero hexagonal con Canvas y creé un generador que busca distribuciones según las reglas elegidas. La app reutiliza dos plugins de ModuleDroid para los ajustes y la restauración del tablero.": "I drew the hexagonal board with Canvas and built a generator that searches for layouts that match the selected rules. The app reuses two ModuleDroid plugins for settings and board restoration.",
  "Tablero generado con terrenos y fichas numéricas en el tema oscuro": "Generated board with terrain and number tokens in dark mode",
  "Tablero base con los números revelados.": "Base board with the numbers revealed.",
  "Panel con las opciones que controlan la generación del tablero": "Settings panel with options for board generation",
  "Reglas de generación en el panel inferior.": "Generation rules in the bottom sheet.",
  "Tablero antes de generar los terrenos, en el tema claro": "Board before generating terrain, in light mode",
  "Tablero antes de la generación, en modo claro.": "Board before generation, in light mode.",
  "Librería Android · Kotlin": "Android library · Kotlin",
  "Control de accesos": "Mobile access control",
  "Android e iOS": "Android and iOS",
  "El reto": "The challenge",
  "Mi aportación": "My contribution",
  "En la prueba de concepto": "In the proof of concept",
  "Dos plataformas nativas": "Two native platforms",
  "Validación del sistema": "System validation",
  "Explorar en GitHub": "View on GitHub",
  "Ver API del plugin": "View plugin API",
  "Volver arriba": "Back to top"
});
["Alejandro","Galán Pérez","GitHub","LinkedIn"].forEach(key => identity.add(key));
Object.assign(translations, {
  "Inicio": "Home",
  "Tema claro del portafolio": "Portfolio light theme",
  "Experiencia": "Experience",
  "Ingeniero de software · Herramientas internas": "Internal Tools Software Engineer",
  "Desarrollo herramientas en Python para preparar datos y automatizar tareas de ingeniería. También creo extensiones de VS Code para consultar y revisar información.": "I build Python tools to prepare data and automate engineering tasks. I also develop VS Code extensions for finding and reviewing information.",
  "Abr. 2026 – actualidad": "Apr 2026 – Present",
  "Ingeniero de requisitos": "Requirements Engineer",
  "Ago. 2025 – mar. 2026": "Aug 2025 – Mar 2026",
  "Definí y mantuve requisitos de software para autopilotos de drones. Trabajé con desarrollo y QA para que los requisitos fueran trazables y verificables.": "I defined and maintained software requirements for drone autopilots. I worked with development and QA to make sure requirements were traceable and could be verified.",
  "Prácticas de ingeniería de I+D": "R&D engineering internship",
  "Desarrollé las apps Android e iOS y el backend de un sistema que permite abrir puertas con el móvil.": "I developed the Android and iOS apps and backend for a system that lets people unlock doors with their phones.",
  "Nov. 2024 – jul. 2025": "Nov 2024 – Jul 2025",
  "Prácticas de desarrollo de software": "Software development internship",
  "Desarrollé software en C++ para monitorizar sensores y alarmas. Automaticé las pruebas de detección de señales y activación de alarmas.": "I developed C++ software for monitoring sensors and alarms. I automated tests for signal detection and alarm activation.",
  "Oct. 2022 – jul. 2023": "Oct 2022 – Jul 2023",
  "Ver proyecto": "View project",
  "Todos los proyectos": "All projects",
  "Una app para preparar tu próxima partida de Catán. Elige el tamaño del tablero, ajusta las reglas y descubre los números cuando los terrenos estén colocados.": "An app for setting up your next game of Catan. Pick a board size, adjust the rules and reveal the numbers once the tiles are in place.",
  "Cambiar tema": "Switch theme",
  "Cambiar a tablero ampliado": "Switch to expanded board",
  "Generar terrenos": "Generate terrain",
  "Mostrar números": "Show numbers",
  "Ver reglas de generación": "Show generation rules",
  "Cerrar reglas": "Close rules",
  "Reglas de generación": "Generation rules",
  "Ajustes de la app": "App settings",
  "Terrenos": "Terrain rules",
  "Separar terrenos iguales": "Keep matching terrain tiles apart",
  "Evita que dos terrenos del mismo tipo queden juntos, por ejemplo, dos bosques.": "Keep tiles of the same type apart, such as two forests.",
  "Separar terrenos y puertos del mismo recurso": "Keep terrain away from matching ports",
  "Evita, por ejemplo, que un bosque toque un puerto de madera.": "For example, keep a forest from bordering a wood port.",
  "Fichas numéricas": "Number rules",
  "Separar fichas con la misma probabilidad": "Keep numbers with equal odds apart",
  "Evita que dos terrenos vecinos tengan números con la misma probabilidad de salir en los dados.": "Keep neighbouring tiles from getting numbers with the same odds on the dice.",
  "Evitar el 2 y el 12 en piedra y arcilla": "Keep 2 and 12 off ore and clay tiles",
  "Excluye los números menos probables de las casillas de piedra y arcilla.": "Exclude the least likely numbers from ore and clay tiles.",
  "No repetir probabilidades dentro de un recurso": "Avoid repeated odds within a resource",
  "Evita, por ejemplo, que dos bosques tengan la misma probabilidad de producir.": "For example, keep two forests from having the same chance of producing wood.",
  "Equilibrar las probabilidades entre recursos": "Balance the odds across resources",
  "Busca que la probabilidad media de producir sea parecida para madera, trigo, ovejas, piedra y arcilla.": "Aim for similar average production odds across wood, wheat, sheep, ore and clay.",
  "Tablero base con los números revelados": "Base board with the numbers revealed",
  "Demo visual con tableros de ejemplo.": "Visual demo with sample boards.",
  "Una librería que resuelve tareas comunes de Android, como cambiar de pantalla o guardar preferencias, para que cada app tenga que escribir menos código.": "An Android library that handles common tasks, like moving between screens and saving preferences, so each app needs less code of its own.",
  "Reducción de caracteres de código de 3.026 a 555 en una pantalla de ajustes": "Code went from 3,026 characters to 555 on one settings screen",
  "Código para una pantalla de ajustes": "Code for one settings screen",
  "Sin la librería": "Without the library",
  "Con ModuleDroid": "With ModuleDroid",
  "3.026": "3,026",
  "Caracteres de código, excluido el XML. Un caso de prueba.": "Code characters, excluding XML. One test case.",
  "Desarrollé apps para abrir puertas desde Android e iOS y una web para gestionar quién tiene acceso.": "I built Android and iOS apps for unlocking doors, plus a web app for managing access.",
  "Un móvil junto a un lector de acceso en la entrada de una oficina": "A phone held near an access reader at an office door",
  "Ilustración del uso": "Illustration",
  "Creé una app que agiliza la preparación del tablero y permite decidir cómo repartir terrenos y números antes de empezar la partida.": "I built an app that speeds up board setup and lets players decide how to distribute terrain and numbers before the game begins.",
  "Preparar una partida": "Setting up a game",
  "El generador admite el tablero base de 19 terrenos y el ampliado de 30. Los ajustes permiten, por ejemplo, separar terrenos iguales o evitar que dos casillas vecinas tengan números con la misma probabilidad de salir.": "The generator supports the 19-tile base board and a 30-tile expansion. For example, players can keep matching terrain tiles apart or prevent neighbouring tiles from getting numbers with the same odds.",
  "En la app puedes generar los terrenos y revelar después las fichas numéricas. Así se puede preparar el mapa físico por pasos.": "Players can generate the terrain and reveal the numbers afterwards, so they can set up the physical board in stages.",
  "Cómo lo construí": "How I built it",
  "Construí la app para Android con Kotlin, dibujé la cuadrícula con Canvas y creé un generador que busca distribuciones según las reglas elegidas. Reutilicé dos plugins de ModuleDroid para los ajustes y para restaurar el tablero al recrear la pantalla.": "I built the Android app in Kotlin, drew the grid with Canvas and wrote a generator that searches for layouts that match the chosen rules. I reused two ModuleDroid plugins for settings and for restoring the board when the screen is recreated.",
  "Ver ModuleDroid": "View ModuleDroid",
  "Diseñé una librería modular que reúne tres tareas habituales de Android: navegar entre pantallas, guardar preferencias y recuperar el estado de una pantalla.": "I designed a modular library for three routine Android tasks: moving between screens, saving preferences and restoring screen state.",
  "Desarrollé apps nativas, backend y una web de gestión para un sistema de apertura de puertas con el móvil, durante mis prácticas de I+D en la Universidad de Alicante.": "During my R&D internship at the University of Alicante, I built native apps, a backend and a web admin panel for a system that lets people unlock doors with their phones."
});
for (const token of ['Alejandro Galán Pérez', 'Embention', 'SEDNI', 'CATAN', '☀', '☾', '⟳', '⚙', '×', '555']) {
  identity.add(token);
}

Object.assign(translations,{"Mi experiencia en detalle": "My experience in detail", "Ver control de accesos": "View mobile access control", "Prueba los controles del móvil.": "Try the controls on the phone.", "Volver al inicio": "Back to home", "Mi trayectoria": "My career", "Qué he construido, cómo he trabajado y qué conecta cada etapa.": "What I have built, how I have worked and how each role connects.", "Puestos de trabajo": "Roles", "Siguiente proyecto": "Next project", "Embention · Herramientas": "Embention · Tools", "Embention · Requisitos": "Embention · Requirements", "Universidad de Alicante · I+D": "University of Alicante · R&D", "SEDNI · C++": "SEDNI · C++", "Requisitos": "Requirements", "Trazabilidad": "Traceability", "ALM": "ALM", "UML": "UML", "Python": "Python", "PySide6": "PySide6", "VS Code": "VS Code", "Git · CI/CD": "Git · CI/CD", "Kotlin · Compose": "Kotlin · Compose", "Swift · SwiftUI": "Swift · SwiftUI", "Laravel · REST": "Laravel · REST", "C++": "C++", "GTK": "GTK", "XML": "XML", "Git · Jira": "Git · Jira", "Herramientas que simplifican el trabajo de ingeniería.": "Tools that make engineering work simpler.", "Convertir necesidades en requisitos que se puedan verificar.": "Turning needs into verifiable requirements.", "Del teléfono a una puerta real.": "From a phone to a physical door.", "Software conectado a sensores y alarmas.": "Software connected to sensors and alarms.", "Desarrollo y mantengo aplicaciones internas para preparar datos, automatizar documentación y reducir tareas repetitivas. Trabajo principalmente con Python y creo interfaces con PySide6.": "I develop and maintain internal applications for preparing data, automating documentation and reducing repetitive tasks. I work mainly with Python and build interfaces with PySide6.", "También desarrollo extensiones de VS Code para consultar y revisar información de ingeniería, y herramientas para analizar código y trabajar con conjuntos de datos.": "I also develop VS Code extensions for finding and reviewing engineering information, alongside tools for analysing code and working with datasets.", "Participo en decisiones técnicas y en el mantenimiento de los flujos de desarrollo con Git, GitHub y CI/CD.": "I contribute to technical decisions and maintain development workflows with Git, GitHub and CI/CD.", "Analicé, definí y mantuve requisitos de software de alto y bajo nivel para autopilotos de drones y operaciones de vuelo autónomo.": "I analysed, defined and maintained high- and low-level software requirements for drone autopilots and autonomous flight operations.", "Trabajé en su trazabilidad, consistencia y verificabilidad, colaborando con desarrollo y QA para conectar las especificaciones con los criterios de verificación.": "I worked on traceability, consistency and verifiability, collaborating with development and QA to connect specifications with verification criteria.", "Colaboré en la estandarización de las especificaciones y de sus criterios de verificación.": "I helped standardise specifications and their verification criteria.", "Desarrollé las apps nativas de Android e iOS, el backend y la web de gestión de un sistema distribuido de control de accesos. Es el mismo proyecto que desarrollé en mi trabajo de fin de máster.": "I built the native Android and iOS apps, backend and web admin panel for a distributed access control system. This is the same project I developed for my master’s thesis.", "Las apps se comunican con lectores físicos mediante BLE; Android incorpora también NFC/HCE. El backend centraliza usuarios, permisos y registros mediante APIs REST y una base de datos relacional.": "The apps communicate with physical readers over BLE; Android also includes NFC/HCE. The backend centralises users, permissions and records through REST APIs and a relational database.", "Implementé el software salvo el código del lector y la comunicación entre controladora y lector, realizados por otros miembros del equipo. La validación incluyó lectores físicos y más de cien usuarios activos.": "I implemented the software except for the reader code and controller–reader communication, which other team members developed. Validation included physical readers and more than one hundred active users.", "Desarrollé y mantuve software para monitorizar en tiempo real sensores y alarmas en entornos industriales y marítimos.": "I developed and maintained software for real-time monitoring of sensors and alarms in industrial and maritime environments.", "Trabajé con C++ y GTK, y con XML para representar, configurar e integrar información en la aplicación.": "I worked with C++ and GTK, and used XML to represent, configure and integrate information in the application.", "Automaticé pruebas para comprobar la detección de señales y la activación de alarmas, y colaboré con el equipo en la depuración del software.": "I automated tests for signal detection and alarm activation, and worked with the team on debugging."});

Object.assign(translations,{
  "Accesos": "Access control",
  "Email": "Email",
  "Escríbeme": "Send me an email",
  "Código y proyectos": "Code and projects",
  "Perfil profesional": "Professional profile",
  "Tres piezas para tu app": "Three pieces for your app",
  "Cambiar de pantalla": "Move between screens",
  "Guardar preferencias": "Save preferences",
  "Recuperar el estado": "Restore screen state",
  "Navegación, ajustes y estado, sin reconstruir la misma infraestructura.": "Navigation, settings and state, without rebuilding the same infrastructure.",
  "Un ejemplo concreto": "One concrete example",
  "Repetir animación": "Replay animation",
  "Móvil acercándose a un lector de acceso": "A phone approaching an access reader",
  "Acceso autorizado": "Access granted",
  "Credencial móvil": "Mobile credential",
  "Acerca el móvil": "Bring your phone close",
  "Lectura por proximidad": "Proximity reader",
  "Ilustración animada del uso": "Animated illustration",
  "Tres plugins, uno detrás de otro": "Three plugins, one after another",
  "Puedes recorrer todos los ejemplos sin cambiar de pestaña.": "Browse all the examples without switching tabs.",
  "Con Configurator": "With Configurator",
  "Con Restorer": "With Restorer",
  "Un poco más de ingeniería": "More engineering detail",
  "Recibir el resultado de otra pantalla.": "Receive a result from another screen.",
  "Registrar el launcher, lanzar el Intent y extraer el resultado.": "Register the launcher, launch the Intent and extract the result.",
  "Abrir la pantalla y definir qué hacer al volver.": "Open the screen and define what happens on return.",
  "El ejemplo muestra el lado que recibe el resultado; se omite la pantalla de edición en ambos casos. Navigator encapsula la mecánica de navegación y retorno en una llamada encadenada.": "This example shows the caller; the editing screen is omitted in both versions. Navigator encapsulates navigation and result handling in a chained call.",
  "Guardar y leer una preferencia.": "Save and read a preference.",
  "Acceder al almacén y gestionar su editor.": "Access the preference store and manage its editor.",
  "Leer y escribir desde una fachada tipada.": "Read and write through a typed facade.",
  "Encapsula SharedPreferences y su editor. El plugin también permite suscribirse a cambios y generar una pantalla de configuración.": "Encapsulates SharedPreferences and its editor. The plugin also supports change subscriptions and a generated settings screen.",
  "Conservar un contador al rotar la pantalla.": "Keep a counter when the screen rotates.",
  "Guardar y recuperar el campo en los callbacks.": "Save and retrieve the field in lifecycle callbacks.",
  "Declarar qué campo debe conservar su valor.": "Declare which field should keep its value.",
  "El plugin conecta el guardado y la restauración al ciclo de vida mediante anotaciones. Este ejemplo se limita a recreaciones como la rotación; no demuestra equivalencia con Bundle tras la muerte del proceso.": "The plugin connects saving and restoration to the lifecycle through annotations. This example is limited to recreation such as rotation; it does not establish equivalence with Bundle after process death."
});
identity.add('Catán');

const filenames = new Map([
  ['es', 'index'],
  ['catan-es', 'catan'],
  ['moduledroid-es', 'moduledroid'],
  ['accesos-es', 'accesos'],
  ['experiencia-es', 'experiencia']
]);

for (const [spanishName, englishName] of filenames) {
  let spanish = await readFile(new URL(`../src/${spanishName}.html`, import.meta.url), 'utf8');
  if (spanish.includes('<!-- CATAN_DEMO -->')) {
    const demo = await readFile(new URL('../src/partials/catan-demo.html', import.meta.url), 'utf8');
    spanish = spanish.replace('<!-- CATAN_DEMO -->', demo);
  }
  if (spanish.includes('<!-- ACCESS_SCENE -->')) {
    spanish = spanish.replace('<!-- ACCESS_SCENE -->', await readFile(new URL('../src/partials/access-scene.html',import.meta.url),'utf8'));
  }
  // Kotlin snippets are source code; translate the surrounding explanations only.
  const codeBlocks = [];
  spanish = spanish.replace(/<pre>[\s\S]*?<\/pre>/g, block => {
    const index = codeBlocks.push(block) - 1;
    return `<pre data-code-slot="${index}"></pre>`;
  });
  const missing = new Set();
  let english = spanish.replace(/>([^<>]+)</g, (full, raw) => {
    const key = raw.trim();
    if (!key) return full;
    if (Object.hasOwn(translations, key)) return '>' + raw.replace(key, translations[key]) + '<';
    if (!identity.has(key)) missing.add(key);
    return full;
  });
  if (missing.size) throw new Error(`${spanishName}: missing translations: ${[...missing].join(' | ')}`);

  english = english
    .replace(/(aria-label|alt|content|title)="([^"]*)"/g, (full, attr, value) =>
      Object.hasOwn(translations, value) ? `${attr}="${translations[value]}"` : full)
    .replace(/<a\b[^>]*>/g, anchor => anchor.includes('hreflang=') ? anchor :
      anchor.replace(/href="\.\/([a-z-]+)\.html(?=["#])/g, (full, slug) =>
        filenames.has(slug) ? `href="./${filenames.get(slug)}.html` : full))
    .replace('<html lang="es">', '<html lang="en">')
    .replace('data-language="es" aria-current="page"', 'data-language="es"')
    .replace('data-language="en"', 'data-language="en" aria-current="page"')
    .replaceAll('CV_Alejandro_Galan_ES.pdf', 'CV_Alejandro_Galan_EN.pdf');

  english = english.replace(/<pre data-code-slot="(\d+)"><\/pre>/g, (_, index) => codeBlocks[Number(index)]);
  await writeFile(new URL(`../src/${englishName}.html`, import.meta.url), english);
}
console.log('Five pages generated in English and Spanish.');
