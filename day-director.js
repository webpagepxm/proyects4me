/* Roadmap day director: deterministic guidance, not a task scheduler.
 * Reading time advances suggestions, never completion. No storage, timers or DOM here.
 * Windows below are recommendation heuristics, not configured appointments.
 */
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.RoadmapDayDirector=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const time=value=>typeof value==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(value)?Number(value.slice(0,2))*60+Number(value.slice(3)):null;
 const clock=minute=>{const m=((minute%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
 const dateKey=date=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
 function schedule(day={},offset=0){
  if(day.coachShift===false)return null;
  const rawStart=time(day.coachWorkStart),rawEnd=time(day.coachWorkEnd),rawDeparture=time(day.coachDeparture);
  const travel=day.coachCommute!==''&&day.coachCommute!=null&&Number.isFinite(+day.coachCommute)&&+day.coachCommute>=0&&+day.coachCommute<=240?+day.coachCommute:null;
  if(rawStart===null&&rawDeparture===null)return null;
  const start=rawStart===null?null:rawStart+offset;
  let departure=rawDeparture===null?(start!==null&&travel!==null?start-travel:null):rawDeparture+offset;
  // A saved departure in the previous evening can belong to an early start.
  if(start!==null&&departure!==null&&departure>start&&departure-start>720)departure-=1440;
  const end=start!==null&&rawEnd!==null?rawEnd+offset+(rawEnd<=rawStart?1440:0):null;
  return {start,end,departure,travel,confirmed:day.coachShift===true||start!==null};
 }
 function recommend({now=new Date(),day={},previousDay={},checks={},priority=null,personal=[],weekKey=''}={}){
  const minute=now.getHours()*60+now.getMinutes(),key=dateKey(now);
  const done=id=>checks['daily-'+key+'-'+id]===true;
  const item=(kind,title,detail='')=>({kind,title,detail});
  const hygiene=item('hygiene','Agua e higiene para empezar','Lávate los dientes y toma agua, si aún te falta.');
  const breakfast=item('breakfast','Desayuna antes de exigirte más','Algo de comer y agua antes de concentrarte.');
  const movement=item('movement','Muévete y despeja el cuerpo','Camina o haz algo de ejercicio, según el tiempo y la energía que tengas.');
  const meal=item('meal','Haz una pausa para comer','Si ya comiste, estira las piernas antes de volver a concentrarte.');
  const rest=item('rest',minute<360?'Descansa':'Baja el ritmo','Lectura tranquila, menos pantallas y espacio para descansar.');
  const project=priority?item('project','Avanza en '+priority.name,priority.title):item('personal','Deja espacio para ti','Retoma un objetivo personal o descansa; no necesitas añadir pendientes.');
  const firstGoal=personal.find(p=>p.id==='writing'&&p.tasks.some((_,i)=>!checks[p.id+'-'+i]));
  const familyPending=!['papa','mama','amigos'].every(id=>checks['contact-week-'+weekKey+'-'+id]);
  const personalTime=firstGoal?item('writing','Dedica un rato a escribir','Retoma tu crónica o anota una idea, sin convertirlo en otra obligación.'):
    familyPending?item('connections','Haz espacio para alguien importante','Una conversación con tu familia o una amistad, si te apetece.'):rest;
  const quiet=minute<360||minute>=1260;
  let current,next,context='',phase=quiet?'night':minute<720?'morning':minute<1080?'afternoon':'evening';
  let bound=null,active=null;
  const today=schedule(day),previous=schedule(previousDay,-1440);
  for(const s of [previous,today]){
   if(!s)continue;
   if(s.start!==null&&s.end!==null&&minute>=s.start&&minute<s.end){active=s;break;}
   if(s.departure!==null&&s.start!==null&&minute>=s.departure&&minute<s.start){active=s;break;}
  }
  const departure=today&&(today.departure!==null?today.departure:today.start);
  if(today&&departure!==null&&departure>minute)bound=departure;
  const recovered=[previous,today].find(s=>s&&s.end!==null&&minute>=s.end&&minute-s.end<60);
  if(active){
   if(minute<active.start){
    current=item('commute','Reserva este tiempo para el traslado','Tu entrada está registrada a las '+clock(active.start)+'.');
    next=[item('work','Entrada al trabajo',clock(active.start))];phase='commute';
   }else{
    current=item('work','Concéntrate en tu turno','Horario registrado: '+clock(active.start)+'–'+clock(active.end)+'.');
    next=[item('recovery','Al terminar, come y recupera energía','El descanso va antes de abrir otro proyecto.')];phase='work';
   }
  }else if(today&&bound!==null&&bound-minute<=30){
   current=item('departure',today.departure!==null?'Prepara tu salida':'Prepara tu entrada al trabajo','Agua, algo de comer si te hace falta y lo necesario para salir.');
   next=[item('departure-time',today.departure!==null?'Salida registrada':'Entrada registrada',clock(bound))];phase='departure';
  }else if(recovered){
   current=item('recovery','Recupera energía después del turno','Come si te hace falta, haz una pausa y deja los proyectos para después.');next=[rest];phase='recovery';
  }else if(quiet){
   current=rest;next=[item('morning','Al despertar: agua, higiene y desayuno')];
   if(bound!==null){current=item('rest','Recupera energía antes de tu turno','Tu horario registrado sigue siendo la referencia.');next=[item('departure','Más adelante, prepara tu salida',clock(bound))];}
   if(today&&today.confirmed&&today.end===null&&today.departure!==null&&minute>=today.departure)
    current=item('rest','Al terminar tu turno, baja el ritmo','Si sigues trabajando, atiende lo esencial; después, descanso.');
  }else if(today&&today.departure!==null&&minute>=today.departure&&today.end===null){
   current=item('work',today.confirmed?'Da prioridad a tu turno, si sigue en curso':'Atiende tu salida registrada, si sigue en pie','No hay un fin de turno configurado; evita sumar trabajo adicional.');
   next=[item('recovery','Al terminar, comida y descanso')];phase='work';
  }else{
   const wake=day.coachWakeAnswered==='woke'&&Number.isFinite(day.coachWakeTime)&&day.coachWakeTime<=minute?day.coachWakeTime:null;
   const elapsed=wake===null?null:minute-wake;
   // A confirmed recent wake can shift care later. An app open is never wake evidence.
   if(elapsed!==null&&elapsed<90){
    current=elapsed<15&&!done('teeth')?hygiene:elapsed<45&&!done('breakfast')?breakfast:!done('move')?movement:project;
   }else if(minute<510)current=!done('teeth')?hygiene:!done('breakfast')?breakfast:!done('move')?movement:project;
   else if(minute<600)current=!done('breakfast')?breakfast:!done('move')?movement:project;
   else if(minute<720)current=!done('move')?movement:project;
   else if(minute<900)current=!done('food')?meal:!done('move')?movement:project;
   else if(minute<960)current=!done('move')?movement:project;
   else if(minute<1140)current=minute>=1080&&!done('food')?meal:project;
   else if(minute<1200)current=personalTime;
   else current=rest;
   // No recorded completion is not proof of neglect. Remind without freezing on a checkbox.
   if(current.kind==='project')current={...project,detail:(done('food')?'':'Si aún no has comido, come primero. ')+project.detail};
   const following={hygiene:[breakfast,movement],breakfast:[movement,project],movement:[project,meal],meal:[movement,project],project:[item('pause','Después, haz una pausa breve','Agua, movimiento o algo de comer, según lo que necesites.'),personalTime],writing:[rest],connections:[rest],personal:[rest],rest:[item('morning','Al despertar: agua, higiene y desayuno')]};
   const candidates=following[current.kind]||[rest];
   const evidenceKind={hygiene:'teeth',breakfast:'breakfast',movement:'move',meal:'food'};
   next=candidates.filter(x=>x.kind!==current.kind&&!(evidenceKind[x.kind]&&done(evidenceKind[x.kind]))).slice(0,2);
   if(bound!==null){
    const left=bound-minute;
    context=(today.departure!==null?'Salida':'Entrada')+' registrada: '+clock(bound)+'. Quedan '+left+' min.';
    if(left<60&&current.kind==='movement')current={...movement,title:'Haz una pausa breve para moverte',detail:'Guarda margen para la salida; no abras un bloque largo.'};
    if(left<60&&current.kind==='project')current=item('pause','Cubre lo esencial antes de salir','Agua, comida si te hace falta y lo necesario para tu compromiso.');
    if(left<60)next=[item('departure','Después, prepárate para salir',clock(bound))];
    else next=next.filter(x=>x.kind!=='rest').slice(0,1).concat(item('departure','Más adelante, tu '+(today.departure!==null?'salida':'entrada')+' registrada',clock(bound)));
   }
  }
  const available=bound===null?null:Math.max(0,bound-minute);
  const canProject=!['night','work','commute','departure','recovery'].includes(phase)&&minute<1200&&(available===null||available>=60)&&priority;
  // An essential recommendation remains first. The professional priority is secondary.
  return {phase,current,next:(next||[]).filter(item=>!(canProject&&current.kind!=='project'&&item.kind==='project')),context,priority:canProject?priority:null,availableMinutes:available};
 }
 return Object.freeze({recommend,time,clock,dateKey});
});
