const assert = require('node:assert/strict');
const M = require('../model.js');

assert.equal(M.questions.length, 20);
assert.deepEqual(M.questions.map(q => q.id), Array.from({ length: 20 }, (_, i) => i + 1));
assert.deepEqual(M.chapters.map((_, i) => M.questions.filter(q => q.chapter === i).length), [5, 5, 5, 5]);
assert.deepEqual(M.questions.filter(q => q.required).map(q => q.id), [1, 7]);
assert.equal(M.questions.filter(q => q.type === 'text').length, 1);
assert.equal(M.questions[19].id, 20);

const state = M.initialState();
assert.equal(M.count(state), 0);
assert.deepEqual(M.errors(state).map(e => e.id), [1, 7]);
const q1 = M.questions[0], q2 = M.questions[1];
M.select(state, q1, q1.choices[0]); M.select(state, q1, q1.choices[1]);
assert.deepEqual(M.getAnswer(state, q1).selected, [q1.choices[1]], 'Radio selection replaces the previous value');
assert.equal(M.select(state, q1, '<script>'), false);
M.select(state, q2, q2.choices[0]); M.select(state, q2, q2.choices[1]);
assert.deepEqual(M.getAnswer(state, q2).selected, q2.choices.slice(0, 2));
M.select(state, q2, q2.choices[0], false);
assert.deepEqual(M.getAnswer(state, q2).selected, [q2.choices[1]]);
M.select(state, q2, q2.other);
assert.match(M.errorFor(state, q2), /otra opción/);
M.updateText(state, q2, 'other', 'Diseño & patrimonio / espacios públicos');
assert.equal(M.errorFor(state, q2), '');
assert.deepEqual(M.answerLines(state, q2), ['Interiorismo', 'Otros: Diseño & patrimonio / espacios públicos']);

for (const question of M.questions.filter(q => q.exclusive)) {
  M.select(state, question, question.choices[0]);
  M.select(state, question, question.choices[1]);
  M.select(state, question, question.exclusive);
  assert.deepEqual(M.getAnswer(state, question).selected, [question.exclusive]);
  M.select(state, question, question.choices[0]);
  assert.deepEqual(M.getAnswer(state, question).selected, [question.choices[0]], 'Specific choices remove the exclusive choice');
}
M.select(state, M.questions[6], M.questions[6].choices[0]);
assert.equal(M.errors(state).length, 0);
assert.equal(M.updateText(state, q1, 'text', 'ignored'), false);
assert.equal(M.updateText(state, q1, 'other', 'ignored'), false);
const q20 = M.questions[19];
const narrative = 'Más diseño & mejores proyectos. ¿Qué cambió? + tiempo #ideas 100%\nUna segunda línea, con acentos y 🏛️.';
M.updateText(state, q20, 'text', narrative);
const message = M.buildText(state), transport = M.whatsapp(state);
assert.ok(message.startsWith('BRIEF DE ARQUITECTURA — RESPUESTAS\n'));
assert.equal((message.match(/^CAPÍTULO \d — /gm) || []).length, 4);
assert.equal((message.match(/^\d+\. /gm) || []).length, 20);
for (const question of M.questions) assert.ok(message.includes(`${question.id}. ${question.title}\n`));
assert.ok(message.includes('Respuesta: Sin responder'));
assert.ok(message.includes('Otros: Diseño & patrimonio / espacios públicos'));
assert.ok(message.includes(narrative));
const url = new URL(transport.url);
assert.equal(url.origin, 'https://wa.me');
assert.equal(url.pathname, '/522292507595');
assert.equal(url.searchParams.get('text'), message, 'Full Unicode and punctuation survive encodeURIComponent');
assert.equal([...url.searchParams.keys()].length, 1);
assert.equal(transport.tooLong, false);

// A typical 20-answer brief uses the prefilled link; oversized drafts keep all text.
const full = M.initialState();
for (const q of M.questions) {
  if (q.choices) M.select(full, q, q.choices[0]);
  else M.updateText(full, q, 'text', 'Más tiempo para diseñar y un portafolio que represente mi estudio.');
}
assert.equal(M.count(full), 20);
assert.equal(M.whatsapp(full).tooLong, false);
M.updateText(full, q20, 'text', '漢'.repeat(M.TEXT_LIMIT));
assert.equal(M.whatsapp(full).tooLong, true);
assert.ok(M.whatsapp(full).text.endsWith('漢'.repeat(M.TEXT_LIMIT)), 'Oversized export is never truncated to fit a link');
assert.equal(M.whatsapp(full).chat, 'https://wa.me/522292507595');
M.updateText(full, q20, 'text', 'x\uD800');
assert.doesNotThrow(() => M.whatsapp(full));
assert.match(M.buildText(full), /x�/);

state.started = true; state.step = 12; state.view = 'review';
assert.deepEqual(M.normalizeState(JSON.parse(JSON.stringify(state))), state, 'Round-trip preserves answers and review');
state.view = 'welcome'; assert.equal(M.normalizeState(state).view, 'welcome');
assert.throws(() => M.normalizeState({ version: 2, answers: {} }));
assert.throws(() => M.normalizeState([]));
assert.throws(() => M.normalizeState({ version: 1, answers: [] }));
const dirty = M.normalizeState({ version: 1, started: true, step: 999, view: 'evil', answers: { 1: { selected: ['invalid', q1.choices[0], q1.choices[1]] }, 6: { selected: ['Instagram', 'Nada organizado todavía'] }, 20: { text: 'a'.repeat(5000) }, 99: { text: 'unknown question' } } });
assert.equal(dirty.step, 19);
assert.equal(dirty.view, 'question');
assert.deepEqual(dirty.answers[1].selected, [q1.choices[0]]);
assert.deepEqual(dirty.answers[6].selected, ['Nada organizado todavía']);
assert.equal(dirty.answers[20].text.length, M.TEXT_LIMIT);
assert.equal(dirty.answers[99], undefined);
const empty = M.buildText(M.initialState());
assert.equal((empty.match(/Respuesta: Sin responder/g) || []).length, 20);
assert.equal(M.STORAGE_KEY, 'brief-arquitectura:v1');
console.log('Architecture brief model: 20 questions, required/optional selection, exclusions, Other, Unicode, complete WhatsApp export, length fallback and draft validation passed.');
