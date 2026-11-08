/* Voluntary settings. Private labels/context are rendered only while their panel is open. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.RoadmapIntelligenceUI=factory();})(globalThis,function(){
 'use strict';
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const labels={breakfast:'Desayuno',food:'Comida',dinner:'Cena',move:'Movimiento',rest:'Descanso',projects:'Proyectos',work:'Trabajo',learning:'Aprendizaje',organization:'Organización',finance:'Organización económica',contact:'Contacto social',nightTeeth:'Higiene nocturna'};
 function mount({document:doc,storage,Memory,getMemory,commit,getDecision,getProjects,readError}){
  const form=doc.getElementById('assistantPreferences'),panel=doc.getElementById('privateContext'),body=doc.getElementById('privateContextBody'),status=doc.getElementById('assistantStatus');
  if(!form?.elements||!panel||!body)return {refresh(){}};
  const get=id=>doc.getElementById(id),tell=text=>status.textContent=text;
  const identifier=()=>globalThis.crypto?.randomUUID?.()||'local-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  let showAllRecords=false;
  const clone=()=>JSON.parse(JSON.stringify(getMemory()));
  const localDate=value=>{if(!value)return '';const d=new Date(value);if(!Number.isFinite(d.getTime()))return '';const p=n=>String(n).padStart(2,'0');return [d.getFullYear(),p(d.getMonth()+1),p(d.getDate())].join('-')+'T'+p(d.getHours())+':'+p(d.getMinutes());};
  const iso=value=>value&&Number.isFinite(new Date(value).getTime())?new Date(value).toISOString():null;
  function edit(change){
   if(readError()){tell('La memoria anterior no se puede leer. Expórtala o restablécela antes de guardar cambios.');return false;}
   try{const m=clone();change(m);m.revision++;const clean=Memory.normalize(m);if(!commit(clean)){tell('No se pudo guardar. Se conservó la memoria anterior.');refresh(true);return false;}tell('Preferencias guardadas en este navegador.');refresh(true);return true;}catch(error){tell('Revisa fechas, duración y campos del formulario. No se guardaron cambios.');return false;}
  }
  function refresh(force=false){
   const m=getMemory();
   if(force||!form.contains(doc.activeElement)){
    get('assistantTone').value=m.confirmed.tone;get('assistantRepeat').value=m.confirmed.minRepeatMinutes;
    get('socialSuggestions').checked=m.confirmed.socialEnabled;get('restStart').value=m.confirmed.restWindow?.start||'';get('restEnd').value=m.confirmed.restWindow?.end||'';
   }
   if(readError())tell(readError());
   const decision=getDecision();get('decisionExplanation').textContent=decision?decision.reason:'La orientación usa únicamente el contexto disponible.';
  }
  form.addEventListener('submit',event=>{event.preventDefault();const start=get('restStart').value,end=get('restEnd').value;if(Boolean(start)!==Boolean(end)){tell('Indica ambas horas de descanso o deja las dos vacías.');return;}
   edit(m=>{m.confirmed.tone=get('assistantTone').value;m.confirmed.minRepeatMinutes=Number(get('assistantRepeat').value);m.confirmed.socialEnabled=get('socialSuggestions').checked;m.confirmed.restWindow=start?{start,end}:null;});
  });
  get('muteSuggestion').addEventListener('click',()=>{const d=getDecision();if(d)edit(m=>m.mutedRecommendations[d.id]=new Date(Date.now()+86400000).toISOString());});
  get('resetMuted').addEventListener('click',()=>edit(m=>m.mutedRecommendations={}));
  const field=(id,label,type='text',extra='')=>'<label for="'+id+'">'+label+'<input id="'+id+'" type="'+type+'" '+extra+'></label>';
  function renderPrivate(){
   if(!panel.open){body.innerHTML='';return;}
   const m=getMemory();
   body.innerHTML='<h2>Contexto privado</h2><p>Opcional y solo en este navegador. En un dispositivo compartido, otras personas con acceso al navegador pueden leer estos datos. No se conecta con ChatGPT ni envía información a terceros.</p>'+
    '<form id="emotionalPreferences" class="assistant-form"><label class="preference-check"><input id="nightOverthinking" type="checkbox" '+(m.patterns.nightOverthinking?'checked':'')+'>He observado que suelo sobrepensar de madrugada; prefiero una invitación a pausar.</label><button class="btn" type="submit">Guardar preferencia nocturna</button></form>'+
    '<section class="private-section"><h3>Vínculos y límites</h3><form id="relationshipForm" class="assistant-form">'+field('relationLabel','Alias privado (opcional)','text','maxlength="120"')+
    '<label for="relationMode">Preferencia<select id="relationMode"><option value="muted">Sin sugerencias hasta que yo elija</option><option value="open">Permitir sugerencias</option><option value="distance">Prefiero distancia</option><option value="disabled">Desactivar</option></select></label>'+field('relationInterval','Frecuencia elegida en días (opcional)','number','min="1" max="365"')+field('relationContact','Último contacto que tú confirmas (opcional)','datetime-local')+
    '<label for="relationContext">Contexto que decides guardar (opcional)<textarea id="relationContext" maxlength="2000"></textarea></label><p>El texto privado no se interpreta automáticamente. Las sugerencias usan la preferencia, frecuencia y fecha de contacto que elijas.</p><button type="submit" class="btn">Guardar vínculo o límite</button></form><div id="relationshipList">'+m.relationships.map(p=>'<article class="private-entry"><strong>'+escape(p.label||'Vínculo sin alias')+'</strong><p>'+escape({open:'Sugerencias permitidas',distance:'Distancia: no se sugerirá contactar',muted:'Silenciado',disabled:'Desactivado'}[p.mode])+'</p><button type="button" class="text-link" data-edit-relation="'+escape(p.id)+'">Editar</button><button type="button" class="text-link" data-delete-relation="'+escape(p.id)+'">Eliminar</button></article>').join('')+'</div></section>'+
    '<section class="private-section"><h3>Registro voluntario de actividad</h3><form id="activityForm" class="assistant-form"><label for="activityKind">Actividad realizada<select id="activityKind">'+Memory.activities.map(a=>'<option value="'+a+'">'+labels[a]+'</option>').join('')+'</select></label>'+field('activityAt','Fecha y hora reales','datetime-local','required')+field('activityMinutes','Minutos registrados (opcional)','number','min="0" max="1440"')+
    '<label for="activityCoverage">Alcance<select id="activityCoverage"><option value="event">Solo este bloque o actividad</option><option value="day-total">Total del día que estoy declarando</option></select></label><button type="submit" class="btn">Registrar actividad realizada</button></form><ul class="private-records">'+(showAllRecords?m.records:m.records.slice(-15)).slice().reverse().map(r=>'<li>'+escape(labels[r.activity])+' · '+escape(localDate(r.at).replace('T',' '))+'<button type="button" class="text-link" data-edit-record="'+r.id+'">Editar</button><button type="button" class="text-link" data-delete-record="'+r.id+'">Eliminar</button></li>').join('')+'</ul>'+(m.records.length>15?'<button type="button" id="showAllRecords" class="text-link">'+(showAllRecords?'Ver los últimos 15':'Ver todos los registros')+'</button>':'')+'</section>'+
    '<section class="private-section"><h3>Compromiso o vencimiento confirmado</h3><form id="obligationForm" class="assistant-form"><label for="obligationKind">Tipo<select id="obligationKind"><option value="appointment">Compromiso personal</option><option value="payment">Vencimiento económico</option><option value="projectDeadline">Fecha límite de proyecto</option></select></label>'+field('obligationLabel','Referencia privada (opcional)','text','maxlength="160"')+field('obligationAt','Fecha y hora configuradas','datetime-local','required')+field('obligationDuration','Duración en minutos (opcional)','number','min="0" max="1440"')+
    '<label for="obligationProject">Proyecto, si corresponde<select id="obligationProject"><option value="">Sin proyecto</option>'+getProjects().map(p=>'<option value="'+escape(p.id)+'">'+escape(p.name)+'</option>').join('')+'</select></label><button class="btn" type="submit">Guardar compromiso</button></form><ul class="private-records">'+m.obligations.map(o=>'<li>'+escape(o.label||'Compromiso sin referencia')+' · '+escape(localDate(o.at).replace('T',' '))+'<button type="button" class="text-link" data-edit-obligation="'+o.id+'">Editar</button><button type="button" class="text-link" data-delete-obligation="'+o.id+'">Eliminar</button></li>').join('')+'</ul></section>'+
    '<div class="assistant-actions"><button type="button" id="exportPrivate" class="btn">Exportar memoria privada</button><button type="button" id="importPrivate" class="btn">Importar archivo autorizado</button><input id="privateFile" type="file" accept=".json,application/json" hidden><button type="button" id="clearPrivate" class="btn ghost">Eliminar memoria del asistente</button></div>';
  }
  panel.addEventListener('toggle',renderPrivate);
  body.addEventListener('submit',event=>{
   event.preventDefault();const target=event.target;
   if(target.id==='emotionalPreferences'){edit(m=>m.patterns.nightOverthinking=get('nightOverthinking').checked);return;}
   let success=false;
   if(target.id==='relationshipForm'){
    const record={id:target.dataset.edit||identifier(),label:get('relationLabel').value,context:get('relationContext').value,mode:get('relationMode').value,lastContactAt:iso(get('relationContact').value),intervalDays:get('relationInterval').value===''?null:Number(get('relationInterval').value),mutedUntil:null,source:'manual'};
    success=edit(m=>{const index=m.relationships.findIndex(p=>p.id===record.id);if(index<0)m.relationships.push(record);else m.relationships[index]=record;});
   }
   if(target.id==='activityForm'&&iso(get('activityAt').value)&&new Date(get('activityAt').value).getTime()>Date.now()){tell('Una actividad realizada necesita una fecha presente o pasada.');return;}
   if(target.id==='activityForm')success=edit(m=>{const record={id:target.dataset.edit||identifier(),activity:get('activityKind').value,at:iso(get('activityAt').value),minutes:get('activityMinutes').value===''?null:Number(get('activityMinutes').value),coverage:get('activityCoverage').value,status:'confirmed',source:'manual'};const index=m.records.findIndex(r=>r.id===record.id);if(index<0)m.records.push(record);else m.records[index]=record;});
   if(target.id==='obligationForm'){
    if(get('obligationKind').value==='projectDeadline'&&!get('obligationProject').value){tell('Elige el proyecto de esa fecha límite.');return;}
    success=edit(m=>{const record={id:target.dataset.edit||identifier(),kind:get('obligationKind').value,label:get('obligationLabel').value,at:iso(get('obligationAt').value),durationMinutes:get('obligationDuration').value===''?null:Number(get('obligationDuration').value),projectId:get('obligationProject').value,confirmed:true,source:'manual'};const index=m.obligations.findIndex(o=>o.id===record.id);if(index<0)m.obligations.push(record);else m.obligations[index]=record;});
   }
   if(success){renderPrivate();get('privateContext').querySelector('summary').focus({preventScroll:true});}
  });
  body.addEventListener('click',event=>{
   const b=event.target.closest('button');if(!b)return;
   if(b.dataset.editRelation){const p=getMemory().relationships.find(p=>p.id===b.dataset.editRelation);if(!p)return;get('relationshipForm').dataset.edit=p.id;get('relationLabel').value=p.label;get('relationContext').value=p.context;get('relationMode').value=p.mode;get('relationInterval').value=p.intervalDays??'';get('relationContact').value=localDate(p.lastContactAt);get('relationLabel').focus();}
   if(b.id==='showAllRecords'){showAllRecords=!showAllRecords;renderPrivate();panel.querySelector('summary').focus({preventScroll:true});}
   if(b.dataset.editRecord){const r=getMemory().records.find(r=>r.id===b.dataset.editRecord);if(r){get('activityForm').dataset.edit=r.id;get('activityKind').value=r.activity;get('activityAt').value=localDate(r.at);get('activityMinutes').value=r.minutes??'';get('activityCoverage').value=r.coverage;get('activityKind').focus();}}
   if(b.dataset.editObligation){const o=getMemory().obligations.find(o=>o.id===b.dataset.editObligation);if(o){get('obligationForm').dataset.edit=o.id;get('obligationKind').value=o.kind;get('obligationLabel').value=o.label;get('obligationAt').value=localDate(o.at);get('obligationDuration').value=o.durationMinutes??'';get('obligationProject').value=o.projectId;get('obligationKind').focus();}}
   for(const [attribute,field]of [['deleteRelation','relationships'],['deleteRecord','records'],['deleteObligation','obligations']])if(b.dataset[attribute]){if(edit(m=>m[field]=m[field].filter(x=>x.id!==b.dataset[attribute]))){renderPrivate();panel.querySelector('summary').focus({preventScroll:true});}}
   if(b.id==='exportPrivate'){
    try{const data=readError()?storage.getItem(Memory.key):JSON.stringify(getMemory(),null,2);const blob=new Blob([data||''],{type:'application/json'}),url=URL.createObjectURL(blob),a=doc.createElement('a');a.href=url;a.download='roadmap-memoria-privada.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(error){tell('No se pudo preparar el archivo privado.');}
   }
   if(b.id==='importPrivate')get('privateFile').click();
   if(b.id==='clearPrivate'&&confirm('¿Eliminar solo la memoria y preferencias del asistente? Los proyectos y registros originales permanecen.')){
    if(commit(Memory.empty(),{remove:true})){tell('Memoria del asistente eliminada.');renderPrivate();refresh(true);}else tell('No se pudo eliminar la memoria.');
   }
  });
  body.addEventListener('change',async event=>{
   if(event.target.id!=='privateFile'||!event.target.files?.[0])return;
   try{const file=event.target.files[0];if(file.size>1000000)throw Error();const parsed=JSON.parse(await file.text());Memory.normalize(parsed);if(!confirm('¿Importar esta memoria privada y sustituir la del asistente? Solo se usarán los datos de este archivo.'))return;
    const next=Memory.importAuthorized(parsed,{consent:true,now:new Date()});if(!commit(next))throw Error();tell('Archivo privado importado con tu permiso.');renderPrivate();refresh(true);
   }catch(error){tell('No se importó el archivo privado. Revisa el formato; no se sustituyó la memoria.');}finally{if(get('privateFile'))get('privateFile').value='';}
  });
  refresh();return {refresh,closePrivate(){panel.open=false;body.innerHTML='';}};
 }
 return Object.freeze({mount});
});
