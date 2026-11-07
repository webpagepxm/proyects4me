// Time-based ROADMAP guidance, no external libraries.
// Execute: node tests/roadmap-time-aware.cjs
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=fs.readFileSync(path.join(root,'roadmap-3.js'),'utf8');
assert.match(html,/id="dayCoach"/);
assert.match(html,/id="lifeIndicatorsV2"/);
assert.match(js,/ROADMAP_TIME_AWARE_DAY_V1/);
new vm.Script(js,{filename:'roadmap-3.js'});
const key='mi-tablero-personal-v1';
function simulate(hour,minute=0){
 const nodes={},values=new Map();
 class FakeNode{
   constructor(id=''){this.id=id;this.innerHTML='';this.value='';this.textContent='';this.dataset={};this.files=[];
    this.listeners={};this.style={setProperty(){}};this.classList={add(){},remove(){},toggle(){}};
    this.parentNode={insertBefore(el){nodes[el.id]=el}};}
   addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)}
   querySelector(sel){return this.id==='hoy'&&sel==='.daily-overview'?new FakeNode('overview'):null}
   querySelectorAll(){return []}insertAdjacentElement(_where,el){nodes[el.id]=el}
   setAttribute(){}closest(){return null}select(){}append(){}remove(){}
   click(){for(const f of this.listeners.click??[])f({target:this})}
 }
 for(const m of html.matchAll(/\bid="([^"]+)"/g))nodes[m[1]]=new FakeNode(m[1]);
 const doc={body:new FakeNode('body'),listeners:{},getElementById:id=>nodes[id]??null,
   createElement:tag=>new FakeNode(tag),querySelector:()=>null,querySelectorAll:()=>[],
   addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)},execCommand:()=>true};
 const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 class Clock extends Date{
   constructor(...args){if(args.length)super(...args);else super(2026,10,7,hour,minute,0)}
   static now(){return new Clock().getTime()}
 }
 const runtime=new Function('document','localStorage','window','navigator','Blob','URL','confirm','matchMedia','Event','Date',js);
 runtime(doc,storage,{scrollTo(){}},{clipboard:{writeText:async()=>{}}},function Blob(){},
   {createObjectURL:()=>'blob:test',revokeObjectURL(){}},()=>true,()=>({matches:true}),
   class {constructor(type,opt){this.type=type;this.bubbles=!!opt?.bubbles}},Clock);
 return {nodes,storage,day:()=>JSON.parse(storage.getItem(key)||'{}').daily?.['2026-11-07']||{}};
}
const nine=simulate(9);
assert.match(nine.nodes.dayCoach.innerHTML,/HOY · MAÑANA/);
assert.match(nine.nodes.dayCoach.innerHTML,/¿Acabas de despertar\?/);
assert.match(nine.nodes.dayCoach.innerHTML,/09:00/);
assert.match(nine.nodes.dayCoach.innerHTML,/15:30/);
assert.match(nine.nodes.dayCoach.innerHTML,/Lávate los dientes/);
assert.match(nine.nodes.dayCoach.innerHTML,/Actividad física/);
assert.ok(!nine.day().coachWakeAnswered,'Opening does not claim wake-up');
assert.match(nine.nodes.dayCoach.innerHTML,/data-coach-action="done"/);
assert.doesNotMatch(nine.nodes.dayCoach.innerHTML,/La propuesta parte|Recomendaciones locales por hora|Un paso importante antes de salir|coach-caption/);
const markTeeth={dataset:{coachAction:'done',coachCheck:'teeth'}};
nine.nodes.dayCoach.listeners.click[0]({target:{closest:s=>s==='[data-coach-action]'?markTeeth:null}});
assert.equal(JSON.parse(nine.storage.getItem(key)).checks['daily-2026-11-07-teeth'],true);
assert.match(nine.nodes.dayCoach.innerHTML,/Desayuna/);

const wakeButton={dataset:{coachAction:'woke'}};
nine.nodes.dayCoach.listeners.click[0]({target:{closest:s=>s==='[data-coach-action]'?wakeButton:null}});
assert.equal(nine.day().coachWakeAnswered,'woke');
assert.equal(nine.day().coachWakeTime,540);
assert.doesNotMatch(nine.nodes.dayCoach.innerHTML,/¿Acabas de despertar\?/);
const field={value:'14:45'};
nine.nodes.dayCoach.listeners.change[0]({target:{closest:s=>s==='[data-coach-departure]'?field:null}});
assert.equal(nine.day().coachDeparture,'14:45');
assert.match(nine.nodes.dayCoach.innerHTML,/14:45/);
const shiftNo={dataset:{coachAction:'shift-no'}};
nine.nodes.dayCoach.listeners.click[0]({target:{closest:s=>s==='[data-coach-action]'?shiftNo:null}});
assert.equal(nine.day().coachShift,false);
assert.match(nine.nodes.dayCoach.innerHTML,/data-coach-action="shift-no" aria-pressed="true"/);
const fourteen=simulate(14);
assert.match(fourteen.nodes.dayCoach.innerHTML,/HOY · ANTES DE SALIR/);
assert.match(fourteen.nodes.dayCoach.innerHTML,/14:00/);
assert.doesNotMatch(fourteen.nodes.dayCoach.innerHTML,/¿Acabas de despertar/);
const night=simulate(23);
assert.match(night.nodes.dayCoach.innerHTML,/HOY · NOCHE/);
assert.match(night.nodes.dayCoach.innerHTML,/Dejar el teléfono y las redes/);
assert.match(night.nodes.dayCoach.innerHTML,/23:30/);
assert.match(night.nodes.priorityList.innerHTML,/La programación puede esperar a mañana/);
assert.doesNotMatch(night.nodes.priorityList.innerHTML,/milestone-backstage/);
assert.match(night.nodes.dayCoach.innerHTML,/Dejar el teléfono y las redes/);
assert.doesNotMatch(night.nodes.dayCoach.innerHTML,/¿Acabas de despertar/);
const afterMidnight=simulate(2);
assert.match(afterMidnight.nodes.dayCoach.innerHTML,/Descansa/);
assert.doesNotMatch(afterMidnight.nodes.dayCoach.innerHTML,/¿Acabas de despertar/);
console.log('ROADMAP copy-audit: compact Home, morning, done, wake, schedule, afternoon and night checks passed.');
