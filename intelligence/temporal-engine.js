(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'),require('../day-director'));else root.RoadmapIntelligence.TemporalEngine=factory(root.RoadmapIntelligence.Core,root.RoadmapDayDirector);})(globalThis,function(C,legacy){
 'use strict';
 function analyze(input,memory){
  const now=input.now||new Date(),at=now.getTime(),minute=now.getHours()*60+now.getMinutes();
  const base=legacy.recommend(input),rest=memory.confirmed.restWindow;
  const customQuiet=rest&&C.hour(rest.start)!==null&&C.hour(rest.end)!==null?C.inWindow(minute,C.hour(rest.start),C.hour(rest.end)):null;
  const busy=['work','commute','departure','recovery'].includes(base.phase);
  const quiet=!busy&&(customQuiet??(minute<360||minute>=1260));
  const upcoming=memory.obligations.filter(o=>o.confirmed&&o.kind==='appointment'&&C.timestamp(o.at)!==null&&C.timestamp(o.at)+(o.durationMinutes??0)*60000>=at).sort((a,b)=>C.timestamp(a.at)-C.timestamp(b.at));
  const commitment=upcoming.find(o=>C.timestamp(o.at)-at<=2*3600000)||null;
  const remaining=commitment?Math.max(0,Math.floor((C.timestamp(commitment.at)-at)/60000)):null;
  const available=base.availableMinutes===null?remaining:remaining===null?base.availableMinutes:Math.min(base.availableMinutes,remaining);
  const end=new Date(now);end.setHours(24,0,0,0);
  return {now,at,minute,weekday:now.getDay(),date:legacy.dateKey(now),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone||'unknown',base,quiet,busy,commitment,availableMinutes:available,phase:base.phase,dayEnd:end.getTime(),workKnown:Boolean(input.day?.coachWorkStart||input.day?.coachDeparture),dayOff:input.day?.coachShift===false,contextKey:C.fingerprint([legacy.dateKey(now),base.phase,base.current.kind,quiet,commitment?.id||null,memory.revision])};
 }
 function candidates(ctx){
  const {temporal:t}=ctx,list=[];
  if(['work','commute','departure'].includes(t.phase))list.push(C.candidate({id:'temporal-'+t.phase,domain:'temporal',kind:t.base.current.kind,title:t.base.current.title,message:t.base.current.detail,reason:'Horario de trabajo o salida configurado.',tier:5,urgency:95,importance:95,confidence:1,evidence:[{source:'daily-or-weekly-schedule',status:'confirmed'}],expiresAt:t.at+30*60000,cooldownMs:15*60000}));
  if(t.commitment&&C.timestamp(t.commitment.at)-t.at<=30*60000)list.push(C.candidate({id:'appointment-'+t.commitment.id,domain:'temporal',kind:'appointment',title:'Prepara tu próximo compromiso',message:'Tienes un compromiso registrado para este momento. Reserva el margen que necesitas.',reason:'Compromiso introducido o importado con permiso.',tier:5,urgency:100,importance:95,confidence:1,evidence:[{source:'memory.obligations',status:'confirmed'}],expiresAt:C.timestamp(t.commitment.at)+Math.max(1,t.commitment.durationMinutes??0)*60000,cooldownMs:30*60000}));
  return list;
 }
 return Object.freeze({analyze,candidates});
});
