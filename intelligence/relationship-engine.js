(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'));else root.RoadmapIntelligence.RelationshipEngine=factory(root.RoadmapIntelligence.Core);})(globalThis,function(C){
 'use strict';
 function candidates({temporal:t,memory,input}){
  if(!memory.confirmed.socialEnabled||t.quiet||t.busy||t.minute<600||t.minute>=1200||t.availableMinutes!==null&&t.availableMinutes<45)return [];
  const people=memory.relationships.filter(p=>p.mode==='open'&&(!p.mutedUntil||C.timestamp(p.mutedUntil)<=t.at)&&Number.isFinite(p.intervalDays)&&p.intervalDays>0&&C.timestamp(p.lastContactAt)!==null&&t.at-C.timestamp(p.lastContactAt)>=p.intervalDays*86400000);
  const list=people.map(p=>C.candidate({id:'relationship-'+C.fingerprint(p.id),domain:'relationships',kind:'connections',title:'Podrías hacer espacio para alguien importante',message:'Solo si te apetece y encaja con tus propios límites.',reason:'Frecuencia y último contacto declarados voluntariamente.',tier:3,urgency:30,importance:70,confidence:1,evidence:[{source:'relationship-preference',status:p.source}],cooldownMs:p.intervalDays*86400000,expiresAt:t.dayEnd,horizon:'weekly'}));
  if(!memory.relationships.length&&t.weekday===0&&t.minute>=960&&input.personal?.some(p=>p.id==='personal'))list.push(C.candidate({id:'relationship-open-space',domain:'relationships',kind:'connections',title:'Reserva espacio para tus vínculos, si te apetece',message:'Una conversación o un rato de convivencia; no tiene que resolverse nada hoy.',reason:'Objetivo personal existente, sin inferir falta de contacto.',tier:2,importance:45,confidence:.5,cooldownMs:7*86400000,expiresAt:t.dayEnd,horizon:'weekly',evidence:[{source:'existing-personal-goals',status:'configured'}]}));
  return list;
 }
 return Object.freeze({candidates});
});
