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

- **Hoy:** una prioridad visible, hasta dos adicionales desplegables, tres anillos personales y una sección simple de autocuidado.
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

La agenda completa y los tres anillos siguen disponibles mediante secciones desplegables para evitar la saturación.

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
