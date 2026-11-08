// NODE_PATH=/workspace/roadmap-tools/node_modules node tests/roadmap-browser.cjs
// Serve this checkout on port 8000. Isolated contexts use synthetic local data only.
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const url=process.env.ROADMAP_TEST_URL||'http://127.0.0.1:8000';
const storageKey='mi-tablero-personal-v1';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'America/Mexico_City',reducedMotion:'reduce'});
 await context.addInitScript(()=>{
   const RealDate=Date;const instant=new RealDate('2026-11-08T09:00:00-06:00').getTime();
   window.Date=class extends RealDate{constructor(...args){super(...(args.length?args:[instant]));}static now(){return instant;}};
 });
 const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
 const seed={checks:{'torre-0':true},note:'Nota anterior de prueba',daily:{},integratedDenbouProgress:{'calendar:0':45}};
 await page.addInitScript(({storageKey,seed})=>{if(!localStorage.getItem(storageKey))localStorage.setItem(storageKey,JSON.stringify(seed));},{storageKey,seed});
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 const saved=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),storageKey);
 const tab=id=>page.locator(`#tabs [data-tab="${id}"]`).evaluate(el=>el.click());
 const expand=()=>page.locator('#proyectos details').evaluateAll(els=>els.forEach(el=>el.open=true));
 const openProject=async id=>{await tab('proyectos');if(await page.locator('#projectBack').isVisible())await page.locator('#projectBack').click();await page.locator(`[data-open-project="${id}"]`).click();};
 const axe=async label=>{const result=await new AxeBuilder({page}).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`Accessibility: ${label}`);};
 // The first screen exposes recommendation, care, schedule and settings directly.
 await page.locator('#dayCoach .coach-next').waitFor({state:'visible'});
 assert.equal(await page.locator('#dayCoach .coach-schedule').evaluate(el=>el.open),true);
 assert.equal(await page.locator('#coachDeparture').isVisible(),true);
 assert.equal(await page.locator('.coach-essential').count(),4);
 assert.equal(await page.locator('.coach-wake').isVisible(),true);
 assert.equal(await page.locator('#hoy [data-portfolio-total],#hoy .universe-object').count(),0);
 const day='2026-11-08',dailyId=`daily-${day}-teeth`;
 const teeth=page.locator(`.coach-essential [data-task="${dailyId}"]`);
 await teeth.focus();await page.evaluate(()=>window.scrollTo(0,200));const oldScroll=await page.evaluate(()=>scrollY);
 await teeth.press('Space');assert.equal((await saved()).checks[dailyId],true);
 assert.equal(await teeth.evaluate(el=>document.activeElement===el),true);
 assert.equal(await page.evaluate(()=>scrollY),oldScroll,'Care update preserves scroll');
 assert.match(await page.locator('.coach-next strong').textContent(),/Desayuna/);
 await page.reload();assert.equal(await teeth.isChecked(),true);
 await page.locator('[data-coach-action=woke]').click();assert.equal((await saved()).daily[day].coachWakeAnswered,'woke');
 assert.equal(await page.locator('.coach-wake').count(),0);
 await page.locator('#coachDeparture').fill('14:45');assert.equal((await saved()).daily[day].coachDeparture,'14:45');
 await page.locator('[data-coach-action=shift-no]').click();assert.equal((await saved()).daily[day].coachShift,false);
 assert.equal(await page.locator('[data-coach-action=shift-no]').getAttribute('aria-pressed'),'true');
 assert.equal((await saved()).note,seed.note);
 await tab('proyectos');
 const ids=await page.locator('[data-open-project]').evaluateAll(els=>els.map(el=>el.dataset.openProject));assert.equal(ids.length,6);
 for(const id of ids){await openProject(id);await page.locator(`#project-${id}`).waitFor({state:'visible'});assert.equal(await page.locator(`#project-${id}`).evaluate(el=>document.activeElement===el),true);await axe(`project ${id}`);}
 await openProject('torre');await expand();
 const task=page.locator('#project-torre input[data-task]').first(),taskId=await task.getAttribute('data-task');
 await task.check();assert.equal((await saved()).checks[taskId],true);assert.equal(await task.isVisible(),true);assert.equal(await task.evaluate(el=>document.activeElement===el),true);
 await openProject('backstage');await expand();
 const slider=page.locator('[data-merged-slider="calendar"]').first();
 await slider.press('End');for(let n=0;n<4;n++)await slider.press('ArrowLeft');assert.equal((await saved()).integratedDenbouProgress['calendar:0'],80);
 await tab('revision');await page.locator('#dailyNote').fill('Nota conservada después de recargar');await page.reload();
 assert.equal((await saved()).checks[taskId],true);assert.equal((await saved()).note,'Nota conservada después de recargar');assert.equal((await saved()).integratedDenbouProgress['calendar:0'],80);
 await openProject('backstage');await expand();assert.equal(await slider.inputValue(),'80');
 const combined=parseInt(await page.locator('[data-merged-total]').textContent(),10);
 await openProject('torre');const torre=parseInt(await page.locator('#project-torre [data-project-total]').textContent(),10);
 await page.locator('#projectBack').click();assert.equal(parseInt(await page.locator('[data-portfolio-total]').textContent(),10),Math.round(combined*.7+torre*.3));
 // Filtering finds actual tasks, and clearing restores all six entries.
 await page.locator('#filter').fill('Crear, abrir y editar eventos');await page.locator('[data-open-project=backstage]').click();
 assert.equal(await page.locator('[data-stage-members="core,finance,ux,security"]').textContent(),'65%','Search preserves the full weighted scope of the workstream');
 await page.locator('#projectBack').click();await page.locator('#filter').fill('QR');assert.ok(await page.locator('[data-open-project]').count()>0);await page.locator('[data-open-project=backstage]').click();assert.match(await page.locator('#project-backstage').textContent(),/QR/);
 await page.locator('#projectBack').click();await page.locator('#filter').fill('no-such-task-9876');assert.equal(await page.locator('[data-open-project]').count(),0);await page.locator('#filter').fill('');assert.equal(await page.locator('[data-open-project]').count(),6);
 await openProject('backstage');await expand();
 await page.evaluate(()=>{window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError')};});
 const previous=await saved();await slider.press('Home');assert.equal(await slider.inputValue(),'80');assert.deepEqual(await saved(),previous);assert.match(await page.locator('#saveStatus').textContent(),/No se pudo guardar/);
 await openProject('torre');await expand();await task.press('Space');assert.equal(await task.isChecked(),true);assert.deepEqual(await saved(),previous);
 await tab('revision');await page.locator('#dailyNote').fill('No debe persistir');assert.equal(await page.locator('#dailyNote').inputValue(),previous.note);await page.evaluate(()=>Storage.prototype.setItem=window.originalSetItem);
 page.once('dialog',dialog=>dialog.accept());await page.locator('#backupFile').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(seed))});await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).note==='Nota anterior de prueba',storageKey);assert.equal((await saved()).integratedDenbouProgress['calendar:0'],45);
 // Every operating view, including detail, is checked at each requested width.
 for(const width of [320,360,375,390,430,768,1024,1280,1440]){
   await page.setViewportSize({width,height:900});
   for(const id of ['hoy','proyectos','vida','mas','semana','revision']){
     await tab(id);await page.locator(`#${id} details`).evaluateAll(els=>els.forEach(el=>el.open=true));
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow ${width}/${id}`);
     const small=await page.locator(`#${id}`).evaluate(el=>[...el.querySelectorAll('*')].filter(n=>n.getClientRects().length&&[...n.childNodes].some(t=>t.nodeType===3&&t.textContent.trim())&&parseFloat(getComputedStyle(n).fontSize)<14).map(n=>n.outerHTML.slice(0,150)));
     assert.deepEqual(small,[],`No text under 14px: ${width}/${id}`);
   }
   await openProject('backstage');await expand();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Detail overflow ${width}`);
 }
 // Desktop browser zoom at 200% has half the CSS viewport. Also stress text enlargement.
 await page.setViewportSize({width:720,height:450});
 const zoom=await page.addStyleTag({content:'body{zoom:2}'});
 for(const id of ['hoy','proyectos','vida','mas','semana','revision']){await tab(id);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`200% zoom ${id}`);}
 await zoom.evaluate(el=>el.remove());
 await page.setViewportSize({width:390,height:844});
 for(const id of ['hoy','proyectos','vida','mas','semana','revision']){await tab(id);await page.locator(`#${id} details`).evaluateAll(els=>els.forEach(el=>el.open=true));await axe(id);}
 await openProject('backstage');await expand();await axe('expanded project');
 // All write attempts can fail on a new profile without leaking phantom changes.
 const deniedContext=await browser.newContext({viewport:{width:390,height:844}});const denied=await deniedContext.newPage();
 await denied.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Denied','SecurityError')};});await denied.goto(url);
 await denied.locator('#tabs [data-tab=proyectos]').evaluate(el=>el.click());await denied.locator('[data-open-project=backstage]').click();await denied.locator('#proyectos details').evaluateAll(els=>els.forEach(el=>el.open=true));
 const deniedSlider=denied.locator('[data-merged-slider=calendar]').first(),originalValue=await deniedSlider.inputValue();await deniedSlider.press('End');assert.equal(await deniedSlider.inputValue(),originalValue);assert.equal(await denied.evaluate(k=>localStorage.getItem(k),storageKey),null);await deniedContext.close();
 // Explicit morning, afternoon, shift and quiet-night cases use their actual rendered controls.
 for(const hour of [9,14,17,23,2]){
   const c=await browser.newContext({viewport:{width:390,height:844},timezoneId:'America/Mexico_City'});const p=await c.newPage();
   await p.addInitScript(hour=>{const R=Date,t=new R(2026,10,8,hour,0,0).getTime();window.Date=class extends R{constructor(...args){super(...(args.length?args:[t]));}static now(){return t;}};},hour);
   await p.goto(url);assert.equal(await p.locator('.coach-schedule').evaluate(el=>el.open),true);
   if(hour===9){assert.equal(await p.locator('.coach-wake').isVisible(),true);assert.match(await p.locator('.coach-next').textContent(),/Lávate/);}
   if(hour===14){assert.equal(await p.locator('.coach-essential').count(),4);assert.match(await p.locator('.coach-next').textContent(),/Come algo/);}
   if(hour===17){await p.locator('[data-coach-action=shift-yes]').click();assert.match(await p.locator('.coach-next').textContent(),/Ve a trabajar/);await p.locator('[data-coach-action=shift-no]').click();assert.equal(await p.locator('[data-coach-action=shift-no]').getAttribute('aria-pressed'),'true');}
   if(hour===23||hour===2){assert.equal(await p.locator('.coach-essential').count(),0);assert.equal(await p.locator('.coach-rest input').count(),2);assert.equal(await p.locator('#priorityList input').count(),0);}
   const result=await new AxeBuilder({page:p}).analyze();assert.deepEqual(result.violations.map(v=>v.id),[],`Period accessibility ${hour}`);await c.close();
 }
 assert.deepEqual(errors,[],'No browser runtime errors');
 console.log('ROADMAP browser: day routine, five time scenarios, six project routes, filters, task/range/note persistence, backup import, failed-write rollback, 54 responsive view checks plus nine expanded details, 200% zoom and accessibility passed.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
