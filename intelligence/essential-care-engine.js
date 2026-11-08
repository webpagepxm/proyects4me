(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'));else root.RoadmapIntelligence.EssentialCareEngine=factory(root.RoadmapIntelligence.Core);})(globalThis,function(C){
 'use strict';
 function candidates({temporal:t,input,memory}){
  const done=id=>input.checks?.['daily-'+t.date+'-'+id]===true;
  const make=(id,kind,title,message,tier=4)=>C.candidate({id:'care-'+id,domain:'essential',kind,title,message,reason:'Cuidado pertinente para esta franja; no se presume realización.',window:{start:t.quiet?'night':'current',end:null},tier,importance:80,urgency:60,confidence:.65,evidence:[{source:'local-time',status:'known'},{source:'daily-checks',status:'recorded-or-unknown'}],expiresAt:t.at+60*60000,cooldownMs:memory.confirmed.minRepeatMinutes*60000});
  if(t.phase==='recovery')return [make('recovery','recovery','Recupera energía después del turno','Come si te hace falta y deja un espacio para descansar.',5)];
  if(t.quiet){
   if(t.minute>=1230&&t.minute<1305&&!done('dinner'))return [make('dinner','dinner','Cena y baja el ritmo, si aún te falta','Después, higiene de noche y descanso.')];
   if(t.minute>=1200&&t.minute<1380&&!done('nightTeeth'))return [make('night-hygiene','hygiene','Cierra el día con tu higiene de noche','Cepillado dental, agua y lo necesario para descansar.')];
   return [make('rest','rest',t.minute<360?'Descansa; lo demás puede esperar':'Baja el ritmo','Si sigues despierto, deja espacio para desconectar sin abrir más pendientes.')];
  }
  if(t.busy)return [];
  if(t.minute>=510&&t.minute<660&&!done('breakfast'))return [make('breakfast','breakfast','Desayuna antes de continuar, si aún te falta','Algo de comer y agua antes de exigirte más.')];
  if(t.minute>=1230&&t.minute<1260&&!done('dinner'))return [make('dinner','dinner','Haz espacio para cenar','Después puedes cerrar el día con calma.')];
  const b=t.base.current;
  if(['project','writing','connections','personal'].includes(b.kind))return [];
  return [make(b.kind,b.kind,b.title,b.detail,b.kind==='movement'?3:4)];
 }
 return Object.freeze({candidates});
});
