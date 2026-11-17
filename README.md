# Alejandro Galán · Portfolio

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

## Publicar por primera vez (solo cuando lo hayas revisado)

Instala Git y GitHub CLI (https://cli.github.com/). Git ya está presente en el equipo; GitHub CLI no estaba instalado al crear esta versión. No necesitas instalar just: npm ofrece los mismos comandos.

~~~powershell
gh auth login
npm run setup -- TU_USUARIO/portfolio
npm run deploy
~~~

setup crea un repositorio PÚBLICO nuevo y configura origin; no publica la página. Usa un nombre nuevo de repositorio. deploy comprueba los archivos, construye, guarda los cambios del proyecto en un commit, sube main, habilita Pages con GitHub Actions y solicita el workflow. Si Git pide identidad, configura user.name y user.email para este repositorio. El comando informa de la solicitud; la publicación termina cuando el job Deploy de Actions aparece en verde. Su salida muestra la URL final.

Para cambios posteriores basta con revisar en local y ejecutar npm run deploy. Si tienes just instalado, just dev y just deploy son equivalentes. No hay despliegues por cada guardado ni cada push: el workflow solo se ejecuta de forma manual o mediante deploy.

Alternativa sin GitHub CLI: crea el repositorio en GitHub, sube estos archivos, selecciona Settings → Pages → Source: GitHub Actions y ejecuta Actions → Deploy portfolio → Run workflow. El workflow sigue la documentación oficial de Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Contenido

- src/index.html: presentación y casos de proyecto.
- src/styles.css: diseño y versiones móvil/escritorio.
- src/app.js: plugins interactivos y recorrido ilustrativo de accesos.
- src/assets/: favicon y CV principal ES/EN.

No se han publicado ni creado repositorios durante la preparación. El código del sistema de accesos permanece fuera del proyecto. La representación del móvil es conceptual, no una captura de la aplicación real. El recorrido simula una secuencia; no autentica ni abre una puerta.

La cifra de ModuleDroid compara caracteres (sin XML) en una pantalla de una sola app: 3.026 frente a 555, redondeado a −81,7 %. No describe toda la app ni rendimiento. Los más de cien usuarios del sistema de accesos proceden de la confirmación personal del autor. Los enlaces a repositorios proceden de la documentación aportada; su disponibilidad debe revisarse antes de publicar.

## Idiomas y demostraciones

La entrada principal index.html está en inglés. El selector EN/ES de la cabecera permite cambiar de idioma conservando la sección actual. src/es.html es la fuente de estructura y texto en español; scripts/localize.mjs contiene las traducciones inglesas y genera src/index.html. Después de editar el contenido ejecuta npm run localize (check y build también lo hacen). src/app.js contiene los textos bilingües de las interacciones.

ModuleDroid muestra tres comparaciones de Kotlin, con el código convencional en gris y el código con plugin en la paleta de cada pestaña. Son fragmentos adaptados para explicar el uso; omiten imports, la clase Activity y la inicialización. Las llamadas Navigate.toReturn/getResult, Configurator.set/get y @Restore se contrastaron con los repositorios públicos del autor. El ejemplo Restorer se limita a recreación por rotación; no atribuye persistencia tras muerte del proceso.

El diagrama de accesos separa apps, lector, controladora/caché, puerta, servidor, base de datos y panel web. Sus seis pasos pueden reproducirse, pausarse o recorrerse manualmente. La sincronización de registros y permisos se presenta separada de la apertura local, sin atribuir latencias ni conexión real a hardware. En móvil, el esquema se puede desplazar horizontalmente.

