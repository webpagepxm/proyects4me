(() => {
  'use strict';
  const M = window.ArchitectureBrief;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = number => String(number).padStart(2, '0');
  const privacy = 'Tus respuestas se preparan en tu dispositivo y solo se comparten si decides enviarlas por WhatsApp.';
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="1"/><path d="M16 8V3H3v13h5"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',
    edit: '<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14Z"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9H5l-4 2 2-6a9 9 0 1 1 18-5Z"/><path d="M7 11h10m-10 4h6"/>',
    reset: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>'
  }[name] || ''}</svg>`;
  const button = (text, action, kind = 'secondary', value = '', symbol = '') => `<button type="button" class="button ${kind}" data-action="${action}"${value !== '' ? ` data-value="${esc(value)}"` : ''}>${symbol ? icon(symbol) : ''}<span>${text}</span></button>`;

  let state = M.initialState(), storageError = false, corruptDraft = false, recovered = false, returnToReview = false, announcementTimer, modalTrigger;
  try {
    const stored = localStorage.getItem(M.STORAGE_KEY);
    if (stored !== null) {
      try { state = M.normalizeState(JSON.parse(stored)); recovered = state.started; }
      catch { corruptDraft = true; }
    }
  } catch { storageError = true; }

  function save() {
    if (corruptDraft) return false;
    try {
      localStorage.setItem(M.STORAGE_KEY, JSON.stringify(state)); storageError = false; updateStorageStatus(); return true;
    } catch { storageError = true; updateStorageStatus(); return false; }
  }
  function updateStorageStatus() {
    const status = $('#storage-status');
    status.hidden = !storageError && !corruptDraft;
    const text = corruptDraft ? 'No se pudo recuperar el borrador guardado. Al comenzar podrás confirmar si quieres sustituirlo.' : storageError ? 'Este navegador no pudo guardar el avance. Puedes continuar, pero descarga o copia tus respuestas antes de cerrar.' : '';
    if (status.textContent !== text) status.textContent = text;
    if ($('#persistence-note')) $('#persistence-note').textContent = storageError ? 'Avance en esta sesión.' : 'Tu avance se guarda en este navegador.';
  }
  function announce(text) {
    clearTimeout(announcementTimer);
    if ($('#dialog').open) {
      let feedback = $('.dialog-feedback');
      if (!feedback) { feedback = document.createElement('p'); feedback.className = 'dialog-feedback'; feedback.setAttribute('role', 'status'); $('.dialog-buttons')?.before(feedback); }
      feedback.textContent = text; return;
    }
    $('#announcement').textContent = text; $('#announcement').classList.add('visible');
    announcementTimer = setTimeout(() => $('#announcement').classList.remove('visible'), 6500);
  }
  const routeHash = () => state.view === 'review' ? '#revision' : state.view === 'question' ? '#pregunta-' + (state.step + 1) : location.pathname + location.search;
  function navigate(view, step = state.step, replace = false) {
    state.view = view; state.step = Math.max(0, Math.min(19, step));
    if (view !== 'welcome') state.started = true;
    save();
    history[replace ? 'replaceState' : 'pushState'](null, '', routeHash());
    render(true);
  }
  function readHash() {
    if (!state.started) return;
    if (location.hash === '#revision') state.view = 'review';
    else if (/^#pregunta-([1-9]|1\d|20)$/.test(location.hash)) { state.view = 'question'; state.step = Number(location.hash.slice(10)) - 1; }
    else if (!location.hash) state.view = 'welcome';
    else return;
    save(); render(true);
  }
  function currentQuestion() { return M.questions[state.step]; }

  function renderHeader() {
    $('#header').innerHTML = `<button class="wordmark" data-action="home" aria-label="Volver a la portada del brief"><img src="assets/mark.svg" alt="" width="32" height="32"><span>ARQUITECTURA<small>UNA PRIMERA CONVERSACIÓN</small></span></button><div class="header-right">${state.view === 'welcome' ? '<span class="edition">BRIEF / 01</span>' : `${state.view === 'question' ? `<span class="question-count" aria-label="Pregunta ${state.step + 1} de 20">${pad(state.step + 1)} <span>/ 20</span></span>` : '<span class="edition">TU BRIEF</span>'}${state.view === 'question' ? button('Revisar', 'review', 'text-button') : button('Seguir editando', 'resume', 'text-button')}`}</div>`;
    $('#footer').innerHTML = `<p>${icon('lock')}${privacy}</p><div><span id="persistence-note">${storageError ? 'Avance en esta sesión.' : 'Tu avance se guarda en este navegador.'}</span>${state.started || M.count(state) ? button('Borrar mis respuestas', 'reset', 'text-button', '', 'reset') : ''}</div>`;
    updateStorageStatus();
  }
  function welcome() {
    const count = M.count(state);
    return `<div class="cover"><section class="cover-main"><div class="cover-copy"><p class="eyebrow"><span></span>EL PUNTO DE PARTIDA</p><h1>Antes de diseñar,<br>queremos<br><em>entenderte.</em></h1><p class="cover-subtitle">Unas preguntas para conocer tu estudio, tus ideas y lo que te gustaría construir.</p><div class="cover-cta">${button(state.started ? 'Retomar mi brief' : 'Comenzar', 'start', 'primary', '', 'arrow')}<span class="cover-duration">5–7 minutos<span>A tu ritmo</span></span></div>${state.started ? `<p class="resume-note">${count} de 20 preguntas respondidas. Puedes seguir donde lo dejaste.</p>` : '<p class="cover-note">20 preguntas. Cuatro capítulos. Una conversación más clara.</p>'}</div><figure class="cover-study" aria-label="Composición arquitectónica original"><div class="study-label"><span>ESPACIO PARA TUS IDEAS</span><span>01 / 04</span></div><img src="assets/study.svg" alt="Dibujo conceptual de un espacio arquitectónico en proyección axonométrica" width="560" height="620"><figcaption>La forma empieza con una intención.</figcaption></figure></section><section class="cover-chapters" aria-label="Los cuatro capítulos">${M.chapters.map((chapter, index) => `<div><span class="chapter-number">${pad(index + 1)}</span><h2>${esc(chapter.short)}</h2><p>${chapter.note}</p></div>`).join('')}</section><div class="cover-bottom"><p>No necesitas tener todo resuelto.<br>Si una pregunta no aplica, puedes dejarla para la reunión.</p><p>Solo dos respuestas son necesarias:<br>cómo trabajas y qué quieres conseguir.</p></div></div>`;
  }
  function chapterNav() {
    const chapter = currentQuestion().chapter;
    return `<aside class="chapter-rail"><p class="eyebrow">EL RECORRIDO</p><nav aria-label="Capítulos del brief">${M.chapters.map((c, index) => `<button data-action="chapter" data-value="${index}" ${chapter === index ? 'aria-current="step"' : ''}><span>${pad(index + 1)}</span><span class="chapter-name-desktop">${esc(c.short)}</span><span class="chapter-name-mobile">${['Estudio', 'Marca', 'Día a día', 'Solución'][index]}</span></button>`).join('')}</nav><p class="rail-note">Sin prisa.<br>Puedes volver a cualquier respuesta.</p></aside>`;
  }
  function questionView() {
    const q = currentQuestion(), answer = M.getAnswer(state, q), otherSelected = q.other && answer.selected.includes(q.other);
    return `<div class="question-layout">${chapterNav()}<section class="question-page" aria-labelledby="question-title"><div class="question-eyebrow"><p class="eyebrow">${pad(q.chapter + 1)} / ${esc(M.chapters[q.chapter].title)}</p><span class="requirement">${q.required ? 'Necesaria' : 'Opcional'}</span></div><h1 id="question-title" tabindex="-1">${esc(q.title)}</h1><p id="question-hint" class="question-hint">${q.type === 'single' ? 'Elige una opción.' : q.type === 'multi' ? 'Puedes elegir más de una opción.' : 'Cuéntanos qué sería diferente. No incluyas datos personales de tus clientes.'}</p><form id="question-form" novalidate><fieldset aria-describedby="question-hint question-error"><legend class="sr-only">${esc(q.title)}</legend>${q.type === 'text' ? `<label class="sr-only" for="open-answer">Tu respuesta</label><textarea id="open-answer" name="text" data-field="text" rows="7" maxlength="${M.TEXT_LIMIT}" placeholder="Me gustaría que…" aria-describedby="text-counter question-error">${esc(answer.text)}</textarea><div id="text-counter" class="text-counter">${answer.text.length} / ${M.TEXT_LIMIT} caracteres</div>` : `<div class="choices">${q.choices.map((choice, index) => `<label class="choice ${answer.selected.includes(choice) ? 'selected' : ''}"><input id="choice-${index}" name="choice" type="${q.type === 'single' ? 'radio' : 'checkbox'}" value="${esc(choice)}" ${answer.selected.includes(choice) ? 'checked' : ''} ${q.required ? 'required' : ''}><span>${esc(choice)}</span></label>`).join('')}</div>${q.other ? `<div class="other-field" ${otherSelected ? '' : 'hidden'}><label for="other-answer">${q.id === 2 ? '¿Qué otros servicios ofreces?' : '¿Qué otros proyectos te interesan?'}</label><input id="other-answer" name="other" data-field="other" type="text" autocomplete="off" maxlength="${M.OTHER_LIMIT}" value="${esc(answer.other)}" aria-describedby="other-help question-error"><p id="other-help">Hasta ${M.OTHER_LIMIT} caracteres.</p></div>` : ''}`}</fieldset><p id="question-error" class="field-error" role="alert" hidden></p><div class="question-small-actions">${button('Borrar esta respuesta', 'clear-answer', 'text-button')}${returnToReview ? button('Guardar y volver a revisión', 'return-review', 'text-button', '', 'check') : ''}</div></form></section></div>`;
  }
  function missingAnswers() {
    const errors = M.errors(state);
    return errors.length ? `<div class="review-warning"><h2>Antes de preparar el envío</h2><p>Revisa estas respuestas para que el brief quede claro:</p><ul>${errors.map(e => `<li><button class="inline-edit" data-action="edit" data-value="${e.id - 1}">Pregunta ${e.id}: ${e.id === 1 || e.id === 7 ? 'elige una opción' : 'especifica «Otros»'} ${icon('arrow')}</button></li>`).join('')}</ul></div>` : '';
  }
  function review() {
    const transport = M.whatsapp(state);
    return `<div class="review-page"><div class="review-intro"><p class="eyebrow">EL SIGUIENTE PASO / NUESTRA REUNIÓN</p><h1>Una última mirada<br>a tus <em>ideas.</em></h1><p>Revisa lo que nos quieres contar. Puedes volver a cualquier respuesta antes de compartirla.</p><span class="review-count">${M.count(state)} de 20 preguntas respondidas</span></div>${missingAnswers()}<div class="backup-actions" aria-label="Respaldo de respuestas">${button('Copiar respuestas', 'copy', 'secondary', '', 'copy')}${button('Descargar .txt', 'download', 'secondary', '', 'download')}</div><div class="review-chapters">${M.chapters.map((chapter, index) => `<section aria-labelledby="review-chapter-${index}"><div class="review-chapter-heading"><span>${pad(index + 1)}</span><h2 id="review-chapter-${index}">${esc(chapter.title)}</h2></div><dl>${M.questions.filter(q => q.chapter === index).map(q => `<div class="review-answer"><dt><span>${q.id}. ${esc(q.title)}</span><button class="edit-button" data-action="edit" data-value="${q.id - 1}" aria-label="Editar respuesta ${q.id}">${icon('edit')}</button></dt><dd class="${M.answered(state, q) ? '' : 'unanswered'}">${M.answerLines(state, q).map(line => `<p>${esc(line)}</p>`).join('')}</dd></div>`).join('')}</dl></section>`).join('')}</div><section id="share-section" class="share-section" aria-labelledby="share-title"><p class="eyebrow">DE TU DISPOSITIVO A LA CONVERSACIÓN</p><h2 id="share-title">Listo para conversar.</h2><p>Destino: <strong>+52 229 250 7595</strong></p><p>Se preparará un mensaje con las 20 preguntas y tus respuestas completas. Solo se enviará cuando pulses <strong>Enviar</strong> dentro de WhatsApp.</p>${transport.tooLong ? '<div class="length-note"><strong>Tu brief es largo para un enlace.</strong><p>Te ayudaremos a copiar el texto completo y abrir el chat para pegarlo, sin recortar respuestas.</p></div>' : ''}<details class="fallback-help"><summary>¿No se abre WhatsApp?</summary><p>Copia o descarga tus respuestas. Luego abre el chat y pega el texto completo.</p>${button('Copiar respuestas completas', 'copy', 'text-button', '', 'copy')}<a class="button secondary" href="https://wa.me/${M.PHONE}" target="_blank" rel="noopener noreferrer">Abrir chat sin texto${icon('arrow')}</a><p class="fine-print">Abrir el chat no envía ningún mensaje.</p></details></section></div>`;
  }
  function renderActions() {
    const actions = $('#actions'); actions.hidden = state.view === 'welcome';
    document.body.classList.toggle('has-actions', state.view !== 'welcome');
    if (state.view === 'welcome') { actions.innerHTML = ''; return; }
    if (state.view === 'review') {
      actions.innerHTML = `<div class="action-content review-actions"><div><strong>Tu brief, listo para revisar.</strong><span>El envío se confirma dentro de WhatsApp.</span></div>${button('Enviar por WhatsApp', 'whatsapp', 'primary', '', 'chat')}</div>`;
    } else {
      const q = currentQuestion();
      actions.innerHTML = `<div class="action-content"><button class="button back-button" data-action="back" aria-label="Atrás">${icon('back')}<span>Atrás</span></button><div class="next-actions"><button class="button text-button skip-button" data-action="skip" ${q.required || M.answered(state, q) ? 'hidden' : ''}>Omitir</button><button class="button primary" type="submit" form="question-form">${state.step === 19 ? 'Revisar respuestas' : 'Continuar'}${icon('arrow')}</button></div></div>`;
    }
  }
  function render(focus = false) {
    renderHeader();
    $('#main').innerHTML = state.view === 'welcome' ? welcome() : state.view === 'review' ? review() : questionView();
    $('#main').dataset.view = state.view; $('#main').dataset.step = String(state.step);
    renderActions();
    document.title = state.view === 'question' ? `Pregunta ${state.step + 1} de 20 · Brief de arquitectura` : state.view === 'review' ? 'Tus respuestas · Brief de arquitectura' : 'Antes de diseñar · Brief de arquitectura';
    if (focus) { ($('#question-title') || $('#main')).focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'auto' }); }
  }
  function validateQuestion() {
    const q = currentQuestion(), error = M.errorFor(state, q);
    const element = $('#question-error');
    element.textContent = error; element.hidden = !error;
    const other = $('#other-answer');
    if (other) other.setAttribute('aria-invalid', String(!!error && M.getAnswer(state, q).selected.includes(q.other)));
    if (error) {
      if (q.other && M.getAnswer(state, q).selected.includes(q.other)) other.focus();
      else $('input[name="choice"]').focus();
    }
    return !error;
  }
  function continueQuestion() {
    if (!validateQuestion()) return;
    if (returnToReview) { returnToReview = false; navigate('review'); }
    else navigate(state.step === 19 ? 'review' : 'question', state.step + 1);
  }
  function syncQuestionInputs() {
    const q = currentQuestion(), answer = M.getAnswer(state, q);
    document.querySelectorAll('input[name="choice"]').forEach(input => {
      input.checked = answer.selected.includes(input.value); input.closest('label').classList.toggle('selected', input.checked);
    });
    if ($('.other-field')) $('.other-field').hidden = !answer.selected.includes(q.other);
    if ($('.skip-button')) $('.skip-button').hidden = !!q.required || M.answered(state, q);
    if ($('#question-error')) { $('#question-error').hidden = true; $('#question-error').textContent = ''; }
    if ($('#other-answer')) $('#other-answer').setAttribute('aria-invalid', 'false');
  }
  function modal(title, content) {
    modalTrigger = document.activeElement;
    $('#dialog').innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${title}</h2><button class="edit-button" data-action="close-dialog" aria-label="Cerrar ventana">${icon('close')}</button></div><div class="dialog-body">${content}</div>`;
    $('#dialog').showModal();
  }
  function closeModal() { $('#dialog').close(); }
  function fallback(reason) {
    modal('Tu brief completo, a mano.', `<p>${reason}</p><ol class="fallback-steps"><li>Copia tus respuestas o descarga el archivo .txt.</li><li>Abre el chat, pega el texto y revísalo.</li><li>Pulsa Enviar dentro de WhatsApp cuando estés lista.</li></ol><div class="dialog-buttons">${button('Copiar respuestas completas', 'copy', 'primary', '', 'copy')}${button('Descargar .txt', 'download', 'secondary', '', 'download')}<a class="button secondary" href="https://wa.me/${M.PHONE}" target="_blank" rel="noopener noreferrer">Abrir chat de WhatsApp${icon('arrow')}</a></div><p class="fine-print">Destino: +52 229 250 7595. No se envía automáticamente.</p>`);
  }
  function manualCopy() {
    const content = `<p>No se pudo acceder al portapapeles. Selecciona este texto y usa Copiar en tu dispositivo.</p><label for="manual-copy">Respuestas completas</label><textarea id="manual-copy" readonly rows="9">${esc(M.buildText(state))}</textarea><div class="dialog-buttons">${button('Seleccionar todo el texto', 'select-text', 'primary', '', 'copy')}${button('Descargar .txt', 'download', 'secondary', '', 'download')}<a class="button secondary" href="https://wa.me/${M.PHONE}" target="_blank" rel="noopener noreferrer">Abrir chat de WhatsApp${icon('arrow')}</a></div>`;
    if ($('#dialog').open) { $('#dialog-title').textContent = 'Copia manual'; $('.dialog-body').innerHTML = content; }
    else modal('Copia manual', content);
    $('#manual-copy').focus(); $('#manual-copy').select();
  }
  async function copyAnswers() {
    const text = M.buildText(state);
    let copied = false;
    try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); copied = true; } } catch { /* use selection fallback */ }
    if (!copied) {
      const active = document.activeElement, area = document.createElement('textarea');
      area.value = text; area.readOnly = true; area.className = 'copy-buffer';
      ($('#dialog').open ? $('.dialog-body') : document.body).append(area);
      area.select();
      try { copied = document.execCommand('copy'); } catch { copied = false; }
      area.remove(); if (active?.isConnected) active.focus({ preventScroll: true });
    }
    if (copied) announce('Respuestas copiadas. Puedes pegarlas en WhatsApp.');
    else manualCopy();
  }
  function downloadAnswers() {
    const blob = new Blob(['\uFEFF', M.buildText(state)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'brief-arquitectura.txt'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    announce('Archivo de respaldo preparado para descargar.');
  }
  function openWhatsApp() {
    if (M.errors(state).length) {
      announce('Revisa las respuestas señaladas antes de preparar el envío.');
      const warning = $('.review-warning'); warning?.scrollIntoView({ block: 'center', behavior: 'auto' }); warning?.querySelector('button')?.focus({ preventScroll: true }); return;
    }
    const transport = M.whatsapp(state);
    if (transport.tooLong) { fallback('Tu brief es largo para un enlace de WhatsApp. Conservaremos todas las respuestas: copia el texto y pégalo en el chat.'); return; }
    // Open synchronously within the tap; remove opener before navigating off-site.
    let tab;
    try {
      tab = window.open('about:blank', '_blank');
      if (!tab) { fallback('El navegador no permitió abrir una ventana nueva. Puedes copiar el brief y abrir el chat con el enlace de abajo.'); return; }
      tab.opener = null;
      tab.location.replace(transport.url);
      announce('Se solicitó abrir WhatsApp con tu brief. Revisa el mensaje y pulsa Enviar allí.');
    } catch { try { tab?.close(); } catch { /* no accessible tab */ } fallback('No se pudo abrir WhatsApp. Tus respuestas siguen aquí; puedes copiarlas o descargarlas y abrir el chat.'); }
  }
  function start() {
    if (corruptDraft) { modal('¿Comenzar un brief nuevo?', `<p>No pudimos leer el borrador local. Empezar uno nuevo sustituirá únicamente el borrador de este brief.</p><div class="dialog-buttons">${button('Comenzar de nuevo', 'replace-corrupt', 'primary')}${button('Cancelar', 'close-dialog', 'secondary')}</div>`); return; }
    navigate(state.view === 'review' ? 'review' : 'question');
  }
  function reset() {
    try { localStorage.removeItem(M.STORAGE_KEY); storageError = false; }
    catch { storageError = true; announce('No se pudo borrar el almacenamiento del navegador. Puedes eliminar los datos de este sitio desde sus ajustes.'); return; }
    state = M.initialState(); corruptDraft = false; returnToReview = false; closeModal();
    history.replaceState(null, '', location.pathname + location.search); render(true); announce('Tus respuestas de este brief se borraron de este navegador.');
  }
  const actions = {
    home: () => navigate('welcome'), start, review: () => { returnToReview = false; navigate('review'); },
    resume: () => { returnToReview = false; navigate('question'); },
    back: () => { if (returnToReview) { returnToReview = false; navigate('review'); } else navigate(state.step === 0 ? 'welcome' : 'question', state.step - 1); },
    skip: () => { if (!currentQuestion().required && !M.answered(state, currentQuestion())) navigate(state.step === 19 ? 'review' : 'question', state.step + 1); },
    chapter: value => { returnToReview = false; navigate('question', Number(value) * 5); },
    edit: value => { returnToReview = true; navigate('question', Number(value)); },
    'return-review': () => { if (validateQuestion()) { returnToReview = false; navigate('review'); } },
    'clear-answer': () => { delete state.answers[currentQuestion().id]; save(); render(true); announce('Esta respuesta quedó sin responder.'); },
    copy: copyAnswers, download: downloadAnswers, whatsapp: openWhatsApp,
    'close-dialog': closeModal,
    'select-text': () => { $('#manual-copy').focus(); $('#manual-copy').select(); },
    reset: () => modal('¿Borrar tus respuestas?', `<p>Se borrará únicamente este brief de este navegador. Puedes descargar tus respuestas antes de continuar.</p><div class="dialog-buttons">${button('Descargar antes de borrar', 'download', 'secondary', '', 'download')}${button('Borrar este brief', 'confirm-reset', 'primary')}${button('Conservar mis respuestas', 'close-dialog', 'text-button')}</div>`),
    'confirm-reset': reset,
    'replace-corrupt': () => { corruptDraft = false; state = M.initialState(); closeModal(); navigate('question', 0); }
  };
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-action]');
    if (target && Object.hasOwn(actions, target.dataset.action)) actions[target.dataset.action](target.dataset.value || '');
  });
  document.addEventListener('submit', event => { if (event.target.id === 'question-form') { event.preventDefault(); continueQuestion(); } });
  document.addEventListener('change', event => {
    if (event.target.name !== 'choice' || state.view !== 'question') return;
    M.select(state, currentQuestion(), event.target.value, event.target.checked); save(); syncQuestionInputs();
  });
  document.addEventListener('input', event => {
    if (!event.target.dataset.field || state.view !== 'question') return;
    M.updateText(state, currentQuestion(), event.target.dataset.field, event.target.value); save();
    if ($('#text-counter')) $('#text-counter').textContent = `${M.getAnswer(state, currentQuestion()).text.length} / ${M.TEXT_LIMIT} caracteres`;
    syncQuestionInputs();
  });
  $('#dialog').addEventListener('close', () => { if (modalTrigger?.isConnected) modalTrigger.focus({ preventScroll: true }); });
  $('#dialog').addEventListener('click', event => {
    if (event.target !== $('#dialog')) return;
    const r = $('#dialog').getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeModal();
  });
  window.addEventListener('hashchange', readHash);
  // Reading a draft never writes to storage until the visitor interacts.
  if (state.started && location.hash) {
    if (location.hash === '#revision') state.view = 'review';
    else if (/^#pregunta-([1-9]|1\d|20)$/.test(location.hash)) { state.view = 'question'; state.step = Number(location.hash.slice(10)) - 1; }
  }
  if (state.started) history.replaceState(null, '', routeHash());
  render();
  if (recovered) announce('Recuperamos tu avance guardado en este navegador.');
})();
