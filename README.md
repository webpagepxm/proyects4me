# Roadmap

Organizador personal estático para el día, la vida y los proyectos, con diseño tipográfico basado en Denbou. Sitio habitual: https://webpagepxm.github.io/proyects4me/

## Desarrollo

No requiere instalación de dependencias de producción, backend, secretos ni compilación. Usar el checkout existente; no hace falta un worktree. CI utiliza Node 22.

```bash
node --check roadmap-3.js
node tests/roadmap-smoke.cjs
node tests/roadmap-time-aware.cjs
python3 -m http.server 8000 --bind 127.0.0.1
```

- `index.html`: estructura, navegación y vistas.
- `roadmap-3.css`: único sistema visual, tipografía, responsive y estados interactivos.
- `roadmap-3.js`: datos, horarios, tareas, progreso, proyectos y persistencia.
- `fonts/`: Plus Jakarta Sans variable 200–800 y licencia SIL OFL 1.1.
- `DESIGN.md`: referencia, decisiones y compatibilidad.

## Vistas

**Hoy** muestra primero qué hacer ahora, cuidados diarios, pregunta de despertar, agenda recomendada, salida y turno editables. La misión de proyecto queda después. Por la noche ofrece descanso, sin pendientes profesionales. Abrir la app no confirma que acabes de despertar.

**Proyectos** contiene un listado con filtro y acceso directo a los detalles de cada proyecto. Callejero + Denbou conserva diez etapas agrupadas en cinco áreas, estimaciones manuales y checklists técnicos anteriores. Torre Fuerte y los proyectos en espera mantienen sus tareas. Los porcentajes estimados no certifican funcionamiento en producción. El portafolio conserva la ponderación 70% integrado y 30% Torre Fuerte.

**Mi vida** conserva cuidados, vínculos y hábitos. **Más** da acceso a semana, notas y respaldos. Las fechas y horarios son recomendaciones locales; no hay IA, notificaciones ni sincronización externa.

## Datos

La clave sigue siendo `mi-tablero-personal-v1`. No hay migración ni reinicio de marcas, notas o estimaciones. Una escritura fallida restaura el último estado guardado y muestra un error. La actualización conserva scroll, foco y desplegables.

Para respaldar: Más → Revisión y respaldo → Exportar respaldo JSON. La importación pide confirmar antes de sustituir los registros locales. Borrar descarga un respaldo antes de eliminar datos de este navegador. Los controles avanzados del proyecto integrado conservan exportación/importación independiente.

El sitio y las tareas iniciales son públicos. No introducir contraseñas ni datos sensibles en archivos versionados. Las notas y marcas del navegador no se comparten salvo al exportarlas.

## Prueba de navegador

Chromium está instalado en `/usr/bin/chromium`. En este entorno las herramientas están fuera del checkout:

```bash
npm install --prefix /workspace/roadmap-tools --cache /tmp/roadmap-npm-cache --no-save --package-lock=false playwright@1.56.1 @axe-core/playwright@4.11.0
NODE_PATH=/workspace/roadmap-tools/node_modules node tests/roadmap-browser.cjs
```

Mantener el servidor activo. Opcionalmente establecer `ROADMAP_TEST_URL` y `CHROMIUM_PATH`. La prueba usa perfiles aislados y datos sintéticos: rutina visible; mañana, tarde, turno, noche y madrugada; seis proyectos; filtros; casillas; sliders con teclado; notas y recarga; respaldo completo; fallos de almacenamiento; foco y scroll; 320, 360, 375, 390, 430, 768, 1024, 1280 y 1440 px; ampliación CSS al 200%; auditoría automatizada de accesibilidad.

No hay lint ni typecheck configurados. La prueba en Chromium no sustituye Safari o iPhone físicos.

## Publicación y reversión

GitHub Pages sirve el sitio estático. Los cambios se integran en `main` después de las comprobaciones. Confirmar el deployment en GitHub y la versión `20261108-readable-v2` de los assets antes de declarar una publicación verificada.

Versión previa: `76ce550cddb55f899b3b530e91e4d9291d968f6b`, conservada en `backup/pre-denbou-20261108`. Reversión mediante `git revert` del commit correspondiente, sin forzar el historial ni tocar localStorage.
