// Run with Playwright and @axe-core/playwright available via NODE_PATH.
// Start python3 -m http.server 8000 first. Uses synthetic local data only.
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'America/Mexico_City',reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const storageKey='mi-tablero-personal-v1';
 const seed={checks:{'torre-0':true},note:'Nota anterior de prueba',daily:{},integratedDenbouProgress:{'calendar:0':45}};
 await page.addInitScript(({storageKey,seed})=>{if(!localStorage.getItem(storageKey))localStorage.setItem(storageKey,JSON.stringify(seed));},{storageKey,seed});
 await page.goto(process.env.ROADMAP_TEST_URL||'http://127.0.0.1:8000');
 const saved=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),storageKey);
 const tab=async id=>page.locator(`#tabs [data-tab="${id}"]`).evaluate(el=>el.click());
 const expand=async()=>page.locator('#proyectos details').evaluateAll(els=>els.forEach(el=>el.open=true));
 assert.equal((await saved()).note,seed.note);
 const ids=await page.locator('[data-open-project]').evaluateAll(els=>els.map(el=>el.dataset.openProject));
 assert.equal(ids.length,6);
 for(const id of ids){await tab('hoy');await page.locator(`[data-open-project="${id}"]`).click();await page.locator(`#project-${id}`).waitFor({state:'visible'});assert.equal(await page.locator(`#project-${id}`).evaluate(el=>document.activeElement===el),true);}
 await tab('proyectos');await expand();
 const task=page.locator('#project-torre input[data-task]').first(),taskId=await task.getAttribute('data-task');
 await task.check();assert.equal((await saved()).checks[taskId],true);assert.equal(await task.isVisible(),true,'Completing a task preserves its expanded stage');assert.equal(await task.evaluate(el=>document.activeElement===el),true,'Task keeps keyboard focus');
 await expand();
 const slider=page.locator('[data-merged-slider="calendar"]').first();
 await slider.press('End');for(let n=0;n<4;n++)await slider.press('ArrowLeft');assert.equal((await saved()).integratedDenbouProgress['calendar:0'],80);
 await tab('revision');await page.locator('#dailyNote').fill('Nota conservada después de recargar');
 await page.reload();assert.equal((await saved()).checks[taskId],true);assert.equal((await saved()).note,'Nota conservada después de recargar');assert.equal((await saved()).integratedDenbouProgress['calendar:0'],80);
 await tab('proyectos');await expand();assert.equal(await page.locator('[data-merged-slider="calendar"]').first().inputValue(),'80');
 const actual=Number((await page.locator('.universe-progress-value>strong').textContent()).replace('%',''));
 const combined=Number((await page.locator('[data-merged-total]').textContent()).replace('%',''));
 const torre=Number((await page.locator('#project-torre .rv2-percent').textContent()).replace('%',''));
 assert.equal(actual,Math.round(combined*.7+torre*.3),'Portfolio uses existing weighted calculation');
 // Failed writes must leave persisted data and visible controls at their old values.
 await page.evaluate(()=>{window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new DOMException('Full','QuotaExceededError')};});
 const previous=await saved();
 await slider.press('Home');assert.equal(await slider.inputValue(),'80');assert.deepEqual(await saved(),previous);assert.match(await page.locator('#saveStatus').textContent(),/No se pudo guardar/);
 await task.press('Space');assert.equal(await task.isChecked(),true);assert.deepEqual(await saved(),previous);
 await tab('revision');await page.locator('#dailyNote').fill('No debe persistir');assert.equal(await page.locator('#dailyNote').inputValue(),previous.note);
 await page.evaluate(()=>Storage.prototype.setItem=window.originalSetItem);
 // Restore the full original synthetic backup through the actual file picker.
 page.once('dialog',dialog=>dialog.accept());
 await page.locator('#backupFile').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(seed))});
 await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).note==='Nota anterior de prueba',storageKey);
 assert.equal((await saved()).integratedDenbouProgress['calendar:0'],45);
 for(const width of [375,390,430,768,1024,1280,1440]){
   await page.setViewportSize({width,height:900});
   for(const id of ['hoy','proyectos','vida','mas','semana','revision']){
     await tab(id);if(id==='proyectos')await expand();
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`No overflow: ${width}/${id}`);
   }
 }
 await page.setViewportSize({width:390,height:844});
 for(const id of ['hoy','proyectos','vida','mas','semana','revision']){
   await tab(id);await page.locator(`#${id} details`).evaluateAll(els=>els.forEach(el=>el.open=true));
   const results=await new AxeBuilder({page}).analyze();
   assert.deepEqual(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`Accessibility: ${id}`);
 }
 // A fresh profile may reject every write: references created after load must roll back too.
 const deniedContext=await browser.newContext({viewport:{width:390,height:844}});
 const denied=await deniedContext.newPage();
 await denied.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Denied','SecurityError')};});
 await denied.goto(process.env.ROADMAP_TEST_URL||'http://127.0.0.1:8000');
 await denied.locator('#tabs [data-tab=proyectos]').evaluate(el=>el.click());
 await denied.locator('#proyectos details').evaluateAll(els=>els.forEach(el=>el.open=true));
 const deniedSlider=denied.locator('[data-merged-slider=calendar]').first();
 const originalValue=await deniedSlider.inputValue();await deniedSlider.press('End');
 assert.equal(await deniedSlider.inputValue(),originalValue,'First denied write restores default estimates');
 assert.match(await denied.locator('#saveStatus').textContent(),/No se pudo guardar/);
 assert.equal(await denied.evaluate(k=>localStorage.getItem(k),storageKey),null);
 await deniedContext.close();
 assert.deepEqual(errors,[],'No browser runtime errors');
 console.log('ROADMAP browser: six project routes, task/range/note persistence, weighted progress, failed-write rollback, full backup import, 42 responsive checks and six expanded-view accessibility audits passed.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
