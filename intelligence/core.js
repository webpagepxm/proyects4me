/* Shared, privacy-safe contracts. No DOM, storage, networking or hidden inference. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else(root.RoadmapIntelligence??={}).Core=api;})(globalThis,function(){
 'use strict';
 /** @typedef {{id:string,domain:string,kind:string,title:string,message:string,reason:string,window:object,urgency:number,importance:number,evidence:object[],confidence:number,lastShownAt:number|null,cooldownMs:number,expiresAt:number|null,exclusions:string[],tier:number,horizon:string}} Candidate */
 const domains=['essential','temporal','relationships','emotional','projects','balance','planning'];
 const number=(n,min,max,fallback)=>Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;
 const timestamp=value=>typeof value==='number'&&Number.isFinite(value)?value:typeof value==='string'&&Number.isFinite(Date.parse(value))?Date.parse(value):null;
 function candidate(data){
  if(!data||typeof data.id!=='string'||!domains.includes(data.domain)||!data.title)return null;
  return {id:data.id.slice(0,160),domain:data.domain,kind:data.kind||data.domain,title:String(data.title).slice(0,180),message:String(data.message||'').slice(0,400),reason:String(data.reason||'Regla local con información disponible.').slice(0,250),window:data.window||{start:null,end:null},urgency:number(data.urgency,0,100,0),importance:number(data.importance,0,100,50),evidence:Array.isArray(data.evidence)?data.evidence:[],confidence:number(data.confidence,0,1,.5),lastShownAt:timestamp(data.lastShownAt),cooldownMs:number(data.cooldownMs,60000,365*86400000,4*3600000),expiresAt:timestamp(data.expiresAt),exclusions:Array.isArray(data.exclusions)?data.exclusions:[],tier:number(data.tier,0,5,2),horizon:data.horizon||'immediate',durationMinutes:number(data.durationMinutes,0,1440,null)};
 }
 function safeObject(value){return value&&typeof value==='object'&&!Array.isArray(value);}
 const hour=value=>typeof value==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(value)?+value.slice(0,2)*60+ +value.slice(3):null;
 function inWindow(minute,start,end){return start===end?false:start<end?minute>=start&&minute<end:minute>=start||minute<end;}
 function fingerprint(value){let hash=2166136261;for(const c of JSON.stringify(value)){hash^=c.charCodeAt(0);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(36);}
 return Object.freeze({candidate,domains,number,timestamp,safeObject,hour,inWindow,fingerprint});
});
