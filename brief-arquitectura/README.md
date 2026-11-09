# Antes de diseñar · Brief de arquitectura

Landing pública e independiente en **`brief-arquitectura/index.html`**, sin login, backend, dependencias de producción ni compilación. Sigue la arquitectura HTML/CSS/JavaScript y el despliegue estático de este repositorio. No modifica Roadmap, Brújula, autenticación, Torre Fuerte ni sus datos.

La entrada relativa al sitio es **`/brief-arquitectura/`**. GitHub Pages publica este repositorio desde `main`, con base **`/proyects4me/`**, por lo que la entrada desplegada es **`/proyects4me/brief-arquitectura/`**. Los assets son relativos y los pasos usan fragmentos (`#pregunta-1` … `#pregunta-20`, `#revision`); no necesitan rewrites. Verificar el deployment de Pages antes de anunciar disponibilidad pública.

## Experiencia

- Portada editorial, estimación de 5–7 minutos y cuatro capítulos.
- Una pregunta por pantalla; radios y checkboxes nativos; atrás, continuar, omitir, saltar de capítulo y revisar.
- Las preguntas **1 y 7** son necesarias para identificar el modo de trabajo y el objetivo. Las otras 18 son opcionales.
- «Otros» en las preguntas 2 y 3 muestra un campo de hasta 240 caracteres. Si se selecciona, necesita una descripción; desmarcarlo conserva el texto por si se vuelve a elegir, pero no lo exporta.
- Las opciones de ausencia de canal, material, sistema o preocupaciones de las preguntas 4, 6, 14 y 18 excluyen el resto de opciones de su propia pregunta.
- La pregunta abierta admite hasta 2,000 caracteres. No se solicita nombre, teléfono ni email; se indica no incluir datos personales de clientes.
- Revisión de las 20 respuestas, edición por pregunta, copia íntegra y descarga UTF-8 `.txt`. Las omitidas aparecen como «Sin responder».
- Los botones de exportación funcionan también con respuestas incompletas. Para preparar WhatsApp se validan las dos respuestas necesarias y los campos «Otros» elegidos.

## WhatsApp y respaldo

Destino solicitado: **`https://wa.me/522292507595`**. El texto se construye con el encabezado **BRIEF DE ARQUITECTURA — RESPUESTAS**, cuatro capítulos, preguntas completas numeradas del 1 al 20 y todas las selecciones. La URL utiliza `encodeURIComponent`; se conservan acentos, signos, saltos de línea y Unicode.

Un brief de longitud normal abre una pestaña con el texto prellenado al pulsar **Enviar por WhatsApp**. Se abre dentro del gesto de la persona, se elimina `opener` antes de navegar y no se envía referrer. Abrir el enlace entrega el texto a WhatsApp para prepararlo; **no entrega un mensaje al destinatario**. Solo la persona puede confirmar el envío dentro de WhatsApp. No hay API, automatización ni envío desde la aplicación.

El límite práctico varía entre navegadores y clientes de WhatsApp. La app usa un **umbral preventivo de 12,000 caracteres de URL codificada**, no una garantía del proveedor. Si se supera, nunca recorta las respuestas: presenta un diálogo para copiar o descargar el texto íntegro y abrir el chat sin texto para pegarlo manualmente. El mismo respaldo aparece si se bloquea la ventana o falla su apertura. La ayuda «¿No se abre WhatsApp?» está disponible siempre en la revisión, porque no se puede comprobar si la app externa recibió o conservó el texto.

La copia intenta Clipboard API y después selección con `execCommand`. Si ambas fallan, muestra un textarea de solo lectura con selección manual y descarga. No afirma que se copió si no se confirmó. Los archivos se crean en el dispositivo mediante Blob, sin subirlos a un servidor.

## Guardado y privacidad

Única clave: **`brief-arquitectura:v1`**, en localStorage. Guarda respuestas, paso y vista. La apertura solo lee; las interacciones guardan. El contenido no se incluye en el hash, en parámetros del sitio ni en peticiones de red. No hay cookies, analítica ni servicios remotos. Las fuentes se sirven desde el propio sitio.

El aviso visible es: «Tus respuestas se preparan en tu dispositivo y solo se comparten si decides enviarlas por WhatsApp.»

Este almacenamiento pertenece al perfil del navegador y no está cifrado por la app. Se puede continuar después de recargar y borrar únicamente este brief mediante confirmación. Si el guardado falla, se conserva la sesión en memoria y se muestra una advertencia para copiar/descargar antes de cerrar; no se afirma que los cambios quedaron guardados. Un borrador corrupto o de versión desconocida se conserva hasta que la persona confirme sustituirlo. Un fallo al borrar se comunica sin afirmar que se borró.

## Archivos y diseño

- `index.html`: entrada pública y estructura semántica.
- `model.js`: 20 preguntas, exclusiones, validación, normalización, exportación y transporte a WhatsApp; también se prueba en Node.
- `brief.js`: flujo, guardado local, revisión, diálogos, portapapeles y descarga.
- `brief.css`: sistema editorial, responsive 320 px–escritorio, foco, safe areas y movimiento reducido.
- `assets/`: marca e ilustración axonométrica originales; Instrument Serif Regular y su licencia SIL OFL. Fuente obtenida de `google/fonts/ofl/instrumentserif` (Google Fonts). Plus Jakarta Sans reutiliza la fuente local existente y su [licencia OFL](../fonts/OFL.txt).
- `tests/`: pruebas de reglas y navegación real con Playwright/axe.

Paleta marfil, carbón y oliva con terracota discreta. Tipografía Instrument Serif para titulares y Plus Jakarta Sans para lectura y controles. Sin imágenes externas, gradientes, tarjetas anidadas ni paneles de administración. La ilustración es un estudio conceptual original, no un proyecto de la arquitecta.

## Pruebas

Desde la raíz del repositorio:

```sh
node --check brief-arquitectura/model.js
node --check brief-arquitectura/brief.js
node brief-arquitectura/tests/model.cjs
python3 -m http.server 8006 --bind 127.0.0.1 --directory /workspace
```

Con Playwright 1.56.1 y `@axe-core/playwright` 4.11.0 instalados fuera del checkout:

```sh
BRIEF_TEST_URL=http://127.0.0.1:8006/proyects4me/brief-arquitectura/ \
NODE_PATH=/workspace/roadmap-tools/node_modules \
node brief-arquitectura/tests/browser.cjs
```

El servidor del ejemplo usa `/workspace` para probar también la base real `/proyects4me/`. En otros checkouts, servir la raíz del repositorio y ajustar `BRIEF_TEST_URL` a `/brief-arquitectura/`. Admite `CHROMIUM_PATH` y `BRIEF_ARTIFACT_DIR` para capturas.

Las pruebas comprueban selección, validación, exclusiones, «Otros», atrás, omisión, edición, recarga, guardado fallido, borrador corrupto, revisión, codificación completa, copia/descarga, ventana bloqueada, mensaje largo, copia manual, borrado aislado, teclado, Unicode y movimiento reducido. Se verifican las 20 preguntas y la revisión a 320, 375, 390, 430, 768, 1280 y 1440 px. Se ejecuta axe WCAG A/AA en todas las preguntas a 390 y 1440 px, revisión en cada ancho y portada/diálogos.

No hay comandos de build o lint configurados en este sitio estático; se valida sintaxis con Node, reglas con pruebas unitarias y UI con navegador. La CI específica añade esas comprobaciones sin cambiar los workflows existentes. Chromium con viewports móviles no sustituye Safari o pruebas en iPhone físico. WhatsApp se intercepta en pruebas: no se abre un chat real ni se envían respuestas de prueba al número.
