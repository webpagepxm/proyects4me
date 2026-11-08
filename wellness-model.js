/* Only explicit dated local records count. Missing is unknown, not a failed habit. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RoadmapWellness=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const dimensions=[{id:'food',name:'Alimentación',keys:['breakfast','food'],color:'#C4F54C'},{id:'movement',name:'Movimiento',keys:['move'],color:'#74DCEB'},{id:'rest',name:'Descanso',keys:['rest'],color:'#FF93A5'}];
 const dateKey=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
 function forDay(checks,date,dimension){
  const keys=dimension.id==='food'&&Object.hasOwn(checks,'daily-'+date+'-dinner')?[...dimension.keys,'dinner']:dimension.keys;
  const values=keys.map(id=>checks['daily-'+date+'-'+id]);
  const observed=values.filter(v=>typeof v==='boolean').length,confirmed=values.filter(v=>v===true).length;
  return {id:dimension.id,name:dimension.name,color:dimension.color,confirmed,expected:keys.length,observed,missing:keys.length-observed,ratio:observed?confirmed/keys.length:null};
 }
 function summarize({checks={},now=new Date(),days=7}={}){
  const count=days===14?14:7,history=[];
  for(let i=count-1;i>=0;i--){const date=new Date(now);date.setHours(12,0,0,0);date.setDate(date.getDate()-i);const key=dateKey(date);history.push({date:key,metrics:dimensions.map(d=>forDay(checks,key,d))});}
  return {date:dateKey(now),metrics:history[history.length-1].metrics,history,hasTrend:dimensions.some((_,index)=>history.filter(day=>day.metrics[index].observed).length>=2)};
 }
 function weighted(entries){
  if(!Array.isArray(entries)||!entries.length)return null;
  const items=entries.filter(e=>Number.isFinite(e.weight)&&e.weight>0);
  if(!items.length||items.some(e=>!Number.isFinite(e.value)||e.value<0||e.value>100))return null;
  const total=items.reduce((n,e)=>n+e.weight,0);
  return Math.round(items.reduce((n,e)=>n+e.weight*e.value,0)/total);
 }
 return Object.freeze({summarize,weighted});
});
