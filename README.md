# ROADMAP 3.0 — Mi centro de control

Tablero personal estático construido sobre el lenguaje visual de Denbou 2.0. Diseñado para mostrar poca información al inicio, mantener proyectos organizados y preservar el control de los registros en el navegador.

## Abrir

https://webpagepxm.github.io/proyects4me/

## Estructura

- `index.html`: estructura semántica de las cuatro vistas: Hoy, Proyectos, Mi vida y Más.
- `roadmap-3.css`: único sistema visual (tokens, navegación, anillos, tarjetas, controles y responsive).
- `roadmap-3.js`: datos, modelo de progreso, navegación y persistencia local.
- `tests/roadmap-smoke.cjs`: pruebas de regresión sin dependencias externas.
- `.github/workflows/roadmap-smoke.yml`: prueba automática en cambios y PR.

Las implementaciones anteriores de CSS/JS fueron eliminadas de `main` y permanecen recuperables en `backup/pre-roadmap-cleanup-20261107`.

## Diseño de producto

- **Hoy:** la guía personal por horario es lo primero que se ve (higiene, desayuno, movimiento, comida, horario hasta salir), con tres cuidados diarios visibles también después del mediodía; la misión de proyectos y el portafolio quedan debajo. La agenda completa puede contraerse.
- **Proyectos:** Callejero + Denbou unificados (cinco áreas visuales, diez etapas subyacentes, tareas intactas), Torre Fuerte y proyectos secundarios bajo «En espera».
- **Mi vida:** tres temas principales y detalles de hábitos a petición.
- **Más:** planificación semanal, revisión, notas, respaldos y guía diaria.
- La evidencia documentada **no cuenta** automáticamente como tarea completada. Los porcentajes de etapas integradas son **estimaciones manuales**, no verificación funcional.

## Estructura diaria según la hora

La pantalla **Hoy** muestra una sola acción sugerida y una misión principal. No es un agente de IA ni interpreta eventos privados. Lee únicamente la hora local del navegador al abrir o reactivar la página:

- **06:00–11:59:** higiene, desayuno, movimiento, comienzo de un bloque de proyectos y horario recomendado hasta la salida estimada.
- **12:00 hasta la salida configurada:** concentración en el siguiente paso verificable y pausa de comida.
- **Después de la salida:** atención al turno o a compromisos si corresponde; descanso si ese día no hay turno.
- **21:00–05:59:** bajar estímulos, lectura y preparación gradual del sueño, sin abrir nuevos pendientes de programación.

Al abrirse por la mañana, ROADMAP **pregunta** si la persona acaba de despertar; nunca transforma automáticamente la hora de apertura en hora real de despertar. La referencia inicial de salida es **15:30**, editable día a día. Las preferencias diarias se guardan en el navegador, sin sincronización externa ni notificaciones automáticas.

La agenda recomendada se abre automáticamente al entrar por la mañana o por la tarde, aunque puede contraerse; conserva su estado mientras se marca una acción. Los tres anillos siguen en la sección de vida personal.

## Datos y seguridad

La aplicación se aloja como sitio estático público. Los avances, notas, hábitos y ediciones se guardan en `localStorage` bajo la clave original `mi-tablero-personal-v1`, compatible con la versión anterior. **No hay sincronización entre dispositivos ni backend privado.** No introducir contraseñas, datos de clientes ni información sensible en archivos versionados.

Para respaldar: **Más → Revisión y respaldo → Exportar respaldo JSON**. Para recuperar: **Importar respaldo** en la misma pantalla; revisa el mensaje de confirmación antes de reemplazar datos actuales. La acción de borrar descarga un respaldo y después borra sólo datos locales. También puede exportarse/importarse el avance del proyecto integrado desde sus controles avanzados.

## Pruebas

Ejecutar con Node 22:

```bash
node tests/roadmap-smoke.cjs
node tests/roadmap-time-aware.cjs
```

Comprueba estructura, render de proyectos, separación de evidencias, estado local, reset y sliders. Las pruebas simuladas no sustituyen la inspección visual en Safari/iPhone reales.

## Mantenimiento

Antes de cambios visuales: revisar el diseño de Denbou, evitar añadir CSS numerados o listeners duplicados, ejecutar smoke test y comprobar que las marcas previas permanecen intactas. Las barras de progreso representan acciones verificadas o estimaciones expresamente identificadas como tales.

## Universo visual (noviembre 2026)

La portada reúne misión, portafolio estimado y acceso directo a los seis proyectos visibles. Los objetos originales usan CSS, sin imágenes externas ni librerías 3D. La guía contextual ha vuelto al primer lugar de Hoy; los hábitos detallados siguen en Mi vida y Más. Las etapas mantienen una lista nativa de desplegables, sin imponer dependencias nuevas. Las tareas conservan sus identificadores, los desplegables abiertos y el foco al actualizarse.

La clave local, las tareas originales, los porcentajes iniciales y la fórmula del portafolio (70% integrado, 30% Torre Fuerte) se conservan. Si falla una escritura, se restaura el último estado guardado y se muestra un error; importar tampoco anuncia éxito si no se pudo guardar. La app no puede leer ni respaldar desde el entorno cloud los datos privados que ya existen en otros navegadores.

No hay compilación, lint ni typecheck configurados: los archivos estáticos se sirven directamente. Validación de sintaxis: `node --check roadmap-3.js`. Desarrollo local: `python3 -m http.server 8000 --bind 127.0.0.1` desde este checkout.

La prueba opcional real de navegador requiere Chromium, Playwright 1.56.1 y @axe-core/playwright 4.11.0 instalados fuera del checkout. Con el servidor activo:

```bash
NODE_PATH=/workspace/roadmap-tools/node_modules node tests/roadmap-browser.cjs
```

Comprueba navegación y foco en los seis proyectos, casillas, sliders con teclado, notas, recarga, importación, fallos de almacenamiento, fórmula ponderada, siete anchos y auditoría automatizada de accesibilidad de seis vistas expandidas. Usa datos sintéticos en un perfil temporal. No sustituye pruebas en Safari o un iPhone físico.

Referencia anterior: `backup/pre-universe-20261107`, commit `e5095a372228bfe2d0ad4ba5efb76caf6e918bdd`. Para revertir una publicación futura, revierte el commit del rediseño mediante `git revert`; no restablezcas datos del navegador ni fuerces el historial remoto.
