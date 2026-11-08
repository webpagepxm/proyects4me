# Roadmap · diseño sereno

Referencia examinada: `webpagepxm/callejero-backstage`, `DESIGN.md` y módulos `tokens`, `base`, `layout`, `components` y `responsive`. Denbou se consultó en una copia de referencia sin modificar sus archivos. La fuente variable original se distribuye localmente con la licencia SIL OFL 1.1 en `fonts/OFL.txt`.

## Decisiones

- Una familia: Plus Jakarta Sans 200–800, con fallback de sistema. Cuerpo y controles 18 px, y 20 px en escritorio amplio; información secundaria 16 px; secciones 26–28 px; títulos 36–48 px. No hay reducción general de tipografía en móvil. Campos de formulario ≥18 px. La navegación inferior conserva 14–16 px para que sus cuatro destinos quepan desde 320 px.
- Fondo #101114, superficie #1C1E23, texto #F5F5F7, secundario #B5B7BF y lima #C4F54C reservada para la acción recomendada, selección y foco de navegación. El foco de teclado utiliza cian.
- Un único CSS consolidado, sin capas del universo anterior ni overrides históricos. Se retiraron órbitas, objetos 3D, anillos, sombras táctiles, fuentes display y progreso visual duplicado. Las filas y desplegables comparten fondo: no hay tarjetas anidadas.
- Hoy abre con la siguiente acción, pregunta de despertar cuando corresponde, cuidados y agenda abierta. Salida y turno se editan directamente, sin desplegables adicionales. La misión profesional aparece después. En horario nocturno se ofrecen lectura y descanso; no se muestran pendientes profesionales.
- Proyectos presenta seis filas con progreso discreto y su estado existente. Cada fila abre el detalle individual con su siguiente tarea, hitos, etapas, evidencia y herramientas de respaldo. La búsqueda incluye tareas de los checklists anteriores. El portafolio estimado queda en Proyectos, fuera de Hoy.
- Mi vida muestra los cuidados, vínculos y lista de hábitos. Más conserva semana, notas y respaldos. No se añadió backend, servicio externo ni dependencia de producción.
- Acciones frecuentes ≥48 px, etiquetas de checkbox de al menos 56 px de alto; hover, active, focus y disabled. Transiciones de 180 ms y soporte de movimiento reducido. Los cambios de estado conservan foco, scroll y desplegables abiertos.

## Compatibilidad y comprobación

Se conservan `mi-tablero-personal-v1`, IDs, estados, datos iniciales y fórmulas de progreso. El grupo integrado sigue usando estimaciones manuales; las tareas técnicas mantienen sus marcas por separado. Los controles deshacen la acción y muestran un error si falla una escritura. La búsqueda ya no recalcula el porcentaje de un área usando solo las etapas que coinciden: conserva siempre su alcance ponderado completo.

Las suites `roadmap-smoke` y `roadmap-time-aware` mantienen las verificaciones de datos, progreso, importación y horarios; sus expectativas de títulos y textos se adaptaron al nuevo diseño. Las pruebas de navegador añaden la visibilidad obligatoria de la rutina, cinco escenarios horarios, preservación de foco/scroll, filtros, nueve tamaños y ampliación CSS al 200% con viewport equivalente de escritorio. Se ejecutó axe sobre las vistas y detalles expandidos. Estas pruebas no constituyen una revisión manual exhaustiva de accesibilidad ni pruebas en iPhone físico.

No se encontró Gantt en la aplicación previa. La planificación semanal y el horario recomendado siguen disponibles. La licencia de fuente y su archivo se conservan sin modificaciones.

Referencia recuperable anterior: `backup/pre-denbou-20261108`, commit `76ce550cddb55f899b3b530e91e4d9291d968f6b`, y bundle completo fuera del checkout. Revertir un cambio publicado con `git revert`, sin forzar el historial ni restablecer datos del navegador.
