/* Torre Fuerte conceptual prototype. No network, storage, or third-party services. */
(() => {
  'use strict';
  const { Demo, stages } = window.TorreModel;
  const demo = new Demo();
  const $ = s => document.querySelector(s);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
  const num = n => new Intl.NumberFormat('es-MX').format(n);
  const date = value => new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(value + 'T12:00:00Z'));
  const paths = {
    home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
    orders: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v4H9ZM9 12h6m-6 4h4"/>',
    clients: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-17a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v2"/>',
    bike: '<circle cx="5" cy="17" r="4"/><circle cx="19" cy="17" r="4"/><path d="m5 17 5-9 6 9H5m11-13h3l-3 4 3 9M8 8h5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5m10-5v5M3 11h18m-13 4h2m4 0h2"/>',
    team: '<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4M4 9a2 2 0 1 0 0 4m16-4a2 2 0 1 1 0 4M2 21v-3m20 3v-3"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 8V5l14-3v4m0 7h4m-4 3h4"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9H4l-3 2 2-6a9 9 0 1 1 18-5Z"/><path d="M7 11h.01m5 0h.01m5 0h.01"/>',
    box: '<path d="m12 2 9 5v10l-9 5-9-5V7Zm0 10v10M3 7l9 5 9-5M7 5l9 5"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13m0-13C2 8 6 0 10 4l2 4Zm0 0c10 0 6-8 2-4l-2 4Z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    play: '<path d="m8 4 12 8-12 8Z"/>',
    reset: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
    wrench: '<path d="M14 5a6 6 0 0 0-7 7L2 17l5 5 5-5a6 6 0 0 0 7-8l-4 4-4-4 3-4Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    shield: '<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z"/><path d="m8 11 3 3 5-6"/>',
    qr: '<path d="M3 3h6v6H3Zm12 0h6v6h-6ZM3 15h6v6H3Zm12 0h3v3h3v3h-6Zm-3-9h.01M12 15h.01M18 12h3M3 12h3"/>',
    pin: '<path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    bars: '<path d="M5 20v-7m7 7V4m7 16V9"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
  const btn = (label, action, value = '', kind = 'secondary', ico = '') => `<button class="btn ${kind}" data-action="${action}"${value !== '' ? ` data-value="${esc(value)}"` : ''}>${ico ? icon(ico) : ''}${label}</button>`;
  const link = (label, route, kind = 'text-link', ico = 'arrow') => `<a class="${kind}" href="#/${route}">${label}${ico ? icon(ico) : ''}</a>`;
  const badge = order => `<span class="badge ${order.stage >= 7 ? 'success' : order.partsPending ? 'warning' : ''}">${esc(order.partsPending ? 'Refacción pendiente' : stages[order.stage])}</span>`;
  const illustration = (cls = '') => `<figure class="moto-art ${cls}"><img src="assets/motorcycle.svg" alt="Ilustración original de una motocicleta urbana en tonos grafito y marfil" width="840" height="460"><figcaption>Ilustración conceptual · No representa el modelo exacto</figcaption></figure>`;
  const avatar = (name, cls = '') => `<span class="avatar ${cls}" aria-hidden="true">${esc(name)}</span>`;
  const title = (eyebrow, h, sub = '', action = '') => `<div class="page-heading"><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${h}</h1>${sub ? `<p class="lead">${sub}</p>` : ''}</div>${action}</div>`;
  const section = (h, content, action = '') => `<section class="section"><div class="section-heading"><h2>${h}</h2>${action}</div>${content}</section>`;
  const empty = text => `<div class="empty">${icon('check')}<p>${text}</p></div>`;
  const stat = (value, label, cls = '') => `<div class="stat ${cls}"><strong>${value}</strong><span>${label}</span></div>`;
  const navItems = [['workshop', 'Inicio', 'home'], ['orders', 'Órdenes', 'orders'], ['clients', 'Clientes', 'clients'], ['bikes', 'Motocicletas', 'bike'], ['agenda', 'Agenda', 'calendar'], ['messages', 'WhatsApp', 'chat'], ['team', 'Trabajadores', 'team'], ['cash', 'Caja', 'wallet'], ['inventory', 'Inventario', 'box'], ['club-admin', 'Fidelización', 'gift']];
  const customerRoutes = ['garage', 'history', 'benefits', 'passport', 'tracking', 'conversation'];
  let route = '', id = '', search = '', agendaWeek = false, storyIndex = -1, toastTimer, returnFocus;
  const storyScenes = [
    ['Mi Garaje', 'Carlos consulta su moto y solicita un servicio en Torre Fuerte.', 'garage'],
    ['Una conversación, una cita', 'Una solicitud simulada conecta Mi Garaje con la agenda del taller.', 'conversation'],
    ['El taller recibe el trabajo', 'La misma moto, el mismo cliente. Abre TF-1042 y asigna a Miguel.', 'workshop'],
    ['Miguel se encarga', 'Consulta el trabajo, registra una observación y termina la reparación.', 'mechanic'],
    ['Carlos sigue conectado', 'Su moto está lista. El historial y el Club se actualizan juntos.', 'tracking']
  ];

  function isOps() { return !customerRoutes.includes(route) && !['landing', 'mechanic', 'mechanic-order', 'final'].includes(route) && !(route === 'messages' && storyIndex === 1); }
  function perspective() { return customerRoutes.includes(route) || (route === 'messages' && storyIndex === 1) ? 'garage' : ['mechanic', 'mechanic-order'].includes(route) ? 'mechanic' : ['landing', 'final'].includes(route) ? 'landing' : 'workshop'; }
  function renderChrome() {
    const current = perspective();
    $('#topbar').innerHTML = `<a class="brand" href="#/landing" aria-label="Torre Fuerte, inicio"><img src="assets/mark.svg" alt="" width="36" height="36"><span>TORRE FUERTE<small>EL TALLER CONECTADO</small></span></a><div class="top-actions"><label class="perspective"><span class="sr-only">Cambiar perspectiva</span><select id="perspective" aria-label="Cambiar perspectiva">${[['landing', 'Sitio del taller'], ['garage', 'Mi Garaje'], ['workshop', 'Torre Fuerte OS'], ['mechanic', 'Mecánico']].map(([value, name]) => `<option value="${value}" ${current === value ? 'selected' : ''}>${name}</option>`).join('')}</select></label><button class="btn primary story-start" data-action="story-start" aria-label="Explorar una historia">${icon('play')}<span>Explorar una historia</span></button></div>`;
    const ops = isOps();
    document.body.classList.toggle('ops', ops);
    document.body.classList.toggle('presenting', storyIndex >= 0);
    $('#sidebar').innerHTML = ops ? `<div class="sidebar-label">ESPACIO DEL TALLER</div><nav aria-label="Navegación del taller">${navItems.map(([r, name, ico], i) => `${i === 6 ? '<div class="nav-divider"></div>' : ''}<a href="#/${r}" ${route === r || (route === 'order' && r === 'orders') || (route === 'client' && r === 'clients') || (route === 'bike' && r === 'bikes') ? 'aria-current="page"' : ''}>${icon(ico)}${name}${r === 'messages' && demo.state.notifications.length ? '<span class="nav-dot" aria-label="Hay un borrador nuevo"></span>' : ''}</a>`).join('')}</nav><div class="sidebar-user">${avatar('MT')}<div>Miguel Torres<small>Administrador · Perfil demo</small></div></div>` : '';
    $('#sidebar').hidden = !ops;
    $('#mobile-nav').innerHTML = ops ? [...navItems.slice(0, 3), navItems[4], ['more', 'Más', 'more']].map(([r, name, ico]) => `<a href="#/${r}" ${route === r || (r === 'orders' && route === 'order') || (r === 'clients' && route === 'client') || (r === 'more' && ['bikes', 'bike', 'team', 'cash', 'messages', 'inventory', 'club-admin'].includes(route)) ? 'aria-current="page"' : ''}>${icon(ico)}<span>${name}</span></a>`).join('') : '';
    $('.demo-legend').innerHTML = `<div>Demo conceptual · Datos de ejemplo<span>Sin conexiones ni operaciones reales</span></div><button class="btn quiet" data-action="reset">${icon('reset')}Reiniciar demo</button>`;
  }

  function landing() {
    return `<div class="public-shell"><div class="landing-meta"><span>TORRE FUERTE / PUERTO ESCONDIDO</span><span>Una nueva forma de cuidar tu moto</span></div><section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="small-line"></span> EL TALLER CONECTADO</p><h1>Tu moto en buenas manos.<br><span>Tu taller, siempre conectado.</span></h1><p class="hero-sub">Servicio, seguimiento y mantenimiento de motocicletas desde un solo lugar.</p><div class="button-row">${link('Conocer Mi Garaje', 'garage', 'btn primary')}${btn('Ver cómo funciona', 'story-start', '', 'secondary', 'play')}</div><p class="hero-note">Tu historial. Tu próxima revisión. Todo más claro.</p></div><div class="hero-visual"><div class="art-label"><span>01 / MI GARAJE</span>${icon('bike')}</div>${illustration()}<div class="preview-slip"><div class="preview-status">${icon('shield')}Siempre a la vista</div><div><strong>Italika FT150</strong><span>Tu próxima revisión, a un paso.</span></div>${link('Abrir Mi Garaje', 'garage', 'icon-link')}</div><div class="visual-caption">MENOS INCERTIDUMBRE. MÁS CAMINO.</div></div></section>
      <section class="landing-band"><span>Del primer mensaje<br>al próximo servicio.</span><p>Un taller conectado sabe qué necesita tu moto.<br>Y tú sabes cómo va, sin tener que preguntar.</p>${btn('Explorar una historia', 'story-start', '', 'dark', 'arrow')}</section>
      <section class="landing-section"><div class="section-intro"><p class="eyebrow">01 / A TU SERVICIO</p><h2>El cuidado está<br>en los detalles.</h2><p>Servicios de ejemplo. El catálogo y las condiciones se confirmarían con el taller.</p></div><div class="service-grid">${[['wrench', 'Mantenimiento', 'Cambio de aceite y revisión general.'], ['shield', 'Frenos y seguridad', 'Inspección y ajustes para tu motocicleta.'], ['bike', 'Diagnóstico', 'Una revisión clara antes de reparar.']].map(([ico, h, p]) => `<article>${icon(ico)}<h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>
      <section class="landing-section steps-section"><div class="section-intro"><p class="eyebrow">02 / ASÍ DE SIMPLE</p><h2>Conectados en<br>cada paso.</h2></div><div class="editorial-steps">${[['01', 'Tu moto tiene un lugar.', 'Mi Garaje es una utilidad gratuita de Torre Fuerte. Consulta su historial y solicita una cita.'], ['02', 'Sabes cómo va.', 'Sigue el diagnóstico, la reparación y la revisión final desde tu teléfono.'], ['03', 'El cuidado continúa.', 'Conserva tus servicios y consulta el Club. Beneficios ilustrativos, sujetos a la configuración del taller.']].map(([n, h, p]) => `<article><span>${n}</span><div><h3>${h}</h3><p>${p}</p></div></article>`).join('')}</div></section>
      <section class="garage-invite"><div><p class="eyebrow">MI GARAJE · POR TORRE FUERTE</p><h2>Tu moto, siempre al día.</h2><p>Un espacio gratuito para su historia y lo que viene después.</p></div>${btn('Registrar mi moto gratis', 'register', '', 'primary', 'arrow')}</section>
      <section class="landing-section contact"><div><p class="eyebrow">HABLEMOS DE TU MOTO</p><h2>Nos vemos en<br>Torre Fuerte.</h2><p>Puerto Escondido, Oaxaca.<br>Dirección, teléfono y horarios por confirmar.</p></div><div><h3>Prueba la conversación.</h3><p>Explora cómo sería agendar con el taller. Esta demostración no envía mensajes ni solicita datos personales.</p>${btn('Simular una cita', 'schedule', '', 'secondary', 'chat')}</div></section><div class="public-bottom"><span>TORRE FUERTE</span><span>Una visión del taller conectado.</span></div></div>`;
  }

  function garageNav(active = 'garage') {
    return `<nav class="garage-nav" aria-label="Mi Garaje">${[['garage', 'Mi moto'], ['history', 'Historial'], ['benefits', 'Club'], ['passport', 'Mi tarjeta']].map(([r, name]) => `<a href="#/${r}" ${r === active ? 'aria-current="page"' : ''}>${name}</a>`).join('')}</nav>`;
  }
  function garage() {
    const bike = demo.bike('ft150'), o = demo.order('TF-1042');
    return `<div class="customer-shell">${title('POR TORRE FUERTE · GRATIS PARA TI', 'Mi Garaje', 'Tu moto, siempre al día.', `<div class="customer-greeting">${avatar('CH')}<span>Carlos Hernández<small>${demo.state.garageActive ? 'Mi Garaje activado · Demo' : 'Perfil de ejemplo'}</small></span></div>`)}${garageNav()}<div class="garage-hero"><div class="garage-art"><span class="bike-year">TU MOTO / ${bike.year}</span>${illustration()}</div><div class="bike-summary"><p class="eyebrow">HOLA, CARLOS</p><h2>${esc(bike.model)}</h2><div class="odometer"><strong>${num(bike.km)}</strong><span>kilómetros registrados</span></div>${btn('Actualizar kilometraje', 'km', '', 'quiet', 'plus')}<div class="maintenance-next"><span class="badge ${bike.nextReview ? 'warning' : 'success'}">${bike.nextReview ? 'Próxima revisión pendiente' : 'Servicio actualizado'}</span><h3>${bike.nextReview ? 'Un buen momento para revisarla.' : 'Lista para seguir tu camino.'}</h3><p>${bike.nextReview ? 'Último servicio: cambio de aceite · 12 octubre.' : 'Cambio de aceite y revisión de frenos registrados en tu historial.'}</p><p class="muted">Consulta el mantenimiento recomendado para tu modelo y uso.</p>${btn('Agendar en Torre Fuerte', 'schedule', '', 'primary', 'calendar')}</div></div></div>
      <div class="customer-next-grid"><a class="feature-row" href="#/tracking"><span class="round-icon">${icon('wrench')}</span><div><span class="eyebrow">TF-1042</span><h3>Así va tu moto</h3><p>${esc(stages[o.stage])}</p></div>${icon('arrow')}</a><a class="feature-row" href="#/benefits"><span class="round-icon">${icon('gift')}</span><div><span class="eyebrow">CLUB TORRE FUERTE</span><h3>El cuidado tiene historia.</h3><p>${demo.visits('ft150')} visitas elegibles en esta demo.</p></div>${icon('arrow')}</a></div>${section('Tu último servicio', historyRows(demo.history('ft150').slice(0, 1)), link('Ver historial', 'history'))}</div>`;
  }
  function historyRows(entries) {
    return `<ol class="service-history">${entries.map(s => `<li><span class="timeline-dot ${s.verified ? 'verified' : ''}">${icon(s.verified ? 'check' : 'wrench')}</span><div><time datetime="${s.date}">${date(s.date)} · ${num(s.km)} km</time><h3>${esc(s.title)}</h3><span class="verification ${s.verified ? 'verified' : ''}">${s.verified ? icon('shield') + 'Verificado por Torre Fuerte' : 'Registrado por mí'}${s.orderId ? ' · ' + esc(s.orderId) : ''}</span></div></li>`).join('')}</ol>`;
  }
  function history() {
    return `<div class="customer-shell narrow">${title('MI GARAJE', 'La historia de tu moto.', 'Italika FT150 · Servicios de ejemplo', btn('Registrar mantenimiento', 'maintenance', '', 'secondary', 'plus'))}${garageNav('history')}${historyRows(demo.history('ft150'))}<p class="footnote">Los registros personales no se verifican por el taller ni suman visitas al Club.</p></div>`;
  }
  function benefitContent(bikeId) {
    const visits = demo.visits(bikeId), count = Math.min(visits, 4);
    return `<div class="club-panel"><p class="eyebrow">CLUB TORRE FUERTE</p><h2>Volver también<br>tiene su recompensa.</h2><div class="loyalty-stamps" role="img" aria-label="${count} de 4 visitas elegibles">${[0, 1, 2, 3].map(n => `<span class="stamp ${n < count ? 'earned' : ''}">${icon(n < count ? 'check' : 'gift')}</span>`).join('')}</div><p><strong>${visits} visitas elegibles</strong> · Meta de ejemplo: 4 servicios.</p><p>${count >= 4 ? 'Beneficio ilustrativo disponible: revisión de cortesía.' : `A ${4 - count} ${4 - count === 1 ? 'servicio' : 'servicios'} de una revisión de cortesía ilustrativa.`}</p><span class="footnote">Mecánica de ejemplo configurable. No es una promoción real.</span></div>`;
  }
  function benefits() { return `<div class="customer-shell narrow">${title('MI GARAJE', 'Tu Club.', 'Para seguir cuidando lo que te mueve.')}${garageNav('benefits')}${benefitContent('ft150')}${section('Lo que sigue', `<div class="next-service"><div><h3>Tu próxima revisión.</h3><p>Consulta el mantenimiento recomendado para tu modelo y uso.</p></div>${btn('Solicitar revisión', 'schedule', '', 'primary', 'calendar')}</div>`)}${section('Tus visitas', historyRows(demo.history('ft150').filter(s => s.eligible)))}</div>`; }
  function passport() {
    return `<div class="customer-shell narrow">${title('MI GARAJE', 'Tu tarjeta, tu historia.', 'Una forma sencilla de reconocer tu moto en el taller.')}${garageNav('passport')}<div class="passport"><div class="passport-brand"><img src="assets/mark.svg" alt="" width="40" height="40"><span>TORRE FUERTE / MI GARAJE</span></div><h2>Italika FT150</h2><p>Carlos Hernández · 2023</p><div class="passport-code"><div class="fake-qr" role="img" aria-label="QR decorativo simulado, no escaneable">${Array.from({ length: 81 }, (_, i) => `<i class="${((i * 7 + Math.floor(i / 9) * 3) % 11 < 5) ? 'ink' : ''}"></i>`).join('')}</div><div><span class="eyebrow">IDENTIFICADOR FICTICIO</span><strong>TF-DEMO-001</strong><p>${demo.history('ft150').filter(s => s.verified).length} servicios verificados<br>${num(demo.bike('ft150').km)} km</p></div></div><p class="footnote">QR simulado · Sin enlace ni datos personales codificados.</p></div>${link('Consultar historial', 'history')}</div>`;
  }
  function tracking() {
    const order = demo.order('TF-1042'), steps = [['Recibida', 0], ['Diagnóstico', 2], ['Reparación', 5], ['Revisión final', 6], ['Lista para entrega', 7]];
    return `<div class="customer-shell tracking-shell">${title('MI GARAJE / TF-1042', 'Así va tu moto', 'Italika FT150 · Carlos Hernández', link('Mi Garaje', 'garage', 'btn secondary', 'bike'))}<div class="tracking-layout"><div><div class="tracking-current"><span class="eyebrow">ESTADO ACTUAL</span><h2>${order.stage >= 7 ? 'Todo listo, Carlos.' : esc(stages[order.stage])}</h2><p>${order.stage >= 7 ? 'Tu Italika ya está lista para entrega en Torre Fuerte.' : 'Cambio de aceite y revisión de frenos. Miguel está a cargo de tu moto.'}</p>${badge(order)}</div><ol class="repair-timeline">${steps.map(([name, threshold], i) => `<li class="${order.stage >= threshold ? 'done' : ''} ${order.stage >= threshold && (i === 4 || order.stage < steps[i + 1][1]) ? 'current' : ''}"><span>${order.stage >= threshold ? icon('check') : i + 1}</span><div><strong>${name}</strong><p>${order.stage >= threshold ? i === 4 ? 'Servicio registrado en tu historial.' : 'Actualización de ejemplo registrada.' : 'Pendiente'}</p></div></li>`).join('')}</ol><p class="footnote">Entrega estimada de ejemplo: 10 noviembre, 17:00. No es una promesa de servicio real.</p></div><aside class="tracking-aside">${illustration()}<div class="tracking-summary"><span class="eyebrow">TU SERVICIO / TF-1042</span><h3>Cambio de aceite<br>y revisión de frenos.</h3><p>Mecánico: ${esc(demo.staff(order.mechanicId)?.name || 'Por asignar')}</p></div>${link('Ver historial actualizado', 'history', 'feature-link', 'orders')}${link(`Club · ${demo.visits('ft150')} visitas elegibles`, 'benefits', 'feature-link', 'gift')}${order.stage >= 7 ? btn('Ver aviso preparado', 'ready-message', '', 'secondary', 'chat') : btn('Consultar conversación', 'customer-chat', '', 'secondary', 'chat')}</aside></div></div>`;
  }

  function orderRows(orders, mechanic = false) {
    return orders.length ? `<div class="order-list">${orders.map(o => {
      const bike = demo.bike(o.bikeId), person = demo.staff(o.mechanicId);
      return `<a class="order-row" href="#/${mechanic ? 'mechanic-order' : 'order'}/${o.id}"><span class="order-bike-icon">${icon('bike')}</span><div class="order-bike"><strong>${esc(bike.model)}</strong><span>${o.id} · ${esc(demo.customer(bike.customerId).name)}</span></div><span class="order-assignee">${esc(person?.name || 'Por asignar')}</span><div class="order-status">${badge(o)}<span>${o.partsPending ? 'Recibir refacción' : o.stage === 8 ? 'Consultar historial' : o.stage === 7 ? 'Preparar entrega' : 'Continuar con ' + stages[o.stage + 1].toLowerCase()}</span></div><span class="row-arrow">${icon('arrow')}</span></a>`;
    }).join('')}</div>` : empty('Sin órdenes para este filtro.');
  }
  function workshop() {
    const m = demo.metrics(), appointment = demo.state.appointments.find(a => a.id === 'carlos-whatsapp');
    return `<div class="workspace">${title('MARTES, 10 NOV · ESCENARIO DE EJEMPLO', 'Buen día, Miguel', 'Así va tu taller hoy.', btn('Nueva orden', 'new-order', '', 'primary', 'plus'))}<div class="metrics">${stat(m.inShop, 'Motos en taller')}${stat(m.ready, 'Listas para entregar', 'green')}${stat(m.pending, 'Órdenes en proceso')}${stat(m.appointments, 'Citas de hoy')}${stat(money(m.receivable), 'Pendiente de cobro', 'currency')}</div>${appointment ? `<div class="notice"><span class="round-icon">${icon('chat')}</span><div><strong>Carlos tiene una solicitud · 11:00</strong><p>Italika FT150 · Cambio de aceite y revisión de frenos.</p></div>${link('Abrir expediente', 'bike/ft150', 'btn secondary')}</div>` : `<div class="notice"><span class="round-icon">${icon('clock')}</span><div><strong>${m.ready} ${m.ready === 1 ? 'moto lista para entregar' : 'motos listas para entregar'}</strong><p>Una revisión final y su historial, a un toque.</p></div>${link('Ver órdenes', 'orders', 'btn secondary')}</div>`}${section('En el taller', orderRows(demo.state.orders.filter(o => o.stage < 8)), link('Todas las órdenes', 'orders'))}<div class="workspace-columns">${section('Próximas citas', appointmentRows(demo.state.appointments.filter(a => a.date === demo.state.date)), link('Agenda', 'agenda'))}${section('Lo que está pasando', activityRows())}</div></div>`;
  }
  function activityRows() { return `<ol class="activity-list">${demo.state.activity.slice(0, 5).map(a => `<li><span class="activity-point"></span><div><p>${esc(a.label)}</p><span>${esc(a.time)}</span></div>${a.orderId ? link('Ver', 'order/' + a.orderId, 'small-link') : ''}</li>`).join('')}</ol>`; }
  function orders() {
    const orders = demo.state.orders.filter(o => `${o.id} ${demo.bike(o.bikeId).model} ${demo.customer(demo.bike(o.bikeId).customerId).name}`.toLowerCase().includes(search.toLowerCase()));
    return `<div class="workspace">${title('OPERACIÓN', 'Órdenes de servicio', 'Cada moto, en su siguiente paso.', btn('Nueva orden', 'new-order', '', 'primary', 'plus'))}${searchInput('Buscar por folio, moto o cliente')}${orderRows(orders)}</div>`;
  }
  function orderDetail(mechanic = false) {
    const order = demo.order(id);
    if (!order) return notFound();
    if (mechanic && order.mechanicId !== 'miguel') return `<div class="workspace mechanic-shell">${title('MI TRABAJO', 'Orden no asignada', 'Esta orden no pertenece a la lista de Miguel.', link('Mis motocicletas', 'mechanic', 'btn secondary', 'back'))}</div>`;
    const bike = demo.bike(order.bikeId), customer = demo.customer(bike.customerId), person = demo.staff(order.mechanicId), current = stages[order.stage];
    return `<div class="workspace ${mechanic ? 'mechanic-shell' : ''}">${link(mechanic ? 'Mis motocicletas' : 'Órdenes', mechanic ? 'mechanic' : 'orders', 'breadcrumb', 'back')}${title(order.id + ' / ' + esc(customer.name), esc(bike.model), `${bike.year} · ${num(bike.km)} km · ${esc(person?.name || 'Sin asignar')}`, badge(order))}${mechanic ? '' : `<ol class="order-pipeline" aria-label="Etapas de la orden">${stages.map((s, i) => `<li class="${i < order.stage ? 'done' : i === order.stage ? 'current' : ''}" ${i === order.stage ? 'aria-current="step"' : ''}><span>${i < order.stage ? icon('check') : i + 1}</span>${s}</li>`).join('')}</ol>`}<div class="order-detail-grid"><div>${section('El trabajo', `<dl class="detail-list"><div><dt>Síntomas reportados</dt><dd>${esc(order.symptoms)}</dd></div><div><dt>Diagnóstico</dt><dd>${esc(order.diagnosis)}</dd></div><div><dt>Trabajo ${order.authorized ? 'autorizado en esta demo' : 'propuesto · autorización pendiente'}</dt><dd>${esc(order.work)}</dd></div></dl>`)}${section('Refacciones', `<div class="parts-list">${order.parts.length ? order.parts.map(p => `<div><span>${esc(demo.state.inventory.find(x => x.id === p.id).name)} <small>× ${p.qty}</small></span>${!mechanic ? `<strong>${money(demo.state.inventory.find(x => x.id === p.id).cost * p.qty)}</strong>` : icon('box')}</div>`).join('') : '<p>Sin refacciones registradas.</p>'}</div>${order.partsPending ? `<p class="warning-text">Refacción pendiente de recibir.</p>${btn('Simular recepción de refacción', 'receive-part', order.id, 'secondary', 'box')}` : ''}`)}${section('Observaciones', `${order.observations.length ? `<ul class="plain-list">${order.observations.map(o => `<li>${esc(o)}</li>`).join('')}</ul>` : '<p class="muted">Sin observaciones adicionales.</p>'}${btn('Añadir observación de ejemplo', 'observe', order.id, 'quiet', 'plus')}`)}${section('Evidencia de demostración', `<div class="evidence">${icon('wrench')}<div><strong>Inspección y revisión final</strong><p>Marcador de evidencia ficticia. No hay fotografías del vehículo ni del taller real.</p></div></div>`)}</div><aside><div class="order-action"><span class="eyebrow">SIGUIENTE PASO</span><h2>${mechanic && order.stage >= 7 ? 'Trabajo terminado.' : mechanic && order.stage < 5 ? 'Esperar autorización.' : order.stage >= 8 ? 'Servicio entregado.' : order.partsPending ? 'Esperando refacción.' : stages[order.stage + 1]}</h2><p>${mechanic && order.stage < 5 ? 'Recepción coordina la autorización antes de reparar. Puedes registrar la inspección como observación.' : order.stage === 7 && demo.balance(order) ? mechanic ? 'Trabajo terminado. Recepción se encarga de la entrega.' : 'Revisa el saldo antes de simular la entrega.' : 'Los cambios se reflejan en toda la demostración.'}</p>${mechanic && order.stage < 5 ? btn('Registrar observación de ejemplo', 'observe', order.id, 'primary', 'plus') : order.stage < 7 ? `${btn(order.stage === 4 ? 'Simular autorización y reparar' : 'Avanzar a ' + stages[order.stage + 1].toLowerCase(), 'advance', order.id, 'primary', 'arrow')}${mechanic && order.stage >= 5 && !order.partsPending ? btn('Simular revisión y terminar', 'finish', order.id, 'secondary', 'check') : ''}` : order.stage === 7 && !mechanic ? `${demo.balance(order) ? btn('Simular cobro', 'payment', order.id, 'primary', 'wallet') : btn('Simular entrega', 'advance', order.id, 'primary', 'check')}${btn('Ver borrador de aviso', 'ready-message', order.id, 'secondary', 'chat')}` : `<span class="badge success">${mechanic ? 'Trabajo terminado' : 'Entrega registrada'}</span>`}${!mechanic && order.stage < 7 ? btn('Asignar mecánico', 'assign', order.id, 'quiet', 'team') : ''}</div>${!mechanic ? section('Cuenta de ejemplo · MXN', `<dl class="money-list"><div><dt>Refacciones</dt><dd>${money(demo.total(order) - order.labor)}</dd></div><div><dt>Mano de obra</dt><dd>${money(order.labor)}</dd></div><div><dt>Total</dt><dd>${money(demo.total(order))}</dd></div><div><dt>Pagado / anticipo</dt><dd>${money(order.deposit)}</dd></div><div class="total"><dt>Saldo</dt><dd>${money(demo.balance(order))}</dd></div></dl>`) : ''}${section('Avances', `<ol class="compact-timeline">${order.events.slice().reverse().map(e => `<li><strong>${esc(e.label)}</strong><span>${esc(e.time)}</span></li>`).join('')}</ol>`)}${!mechanic ? link('Expediente de la moto', 'bike/' + bike.id, 'feature-link', 'bike') : ''}</aside></div></div>`;
  }
  function searchInput(placeholder) { return `<label class="search-field">${icon('search')}<span class="sr-only">${placeholder}</span><input id="search" type="search" autocomplete="off" placeholder="${placeholder}" value="${esc(search)}"></label>`; }
  function clients() {
    const list = demo.state.customers.filter(c => `${c.name} ${demo.bike(c.bikeId).model}`.toLowerCase().includes(search.toLowerCase()));
    return `<div class="workspace">${title('RELACIONES', 'Tus clientes', 'Una historia que continúa después del servicio.')}${searchInput('Buscar cliente o motocicleta')}<div class="client-list">${list.length ? list.map(c => `<a class="client-row" href="#/client/${c.id}">${avatar(c.initials)}<div><strong>${esc(c.name)}</strong><span>${esc(demo.bike(c.bikeId).model)}</span></div><span class="client-visits">${demo.visits(c.bikeId)} visitas elegibles</span>${icon('arrow')}</a>`).join('') : empty('No se encontraron clientes de ejemplo.')}</div></div>`;
  }
  function client() {
    const c = demo.customer(id); if (!c) return notFound();
    const bike = demo.bike(c.bikeId), history = demo.history(bike.id), appointments = demo.state.appointments.filter(a => a.customerId === c.id);
    return `<div class="workspace">${link('Clientes', 'clients', 'breadcrumb', 'back')}${title('CLIENTE DESDE ' + c.since.toUpperCase(), esc(c.name), 'Perfil ficticio · Sin teléfono ni información personal real', c.id === 'carlos' ? link('WhatsApp simulado', 'messages', 'btn primary', 'chat') : btn('Ver contacto de ejemplo', 'contact-example', '', 'secondary', 'chat'))}<div class="profile-summary">${avatar(c.initials, 'large')}${stat(demo.visits(bike.id), 'Visitas elegibles')}${stat(history.filter(s => s.verified).length, 'Servicios del taller')}${stat(demo.visits(bike.id) >= 4 ? '1' : '0', 'Beneficios de ejemplo')}</div><div class="workspace-columns"><div>${section('Su motocicleta', `<a class="feature-row" href="#/bike/${bike.id}"><span class="round-icon">${icon('bike')}</span><div><h3>${esc(bike.model)}</h3><p>${bike.year} · ${num(bike.km)} km</p></div>${icon('arrow')}</a>`)}${section('Servicios realizados', history.length ? historyRows(history) : empty('Aún no hay servicios registrados en el escenario.'))}</div><div>${section('Citas y solicitudes', appointments.length ? appointmentRows(appointments) : empty('Sin solicitudes en este escenario.'))}${section('Club Torre Fuerte', `<h3>${demo.visits(bike.id)} de 4 visitas de ejemplo</h3><p>${demo.visits(bike.id) >= 4 ? 'Revisión de cortesía ilustrativa disponible.' : 'Seguimiento de fidelidad compartido con Mi Garaje.'}</p><p class="footnote">No representa un beneficio real del taller.</p>`)}</div></div></div>`;
  }
  function bikes() { return `<div class="workspace">${title('EXPEDIENTES', 'Cada moto tiene historia.', 'Información de ejemplo, conectada a su cliente.')}<div class="bike-directory">${demo.state.bikes.map(b => `<a class="bike-directory-row" href="#/bike/${b.id}">${icon('bike')}<div><h2>${esc(b.model)}</h2><p>${esc(demo.customer(b.customerId).name)} · ${b.year}</p></div><span>${num(b.km)} km</span>${icon('arrow')}</a>`).join('')}</div></div>`; }
  function bikeDetail() {
    const b = demo.bike(id); if (!b) return notFound();
    const c = demo.customer(b.customerId), orders = demo.state.orders.filter(o => o.bikeId === b.id), active = orders.find(o => o.stage < 8);
    return `<div class="workspace">${link('Motocicletas', 'bikes', 'breadcrumb', 'back')}${title('EXPEDIENTE / ' + b.plate, esc(b.model), `${b.year} · ${num(b.km)} km · Placa ficticia ${b.plate}`, active ? link('Abrir ' + active.id, 'order/' + active.id, 'btn primary', 'orders') : btn('Nueva orden', 'new-order', b.id, 'primary', 'plus'))}<div class="dossier-top"><div class="dossier-art">${illustration()}</div><dl class="detail-list"><div><dt>Propietario</dt><dd>${link(esc(c.name), 'client/' + c.id)}</dd></div><div><dt>Responsable actual</dt><dd>${esc(active ? demo.staff(active.mechanicId)?.name || 'Por asignar' : 'Sin orden activa')}</dd></div><div><dt>Próxima revisión</dt><dd>${b.nextReview ? 'Pendiente de valoración' : 'Consulta el mantenimiento recomendado para el modelo y uso.'}</dd></div></dl></div>${section('Historial de órdenes', orderRows(orders))}<div class="workspace-columns">${section('Servicios realizados', demo.history(b.id).length ? historyRows(demo.history(b.id)) : empty('Sin servicios previos en este escenario.'))}${section('Refacciones y observaciones', orders.map(o => `<article class="dossier-note"><h3>${o.id}</h3><p>${o.parts.map(p => esc(demo.state.inventory.find(x => x.id === p.id).name) + ' × ' + p.qty).join(' · ') || 'Sin refacciones'}</p><p>${o.observations.map(esc).join(' ') || 'Sin observaciones adicionales.'}</p>${o.id === 'TF-1042' ? btn('Asignar a Miguel', 'assign-miguel', o.id, 'secondary', 'team') : ''}</article>`).join(''))}</div></div>`;
  }

  function messages() {
    const messages = [['in', 'Hola, quiero llevar mi Italika mañana para cambio de aceite.', 'Carlos · 16:40'], ['out', 'Claro, Carlos. ¿Te parece a las 11:00?', 'Asistente simulado · 16:40'], ['in', 'Sí, perfecto.', 'Carlos · 16:41'], ['out', 'Tu solicitud quedó registrada en esta demostración.', 'Asistente simulado · 16:41']];
    const ready = demo.order('TF-1042').stage >= 7, customerMode = route === 'conversation';
    return `<div class="workspace messaging-shell">${title('COMUNICACIÓN', 'Una conversación conecta todo.', 'WhatsApp + CRM · Simulación sin envíos')}<div class="messaging-grid"><section class="conversation" aria-label="Conversación ficticia con Carlos"><div class="conversation-head">${avatar('CH')}<div><strong>Carlos Hernández</strong><span>Italika FT150 · Perfil de ejemplo</span></div><span class="badge">Simulación</span></div><div class="chat-body"><p class="chat-day">Solicitud del 9 noviembre · Cita: 10 noviembre</p>${messages.slice(0, demo.state.chatStep).map(([side, text, time]) => `<div class="chat-bubble ${side}"><p>${text}</p><span>${time}</span></div>`).join('')}${demo.state.chatStep === 0 ? `<div class="chat-empty">${icon('chat')}<p>Una cita comienza con un mensaje.</p></div>` : ''}${demo.state.chatStep >= 4 ? `<div class="chat-system">${icon('check')}Solicitud de Carlos registrada · 11:00</div>` : ''}${ready ? `<div class="draft-message"><span class="eyebrow">BORRADOR PREPARADO · NO ENVIADO</span><p>Hola, Carlos. Tu Italika ya está lista para entrega en Torre Fuerte.</p></div>` : ''}</div><div class="chat-controls">${demo.state.chatStep < 4 ? btn(demo.state.chatStep === 0 ? 'Iniciar conversación simulada' : demo.state.chatStep === 3 ? 'Simular registro de cita' : 'Ver siguiente mensaje', 'chat-next', '', 'primary', 'arrow') : `<span>${icon('shield')}Demostración completada. No se envió ningún mensaje.</span>`}</div></section><aside class="conversation-context"><p class="eyebrow">EL MISMO CLIENTE, EN TODO EL TALLER</p><h2>Del mensaje<br>a la operación.</h2><dl class="detail-list"><div><dt>Cliente</dt><dd>Carlos Hernández</dd></div><div><dt>Moto</dt><dd>Italika FT150 · 2023</dd></div><div><dt>Solicitud</dt><dd>${demo.state.chatStep >= 4 ? '10 noviembre · 11:00' : 'Por confirmar en la simulación'}</dd></div></dl>${customerMode ? link('Volver a Mi Garaje', 'garage', 'btn secondary', 'bike') : `${demo.state.chatStep >= 4 ? link('Ver en agenda', 'agenda', 'btn secondary', 'calendar') : ''}${link('Expediente de Carlos', 'client/carlos', 'feature-link', 'clients')}`}<details class="future-architecture"><summary>Visión de la conexión futura</summary><p>WhatsApp Business Platform → Automatización → CRM → Orden de servicio.</p><p>Una implementación futura podría considerar n8n, Groq y Supabase. Ninguno está conectado a esta demo.</p></details></aside></div></div>`;
  }
  function appointmentRows(entries) {
    return entries.length ? `<div class="appointments">${entries.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map(a => `<article class="appointment"><div class="appointment-time"><strong>${a.time}</strong><span>${date(a.date)}</span></div><div><h3>${esc(demo.customer(a.customerId).name)}</h3><p>${esc(a.type)}</p><span>${esc(demo.bike(a.bikeId).model)} · ${esc(demo.staff(a.mechanicId).name)}</span><span class="appointment-source">${esc(a.source)} · ${esc(a.status)}</span></div>${link('Abrir expediente', 'bike/' + a.bikeId, 'icon-link')}</article>`).join('')}</div>` : empty('Sin citas en esta vista.');
  }
  function agenda() {
    const entries = demo.state.appointments.filter(a => agendaWeek || a.date === demo.state.date);
    return `<div class="workspace">${title('COORDINACIÓN', 'La agenda del taller', '10 noviembre 2026 · Fechas del escenario de ejemplo', btn('Simular solicitud de Carlos', 'schedule', '', 'primary', 'plus'))}<div class="segmented" role="group" aria-label="Vista de la agenda"><button data-action="agenda-today" aria-pressed="${!agendaWeek}">Hoy</button><button data-action="agenda-week" aria-pressed="${agendaWeek}">Semana</button></div>${agendaWeek ? `<div class="week-strip" aria-label="Semana del 9 al 15 noviembre">${['Lun 9', 'Mar 10', 'Mié 11', 'Jue 12', 'Vie 13', 'Sáb 14', 'Dom 15'].map((d, i) => `<span class="${i === 1 ? 'selected' : ''}">${d}</span>`).join('')}</div>` : ''}${section(agendaWeek ? 'Esta semana' : 'Citas y entregas de hoy', appointmentRows(entries))}<p class="footnote">Las solicitudes son ficticias. No reservan un horario real en Torre Fuerte.</p></div>`;
  }
  function mechanic() {
    const assigned = demo.state.orders.filter(o => o.mechanicId === 'miguel'), active = assigned.filter(o => o.stage < 7), completed = assigned.filter(o => o.stage >= 7);
    return `<div class="workspace mechanic-shell">${title('MI TRABAJO / MECÁNICO', 'Buen día, Miguel.', 'Estas son tus motocicletas.', avatar('M', 'large'))}<div class="metrics mechanic-metrics">${stat(active.length, 'En tus manos')}${stat(completed.length, 'Trabajos terminados', 'green')}${stat(active.filter(o => o.partsPending).length, 'Refacciones pendientes')}</div>${section('Tu trabajo actual', orderRows(active, true))}${section('Ya terminadas', completed.length ? orderRows(completed, true) : empty('Aquí aparecerán tus trabajos terminados.'))}<div class="mechanic-note">${icon('shield')}Una vista enfocada en reparar. Recepción coordina citas y entregas.</div></div>`;
  }
  function team() {
    return `<div class="workspace">${title('EQUIPO', 'Un taller, bien coordinado.', 'Roles y asistencia simulada. No hay acceso ni usuarios reales.')}<div class="team-list">${demo.state.staff.map(person => {
      const assigned = demo.state.orders.filter(o => o.mechanicId === person.id), completed = assigned.filter(o => o.stage >= 7).length;
      return `<article class="team-row">${avatar(person.initials)}<div><h2>${esc(person.name)}</h2><p>${person.role}</p></div><div class="team-work"><strong>${assigned.length} asignadas · ${completed} terminadas</strong><span>${assigned.length - completed} pendientes</span></div><span class="badge ${person.present ? 'success' : ''}">${person.present ? 'En taller' : 'Sin registro'}</span>${btn(person.present ? 'Simular salida' : 'Simular entrada', 'attendance', person.id, 'secondary', 'clock')}</article>`;
    }).join('')}</div></div>`;
  }
  function cash() {
    const tx = demo.state.transactions, income = tx.filter(t => t.amount > 0).reduce((n, t) => n + t.amount, 0), expense = -tx.filter(t => t.amount < 0).reduce((n, t) => n + t.amount, 0), methods = ['Efectivo', 'Tarjeta', 'Transferencia'], max = Math.max(1, ...methods.map(m => tx.filter(t => t.method === m && t.amount > 0).reduce((n, t) => n + t.amount, 0)));
    return `<div class="workspace">${title('ADMINISTRACIÓN', 'Caja, con claridad.', '10 noviembre · Todas las cantidades son ficticias, en MXN.')}<div class="metrics">${stat(money(income), 'Ingresos del día', 'currency')}${stat(money(expense), 'Gastos de ejemplo', 'currency')}${stat(money(demo.metrics().receivable), 'Pendiente por cobrar', 'currency')}${stat(demo.state.orders.filter(o => !demo.balance(o)).length, 'Órdenes cobradas')}${stat(money(tx.filter(t => t.type === 'deposit').reduce((n, t) => n + t.amount, 0)), 'Anticipos registrados', 'currency')}</div><div class="workspace-columns">${section('Ingresos por método de pago', `<div class="payment-chart" role="img" aria-label="Ingresos del día por método de pago">${methods.map(m => { const value = tx.filter(t => t.method === m && t.amount > 0).reduce((n, t) => n + t.amount, 0); return `<div class="bar-row"><span>${m}</span><div class="bar-track"><i style="width:${Math.round(value / max * 100)}%"></i></div><strong>${money(value)}</strong></div>`; }).join('')}</div><p class="footnote">Cobros y anticipos del escenario actual.</p>`)}${section('Saldos de órdenes', `<div class="balance-list">${demo.state.orders.filter(o => demo.balance(o) > 0).map(o => `<div><span><strong>${o.id}</strong><small>${esc(demo.bike(o.bikeId).model)}</small></span><strong>${money(demo.balance(o))}</strong>${btn('Simular cobro', 'payment', o.id, 'secondary')}</div>`).join('') || '<p>Sin saldos pendientes en la demo.</p>'}</div>`)}</div>${section('Movimientos recientes', `<div class="transaction-list">${tx.map(t => `<div><span class="round-icon">${icon(t.amount < 0 ? 'box' : 'wallet')}</span><div><strong>${esc(t.label)}</strong><span>${esc(t.time)} · ${t.method}</span></div><strong class="${t.amount < 0 ? '' : 'green-text'}">${money(t.amount)}</strong></div>`).join('')}</div>`)}<p class="footnote">No es un sistema contable. Ningún cobro mueve dinero real.</p></div>`;
  }
  function inventory() {
    return `<div class="workspace">${title('REFACCIONES', 'Lo necesario, a la mano.', 'Existencias y costos de ejemplo. Sin proveedores ni compras reales.')}<div class="inventory-list">${demo.state.inventory.map(p => `<article><span class="round-icon">${icon('box')}</span><div><h2>${esc(p.name)}</h2><p>${p.category} · Costo ilustrativo ${money(p.cost)}</p></div><div><strong>${p.stock} unidades</strong><span class="${p.stock < p.min ? 'warning-text' : 'muted'}">${p.stock < p.min ? 'Existencias bajas' : 'Disponible'}</span></div></article>`).join('')}</div>${section('Utilizadas o previstas en órdenes', `<div class="parts-list">${demo.state.orders.filter(o => o.parts.length).map(o => `<div><span>${o.id} · ${esc(demo.bike(o.bikeId).model)}</span><span>${o.parts.reduce((n, p) => n + p.qty, 0)} piezas · ${o.stage >= 7 ? 'utilizadas' : 'previstas'}</span></div>`).join('')}</div>`)}<p class="footnote">El consumo se descuenta una sola vez al terminar un servicio durante la demo.</p></div>`;
  }
  function clubAdmin() {
    const returning = demo.state.customers.filter(c => demo.visits(c.bikeId) >= 2), eligible = demo.state.customers.filter(c => demo.visits(c.bikeId) >= 4);
    return `<div class="workspace">${title('RELACIONES', 'Que el buen servicio continúe.', 'Club Torre Fuerte · Mecánica configurable de ejemplo')}<div class="metrics">${stat(returning.length, 'Clientes recurrentes')}${stat(eligible.length, 'Beneficios ilustrativos')}${stat(demo.state.appointments.filter(a => a.source.includes('Mi Garaje')).length, 'Solicitudes desde Mi Garaje')}</div>${section('Una razón para volver', `<div class="club-admin-list">${demo.state.customers.map(c => `<a href="#/client/${c.id}">${avatar(c.initials)}<div><strong>${esc(c.name)}</strong><span>${demo.visits(c.bikeId)} visitas elegibles · ${demo.visits(c.bikeId) >= 4 ? 'Beneficio ilustrativo disponible' : 'Próxima revisión por consultar'}</span></div>${icon('arrow')}</a>`).join('')}</div>`)}<p class="footnote">Los servicios personales no suman visitas. Este programa no promete recompensas reales.</p></div>`;
  }
  function more() { return `<div class="workspace">${title('TORRE FUERTE OS', 'Más del taller', 'Las herramientas que necesitas, cuando las necesitas.')}<nav class="more-grid" aria-label="Más herramientas">${navItems.filter(([r]) => !['workshop', 'orders', 'clients', 'agenda'].includes(r)).map(([r, label, ico]) => `<a href="#/${r}">${icon(ico)}<span>${label}</span>${icon('arrow')}</a>`).join('')}</nav></div>`; }
  function final() { return `<div class="story-finale"><img src="assets/mark.svg" width="64" height="64" alt="Torre Fuerte"><p class="eyebrow">EL TALLER CONECTADO</p><h1>Una moto atendida.<br>Un cliente que puede regresar.<br><span>Un taller conectado.</span></h1><p>Del primer mensaje a la siguiente visita.<br>Todo cuenta una misma historia.</p><div class="button-row">${btn('Explorar Torre Fuerte OS', 'story-explore', '', 'primary', 'arrow')}${btn('Volver a contar la historia', 'story-restart', '', 'secondary', 'reset')}</div></div>`; }
  function notFound() { return `<div class="workspace">${title('DEMO TORRE FUERTE', 'Esta vista no existe.', 'Vuelve a una de las experiencias del prototipo.', link('Ir al inicio', 'landing', 'btn primary'))}</div>`; }
  const views = { landing, garage, history, benefits, passport, tracking, workshop, orders, order: () => orderDetail(false), clients, client, bikes, bike: bikeDetail, messages, conversation: messages, agenda, mechanic, 'mechanic-order': () => orderDetail(true), team, cash, inventory, 'club-admin': clubAdmin, more, final };

  function render({ focus = false } = {}) {
    const focusedAction = document.activeElement?.dataset?.action, focusedValue = document.activeElement?.dataset?.value || '';
    renderChrome();
    $('#main').innerHTML = (Object.hasOwn(views, route) ? views[route]() : notFound());
    $('#main').dataset.route = route;
    document.title = `${route === 'landing' ? 'El taller conectado' : ({ garage: 'Mi Garaje', workshop: 'Torre Fuerte OS', mechanic: 'Mi trabajo', tracking: 'Así va tu moto', messages: 'Conversación simulada' }[route] || 'Torre Fuerte OS')} · Torre Fuerte`;
    renderStory();
    if (!focus && focusedAction) { const match = [...document.querySelectorAll('[data-action]')].find(el => el.dataset.action === focusedAction && (el.dataset.value || '') === focusedValue); (match || $('#main')).focus({ preventScroll: true }); }
    if (focus) { $('#main').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
  }
  function readRoute() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    route = parts[0] || 'landing'; id = parts[1] || ''; search = '';
    if ($('#dialog').open) $('#dialog').close();
    render({ focus: true });
  }
  function go(next) {
    if (location.hash === '#/' + next) { const [r, ident = ''] = next.split('/'); route = r; id = ident; render({ focus: true }); }
    else location.hash = '/' + next;
  }
  function toast(text) { clearTimeout(toastTimer); $('#toast').textContent = text; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 5500); }
  function modal(h, content) {
    returnFocus = document.activeElement;
    $('#dialog').innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${h}</h2><button class="icon-button" data-action="close-dialog" aria-label="Cerrar">${icon('close')}</button></div><div class="dialog-body">${content}</div>`;
    $('#dialog').showModal();
  }
  function closeDialog() { $('#dialog').close(); if (returnFocus?.isConnected) returnFocus.focus(); }
  function renderStory() {
    const story = $('#story'); story.hidden = storyIndex < 0;
    if (storyIndex < 0) { story.innerHTML = ''; return; }
    const scene = storyScenes[storyIndex], finished = storyIndex === 5;
    story.innerHTML = `<div class="story-info"><div class="story-kicker"><span>EXPLORAR UNA HISTORIA · ${finished ? 'COMPLETA' : (storyIndex + 1) + ' / 5'}</span><div class="story-mini-actions"><button class="icon-button" data-action="story-restart" aria-label="Reiniciar historia y demo">${icon('reset')}</button><button class="icon-button" data-action="story-exit" aria-label="Salir de la historia">${icon('close')}</button></div></div><h2>${finished ? 'La historia continúa en Torre Fuerte.' : scene[0]}</h2><p>${finished ? 'Explora las pantallas o reinicia para volver a presentarla.' : scene[1]}</p><div class="story-progress" role="progressbar" aria-label="Progreso de la historia" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${Math.min(5, storyIndex + 1)}">${[0, 1, 2, 3, 4].map(n => `<span class="${n <= storyIndex ? 'filled' : ''}"></span>`).join('')}</div></div><div class="story-buttons"><button class="btn secondary" data-action="story-prev" ${storyIndex === 0 ? 'disabled' : ''}>${icon('back')}Anterior</button>${btn(finished ? 'Explorar el taller' : storyIndex === 1 ? 'Registrar cita y seguir' : storyIndex === 2 ? 'Asignar a Miguel y seguir' : storyIndex === 3 ? 'Terminar servicio y seguir' : storyIndex === 4 ? 'Ver cierre' : 'Siguiente', finished ? 'story-explore' : 'story-next', '', 'primary', 'arrow')}</div>`;
  }
  function startStory() { demo.reset(); storyIndex = 0; go('garage'); toast('Historia reiniciada. Todos los datos son de ejemplo.'); }
  function nextStory() {
    if (storyIndex === 0) { if (demo.state.chatStep === 0) demo.chatNext(); }
    if (storyIndex === 1) demo.ensureAppointment();
    if (storyIndex === 2) demo.prepareRepair();
    if (storyIndex === 3) { demo.prepareRepair(); demo.observe('TF-1042'); demo.finish('TF-1042'); }
    storyIndex = Math.min(5, storyIndex + 1);
    go(storyIndex === 5 ? 'final' : storyScenes[storyIndex][2]);
  }
  function resetDemo() {
    closeDialog(); demo.reset(); search = ''; agendaWeek = false; storyIndex = -1;
    go('landing'); toast('Demo restaurada. Roadmap y sus datos no se modificaron.');
  }
  function readyMessage(orderId = 'TF-1042') {
    const order = demo.order(orderId) || demo.order('TF-1042'), bike = demo.bike(order.bikeId), name = demo.customer(bike.customerId).name.split(' ')[0];
    modal(order.stage >= 7 ? 'Aviso listo para revisar' : 'Ejemplo de aviso de entrega', `<p class="eyebrow">BORRADOR SIMULADO · NO ENVIADO</p><div class="draft-message"><p>Hola, ${esc(name)}. Tu ${esc(bike.model.split(' ')[0])} ya está lista para entrega en Torre Fuerte.</p></div><p>Este texto es una vista previa. La demo no está conectada a WhatsApp ni puede enviar mensajes.</p>${btn('Entendido', 'close-dialog', '', 'primary', 'check')}`);
  }

  const actions = {
    register: () => modal('Tu moto, en Mi Garaje', `<p>Prueba el registro gratuito usando únicamente este perfil ficticio. No necesitas crear una cuenta.</p><dl class="detail-list"><div><dt>Propietario de ejemplo</dt><dd>Carlos Hernández</dd></div><div><dt>Motocicleta</dt><dd>Italika FT150 · 2023 · 18,450 km</dd></div></dl><p>La moto ya tiene un historial en el taller. Al activar Mi Garaje, lo verás en el mismo lugar.</p>${btn('Activar Mi Garaje de ejemplo', 'activate-garage', '', 'primary', 'check')}`),
    'activate-garage': () => { demo.state.garageActive = true; closeDialog(); go('garage'); toast('Mi Garaje activado para Carlos. Sin cuenta ni registro real.'); },
    'close-dialog': closeDialog,
    'story-start': startStory,
    'story-restart': startStory,
    'story-next': nextStory,
    'story-prev': () => { storyIndex = Math.max(0, storyIndex - 1); go(storyScenes[storyIndex][2]); },
    'story-exit': () => { storyIndex = -1; render(); toast('Recorrido cerrado. Puedes seguir explorando.'); },
    'story-explore': () => { storyIndex = -1; go('workshop'); },
    reset: () => modal('Reiniciar esta demostración', `<p>Se restaurarán las órdenes, citas, pagos e historial ficticios. Los datos de Roadmap no se tocan.</p><div class="button-row">${btn('Reiniciar demo', 'confirm-reset', '', 'primary', 'reset')}${btn('Cancelar', 'close-dialog')}</div>`),
    'confirm-reset': resetDemo,
    schedule: () => { if (storyIndex === 0) nextStory(); else { if (!demo.state.chatStep) demo.chatNext(); go('conversation'); } },
    'customer-chat': () => go('conversation'),
    'chat-next': () => { demo.chatNext(); render(); if (demo.state.chatStep === 4) toast('Solicitud ficticia registrada en la agenda · Carlos, 11:00.'); },
    'ready-message': value => readyMessage(value || 'TF-1042'),
    'agenda-today': () => { agendaWeek = false; render(); },
    'agenda-week': () => { agendaWeek = true; render(); },
    'advance': value => { const order = demo.order(value); if (!demo.advance(value)) toast(order?.partsPending ? 'Primero simula la recepción de la refacción.' : 'Revisa el saldo antes de entregar.'); else { render(); toast(order.stage === 7 ? 'Moto lista. Historial, Club y borrador de aviso actualizados.' : 'Estado actualizado en toda la demo.'); } },
    finish: value => { if (demo.finish(value)) { render(); toast('Trabajo terminado. El cliente ya puede consultar el nuevo estado.'); } else toast('La orden debe estar en reparación y tener sus refacciones.'); },
    observe: value => { demo.observe(value); render(); toast('Observación ficticia registrada en la orden.'); },
    'receive-part': value => { demo.receivePart(value); render(); toast('Recepción de refacción simulada.'); },
    'assign-miguel': value => { demo.assign(value, 'miguel'); render(); toast('Miguel asignado a ' + value + '.'); },
    assign: value => modal('Asignar mecánico', `<p>${esc(value)} · Selecciona un perfil ficticio del equipo.</p><form id="assign-form" data-order="${esc(value)}"><label>Mecánico<select name="mechanic"><option value="miguel">Miguel</option><option value="elena" ${demo.order(value).mechanicId === 'elena' ? 'selected' : ''}>Elena</option></select></label><button class="btn primary" type="submit">Asignar a esta orden</button></form>`),
    'new-order': value => modal('Nueva orden simulada', `<p>Solo se utilizan clientes del escenario. No ingreses datos de personas reales.</p><form id="order-form"><label>Motocicleta del escenario<select name="bike">${demo.state.bikes.map(b => `<option value="${b.id}" ${b.id === (value || 'yamaha') ? 'selected' : ''}>${esc(b.model)} · ${esc(demo.customer(b.customerId).name)}</option>`).join('')}</select></label><p class="footnote">Si tiene una orden activa, abriremos la existente para evitar duplicados.</p><button class="btn primary" type="submit">Crear orden de ejemplo</button></form>`),
    km: () => modal('Kilometraje de ejemplo', `<form id="km-form"><label>Nuevo kilometraje de la Italika<input name="km" type="number" inputmode="numeric" min="${demo.bike('ft150').km}" max="999999" step="1" value="${demo.bike('ft150').km}" required></label><p>Solo modifica la motocicleta ficticia de esta demostración.</p><button class="btn primary" type="submit">Actualizar kilometraje</button></form>`),
    maintenance: () => modal('Mantenimiento personal de ejemplo', `<p>Se distingue de los servicios verificados y no suma visitas al Club.</p><form id="maintenance-form"><label>Registro de ejemplo<select name="service"><option>Limpieza y lubricación</option><option>Revisión de presión de llantas</option><option>Cambio de aceite personal</option></select></label><p class="footnote">Fecha del escenario: 10 noviembre 2026.</p><button class="btn primary" type="submit">Añadir a mi historial</button></form>`),
    payment: value => modal('Simular un cobro', `<p>${esc(value)} · Saldo de ejemplo <strong>${money(demo.balance(demo.order(value)))}</strong> MXN.</p><form id="payment-form" data-order="${esc(value)}"><label>Método ficticio<select name="method"><option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option></select></label><p>No se solicitarán datos de pago ni se moverá dinero.</p><button class="btn primary" type="submit">Registrar pago simulado</button></form>`),
    attendance: value => { const person = demo.staff(value); if (person) { person.present = !person.present; render(); toast('Asistencia de ejemplo actualizada.'); } },
    'contact-example': () => modal('Contacto de ejemplo', `<p>Este perfil es ficticio. La conversación demostrativa está disponible con Carlos Hernández y su Italika FT150.</p>${link('Abrir conversación de Carlos', 'messages', 'btn primary', 'chat')}`)
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (button && !button.disabled && actions[button.dataset.action]) actions[button.dataset.action](button.dataset.value || '');
  });
  document.addEventListener('change', event => { if (event.target.id === 'perspective') go(event.target.value); });
  document.addEventListener('input', event => {
    if (event.target.id !== 'search') return;
    const position = event.target.selectionStart; search = event.target.value;
    $('#main').innerHTML = (Object.hasOwn(views, route) ? views[route]() : notFound());
    $('#search').focus(); $('#search').setSelectionRange(position, position);
  });
  document.addEventListener('submit', event => {
    const form = event.target; if (!['assign-form', 'order-form', 'km-form', 'maintenance-form', 'payment-form'].includes(form.id)) return;
    event.preventDefault(); const data = new FormData(form);
    if (form.id === 'order-form') { const result = demo.newOrder(data.get('bike')); closeDialog(); if (result) { go('order/' + result.id); toast(result.created ? 'Orden simulada creada.' : 'Esta moto ya tiene una orden activa. Abrimos la existente.'); } return; }
    if (form.id === 'km-form' && !demo.updateKm(data.get('km'))) { toast('Usa un kilometraje entero igual o mayor al actual.'); return; }
    if (form.id === 'assign-form') demo.assign(form.dataset.order, data.get('mechanic'));
    if (form.id === 'maintenance-form') demo.personalService(data.get('service'));
    if (form.id === 'payment-form') demo.pay(form.dataset.order, data.get('method'));
    closeDialog(); render(); toast(form.id === 'payment-form' ? 'Pago de ejemplo registrado. No se realizó ningún cobro real.' : 'Datos del escenario actualizados.');
  });
  $('#dialog').addEventListener('click', event => { if (event.target === $('#dialog')) { const r = $('#dialog').getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(); } });
  $('#dialog').addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); });
  window.addEventListener('hashchange', readRoute);
  readRoute();
})();
