'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const url=process.env.ROADMAP_TEST_URL||'http://127.0.0.1:8000',privateKey='roadmap-intelligence-v1',originalKey='mi-tablero-personal-v1';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},timezoneId:'America/Mexico_City',acceptDownloads:true});
 await context.addInitScript(()=>{if(!localStorage.getItem('mi-tablero-personal-v1'))localStorage.setItem('mi-tablero-personal-v1',JSON.stringify({checks:{'torre-0':true,'personal-2':true},note:'Nota anterior de prueba',daily:{},integratedDenbouProgress:{'calendar:0':45}}));const R=Date;const t=new R(2026,10,8,2).getTime();window.Date=class extends R{constructor(...args){super(...(args.length?args:[t]));}static now(){return t;}};});
 const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url);
 const original=await p.evaluate(k=>localStorage.getItem(k),originalKey);
 const memory=()=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),privateKey);
 const tab=id=>p.locator(`#tabs [data-tab=${id}]`).evaluate(e=>e.click());
 const privatePanel=async()=>{await tab('mas');if(!await p.locator('#assistantSettings').evaluate(e=>e.open))await p.locator('#assistantSettings>summary').click();if(!await p.locator('#privateContext').evaluate(e=>e.open))await p.locator('#privateContext>summary').click();await p.locator('#relationLabel').waitFor({state:'visible'});};
 await p.waitForFunction(k=>Boolean(localStorage.getItem(k)),privateKey);assert.ok((await memory()).exposure.history.length<=2,'Opening does not log intermediate renders as repeated views');
 assert.equal((await memory()).relationships.length,0);assert.equal((await memory()).patterns.nightOverthinking,false);
 await tab('mas');await p.locator('#assistantSettings>summary').click();assert.equal(await p.locator('#privateContextBody').textContent(),'');
 await p.locator('#assistantTone').selectOption('direct');await p.locator('#restStart').fill('22:00');await p.locator('#restEnd').fill('06:00');await p.locator('#socialSuggestions').uncheck();await p.locator('#assistantPreferences [type=submit]').click();assert.equal((await memory()).confirmed.tone,'direct');assert.equal((await memory()).confirmed.socialEnabled,false);
 await privatePanel();
 const alias='Alias reservado de prueba',secret='Contexto privado que nunca aparece en Hoy';
 await p.locator('#relationLabel').fill(alias);await p.locator('#relationContext').fill(secret);await p.locator('#relationMode').selectOption('distance');await p.locator('#relationInterval').fill('7');await p.locator('#relationContact').fill('2026-10-01T12:00');await p.locator('#relationshipForm [type=submit]').click();assert.equal((await memory()).relationships.length,1);assert.equal((await memory()).relationships[0].mode,'distance');
 await p.locator('[data-edit-relation]').click();assert.equal(await p.locator('#relationContext').inputValue(),secret);await p.locator('#relationMode').selectOption('muted');await p.locator('#relationshipForm [type=submit]').click();assert.equal((await memory()).relationships[0].mode,'muted');
 await p.locator('#nightOverthinking').check();await p.locator('#emotionalPreferences [type=submit]').click();assert.equal((await memory()).patterns.nightOverthinking,true);
 await tab('hoy');assert.match(await p.locator('.director-now').textContent(),/decisiones importantes pueden esperar/);assert.doesNotMatch(await p.content(),new RegExp(alias+'|'+secret));assert.equal(await p.locator('#privateContextBody').textContent(),'');
 await tab('wellness');assert.equal(await p.locator('.wellness-ring').count(),0,'Calm suggestions do not become Wellness records');
 await privatePanel();
 await p.locator('#activityKind').selectOption('rest');await p.locator('#activityAt').fill('2026-11-08T01:00');await p.locator('#activityMinutes').fill('30');await p.locator('#activityForm [type=submit]').click();assert.equal((await memory()).records.length,1);
 await p.locator('[data-edit-record]').click();await p.locator('#activityMinutes').fill('40');await p.locator('#activityForm [type=submit]').click();assert.equal((await memory()).records[0].minutes,40);assert.equal((await memory()).records.length,1,'Editing does not duplicate a record');
 await p.locator('#activityKind').selectOption('projects');await p.locator('#activityAt').fill('2026-11-09T01:00');await p.locator('#activityForm [type=submit]').click();assert.equal((await memory()).records.length,1,'A scheduled future activity is not a completed record');
 await p.locator('#obligationKind').selectOption('payment');await p.locator('#obligationLabel').fill('Referencia privada de vencimiento');await p.locator('#obligationAt').fill('2026-11-25T12:00');await p.locator('#obligationForm [type=submit]').click();assert.equal((await memory()).obligations.length,1);
 await p.locator('[data-edit-obligation]').click();await p.locator('#obligationKind').selectOption('projectDeadline');await p.locator('#obligationProject').selectOption('backstage');await p.locator('#obligationForm [type=submit]').click();assert.equal((await memory()).obligations[0].projectId,'backstage');assert.equal((await memory()).obligations.length,1);
 for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Private settings overflow ${width}`);}
 await p.setViewportSize({width:390,height:844});const audit=await new AxeBuilder({page:p}).analyze();assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],'Private forms accessibility');
 const downloaded=p.waitForEvent('download');await p.locator('#exportPrivate').click();const download=await downloaded;const exported=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(exported.relationships[0].label,alias);assert.equal(exported.records[0].minutes,40);
 const beforeImport=await memory();await p.locator('#privateFile').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":2}')});assert.deepEqual(await memory(),beforeImport);
 p.once('dialog',d=>d.accept());await p.locator('#privateFile').setInputFiles({name:'authorized.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(exported))});await p.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).imported.length===1,privateKey);assert.equal((await memory()).relationships[0].source,'imported');assert.equal((await memory()).records[0].source,'imported');
 await tab('hoy');assert.doesNotMatch(await p.content(),new RegExp(alias+'|'+secret+'|Referencia privada de vencimiento'));await tab('wellness');assert.equal(await p.locator('.wellness-ring').count(),1,'A real voluntary rest record feeds Wellness');assert.equal(await p.evaluate(k=>localStorage.getItem(k),originalKey),original,'New memory never rewrites project/user checks');
 await privatePanel();await p.evaluate(()=>{window.restoreSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='roadmap-intelligence-v1')throw new DOMException('Full','QuotaExceededError');return window.restoreSetItem.call(this,k,v);};});const beforeFailure=await memory();await p.locator('#assistantTone').selectOption('warm');await p.locator('#assistantPreferences [type=submit]').click();assert.deepEqual(await memory(),beforeFailure);assert.equal(await p.locator('#assistantTone').inputValue(),'direct');assert.match(await p.locator('#assistantStatus').textContent(),/No se pudo guardar/);await p.evaluate(()=>Storage.prototype.setItem=window.restoreSetItem);
 p.once('dialog',d=>d.accept());await p.locator('#clearPrivate').click();assert.equal(await p.evaluate(k=>localStorage.getItem(k),privateKey),null);assert.equal(await p.evaluate(k=>localStorage.getItem(k),originalKey),original);assert.equal(await p.locator('#relationLabel').inputValue(),'');
 // Corrupt memory is retained for explicit export or deletion, never silently overwritten by exposure tracking.
 await p.evaluate(k=>localStorage.setItem(k,'invalid-private-format'),privateKey);await p.reload();assert.equal(await p.evaluate(k=>localStorage.getItem(k),privateKey),'invalid-private-format');assert.equal(await p.locator('.director-now').count(),1);
 await privatePanel();p.once('dialog',d=>d.accept());await p.locator('#clearPrivate').click();assert.equal(await p.evaluate(k=>localStorage.getItem(k),privateKey),null);
 assert.deepEqual(errors,[]);console.log('ROADMAP intelligence browser: voluntary preferences, private relationship editing, calm-night opt-in, no public private details, activity/obligation editing, consented import/export, deletion isolation, write failure/corrupt memory, responsive forms and accessibility passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
