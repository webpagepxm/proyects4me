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

  function renderPortfolio() {
    const active=projects.filter(p=>roadmap[p.id]&&roadmap[p.id].allocation);
    const weight=active.reduce((a,p)=>a+roadmap[p.id].allocation,0);
    const overall=weight?Math.round(active.reduce((sum,p)=>sum+roadmap[p.id].allocation*projectInfo(p).progress,0)/weight):0;
    const parts=active.map(p=>{
      const cfg=roadmap[p.id],info=projectInfo(p);
      return '<div class="rv2-portfolio-row"><div><b>'+escapeText(p.name)+'</b><small>'+cfg.allocation+'% del peso</small></div><strong>'+info.progress+'%</strong></div>'+progressBar(info.progress,p.name+": entregables marcados",true);
    }).join("");
    portfolioHost.innerHTML='<div class="rv2-portfolio-head"><div><div class="eyebrow">PANORAMA GENERAL</div><h3>Portafolio activo</h3><p>Avance orientativo según lo documentado: Denbou parte de la estimación técnica; los demás muestran decisiones definidas y pendientes verificados. No equivale a producción.</p></div><div class="rv2-global"><strong>'+overall+'%</strong><small>orientativo</small></div></div>'+progressBar(overall,"Avance orientativo del portafolio activo",false)+'<div class="rv2-portfolio-split">'+parts+'</div><p class="rv2-footnote">Ponderación: Denbou 50%, Torre Fuerte 30%, Callejero 20%. Incluye estimaciones y acuerdos de alcance; no certifica publicaciones. Las marcas son locales a este dispositivo.</p>';
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
