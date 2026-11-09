const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const M = require('../model.js');
const BASE = (process.env.BRIEF_TEST_URL || 'http://127.0.0.1:8006/proyects4me/brief-arquitectura/').replace(/\/?$/, '/');
const artifacts = process.env.BRIEF_ARTIFACT_DIR;
const consoleErrors = [], externalRequests = [];
const fakeRoadmap = { 'mi-tablero-personal-v1': 'roadmap-unchanged', 'roadmap-intelligence-v1': 'intelligence-unchanged' };
const full = M.initialState(); full.started = true; full.view = 'question';
for (const q of M.questions) {
  if (q.choices) M.select(full, q, q.choices[0]);
  else M.updateText(full, q, 'text', 'Más tiempo para diseñar y una presencia digital que represente mi estudio.');
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined), headless: true, args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', acceptDownloads: true });
    const page = await context.newPage();
    page.on('pageerror', e => consoleErrors.push(e.message));
    page.on('console', e => { if (e.type() === 'error') consoleErrors.push(e.text()); });
    page.on('request', request => { if (!request.url().startsWith(new URL(BASE).origin) && !request.url().startsWith('blob:') && !request.url().startsWith('data:')) externalRequests.push(request.url()); });
    const click = async action => page.locator(`[data-action="${action}"]`).first().click();
    const question = async number => page.waitForSelector(`#main[data-view="question"][data-step="${number - 1}"]`);
    const screenshot = async (name, fullPage = true) => {
      if (!artifacts) return; fs.mkdirSync(artifacts, { recursive: true });
      await page.screenshot({ path: `${artifacts}/${name}.png`, fullPage });
    };
    const axe = async label => {
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], 'Accessibility: ' + label);
    };
    const draft = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), M.STORAGE_KEY);
    const expectedText = async () => M.buildText(M.normalizeState(await draft()));
    await page.goto(BASE);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), M.STORAGE_KEY), null, 'Opening never writes a draft');
    assert.equal(await page.locator('input').count(), 0, 'No identity collection on cover');
    await screenshot('cover-iphone'); await axe('cover');
    await page.evaluate(markers => { for (const [key, value] of Object.entries(markers)) localStorage.setItem(key, value); }, fakeRoadmap);
    await click('start'); await question(1);
    await page.locator('[form="question-form"]').click();
    assert.equal(await page.locator('#question-error').isVisible(), true);
    assert.equal((await draft()).step, 0);
    await page.getByLabel('De manera independiente', { exact: true }).check();
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.getByLabel('Con un equipo pequeño', { exact: true }).isChecked(), true, 'Native radio arrow keys work');
    await page.keyboard.press('ArrowUp');
    await page.locator('[form="question-form"]').click(); await question(2);
    await page.getByLabel('Diseño arquitectónico', { exact: true }).check();
    await page.getByLabel('Interiorismo', { exact: true }).check();
    await page.getByLabel('Otros', { exact: true }).check();
    await page.locator('[form="question-form"]').click();
    assert.match(await page.locator('#question-error').innerText(), /otra opción/);
    await page.getByLabel('¿Qué otros servicios ofreces?').fill('Diseño & patrimonio / espacios públicos');
    await click('back'); await question(1);
    assert.equal(await page.getByLabel('De manera independiente', { exact: true }).isChecked(), true);
    await page.locator('[form="question-form"]').click(); await question(2);
    assert.equal(await page.getByLabel('Interiorismo', { exact: true }).isChecked(), true);
    await page.reload(); await question(2);
    assert.equal(await page.getByLabel('¿Qué otros servicios ofreces?').inputValue(), 'Diseño & patrimonio / espacios públicos');
    await page.locator('[form="question-form"]').click(); await question(3);
    await click('skip'); await question(4);
    await page.getByLabel('Recomendaciones', { exact: true }).check();
    await page.getByLabel('Todavía no tengo un canal constante', { exact: true }).check();
    assert.equal(await page.getByLabel('Recomendaciones', { exact: true }).isChecked(), false);
    await page.getByLabel('Google', { exact: true }).check();
    assert.equal(await page.getByLabel('Todavía no tengo un canal constante', { exact: true }).isChecked(), false);
    await click('review'); await page.waitForSelector('#main[data-view="review"]');
    assert.match(await page.locator('.review-warning').innerText(), /Pregunta 7/);
    await click('whatsapp');
    assert.equal(await page.locator('#dialog').isVisible(), false, 'Missing required answers do not open WhatsApp');
    await page.locator('[data-action="edit"][data-value="6"]').first().click(); await question(7);
    await page.getByLabel('Mostrar mi portafolio profesionalmente', { exact: true }).check();
    await click('return-review'); await page.waitForSelector('#main[data-view="review"]');
    assert.equal(await page.locator('.review-warning').count(), 0);
    await page.locator('[data-action="edit"][data-value="19"]').click(); await question(20);
    const narrative = '<script>window.briefInjected = true</script>\nMás diseño & tiempo. ¿Qué cambió? #ideas + 100% 🏛️';
    await page.getByLabel('Tu respuesta', { exact: true }).fill(narrative);
    await page.locator('[form="question-form"]').click(); await page.waitForSelector('#main[data-view="review"]');
    assert.equal(await page.locator('.review-answer').count(), 20);
    assert.match(await page.locator('.review-answer').last().innerText(), /<script>/);
    assert.equal(await page.evaluate(() => window.briefInjected), undefined, 'User text is escaped');
    assert.ok((await page.locator('.unanswered').allInnerTexts()).includes('Sin responder'));

    // Clipboard and download contain the exact same complete, numbered text.
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedBrief = text; } } }));
    await click('copy');
    assert.equal(await page.evaluate(() => window.copiedBrief), await expectedText());
    const downloadEvent = page.waitForEvent('download'); await click('download');
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), 'brief-arquitectura.txt');
    const downloaded = fs.readFileSync(await download.path(), 'utf8').replace(/^\uFEFF/, '');
    assert.equal(downloaded, await expectedText());
    await page.evaluate(() => {
      window.openedBriefUrls = [];
      window.open = (url, target) => {
        window.openedBriefUrls.push([url, target]);
        return { opener: 'pending', location: { replace: destination => { window.prefilledBriefUrl = destination; } }, close() {} };
      };
    });
    await click('whatsapp');
    const outgoing = new URL(await page.evaluate(() => window.prefilledBriefUrl));
    assert.equal(outgoing.origin, 'https://wa.me');
    assert.equal(outgoing.pathname, '/522292507595');
    assert.equal(outgoing.searchParams.get('text'), await expectedText());
    assert.doesNotMatch(await page.locator('#announcement').innerText(), /enviado|se envió/i);
    await page.evaluate(() => { window.open = () => null; });
    await click('whatsapp');
    assert.match(await page.locator('#dialog').innerText(), /no permitió abrir/);
    assert.equal(await page.locator('#dialog a').getAttribute('href'), 'https://wa.me/522292507595');
    await axe('popup blocked dialog');
    await page.keyboard.press('Escape'); assert.equal(await page.locator('#dialog').isVisible(), false);

    // Oversized Unicode text never becomes a partial prefilled message.
    await page.locator('[data-action="edit"][data-value="19"]').click(); await question(20);
    await page.getByLabel('Tu respuesta', { exact: true }).fill('漢'.repeat(M.TEXT_LIMIT));
    await click('return-review');
    assert.equal(await page.locator('.length-note').isVisible(), true);
    await click('whatsapp');
    assert.match(await page.locator('#dialog').innerText(), /largo para un enlace/);
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('denied'); } } });
      document.execCommand = () => false;
    });
    await page.locator('#dialog [data-action="copy"]').click();
    assert.equal(await page.locator('#manual-copy').inputValue(), await expectedText());
    assert.equal(await page.evaluate(() => { const t = document.querySelector('#manual-copy'); return t.selectionEnd === t.value.length; }), true);
    assert.equal(await page.evaluate(() => { const r = document.querySelector('dialog').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }), true);
    await axe('manual copy dialog');
    await screenshot('manual-copy-iphone', false);
    await click('close-dialog');

    // Storage failures preserve the in-memory draft and never claim a successful save.
    await page.locator('[data-action="edit"][data-value="19"]').click(); await question(20);
    await page.evaluate(key => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, value) { if (k === key) throw new DOMException('Quota exceeded', 'QuotaExceededError'); return original.call(this, k, value); };
    }, M.STORAGE_KEY);
    await page.getByLabel('Tu respuesta', { exact: true }).fill('Esta respuesta se conserva en memoria.');
    assert.equal(await page.locator('#storage-status').isVisible(), true);
    assert.match(await page.locator('#persistence-note').innerText(), /esta sesión/);
    await click('return-review');
    assert.match(await page.locator('.review-answer').last().innerText(), /se conserva en memoria/);
    await page.reload();
    // The last persisted answer is recoverable; the failed write was not claimed saved.
    assert.match(await page.locator('.review-answer').last().innerText(), /漢/);
    await click('reset'); await page.locator('#dialog [data-action="confirm-reset"]').click();
    await page.waitForSelector('#main[data-view="welcome"]');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), M.STORAGE_KEY), null);
    for (const [key, value] of Object.entries(fakeRoadmap)) assert.equal(await page.evaluate(key => localStorage.getItem(key), key), value);
    await page.evaluate(key => localStorage.setItem(key, '{corrupted draft'), M.STORAGE_KEY);
    await page.reload();
    assert.match(await page.locator('#storage-status').innerText(), /No se pudo recuperar/);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), M.STORAGE_KEY), '{corrupted draft');
    await click('start'); await click('close-dialog');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), M.STORAGE_KEY), '{corrupted draft');
    await click('start'); await click('replace-corrupt'); await question(1);
    assert.equal((await draft()).version, 1);

    // All questions at every requested width; audit every question on mobile and desktop.
    await page.evaluate(({ key, data }) => localStorage.setItem(key, JSON.stringify(data)), { key: M.STORAGE_KEY, data: full });
    await page.reload();
    assert.equal(M.count(M.normalizeState(await draft())), 20);
    let responsiveChecks = 0, accessibilityChecks = 3;
    for (const width of [320, 375, 390, 430, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: width >= 1280 ? 1000 : 844 });
      for (const number of Array.from({ length: 20 }, (_, i) => i + 1)) {
        await page.goto(BASE + '#pregunta-' + number); await question(number);
        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          headings: document.querySelectorAll('main h1').length,
          brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).length,
          smallButtons: [...document.querySelectorAll('button, a.button')].filter(e => e.getBoundingClientRect().width && !e.closest('[hidden]')).filter(e => e.getBoundingClientRect().height < 43 || e.getBoundingClientRect().width < 43).map(e => e.outerHTML.slice(0, 120))
        }));
        assert.equal(layout.overflow, false, `Overflow ${width} question ${number}`);
        assert.equal(layout.headings, 1); assert.equal(layout.brokenImages, 0);
        assert.deepEqual(layout.smallButtons, [], `Touch controls ${width} question ${number}`);
        if ([390, 1440].includes(width)) { await axe(width + ' question ' + number); accessibilityChecks++; }
        responsiveChecks++;
        if (width === 390 && [1, 2, 20].includes(number)) await screenshot('question-' + number + '-iphone');
        if (width === 1440 && number === 2) await screenshot('question-desktop');
      }
      await click('review'); await page.waitForSelector('#main[data-view="review"]');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'Review overflow ' + width);
      await axe('review ' + width); accessibilityChecks++;
      if (width === 390) await screenshot('review-iphone');
      console.log(`Responsive: ${width}px, 20 questions and review passed.`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 }); await click('home'); await screenshot('cover-desktop'); await axe('cover desktop'); accessibilityChecks++;
    await page.setViewportSize({ width: 320, height: 740 }); await axe('cover 320'); accessibilityChecks++;
    await click('start');
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.button.primary')).transitionDuration), '0s', 'Reduced motion');
    const before = (await draft()).step;
    await page.locator('[data-action="chapter"][data-value="0"]').click(); await question(1);
    await page.goBack(); await question(before + 1);
    assert.deepEqual(consoleErrors, [], 'No console or page errors');
    assert.deepEqual(externalRequests, [], 'No off-site requests before explicit WhatsApp navigation');
    console.log(`Architecture brief browser: ${responsiveChecks} responsive question checks, ${accessibilityChecks} accessibility scans; selection, required/optional, editing, persistence, copy/download, complete encoded WhatsApp, blocked popup, oversized message, failed clipboard/storage, reset isolation, Unicode and reduced motion passed.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
