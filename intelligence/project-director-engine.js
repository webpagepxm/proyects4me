(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'));else root.RoadmapIntelligence.ProjectDirectorEngine=factory(root.RoadmapIntelligence.Core);})(globalThis,function(C){
 'use strict';
 function candidates({temporal:t,input,memory}){
  if(t.quiet||t.busy||t.minute>=1200||t.availableMinutes!==null&&t.availableMinutes<60)return [];
  const p=input.priority;if(!p)return [];
  const fact=input.projectFacts?.find(x=>x.id===p.projectId);
  if(fact&&(fact.active===false||fact.completed===true||fact.blocked===true||fact.dependencies?.some(d=>d.completed!==true)))return [];
  const deadline=memory.obligations.find(o=>o.confirmed&&o.kind==='projectDeadline'&&o.projectId===p.projectId&&C.timestamp(o.at)>=t.at&&C.timestamp(o.at)-t.at<=7*86400000);
  return [C.candidate({id:'project-'+p.id,domain:'projects',kind:'project',title:'Retoma un paso de '+p.name,message:p.title,reason:deadline?'Prioridad existente con una fecha límite registrada.':'Siguiente actividad de la prioridad existente, con margen disponible.',tier:deadline?3:t.base.current.kind==='writing'?2:3,urgency:deadline?65:t.base.current.kind==='writing'?0:15,importance:deadline?85:t.base.current.kind==='writing'?30:65,confidence:fact?1:.8,evidence:[{source:'existing-project-priority',status:'configured'},{source:'project-progress',status:fact?.progress==null?'unknown':'recorded'}],expiresAt:deadline?C.timestamp(deadline.at):t.dayEnd,cooldownMs:2*3600000,horizon:deadline?'weekly':'daily'})];
 }
 return Object.freeze({candidates});
});
