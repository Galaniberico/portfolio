# Alejandro Galán · Portfolio

Web: https://galaniberico.github.io/portfolio/

Repositorio: https://github.com/Galaniberico/portfolio

Primera versión oscura, estática y adaptable a móvil. No hay framework, dependencias npm, analítica ni cookies. Las fuentes de Google son opcionales: la web utiliza fuentes del sistema si no están disponibles.

## Ver en local

Necesitas Node.js 22 o posterior. Desde esta carpeta:

~~~powershell
npm run dev
~~~

Abre http://localhost:4173. Guarda cambios en src/ y recarga el navegador. Ctrl+C detiene el servidor. También puedes abrir src/index.html directamente, aunque se recomienda el servidor.

## Revisar y construir

~~~powershell
npm run check
npm run build
~~~

dist/ contiene únicamente los archivos públicos. Todas las rutas son relativas: funciona también en usuario.github.io/portfolio/.

## Publicar cambios

La carpeta ya está vinculada a Galaniberico/portfolio, rama main, y GitHub Pages utiliza GitHub Actions. Después de revisar en local:

~~~powershell
npm run deploy
~~~

También funciona just deploy si tienes just instalado. No necesitas GitHub CLI para desplegar: el comando comprueba, construye, guarda los cambios del proyecto en un commit y hace git push. GitHub Actions publica cada nuevo commit de main. Guardar archivos o ejecutar la vista local no publica nada. Si no hay commits nuevos, conserva la publicación actual.

Git puede pedir iniciar sesión en GitHub la primera vez que subas cambios desde el equipo. Si solicita identidad para crear un commit, configura user.name y user.email para este repositorio. No se almacenan tokens en los archivos del proyecto.

El comando confirma el envío; la web se considera publicada cuando el job Deploy aparece en verde: https://github.com/Galaniberico/portfolio/actions. También puedes lanzar Deploy portfolio con Run workflow desde Actions. Para configurar una copia completamente nueva del proyecto, npm run setup -- usuario/repositorio conserva el asistente opcional basado en GitHub CLI.

Referencia: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Contenido

- src/index.html: presentación y casos de proyecto.
- src/styles.css: diseño y versiones móvil/escritorio.
- src/app.js: plugins interactivos y recorrido ilustrativo de accesos.
- src/assets/: favicon y CV principal ES/EN.

El código del sistema de accesos permanece fuera del proyecto. El recorrido simula una secuencia; no autentica ni abre una puerta.

La cifra de ModuleDroid compara caracteres (sin XML) en una pantalla de una sola app: 3.026 frente a 555, redondeado a −81,7 %. No describe toda la app ni rendimiento. Los más de cien usuarios del sistema de accesos proceden de la confirmación personal del autor. Los enlaces a repositorios proceden de la documentación aportada; su disponibilidad debe revisarse antes de publicar.

## Idiomas y demostraciones

La entrada principal index.html está en inglés. El selector EN/ES de la cabecera permite cambiar de idioma conservando la sección actual. src/es.html es la fuente de estructura y texto en español; scripts/localize.mjs contiene las traducciones inglesas y genera src/index.html. Después de editar el contenido ejecuta npm run localize (check y build también lo hacen). src/app.js contiene los textos bilingües de las interacciones.

ModuleDroid muestra tres comparaciones de Kotlin, con el código convencional en gris y el código con plugin en la paleta de cada pestaña. Son fragmentos adaptados para explicar el uso; omiten imports, la clase Activity y la inicialización. Las llamadas Navigate.toReturn/getResult, Configurator.set/get y @Restore se contrastaron con los repositorios públicos del autor. El ejemplo Restorer se limita a recreación por rotación; no atribuye persistencia tras muerte del proceso.

El diagrama de accesos separa apps, lector, controladora/caché, puerta, servidor, base de datos y panel web. Sus seis pasos pueden reproducirse, pausarse o recorrerse manualmente. La sincronización de registros y permisos se presenta separada de la apertura local, sin atribuir latencias ni conexión real a hardware. En móvil, el esquema se presenta como un recorrido vertical con el backend desplegable; la comparación de código permite elegir plugin y alternar entre antes/después. La presentación personal y la formación aparecen antes de los proyectos. La cabecera ofrece lectura y descarga del CV del idioma activo.


