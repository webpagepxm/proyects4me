(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'));else root.RoadmapIntelligence.LifeBalanceEngine=factory(root.RoadmapIntelligence.Core);})(globalThis,function(C){
 'use strict';
 function fromChecks(checks={}){
  return Object.entries(checks).flatMap(([key,value])=>{
   if(value!==true)return [];const match=/^daily-(\d{4}-\d{2}-\d{2})-(breakfast|food|dinner|move|rest)$/.exec(key);if(!match)return [];
   return [{id:key,date:match[1],precision:'day',activity:match[2],status:'confirmed',minutes:null,coverage:'event',source:'existing-daily-record'}];
  });
 }
 function analyze(records,at){
  const summaries={},now=new Date(at),today=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000;
  const parsed=records.filter(r=>r.status==='confirmed').flatMap(r=>{
   const d=r.precision==='day'&&/^\d{4}-\d{2}-\d{2}$/.test(r.date||'')?new Date(+r.date.slice(0,4),+r.date.slice(5,7)-1,+r.date.slice(8,10),12):new Date(r.at);
   if(!Number.isFinite(d.getTime())||r.precision!=='day'&&d.getTime()>at)return [];
   const day=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000;
   if(r.precision==='day'&&[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')!==r.date)return [];
   return [{record:r,day}];
  });
  for(const days of [7,30]){
   const valid=parsed.filter(x=>today-x.day>=0&&today-x.day<days),paired=new Map(),observations=new Set(),duplicates=new Set();
   for(const {record:r,day}of valid){
    observations.add(day+'/'+r.activity);if(!paired.has(day))paired.set(day,{projects:[],projectTotals:[],rest:[]});
    const signature=JSON.stringify([r.activity,r.at,r.date,r.minutes,r.coverage]);if(duplicates.has(signature))continue;duplicates.add(signature);
    if(r.activity==='projects'&&Number.isFinite(r.minutes))paired.get(day)[r.coverage==='day-total'?'projectTotals':'projects'].push(r.minutes);
    if(r.activity==='rest'&&r.coverage==='day-total'&&Number.isFinite(r.minutes))paired.get(day).rest.push(r.minutes);
   }
   const demanding=[...paired.values()].filter(d=>(d.projects.length||d.projectTotals.length)&&d.rest.length&&Math.max(d.projects.reduce((a,b)=>a+b,0),...d.projectTotals)>=120&&Math.max(...d.rest)<30).length;
   summaries[days]={recordCount:observations.size,observedDays:paired.size,demandingDays:demanding,conclusion:!valid.length?'unknown':demanding>=3?'recorded-pause-opportunity':'no-conclusion'};
  }
  return summaries;
 }
 function candidates(ctx){
  const {temporal:t,memory,input}=ctx,list=[],summary=ctx.balance||analyze(memory.records.concat(fromChecks(input.checks)),t.at);
  if(t.quiet||t.busy)return list;
  if(summary[7].demandingDays>=3)list.push(C.candidate({id:'balance-recorded-rest',domain:'balance',kind:'pause',title:'Haz espacio para una pausa',message:'Has registrado varios bloques largos y descansos breves. Hoy puedes bajar la carga.',reason:'Al menos tres días con trabajo y descanso total declarados, sin rellenar días desconocidos.',tier:4,importance:90,urgency:65,confidence:1,evidence:[{source:'voluntary-activity-records',status:'confirmed'}],cooldownMs:12*3600000,expiresAt:t.dayEnd,horizon:'weekly'}));
  for(const obligation of memory.obligations.filter(o=>o.confirmed&&o.kind==='payment'&&C.timestamp(o.at)>=t.at&&C.timestamp(o.at)-t.at<=30*86400000))list.push(C.candidate({id:'planning-'+obligation.id,domain:'planning',kind:'planning',title:'Reserva un momento para un vencimiento registrado',message:'Revisa lo necesario con antelación, sin sumar más pendientes.',reason:'Fecha de una obligación introducida voluntariamente.',tier:C.timestamp(obligation.at)-t.at<=7*86400000?3:2,urgency:C.timestamp(obligation.at)-t.at<=7*86400000?50:10,importance:C.timestamp(obligation.at)-t.at<=7*86400000?75:55,confidence:1,evidence:[{source:'confirmed-obligation',status:obligation.source}],expiresAt:C.timestamp(obligation.at),cooldownMs:24*3600000,horizon:'monthly'}));
  if(summary[30].observedDays>=10&&summary[7].recordCount===0)list.push(C.candidate({id:'balance-monthly-review',domain:'balance',kind:'reflection',title:'Puedes revisar el ritmo que registraste este mes',message:'Si te resulta útil, reserva un momento tranquilo; los días sin datos no se evalúan.',reason:'Hay al menos diez días con registros en la ventana de treinta días.',tier:2,importance:45,confidence:.8,evidence:[{source:'voluntary-monthly-records',status:'confirmed'}],cooldownMs:7*86400000,expiresAt:t.dayEnd,horizon:'monthly'}));
  if(t.base.current.kind==='writing')list.push(C.candidate({id:'balance-writing',domain:'balance',kind:'writing',title:'Dedica un rato a escribir',message:'Retoma tu crónica o anota una idea, si te apetece.',reason:'Objetivo personal existente y franja disponible.',tier:2,importance:50,confidence:.7,evidence:[{source:'existing-goals',status:'configured'}],expiresAt:t.dayEnd,cooldownMs:24*3600000,horizon:'weekly'}));
  return list;
 }
 return Object.freeze({analyze,candidates,fromChecks});
});
