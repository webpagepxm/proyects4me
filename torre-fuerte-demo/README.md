# Torre Fuerte · El taller conectado

Prototipo comercial independiente dentro de `webpagepxm/proyects4me`. No utiliza ni modifica el repositorio original de Torre Fuerte. Roadmap conserva sus archivos, navegación y almacenamiento.

## Abrir la demo

La entrada es **`torre-fuerte-demo/index.html`**. Servida desde la raíz del sitio, su ruta es **`/torre-fuerte-demo/`**. Con la base habitual de GitHub Pages de este repositorio, la ruta es **`/proyects4me/torre-fuerte-demo/`**. No necesita compilación, configuración de entorno ni servicios. No abrir mediante `file://`: usar un servidor estático.

El directorio contiene un `index.html` real y todas las rutas internas usan fragmentos, por ejemplo `#/garage` y `#/order/TF-1042`. No depende de rewrites ni de un dominio específico. Los assets y la fuente se resuelven de forma relativa, incluso bajo el prefijo de Pages.

**El código preparado no acredita una publicación.** El flujo habitual del repositorio publica desde `main`; verificar su deployment antes de anunciar disponibilidad pública. No hay despliegue propio ni configuración externa añadida por esta demo.

## Presentar en cinco minutos

1. Abrir la entrada y pulsar **Explorar una historia** (botón de reproducción en móvil).
2. En Mi Garaje, pulsar **Agendar en Torre Fuerte**.
3. Avanzar la conversación simulada. **Registrar cita y seguir** también completa los mensajes y crea la misma solicitud, sin duplicarla.
4. En el taller, abrir el expediente de la Italika, comprobar a Carlos y asignar a Miguel. **Asignar a Miguel y seguir** prepara la reparación con autorización de ejemplo.
5. En la vista del mecánico, abrir TF-1042, añadir una observación y **Simular revisión y terminar**. El botón del recorrido también puede ejecutar esos pasos.
6. Ver el seguimiento del cliente: moto lista, historial actualizado y tres visitas elegibles. **Ver cierre** muestra el final editorial.

**Anterior** vuelve a la escena previa conservando los avances; no reproduce una reparación hacia atrás. Repetir una escena no duplica servicios, consumo de refacciones ni visitas. **Salir** cierra el recorrido y conserva el escenario. **Reiniciar** restaura todo el estado ficticio sin recargar ni tocar Roadmap. Comenzar una historia nueva también restaura el escenario.

El selector de perspectiva permite cambiar entre sitio público, Mi Garaje, Torre Fuerte OS y mecánico desde cualquier vista. Es un control de presentación, no un sistema de permisos.

## Pantallas y acciones

- **Sitio público:** servicios provisionales, explicación, Mi Garaje gratuito, seguimiento, Club y contacto sin datos inventados del negocio. Registro simulado con un perfil fijo del escenario.
- **Mi Garaje:** Italika FT150 de Carlos Hernández, kilometraje editable de ejemplo, historial con procedencia, mantenimiento personal, Club, tarjeta con QR decorativo y seguimiento TF-1042.
- **Taller:** tablero, órdenes, CRM con búsqueda y perfiles, expedientes de motos, agenda hoy/semana, conversación simulada, equipo y asistencia, caja e inventario ligero.
- **Mecánico:** trabajos asignados a Miguel, observaciones y reparación. Sin precios, cobros ni indicadores financieros en sus pantallas. Las órdenes ajenas muestran un estado de no asignación.
- **Presentación:** cinco escenas conectadas y cierre, controles anterior/siguiente/salir/reiniciar y progreso visible.

La agenda usa una fecha fija, **10 noviembre 2026**, identificada como escenario. La solicitud de WhatsApp se sitúa el día anterior; “mañana” corresponde a esa fecha. Nombres, placas, precios MXN, servicios, horarios, beneficios y datos de operación son ficticios. Miguel Torres (administrador) y Miguel (mecánico) son dos perfiles ficticios distintos.

## Comportamiento compartido

`model.js` centraliza clientes, motos, empleados, órdenes, servicios, citas, movimientos, inventario y notificaciones. Las pantallas calculan sus indicadores desde ese estado; no contienen copias independientes del caso.

TF-1042 pasa por recepción, inspección, diagnóstico, cotización, autorización, reparación, revisión final, lista para entregar y entregada. Al terminar la revisión, se agrega un servicio verificado de ejemplo, una visita elegible y un borrador de aviso; se descuentan las refacciones una sola vez. La entrega exige saldo cero. Una refacción pendiente bloquea la finalización hasta simular su recepción. Los registros personales nunca se verifican ni suman visitas al Club. La moto ya atendida conserva acceso a solicitar una futura revisión; no se inventa un intervalo mecánico universal.

Los pagos simulados liquidan el saldo de una orden con un método de ejemplo y actualizan caja. Crear otra orden para una moto con trabajo activo abre la existente. El kilometraje no puede disminuir. La asistencia solo cambia el estado del escenario.

## Límites y privacidad

Todo vive **en memoria de esta pestaña**. Recargar restaura los fixtures. No se escribe en localStorage, sessionStorage, cookies ni almacenamiento de Roadmap. No hay backend, autenticación, IA, analítica, notificaciones del sistema, pagos, cuentas, APIs ni solicitudes fuera del origen del sitio.

No hay campos para capturar nombres, teléfonos, direcciones ni datos de pago reales. Los formularios seleccionan fixtures o modifican un kilometraje numérico. Las conversaciones y avisos preparados **no se envían**. El QR es una composición decorativa, no escaneable, sin payload. La evidencia de órdenes es un marcador ficticio; no se presentan fotografías inexistentes.

La arquitectura futura WhatsApp Business Platform → automatización → CRM → orden aparece únicamente en una explicación opcional. n8n, Groq y Supabase se mencionan como posibilidades futuras y no están integrados.

## Diseño y licencias

JavaScript, HTML y CSS sin dependencias de producción. Fuente local **Plus Jakarta Sans**, existente en `../fonts/`, con licencia [SIL OFL 1.1](../fonts/OFL.txt). Paleta cálida, acento naranja oscurecido para contraste, escala amplia y metadatos operativos legibles. SVG de marca, iconos e ilustración originales de este prototipo; no representan una identidad oficial verificada ni una reproducción exacta de la Italika FT150. No hay imágenes o código copiados de productos de referencia.

Navegación móvil de cinco entradas, controles de 44 px o más, foco visible, diálogo nativo con Escape, leyenda de demo visible arriba, safe areas y reducción de movimiento. Pruebas de Chromium con emulación de tamaños; no equivalen a validar Safari ni un iPhone/Android físico. No se implementa una PWA instalable ni uso sin conexión.

## Validar

Desde la raíz del repositorio:

```sh
node --check torre-fuerte-demo/model.js
node --check torre-fuerte-demo/demo.js
node torre-fuerte-demo/tests/model.cjs
python3 -m http.server 8004 --bind 127.0.0.1
```

En otra terminal, con Playwright 1.56.1, Chromium y `@axe-core/playwright` 4.11.0 instalados fuera del checkout:

```sh
NODE_PATH=/workspace/roadmap-tools/node_modules node torre-fuerte-demo/tests/browser.cjs
```

Se puede configurar `TORRE_TEST_URL`, `CHROMIUM_PATH` y `TORRE_ARTIFACT_DIR`. El navegador verifica las 24 vistas a 375, 390, 430, 768, 1280 y 1440 px; ejecuta axe WCAG A/AA a 390 y 1440 px; recorre toda la historia en ancho iPhone; comprueba controles, formularios, estado compartido, cobro, registro, búsqueda, reinicio, foco, movimiento reducido, recursos y aislamiento de almacenamiento. Funciona también con `TORRE_TEST_URL` bajo `/proyects4me/` para comprobar la base de Pages. Las pruebas existentes de Roadmap se ejecutan por separado, sin modificarlas.

Para retirar únicamente la demo, eliminar este directorio y su workflow específico. No hace falta migrar datos ni revertir archivos de Roadmap.
