/* Run with a static server. Tools are installed outside this static site. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const base = (process.env.TORRE_TEST_URL || 'http://127.0.0.1:8004/torre-fuerte-demo/').replace(/\/?$/, '/');
const artifactDir = process.env.TORRE_ARTIFACT_DIR;
const routes = ['landing', 'garage', 'history', 'benefits', 'passport', 'tracking', 'workshop', 'orders', 'order/TF-1042', 'clients', 'client/carlos', 'bikes', 'bike/ft150', 'agenda', 'messages', 'conversation', 'mechanic', 'mechanic-order/TF-1042', 'team', 'cash', 'inventory', 'club-admin', 'more', 'final'];
const errors = [], external = [], accessibility = [];
let checks = 0;

(async () => {
  const executablePath = process.env.CHROMIUM_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
    page.on('request', req => { if (!req.url().startsWith(new URL(base).origin) && !req.url().startsWith('data:')) external.push(req.url()); });
    await page.goto(base);
    await page.evaluate(() => {
      localStorage.setItem('mi-tablero-personal-v1', 'unchanged-roadmap-marker');
      localStorage.setItem('roadmap-intelligence-v1', 'unchanged-intelligence-marker');
    });
    const navigate = async path => {
      await page.goto(base + '#/' + path);
      await page.waitForSelector(`#main[data-route="${path.split('/')[0]}"] h1`);
    };
    const act = async (action, root = page) => {
      await root.locator(`[data-action="${action}"]`).first().click();
    };
    const screenshot = async name => {
      if (!artifactDir) return;
      fs.mkdirSync(artifactDir, { recursive: true });
      await page.screenshot({ path: artifactDir + '/' + name + '.png', fullPage: true });
    };
    for (const width of [375, 390, 430, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: width >= 1280 ? 1000 : 844 });
      for (const path of routes) {
        await navigate(path);
        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          images: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
          headings: document.querySelectorAll('main h1').length,
          ribbon: document.querySelector('.demo-ribbon').getBoundingClientRect().top >= 0,
          smallButtons: [...document.querySelectorAll('button, select')].filter(e => e.getBoundingClientRect().width && !e.closest('[hidden]')).filter(e => e.getBoundingClientRect().height < 43 || e.getBoundingClientRect().width < 43).map(e => e.outerHTML.slice(0, 180))
        }));
        assert.equal(result.overflow, false, `Overflow: ${width} ${path}`);
        assert.deepEqual(result.images, [], `Broken images: ${width} ${path}`);
        assert.equal(result.headings, 1, `Exactly one h1: ${path}`);
        assert.deepEqual(result.smallButtons, [], `44px touch controls: ${width} ${path}`);
        if ([390, 1440].includes(width)) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          accessibility.push(...axe.violations.map(v => ({ route: path, width, id: v.id, nodes: v.nodes.map(n => n.target) })));
        }
        checks++;
        if ((width === 390 && ['garage', 'workshop', 'tracking', 'conversation', 'mechanic'].includes(path)) || (width === 1440 && ['landing', 'garage', 'workshop'].includes(path))) await screenshot(path + '-' + width);
      }
      console.log(`Responsive: ${width}px, ${routes.length} routes checked.`);
    }
    assert.deepEqual(accessibility, [], 'WCAG A/AA automated violations');

    // Present the same story on iPhone, including real controls within each scene.
    await page.setViewportSize({ width: 390, height: 844 });
    await navigate('landing');
    await act('story-start');
    await page.waitForSelector('#main[data-route="garage"]');
    await act('schedule');
    await page.waitForSelector('#main[data-route="conversation"]');
    for (let i = 0; i < 3; i++) await act('chat-next');
    assert.match(await page.locator('.chat-body').innerText(), /Tu solicitud quedó registrada/);
    assert.equal(await page.locator('#sidebar').isVisible(), false, 'Customer conversation has no admin navigation');
    await act('story-next');
    await page.waitForSelector('#main[data-route="workshop"]');
    assert.match(await page.locator('.notice').innerText(), /Carlos.*11:00/);
    await page.getByRole('link', { name: 'Abrir expediente', exact: true }).first().click();
    await page.waitForSelector('#main[data-route="bike"]');
    assert.match(await page.locator('main').innerText(), /Carlos Hernández/);
    await act('assign-miguel');
    await act('story-next');
    await page.waitForSelector('#main[data-route="mechanic"]');
    await page.locator('a[href="#/mechanic-order/TF-1042"]').click();
    await page.waitForSelector('#main[data-route="mechanic-order"]');
    assert.doesNotMatch(await page.locator('main').innerText(), /Saldo|Anticipo|MXN|Caja|\$/);
    await act('observe');
    await act('finish');
    assert.match(await page.locator('main').innerText(), /Lista para entregar/);
    await screenshot('story-mechanic-finished-390');
    await act('story-next');
    await page.waitForSelector('#main[data-route="tracking"]');
    assert.match(await page.locator('main').innerText(), /Todo listo, Carlos/);
    assert.match(await page.locator('main').innerText(), /3 visitas elegibles/);
    await screenshot('story-customer-ready-390');
    const axeStory = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(axeStory.violations.map(v => v.id), []);
    await act('story-prev'); await page.waitForSelector('#main[data-route="mechanic"]');
    await act('story-next'); await page.waitForSelector('#main[data-route="tracking"]');
    assert.match(await page.locator('main').innerText(), /3 visitas elegibles/, 'Back and forward do not duplicate loyalty');
    await act('story-next'); await page.waitForSelector('#main[data-route="final"]');
    assert.match(await page.locator('h1').innerText(), /Una moto atendida/);
    await act('story-explore', page.locator('#story'));
    await page.waitForSelector('#main[data-route="workshop"]');
    assert.equal(await page.locator('#story').isVisible(), false);

    // Shared state, financial simulation and duplicate protection.
    await navigate('agenda');
    assert.equal(await page.getByRole('heading', { name: 'Carlos Hernández', exact: true }).count(), 1);
    await act('agenda-week');
    assert.match(await page.locator('main').innerText(), /Lucía Ruiz/);
    await navigate('history');
    assert.match(await page.locator('.service-history').innerText(), /TF-1042/);
    await act('maintenance');
    await page.locator('#maintenance-form select').selectOption({ label: 'Limpieza y lubricación' });
    await page.getByRole('button', { name: 'Añadir a mi historial' }).click();
    assert.match(await page.locator('.service-history').innerText(), /Registrado por mí/);
    await navigate('benefits');
    assert.match(await page.locator('.club-panel').innerText(), /3 visitas elegibles/);
    await navigate('garage'); await act('km');
    await page.locator('input[name="km"]').fill('18600');
    await page.locator('#km-form button').click();
    assert.match(await page.locator('.odometer').innerText(), /18,600/);
    await navigate('bike/ft150');
    assert.match(await page.locator('.page-heading').innerText(), /18,600/);
    await navigate('order/TF-1042'); await act('payment');
    const dialog = page.locator('#dialog');
    assert.equal(await dialog.isVisible(), true);
    assert.equal(await page.evaluate(() => {const r = document.querySelector('dialog').getBoundingClientRect();return r.top >= 0 && r.bottom <= innerHeight;}), true, 'Dialog fits mobile viewport');
    const dialogAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(dialogAxe.violations.map(v => v.id), []);
    await page.locator('#payment-form select').selectOption('Tarjeta');
    await page.locator('#payment-form button').click();
    assert.match(await page.locator('.money-list .total').innerText(), /\$0/);
    await act('advance');
    assert.match(await page.locator('.page-heading').innerText(), /Entregada/);
    await navigate('cash');
    assert.match(await page.locator('.transaction-list').innerText(), /Cobro · TF-1042/);
    await navigate('orders'); await act('new-order');
    await page.locator('#order-form select').selectOption('yamaha');
    await page.locator('#order-form button').click();
    await page.waitForSelector('#main[data-route="order"]');
    assert.match(await page.locator('.page-heading').innerText(), /TF-1045/);
    await act('assign'); await page.locator('#assign-form select').selectOption('elena');
    await page.locator('#assign-form button').click();
    assert.match(await page.locator('.page-heading').innerText(), /Elena/);
    await navigate('clients'); await page.locator('#search').fill('carlos');
    assert.equal(await page.locator('.client-row').count(), 1);
    await page.locator('#search').fill('no-existe');
    assert.match(await page.locator('.empty').innerText(), /No se encontraron/);
    await navigate('__proto__'); assert.match(await page.locator('h1').innerText(), /no existe/);
    await navigate('order/no-existe'); assert.match(await page.locator('h1').innerText(), /no existe/);
    await navigate('mechanic-order/TF-1043'); assert.match(await page.locator('h1').innerText(), /no asignada/);

    // Full reset preserves the separate application, with no demo persistence.
    await act('reset'); await act('confirm-reset');
    await page.waitForSelector('#main[data-route="landing"]');
    await navigate('garage'); assert.match(await page.locator('.odometer').innerText(), /18,450/);
    await navigate('history'); assert.equal(await page.locator('.service-history li').count(), 3);
    await navigate('tracking'); assert.match(await page.locator('.tracking-current').innerText(), /Diagnóstico/);
    await navigate('agenda'); assert.equal(await page.getByRole('heading', { name: 'Carlos Hernández', exact: true }).count(), 0);
    await navigate('cash'); assert.doesNotMatch(await page.locator('.transaction-list').innerText(), /Cobro · TF-1042/);
    assert.deepEqual(await page.evaluate(() => Object.fromEntries(Object.entries(localStorage))), {
      'mi-tablero-personal-v1': 'unchanged-roadmap-marker', 'roadmap-intelligence-v1': 'unchanged-intelligence-marker'
    });
    assert.equal(await page.evaluate(() => sessionStorage.length), 0);
    await navigate('landing'); await act('register'); await act('activate-garage');
    await page.waitForSelector('#main[data-route="garage"]');
    assert.match(await page.locator('.customer-greeting').innerText(), /activado/);
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.btn')).transitionDuration), '0s', 'Reduced motion is respected');

    // Keyboard escape and focus return for a dialog.
    await page.locator('[data-action="km"]').focus(); await page.keyboard.press('Enter');
    await page.keyboard.press('Escape'); assert.equal(await dialog.isVisible(), false);
    assert.equal(await page.evaluate(() => document.activeElement.dataset.action), 'km');
    assert.deepEqual(errors, [], 'Browser console and page errors');
    assert.deepEqual(external, [], 'All requests stay on the static site origin');
    console.log(`Torre Fuerte browser: ${checks} responsive route checks; 48 route accessibility scans; full iPhone story, dialogs, state, registration, payment, reset, storage isolation and reduced motion passed.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
