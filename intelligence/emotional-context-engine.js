(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'));else root.RoadmapIntelligence.EmotionalContextEngine=factory(root.RoadmapIntelligence.Core);})(globalThis,function(C){
 'use strict';
 function candidates({temporal:t,memory}){
  if(t.busy||t.minute>=360||!memory.patterns.nightOverthinking)return [];
  return [C.candidate({id:'emotional-quiet-night',domain:'emotional',kind:'rest',title:'Las decisiones importantes pueden esperar',message:'Date una pausa de pantallas y conversaciones difíciles. Puedes retomarlas con calma.',reason:'Preferencia declarada de un acompañamiento tranquilo de noche.',tier:4,importance:96,urgency:65,confidence:1,window:{start:'quiet',end:null},evidence:[{source:'voluntary-pattern',status:'confirmed'}],expiresAt:t.at+90*60000,cooldownMs:6*3600000})];
 }
 return Object.freeze({candidates});
});
