// ROADMAP 3.0 — regression checks without third-party packages.
// Run: node tests/roadmap-smoke.cjs
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=fs.readFileSync(path.join(root,'roadmap-3.js'),'utf8');
const css=fs.readFileSync(path.join(root,'roadmap-3.css'),'utf8');
assert.match(html,/roadmap-3\.css/);
assert.match(html,/roadmap-3\.js/);
assert.doesNotMatch(html,/roadmap-2026\.(js|css)/);
assert.doesNotMatch(html,/<style\b/);
assert.equal((html.match(/<script\b/g)||[]).length,13);assert.match(html,/day-director\.js/);assert.match(html,/wellness-model\.js/);
assert.match(css,/--accent:#C4F54C/);
assert.match(css,/@media\(max-width:780px\)/);
assert.match(css,/\.rv3-workstream/);
assert.match(js,/const key='mi-tablero-personal-v1'/);
assert.doesNotMatch(js,/state\.checks\[id\]=true/);
new vm.Script(js,{filename:'roadmap-3.js'});
const nodes={};
class FakeNode{
 constructor(id=''){
  this.id=id;this.value='';this.textContent='';this.innerHTML='';this.className='';
  this.listeners={};this.dataset={};this.style={setProperty(){}};
  this.classList={toggle(){},add(){},remove(){}};
  this.parentNode={insertBefore(n){nodes[n.id]=n;}};
 }
 addEventListener(name,fn){(this.listeners[name]??=[]).push(fn);}
 querySelector(sel){
  if(this.id==='hoy'&&sel==='.daily-overview')return new FakeNode('overview');
  if(this.id==='projects'&&sel==='[data-merged-card]')return null;
  return null;
 }
 querySelectorAll(){return [];}
 insertAdjacentElement(where,node){nodes[node.id]=node;}
 closest(){return null;}
 setAttribute(){}
 click(){for(const fn of this.listeners.click??[])fn({target:this});}
 select(){}
 append(){}
 remove(){}
}
for(const m of html.matchAll(/\bid="([^"]+)"/g))nodes[m[1]]=new FakeNode(m[1]);
const document={
 body:new FakeNode('body'),listeners:{},
 getElementById:id=>nodes[id]??null,
 createElement:tag=>new FakeNode(tag),
 querySelector:()=>null,
 querySelectorAll:()=>[],
 addEventListener(name,fn){(this.listeners[name]??=[]).push(fn);},
 execCommand:()=>true
};
const values=new Map();
const localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
const fileURL={createObjectURL:()=>'blob:test',revokeObjectURL(){}};
const view={scrollTo(){}};
const eventCtor=class{constructor(type,options){this.type=type;this.bubbles=!!options?.bubbles;}};
const runtime=new Function('document','localStorage','window','navigator','Blob','URL','confirm','matchMedia','Event','RoadmapDayDirector','RoadmapWellness','RoadmapIntelligence','RoadmapIntelligenceUI',js);
runtime(document,localStorage,view,{clipboard:{writeText:async()=>{}}},function Blob(){},fileURL,()=>true,()=>({matches:true}),eventCtor,require('../day-director.js'),require('../wellness-model.js'),{MemoryAndPreferences:require('../intelligence/memory-and-preferences'),RecommendationOrchestrator:require('../intelligence/recommendation-orchestrator')},{mount:()=>({refresh(){},closePrivate(){}})});
const rendered=nodes.projects.innerHTML;
const rings=nodes.lifeIndicatorsV2.innerHTML;
assert.match(rendered,/<h1>Callejero \+ Denbou<\/h1>/);
assert.match(rendered,/<h1>Torre Fuerte<\/h1>/);
assert.doesNotMatch(rendered,/<h1>Callejero PXM<\/h3>/);
assert.match(rendered,/Áreas de trabajo \(5\)/);
assert.equal((rendered.match(/data-project-id=/g)||[]).length,6,'All six project details are retained');
assert.match(rendered,/data-merged-total>38%/);
for(const name of ['Salud','Vínculos','contact-week-'])assert.ok(rings.includes(name),name);
assert.equal(nodes.filter.listeners.input.length,1,'Only one search listener');
assert.equal(Object.keys(JSON.parse(values.get('mi-tablero-personal-v1')||'{}').checks||{}).filter(x=>x.startsWith('evidence-')).length,0,'No fabricated completions');
const slider={
 dataset:{mergedSlider:'calendar',mergedIndex:'0'},value:'80',
 style:{setProperty(){}},
 closest(sel){return sel==='[data-merged-slider]'?this:sel==='.rv3-roadmap-task'?{querySelector:()=>({textContent:''})}:null;}
};
const updateProgress=()=>{for(const handler of nodes.projects.listeners.input??[])handler({target:slider});};
updateProgress();
const saved=()=>JSON.parse(values.get('mi-tablero-personal-v1')||'{}');
assert.equal(saved().integratedDenbouProgress['calendar:0'],80);
nodes.reset.click();
assert.deepEqual(saved().integratedDenbouProgress,{});
assert.deepEqual(saved().checks,{});
updateProgress();
assert.equal(saved().integratedDenbouProgress['calendar:0'],80,'Slider still saves after reset');
assert.match(nodes.portfolioV2.innerHTML,/Callejero \+ Denbou/);
async function checkBackupImport(){
  assert.ok(nodes.importBackup,'Backup import button must exist');
  assert.ok(nodes.backupFile,'Backup file chooser must exist');
  assert.equal(nodes.backupFile.listeners.change?.length,1,'Exactly one backup import handler');
  const backup={checks:{'torre-0':true},note:'Nota recuperada',daily:{},integratedDenbouProgress:{'calendar:0':45}};
  const encoded=JSON.stringify(backup);
  nodes.backupFile.files=[{size:encoded.length,text:async()=>encoded}];
  await nodes.backupFile.listeners.change[0]();
  assert.equal(saved().checks['torre-0'],true);
  assert.equal(saved().integratedDenbouProgress['calendar:0'],45);
  assert.equal(saved().note,'Nota recuperada');
  updateProgress();
  assert.equal(saved().integratedDenbouProgress['calendar:0'],80,'Imported state stays reactive');
  const fixture=js.replace("const key=", "projects.push({id:'unplanned',name:'Proyecto sin etapas',description:'',tasks:[]});const key=");
  const withUnknown=new Function('document','localStorage','window','navigator','Blob','URL','confirm','matchMedia','Event','RoadmapDayDirector','RoadmapWellness','RoadmapIntelligence','RoadmapIntelligenceUI',fixture);
  withUnknown(document,localStorage,view,{clipboard:{writeText:async()=>{}}},function Blob(){},fileURL,()=>true,()=>({matches:true}),eventCtor,require('../day-director.js'),require('../wellness-model.js'),{MemoryAndPreferences:require('../intelligence/memory-and-preferences'),RecommendationOrchestrator:require('../intelligence/recommendation-orchestrator')},{mount:()=>({refresh(){},closePrivate(){}})});
  assert.match(nodes.projects.innerHTML,/id="project-unplanned"/,'An undocumented project remains available');
  assert.match(nodes.projects.innerHTML,/Sin estimación/,'Missing stages are unknown, not zero');
  console.log('ROADMAP smoke: structure, render, state, reset, slider and backup restoration passed.');
}
checkBackupImport().catch(e=>{console.error(e);process.exitCode=1;});
