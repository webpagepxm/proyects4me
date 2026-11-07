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
  let seeded=0;
  for(const [project,entries] of Object.entries(documentedEvidence)){
    for(const [stage,key] of entries){
      const id=evidenceId(project,stage,key);
      if(!Object.prototype.hasOwnProperty.call(state.checks,id)){
        state.checks[id]=true;
        seeded++;
      }
    }
  }
  if(seeded && typeof save==="function")save();

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
    const evidence=(documentedEvidence[project.id]||[]).filter(e=>e[0]===step.id).map(e=>({
      id:evidenceId(project.id,step.id,e[1]),title:e[2],
      context:e[3]+" · documentado en chat",weight:0.35,kind:"documented"
    }));
    return evidence.concat(original,newTasks);
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
  function progressBar(value,title,compact) {
    const v=Math.max(0,Math.min(100,Number(value)||0));
    return '<div class="rv2-bar'+(compact?' rv2-bar-small':'')+'" role="progressbar" aria-label="'+escapeText(title)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+v+'"><span style="width:'+v+'%"></span></div>';
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


  // ROADMAP_V4_INTEGRATED · 10 etapas y 57 tareas del tablero Callejero + Denbou.
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
          progressBar(stat.progress,p.name+": "+step.name,true)+
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
    const stages=(matches.length?matches:integratedStages).map(s=>{
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
        '<strong data-merged-stage-pct="'+s.id+'">'+value+'%</strong><span class="rv3-roadmap-arrow" aria-hidden="true">⌄</span></summary>'+
        '<div class="rv3-roadmap-stage-progress">'+progressBar(value,s.name+": avance estimado",true)+'</div>'+
        '<div class="rv3-roadmap-stage-body"><p>'+escapeText(s.desc)+'</p>'+tasks+'</div></details>';
    }).join("");
    const p=integratedOverall();
    return '<article class="card rv2-project rv3-roadmap-integrated" data-merged-card>'+
      '<div class="rv2-project-head"><div><div class="eyebrow">PRIORIDAD 1 · PROYECTO INTEGRADO</div>'+
      '<h3>Callejero + Denbou</h3><p>Captación pública y operaciones privadas: dos productos unidos por permisos, sin mezclar la propiedad de los datos.</p></div>'+
      '<span class="rv2-percent" data-merged-total>'+p+'%</span></div>'+
      '<div data-merged-mainbar>'+progressBar(p,"Avance estimado Callejero y Denbou",false)+'</div>'+
      '<p class="rv3-roadmap-disclaimer">Porcentajes iniciales del tablero acordado (7 nov 2026). Son estimaciones, no pruebas de producción.</p>'+
      '<div class="rv3-roadmap-actions"><button class="btn alt" type="button" data-merged-export>Exportar JSON</button>'+
      '<button class="btn ghost" type="button" data-merged-import>Importar JSON</button>'+
      '<button class="btn ghost" type="button" data-merged-reset>Restablecer estimaciones</button>'+
      '<input type="file" accept=".json,application/json" data-merged-file hidden></div>'+
      '<p class="rv3-roadmap-feedback" data-merged-feedback role="status">Los cambios se guardan solo en este navegador; no modifican Denbou ni Supabase.</p>'+
      '<details class="rv3-roadmap-list" open><summary>Etapas y tareas ('+integratedStages.length+')</summary>'+
      '<div class="rv3-roadmap-stage-grid">'+stages+'</div></details>'+
      '<details class="rv3-roadmap-old"><summary>Checklists técnicos anteriores (se conservan)</summary><p>Sus casillas y porcentajes siguen disponibles por separado.</p>'+
      old.map(renderOldChecklist).join("")+'</details></article>';
  }
  function refreshMerged(){
    const card=projectHost.querySelector("[data-merged-card]");
    if(card){
      const value=integratedOverall();
      card.querySelector("[data-merged-total]").textContent=value+"%";
      const overallTrack=card.querySelector("[data-merged-mainbar] .rv2-bar");
      if(overallTrack){overallTrack.setAttribute("aria-valuenow",String(value));overallTrack.querySelector("span").style.width=value+"%";}
      integratedStages.forEach(stage=>{
        const item=card.querySelector('[data-merged-stage-pct="'+stage.id+'"]');
        if(!item)return;
        const value=integratedStageProgress(stage);
        item.textContent=value+"%";
        const bar=item.closest(".rv3-roadmap-stage").querySelector(".rv3-roadmap-stage-progress .rv2-bar");
        bar.setAttribute("aria-valuenow",String(value));
        bar.querySelector("span").style.width=value+"%";
      });
    }
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
    Object.assign(integratedEdits,edits);save();renderProjectsV2();
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
    save();refreshMerged();
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


  function renderPortfolio(){
    const torre=projects.find(x=>x.id==="torre");
    const other=torre?projectInfo(torre).progress:0;
    const combined=integratedOverall();
    const overall=Math.round(combined*.70+other*.30);
    const parts=[["Callejero + Denbou",70,combined],["Torre Fuerte",30,other]].map(([name,w,p])=>
      '<div class="rv2-portfolio-row"><div><b>'+escapeText(name)+'</b><small>'+w+'% del peso</small></div><strong>'+p+'%</strong></div>'+
      progressBar(p,name+": progreso orientativo",true)).join("");
    portfolioHost.innerHTML='<div class="rv2-portfolio-head"><div><div class="eyebrow">PANORAMA GENERAL</div>'+
      '<h3>Portafolio activo</h3><p>Callejero + Denbou es un solo proyecto integrado; Torre Fuerte sigue independiente. Los avances son estimaciones, no certificaciones.</p></div>'+
      '<div class="rv2-global"><strong>'+overall+'%</strong><small>orientativo</small></div></div>'+
      progressBar(overall,"Avance orientativo del portafolio",false)+
      '<div class="rv2-portfolio-split">'+parts+'</div>'+
      '<p class="rv2-footnote">Pesos: Callejero + Denbou 70%, Torre Fuerte 30%. Los ajustes locales no cambian las aplicaciones en producción.</p>';
    return overall;
  }

  // ROADMAP_V3_DENBOU · Tres anillos de vida sobre el plan diario.
  // El primero muestra el alcance estimado del portafolio, los otros solo acciones
  // elegidas y confirmadas. Nunca calificar el valor personal ni inferir emociones.
  let selectedIndicator = "";
  let latestOverall = 0;
  const ringSpecs = [
    {id:"progreso",label:"Progreso",color:"#ff638d",r:102,period:"Portafolio"},
    {id:"salud",label:"Salud",color:"#b9ed6c",r:76,period:"Hoy"},
    {id:"vinculos",label:"Vínculos",color:"#55d3eb",r:50,period:"Esta semana"}
  ];
  const visualPercent = value => Math.max(0,Math.min(100,Math.round(Number(value)||0)));
  function kpiCheckbox(id,label,description) {
    return '<label class="rv3-check"><input type="checkbox" data-task="'+id+'" '+(state.checks[id]?'checked':'')+
      '><span><b>'+escapeText(label)+'</b><small>'+escapeText(description)+'</small></span></label>';
  }
  function renderIndicators(globalProgress) {
    latestOverall=globalProgress;
    const today=typeof todayLocalKey==="function"?todayLocalKey():new Date().toISOString().slice(0,10);
    const week=typeof weekMondayKey==="function"?weekMondayKey():today;
    const health=[
      ["daily-"+today+"-food","Comí y atendí mi alimentación","Cuenta lo que pudiste resolver, sin perfeccionismo"],
      ["daily-"+today+"-move","Moví mi cuerpo","Caminar, correr o hacer ejercicio a tu ritmo"],
      ["daily-"+today+"-rest","Me di tiempo para descansar","El descanso también es una acción valiosa"]
    ];
    const connections=[
      ["contact-week-"+week+"-papa","Hablé con papá","Una conversación significativa, no una cuota de mensajes"],
      ["contact-week-"+week+"-mama","Hablé con mamá","También cuenta compartir un momento"],
      ["contact-week-"+week+"-amigos","Conecté con una amistad","Conversación o convivencia que te importó"]
    ];
    const healthDone=health.filter(x=>!!state.checks[x[0]]).length;
    const contactDone=connections.filter(x=>!!state.checks[x[0]]).length;
    const values=[visualPercent(globalProgress),percent(healthDone,health.length),percent(contactDone,connections.length)];
    const rings=ringSpecs.map((item,i)=>{
      const perimeter=2*Math.PI*item.r;
      return '<circle cx="132" cy="132" r="'+item.r+'" class="rv3-ring-track" stroke="'+item.color+'" />'+
        '<circle cx="132" cy="132" r="'+item.r+'" class="rv3-ring-progress" stroke="'+item.color+
        '" stroke-dasharray="'+perimeter.toFixed(2)+'" stroke-dashoffset="'+(perimeter*(1-values[i]/100)).toFixed(2)+'"/>';
    }).join("");
    const metrics=ringSpecs.map((item,i)=>'<button type="button" class="rv3-metric'+(selectedIndicator===item.id?' is-selected':'')+
      '" data-ring="'+item.id+'" aria-expanded="'+(selectedIndicator===item.id)+'" aria-controls="rv3-indicator-detail">'+
      '<span class="rv3-metric-dot" style="--ring-color:'+item.color+'"></span>'+
      '<span class="rv3-metric-copy"><strong>'+item.label+'</strong><small>'+item.period+'</small></span>'+
      '<span class="rv3-metric-value">'+values[i]+'%</span>'+
      '<span class="rv3-metric-caret" aria-hidden="true">⌄</span></button>').join("");
    let details="";
    if(selectedIndicator==="progreso"){
      details='<h4>Progreso de los proyectos</h4><p>Este porcentaje resume los frentes activos y sus avances documentados; no representa el éxito de tu vida, tus ingresos ni el cumplimiento de hoy.</p><button class="rv3-open-projects" type="button" data-side-nav="proyectos">Ver proyectos y etapas <span aria-hidden="true">↗</span></button>';
    }else if(selectedIndicator==="salud"){
      details='<h4>Cuidado personal · hoy</h4><p>Solo tres acciones sencillas. No diagnosticamos ni medimos cómo deberías sentirte.</p>'+health.map(x=>kpiCheckbox(...x)).join("");
    }else if(selectedIndicator==="vinculos"){
      details='<h4>Personas importantes · esta semana</h4><p>Marca únicamente los momentos reales que te hayan importado. Una relación no se reduce a un porcentaje.</p>'+connections.map(x=>kpiCheckbox(...x)).join("");
    }
    indicatorsHost.innerHTML=
      '<article class="rv3-life-shell" aria-labelledby="rv3-life-title">'+
        '<div class="rv3-life-heading"><div><span class="rv3-kicker">TU PANORAMA</span>'+
          '<h2 id="rv3-life-title">Lo importante, en equilibrio.</h2>'+
          '<p>Proyectos, cuidado y personas. Un vistazo, sin tener que revisar diez pantallas.</p></div>'+
          '<span class="rv3-soft-label">A tu ritmo</span></div>'+
        '<div class="rv3-life-main"><div class="rv3-rings-figure" role="img" aria-label="Progreso '+values[0]+' por ciento, salud '+values[1]+' por ciento, vínculos '+values[2]+' por ciento">'+
          '<svg viewBox="0 0 264 264" aria-hidden="true" focusable="false">'+rings+
            '<text x="132" y="127" text-anchor="middle" class="rv3-svg-label">HOY</text>'+
            '<text x="132" y="146" text-anchor="middle" class="rv3-svg-sub">Tres prioridades</text>'+
          '</svg></div>'+
          '<div class="rv3-metrics">'+metrics+'</div></div>'+
        '<div id="rv3-indicator-detail" class="rv3-indicator-detail" '+(details?'':'hidden')+'>'+details+'</div>'+
        '<p class="rv3-ring-note">Los anillos muestran avances estimados o acciones que tú confirmas. No son una evaluación de tu bienestar ni una comparación con otras personas.</p>'+
      '</article>';
  }

  indicatorsHost.addEventListener("click",event=>{
    const trigger=event.target.closest("[data-ring]");
    if(!trigger)return;
    selectedIndicator=selectedIndicator===trigger.dataset.ring?"":trigger.dataset.ring;
    renderIndicators(latestOverall);
    if(selectedIndicator){
      const active=indicatorsHost.querySelector('[data-ring="'+selectedIndicator+'"]');
      if(active)active.focus({preventScroll:true});
    }
  });

  function renderProjectsV2() {
    const term=(filter.value||"").trim().toLocaleLowerCase("es-MX");
    const overall=renderPortfolio();
    renderIndicators(overall);
    projectHost.innerHTML=projects.map(project=>{
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
        return '<details class="rv2-stage" '+(term?'open':'')+'><summary><span><b>'+escapeText(step.name)+'</b><small>Peso de etapa: '+step.weight+'% · '+stat.completed+'/'+stat.items.length+' marcados'+(step.reference==null?'':' · base estimada '+step.reference+'%')+'</small></span><strong>'+stat.progress+'%</strong></summary>'+progressBar(stat.progress,project.name+": "+step.name,true)+'<div class="rv2-stage-tasks">'+shown.map(item=>taskHTML(item.id,item.title,item.context)).join("")+'</div></details>';
      }).join("");
      const snapshot=cfg.reference==null?'':'<div class="rv2-reference"><b>'+cfg.reference+'% estimado</b> · fotografía del alcance al '+escapeText(cfg.refDate)+'. Se actualizará al completar nuevas tareas; falta validar producción.</div>';
      return '<article class="card project rv2-project"><div class="rv2-project-head"><div><div class="eyebrow">'+escapeText(cfg.priority)+' · '+escapeText(cfg.mode)+'</div><h3>'+escapeText(project.name)+'</h3><p>'+escapeText(project.description)+'</p></div><span class="rv2-percent">'+info.progress+'%</span></div>'+progressBar(info.progress,project.name+": avance orientativo",false)+'<div class="rv2-counter">'+info.completed+' de '+info.total+' entregables marcados</div>'+snapshot+'<div class="rv2-next"><strong>Próximo hito</strong><p>'+escapeText(cfg.next)+'</p><strong>Por resolver</strong><p>'+escapeText(cfg.blocker)+'</p></div><details class="rv2-stages" '+(term?'open':'')+'><summary>Ver etapas y entregables ('+cfg.phases.length+')</summary><div class="rv2-stage-grid">'+stages+'</div></details></article>';
    }).join("");
  }

  // La página previa guarda casillas como id-índice. Nunca cambiamos ese formato.
  // Las nuevas usan IDs permanentes milestone-proyecto-etapa-entregable.
  // Reemplazar la función de presentación no borra checkboxes ni notas anteriores.
  renderProjects = renderProjectsV2;
  filter.addEventListener("input",renderProjectsV2);
  renderProjectsV2();

  // Próximos pasos alineados con la última auditoría y con prioridades actuales.
  if(typeof priorityQueue!=="undefined" && typeof renderDailyPlan==="function"){
    priorityQueue.splice(0,priorityQueue.length,
      ["milestone-backstage-calidad-diff-final","Denbou · revisar el código corregido","Comprobar compatibilidad con main y permisos"],
      ["milestone-backstage-calidad-guardar-rama","Denbou · guardar correcciones","Rama remota y respaldo antes de integrar"],
      ["milestone-backstage-entrega-merge","Denbou · integrar y validar","Probar y publicar únicamente tras revisión"],
      ["milestone-backstage-diseno-tres-conceptos","Denbou · prototipos de diseño","Tres direcciones visuales sin tocar producción"],
      ["milestone-backstage-ia-groq-actual","Denbou · verificar la conexión Groq","Mantener permisos y lectura confiable"],
      ["milestone-backstage-whatsapp-meta-test","Denbou · iniciar WhatsApp de prueba","Webhook y registro seguro, todavía no conectado"],
      ["milestone-torre-ordenes-flujo","Torre Fuerte · validar órdenes","Probar Android, estados y enlaces privados"],
      ["milestone-callejero-rps-qr-piloto","Callejero · validar QR por RP","Piloto consentido y datos segmentados"]
    );
    renderDailyPlan();
  }
  const unknowns=document.getElementById("unknowns");
  if(unknowns)unknowns.innerHTML=[
    "Denbou: integración técnica auditada y pruebas de backend real",
    "Denbou: rediseño UX/UI y pruebas con Safari físico",
    "WhatsApp y voz: diseño definido, conexión pendiente",
    "Torre Fuerte: órdenes, acceso privado y flujo Android por verificar",
    "Callejero: atribución QR por RP y permisos por validar"
  ].map(s=>'<div class="checkline"><span class="pill">Pendiente</span>'+escapeText(s)+'</div>').join("");
})();
