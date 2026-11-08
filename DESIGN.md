# Roadmap V2 · dirección cotidiana, bienestar y proyectos

## Auditoría y recuperación

Repositorio: `webpagepxm/proyects4me`, aplicación estática en la raíz. Se revisaron `index.html`, `roadmap-3.js`, `roadmap-3.css`, fuentes locales, pruebas, CI y versiones `76ce550`, `a019395`, `7b371c0` y `f7c3927`. Denbou se consultó previamente mediante sus archivos reales `DESIGN.md`, tokens, base, layout, components y responsive; sus fuentes y licencia están en `fonts/`. No se modifica Denbou.

| Capacidad previa | Resultado |
| --- | --- |
| Rutina por horario, salida y despertar | Motor independiente y comprobable; abrir no equivale a despertar. Se retira el turno/salida predeterminado a las 15:30. |
| Casillas personales y objetivos de Mi vida | Datos e IDs conservados; acceso opcional en Hoy. Mi vida desaparece del menú. |
| Anillos inspirados en Fitness, visibles en `a019395` | Se recupera SVG ligero en Wellness para alimentación, movimiento y descanso. Cada dimensión mide registros confirmados, no salud ni actividad detectada. |
| Barras globales, por proyecto y etapa en `76ce550` | Se recuperan pistas finas accesibles y actualización desde actividades, etapas y grupos hasta el portafolio. |
| Checklists técnicos anteriores y evidencia | Se conservan; las referencias documentadas antes desconectadas tienen un desplegable de lectura, sin sumarse a completados. |
| Notas, importación/exportación y revisión | Conservadas. La importación valida el horario habitual antes de modificar el estado. |
| Calendario semanal | Conservado y actualizado al cambiar el día. No se encontró un Gantt implementado: existe como pendiente del proyecto Slider Bros. |
| Gráficas históricas | Los anillos anteriores no tenían una historia fechada real. Se añade una serie de 7/14 días usando únicamente marcas `daily-AAAA-MM-DD-*`; no se fechan retrospectivamente marcas antiguas. |

Referencia recuperable: `backup/pre-day-director-20261108`, commit `f7c3927b96a9c7edb234bd5ab43067a098f191ce`, y bundle completo fuera del checkout. No hay migración de datos.

## Motor contextual

`day-director.js` es puro: recibe hora local, configuración de hoy y ayer, registros explícitos, prioridad profesional y objetivos existentes. Devuelve una recomendación, hasta dos siguientes y, cuando procede, una prioridad profesional. No escribe almacenamiento ni crea tareas.

Orden de decisión: turno/traslado configurados; compromiso inminente; recuperación tras un turno conocido; noche; cuidados según la hora o un despertar confirmado; proyectos; objetivos opcionales. La entrada y el traslado permiten derivar la salida. Una salida explícita se respeta; no se inventa duración de traslado, inicio ni fin del turno. La última media hora se reserva para preparación; con menos de una hora no se ofrece un bloque profesional largo. Se contempla un turno de ayer que cruza medianoche.

Sin horarios, las franjas de mañana, comida, movimiento y cierre son **heurísticas de recomendación**, no citas. Avanzar de franja no marca completados. No hay sensores ni inferencia de comidas o sueño. Las marcas verificadas evitan sugerencias ya confirmadas. Los objetivos de escritura y vínculos provienen de datos existentes. No se encontraron deadlines estructurados ni calendarios conectados; no se convierten textos o notas ambiguas en compromisos.

Recalcula al abrir, navegar, volver a la pestaña, recibir cambios de otra pestaña y cada minuto mientras está visible. Los modelos iguales conservan su DOM. Al cambiar el día se actualizan calendario, IDs diarios y Wellness. Los controles en edición y el foco/scroll se preservan.

Los horarios son opcionales en Más. Se puede guardar voluntariamente un horario habitual para el mismo día de la semana, sin copiarlo a otros días por suposición. `weeklySchedule` se guarda en el mismo estado local; las excepciones de `daily` tienen precedencia, incluido un día sin turno. Los respaldos antiguos no borran una preferencia habitual que no contienen.

## Progreso

Los datos originales, tareas, etapas, pesos, estimaciones y evidencia se compararon con `f7c3927` y se conservaron exactamente.

- Checklists: suma de pesos de actividades confirmadas / suma de pesos disponibles; se deduplican IDs. Las etapas técnicas de Denbou que tenían una base manual conservan esa base y su regla de avance.
- Proyecto integrado: mantiene sus diez etapas, agrupadas en cinco áreas. La media de actividades ajusta el porcentaje manual original de cada etapa mediante la calibración existente; cambiar a una media simple reiniciaría las estimaciones y se evita.
- Etapas/grupos/proyectos: agregación ponderada. Una actividad desconocida no se sustituye silenciosamente por cero. Si falta una estimación requerida, el resultado es `Sin estimación`; una lista vacía o peso total cero tampoco producen 0% ficticio.
- Portafolio: se conserva la asignación existente 70% Callejero + Denbou y 30% Torre Fuerte. Callejero no se vuelve a contar por separado; proyectos en espera no entran en ese promedio. No se promedian indiscriminadamente todos los proyectos.
- Los sliders y casillas actualizan cifras y barras de actividad/etapa, área, proyecto, directorio y portafolio. Los filtros no alteran el alcance del porcentaje.

Los porcentajes manuales siguen identificados como estimaciones, no certificaciones de producción. Las referencias documentales no cuentan como entregables completados.

## Wellness

`wellness-model.js` calcula tres dimensiones, únicamente a partir de claves diarias explícitas:

- Alimentación: desayuno y comida, dos registros posibles de la rutina existente.
- Movimiento: un registro de movimiento, sin pasos, calorías ni duración inferida.
- Descanso: un registro de descanso, sin calcular horas dormidas.

Un anillo expresa registros confirmados de hoy respecto de esas referencias, no una puntuación de bienestar. Una marca falsa significa «no confirmado»; una clave ausente significa «sin información». Si una dimensión no tiene registros, no se dibuja progreso y se muestra `Sin datos`. Un registro parcial se indica expresamente.

La evolución utiliza fechas locales, excluye días futuros y conserva huecos sin unirlos como si hubiera datos. Solo aparece cuando alguna dimensión tiene observaciones en al menos dos días distintos. Hay valores por fecha como alternativa accesible. Cambiar entre 7/14 días afecta la historia; el resumen sigue indicando «Registros de hoy». Los datos antiguos sin fecha permanecen accesibles y no se usan para inventar tendencias.

## Sistema visual y pruebas

Plus Jakarta Sans variable local con SIL OFL 1.1. Lectura 18 px, 20 px en escritorio amplio; secundarios 16 px; navegación móvil 14–16 px para cuatro destinos desde 320 px. Escala y colores basados en Denbou, controles ≥48 px y movimiento reducido. Hoy usa tipografía y divisores sobre el fondo, sin listas visibles de casillas. Proyectos recupera barras finas; Wellness usa anillos funcionales y una sola gráfica histórica, sin tarjetas anidadas.

Las pruebas cubren apertura pasiva, ausencia de escrituras al avanzar el tiempo, rutinas verificadas, compromisos inminentes, traslados, recuperación, turno nocturno, fin de día, preferencias habituales, sincronización entre pestañas, todos los proyectos, filtros, progreso jerárquico, estimaciones desconocidas, importación, errores de escritura, Wellness real/vacío, nueve anchos y ampliación CSS al 200%. Axe comprueba las vistas, detalles y gráficos con registros. No hay build, lint ni typecheck configurados; se valida sintaxis y se sirven los archivos directamente. Chromium y simulación de tamaños de iPhone no equivalen a Safari o iPhone físicos.
