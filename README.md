# Roadmap V2

Dirección cotidiana, bienestar y seguimiento de proyectos. Sitio habitual: https://webpagepxm.github.io/proyects4me/

**Hoy** recomienda qué hacer ahora, hasta dos siguientes pasos y una prioridad profesional cuando corresponde. No requiere crear tareas, confirmar recomendaciones ni mantener listas. Los horarios y registros voluntarios quedan como opciones secundarias. **Proyectos** conserva detalles, estimaciones, barras por nivel, hitos y evidencia. **Wellness** visualiza registros reales de alimentación, movimiento y descanso, con historia de 7/14 días cuando hay datos suficientes. **Más** conserva horarios, semana, notas y respaldos. Mi vida ya no es una pantalla independiente; sus datos permanecen en Hoy.

## Desarrollo y validación

Aplicación estática, sin backend, nuevas dependencias de producción, secretos ni compilación. Usar el checkout existente; no hace falta un worktree. CI usa Node 22.

```bash
node --check day-director.js
node --check wellness-model.js
node --check roadmap-3.js
node tests/roadmap-smoke.cjs
node tests/roadmap-time-aware.cjs
python3 -m http.server 8000 --bind 127.0.0.1
```

- `index.html`: estructura y navegación.
- `day-director.js`: selección contextual pura, sin efectos de almacenamiento.
- `wellness-model.js`: registros fechados y agregación ponderada con estados desconocidos.
- `roadmap-3.js`: integración, proyectos, persistencia y vistas.
- `roadmap-3.css`: sistema visual único, responsive y accesibilidad.
- `fonts/`: Plus Jakarta Sans variable y licencia OFL 1.1.
- `DESIGN.md`: inventario de recuperación, decisiones, fórmulas y límites.

Con el servidor activo, las herramientas de navegador se instalan fuera del checkout:

```bash
npm install --prefix /workspace/roadmap-tools --cache /tmp/roadmap-npm-cache --no-save --package-lock=false playwright@1.56.1 @axe-core/playwright@4.11.0
NODE_PATH=/workspace/roadmap-tools/node_modules node tests/roadmap-browser.cjs
```

Admite `ROADMAP_TEST_URL` y `CHROMIUM_PATH`. Usa datos sintéticos en perfiles aislados. Comprueba apertura sin escritura; reloj, horarios y cambios de día; hábitos opcionales; seis proyectos y todas las barras; respaldo completo; errores de almacenamiento; sincronización entre pestañas; Wellness sin registros y con historia; 320, 360, 375, 390, 430, 768, 1024, 1280 y 1440 px; ampliación CSS al 200%; accesibilidad automatizada. No hay lint ni typecheck configurados. No sustituye pruebas en Safari o iPhone físicos.

## Datos y alcance real

Se conserva `mi-tablero-personal-v1`, IDs, datos originales, marcas, notas, estimaciones y configuraciones diarias. No hay migración destructiva. Abrir y dejar pasar el tiempo no completa actividades ni genera tareas. Los horarios solo se usan cuando están configurados; Más permite guardarlos voluntariamente para el mismo día de la semana. Una excepción diaria prevalece sobre el horario habitual.

La información de bienestar refleja confirmaciones voluntarias, no mediciones clínicas ni detección de conducta. Los huecos históricos son desconocidos y las marcas sin fecha no se fechan retrospectivamente. No hay IA, calendarios conectados, notificaciones ni sincronización remota. Las pestañas del mismo navegador sí se actualizan al cambiar el estado local.

Los porcentajes de proyectos conservan las reglas y bases manuales originales. El portafolio utiliza 70% integrado y 30% Torre Fuerte, sin contar Callejero dos veces ni proyectos en espera. Un progreso desconocido muestra `Sin estimación`. La evidencia histórica no certifica tareas completadas.

## Respaldos y publicación

Más → Revisión y respaldo → Exportar respaldo JSON. La importación pide confirmar antes de sustituir datos; se conservan los horarios habituales al recuperar archivos antiguos que no los contienen. Los controles avanzados del proyecto integrado mantienen su respaldo independiente. Un fallo de escritura deshace el cambio visible y muestra un error.

El sitio y las tareas iniciales son públicos. Notas y marcas quedan en el navegador, salvo al exportarlas. No versionar contraseñas ni datos sensibles.

La publicación sigue GitHub Pages desde `main`. Confirmar el deployment y los assets `20261108-director-v1` antes de afirmar que la versión está visible públicamente. Referencia anterior: `backup/pre-day-director-20261108`, `f7c3927b96a9c7edb234bd5ab43067a098f191ce`. Revertir un commit publicado con `git revert`, sin forzar el historial ni restablecer localStorage.
