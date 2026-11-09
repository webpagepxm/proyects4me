(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ArchitectureBrief = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 1;
  const STORAGE_KEY = 'brief-arquitectura:v1';
  const PHONE = '522292507595';
  // A conservative heuristic, not a universal WhatsApp/browser limit.
  const MAX_LINK_LENGTH = 12000;
  const TEXT_LIMIT = 2000;
  const OTHER_LIMIT = 240;
  const chapters = [
    { title: 'Su estudio y sus clientes', short: 'Tu estudio', note: 'Cómo trabajas y a quién quieres llegar.' },
    { title: 'Su marca y presencia digital', short: 'Tu marca', note: 'Lo que muestras y lo que quieres transmitir.' },
    { title: 'Su operación cotidiana', short: 'Tu día a día', note: 'Los procesos que acompañan al diseño.' },
    { title: 'La solución ideal', short: 'Lo que viene', note: 'Una solución que tenga sentido para ti.' }
  ];
  const questions = [
    { id: 1, type: 'single', required: true, title: '¿Cómo trabajas actualmente?', choices: ['De manera independiente', 'Con un equipo pequeño', 'Con un despacho establecido', 'Colaboro con otros estudios'] },
    { id: 2, type: 'multi', title: '¿Qué servicios ofreces?', choices: ['Diseño arquitectónico', 'Interiorismo', 'Remodelaciones', 'Construcción y supervisión', 'Renders y visualización 3D', 'Consultoría / asesoría', 'Otros'], other: 'Otros' },
    { id: 3, type: 'multi', title: '¿Qué tipo de proyectos te interesa atraer?', choices: ['Casas y residencias', 'Hoteles y hospedaje', 'Restaurantes y comercios', 'Desarrollos inmobiliarios', 'Oficinas', 'Proyectos de interiorismo', 'Otros'], other: 'Otros' },
    { id: 4, type: 'multi', title: '¿De dónde llegan hoy tus clientes?', choices: ['Recomendaciones', 'Instagram / redes sociales', 'Google', 'Colaboraciones profesionales', 'Plataformas de arquitectura', 'Todavía no tengo un canal constante'], exclusive: 'Todavía no tengo un canal constante' },
    { id: 5, type: 'single', title: '¿Cuántas solicitudes de nuevos proyectos recibes aproximadamente al mes?', choices: ['0–2', '3–5', '6–10', 'Más de 10', 'No llevo ese registro'] },
    { id: 6, type: 'multi', title: '¿Qué tienes actualmente para mostrar tu trabajo?', choices: ['Instagram', 'Página web', 'Portafolio PDF', 'Google Business Profile', 'Behance / ArchDaily / similares', 'Nada organizado todavía'], exclusive: 'Nada organizado todavía' },
    { id: 7, type: 'single', required: true, title: '¿Qué te gustaría conseguir principalmente con este proyecto?', choices: ['Conseguir más clientes', 'Mostrar mi portafolio profesionalmente', 'Transmitir una imagen más sólida', 'Organizar mejor mi trabajo', 'Una combinación de lo anterior'] },
    { id: 8, type: 'multi', title: '¿Qué debería transmitir tu marca?', choices: ['Elegancia', 'Minimalismo', 'Calidez y cercanía', 'Innovación', 'Exclusividad', 'Sustentabilidad', 'Creatividad'] },
    { id: 9, type: 'single', title: '¿Tienes fotografías, renders y descripciones de tus proyectos?', choices: ['Sí, todo organizado', 'Sí, pero disperso', 'Solo algunos proyectos', 'Necesito crear el material'] },
    { id: 10, type: 'multi', title: '¿A qué clientes quieres llegar?', choices: ['Clientes locales', 'Clientes de otras ciudades de México', 'Extranjeros residentes en México', 'Clientes internacionales', 'Desarrolladores / empresas'] },
    { id: 11, type: 'multi', title: '¿Cómo te contactan normalmente los interesados?', choices: ['WhatsApp', 'Instagram DM', 'Llamadas', 'Correo electrónico', 'Formulario web', 'En persona'] },
    { id: 12, type: 'single', title: '¿Qué haces cuando llega una solicitud nueva?', choices: ['Respondo y coordino todo por WhatsApp', 'Agendo una llamada o reunión', 'Envío un cuestionario o brief', 'Tengo un proceso formal', 'Depende de cada cliente'] },
    { id: 13, type: 'multi', title: '¿Qué parte de tu trabajo te consume más tiempo fuera del diseño?', choices: ['Responder y dar seguimiento a clientes', 'Preparar cotizaciones', 'Organizar reuniones', 'Administrar proyectos y pendientes', 'Compartir avances y documentos', 'Coordinar proveedores y colaboradores'] },
    { id: 14, type: 'multi', title: '¿Cómo organizas tus proyectos actualmente?', choices: ['WhatsApp', 'Libreta / notas', 'Excel / Google Sheets', 'Trello / Notion / Asana', 'Software especializado', 'No tengo un sistema definido'], exclusive: 'No tengo un sistema definido' },
    { id: 15, type: 'single', title: '¿Te interesaría automatizar algunas actividades repetitivas?', choices: ['Sí, definitivamente', 'Sí, si es fácil de utilizar', 'Tal vez, necesito ver ejemplos', 'Por ahora no'] },
    { id: 16, type: 'multi', title: '¿Qué herramientas te resultarían más valiosas?', choices: ['Portafolio web premium', 'Formulario para nuevos clientes', 'Agenda de reuniones', 'Seguimiento de proyectos', 'Cotizaciones y propuestas', 'Respuestas automáticas por WhatsApp', 'Panel de clientes y proyectos', 'Estadísticas de visitas y contactos'] },
    { id: 17, type: 'single', title: '¿Qué tan importante es que puedas actualizar el contenido sin ayuda técnica?', choices: ['Indispensable', 'Me gustaría', 'No es prioritario', 'Prefiero delegarlo'] },
    { id: 18, type: 'multi', title: '¿Qué te preocupa más de implementar tecnología en tu negocio?', choices: ['Costo inicial', 'Mantenimiento', 'Que sea complicado de usar', 'Tiempo de implementación', 'Privacidad de información', 'No saber si realmente funcionará', 'Nada en particular'], exclusive: 'Nada en particular' },
    { id: 19, type: 'single', title: '¿En qué etapa estás respecto a invertir en una solución?', choices: ['Solo estoy explorando', 'Quiero empezar con algo pequeño', 'Tengo presupuesto y busco opciones', 'Quiero una solución por etapas', 'Prefiero hablarlo en la reunión'] },
    { id: 20, type: 'text', title: 'Imagina que pasan seis meses y este proyecto fue un éxito. ¿Qué cambió en tu negocio?' }
  ].map((question, index) => ({ ...question, chapter: Math.floor(index / 5) }));

  const wellFormed = value => Array.from(typeof value === 'string' ? value : '', c => {
    const n = c.codePointAt(0);
    return n >= 0xD800 && n <= 0xDFFF ? '\uFFFD' : c;
  }).join('').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  const emptyAnswer = () => ({ selected: [], other: '', text: '' });
  const initialState = () => ({ version: VERSION, started: false, step: 0, view: 'welcome', answers: {} });
  function normalizeAnswer(question, value) {
    const answer = emptyAnswer();
    if (!value || typeof value !== 'object' || Array.isArray(value)) return answer;
    if (question.type === 'text') { answer.text = wellFormed(value.text).slice(0, TEXT_LIMIT); return answer; }
    const selected = Array.isArray(value.selected) ? value.selected : [];
    answer.selected = question.choices.filter(choice => selected.includes(choice));
    if (question.type === 'single') answer.selected = answer.selected.slice(0, 1);
    if (question.exclusive && answer.selected.includes(question.exclusive)) answer.selected = [question.exclusive];
    answer.other = wellFormed(value.other).slice(0, OTHER_LIMIT);
    return answer;
  }
  function normalizeState(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.version !== VERSION || !raw.answers || typeof raw.answers !== 'object' || Array.isArray(raw.answers)) throw new Error('Unrecognized brief draft');
    const state = initialState();
    state.started = raw.started === true;
    state.step = Number.isInteger(raw.step) ? Math.min(19, Math.max(0, raw.step)) : 0;
    state.view = state.started ? (['welcome', 'question', 'review'].includes(raw.view) ? raw.view : 'question') : 'welcome';
    for (const question of questions) {
      if (Object.hasOwn(raw.answers, question.id)) state.answers[question.id] = normalizeAnswer(question, raw.answers[question.id]);
    }
    return state;
  }
  function getAnswer(state, question) { return normalizeAnswer(question, state.answers[question.id]); }
  function answered(state, question) {
    const answer = getAnswer(state, question);
    return question.type === 'text' ? !!answer.text.trim() : !!answer.selected.length;
  }
  function select(state, question, choice, checked = true) {
    if (!question.choices?.includes(choice)) return false;
    const answer = getAnswer(state, question);
    if (question.type === 'single') answer.selected = [choice];
    else if (!checked) answer.selected = answer.selected.filter(value => value !== choice);
    else if (choice === question.exclusive) answer.selected = [choice];
    else answer.selected = [...new Set([...answer.selected.filter(value => value !== question.exclusive), choice])];
    state.answers[question.id] = normalizeAnswer(question, answer);
    return true;
  }
  function updateText(state, question, field, value) {
    if (!['text', 'other'].includes(field) || (field === 'text' && question.type !== 'text') || (field === 'other' && !question.other)) return false;
    const answer = getAnswer(state, question);
    answer[field] = wellFormed(value).slice(0, field === 'text' ? TEXT_LIMIT : OTHER_LIMIT);
    state.answers[question.id] = answer;
    return true;
  }
  function errorFor(state, question) {
    const answer = getAnswer(state, question);
    if (question.required && !answered(state, question)) return 'Elige una opción para que podamos preparar un brief útil.';
    if (question.other && answer.selected.includes(question.other) && !answer.other.trim()) return 'Cuéntanos cuál es la otra opción o desmarca «Otros».';
    return '';
  }
  const errors = state => questions.filter(q => errorFor(state, q)).map(q => ({ id: q.id, message: errorFor(state, q) }));
  const count = state => questions.filter(q => answered(state, q)).length;
  function answerLines(state, question) {
    const answer = getAnswer(state, question);
    if (question.type === 'text') return [answer.text.trim() || 'Sin responder'];
    if (!answer.selected.length) return ['Sin responder'];
    return answer.selected.map(choice => choice === question.other ? `${choice}: ${answer.other.trim() || 'Sin especificar'}` : choice);
  }
  function buildText(state) {
    const lines = ['BRIEF DE ARQUITECTURA — RESPUESTAS', ''];
    chapters.forEach((chapter, index) => {
      lines.push(`CAPÍTULO ${index + 1} — ${chapter.title.toLocaleUpperCase('es-MX')}`, '');
      questions.filter(q => q.chapter === index).forEach(question => {
        lines.push(`${question.id}. ${question.title}`, ...answerLines(state, question).map(line => `Respuesta: ${line}`), '');
      });
    });
    return lines.join('\n').trim();
  }
  function whatsapp(state) {
    const text = buildText(state);
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    return { text, url, tooLong: url.length > MAX_LINK_LENGTH, length: url.length, chat: `https://wa.me/${PHONE}` };
  }
  return { VERSION, STORAGE_KEY, PHONE, MAX_LINK_LENGTH, TEXT_LIMIT, OTHER_LIMIT, chapters, questions, initialState, normalizeState, getAnswer, answered, select, updateText, errorFor, errors, count, answerLines, buildText, whatsapp };
});
