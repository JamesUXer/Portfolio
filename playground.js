/* Isolated Playground prototype. Shared homepage artwork/animation stays unchanged. */
(() => {
  const root = document.documentElement;
  document.querySelector('.skip-link').href = `${location.pathname}${location.search}#composition`;
  history.scrollRestoration = 'manual';
  const main = document.getElementById('composition');
  const scene = document.querySelector('.scene');
  const notes = document.querySelector('.review-notes');
  const reviewPanel = document.querySelector('.review-panel');
  const appearanceButtons = [...document.querySelectorAll('.appearance-toggle')];
  const placeholderToggle = document.getElementById('show-placeholders');
  const placeholderNote = document.getElementById('placeholder-note');
  const placeholders = [...document.querySelectorAll('[data-placeholder]')];
  let lastPlaceholder = null;
  const island = document.querySelector('.island');
  const family = document.querySelector('.collection-portal');
  const overview = document.querySelector('.overview-scene');
  const familyButton = document.getElementById('family-entry');
  const children = document.getElementById('family-children');
  const childItems = [...document.querySelectorAll('.app-region')];
  const caption = document.getElementById('view-caption');
  const project = document.getElementById('project-view');
  const title = document.getElementById('project-title');
  const back = document.querySelector('.project-back');
  const layer = document.querySelector('.project-transition');
  const shape = document.getElementById('reveal-shape');
  const revealFill = document.getElementById('reveal-fill');
  const revealPaint = document.getElementById('reveal-paint');
  const theme = document.getElementById('theme');
  const reduce = document.getElementById('reduce-motion');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let state = { family: false, project: null };
  let busy = false;
  let generation = 0;
  let frame = 0;
  let finishMorph = null;
  let savedScroll = 0;
  let pendingFocus = null;
  const animations = new Set();
  let visited;
  try { visited = new Set(JSON.parse(sessionStorage.getItem('playground-prototype-visited') || '[]')); }
  catch { visited = new Set(); }
  const reduced = () => preference.matches || reduce.checked;
  const ease = 'cubic-bezier(.22,.75,.2,1)';
  const lessons = {
    'boss-battle': { title: 'Boss Battle', label: 'decreasing number patterns', description: 'Explore decreasing number patterns, with number lines and place-value counters.', file: 'boss-battle.html' },
    'round-it-up': { title: 'Round It Up!', label: 'rounding numbers', description: 'Try rounding to the nearest 10,000 or 100,000, from worked examples to independent practice.', file: 'round-it-up.html' }
  };
  const lessonPlayer = document.getElementById('lesson-player');
  const spellquestPlayer = document.getElementById('spellquest-player');
  const spellquestLoading = document.getElementById('spellquest-loading');
  const busyBoardPlayer = document.getElementById('busy-board-player');
  const busyBoardLoading = document.getElementById('busy-board-loading');
  const fieldNotesPlayer = document.getElementById('field-notes-player');
  const lessonLoading = document.querySelector('.lesson-loading');
  let activeLesson = null;
  const isLesson = id => Boolean(lessons[id]);
  const originFor = id => document.getElementById(id === 'spellquest' ? 'spellquest-entry' : `${id}-entry`);
  // Individual projects keep their island-relative paint origins.
  const originBounds = id => originFor(id).getBoundingClientRect();
  const hashFor = value => value.project ? `#${value.project}` : value.family ? '#lesson-apps' : '';
  function readRoute() {
    if (location.hash === '#spellquest') return { family: false, project: 'spellquest' };
    if (['#research-tools','#field-notes','#testing-journeys'].includes(location.hash)) return {family:false,project:location.hash.slice(1)};
    if (location.hash === '#busy-board') return { family: false, project: 'busy-board' };
    const id = location.hash.slice(1);
    if (id === 'lesson-example') return { family: true, project: 'boss-battle' };
    if (isLesson(id)) return { family: true, project: id };
    return { family: location.hash === '#lesson-apps', project: null };
  }
  function inkVisited() {
    document.querySelectorAll('[data-open]').forEach(button => {
      const seen = visited.has(button.dataset.open);
      button.classList.toggle('is-visited', seen);
      const lesson = lessons[button.dataset.open];
      const toolLabel = {'research-tools':'Enter the machinery and explore Research tools','field-notes':'Try Field notes, a fictional research logger demo','testing-journeys':'Explore Testing journeys, an illustrative research walkthrough'}[button.dataset.open];
      const label = toolLabel || (lesson ? `Open ${lesson.title}, ${lesson.label}` : button.dataset.open === 'busy-board' ? 'Play the digital busy board' : 'Play SpellQuest, a spelling prototype');
      button.setAttribute('aria-label', label + (seen ? ', explored' : ''));
      button.querySelector('.visited-label')?.toggleAttribute('hidden', !seen);
    });
    island.classList.toggle('is-visited', visited.has('spellquest'));
  }
  function recordVisit(id) {
    visited.add(id);
    try { sessionStorage.setItem('playground-prototype-visited', JSON.stringify([...visited])); } catch { /* Session fallback. */ }
    inkVisited();
  }
  function cancelMotion() {
    generation += 1;
    cancelAnimationFrame(frame);
    if (finishMorph) { finishMorph(false); finishMorph = null; }
    animations.forEach(animation => animation.cancel());
    animations.clear();
    scene.dataset.travelling = 'false';
    delete scene.dataset.departing;
    layer.hidden = true;
    delete root.dataset.morphing;
    busy = false;
    root.dataset.transitioning = 'false';
    scene.setAttribute('aria-busy', 'false');
  }
  function play(element, frames, options = {}) {
    if (reduced() || !element.animate) return Promise.resolve();
    const animation = element.animate(frames, { duration: 650, easing: ease, ...options });
    animations.add(animation);
    return animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  }
  function headerInset() {
    const top = Math.max(0, Math.min(innerHeight - 80, document.querySelector('.study-site-header').getBoundingClientRect().bottom));
    root.style.setProperty('--project-top', `${top}px`);
    return top;
  }
  function renderScene(open) {
    root.dataset.family = open ? 'open' : 'closed';
    familyButton.setAttribute('aria-expanded', String(open));
    scene.dataset.scene = open ? 'collection' : 'island';
    fitCloudJourney();
    familyButton.setAttribute('aria-label', 'Enter the school and explore lesson apps');
    children.hidden = !open;
    syncFamilyControls(open);
    island.inert = open;
    island.setAttribute('aria-hidden', String(open));
    dismissPlaceholder(false);
    syncPlaceholders();
    caption.textContent = open
      ? 'Inside the school. Open Boss Battle or Round It Up.'
      : 'Explore the woodland, school, busy board or research machinery.';
  }
  function dismissPlaceholder(restoreFocus = true) {
    placeholderNote.hidden = true;
    placeholders.forEach(button => button.setAttribute('aria-expanded', 'false'));
    if (restoreFocus && lastPlaceholder && !lastPlaceholder.inert) lastPlaceholder.focus({ preventScroll: true });
  }
  function syncPlaceholders() {
    const shown = placeholderToggle.checked;
    root.dataset.placeholders = shown ? 'on' : 'off';
    placeholders.forEach(button => {
      button.inert = !shown || state.family || Boolean(state.project);
      button.setAttribute('aria-hidden', String(button.inert));
    });
    if (!shown) dismissPlaceholder(false);
  }
  function alignScene(open) {
    const target = scene;
    const headerHeight = document.querySelector('.study-site-header').getBoundingClientRect().height;
    const top = target.getBoundingClientRect().top + scrollY - headerHeight - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  }
  function projectContent(id) {
    if (project.dataset.project !== (id || '')) project.scrollTop = 0;
    const spell = id === 'spellquest';
    const boardOpen = id === 'busy-board';
    const researchOpen=id==='research-tools', fieldOpen=id==='field-notes', testingOpen=id==='testing-journeys';
    title.textContent = testingOpen ? 'Testing journeys' : researchOpen ? 'Research tools' : fieldOpen ? 'Field notes' : spell ? 'SpellQuest' : boardOpen ? 'Busy board' : lessons[id]?.title || 'Playground';
    back.querySelector('span').textContent = fieldOpen || testingOpen ? 'Back to Research tools' : researchOpen || spell || boardOpen ? 'Back to the island' : 'Back inside the school';
    document.getElementById('spellquest-content').hidden = !spell;
    document.getElementById('busy-board-content').hidden = !boardOpen;
    document.getElementById('research-tools-content').hidden=!researchOpen;
    document.getElementById('field-notes-content').hidden=!fieldOpen;
    document.getElementById('testing-journeys-content').hidden=!testingOpen;
    project.classList.toggle('testing-project',testingOpen);
    window.playgroundTesting.setActive(testingOpen);
    project.classList.toggle('research-project',researchOpen);
    project.classList.toggle('field-notes-project',fieldOpen);
    document.getElementById('lesson-content').hidden = !isLesson(id);
    project.classList.toggle('lesson-project', isLesson(id));
    project.classList.toggle('spellquest-project', spell);
    project.classList.toggle('busy-board-project', boardOpen);
    document.querySelectorAll('[data-lesson-notes]').forEach(article => { article.hidden = article.dataset.lessonNotes !== id; });
    document.getElementById('lesson-description').textContent = lessons[id]?.description || '';
    loadLesson(id);
    loadSpellquest(spell);
    loadBusyBoard(boardOpen);
    loadFieldNotes(fieldOpen);
    requestAnimationFrame(drawAnnotations);
    project.dataset.project = id || '';
    root.dataset.project = id || '';
    document.title = id ? `${title.textContent} | Playground | James Spiller` : 'Playground | James Spiller';
  }
  const spellquestThinking = document.getElementById('spellquest-thinking');
  document.getElementById('spellquest-thinking-link').addEventListener('click', () => {
    spellquestThinking.scrollIntoView({ behavior:reduced() ? 'instant' : 'smooth', block:'start' });
    spellquestThinking.focus({ preventScroll:true });
  });
  document.getElementById('spellquest-return-to-play').addEventListener('click', () => {
    const device = document.querySelector('.spellquest-device');
    device.scrollIntoView({ behavior:reduced() ? 'instant' : 'smooth', block:'center' });
    spellquestPlayer.querySelector('iframe')?.focus({ preventScroll:true });
  });
  document.querySelectorAll('[data-spellquest-moment]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-spellquest-moment]').forEach(item => {
        const selected = item === button;
        item.setAttribute('aria-pressed', String(selected));
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
      requestAnimationFrame(drawSpellquestAnnotations);
    });
  });
  function drawSpellquestAnnotations() {
    const wrapper=document.querySelector('.spellquest-annotation-scene');
    if(!wrapper.getBoundingClientRect().width)return;
    const box=wrapper.getBoundingClientRect(), image=document.getElementById('spellquest-annotated-image').getBoundingClientRect();
    const svg=wrapper.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
    const narrow=matchMedia('(max-width:760px)').matches;
    const points={context:[.55,.44,.78,.35],audio:[.36,.565,.18,.58],explore:[.50,.655,.78,.76]};
    wrapper.querySelectorAll('[data-spellquest-target]').forEach(note=>{
      const key=note.dataset.spellquestTarget, point=points[key], rect=note.getBoundingClientRect();
      const tx=image.x-box.x+image.width*point[0],ty=image.y-box.y+image.height*point[1];
      const left=rect.right<=image.left;
      const sx=narrow?image.x-box.x+image.width*point[2]:(left?rect.right-box.x:rect.x-box.x);
      const sy=narrow?image.y-box.y+image.height*point[3]:rect.y-box.y+rect.height*.5;
      const bend=narrow?image.width*.12:Math.min(100,Math.abs(tx-sx)*.45);
      svg.querySelector(`[data-note-arrow="${key}"]`).setAttribute('d',`M${sx} ${sy} C${sx+(left?bend:-bend)} ${sy+35} ${tx+(left?-bend:bend)} ${ty-25} ${tx} ${ty}`);
      const label=svg.querySelector(`[data-note-key="${key}"]`);label.setAttribute('x',sx);label.setAttribute('y',sy-9);
    });
  }
  const spellquestAnnotationObserver=new ResizeObserver(()=>requestAnimationFrame(drawSpellquestAnnotations));
  spellquestAnnotationObserver.observe(document.querySelector('.spellquest-annotation-scene'));
  document.getElementById('spellquest-annotated-image').addEventListener('load',drawSpellquestAnnotations);
  function syncBusyBoardMotion() {
    busyBoardPlayer.querySelector('iframe')?.contentWindow?.busyBoardPortfolio?.setReducedMotion(reduced());
  }
  function loadBusyBoard(open) {
    if (!open) { busyBoardPlayer.replaceChildren(); busyBoardLoading.hidden = true; return; }
    if (busyBoardPlayer.querySelector('iframe')) return;
    busyBoardLoading.textContent = 'Loading the board…';
    busyBoardLoading.hidden = false;
    const iframe = document.createElement('iframe');
    iframe.title = 'Play the digital busy board';
    iframe.src = 'assets/playground/apps/busy-board/index.html';
    iframe.addEventListener('load', () => {
      busyBoardLoading.hidden = true;
      syncBusyBoardMotion();
      iframe.contentDocument?.addEventListener('keydown', event => {
        if (event.key === 'Escape' && state.project === 'busy-board') { event.preventDefault(); returnOneLevel(); }
      });
    });
    busyBoardPlayer.append(iframe);
  }
  document.getElementById('busy-board-notes-link').addEventListener('click', () => {
    const notes = document.getElementById('busy-board-notes');
    notes.scrollIntoView({ behavior:reduced() ? 'instant' : 'smooth', block:'start' });
    notes.focus({ preventScroll:true });
  });
  document.getElementById('busy-board-return-to-play').addEventListener('click', () => {
    project.scrollTo({ top:0, behavior:reduced() ? 'instant' : 'smooth' });
    busyBoardPlayer.querySelector('iframe')?.focus({ preventScroll:true });
  });
  let exportRecord = null, fieldNotesReady = false, fieldNotesInitialised = false, fieldNotesLoadTimer = 0;
  function fieldNotesAPI() { return fieldNotesPlayer.querySelector('iframe')?.contentWindow?.fieldNotesDemo; }
  function fieldNotesAvailability(value, message='') {
    fieldNotesReady=value==='ready';
    ['field-notes-review','field-notes-preview'].forEach(id=>{document.getElementById(id).disabled=!fieldNotesReady;});
    const status=document.getElementById('field-notes-status');
    status.hidden=fieldNotesReady || value==='closed';status.textContent=message;
    document.getElementById('field-notes-retry').hidden=!['error','slow'].includes(value);
    fieldNotesPlayer.setAttribute('aria-busy',String(value==='loading'||value==='slow'));
  }
  function loadFieldNotes(open) {
    if (!open) {
      clearTimeout(fieldNotesLoadTimer);fieldNotesInitialised=false;fieldNotesAvailability('closed');fieldNotesPlayer.replaceChildren();
      document.getElementById('field-notes-export').hidden=true;exportRecord=null;return;
    }
    if (fieldNotesPlayer.querySelector('iframe')) return;
    fieldNotesAvailability('loading','Loading the logger…');
    const iframe=document.createElement('iframe');
    iframe.title='Try the research logger with fictional field notes';
    iframe.src='assets/playground/apps/field-notes/index.html';
    fieldNotesLoadTimer=setTimeout(()=>{
      if(iframe.isConnected)fieldNotesAvailability('slow','The logger is taking longer to load. Retry or open it separately.');
    },15000);
    iframe.addEventListener('load',async()=>{
      iframe.contentDocument?.addEventListener('keydown',event=>{
        if(event.key==='Escape'){event.preventDefault();returnOneLevel();}
      });
      try {
        const api=iframe.contentWindow?.fieldNotesDemo;
        if(!api?.ready || !await api.ready)throw new Error('Logger unavailable');
        if(!iframe.isConnected)return;
        clearTimeout(fieldNotesLoadTimer);fieldNotesInitialised=true;fieldNotesAvailability('ready');
      } catch {
        if(!iframe.isConnected)return;
        clearTimeout(fieldNotesLoadTimer);
        fieldNotesAvailability('error','The logger could not initialise. Retry loading or open it separately.');
      }
    });
    fieldNotesPlayer.append(iframe);
  }
  document.getElementById('field-notes-retry').addEventListener('click',()=>{
    loadFieldNotes(false);if(state.project==='field-notes')loadFieldNotes(true);
  });
  document.getElementById('field-notes-review').addEventListener('click',async()=>{
    if(!fieldNotesReady)return;
    try {await fieldNotesAPI().review();}
    catch {fieldNotesAvailability('error','The note could not be opened. Retry loading the logger.');}
  });
  document.getElementById('field-notes-preview').addEventListener('click',async()=>{
    if(!fieldNotesReady)return;
    try {exportRecord=await fieldNotesAPI().record();}
    catch {fieldNotesAvailability('error','The demo record could not be read. Retry loading the logger.');return;}
    if(state.project!=='field-notes'||!fieldNotesReady)return;
    const panel=document.getElementById('field-notes-export');panel.hidden=false;
    document.getElementById('field-notes-export-status').textContent=exportRecord ? `Demo record ${exportRecord.id}. Observation and interpretation remain separate in the CSV.` : 'Capture a fictional note first, then inspect its export fields.';
    document.getElementById('field-notes-evidence').textContent=exportRecord?.directEvidence || 'No observation recorded.';
    document.getElementById('field-notes-interpretation').textContent=exportRecord?.interpretation || 'No interpretation recorded.';
    document.getElementById('field-notes-download').disabled=!exportRecord;
    panel.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});panel.focus({preventScroll:true});
  });
  document.getElementById('field-notes-download').addEventListener('click',()=>{
    if(!exportRecord)return;
    const csv=fieldNotesAPI()?.csv(exportRecord);if(!csv)return;
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='fictional-playground-note.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.getElementById('field-notes-return').addEventListener('click',()=>{
    project.scrollTo({top:0,behavior:reduced()?'instant':'smooth'});fieldNotesPlayer.querySelector('iframe')?.focus({preventScroll:true});
  });
  function loadSpellquest(open) {
    if (!open) {
      spellquestPlayer.replaceChildren();
      spellquestLoading.hidden = true;
      return;
    }
    if (spellquestPlayer.querySelector('iframe')) return;
    spellquestLoading.hidden = false;
    const iframe = document.createElement('iframe');
    iframe.title = 'Play SpellQuest, the forest path';
    iframe.src = 'https://jamesuxer.github.io/spellquest/';
    iframe.addEventListener('load', () => { spellquestLoading.hidden = true; });
    spellquestPlayer.append(iframe);
  }
  function unloadLesson() {
    const existing = lessonPlayer.querySelector('iframe');
    try { existing?.contentWindow?.speechSynthesis?.cancel(); } catch { /* An unavailable frame can still be removed. */ }
    lessonPlayer.replaceChildren();
    activeLesson = null;
  }
  function syncLessonMotion() {
    const doc = lessonPlayer.querySelector('iframe')?.contentDocument;
    if (!doc?.head) return;
    let style = doc.getElementById('playground-motion');
    if (!style) { style = doc.createElement('style'); style.id = 'playground-motion'; doc.head.append(style); }
    style.textContent = reduced() ? '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}' : '';
  }
  function loadLesson(id) {
    if (!isLesson(id)) { unloadLesson(); return; }
    const lesson = lessons[id];
    document.getElementById('lesson-standalone').href = `assets/playground/apps/${lesson.file}`;
    if (activeLesson === id) return;
    unloadLesson();
    activeLesson = id;
    lessonLoading.hidden = false;
    const iframe = document.createElement('iframe');
    iframe.title = `${lesson.title}, interactive lesson app`;
    iframe.src = `assets/playground/apps/${lesson.file}`;
    iframe.addEventListener('load', () => {
      if (activeLesson !== id) return;
      lessonLoading.hidden = true;
      syncLessonMotion();
      // Escape in the embedded app returns keyboard users to the collection.
      iframe.contentDocument?.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        const dialog = iframe.contentDocument.querySelector('[role="dialog"][aria-modal="true"]');
        const close = dialog?.querySelector('button[aria-label="Close"]');
        if (close) close.click();
        else returnOneLevel();
      });
    });
    lessonPlayer.append(iframe);
  }
  function drawAnnotations() {
    const article = document.querySelector('[data-lesson-notes]:not([hidden])');
    if (!article || !article.getBoundingClientRect().width) return;
    const box = article.getBoundingClientRect();
    const image = article.querySelector('img').getBoundingClientRect();
    const decision = article.querySelector('.note-decision').getBoundingClientRect();
    const evidence = article.querySelector('.note-evidence').getBoundingClientRect();
    const svg = article.querySelector('.lesson-annotation-arrows');
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    const narrow = matchMedia('(max-width: 760px)').matches;
    const targetX = image.x - box.x + image.width * .5;
    const targetY = image.y - box.y + image.height * (article.dataset.lessonNotes === 'boss-battle' ? .66 : .52);
    const x = narrow ? decision.x - box.x + 24 : decision.right - box.x;
    const y = decision.bottom - box.y + 5;
    article.querySelector('.decision-arrow').setAttribute('d', `M${x} ${y} C${narrow ? x-30 : x+60} ${y+40} ${targetX-65} ${targetY-45} ${targetX} ${targetY}`);
    const ex = narrow ? evidence.right - box.x : evidence.x - box.x + 12;
    const ey = narrow ? evidence.y - box.y + 28 : evidence.bottom - box.y + 7;
    const tx = image.right - box.x + 12, ty = image.y - box.y + image.height * .8;
    article.querySelector('.evidence-arrow').setAttribute('d', `M${ex} ${ey} C${ex+45} ${ey+20} ${tx+70} ${ty+25} ${tx} ${ty}`);
    const confirmation = article.querySelector('.note-confirmation');
    if (confirmation) {
      const note = confirmation.getBoundingClientRect();
      const cx = note.right-box.x-12, cy = note.top-box.y-10;
      const buttonX = image.x-box.x+image.width*.65;
      const buttonY = image.y-box.y+image.height*.84;
      article.querySelector('.confirmation-arrow').setAttribute('d', `M${cx} ${cy} C${cx+55} ${cy-25} ${buttonX+95} ${buttonY+60} ${buttonX} ${buttonY}`);
    }
  }
  const annotationObserver = new ResizeObserver(() => requestAnimationFrame(drawAnnotations));
  document.querySelectorAll('.lesson-annotations').forEach(article => annotationObserver.observe(article));
  document.querySelectorAll('.annotated-still img').forEach(img => img.addEventListener('load', drawAnnotations));
  document.getElementById('lesson-moments-link').addEventListener('click', () => {
    const overview = document.getElementById('lesson-overview');
    overview.scrollIntoView({ behavior: reduced() ? 'instant' : 'smooth', block: 'start' });
    overview.focus({ preventScroll: true });
  });
  document.getElementById('lesson-return-to-app').addEventListener('click', () => {
    project.scrollTo({ top: 0, behavior: reduced() ? 'instant' : 'smooth' });
    title.focus({ preventScroll: true });
  });
  function setProjectMode(open) {
    main.inert = open;
    notes.inert = open;
    reviewPanel.inert = open;
    document.body.classList.toggle('project-open', open);
    scene.setAttribute('aria-busy', 'false');
    if (!open) project.hidden = true;
    headerInset();
  }
  function settle() {
    scene.dataset.travelling = 'false';
    delete scene.dataset.departing;
    renderScene(state.family);
    projectContent(state.project);
    setProjectMode(Boolean(state.project));
    project.hidden = !state.project;
    document.body.classList.toggle('project-visible', Boolean(state.project));
    inkVisited();
  }
  function focusRoute() {
    const target = state.project === 'research-tools' && ['field-notes-entry','testing-journeys-entry'].includes(pendingFocus?.id) ? pendingFocus : state.project ? title : state.family
      ? (pendingFocus?.matches('[data-open]') ? pendingFocus : childItems[0])
      : (pendingFocus?.matches('[data-open]') ? pendingFocus : familyButton);
    target.focus({ preventScroll: true });
  }
  function syncFamilyControls(open, locked = false) {
    overview.inert = open || locked;
    familyButton.inert = open || locked;
    children.inert = !open || locked;
  }
  function fitCloudJourney() {
    // Island-relative geometry stays stable while its overview is transformed.
    const width = island.offsetWidth, height = island.offsetHeight;
    const stageWidth = scene.clientWidth, stageHeight = scene.clientHeight;
    if (!width || !height || !stageWidth || !stageHeight) return;
    const home = {
      x:island.offsetLeft-width/2+width*316/669,
      y:island.offsetTop+height*70/399,
      width:width*122/669,
      height:height*78/399
    };
    const values = {
      width:home.width/stageWidth*100, height:home.height/stageHeight*100,
      left:home.x/stageWidth*100, top:home.y/stageHeight*100
    };
    Object.entries(values).forEach(([key,value])=>{
      family.style.setProperty(`--home-${key}`,value);
      scene.style.setProperty(`--school-home-${key}`,value);
    });
    const zoom = Math.max(stageWidth/home.width,stageHeight/home.height)*1.5;
    scene.style.setProperty('--inside-width', `${values.width*zoom}%`);
    scene.style.setProperty('--inside-height', `${values.height*zoom}%`);
    scene.style.setProperty('--inside-left', `${50-values.width*zoom/2}%`);
    scene.style.setProperty('--inside-top', `${50-values.height*zoom/2}%`);
    scene.style.setProperty('--camera-zoom', zoom);
    scene.style.setProperty('--camera-x', `${stageWidth/2-(home.x+home.width/2)*zoom}px`);
    scene.style.setProperty('--camera-y', `${stageHeight/2-(home.y+home.height/2)*zoom}px`);
    scene.dataset.schoolReady = 'true';
  }
  async function compose(open) {
    const ticket = generation;
    if (!open && !reduced()) {
      scene.dataset.departing = 'true';
      syncFamilyControls(true, true);
      await play(children, [{ opacity:1 }, { opacity:0 }], { duration:180 });
      if (ticket !== generation) return;
    }
    delete scene.dataset.departing;
    alignScene(open);
    const from = family.getBoundingClientRect();
    renderScene(open);
    scene.dataset.travelling = String(!reduced());
    syncFamilyControls(open, !reduced());
    const to = family.getBoundingClientRect();
    await play(family, [
      { transform:`translate(${from.x-to.x}px,${from.y-to.y}px) scale(${from.width/to.width},${from.height/to.height})`, transformOrigin:'0 0' },
      { transform:'none', transformOrigin:'0 0' }
    ], { duration:1050, easing:'cubic-bezier(.65,0,.2,1)' });
    if (ticket !== generation) return;
    scene.dataset.travelling = 'false';
    syncFamilyControls(open);
  }
  // The same cubic contour is used at every size, so the reveal has a continuous reverse.
  function contour(rect) {
    const { x, y, width: w, height: h } = rect;
    const p = (a,b) => `${(x+w*a).toFixed(2)} ${(y+h*b).toFixed(2)}`;
    return `M${p(.08,.3)} C${p(-.04,.05)} ${p(.18,.08)} ${p(.32,.12)} C${p(.48,-.05)} ${p(.59,.03)} ${p(.69,.1)} C${p(.85,-.02)} ${p(1.03,.15)} ${p(.95,.36)} C${p(1.08,.55)} ${p(.96,.7)} ${p(.91,.76)} C${p(.98,.98)} ${p(.7,1.04)} ${p(.57,.9)} C${p(.4,1.05)} ${p(.22,.96)} ${p(.2,.89)} C${p(-.02,.94)} ${p(-.07,.57)} ${p(.08,.3)} Z`;
  }
  function morph(origin, opening, ticket, id) {
    if (reduced()) return Promise.resolve(true);
    const top = headerInset();
    const small = { x: origin.x, y: origin.y-top, width: origin.width, height: origin.height };
    const big = { x: -innerWidth*.6, y: -(innerHeight-top)*.6, width: innerWidth*2.2, height: (innerHeight-top)*2.2 };
    const from = opening ? small : big;
    const to = opening ? big : small;
    layer.hidden = false;
    root.dataset.morphing = id;
    revealPaint.setAttribute('href', 'assets/playground/paint-study.png');
    shape.setAttribute('d', contour(from));
    function draw(rect, amount) {
      shape.setAttribute('d', contour(rect));
      ['x','y','width','height'].forEach(key => revealPaint.setAttribute(key, rect[key]));
      const fill = opening ? amount : 1-amount;
      revealFill.setAttribute('opacity', fill);
      revealPaint.setAttribute('opacity', .62-(isLesson(id) ? .24 : .5)*fill);
    }
    draw(from, 0);
    return new Promise(resolve => {
      finishMorph = resolve;
      const started = performance.now();
      const tick = now => {
        if (ticket !== generation) { resolve(false); return; }
        const progress = Math.min(1, (now-started)/680);
        const eased = progress < .5 ? 4*progress**3 : 1-(-2*progress+2)**3/2;
        const rect = Object.fromEntries(['x','y','width','height'].map(key => [key, from[key]+(to[key]-from[key])*eased]));
        draw(rect, eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
        else { finishMorph = null; resolve(true); }
      };
      frame = requestAnimationFrame(tick);
    });
  }
  async function navigate(next, { historyMode = 'push', animate = true, source = null } = {}) {
    if (hashFor(next) === hashFor(state) && !busy) return;
    const previous = { ...state };
    pendingFocus = previous.project ? originFor(previous.project) : familyButton;
    const interrupted = busy;
    cancelMotion();
    const ticket = generation;
    busy = true;
    root.dataset.transitioning = 'true';
    scene.setAttribute('aria-busy', 'true');
    if(previous.project==='field-notes' && next.project!=='field-notes' && fieldNotesInitialised && fieldNotesAPI()) {
      if(!await fieldNotesAPI().flush()){cancelMotion();return;}
      if(ticket!==generation)return;
    }
    state = next;
    if (historyMode !== 'none') {
      const url = `${location.pathname}${location.search}${hashFor(next)}`;
      const data = { playgroundPrototype: true, from: historyMode === 'push' ? hashFor(previous) : null };
      history[historyMode === 'replace' ? 'replaceState' : 'pushState'](data, '', url);
    }
    if (!animate || interrupted || reduced()) {
      if (previous.project && previous.project!==next.project) recordVisit(previous.project);
      settle();
      if (!next.project && (previous.project || previous.family !== next.family)) alignScene(next.family);
    } else if(['field-notes','testing-journeys'].includes(previous.project) && next.project==='research-tools') {
      recordVisit(previous.project);
      projectContent('research-tools');
      const origin=originBounds(previous.project);
      if(!await morph(origin,false,ticket,previous.project))return;
      if(ticket!==generation)return;
      layer.hidden=true;delete root.dataset.morphing;
    } else if (previous.project !== next.project && next.project) {
      savedScroll = scrollY;
      renderScene(next.family);
      const origin = originBounds(next.project);
      projectContent(next.project);
      project.hidden = true;
      setProjectMode(true);
      scene.setAttribute('aria-busy', 'true');
      if (!await morph(origin, true, ticket, next.project)) return;
      if (ticket !== generation) return;
      project.hidden = false;
      document.body.classList.add('project-visible');
      layer.hidden = true;
      delete root.dataset.morphing;
      scene.setAttribute('aria-busy', 'false');
      play(document.querySelector('.project-body'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 220 });
    } else if (previous.project && !next.project) {
      recordVisit(previous.project);
      renderScene(next.family);
      const origin = originBounds(previous.project);
      const pending = morph(origin, false, ticket, previous.project);
      project.hidden = true;
      document.body.classList.remove('project-visible');
      if (!await pending) return;
      if (ticket !== generation) return;
      layer.hidden = true;
      delete root.dataset.morphing;
      projectContent(null);
      setProjectMode(false);
      if (next.family) alignScene(true);
      else window.scrollTo({ top: savedScroll, behavior: 'instant' });
    } else {
      await compose(next.family);
      if (ticket !== generation) return;
    }
    if (ticket !== generation) return;
    busy = false;
    root.dataset.transitioning = 'false';
    scene.setAttribute('aria-busy', 'false');
    focusRoute();
  }
  function returnOneLevel() {
    const next = ['field-notes','testing-journeys'].includes(state.project) ? {family:false,project:'research-tools'} : state.project ? { family: isLesson(state.project), project: null } : { family: false, project: null };
    if (history.state?.playgroundPrototype && history.state.from === hashFor(next)) history.back();
    else navigate(next, { historyMode: 'replace' });
  }
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.open;
    navigate({ family: isLesson(id), project: id }, { source: id === 'spellquest' ? originFor(id) : button });
  }));
  familyButton.addEventListener('click', () => {
    if (state.family) returnOneLevel();
    else navigate({ family: true, project: null });
  });
  document.querySelector('.family-return').addEventListener('click', returnOneLevel);
  back.addEventListener('click', returnOneLevel);
  // Shared navigation handles menu focus; Escape closes only that topmost layer.
  document.addEventListener('keydown', event => {
    const menu = document.querySelector('.menu-button');
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeMenu(true);
    }
  }, { capture: true });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !placeholderNote.hidden) {
      event.preventDefault(); dismissPlaceholder(); return;
    }
    if (event.key === 'Escape' && (state.project || state.family)) { event.preventDefault(); returnOneLevel(); }
  });
  const routeChanged = () => navigate(readRoute(), { historyMode: 'none' });
  window.addEventListener('popstate', routeChanged);
  window.addEventListener('hashchange', () => { if (hashFor(readRoute()) !== hashFor(state)) routeChanged(); });
  function applyTheme(value) {
    setTheme(value === 'dark', false);
    theme.value = root.dataset.theme;
    appearanceButtons.forEach(button => button.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'));
  }
  applyTheme(root.dataset.theme);
  theme.addEventListener('change', () => applyTheme(theme.value));
  appearanceButtons.forEach(button => button.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));
  placeholders.forEach(button => {
    button.setAttribute('aria-controls', 'placeholder-note');
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      dismissPlaceholder(false);
      lastPlaceholder = button;
      button.setAttribute('aria-expanded', 'true');
      placeholderNote.hidden = false;
      caption.textContent = 'Composition placeholder. This is an unassigned location used to check the layout.';
    });
  });
  document.getElementById('dismiss-placeholder').addEventListener('click', () => dismissPlaceholder());
  placeholderToggle.addEventListener('change', syncPlaceholders);
  function syncMotion() {
    root.dataset.reducedMotion = String(reduced());
    syncLessonMotion();
    syncBusyBoardMotion();
    window.playgroundTesting.setReducedMotion(reduced());
    if (reduced()) {
      const interrupted = busy;
      cancelMotion();
      document.querySelector('.hero-sheen-layer').getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      settle();
      // A deliberate setting change keeps its focus; OS changes settle into the route.
      if (interrupted && document.activeElement !== reduce) focusRoute();
    }
  }
  reduce.checked = preference.matches || new URLSearchParams(location.search).get('motion') === 'reduce';
  preference.addEventListener('change', syncMotion);
  reduce.addEventListener('change', syncMotion);
  window.addEventListener('resize', () => {
    if (busy) { cancelMotion(); settle(); focusRoute(); }
    fitCloudJourney();
    headerInset();
  });
  window.addEventListener('pageshow', () => {
    if (state.family && !state.project) alignScene(true);
    headerInset();
  });
  let headerFrame = 0;
  window.addEventListener('scroll', () => {
    if ((!state.project && !busy) || headerFrame) return;
    headerFrame = requestAnimationFrame(() => { headerFrame = 0; headerInset(); });
  }, { passive: true });
  state = readRoute();
  history.replaceState({ playgroundPrototype: true, from: null }, '', location.hash === '#lesson-example' ? `${location.pathname}${location.search}#boss-battle` : location.href);
  syncMotion();
  settle();
  root.dataset.transitioning = 'false';
  if (state.family && !state.project) alignScene(true);
  if (state.project) { savedScroll = scrollY; title.focus({ preventScroll: true }); }
})();
