// Real Chromium, isolated profiles and synthetic data only. No production records are written.
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const url=process.env.ROADMAP_TEST_URL||'http://127.0.0.1:8000',key='mi-tablero-personal-v1';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'America/Mexico_City',reducedMotion:'reduce'});
 await context.addInitScript(()=>{
  const R=Date;window.__testNow=R.parse('2026-11-08T09:00:00-06:00');
  window.Date=class extends R{constructor(...args){super(...(args.length?args:[window.__testNow]));}static now(){return window.__testNow;}};
  const interval=window.setInterval;window.setInterval=(fn,delay)=>{if(delay===60000)window.__directorTick=fn;return interval(fn,delay);};
 });
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const seed={checks:{'torre-0':true,'personal-2':true},note:'Nota anterior',daily:{'2026-11-07':{coachDeparture:'15:30',coachShift:true}},integratedDenbouProgress:{'calendar:0':45}};
 await page.addInitScript(({key,seed})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(seed));},{key,seed});
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 const saved=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const tab=id=>page.locator(`#tabs [data-tab="${id}"]`).evaluate(e=>e.click());
 const expand=()=>page.locator('#proyectos details').evaluateAll(es=>es.forEach(e=>e.open=true));
 const open=async id=>{await tab('proyectos');if(await page.locator('#projectBack').isVisible())await page.locator('#projectBack').click();await page.locator(`#projectDirectory [data-open-project="${id}"]`).click();};
 const axe=async label=>{const result=await new AxeBuilder({page}).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`Accessibility ${label}`);};
 const advance=async(hour,minute=0)=>page.evaluate(({hour,minute})=>{window.__testNow=Date.parse(`2026-11-08T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00-06:00`);window.__directorTick();},{hour,minute});
 assert.equal(await page.locator('[data-side-nav=vida]').count(),0);
 assert.equal(await page.locator('#hoy input:visible').count(),0,'The day works with no forms or checkboxes');
 assert.equal(await page.locator('.director-now').count(),1);assert.ok(await page.locator('.director-next li').count()<=2);
 assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'breakfast');
 assert.deepEqual(await saved(),seed,'Opening is read-only, including old records and estimates');
 await advance(11);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'movement');await advance(13);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'meal');assert.deepEqual(await saved(),seed,'Time does not fabricate completions');
 await advance(9);await page.locator('.director-now').evaluate(e=>e.dataset.marker='retained');await page.evaluate(()=>window.__directorTick());assert.equal(await page.locator('.director-now').getAttribute('data-marker'),'retained','Unchanged model keeps the same DOM');
 await page.locator('#personalRecords>summary').click();
 const breakfast=page.locator('#lifeIndicatorsV2 [data-task="daily-2026-11-08-breakfast"]');
 await breakfast.focus();const scroll=await page.evaluate(()=>scrollY);await breakfast.press('Space');
 assert.equal((await saved()).checks['daily-2026-11-08-breakfast'],true);assert.equal(await breakfast.evaluate(e=>document.activeElement===e),true);assert.equal(await page.evaluate(()=>scrollY),scroll);assert.equal(await page.locator('#personalRecords').evaluate(e=>e.open),true);
 assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'movement');
 await tab('mas');await page.locator('#daySettings>summary').click();
 assert.equal(await page.locator('#coachDeparture').inputValue(),'','No default departure is invented');
 await page.locator('#coachDeparture').fill('15:30');await page.locator('#coachWorkStart').fill('16:00');await page.locator('#coachWorkEnd').fill('23:00');await page.locator('#coachCommute').fill('30');await page.locator('[data-coach-action=shift-yes]').click();await page.locator('[data-coach-action=repeat-weekday]').click();
 assert.equal((await saved()).weeklySchedule['0'].coachWorkStart,'16:00');
 await tab('hoy');await advance(15,10);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'departure');assert.match(await page.locator('.director-next').textContent(),/15:30/);
 await advance(15,40);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'commute');await advance(17);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'work');assert.equal(await page.locator('#homePriority').isVisible(),false);await advance(23,10);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'recovery');await advance(9);
 await tab('proyectos');const ids=await page.locator('#projectDirectory [data-open-project]').evaluateAll(es=>es.map(e=>e.dataset.openProject));assert.equal(ids.length,6);
 assert.equal(await page.locator('#portfolioV2 [role=progressbar]').count(),1);
 for(const id of ids){await open(id);assert.equal(await page.locator(`#project-${id}`).isVisible(),true);assert.equal(await page.locator(`#project-${id}`).evaluate(e=>document.activeElement===e),true);assert.ok(await page.locator(`#project-${id} [role=progressbar]`).count()>0);await axe(`project ${id}`);}
 await open('torre');await expand();const task=page.locator('#project-torre input[data-task]').first(),taskId=await task.getAttribute('data-task');await task.check();assert.equal((await saved()).checks[taskId],true);assert.equal(await task.isVisible(),true);assert.equal(await task.evaluate(e=>document.activeElement===e),true);
 await open('backstage');await expand();const slider=page.locator('[data-merged-slider=calendar]').first();await slider.press('End');for(let n=0;n<4;n++)await slider.press('ArrowLeft');assert.equal((await saved()).integratedDenbouProgress['calendar:0'],80);
 const stage=parseInt(await page.locator('[data-merged-stage-pct=calendar]').textContent(),10),combined=parseInt(await page.locator('[data-merged-total]').textContent(),10);
 assert.equal(Number(await page.locator('[data-stage-bar=calendar]').getAttribute('aria-valuenow')),stage);assert.equal(Number(await page.locator('[data-merged-bar]').getAttribute('aria-valuenow')),combined);assert.equal(Number(await page.locator('[data-group-bar=calendar]').getAttribute('aria-valuenow')),stage);
 await open('torre');const torre=parseInt(await page.locator('#project-torre [data-project-total]').textContent(),10);await page.locator('#projectBack').click();assert.equal(Number(await page.locator('#portfolioV2 [role=progressbar]').getAttribute('aria-valuenow')),Math.round(combined*.7+torre*.3));assert.equal(Number(await page.locator('#projectDirectory [data-open-project=backstage] [role=progressbar]').getAttribute('aria-valuenow')),combined);
 await page.locator('#filter').fill('Crear, abrir y editar eventos');await page.locator('#projectDirectory [data-open-project=backstage]').click();assert.equal(await page.locator('[data-stage-members="core,finance,ux,security"]').textContent(),'65%');await page.locator('#projectBack').click();await page.locator('#filter').fill('no-such-task-9876');assert.equal(await page.locator('#projectDirectory [data-open-project]').count(),0);await page.locator('#filter').fill('');assert.equal(await page.locator('#projectDirectory [data-open-project]').count(),6);
 await tab('revision');await page.locator('#dailyNote').fill('Nota conservada tras recargar');await page.reload();assert.equal((await saved()).checks[taskId],true);assert.equal((await saved()).note,'Nota conservada tras recargar');assert.equal((await saved()).integratedDenbouProgress['calendar:0'],80);
 // Dated evidence from another tab updates the recommendation and Wellness automatically.
 const peer=await context.newPage();await peer.goto(url);
 await peer.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k));Object.assign(s.checks,{'daily-2026-11-08-food':true,'daily-2026-11-08-move':true,'daily-2026-11-08-rest':false,'daily-2026-11-07-breakfast':true,'daily-2026-11-07-move':true});localStorage.setItem(k,JSON.stringify(s));},key);
 await page.waitForFunction(()=>document.querySelector('.director-now').dataset.directorKind==='project');await peer.close();
 await tab('wellness');assert.equal(await page.locator('.wellness-ring').count(),3);assert.match(await page.locator('.wellness-metrics').textContent(),/2 de 2 registros confirmados/);assert.equal(await page.locator('.wellness-chart').count(),1);await page.locator('#wellnessPeriod').selectOption('14');assert.match(await page.locator('.wellness-chart svg').getAttribute('aria-label'),/14 días/);await axe('dated Wellness');for(const width of [320,390,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Dated history does not overflow');}await page.setViewportSize({width:390,height:844});
 await open('backstage');await expand();const snapshot=await saved();
 await page.evaluate(()=>{window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError')};});await slider.press('Home');assert.equal(await slider.inputValue(),'80');assert.deepEqual(await saved(),snapshot);assert.match(await page.locator('#saveStatus').textContent(),/No se pudo guardar/);await page.evaluate(()=>Storage.prototype.setItem=window.originalSetItem);
 // New repeating preferences survive a real JSON restoration; invalid imports change nothing.
 await tab('revision');const backup={...seed,weeklySchedule:{'0':{coachWorkStart:'16:00',coachWorkEnd:'23:00',coachCommute:30,coachShift:true}}};
 page.once('dialog',d=>d.accept());await page.locator('#backupFile').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).note==='Nota anterior',key);assert.deepEqual((await saved()).weeklySchedule,backup.weeklySchedule);await tab('hoy');await advance(17);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'work','Weekly schedule applies without a daily form');await advance(9);await tab('revision');
 const beforeBad=await saved();await page.locator('#backupFile').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...backup,checks:{},weeklySchedule:[]}))});assert.deepEqual(await saved(),beforeBad);
 await tab('wellness');assert.equal(await page.locator('.wellness-ring').count(),0);assert.match(await page.locator('.wellness-metrics').textContent(),/Sin datos/);assert.equal(await page.locator('.wellness-chart').count(),0);
 for(const width of [320,360,375,390,430,768,1024,1280,1440]){
  await page.setViewportSize({width,height:900});for(const id of ['hoy','proyectos','wellness','mas','semana','revision']){await tab(id);await page.locator(`#${id} details`).evaluateAll(es=>es.forEach(e=>e.open=true));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow ${width}/${id}`);}
  await open('backstage');await expand();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Detail ${width}`);
 }
 await page.setViewportSize({width:720,height:450});const zoom=await page.addStyleTag({content:'body{zoom:2}'});for(const id of ['hoy','proyectos','wellness','mas','semana','revision']){await tab(id);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Zoom ${id}`);}await zoom.evaluate(e=>e.remove());
 await page.setViewportSize({width:390,height:844});for(const id of ['hoy','proyectos','wellness','mas','semana','revision']){await tab(id);await page.locator(`#${id} details`).evaluateAll(es=>es.forEach(e=>e.open=true));await axe(id);}await open('backstage');await expand();await axe('expanded progress');
 // Midnight changes personal record IDs and the calendar without writing a completion.
 await tab('hoy');const beforeMidnight=await saved();
 await page.evaluate(()=>{window.__testNow=Date.parse('2026-11-09T00:01:00-06:00');window.__directorTick();});
 assert.equal(await page.locator('#lifeIndicatorsV2 [data-task="daily-2026-11-09-breakfast"]').count(),1);
 assert.deepEqual(await saved(),beforeMidnight);assert.equal(await page.locator('.director-now').getAttribute('data-director-kind'),'rest');
 // Malformed estimates are unknown, never silently transformed into 0%.
 await page.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k));s.integratedDenbouProgress['calendar:0']='not-an-estimate';localStorage.setItem(k,JSON.stringify(s));},key);await page.reload();await open('backstage');assert.match(await page.locator('[data-merged-total]').textContent(),/Sin estimación/);assert.equal(await page.locator('[data-merged-bar]').count(),0);assert.doesNotMatch(await page.locator('#proyectos').textContent(),/null%|NaN/);
 // A first visit with blocked writes still provides useful read-only guidance.
 const fresh=await browser.newContext({viewport:{width:390,height:844}}),p=await fresh.newPage();await p.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Denied','SecurityError')};});await p.goto(url);assert.equal(await p.locator('.director-now').count(),1);assert.equal(await p.evaluate(k=>localStorage.getItem(k),key),null);await fresh.close();
 assert.deepEqual(errors,[]);console.log('ROADMAP browser: passive opening/timer, optional records and schedules, cross-tab updates, six project routes, live progress hierarchy, real/empty Wellness, backup integrity, failure recovery, nine widths, 200% zoom and accessibility passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
