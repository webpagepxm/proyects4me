(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TorreModel = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const stages = ['Recepción', 'Inspección', 'Diagnóstico', 'Cotización', 'Autorización', 'Reparación', 'Revisión final', 'Lista para entregar', 'Entregada'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const initial = {
    date: '2026-11-10', garageActive: false, chatStep: 0, sequence: 1045, personalSequence: 1,
    customers: [
      { id: 'carlos', name: 'Carlos Hernández', initials: 'CH', bikeId: 'ft150', since: 'Junio 2026' },
      { id: 'ana', name: 'Ana López', initials: 'AL', bikeId: 'honda', since: 'Marzo 2026' },
      { id: 'luis', name: 'Luis Martínez', initials: 'LM', bikeId: 'vento', since: 'Agosto 2026' },
      { id: 'lucia', name: 'Lucía Ruiz', initials: 'LR', bikeId: 'yamaha', since: 'Octubre 2026' }
    ],
    bikes: [
      { id: 'ft150', customerId: 'carlos', model: 'Italika FT150', year: 2023, km: 18450, plate: 'DEMO-01', nextReview: true },
      { id: 'honda', customerId: 'ana', model: 'Honda Cargo 150', year: 2022, km: 24600, plate: 'DEMO-02', nextReview: false },
      { id: 'vento', customerId: 'luis', model: 'Vento Crossmax 200', year: 2024, km: 8200, plate: 'DEMO-03', nextReview: true },
      { id: 'yamaha', customerId: 'lucia', model: 'Yamaha YBR 125', year: 2021, km: 31900, plate: 'DEMO-04', nextReview: false }
    ],
    staff: [
      { id: 'owner', name: 'Miguel Torres', role: 'Dueño / Administración', initials: 'MT', present: true },
      { id: 'miguel', name: 'Miguel', role: 'Mecánico', initials: 'M', present: true },
      { id: 'elena', name: 'Elena', role: 'Mecánica', initials: 'E', present: true },
      { id: 'sofia', name: 'Sofía', role: 'Recepción', initials: 'S', present: false }
    ],
    orders: [
      { id: 'TF-1042', bikeId: 'ft150', mechanicId: 'miguel', stage: 2, symptoms: 'Cambio de aceite y revisión de frenos solicitados por Carlos.', diagnosis: 'Inspección de freno delantero y condición del aceite. Diagnóstico de ejemplo.', work: 'Cambio de aceite y ajuste de frenos', authorized: false, parts: [{ id: 'oil', qty: 1 }, { id: 'pads', qty: 1 }], labor: 260, deposit: 200, observations: [], events: [{ label: 'Recepción registrada', time: '09:10' }, { label: 'Inspección realizada', time: '09:25' }, { label: 'En diagnóstico', time: '09:40' }] },
      { id: 'TF-1043', bikeId: 'honda', mechanicId: 'elena', stage: 7, symptoms: 'Servicio general.', diagnosis: 'Revisión de transmisión y aceite, sin observaciones adicionales.', work: 'Servicio general y lubricación', authorized: true, parts: [{ id: 'oil', qty: 1 }], labor: 510, deposit: 650, observations: ['Revisión final terminada.'], events: [{ label: 'Lista para entregar', time: '09:45' }] },
      { id: 'TF-1044', bikeId: 'vento', mechanicId: 'miguel', stage: 5, symptoms: 'Revisar transmisión.', diagnosis: 'Cadena pendiente de sustitución.', work: 'Cambio de kit de transmisión', authorized: true, parts: [{ id: 'chain', qty: 1 }], labor: 300, deposit: 200, partsPending: true, observations: [], events: [{ label: 'Refacción pendiente', time: '10:00' }] }
    ],
    services: [
      { id: 's1', bikeId: 'ft150', date: '2026-10-12', title: 'Cambio de aceite', verified: true, eligible: true, km: 17500 },
      { id: 's2', bikeId: 'ft150', date: '2026-08-18', title: 'Revisión de frenos', verified: true, eligible: true, km: 15800 },
      { id: 's3', bikeId: 'ft150', date: '2026-06-04', title: 'Revisión general', verified: false, eligible: false, km: 14200 },
      ...['2026-03-03', '2026-05-12', '2026-07-20', '2026-10-02'].map((date, i) => ({ id: 'ana-' + i, bikeId: 'honda', date, title: 'Servicio de mantenimiento', verified: true, eligible: true, km: 20000 + i * 1000 })),
      { id: 'luis-1', bikeId: 'vento', date: '2026-08-11', title: 'Revisión inicial', verified: true, eligible: true, km: 4200 }
    ],
    appointments: [
      { id: 'a1', customerId: 'ana', bikeId: 'honda', date: '2026-11-10', time: '12:30', type: 'Entrega', mechanicId: 'elena', source: 'Recepción', status: 'Confirmada' },
      { id: 'a2', customerId: 'lucia', bikeId: 'yamaha', date: '2026-11-12', time: '10:00', type: 'Revisión general', mechanicId: 'elena', source: 'Recepción', status: 'Confirmada' }
    ],
    inventory: [
      { id: 'oil', name: 'Aceite para motor · ejemplo', category: 'Lubricantes', stock: 12, min: 4, cost: 140 },
      { id: 'pads', name: 'Balatas delanteras · ejemplo', category: 'Frenos', stock: 3, min: 4, cost: 180 },
      { id: 'chain', name: 'Kit de transmisión · ejemplo', category: 'Transmisión', stock: 0, min: 2, cost: 420 },
      { id: 'plug', name: 'Bujía · ejemplo', category: 'Encendido', stock: 8, min: 3, cost: 65 }
    ],
    transactions: [
      { id: 'tx1', orderId: 'TF-1042', label: 'Anticipo · TF-1042', amount: 200, method: 'Efectivo', time: '09:10', type: 'deposit' },
      { id: 'tx2', orderId: 'TF-1043', label: 'Cobro · TF-1043', amount: 650, method: 'Tarjeta', time: '09:45', type: 'payment' },
      { id: 'tx3', orderId: 'TF-1044', label: 'Anticipo · TF-1044', amount: 200, method: 'Transferencia', time: '10:00', type: 'deposit' },
      { id: 'tx4', label: 'Insumos de limpieza', amount: -90, method: 'Efectivo', time: '10:10', type: 'expense' }
    ],
    activity: [{ label: 'Honda Cargo lista para entregar', time: '09:45', orderId: 'TF-1043' }, { label: 'Refacción pendiente · TF-1044', time: '10:00', orderId: 'TF-1044' }],
    notifications: []
  };
  class Demo {
    constructor() { this.reset(); }
    reset() { this.state = clone(initial); return this.state; }
    customer(id) { return this.state.customers.find(x => x.id === id); }
    bike(id) { return this.state.bikes.find(x => x.id === id); }
    order(id) { return this.state.orders.find(x => x.id === id); }
    staff(id) { return this.state.staff.find(x => x.id === id); }
    history(bikeId) { return this.state.services.filter(x => x.bikeId === bikeId).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)); }
    visits(bikeId) { return this.history(bikeId).filter(x => x.eligible && x.verified).length; }
    total(order) { return order.labor + order.parts.reduce((n, p) => n + this.state.inventory.find(x => x.id === p.id).cost * p.qty, 0); }
    balance(order) { return Math.max(0, this.total(order) - order.deposit); }
    metrics() {
      const orders = this.state.orders;
      return { inShop: orders.filter(o => o.stage < 8).length, ready: orders.filter(o => o.stage === 7).length, pending: orders.filter(o => o.stage < 7).length, appointments: this.state.appointments.filter(a => a.date === this.state.date).length, receivable: orders.reduce((n, o) => n + this.balance(o), 0) };
    }
    log(label, orderId) { this.state.activity.unshift({ label, orderId, time: 'Ahora · demo' }); }
    ensureAppointment() {
      this.state.chatStep = 4;
      if (!this.state.appointments.some(a => a.id === 'carlos-whatsapp')) {
        this.state.appointments.push({ id: 'carlos-whatsapp', customerId: 'carlos', bikeId: 'ft150', date: '2026-11-10', time: '11:00', type: 'Cambio de aceite y revisión de frenos', mechanicId: 'miguel', source: 'Mi Garaje / WhatsApp simulado', status: 'Solicitud registrada' });
        this.log('Nueva solicitud de Carlos · 11:00', 'TF-1042');
      }
    }
    chatNext() { this.state.chatStep = Math.min(4, this.state.chatStep + 1); if (this.state.chatStep === 4) this.ensureAppointment(); }
    assign(orderId, staffId) {
      const order = this.order(orderId), person = this.staff(staffId);
      if (!order || !person || !['miguel', 'elena'].includes(staffId)) return false;
      if (order.mechanicId === staffId) return true;
      order.mechanicId = staffId; this.log(orderId + ' asignada a ' + person.name, orderId); return true;
    }
    advance(orderId) {
      const order = this.order(orderId);
      if (!order || order.stage >= 8 || (order.stage === 7 && this.balance(order) > 0) || (order.stage === 5 && order.partsPending)) return false;
      order.stage++;
      if (order.stage >= 5) order.authorized = true;
      order.events.push({ label: stages[order.stage] + ' · simulación', time: 'Ahora' });
      this.log(orderId + ' · ' + stages[order.stage], orderId);
      if (order.stage === 7) this.completeService(order);
      return true;
    }
    completeService(order) {
      if (this.state.services.some(s => s.orderId === order.id)) return;
      this.state.services.push({ id: 'service-' + order.id, orderId: order.id, bikeId: order.bikeId, date: this.state.date, title: order.work, verified: true, eligible: true, km: this.bike(order.bikeId).km });
      this.bike(order.bikeId).nextReview = false;
      order.parts.forEach(p => { const item = this.state.inventory.find(x => x.id === p.id); item.stock = Math.max(0, item.stock - p.qty); });
      this.state.notifications.push({ id: 'ready-' + order.id, orderId: order.id, label: 'Borrador listo · ' + order.id });
    }
    prepareRepair() {
      this.ensureAppointment(); this.assign('TF-1042', 'miguel');
      const o = this.order('TF-1042'); while (o.stage < 5) this.advance(o.id);
    }
    finish(orderId) {
      const order = this.order(orderId);
      if (!order || order.stage < 5 || order.partsPending) return false;
      while (order.stage < 7) { if (!this.advance(orderId)) return false; }
      return true;
    }
    observe(orderId) {
      const order = this.order(orderId), text = 'Revisión de frenos realizada; ajuste y prueba final registrados como ejemplo.';
      if (order && !order.observations.includes(text)) { order.observations.push(text); this.log('Observación de taller · ' + orderId, orderId); }
    }
    receivePart(orderId) {
      const order = this.order(orderId); if (!order || !order.partsPending) return false;
      order.partsPending = false; order.parts.forEach(p => { this.state.inventory.find(x => x.id === p.id).stock += p.qty; });
      this.log('Recepción de refacción simulada · ' + orderId, orderId); return true;
    }
    pay(orderId, method) {
      const order = this.order(orderId); if (!order || !['Efectivo', 'Tarjeta', 'Transferencia'].includes(method)) return false;
      const amount = this.balance(order); if (!amount) return false;
      order.deposit += amount;
      this.state.transactions.unshift({ id: 'pay-' + order.id, orderId, label: 'Cobro · ' + orderId, amount, method, time: 'Ahora', type: 'payment' });
      this.log('Pago simulado · ' + orderId, orderId); return true;
    }
    newOrder(bikeId) {
      const bike = this.bike(bikeId); if (!bike) return null;
      const active = this.state.orders.find(o => o.bikeId === bikeId && o.stage < 8); if (active) return { id: active.id, created: false };
      const id = 'TF-' + this.state.sequence++;
      this.state.orders.unshift({ id, bikeId, mechanicId: 'miguel', stage: 0, symptoms: 'Solicitud de revisión general · ejemplo.', diagnosis: 'Pendiente de inspección.', work: 'Revisión general', authorized: false, parts: [], labor: 250, deposit: 0, observations: [], events: [{ label: 'Recepción simulada', time: 'Ahora' }] });
      this.log('Nueva orden simulada · ' + id, id); return { id, created: true };
    }
    updateKm(value) {
      const n = Number(value), bike = this.bike('ft150');
      if (!Number.isInteger(n) || n < bike.km || n > 999999) return false;
      bike.km = n; return true;
    }
    personalService(title) {
      if (!['Limpieza y lubricación', 'Revisión de presión de llantas', 'Cambio de aceite personal'].includes(title)) return false;
      this.state.services.push({ id: 'personal-' + this.state.personalSequence++, bikeId: 'ft150', date: this.state.date, title, verified: false, eligible: false, km: this.bike('ft150').km }); return true;
    }
  }
  return { Demo, stages };
});
