(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory(require('./core'),require('./temporal-engine'),require('./essential-care-engine'),require('./relationship-engine'),require('./emotional-context-engine'),require('./project-director-engine'),require('./life-balance-engine'),require('./memory-and-preferences'));
 else root.RoadmapIntelligence.RecommendationOrchestrator=factory(root.RoadmapIntelligence.Core,root.RoadmapIntelligence.TemporalEngine,root.RoadmapIntelligence.EssentialCareEngine,root.RoadmapIntelligence.RelationshipEngine,root.RoadmapIntelligence.EmotionalContextEngine,root.RoadmapIntelligence.ProjectDirectorEngine,root.RoadmapIntelligence.LifeBalanceEngine,root.RoadmapIntelligence.MemoryAndPreferences);
})(globalThis,function(C,Temporal,Essential,Relationships,Emotional,Projects,Balance,Memory){
 'use strict';
 function evaluate(candidates,ctx){
  const {memory,temporal:t}=ctx;
  return candidates.filter(Boolean).map(c=>{
   const exclusions=[...c.exclusions],last=memory.exposure.seen[c.id]??null;
   if(c.expiresAt!==null&&c.expiresAt<=t.at)exclusions.push('expired');
   if(Object.hasOwn(memory.mutedRecommendations,c.id)&&(memory.mutedRecommendations[c.id]===null||C.timestamp(memory.mutedRecommendations[c.id])>t.at))exclusions.push('muted');
   if(t.quiet&&['projects','relationships','planning'].includes(c.domain))exclusions.push('quiet-window');
   if(t.busy&&['projects','relationships','balance','planning','emotional'].includes(c.domain))exclusions.push('configured-commitment');
   if(c.durationMinutes!==null&&t.availableMinutes!==null&&c.durationMinutes>t.availableMinutes)exclusions.push('insufficient-time');
   const cooldown=c.tier<4?Math.max(c.cooldownMs,memory.confirmed.minRepeatMinutes*60000):c.cooldownMs;
   const age=last===null?Infinity:t.at-last,recency=age>=0&&age<cooldown?250*(1-age/cooldown):0;
   const holding=memory.exposure.active?.id===c.id&&memory.exposure.active.contextKey===t.contextKey&&t.at-memory.exposure.active.at>=0&&t.at-memory.exposure.active.at<15*60000;
   if(['relationships','balance','planning'].includes(c.domain)&&last!==null&&age>=0&&age<cooldown&&!holding)exclusions.push('cooldown');
   const recent=memory.exposure.history.filter(h=>h.at<=t.at&&h.at>=t.at-7*86400000).slice(-6);
   const domainCount=recent.filter(h=>h.domain===c.domain).length;
   if(c.tier<4&&recent.length>=3&&recent.slice(-3).every(h=>h.domain===c.domain))exclusions.push('domain-saturated');
   const saturation=c.tier<4?domainCount*100:0;
   const score=c.tier*10000+c.urgency*50+c.importance*8+c.confidence*20-recency-saturation;
   return {...c,cooldownMs:cooldown,lastShownAt:last,exclusions,score,penalties:{recency,saturation}};
  }).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id,'en'));
 }
 function recommend(input,memory=Memory.empty()){
  const temporal=Temporal.analyze(input,memory),ctx={input,memory,temporal,balance:Balance.analyze(memory.records.concat(Balance.fromChecks(input.checks)),temporal.at)};
  const candidates=[...Temporal.candidates(ctx),...Essential.candidates(ctx),...Relationships.candidates(ctx),...Emotional.candidates(ctx),...Projects.candidates(ctx),...Balance.candidates(ctx)];
  const evaluated=evaluate(candidates,ctx),eligible=evaluated.filter(c=>!c.exclusions.length);
  let chosen=eligible[0];
  const active=memory.exposure.active;
  const previous=active&&eligible.find(c=>c.id===active.id);
  if(previous&&active.contextKey===temporal.contextKey&&temporal.at>=active.at&&temporal.at-active.at<15*60000&&(!chosen||chosen.tier<=previous.tier))chosen=previous;
  const silenced=!chosen&&evaluated.some(c=>c.exclusions.includes('muted'));
  if(!chosen)chosen=C.candidate({id:silenced?'neutral-silenced':'care-open-space',domain:'essential',kind:'personal',title:silenced?'Puedes seguir con tu día, sin más sugerencias':temporal.quiet?'Date un momento para descansar':'Tómate un momento, sin añadir pendientes',message:silenced?'Se respetan las sugerencias que has silenciado.':'Puedes seguir con lo que ya tenías previsto o descansar.',reason:'Sugerencia general cuando faltan datos o hay preferencias de silencio.',tier:1,confidence:.4,expiresAt:temporal.at+60*60000,evidence:[{source:'available-context',status:'unknown'}]});
  const next=[],seen=new Set([chosen.id]),domains=new Set([chosen.domain]);
  const offer=c=>{if(next.length>=2||seen.has(c.id)||domains.has(c.domain)||c.kind===chosen.kind)return;seen.add(c.id);domains.add(c.domain);next.push({kind:c.kind,title:c.title,detail:c.message});};
  for(const c of eligible)if(c.domain!=='projects'&&c.tier>=2)offer(c);
  if(!silenced){const future=temporal.quiet?temporal.base.next.filter(x=>x.kind==='morning'):chosen.kind!==temporal.base.current.kind?[temporal.base.current,...temporal.base.next]:temporal.base.next;for(const item of future){if(next.length>=2)break;const candidateId=item.kind==='writing'?'balance-writing':'care-'+item.kind;const futureCandidate=C.candidate({id:candidateId,domain:item.kind==='writing'?'balance':['work','departure','departure-time'].includes(item.kind)?'temporal':'essential',kind:item.kind,title:item.title,message:item.detail,reason:'Siguiente paso de la orientación local existente, sin confirmación de realización.',confidence:.5,tier:1,evidence:[{source:'existing-routine',status:'suggested'}],cooldownMs:item.kind==='writing'?24*3600000:memory.confirmed.minRepeatMinutes*60000,expiresAt:temporal.dayEnd});const futureEvaluation=evaluate([futureCandidate],ctx)[0];if(futureEvaluation.exclusions.length)continue;if(item.kind==='project'||item.kind==='connections'||item.kind===chosen.kind||next.some(n=>n.kind===item.kind))continue;next.push(item);}}
  const projectCandidate=eligible.find(c=>c.domain==='projects');
  const priority=projectCandidate&&!['temporal','emotional'].includes(chosen.domain)&&!temporal.quiet&&!temporal.busy?input.priority:null;
  const current={kind:chosen.kind,title:chosen.title,detail:chosen.message};
  if(memory.confirmed.tone==='direct'&&current.detail.length>130)current.detail=current.detail.split('. ')[0]+'.';
  return {phase:temporal.phase,current,next:next.slice(0,2),context:temporal.base.context,priority:chosen.domain==='projects'?input.priority:priority,availableMinutes:temporal.availableMinutes,selection:{id:chosen.id,domain:chosen.domain,reason:chosen.reason,confidence:chosen.confidence},explain:evaluated.map(c=>({id:c.id,domain:c.domain,score:c.score,reason:c.reason,confidence:c.confidence,exclusions:c.exclusions,penalties:c.penalties})),candidate:chosen,temporal,balance:ctx.balance};
 }
 return Object.freeze({recommend,evaluate});
});
