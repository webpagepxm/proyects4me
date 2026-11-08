(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'));else root.RoadmapIntelligence.MemoryAndPreferences=factory(root.RoadmapIntelligence.Core);})(globalThis,function(C){
 'use strict';
 const key='roadmap-intelligence-v1';
 const activities=['breakfast','food','dinner','move','rest','projects','work','learning','organization','finance','contact','nightTeeth'];
 function empty(){return {version:1,revision:0,confirmed:{tone:'warm',socialEnabled:true,minRepeatMinutes:240,restWindow:null},patterns:{nightOverthinking:false},relationships:[],records:[],obligations:[],mutedRecommendations:{},imported:[],hypotheses:[],exposure:{active:null,history:[],seen:{}}};}
 const text=(v,max=2000)=>typeof v==='string'?v.slice(0,max):'';
 const id=v=>typeof v==='string'&&!['__proto__','constructor','prototype'].includes(v)&&/^[A-Za-z0-9_-]{1,160}$/.test(v)?v:null;
 const date=v=>v===null||v===undefined||v===''?null:C.timestamp(v)!==null?new Date(C.timestamp(v)).toISOString():null;
 function normalize(value){
  if(!C.safeObject(value)||value.version!==1)throw Error('Formato de memoria no compatible.');
  const m=empty(),prefs=value.confirmed||{};
  m.revision=C.number(value.revision,0,1e9,0);
  m.confirmed.tone=prefs.tone==='direct'?'direct':'warm';m.confirmed.socialEnabled=prefs.socialEnabled!==false;
  m.confirmed.minRepeatMinutes=C.number(prefs.minRepeatMinutes,30,10080,240);
  if(prefs.restWindow!==null&&prefs.restWindow!==undefined){if(!C.safeObject(prefs.restWindow)||C.hour(prefs.restWindow.start)===null||C.hour(prefs.restWindow.end)===null||prefs.restWindow.start===prefs.restWindow.end)throw Error('Franja de descanso inválida.');m.confirmed.restWindow={start:prefs.restWindow.start,end:prefs.restWindow.end};}
  m.patterns.nightOverthinking=value.patterns?.nightOverthinking===true;
  for(const field of ['relationships','records','obligations'])if(value[field]!==undefined&&(!Array.isArray(value[field])||value[field].length>1000))throw Error('La memoria contiene registros inválidos.');
  const unique=new Set();
  m.relationships=(value.relationships||[]).map(p=>{
   if(!C.safeObject(p)||!id(p.id)||unique.has(p.id)||!['open','distance','muted','disabled'].includes(p.mode))throw Error('Preferencia relacional inválida.');unique.add(p.id);
   if(p.lastContactAt!=null&&!date(p.lastContactAt))throw Error('Fecha de contacto inválida.');
   if(p.intervalDays!=null&&(!Number.isFinite(p.intervalDays)||p.intervalDays<1||p.intervalDays>365))throw Error('Frecuencia de contacto inválida.');
   return {id:p.id,label:text(p.label,120),context:text(p.context),mode:p.mode,lastContactAt:date(p.lastContactAt),intervalDays:p.intervalDays??null,mutedUntil:date(p.mutedUntil),source:p.source==='imported'?'imported':'manual'};
  });
  unique.clear();m.records=(value.records||[]).map(r=>{
   if(!C.safeObject(r)||!id(r.id)||unique.has(r.id)||!activities.includes(r.activity)||!date(r.at)||r.status!=='confirmed')throw Error('Registro de actividad inválido.');unique.add(r.id);
   if(r.minutes!=null&&(!Number.isFinite(r.minutes)||r.minutes<0||r.minutes>1440))throw Error('Duración inválida.');
   return {id:r.id,activity:r.activity,at:date(r.at),minutes:r.minutes??null,coverage:r.coverage==='day-total'?'day-total':'event',status:'confirmed',source:r.source==='imported'?'imported':'manual'};
  });
  unique.clear();m.obligations=(value.obligations||[]).map(o=>{
   if(!C.safeObject(o)||!id(o.id)||unique.has(o.id)||!['appointment','payment','projectDeadline'].includes(o.kind)||!date(o.at)||o.confirmed!==true)throw Error('Compromiso inválido.');unique.add(o.id);
   if(o.durationMinutes!=null&&(!Number.isFinite(o.durationMinutes)||o.durationMinutes<0||o.durationMinutes>1440))throw Error('Duración de compromiso inválida.');
   return {id:o.id,kind:o.kind,label:text(o.label,160),at:date(o.at),durationMinutes:o.durationMinutes??null,projectId:text(o.projectId,100),confirmed:true,source:o.source==='imported'?'imported':'manual'};
  });
  if(C.safeObject(value.mutedRecommendations))for(const [k,v]of Object.entries(value.mutedRecommendations).slice(0,500)){if(!['__proto__','constructor','prototype'].includes(k)&&/^[A-Za-z0-9_-]{1,160}$/.test(k)&&(v===null||date(v)))m.mutedRecommendations[k]=v===null?null:date(v);}
  m.imported=Array.isArray(value.imported)?value.imported.slice(-50).filter(x=>C.safeObject(x)&&date(x.at)).map(x=>({at:date(x.at),source:'authorized-file'})):[];
  const exposure=value.exposure;
  if(C.safeObject(exposure)){
   m.exposure.history=Array.isArray(exposure.history)?exposure.history.filter(x=>id(x.id)&&C.domains.includes(x.domain)&&C.timestamp(x.at)!==null).slice(-200).map(x=>({id:x.id,domain:x.domain,at:C.timestamp(x.at)})):[];
   if(C.safeObject(exposure.seen))for(const [k,v]of Object.entries(exposure.seen).slice(-500))if(id(k)&&C.timestamp(v)!==null)m.exposure.seen[k]=C.timestamp(v);
   const a=exposure.active;if(C.safeObject(a)&&id(a.id)&&C.timestamp(a.at)!==null&&typeof a.contextKey==='string')m.exposure.active={id:a.id,domain:C.domains.includes(a.domain)?a.domain:'essential',at:C.timestamp(a.at),contextKey:a.contextKey.slice(0,100),expiresAt:C.timestamp(a.expiresAt)};
  }
  return m;
 }
 function load(storage){try{const raw=storage.getItem(key);return {memory:raw?normalize(JSON.parse(raw)):empty(),error:null};}catch(error){return {memory:empty(),error:'No se pudo leer la memoria privada; no se ha sustituido.'};}}
 function save(storage,memory){try{storage.setItem(key,JSON.stringify(normalize(memory)));return true;}catch(error){return false;}}
 function expose(memory,selected,temporal){
  if(!selected)return memory;
  const active=memory.exposure.active;
  if(active&&active.id===selected.id&&active.contextKey===temporal.contextKey&&temporal.at-active.at<15*60000)return memory;
  const next=normalize(memory);next.exposure.active={id:selected.id,domain:selected.domain,at:temporal.at,contextKey:temporal.contextKey,expiresAt:selected.expiresAt};
  next.exposure.seen[selected.id]=temporal.at;
  next.exposure.seen=Object.fromEntries(Object.entries(next.exposure.seen).filter(([,at])=>at<=temporal.at&&at>=temporal.at-365*86400000).sort((a,b)=>a[1]-b[1]).slice(-500));
  next.exposure.history=next.exposure.history.filter(h=>h.at>=temporal.at-30*86400000&&h.at<=temporal.at).concat({id:selected.id,domain:selected.domain,at:temporal.at}).slice(-200);
  return next;
 }
 function importAuthorized(payload,{consent=false,now=new Date()}={}){
  if(consent!==true)throw Error('La importación necesita tu consentimiento explícito.');
  const m=normalize(payload);if(m.records.some(r=>C.timestamp(r.at)>now.getTime()))throw Error('El archivo contiene realizaciones con fecha futura.');m.relationships.forEach(p=>p.source='imported');m.records.forEach(r=>r.source='imported');m.obligations.forEach(o=>o.source='imported');m.imported.push({at:now.toISOString(),source:'authorized-file'});m.revision++;m.exposure={active:null,history:[],seen:{}};return m;
 }
 function projectChecks(checks,records,now=new Date()){
  const out={...checks};for(const r of records){if(r.status!=='confirmed'||!['breakfast','food','dinner','move','rest','nightTeeth'].includes(r.activity))continue;const d=new Date(r.at);if(!Number.isFinite(d.getTime())||d.getTime()>now.getTime())continue;const key='daily-'+[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')+'-'+r.activity;if(!Object.hasOwn(out,key))out[key]=true;}return out;
 }
 return Object.freeze({key,activities,empty,normalize,load,save,expose,importAuthorized,projectChecks});
});
