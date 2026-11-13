# Agencia — estándar de calidad para software desarrollado con IA
**Fecha:** 13 de noviembre de 2026
**Estado:** política propuesta y tareas pendientes. No representa una auditoría ejecutada.

## Decisión
Codex y vibe coding pueden generar gran parte de las soluciones, pero cada entrega debe demostrar funcionamiento y seguridad. El siguiente gasto prioritario no es necesariamente subir de plan Codex: primero pruebas, CI, controles de datos y revisión humana según riesgo.

## Quality Gate mínimo
1. Git, revisiones de cambios y reversión verificable.
2. Playwright para flujos críticos y pruebas de regresión.
3. GitHub Actions con controles obligatorios antes de publicar.
4. Autenticación/autoridades, RLS, privacidad y secretos protegidos.
5. Entornos de prueba separados de producción.
6. Backups de datos y pruebas de restauración.
7. Monitoreo, alertas y responsables ante incidentes.
8. Pruebas de carga y concurrencia (k6) según el negocio.
9. Pruebas en móviles y red intermitente.
10. Documentación, soporte, contratos y propiedad/exportación de datos.
11. Revisión humana independiente antes de sistemas críticos de cobro, acceso o información sensible.

## Torre Fuerte — nuevas pruebas en la barra existente
- [ ] Solicitud web → registro → folio → Ops → WhatsApp; solicitud distinta de confirmación.
- [ ] Regresión de clientes, motos, órdenes, desglose y PDF.
- [ ] RLS, roles, secretos y aislamiento.
- [ ] Backups, restauración y rollback.
- [ ] Android físico, red intermitente, monitoreo y alertas.
- [ ] CI y protocolo de soporte.
**Objetivo:** cerrar V1 sin ampliaciones innecesarias.

## Callejero PXM + Denbou — nuevas pruebas en la barra existente
- [ ] RLS entre organizadores y RPs.
- [ ] Playwright y CI sobre login, eventos, registros, consulta y finanzas.
- [ ] Backup y restauración.
- [ ] Entornos y rollback.
- [ ] Monitoreo y alertas.
- [ ] Carga con k6, prueba móvil real y consentimiento adecuado.
**Objetivo:** validar lo que ya se construyó antes de expandir alcance.

## Sistema de boletaje Denise — iniciativa separada
Landing propia + Mercado Pago Checkout Pro procesa el pago en la cuenta de Denise; el sistema propio administra inventario, confirma pagos verificando el servidor, webhooks idempotentes, QR únicos y acceso. Probar sobreventa, duplicados, fallos, cancelaciones y recuperación. Escenario de 500 compras simultáneas **por verificar**, nunca capacidad garantizada. No mezclarlo con la barra actual de Callejero.

## Medición y evidencia
Cada tarea nueva inicia sin completar (0% o checklist pendiente); cerrar solo con evidencia. Mantener IDs y marcas anteriores. Los porcentajes históricos son estimaciones manuales, no certificación de QA. Si se amplía el alcance, el denominador puede cambiar.

## Servicio comercial
Separar implementación, mantenimiento mensual y evolución; establecer contrato, soporte y límites. No prometer mantenimiento ilimitado.

## Documentos anexados a repositorios
- https://github.com/webpagepxm/torre-fuerte/blob/main/docs/quality-gate-2026-11-13.md
- https://github.com/webpagepxm/callejero-backstage/blob/main/docs/quality-gate-2026-11-13.md
