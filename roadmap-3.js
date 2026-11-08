
const projects=[
{id:'backstage',name:'Denbou',status:'Prioridad 1 · esta semana',description:'Denise · eventos y finanzas · mobile-first',tasks:[['Revisar flujo real de creación de evento','Eventos'],['Comprobar apertura del evento desde su nombre','Eventos'],['Probar edición de evento existente','Eventos'],['Probar eventos recurrentes y excepciones','Eventos'],['Verificar carga de imagen desde móvil','Eventos'],['Revisar registro de ingresos con fecha','Finanzas'],['Revisar registro de gastos con fecha','Finanzas'],['Probar eliminación de ingreso y gasto','Finanzas'],['Separar por cobrar y por pagar','Finanzas'],['Probar exportación CSV','Finanzas'],['Revisar usabilidad de notas y pendientes','Interfaz'],['Probar login de Denise en iPhone','Acceso'],['Verificar permisos y protección de datos','Seguridad'],['Auditar base de datos, errores y seguridad','Auditoría'],['Probar los flujos en iPhone y computadora','QA'],['Preparar prueba guiada con Denise','Entrega']]},
{id:'torre',name:'Torre Fuerte',status:'Prioridad 2 · V1',description:'Órdenes y seguimiento de motos · Android / PC',tasks:[['Definir campos mínimos de orden de servicio','Órdenes'],['Crear registro manual de moto y cliente','Órdenes'],['Conectar solicitud por formulario','Captación'],['Revisar entrada desde WhatsApp','Captación'],['Crear estados de reparación','Seguimiento'],['Mostrar estatus al cliente en enlace privado','Seguimiento'],['Mostrar fecha estimada de entrega','Seguimiento'],['Proteger datos de clientes y órdenes','Seguridad'],['Probar alta de orden desde Android','QA'],['Probar cambio de estado','QA'],['Probar enlace privado del cliente','QA'],['Probar flujo completo extremo a extremo','QA'],['Evaluar impresora térmica compatible','Impresión'],['Preparar demostración V1','Entrega']]},
{id:'callejero',name:'Callejero PXM',status:'Prioridad 1 · integrar con Denbou',description:'Landing, registros, RPs y análisis',tasks:[['Confirmar alcance mínimo de landing','Definición'],['Definir formulario de asistentes','Captación'],['Preparar QR identificable por RP','RPs'],['Definir acceso limitado a leads propios','RPs'],['Diseñar registro de asistencia','Operación'],['Evaluar validación QR y manual','Operación'],['Definir métricas iniciales de asistencia','Análisis'],['Definir métricas iniciales de ventas','Análisis'],['Planificar integración con Denbou','Integración']]},
{id:'sommo',name:'SOMMO · trabajo',status:'Trabajo e ingresos',description:'Estudio de menú y servicio',tasks:[['Organizar temario de ingredientes','Estudio'],['Organizar temario de bebidas','Estudio'],['Preparar examen de práctica','Estudio'],['Hacer simulación de servicio','Estudio'],['Estudiar menú 40 minutos en sesión disponible','Estudio'],['Revisar avance del menú en 15–21 días','Revisión']]},
{id:'agencia',name:'Agencia',status:'En espera · después de pilotos',description:'Landings y ecosistemas · pilotos',tasks:[['Definir oferta inicial de landings','Oferta'],['Definir oferta de ecosistemas operativos','Oferta'],['Diseñar esquema de instalación y soporte','Modelo'],['Seleccionar pilotos gratuitos','Clientes'],['Preparar portafolio con trabajos verificados','Portafolio'],['Definir controles de seguridad por tipo de dato','Seguridad'],['Dejar fuera community management y grabación frecuente del servicio base','Alcance']]},
{id:'slider',name:'Slider Bros',status:'En espera · revisar al reactivar',description:'Operación y contenido',tasks:[['Revisar pendientes cuando se reactive','En espera'],['Evaluar Metricool vs alternativas abiertas','Pendiente'],['Rediseñar notas y calendario','Pendiente'],['Planear vista mensual y Gantt','Pendiente']]}
,
{id:'brujula',name:'Brújula · segundo cerebro',status:'Diseño en espera · separado de Roadmap',description:'Memoria digital portable · datos bajo tu control',tasks:[['Acordar alcance de memoria personal y qué nunca se guarda','Visión'],['Diseñar esquema de recuerdos, experiencias, valores y metas','Datos'],['Separar recuerdos, modelos de IA y permisos','Arquitectura'],['Definir cómo corregir, exportar y eliminar registros','Privacidad'],['Diseñar un primer check-in periódico de reflexión','Experiencia'],['Explorar avatar pixel art y visualización de evolución','Diseño'],['Probar la diferencia entre observaciones e hipótesis de IA','Rigor'],['Programar piloto solo después de cerrar prioridades actuales','Planificación']]}
];
const life=[{id:'writing',name:'Escritura',sub:'3 sesiones de 30 min/semana · primera crónica',tasks:[['Escribir 30 minutos, sesión 1','Crónica'],['Escribir 30 minutos, sesión 2','Crónica'],['Escribir 30 minutos, sesión 3','Crónica'],['Anotar idea o disparador creativo','Ideas'],['Esbozar una crónica de viajes','Crónica']]},{id:'exercise',name:'Ejercicio',sub:'Correr una vez por semana, más movimiento flexible',tasks:[['Moverme 30 min, sesión 1','Movimiento'],['Moverme 30 min, sesión 2','Movimiento'],['Moverme 30 min, sesión 3','Movimiento'],['Moverme 30 min, sesión 4','Movimiento'],['Registrar sesión o distancia','Registro'],['Correr una vez por semana','Meta semanal']]},{id:'food',name:'Comida y súper',sub:'Compras y alimentación realista',tasks:[['Preparar lista de súper semanal','Compras'],['Comprar proteínas listas para consumir','Compras'],['Comprar fruta y verduras','Compras'],['Comprar yogur, avena o ingredientes para sándwich','Compras'],['Revisar horarios de comida','Rutina']]},{id:'money',name:'Dinero',sub:'Renta y deudas primero · presupuesto de 7 días',tasks:[['Anotar próximos pagos de renta y deudas','Pagos'],['Revisar presupuesto disponible de 7 días','Presupuesto'],['Registrar gastos del día','Gastos'],['Separar gastos personales y de proyectos','Orden'],['Revisar pagos con 3 días de anticipación','Pagos']]},{id:'personal',name:'Descanso y vínculos',sub:'1 h de descanso · familia, amistades y lectura',tasks:[['Escribir a alguien de la familia','Vínculos'],['Escribir a una amistad','Vínculos'],['Reservar tiempo para leer','Lectura'],['Hacer limpieza corta','Casa'],['Organizar ropa pendiente','Casa'],['Proteger un descanso largo','Descanso'],['Leer 15–20 minutos en un día de trabajo','Lectura']]},{id:'study',name:'Aprendizaje',sub:'SOMMO y TripleTen, sin inventar horario',tasks:[['Confirmar siguiente paso real de TripleTen','Datos'],['Estudiar ingredientes SOMMO','SOMMO'],['Estudiar bebidas SOMMO','SOMMO'],['Hacer un examen o simulación SOMMO','SOMMO']]}];
const priorityQueue=[['backstage-11','Callejero + Denbou · comprobar acceso desde el iPhone','Denise debe poder iniciar sesión'],['callejero-0','Callejero + Denbou · definir alcance de landing','Captación dentro del proyecto integrado'],['torre-0','Torre Fuerte · definir orden de servicio','Siguiente frente: V1 útil y verificable'],['backstage-0','Callejero + Denbou · revisar creación de eventos','Validar el flujo principal'],['backstage-5','Callejero + Denbou · registrar ingreso con fecha','Probar finanzas'],['callejero-1','Callejero + Denbou · definir formulario de registro','Captación de asistentes'],['torre-1','Torre Fuerte · registrar moto y cliente','Preparar operación real'],['backstage-12','Callejero + Denbou · revisar permisos de datos','Seguridad antes de ampliar usuarios'],['callejero-2','Callejero + Denbou · QR identificable por RP','Medir registros sin interferir en ventas'],['torre-4','Torre Fuerte · crear estados de reparación','Seguimiento al cliente'],['backstage-14','Callejero + Denbou · probar en celular y computadora','Validar antes de entregar'],['torre-5','Torre Fuerte · enlace privado al cliente','Verificar privacidad y estatus']];
const quick=[['writing-0','Escritura · 30 minutos'],['exercise-0','Ejercicio · primera sesión'],['food-0','Lista de súper'],['money-0','Próximos pagos']];
const weekly=[['writing-0','Escritura · sesión 1'],['writing-1','Escritura · sesión 2'],['writing-2','Escritura · sesión 3'],['exercise-0','Movimiento · sesión 1'],['exercise-1','Movimiento · sesión 2'],['food-0','Lista de súper'],['personal-0','Contacto con familia'],['personal-1','Contacto con amistad']];
const key='mi-tablero-personal-v1';let state={checks:{},note:''};try{state={...state,...JSON.parse(localStorage.getItem(key)||'{}')}}catch(e){};let lastSavedState=JSON.stringify(state);
function save(silent=false){
 const status=document.getElementById('saveStatus');
 try{const serialized=JSON.stringify(state);localStorage.setItem(key,serialized);lastSavedState=serialized;
 if(status&&!silent){status.textContent='Guardado en este navegador';status.className='save-status is-saved';}return true;
 }catch(error){
 // Restore in place: existing renderer references must keep pointing at the same objects.
 const restore=(target,source)=>{Object.keys(target).forEach(k=>{if(!(k in source)){if(target[k]&&typeof target[k]==='object'&&!Array.isArray(target[k]))restore(target[k],{});else delete target[k];}});Object.keys(source).forEach(k=>{
 if(source[k]&&typeof source[k]==='object'&&!Array.isArray(source[k])){if(!target[k]||typeof target[k]!=='object')target[k]={};restore(target[k],source[k]);}else target[k]=source[k];});};
 restore(state,JSON.parse(lastSavedState));
 const note=document.getElementById('dailyNote');if(note)note.value=state.note||'';
 if(status){status.textContent='No se pudo guardar. El cambio se deshizo. Exporta un respaldo o libera espacio.';status.className='save-status is-error';}return false;
 }
}const all=[...projects,...life];function taskHTML(id,title,sub=''){return `<label class="task ${state.checks[id]?'done':''}"><input type="checkbox" data-task="${id}" ${state.checks[id]?'checked':''}><span><b>${title}</b>${sub?`<small>${sub}</small>`:''}</span></label>`}function progress(item){return item.tasks.length?Math.round(item.tasks.filter((_,i)=>state.checks[item.id+'-'+i]).length/item.tasks.length*100):0}// ROADMAP_TIME_AWARE_DAY_V1: reglas locales de horario, sin IA, GPS ni notificaciones.
// Abrir la página NO demuestra que la persona acaba de despertar.
const coachHost=document.getElementById('dayCoach');
const coachMinutes=()=>{const n=new Date();return n.getHours()*60+n.getMinutes()};
const coachClock=minutes=>{
 const p=((Math.floor(minutes)%1440)+1440)%1440;
 return String(Math.floor(p/60)).padStart(2,'0')+':'+String(p%60).padStart(2,'0');
};
function coachParseTime(text,fallback=930){
 if(typeof text!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(text))return fallback;
 return Number(text.slice(0,2))*60+Number(text.slice(3));
}
function coachTimeLabel(a,b){return coachClock(a)+'–'+coachClock(b);}
function coachSteps(start,end,morning,mainTask,readDone){
 const duration=Math.max(0,end-start);
 if(duration<=0)return [];
 let t=start;
 const steps=[];
 const add=(mins,title,details)=>{
   const use=Math.min(Math.max(0,Math.floor(mins)),Math.max(0,end-t));
   if(use<5)return;
   steps.push({start:t,end:t+use,title,details});
   t+=use;
 };
 if(duration<105){
   add(Math.min(18,Math.floor(duration*.27)),'Cubrir lo básico','Agua, higiene y algo de comer, si hace falta');
   add(Math.max(0,duration-35),'Una acción concreta','Escoge solo un paso del proyecto prioritario');
   add(end-t,'Prepararte para salir','No necesitas recuperar el día completo');
   return steps;
 }
 const prep=Math.min(25,Math.floor(duration*.13));
 const available=duration-prep;
 if(morning){
   const routine=Math.min(85,Math.max(45,Math.floor(available*.28)));
   const proportions=[10,25,35,15];
   let balance=routine;
   const portions=proportions.map((n,i)=>{const value=i===3?balance:Math.max(5,Math.round(routine*n/85));balance-=value;return value});
   add(portions[0],'Higiene y agua','Lavarte los dientes y tomar agua');
   add(portions[1],'Desayunar','Comer antes de entrar a los proyectos');
   add(portions[2],'Actividad física','30 minutos como base cuando haya tiempo');
   add(portions[3],'Prepararte','Ducha o alistarte para el día');
 }
 const forWork=Math.max(0,end-t-prep);
 const breakFood=forWork>100?Math.min(30,Math.round(forWork*.10)):0;
 const read=morning&&forWork>330&&!readDone?15:0;
 const breakShort=forWork>200?10:0;
 let focus=forWork-breakFood-read-breakShort;
 if(focus<0)focus=0;
 const parts=focus>260?3:focus>135?2:1;
 const first=Math.floor(focus/parts);
 add(first,'Proyecto principal','Un paso verificable: '+mainTask);
 if(read)add(read,'Lectura breve (opcional)','15 minutos para leer si te resulta agradable');
 if(breakFood)add(breakFood,'Pausa para comer','No sacrificar la alimentación por programar');
 if(breakShort)add(breakShort,'Pausa breve','Agua, caminar o despejarte');
 for(let i=1;i<parts;i++)add(i===parts-1?Math.max(0,focus-first*(parts-1)):first,i===1?'Segundo bloque de trabajo':'Último bloque de trabajo','Retomar el siguiente paso, solo si hay energía');
 add(end-t,'Cerrar y prepararte','Guardar cambios, recoger tus cosas y salir sin prisas');
 return steps;
}
function coachFocus(now,phase,key,shiftChoice,work){
 const done=id=>!!state.checks['daily-'+key+'-'+id];
 if(phase==='night'){
   if(now<360||now>=60&&now<360)return ['Dormir y desconectar','Si aún estás despierto, no hace falta abrir otra tarea de programación.'];
   return ['Baja el ritmo','Deja las redes, prepara lo de mañana y busca una hora tranquila para dormir.'];
 }
 if(phase==='morning'){
   const care=[['teeth','Lavarte los dientes y tomar agua'],['breakfast','Desayunar'],['move','Hacer 30 minutos de movimiento']];
   const next=care.find(item=>!done(item[0]));
   if(next)return [next[1],'Empieza por lo básico. Cuando termines, marca la acción y verás el siguiente paso.'];
   return [work?.[1]||'Revisar tu primera misión','Tu rutina inicial está cubierta. Ahora, una tarea del proyecto prioritario.'];
 }
 if(phase==='afternoon'){
   if(now>=13*60&&!done('food'))return ['Hacer una pausa para comer','Después vuelves a tu misión, sin saltarte la comida.'];
   return [work?.[1]||'Revisar el siguiente paso del proyecto','Un bloque de concentración. Si se acerca tu salida, elige un paso pequeño.'];
 }
 if(shiftChoice===false){
   return [now<19*60&&work?work[1]:'Descansar y recuperar energía','Si aún quieres avanzar, haz un bloque corto; también cuenta terminar a tiempo.'];
 }
 return ['Atender tu turno o tus compromisos','La hora de salida es una referencia editable. No asumiré que estás trabajando sin confirmarlo.'];
}
function renderDayCoach(){
 if(!coachHost)return;
 const key=todayLocalKey(),day=todayCheckin(),now=coachMinutes();
 let departure=coachParseTime(day.coachDeparture,15*60+30);
 const shift=day.coachShift??null;
 const effectiveEnd=shift===false?Math.max(departure,18*60):departure;
 const morning=now>=360&&now<720;
 const phase=(now<360||now>=21*60)?'night':
   now<720?'morning':now<effectiveEnd?'afternoon':'late';
 if(phase==='morning'&&!Number.isFinite(+day.coachMorningOpenedAt)){
   day.coachMorningOpenedAt=now;save(true);
 }
 if(phase==='afternoon'&&!Number.isFinite(+day.coachAfternoonOpenedAt)){
   day.coachAfternoonOpenedAt=now;save(true);
 }
 const availableWork=priorityQueue.filter(x=>!state.checks[x[0]]);
 const first=availableWork[0];
 const done=id=>!!state.checks['daily-'+key+'-'+id];
 const nextCare=phase==='morning'?
   [['teeth','Lávate los dientes'],['breakfast','Desayuna'],['move','Haz ejercicio · 30 min']].find(x=>!done(x[0])):
   phase==='afternoon'&&now>=13*60&&!done('food')?['food','Come algo']:null;
 const title=nextCare?nextCare[1]:phase==='night'?(now<360?'Descansa':'Deja el teléfono'):
   phase==='late'?(shift===true?'Ve a trabajar':'Cierra tu día'):'Avanza en tu proyecto';
 const periodNames={morning:'Mañana',afternoon:'Antes de salir',late:'Tarde',night:'Noche'};
 const savedOpening=phase==='morning'?day.coachMorningOpenedAt:phase==='afternoon'?day.coachAfternoonOpenedAt:now;
 const opening=Number.isFinite(+savedOpening)?+savedOpening:now;
 const start=Math.max(360,Math.min(now,opening));
 const items=phase==='morning'||phase==='afternoon'?
   coachSteps(start,effectiveEnd,phase==='morning',first?first[1]:'hacer un pequeño avance',!!state.checks['daily-'+key+'-read']):
   phase==='late'?
   [
     {start:now,end:Math.min(now+30,21*60),title:shift===true?'Turno de trabajo':'Cerrar compromisos',details:shift===true?'Atiende tu turno, sin sumar tareas de programación':'Si no hay turno, puedes descansar o cerrar algo pequeño'},
     {start:Math.min(now+30,21*60),end:21*60,title:'Comida y pausa',details:'Cuida tu energía antes de la noche'}
   ].filter(x=>x.end>x.start):
   now>=21*60?
   [
     {start:now,end:Math.max(now,23*60+30),title:'Cerrar el día con calma',details:'Preparar mañana sin abrir pendientes nuevos'},
     {start:Math.max(now,23*60+30),end:Math.max(now+15,23*60+45),title:'Dejar el teléfono y las redes',details:'Referencia sugerida: 23:30; si ya pasó, empieza ahora'},
     {start:Math.max(now+15,23*60+45),end:Math.max(now+40,24*60+30),title:'Lectura y descanso',details:'Un rato tranquilo; acostarte gradualmente entre 00:00 y 01:00'}
   ].filter(x=>x.end>x.start):[];
 const rows=items.slice(0,10).map(item=>
   '<div class="coach-slot"><span class="coach-slot-time">'+coachTimeLabel(item.start,item.end)+'</span>'+
   '<span class="coach-slot-copy"><b>'+item.title+'</b></span></div>'
 ).join('');
 const wakePrompt=morning&&!day.coachWakeAnswered?
   '<div class="coach-wake"><span>¿Acabas de despertar?</span>'+
   '<div><button type="button" data-coach-action="woke">Sí</button>'+
   '<button type="button" data-coach-action="awake">No</button></div></div>':'';
 const priorSchedule=coachHost.querySelector('.coach-schedule');
 const scheduleOpen=priorSchedule?priorSchedule.open:true;
 const outline=phase==='night'?'Rutina de noche':
   phase==='late'?'Ver la tarde':'Horario hasta '+coachClock(effectiveEnd);
 const essentials=phase==='night'?'':
   '<div class="coach-essentials" aria-label="Cuidados de hoy">'+
   [['teeth','Lavarme los dientes y tomar agua'],['breakfast','Desayunar'],['move','Moverme / hacer ejercicio'],['food','Comer y hacer una pausa']].map(([id,label])=>
     '<label class="coach-essential"><input type="checkbox" data-task="daily-'+key+'-'+id+'" '+(done(id)?' checked':'')+'><span>'+label+'</span></label>'
   ).join('')+'</div>';
 const mark=nextCare?
   '<button type="button" class="coach-done" data-coach-action="done" data-coach-check="'+nextCare[0]+'">Hecho</button>':'';
 coachHost.innerHTML=
   '<div class="coach-head" data-coach-phase="'+phase+'"><span class="eyebrow">'+periodNames[phase]+'</span>'+
   '<time class="coach-clock">'+coachClock(now)+'</time></div>'+
   '<div class="coach-next" role="status"><span>Ahora</span><strong>'+title+'</strong>'+mark+'</div>'+
   wakePrompt+
   essentials+
   (phase==='night'?'<div class="coach-rest">'+taskHTML('daily-'+key+'-read','Leer un rato')+taskHTML('daily-'+key+'-rest','Prepararme para descansar')+'</div>':'')+
   '<details class="coach-schedule"'+(scheduleOpen?' open':'')+'><summary>'+outline+'</summary>'+
   '<div class="coach-slots">'+(rows||'<p>Descansa.</p>')+'</div></details>'+
   '<div class="coach-settings"><h2>Tu horario</h2>'+
   '<div class="coach-setting-row"><label for="coachDeparture">Hora de salida</label>'+
   '<input id="coachDeparture" data-coach-departure type="time" value="'+coachClock(departure)+'"></div>'+
   '<div class="coach-setting-row"><span>¿Trabajas hoy?</span><div class="coach-shift-choices">'+
   '<button type="button" data-coach-action="shift-yes" aria-pressed="'+(shift===true)+'">Sí</button>'+
   '<button type="button" data-coach-action="shift-no" aria-pressed="'+(shift===false)+'">No</button></div></div></div>';
}
if(coachHost){
 coachHost.addEventListener('click',event=>{
  const button=event.target.closest('[data-coach-action]');
  if(!button)return;
  const day=todayCheckin(),action=button.dataset.coachAction;
  if(action==='woke'||action==='awake'){
   day.coachWakeAnswered=action;
   if(action==='woke'){day.coachWakeTime=coachMinutes();day.coachMorningOpenedAt=day.coachWakeTime;}
  }else if(action==='shift-yes')day.coachShift=true;
  else if(action==='shift-no')day.coachShift=false;
  else if(action==='done'){
   const id=button.dataset.coachCheck;
   if(!['teeth','breakfast','move','food'].includes(id))return;
   state.checks['daily-'+todayLocalKey()+'-'+id]=true;
   save();preserveInteraction(render);return;
  }else return;
  save();preserveInteraction(()=>{renderDayCoach();if(action==='shift-yes'||action==='shift-no')renderDailyPlan();});
 });
 coachHost.addEventListener('change',event=>{
  const time=event.target.closest('[data-coach-departure]');
  if(!time)return;
  if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time.value))return;
  const day=todayCheckin();day.coachDeparture=time.value;
  save();preserveInteraction(renderDailyPlan);
 });
 document.addEventListener('visibilitychange',()=>{
  if(!document.hidden)renderDayCoach();
 });
}


function render(){const total=all.reduce((a,p)=>a+p.tasks.length,0),done=all.reduce((a,p)=>a+p.tasks.filter((_,i)=>state.checks[p.id+'-'+i]).length,0);document.getElementById('stats').innerHTML=`<div class="card stat"><div class="eyebrow">Tareas registradas</div><strong>${total}</strong><small class="muted">Sin asumir completadas</small></div><div class="card stat"><div class="eyebrow">Confirmadas</div><strong>${done}</strong><small class="muted">Marcadas por ti</small></div><div class="card stat"><div class="eyebrow">Avance</div><strong>${Math.round(done/total*100)}%</strong><small class="muted">Del checklist inicial</small></div>`;const next=priorityQueue.filter(([id])=>!state.checks[id]).slice(0,3);document.getElementById('priorityList').innerHTML=next.length?next.map(([id,title,sub])=>taskHTML(id,title,sub)).join(''):'<p class="mini muted">Completaste el foco inicial. Abre Proyectos y prepara la siguiente revisión conmigo.</p>';document.getElementById('quickTasks').innerHTML=quick.map(([id,title])=>taskHTML(id,title)).join('');document.getElementById('weeklyTasks').innerHTML=weekly.map(([id,title])=>taskHTML(id,title)).join('')+taskHTML(runWeeklyId(),'Correr una vez esta semana','20–30 min o trotar/caminar');document.getElementById('lifeTasks').innerHTML=life.flatMap(p=>p.tasks.map((t,i)=>taskHTML(p.id+'-'+i,t[0],p.name+' · '+t[1]))).join('');document.getElementById('lifeCards').innerHTML=life.map(p=>`<div class="card"><div class="eyebrow">${p.name}</div><p class="mini muted">${p.sub}</p><div class="bar"><div class="fill" style="width:${progress(p)}%"></div></div><div class="row"><small class="muted">${progress(p)}% del checklist</small><span class="tag">${p.tasks.length} pasos</span></div></div>`).join('');renderProjects();renderDailyPlan()}
function renderProjects(){ /* reemplazado por renderer único */ }
function preserveInteraction(draw){
 const active=document.activeElement;
 const identity=active&&{id:active.id,task:active.dataset?.task,action:active.dataset?.coachAction,ring:active.dataset?.ring,inCoach:!!active.closest?.('#dayCoach')};
 const position={top:window.scrollY||0,left:window.scrollX||0};
 const details=Array.from(document.querySelectorAll('details'),el=>el.open);
 draw();
 document.querySelectorAll('details').forEach((el,i)=>{if(i<details.length)el.open=details[i];});
 let target=identity&&(identity.id?document.getElementById(identity.id):
  Array.from(document.querySelectorAll('input[data-task],button[data-coach-action],button[data-ring]')).find(el=>
   identity.task?el.dataset.task===identity.task:identity.action?el.dataset.coachAction===identity.action:identity.ring&&el.dataset.ring===identity.ring));
 if(!target&&identity?.inCoach)target=document.querySelector('.coach-next');
 if(!target&&identity?.task)target=document.querySelector('#priorityList input[data-task]')||document.getElementById('missionTitle');
 if(target){if(!target.matches?.('input,button,a,textarea,select'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
 window.scrollTo(position);
}
document.addEventListener('change',e=>{if(e.target.dataset.task){
 state.checks[e.target.dataset.task]=e.target.checked;save();preserveInteraction(render);
}});
document.getElementById('tabs').addEventListener('click',e=>{let b=e.target.closest('button[data-tab]');if(!b)return;document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('active',x===b));['hoy','semana','proyectos','vida','revision','mas'].forEach(id=>document.getElementById(id).classList.toggle('hidden',id!==b.dataset.tab));const mainTab=['semana','revision'].includes(b.dataset.tab)?'mas':b.dataset.tab;document.querySelectorAll('[data-side-nav]').forEach(x=>{const active=x.dataset.sideNav===mainTab;x.classList.toggle('active',active);if(active)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current')});window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});document.getElementById('dailyNote').value=state.note||'';document.getElementById('dailyNote').addEventListener('input',e=>{state.note=e.target.value;save()});function report(){let completed=all.flatMap(p=>p.tasks.map((t,i)=>({name:p.name,title:t[0],done:!!state.checks[p.id+'-'+i]}))).filter(t=>t.done);return `REPORTE DE MI TABLERO\nFecha: ${new Date().toLocaleDateString('es-MX')}\nCompletadas (${completed.length}):\n${completed.map(x=>'- '+x.name+': '+x.title).join('\n')||'Ninguna confirmada'}\n\nNOTAS:\n${state.note||'Sin notas'}\n\nAyúdame a replanear mis 3 prioridades y mis hábitos. No asumas tareas nuevas como terminadas.${dailyReport()}`}document.getElementById('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(report());document.getElementById('copyStatus').textContent='Reporte copiado. Pégalo en ChatGPT.'}catch(e){let a=document.createElement('textarea');a.value=report();document.body.append(a);a.select();document.execCommand('copy');a.remove();document.getElementById('copyStatus').textContent='Reporte seleccionado/copiadο; si falla, usa Exportar.'}});document.getElementById('export').addEventListener('click',()=>{let blob=new Blob([JSON.stringify({date:new Date().toISOString(),...state},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='respaldo-tablero.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});document.getElementById('reset').addEventListener('click',()=>{if(confirm('¿Descargar respaldo y después borrar registros locales?')){document.getElementById('export').click();Object.keys(state.checks||{}).forEach(k=>delete state.checks[k]);if(state.integratedDenbouProgress)Object.keys(state.integratedDenbouProgress).forEach(k=>delete state.integratedDenbouProgress[k]);if(state.daily)Object.keys(state.daily).forEach(k=>delete state.daily[k]);state.note='';save();document.getElementById('dailyNote').value='';render();renderProjects();}});document.getElementById('unknowns').innerHTML=['Alcance inicial de Callejero (41–42)','Detalles restantes de Slider Bros (62–70)','Sector prioritario de la agencia (72)','Rutina y método de estudio adicional (133–140)'].map(x=>`<div class="checkline"><span class="pill">Pendiente</span>${x}</div>`).join('');const now=new Date();document.getElementById('todayDate').textContent=now.toLocaleDateString('es-MX',{day:'numeric',month:'short',year:'numeric'});const monday=new Date(now);monday.setDate(now.getDate()-((now.getDay()+6)%7));document.getElementById('weekDays').innerHTML=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map((n,i)=>{let d=new Date(monday);d.setDate(monday.getDate()+i);return `<div class="day" style="${d.toDateString()===now.toDateString()?'border-color:#C4F54C;background:#202619':''}">${n}<strong>${d.getDate()}</strong><span class="muted">${d.toLocaleDateString('es-MX',{month:'short'})}</span></div>`}).join('');render();

document.addEventListener('click',function(event){
 const b=event.target.closest('[data-side-nav]');if(!b)return;
 const tab=document.querySelector('#tabs button[data-tab="'+b.dataset.sideNav+'"]');
 if(!tab)return;tab.click();
 /* La pestaña central sincroniza el estado de navegación de escritorio y móvil. */
});

/* ROADMAP: recomendaciones locales, sin acceso automático a las conversaciones ni al calendario. */
function todayLocalKey(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function weekMondayKey(){const d=new Date();const weekday=(d.getDay()+6)%7;d.setDate(d.getDate()-weekday);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function runWeeklyId(){return 'running-week-'+weekMondayKey()}
function todayCheckin(){if(!state.daily||typeof state.daily!=='object')state.daily={};const key=todayLocalKey();if(!state.daily[key])state.daily[key]={};return state.daily[key]}
function plainCare(title,sub){return '<div class="plan-plain"><span class="plan-symbol">·</span><span><b>'+title+'</b><small>'+sub+'</small></span></div>'}

function renderDailyPlan(){
 const key=todayLocalKey(), work=priorityQueue.filter(x=>!state.checks[x[0]]).slice(0,3);
 const projectEl=document.getElementById('priorityList'),careEl=document.getElementById('careList');
 if(!projectEl||!careEl)return;
 const minute=coachMinutes(),nightPhase=minute<360||minute>=21*60;
 const daily=todayCheckin();
 const departure=coachParseTime(daily.coachDeparture,15*60+30);
 const occupied=minute>=departure&&daily.coachShift!==false;
 const showWork=!nightPhase&&!occupied;
 projectEl.innerHTML=!showWork?
   plainCare(nightPhase?'La programación puede esperar a mañana':'Atiende tus compromisos primero',
     nightPhase?'No hace falta revisar pendientes antes de dormir.':'El trabajo de programación sigue disponible en Proyectos.'):
   work.length?taskHTML(work[0][0],work[0][1],work[0][2])+
   (work.length>1?'<details class="more-priorities"><summary>Otras '+(work.length-1)+' prioridades</summary>'+work.slice(1).map(x=>taskHTML(x[0],x[1],x[2])).join('')+'</details>':''):
   plainCare('Momento de revisar','Ya cumpliste el foco. Puedes revisar el siguiente hito en Proyectos.');
 document.getElementById('workCount').textContent=!showWork?(nightPhase?'Mañana':'En pausa'):work.length?'1 principal':'Sin pendientes';
 const hour=coachMinutes(),night=hour<360||hour>=21*60;
 const care=night?
   [['read','Leer 15–30 minutos','Una forma tranquila de desconectar.'],
    ['rest','Prepararte para dormir','Bajar pantallas y buscar descanso, sin exigirte perfección.']]:
   hour>=12*60?
   [['food','Comer o resolver tu comida','No dejar la alimentación para lo último.'],
    ['move','Moverte al menos 30 minutos','Si aún no lo hiciste, ajusta a lo que sea viable.']]:
   [['teeth','Lavarte los dientes y tomar agua','Un primer paso sencillo.'],
    ['breakfast','Desayunar','Comer antes de trabajar.'],
    ['move','Hacer 30 minutos de ejercicio','O caminar, según cómo te encuentres.']];
 const open=care.filter(([id])=>!state.checks['daily-'+key+'-'+id]);
 careEl.innerHTML=open.length?taskHTML('daily-'+key+'-'+open[0][0],open[0][1],open[0][2])+
   (open.length>1?'<details class="more-priorities"><summary>Otros cuidados ('+(open.length-1)+')</summary>'+open.slice(1).map(([id,title,sub])=>taskHTML('daily-'+key+'-'+id,title,sub)).join('')+'</details>':''):
   plainCare('Lo esencial está cubierto','Puedes continuar con calma.');
 document.getElementById('dayHeadline').textContent='Un día a la vez.';
 document.getElementById('dayReason').textContent='ROADMAP usa la hora del dispositivo para sugerir qué hacer ahora.';
 renderDayCoach();
}
function dailyReport(){return '\\n\\nVIDA PERSONAL: desayuno, alimentos/despensa, movimiento diario, lectura de 15 minutos. Meta semanal: correr una vez. Ajustar tiempos de despertar en nuestra conversación.';}



/* ROADMAP 2026 — capas de seguimiento, sin alterar los IDs ni el almacenamiento anterior. */
(function () {
  "use strict";
  if (typeof projects === "undefined" || typeof state === "undefined" || typeof taskHTML !== "function") return;

  const phase = (id, name, weight, legacy, extra, reference) => ({id, name, weight, legacy, extra, reference});
  const roadmap = {
    backstage: {
      priority:"Prioridad 1", mode:"Activo", next:"Conservar las correcciones, revisar compatibilidad con main y validar el despliegue antes del rediseño.",
      blocker:"Correcciones probadas en rama aislada; integración y comprobaciones reales pendientes.",
      reference:57, refDate:"06/11/2026", allocation:50,
      phases:[
        phase("arquitectura","Arquitectura y seguridad",15,[11,12],[["rls-real","Probar RLS y acceso entre organizaciones con cuentas autorizadas"],["auth-real","Verificar autenticación y permisos en entorno seguro"]],80),
        phase("operaciones","Eventos y operaciones",15,[0,1,2,3,4,10],[["recorridos","Validar recorridos de eventos, recurrencias, tareas y equipo con servicios de prueba"]],80),
        phase("finanzas","Finanzas",15,[5,6,7,8,9],[["fin-merge","Integrar correcciones de interpretación y contexto financiero"],["fin-backend","Comparar cifras, permisos y filtros con backend de prueba"]],85),
        phase("calidad","Auditoría y calidad",15,[13,14],[["diff-final","Revisar diff de correcciones y compatibilidad con main"],["guardar-rama","Respaldar y conservar rama de correcciones"],["safari","Probar Safari/iPhone físico, teclado, zoom y formularios"],["regresion","Ejecutar regresión final después de integrar"]],90),
        phase("diseno","Rediseño UX/UI",15,[],[["tres-conceptos","Crear tres direcciones estéticas realmente diferentes"],["prototipos","Preparar prototipos de Home, Eventos y Finanzas para móvil y escritorio"],["aprobar-diseno","Elegir y aprobar una propuesta visual"],["implementar-diseno","Implementar estética aprobada sin perder funcionalidad"],["qa-visual","Validar coherencia y accesibilidad en móvil y escritorio"]],20),
        phase("ia","Asistente de IA / Groq",10,[],[["groq-actual","Verificar funcionamiento y permisos de la integración actual"],["acciones-seguras","Implementar herramientas autorizadas para leer y registrar operaciones"],["aclaraciones","Confirmar intenciones, fechas y eventos ambiguos"],["reuniones","Integrar reuniones, acuerdos, responsables y briefings"],["ia-test","Probar acciones y aislamiento de datos sin tocar producción"]],25),
        phase("whatsapp","WhatsApp, voz y automatizaciones",10,[],[["meta-test","Conectar WhatsApp Cloud API con número de prueba"],["voz","Transcribir audio con Groq Whisper"],["webhook","Validar webhook y registro autorizado en Supabase"],["confirmacion","Preparar confirmaciones y controles contra duplicados"],["recordatorios","Construir recordatorios y seguimiento autorizado"]],0),
        phase("entrega","Publicación y entrega",5,[15],[["merge","Integrar rama aprobada sin sobrescribir cambios recientes"],["publicar","Desplegar versión corregida y comprobarla"],["denise","Realizar prueba guiada en el teléfono de Denise"]],25)
      ]
    },
    torre: {
      priority:"Prioridad 2",mode:"Activo",next:"Cerrar una V1 de órdenes y seguimiento utilizable desde Android.",
      blocker:"Faltan verificación real del flujo Android, controles de acceso y demostración.",
      allocation:30,phases:[
        phase("captacion","Presencia digital y captación",15,[2,3],[["tarjeta","Validar landing, tarjeta digital y QR"],["reviews","Conectar reseñas y acceso WhatsApp"]]),
        phase("registros","Clientes y motos",15,[0,1],[["historial","Diseñar historial de motocicletas y servicios con permisos"]]),
        phase("ordenes","Órdenes de servicio",20,[4,9],[["flujo","Validar diagnóstico, presupuesto, aprobación, reparación y entrega"],["estimado","Registrar fecha estimada sin inventarla"]]),
        phase("seguimiento","Seguimiento privado",20,[5,6,10],[["link-privado","Probar enlace seguro por orden y acceso del cliente"]]),
        phase("agenda","Agenda y WhatsApp",15,[],[["disponibilidad","Definir horarios, capacidad y prevención de choques"],["modalidad","Elegir agente que responde o agente que solo registra acuerdos"],["reservas","Probar solicitud, confirmación y registro seguro en Supabase"]]),
        phase("seguridad","Seguridad y QA Android",10,[7,8,11],[["aislamiento","Probar que un cliente no pueda acceder a órdenes ajenas"]]),
        phase("impresion","Impresión y entrega",5,[12,13],[["compatibilidad","Comprobar impresora térmica y Android antes de comprar"]])
      ]
    },
    callejero: {
      priority:"Prioridad alta · con Denbou",mode:"Activo",next:"Definir el piloto de registros atribuibles por RP y la conexión con Denbou.",
      blocker:"No hay verificación de ventas, comisiones ni seguimiento automático como funciones entregadas.",
      allocation:20,phases:[
        phase("alcance","Alcance y consentimiento",15,[0],[["consent","Definir finalidad y consentimiento de datos por evento y organizador"]]),
        phase("landing","Landing y registros",20,[1],[["landing-movil","Validar landing móvil y formulario real"],["preferencias","Capturar estancia, visitante/local y preferencias con propósito claro"]]),
        phase("rps","Promotores y QR",25,[2,3],[["qr-piloto","Probar QR identificable para cada RP"],["permisos","Comprobar acceso solo a registros propios"]]),
        phase("operacion","Operación y asistencia",15,[4,5],[["registro","Verificar check-in y conteo sin interferir con venta presencial"]]),
        phase("analitica","Análisis",10,[6,7],[["reporte-rp","Mostrar atribución por RP sin inventar resultados de ventas"]]),
        phase("denbou","Integración con Denbou",15,[8],[["vinculacion","Relacionar eventos y registros según permisos y titularidad"]])
      ]
    },
    sommo: {
      priority:"Trabajo y formación",mode:"Seguimiento",next:"Mantener el estudio del menú y la planificación de SOMMO Academy por separado.",
      blocker:"Las evaluaciones reales de Academy necesitan validación independiente.",
      phases:[
        phase("empleo","SOMMO · estudio y servicio",55,[0,1,2,3,4,5],[["servicio","Practicar escenarios reales de atención y servicio"]]),
        phase("academy","SOMMO Academy · evaluaciones",30,[],[["banco","Depurar banco de aproximadamente 200 preguntas"],["niveles","Validar tres niveles, intentos y límite de tiempo"],["ranking","Probar calificaciones, ranking y exportación"]]),
        phase("checador","Checador y administración",15,[],[["qr-seguro","Verificar flujo QR sin suplantaciones"],["admin","Probar panel administrativo y permisos"]])
      ]
    },
    agencia: {
      priority:"Estrategia · después de pilotos",mode:"En espera",next:"Priorizar pruebas reales de Denbou y Torre Fuerte antes de vender ecosistemas.",
      blocker:"No incluir pilotos no terminados como casos de éxito.",
      phases:[
        phase("oferta","Oferta y posicionamiento",25,[0,1,6],[["paquetes","Definir landing, sistema operativo y agente como niveles separados"]]),
        phase("pilotos","Pilotos y portafolio",30,[3,4],[["resultados","Documentar resultados verificables de cada piloto"]]),
        phase("seguridad","Modelo y seguridad",20,[2,5],[["aislamiento","Diseñar aislamiento de datos y permisos por cliente"]]),
        phase("inteligencia","Dirección creativa e inteligencia comercial",15,[],[["entrevista","Diseñar entrevista adaptativa para crear perfil de marca"],["campanas","Relacionar campañas, cupones, objetivos y métricas"]]),
        phase("plataforma","Componentes y SaaS",10,[],[["reuso","Extraer componentes reutilizables solo tras validar pilotos"]])
      ]
    },
    slider: {
      priority:"Secundario",mode:"En espera",next:"Reactivar únicamente después de las prioridades actuales.",
      blocker:"Las alternativas a Metricool deben demostrar funcionamiento real.",
      phases:[
        phase("organizacion","Calendario, notas y Gantt",45,[0,2,3],[["campanas","Vista mensual con preparación de campañas con anticipación"]]),
        phase("herramientas","Herramientas de contenido",30,[1],[["metricool","Comparar capacidad real de publicación y métricas frente a Metricool"]]),
        phase("creatividad","Dirección creativa",15,[],[["personajes","Organizar campañas y piezas con Pelusa y Borges"]]),
        phase("academy","Operación y capacitación",10,[],[["manual","Planear procesos y formación operativa a distancia"]])
      ]
    },
    brujula: {
      priority:"Proyecto personal independiente",mode:"En espera",next:"Mantener Brújula separado de ROADMAP y de las prioridades actuales.",
      blocker:"No mezclar la memoria digital futura con el gestor cotidiano.",
      phases:[
        phase("vision","Visión y privacidad",30,[0,3],[["limites","Definir datos sensibles excluidos y consentimiento"]]),
        phase("arquitectura","Memoria portable y permisos",30,[1,2],[["modelos","Separar datos personales, agentes de IA y permisos por proveedor"]]),
        phase("experiencia","Reflexión y avatar",25,[4,5],[["sinapsis","Explorar vista de evolución, recuerdos y conexiones sin predicciones absolutas"]]),
        phase("piloto","Rigor y piloto",15,[6,7],[["evidencias","Distinguir observaciones comprobadas de hipótesis de IA"]])
      ]
    }
  };


  // Evidencias de decisiones y resultados documentados en conversación.
  // Tener el alcance definido NO significa haber implementado el sistema.
  const documentedEvidence={"backstage":[["arquitectura","stack","Existe Denbou con Supabase, organizaciones y acceso privado.","Base existente; seguridad real pendiente"],["operaciones","events","Codex probó eventos, recurrencias, tareas y finanzas en demo.","Pruebas locales reportadas"],["finanzas","fix","Codex reportó correcciones financieras con pruebas de regresión.","En rama aislada; no está publicado"],["calidad","tests","Codex reportó 197 pruebas aprobadas y 192 verificaciones de navegador.","Informe de auditoría, datos ficticios"],["calidad","a11y","Codex reportó 0 infracciones axe en 30 estados examinados.","Prueba automática, no certificación"],["diseno","home","Ya existe una portada simplificada y anillos de progreso.","Versión existente; rediseño pendiente"],["ia","assistant","Existe asistente de lectura y clasificación financiera local.","Escritura por IA aún pendiente"]],"torre":[["captacion","scope","Se definió landing con QR, WhatsApp y reseñas.","Alcance acordado; publicación por verificar"],["registros","model","Se definieron Clientes, Motos, Servicios y Seguimientos.","Modelo conceptual"],["ordenes","flow","Se definió el flujo de orden de servicio y sus estados.","Diseño, no prueba de funcionamiento"],["seguimiento","private","Se aprobó enlace privado por orden para consultar avances.","Función planeada"],["agenda","booking","Se definió flujo de citas por WhatsApp, verificando disponibilidad.","Flujo planeado, no conectado"],["impresion","choices","Se valoraron impresora térmica Bluetooth y opción Android.","Evaluación, no compra"]],"callejero":[["alcance","ownership","Se aclaró que Callejero pertenece a Denise y su socia.","Decisión confirmada"],["landing","fields","Se definieron datos de registro y preferencias de asistentes.","Requisitos de formulario"],["rps","qr","Se acordó atribuir registros con QR individual por RP.","Alcance definido"],["operacion","inperson","Se acordó complementar la operación presencial, no sustituirla.","Decisión operativa"],["analitica","reports","Se propusieron indicadores por RP, fecha, estancia y gustos.","Análisis definido, no producción"],["denbou","separate","Se definió distinguir la landing Callejero del sistema privado Denbou.","Arquitectura acordada"]],"sommo":[["academy","bank","Se definió banco de aproximadamente 200 preguntas.","Alcance de Academy"],["academy","levels","Se acordaron tres niveles de evaluación y ranking.","Requisitos aprobados"],["checador","qr","Se planteó checador por QR y exportación.","Alcance, sin prueba real"]],"agencia":[["oferta","tiers","Se acordó ofrecer páginas, ecosistemas y agentes de IA.","Modelo comercial"],["oferta","marketing","Se limitó la oferta de marketing complementario.","Límites definidos"],["pilotos","clients","Se priorizaron Denbou, Callejero y Torre Fuerte como pilotos.","Plan de pilotos"],["seguridad","privacy","Se definió aislamiento de clientes y datos por empresa.","Principio de seguridad"],["inteligencia","creative","Se propuso entrevista adaptativa y cerebro de marca.","Diseño conceptual"],["plataforma","saas","Se acordó evaluar SaaS tras validar pilotos.","Objetivo estratégico"]],"slider":[["organizacion","gantt","Se solicitó calendario y Gantt con planeación anticipada.","Requisito"],["herramientas","metricool","Se acordó verificar funciones reales antes de reemplazar Metricool.","Criterio de aceptación"],["creatividad","pelusa","Se definió línea creativa de Pelusa y Borges.","Brief aprobado"],["academy","training","Se planteó una futura academia operativa.","Idea, no implementada"]],"brujula":[["vision","identity","Se definió Brújula como segundo cerebro distinto de ROADMAP.","Visión de producto"],["vision","privacy","Se definió control y portabilidad de recuerdos.","Política conceptual"],["arquitectura","provider","Se acordó separar memoria, proveedores de IA y permisos.","Arquitectura propuesta"],["experiencia","pixel","Se eligió avatar pixel art y reflexión gradual.","Dirección visual"],["piloto","rigor","Se acordó separar observaciones comprobadas de hipótesis.","Criterio de rigor"]]};
  const evidenceId=(project,stage,key)=>"evidence-"+project+"-"+stage+"-"+key;
  // Evidencia histórica preservada en state.checks, pero nunca autocertificada.
  const escapeText = value => String(value == null ? "" : value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const percent = (done,total) => total ? Math.round(done / total * 100) : 0;

  function getItems(project,step) {
    const original=(step.legacy||[]).filter(i=>project.tasks[i]).map(i=>({
      id:project.id+"-"+i,title:project.tasks[i][0],context:project.tasks[i][1],weight:1,kind:"pending"
    }));
    const newTasks=(step.extra||[]).map(item=>({
      id:"milestone-"+project.id+"-"+step.id+"-"+item[0],title:item[1],
      context:"Pendiente · verificar entrega",weight:1,kind:"pending"
    }));
    // Evidencia documental ≠ tarea completada.
    return original.concat(newTasks);
  }
  function stageInfo(project,step) {
    const items=getItems(project,step);
    const completed=items.filter(t=>!!state.checks[t.id]).length;
    let progress=0;
    if(project.id==="backstage" && step.reference!=null){
      const remaining=items.filter(t=>t.kind!=="documented");
      const newlyDone=remaining.filter(t=>!!state.checks[t.id]).length;
      const fraction=remaining.length?newlyDone/remaining.length:0;
      progress=Math.round(step.reference+(100-step.reference)*fraction);
    }else{
      const available=items.reduce((n,t)=>n+t.weight,0);
      const done=items.filter(t=>!!state.checks[t.id]).reduce((n,t)=>n+t.weight,0);
      progress=available?Math.round(done/available*100):0;
    }
    return {items,completed,progress};
  }
  function projectInfo(project) {
    const config=roadmap[project.id],steps=config?config.phases:[];
    const sum=steps.reduce((n,s)=>n+s.weight,0)||1;
    const value=Math.round(steps.reduce((n,s)=>n+s.weight*stageInfo(project,s).progress,0)/sum);
    const items=steps.flatMap(s=>getItems(project,s));
    return {progress:value,completed:items.filter(t=>!!state.checks[t.id]).length,total:items.length};
  }

  const projectHost=document.getElementById("projects");
  const lifeHost=document.getElementById("lifeTasks");
  const filter=document.getElementById("filter");
  if (!projectHost || !lifeHost || !filter) return;

  let portfolioHost=document.getElementById("portfolioV2");
  if(!portfolioHost) {
    portfolioHost=document.createElement("section");
    portfolioHost.id="portfolioV2";
    portfolioHost.className="rv2-portfolio";
    projectHost.parentNode.insertBefore(portfolioHost,projectHost);
  }
  let indicatorsHost=document.getElementById("lifeIndicatorsV2");
  if(!indicatorsHost){
    indicatorsHost=document.createElement("section");
    indicatorsHost.id="lifeIndicatorsV2";
    indicatorsHost.className="rv2-kpis";
    const home=document.getElementById("hoy");
    const overview=home&&home.querySelector(".daily-overview");
    if(overview)overview.insertAdjacentElement("afterend",indicatorsHost);
    else lifeHost.parentNode.insertBefore(indicatorsHost,lifeHost);
  }


  // ROADMAP_V4_INTEGRATED · 10 etapas y 56 tareas del tablero Callejero + Denbou.
  // Estimaciones locales, separadas de los checklists técnicos existentes.
  const integratedStages=[
    ["core","Denbou · Eventos y operaciones",72,17,"La estructura operativa privada de Denise.",[["Crear, abrir y editar eventos",85],["Eventos recurrentes y excepciones",85],["Tareas y responsables por evento",75],["RPs y proveedores vinculados",65],["Validación de operaciones reales",25]]],
    ["finance","Finanzas y proveedores",58,14,"Dinero recibido, pendiente, gastos y compromisos, sin mezclar estados contables.",[["Registro de ingresos y gastos",85],["Separar por cobrar y por pagar",75],["Exportación y filtros financieros",75],["Correcciones de lógica contable",45],["Pagos y seguimiento de proveedores",50],["Conciliación y pruebas reales",15]]],
    ["ux","Diseño y experiencia de Denbou",70,10,"Minimalismo tipo Apple Fitness: información clara, detalles progresivos y pocas decisiones.",[["Identidad visual Denbou 2.0",85],["Inicio tranquilo con tres prioridades",90],["Gráficas y resúmenes comprensibles",80],["Consistencia móvil y escritorio",65],["Prueba guiada con Denise",15]]],
    ["calendar","Agenda, reuniones y logística",25,11,"La agenda operativa de Denise, especialmente reuniones, acuerdos y vencimientos.",[["Agenda de eventos y pendientes",65],["Registro y programación de reuniones",20],["Responsables, hitos y acuerdos",15],["Detección de horarios superpuestos",0],["Recordatorios oportunos",0],["Briefing diario inteligente",0]]],
    ["landing","Callejero · Landing y Guest List",30,12,"Puerta de entrada para turistas y asistentes, con identidad de Callejero.",[["Identidad visual pública",85],["Landing responsive de Callejero",75],["Formulario conectado a registros reales",0],["Consentimiento y preferencias de asistentes",20],["Integración con base de datos",0],["Pruebas completas de registro",0]]],
    ["rp","Promotores, QRs y CRM de asistentes",8,12,"Atribución por RP sin reemplazar la venta presencial.",[["Modelo de RPs y sus registros",35],["QR único por RP",5],["Permisos para consultar leads propios",0],["Check-in y validación de asistencia",0],["CRM e historial consentido",0],["Comisiones y ventas verificadas",0]]],
    ["integrate","Integración Callejero ↔ Denbou",0,8,"Captación pública y operaciones privadas conectadas según consentimiento y propiedad de datos.",[["Vincular registros con eventos",0],["Relacionar leads con su RP",0],["Mostrar resultados por evento",0],["Segmentar intereses y estadía",0],["Probar accesos por organizador",0]]],
    ["ai","Asistente de inteligencia artificial",30,7,"IA para consultar, preparar acciones y disminuir carga mental sin inventar datos.",[["Interfaz de asistente privado",60],["Integración técnica de Groq",55],["Consultas seguras a datos operativos",35],["Preparación de reuniones y acuerdos",0],["Acciones escritas con autorización",0],["Memoria documental RAG",0]]],
    ["whatsapp","WhatsApp, voz y automatizaciones",0,6,"WhatsApp como interfaz futura y Denbou como centro de información.",[["WhatsApp Cloud API con número de prueba",0],["Webhook y verificación de mensajes",0],["Transcripción de notas de voz",0],["Crear tareas y citas desde mensajes autorizados",0],["Recordatorios y resumen diario",0],["Automatizaciones con n8n",0]]],
    ["security","Seguridad, pruebas y entrega",45,3,"Proteger datos y comprobar uso completo desde iPhone.",[["Autenticación y estructura de permisos",65],["Pruebas automáticas y compilación",70],["Regresión de operaciones y finanzas",50],["Pruebas en iPhone físico",10],["Piloto real con Denise y RPs",0]]]
  ].map(([id,name,p,w,desc,tasks])=>({id,name,p,w,desc,tasks}));
  if(!state.integratedDenbouProgress||typeof state.integratedDenbouProgress!=="object"||Array.isArray(state.integratedDenbouProgress))state.integratedDenbouProgress={};
  const integratedEdits=state.integratedDenbouProgress;
  const clampIntegrated=n=>Math.max(0,Math.min(100,Number.isFinite(+n)?Math.round(+n):0));
  const taskIntegrated=(stage,i)=>clampIntegrated(Object.prototype.hasOwnProperty.call(integratedEdits,stage.id+":"+i)?integratedEdits[stage.id+":"+i]:stage.tasks[i][1]);
  function integratedStageProgress(stage){
    const base=stage.tasks.reduce((n,t)=>n+t[1],0)/stage.tasks.length;
    const current=stage.tasks.reduce((n,t,i)=>n+taskIntegrated(stage,i),0)/stage.tasks.length;
    if(current<=base)return clampIntegrated(base?stage.p*current/base:current);
    return clampIntegrated(base>=100?100:stage.p+(100-stage.p)*(current-base)/(100-base));
  }
  const integratedOverall=()=>Math.round(integratedStages.reduce((n,s)=>n+s.w*integratedStageProgress(s),0)/100);
  function renderOldChecklist(p){
    const cfg=roadmap[p.id],info=projectInfo(p);
    return '<details class="rv3-old-project"><summary>'+escapeText(p.name)+' · '+info.progress+'% de checklist técnico</summary>'+
      '<div class="rv2-stage-grid">'+cfg.phases.map(step=>{
        const stat=stageInfo(p,step);
        return '<details class="rv2-stage"><summary><span><b>'+escapeText(step.name)+'</b><small>'+
          stat.completed+'/'+stat.items.length+' marcados</small></span><strong>'+stat.progress+'%</strong></summary>'+
          '<div class="rv2-stage-tasks">'+stat.items.map(t=>taskHTML(t.id,t.title,t.context)).join("")+'</div></details>';
      }).join("")+'</div></details>';
  }
  function renderIntegratedProject(term){
    const title="Callejero + Denbou",text=(title+" "+integratedStages.map(s=>s.name+" "+s.desc+" "+s.tasks.map(t=>t[0]).join(" ")).join(" ")).toLocaleLowerCase("es-MX");
    const old=projects.filter(p=>p.id==="backstage"||p.id==="callejero");
    const oldText=old.map(p=>p.name+" "+roadmap[p.id].phases.map(step=>step.name+" "+getItems(p,step).map(t=>t.title).join(" ")).join(" ")).join(" ").toLocaleLowerCase("es-MX");
    if(term&&!text.includes(term)&&!oldText.includes(term))return "";
    const broad=!term||title.toLocaleLowerCase("es-MX").includes(term);
    const matches=integratedStages.filter(s=>broad||(s.name+" "+s.desc+" "+s.tasks.map(t=>t[0]).join(" ")).toLocaleLowerCase("es-MX").includes(term));
    const shown=(matches.length?matches:integratedStages);
    const stageNodes=shown.map(s=>{
      const value=integratedStageProgress(s);
      const candidates=s.tasks.map((t,i)=>({t,i})).filter(({t})=>broad||(s.name+" "+s.desc+" "+t[0]).toLocaleLowerCase("es-MX").includes(term));
      const shown=candidates.length?candidates:s.tasks.map((t,i)=>({t,i}));
      const tasks=shown.map(({t,i})=>{
        const v=taskIntegrated(s,i),id="rgi-"+s.id+"-"+i;
        return '<div class="rv3-roadmap-task"><div class="rv3-roadmap-task-row"><label for="'+id+'">'+escapeText(t[0])+'</label>'+
          '<strong data-merged-task-pct>'+v+'%</strong></div><input id="'+id+'" type="range" min="0" max="100" step="5" value="'+v+
          '" data-merged-slider="'+s.id+'" data-merged-index="'+i+'" aria-label="'+escapeText("Avance estimado de "+t[0])+
          '" style="--pct:'+v+'%"><div class="rv3-roadmap-range-caption"><span>Pendiente</span><span>Completo</span></div></div>';
      }).join("");
      return '<details class="rv3-roadmap-stage" '+(term||s.id==="calendar"?'open':'')+'>'+
        '<summary><span class="rv3-roadmap-ord">'+String(integratedStages.indexOf(s)+1).padStart(2,"0")+'</span>'+
        '<span class="rv3-roadmap-stage-name"><b>'+escapeText(s.name)+'</b><small>Peso '+s.w+'% del ecosistema</small></span>'+
        '<strong data-merged-stage-pct="'+s.id+'">'+value+'%</strong><span class="rv3-roadmap-arrow" aria-hidden="true"><svg class="roadmap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></summary>'+
        '<div class="rv3-roadmap-stage-body"><p>'+escapeText(s.desc)+'</p>'+tasks+'</div></details>';
    });
    const groups=[
      {id:"denbou",name:"Denbou operativo",members:["core","finance","ux","security"]},
      {id:"agenda",name:"Agenda y logística",members:["calendar"]},
      {id:"callejero",name:"Callejero público",members:["landing","rp"]},
      {id:"integration",name:"Integración y análisis",members:["integrate"]},
      {id:"automation",name:"IA y automatizaciones",members:["ai","whatsapp"]}
    ];
    const stages=groups.map(g=>{
      const members=g.members.map(id=>integratedStages.find(s=>s.id===id)).filter(s=>s&&shown.includes(s));
      if(!members.length)return "";
      const scope=g.members.map(id=>integratedStages.find(s=>s.id===id)).filter(Boolean);
      const weight=scope.reduce((n,s)=>n+s.w,0);
      const value=Math.round(scope.reduce((n,s)=>n+s.w*integratedStageProgress(s),0)/weight);
      return '<details class="rv3-workstream" '+(term?'open':'')+'><summary><span>'+escapeText(g.name)+'</span><strong data-stage-members="'+g.members.join(',')+'">'+value+'%</strong></summary>'+
        '<div class="rv3-workstream-detail">'+members.map(s=>stageNodes[shown.indexOf(s)]).join("")+'</div></details>';
    }).join("");
    const p=integratedOverall();
    return '<article id="project-backstage" class="rv2-project rv3-roadmap-integrated" data-project-id="backstage" tabindex="-1" data-merged-card>'+
      '<div class="rv2-project-head"><div><div class="eyebrow">Proyecto prioritario</div>'+
      '<h1>Callejero + Denbou</h1><p>Captación y operaciones privadas.</p></div>'+
      '<span class="rv2-percent"><strong data-merged-total>'+p+'%</strong><small>Estimado</small></span></div>'+
      '<div class="project-current"><span><small>Etapa por avanzar</small><b>'+escapeText((integratedStages.find(s=>integratedStageProgress(s)<100)||{name:'Etapas al 100% estimado'}).name)+'</b></span><span><small>Siguiente acción</small><b>'+escapeText((priorityQueue.find(x=>!state.checks[x[0]]&&x[0].includes('backstage'))||['','Revisar entregables y validar producción'])[1])+'</b></span></div>'+
      '<p class="rv3-roadmap-disclaimer">Estimaciones manuales del 7 nov 2026; no certifican funcionamiento.</p>'+
      '<details class="rv3-roadmap-advanced"><summary>Respaldos y ajustes avanzados</summary><div class="rv3-roadmap-actions"><button class="btn alt" type="button" data-merged-export>Exportar JSON</button>'+
      '<button class="btn ghost" type="button" data-merged-import>Importar JSON</button>'+
      '<button class="btn ghost" type="button" data-merged-reset>Restablecer estimaciones</button>'+
      '<input type="file" accept=".json,application/json" data-merged-file hidden></div></details>'+
      '<p class="rv3-roadmap-feedback" data-merged-feedback role="status">Cambios guardados solo en este navegador.</p>'+
      '<details class="rv3-roadmap-list" open><summary>Áreas de trabajo (5)</summary>'+
      '<div class="rv3-roadmap-stage-grid">'+stages+'</div></details>'+
      '<details class="rv3-roadmap-old"><summary>Checklists técnicos anteriores (se conservan)</summary><p>Sus casillas y porcentajes siguen disponibles por separado.</p>'+
      old.map(renderOldChecklist).join("")+'</details></article>';
  }
  function refreshMerged(){
    const card=projectHost.querySelector("[data-merged-card]");
    if(card){
      const value=integratedOverall();
      card.querySelector("[data-merged-total]").textContent=value+"%";
      integratedStages.forEach(stage=>{
        const item=card.querySelector('[data-merged-stage-pct="'+stage.id+'"]');
        if(!item)return;
        const value=integratedStageProgress(stage);
        item.textContent=value+"%";

      });
    }
    projectHost.querySelectorAll('[data-stage-members]').forEach(el=>{
      const members=el.dataset.stageMembers.split(',').map(id=>integratedStages.find(s=>s.id===id)).filter(Boolean);
      const weight=members.reduce((sum,s)=>sum+s.w,0);
      el.textContent=Math.round(members.reduce((sum,s)=>sum+s.w*integratedStageProgress(s),0)/weight)+'%';
    });
    const portfolio=renderPortfolio();
    renderIndicators(portfolio);
  }
  function exportMerged(){
    const data={name:"Callejero + Denbou",date:new Date().toISOString(),estimatedOverall:integratedOverall(),
      note:"Estimaciones manuales; no certificación de implementación",
      stages:integratedStages.map(s=>({id:s.id,name:s.name,weight:s.w,progress:integratedStageProgress(s),
        tasks:s.tasks.map((t,i)=>({name:t[0],estimatedProgress:taskIntegrated(s,i)}))}))};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download="callejero-denbou-avance.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function importMerged(data){
    if(!data||!Array.isArray(data.stages))throw Error("Este archivo no contiene etapas válidas.");
    let count=0;
    const edits={};
    data.stages.forEach(item=>{
      const stage=integratedStages.find(s=>s.id===item.id);
      if(!stage||!Array.isArray(item.tasks))return;
      item.tasks.forEach((t,i)=>{
        if(!t||i>=stage.tasks.length||t.name!==stage.tasks[i][0]||!Number.isFinite(Number(t.estimatedProgress)))return;
        edits[stage.id+":"+i]=clampIntegrated(t.estimatedProgress);count++;
      });
    });
    if(!count)throw Error("El archivo no coincide con las tareas del proyecto.");
    Object.assign(integratedEdits,edits);if(!save())throw Error("No se pudo guardar; se conservó el estado anterior.");renderProjectsV2();
    const feedback=projectHost.querySelector("[data-merged-feedback]");
    if(feedback)feedback.textContent=count+" tareas importadas y guardadas en este navegador.";
  }
  projectHost.addEventListener("input",event=>{
    const input=event.target.closest("[data-merged-slider]");
    if(!input)return;
    const stage=integratedStages.find(s=>s.id===input.dataset.mergedSlider),i=Number(input.dataset.mergedIndex);
    if(!stage||!Number.isInteger(i)||i<0||i>=stage.tasks.length)return;
    const v=clampIntegrated(input.value);
    integratedEdits[stage.id+":"+i]=v;input.style.setProperty("--pct",v+"%");
    const tag=input.closest(".rv3-roadmap-task").querySelector("[data-merged-task-pct]");
    if(tag)tag.textContent=v+"%";
    if(!save()){input.value=taskIntegrated(stage,i);input.style.setProperty("--pct",input.value+"%");if(tag)tag.textContent=input.value+"%";}refreshMerged();
  });
  projectHost.addEventListener("click",event=>{
    if(event.target.closest("[data-merged-export]"))return exportMerged();
    if(event.target.closest("[data-merged-import]")){
      const input=projectHost.querySelector("[data-merged-file]");
      if(input)input.click();return;
    }
    if(event.target.closest("[data-merged-reset]")){
      if(!confirm("¿Restablecer solo las estimaciones integradas? No se borrarán notas ni checklists anteriores."))return;
      Object.keys(integratedEdits).forEach(key=>delete integratedEdits[key]);save();renderProjectsV2();
    }
  });
  projectHost.addEventListener("change",async event=>{
    const input=event.target.closest("[data-merged-file]");
    if(!input||!input.files||!input.files[0])return;
    try{
      if(input.files[0].size>250000)throw Error("Archivo demasiado grande.");
      importMerged(JSON.parse(await input.files[0].text()));
    }catch(e){
      const feedback=projectHost.querySelector("[data-merged-feedback]");
      if(feedback)feedback.textContent="No se pudo importar: "+(e.message||"JSON inválido");
    }finally{input.value="";}
  });


  let currentProjectId='';
  function showProject(id,moveFocus=true){
    currentProjectId=id||'';
    const directory=document.getElementById('projectDirectory');
    if(directory)directory.classList.toggle('hidden',!!currentProjectId);
    const heading=document.querySelector('.roadmap-project-heading');
    if(heading)heading.classList.toggle('hidden',!!currentProjectId);
    if(portfolioHost)portfolioHost.classList.toggle('hidden',!!currentProjectId);
    const back=document.getElementById('projectBack');
    if(back)back.classList.toggle('hidden',!currentProjectId);
    projectHost.querySelectorAll('[data-project-id]').forEach(el=>el.classList.toggle('hidden',el.dataset.projectId!==currentProjectId));
    if(moveFocus){
      const target=currentProjectId?document.getElementById('project-'+currentProjectId):document.querySelector('[data-open-project]');
      if(target)target.focus({preventScroll:true});
      window.scrollTo({top:0,behavior:'auto'});
    }
  }
  function renderDirectory(){
    const directory=document.getElementById('projectDirectory');if(!directory)return;
    const term=(filter.value||'').trim().toLocaleLowerCase('es-MX');
    const items=Array.from(projectHost.querySelectorAll('[data-project-id]'));
    directory.innerHTML=items.length?items.map(el=>{
      const id=el.dataset.projectId,p=projects.find(p=>p.id===id);
      const value=id==='backstage'?integratedOverall():projectInfo(p).progress;
      const name=id==='backstage'?'Callejero + Denbou':p.name;
      return '<button type="button" class="project-row" data-open-project="'+id+'"><span><strong>'+escapeText(name)+'</strong><small>'+(['backstage','torre'].includes(id)?'Prioritario':'En espera')+'</small></span><span class="project-row-progress">'+value+'%<small>estimado</small></span><svg class="roadmap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>';
    }).join(''):'<p role="status">No hay tareas o proyectos que coincidan con «'+escapeText(term)+'».</p>';
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-open-project]');
    if(button){const tab=document.querySelector('#tabs button[data-tab="proyectos"]');if(tab)tab.click();showProject(button.dataset.openProject);}
    if(event.target.closest('[data-project-back]'))showProject('');
  });
  const back=document.getElementById('projectBack');
  if(back)back.addEventListener('click',()=>showProject(''));
  function renderPortfolio(){
    const torre=projects.find(x=>x.id==='torre');
    const other=torre?projectInfo(torre).progress:0,combined=integratedOverall();
    const overall=Math.round(combined*.70+other*.30);
    portfolioHost.innerHTML='<div class="portfolio-summary"><span>Portafolio activo</span><strong data-portfolio-total>'+overall+'% estimado</strong></div><details><summary>Cómo se calcula</summary><p>Callejero + Denbou: '+combined+'% (peso 70%). Torre Fuerte: '+other+'% (peso 30%). Son estimaciones ponderadas, no pruebas de funcionamiento.</p></details>';
    renderDirectory();return overall;
  }
  function renderIndicators(){
    const today=todayLocalKey(),week=weekMondayKey();
    const health=[['daily-'+today+'-breakfast','Alimentación','Desayunar'],['daily-'+today+'-move','Movimiento','Caminar, correr o hacer ejercicio'],['daily-'+today+'-rest','Descanso','Dar espacio a la recuperación']];
    const connections=[['contact-week-'+week+'-papa','Hablar con papá','Esta semana'],['contact-week-'+week+'-mama','Hablar con mamá','Esta semana'],['contact-week-'+week+'-amigos','Conectar con una amistad','Esta semana']];
    indicatorsHost.innerHTML='<section class="life-section"><h2>Salud</h2>'+health.map(x=>taskHTML(...x)).join('')+'</section><section class="life-section"><h2>Vínculos</h2>'+connections.map(x=>taskHTML(...x)).join('')+'</section>';
  }

  let previousProjectTerm=null;
  function renderProjectsV2() {
    const expanded=Array.from(projectHost.querySelectorAll("details"),el=>el.open);
    const focusedTask=document.activeElement?.dataset?.task;
    const term=(filter.value||"").trim().toLocaleLowerCase("es-MX");
    const overall=renderPortfolio();
    renderIndicators(overall);
    const projectCards=projects.map(project=>{
      const cfg=roadmap[project.id];
      if(!cfg) return "";
      if(project.id==="callejero")return "";
      if(project.id==="backstage")return renderIntegratedProject(term);
      const info=projectInfo(project);
      const matching=cfg.phases.filter(step=>{
        const text=step.name+" "+getItems(project,step).map(x=>x.title+" "+x.context).join(" ");
        return !term||(project.name+" "+project.description+" "+text).toLocaleLowerCase("es-MX").includes(term);
      });
      if (!matching.length) return "";
      const stages=matching.map(step=>{
        const stat=stageInfo(project,step);
        const filtered=stat.items.filter(item=>!term||(project.name+" "+step.name+" "+item.title+" "+item.context).toLocaleLowerCase("es-MX").includes(term));
        const shown=filtered.length?filtered:stat.items;
        return '<details class="rv2-stage" '+(term?'open':'')+'><summary><span><b>'+escapeText(step.name)+'</b><small>Peso de etapa: '+step.weight+'% · '+stat.completed+'/'+stat.items.length+' marcados'+(step.reference==null?'':' · base estimada '+step.reference+'%')+'</small></span><strong>'+stat.progress+'%</strong></summary>'+'<div class="rv2-stage-tasks">'+shown.map(item=>taskHTML(item.id,item.title,item.context)).join("")+'</div></details>';
      }).join("");
      const snapshot=cfg.reference==null?'':'<div class="rv2-reference"><b>'+cfg.reference+'% estimado</b> · fotografía del alcance al '+escapeText(cfg.refDate)+'. Se actualizará al completar nuevas tareas; falta validar producción.</div>';
      return '<article id="project-'+project.id+'" data-project-id="'+project.id+'" tabindex="-1" class="project rv2-project"><div class="rv2-project-head"><div><div class="eyebrow">'+escapeText(cfg.priority)+' · '+escapeText(cfg.mode)+'</div><h1>'+escapeText(project.name)+'</h1><p>'+escapeText(project.description)+'</p></div><span class="rv2-percent"><strong data-project-total>'+info.progress+'%</strong><small>Estimado</small></span></div>'+'<div class="rv2-counter">'+info.completed+' de '+info.total+' entregables marcados</div>'+snapshot+'<div class="project-current"><span><small>Siguiente tarea</small><b>'+escapeText((cfg.phases.flatMap(step=>getItems(project,step)).find(item=>!state.checks[item.id])||{title:'Revisar los entregables completados'}).title)+'</b></span></div><div class="rv2-next"><strong>Próximo hito</strong><p>'+escapeText(cfg.next)+'</p><strong>Por resolver</strong><p>'+escapeText(cfg.blocker)+'</p></div><details class="rv2-stages" '+(term?'open':'')+'><summary>Ver etapas y entregables ('+cfg.phases.length+')</summary><div class="rv2-stage-grid">'+stages+'</div></details></article>';
    });
    projectHost.innerHTML=projectCards.join('');
    if(previousProjectTerm===term)projectHost.querySelectorAll('details').forEach((el,i)=>{if(i<expanded.length)el.open=expanded[i];});
    previousProjectTerm=term;
    renderDirectory();showProject(currentProjectId,false);
    if(focusedTask){const replacement=Array.from(projectHost.querySelectorAll('[data-task]')).find(el=>el.dataset.task===focusedTask);if(replacement)replacement.focus({preventScroll:true});}
  }

  // La página previa guarda casillas como id-índice. Nunca cambiamos ese formato.
  // Las nuevas usan IDs permanentes milestone-proyecto-etapa-entregable.
  // Reemplazar la función de presentación no borra checkboxes ni notas anteriores.
  renderProjects = renderProjectsV2;
  filter.addEventListener("input",()=>{currentProjectId="";renderProjectsV2();});

  // Próximos pasos alineados con la última auditoría y con prioridades actuales.
  if(typeof priorityQueue!=="undefined" && typeof renderDailyPlan==="function"){
    priorityQueue.splice(0,priorityQueue.length,
      ["milestone-backstage-entrega-denise","Callejero + Denbou · validar acceso con Denise","Probar inicio de sesión y flujo en iPhone"],
      ["milestone-callejero-rps-qr-piloto","Callejero + Denbou · probar QR de RP","Un registro consentido de principio a fin"],
      ["milestone-torre-ordenes-flujo","Torre Fuerte · completar orden en Android","Registrar moto, cambiar estado y compartir seguimiento"]
    );
    renderDailyPlan();
  }
  renderProjectsV2();
  const unknowns=document.getElementById("unknowns");
  if(unknowns)unknowns.innerHTML=[
    "Callejero + Denbou: integración técnica auditada y pruebas de backend real",
    "Callejero + Denbou: experiencia y pruebas con Safari físico",
    "WhatsApp y voz: diseño definido, conexión pendiente",
    "Torre Fuerte: órdenes, acceso privado y flujo Android por verificar",
    "Callejero + Denbou: atribución QR por RP y permisos por validar"
  ].map(s=>'<div class="checkline"><span class="pill">Pendiente</span>'+escapeText(s)+'</div>').join("");
})();


// ROADMAP_BACKUP_IMPORT_V3 · Restauración segura, sin cambiar referencias reactivas.
(function(){
  const trigger=document.getElementById('importBackup');
  const picker=document.getElementById('backupFile');
  const status=document.getElementById('backupStatus');
  if(!trigger||!picker||!status)return;
  trigger.addEventListener('click',()=>picker.click());
  picker.addEventListener('change',async()=>{
    const file=picker.files&&picker.files[0];
    if(!file)return;
    try{
      if(file.size>1000000)throw new Error('El respaldo supera 1 MB.');
      const data=JSON.parse(await file.text());
      if(!data||typeof data!=='object'||Array.isArray(data)||
         !data.checks||typeof data.checks!=='object'||Array.isArray(data.checks))
        throw new Error('El archivo no contiene un respaldo válido de ROADMAP.');
      const checkEntries=Object.entries(data.checks);
      if(checkEntries.length>10000||checkEntries.some(([id,v])=>id.length>200||typeof v!=='boolean'))
        throw new Error('Las casillas del archivo no son válidas.');
      const progress=data.integratedDenbouProgress??{};
      if(typeof progress!=='object'||Array.isArray(progress)||
        Object.entries(progress).some(([id,v])=>id.length>100||!Number.isFinite(+v)||Number(v)<0||Number(v)>100))
        throw new Error('El progreso del archivo no es válido.');
      const daily=data.daily??{};
      if(typeof daily!=='object'||Array.isArray(daily))
        throw new Error('El registro diario no es válido.');
      const note=typeof data.note==='string'?data.note:'';
      if(!confirm('¿Restaurar '+checkEntries.length+' marcas del respaldo? Se sustituirán las marcas, notas y estimaciones locales actuales.'))return;
      const replace=(target,source)=>{Object.keys(target).forEach(k=>delete target[k]);Object.entries(source).forEach(([k,v])=>{if(k!=='__proto__'&&k!=='constructor'&&k!=='prototype')target[k]=v;});};
      if(!state.checks||typeof state.checks!=='object')state.checks={};
      replace(state.checks,data.checks);
      if(!state.integratedDenbouProgress||typeof state.integratedDenbouProgress!=='object')state.integratedDenbouProgress={};
      replace(state.integratedDenbouProgress,progress);
      if(!state.daily||typeof state.daily!=='object')state.daily={};
      replace(state.daily,daily);
      state.note=note;
      if(!save()){status.textContent='No se restauró: no fue posible guardar. Se conservó el estado anterior.';return;}
      document.getElementById('dailyNote').value=state.note;
      render();
      renderProjects();
      status.textContent='Respaldo restaurado en este navegador. Puedes comprobar los avances en Proyectos.';
    }catch(e){status.textContent='No se importó el archivo: '+(e&&e.message||'formato inválido');}
    finally{picker.value='';}
  });
})();
