/* HabitHero progressive enhancements. All evidence and alternatives live in the HTML. */
(() => {
  'use strict';
  const study = document.getElementById('hh-goal-study');
  if (!study) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const lifecycle = new AbortController();
  const on = (element, type, listener, options = {}) => element.addEventListener(type, listener, { ...options, signal: lifecycle.signal });
  const syncMotion = () => { study.dataset.reducedMotion = String(motion.matches); };
  on(motion, 'change', syncMotion);
  syncMotion();
  const all = selector => [...study.querySelectorAll(selector)];
  const one = selector => study.querySelector(selector);
  const pendingTimers = new Set();
  const later = (callback, delay) => {
    const timer = setTimeout(() => { pendingTimers.delete(timer); callback(); }, delay);
    pendingTimers.add(timer);
    return timer;
  };
  const cancelLater = timer => { clearTimeout(timer); pendingTimers.delete(timer); };
  const cleanups = [() => { pendingTimers.forEach(clearTimeout); pendingTimers.clear(); }];
  const animate = (element, frames, duration = 300) => {
    element.getAnimations().forEach(animation => animation.cancel());
    if (!motion.matches) element.animate(frames, { duration, easing: 'cubic-bezier(.16,1,.3,1)' });
  };
  const pressed = (buttons, selected) => buttons.forEach(button => button.setAttribute('aria-pressed', String(button === selected)));

  // Native disclosures continue to work without these interruptible height transitions.
  all('details').forEach(details => {
    const summary = details.querySelector('summary');
    let running = null;
    let intended = details.open;
    const settle = () => {
      running?.cancel();
      running = null;
      details.open = intended;
      details.style.height = '';
      details.style.overflow = '';
      summary.setAttribute('aria-expanded', String(intended));
    };
    summary.setAttribute('aria-expanded', String(details.open));
    on(summary, 'click', event => {
      if (motion.matches) return;
      event.preventDefault();
      const from = details.getBoundingClientRect().height;
      intended = !intended;
      running?.cancel();
      details.style.height = '';
      details.style.overflow = 'clip';
      details.open = true;
      const target = intended ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
      summary.setAttribute('aria-expanded', String(intended));
      if (!intended && details.contains(document.activeElement)) summary.focus();
      running = details.animate([{ height: `${from}px` }, { height: `${target}px` }], {
        duration: intended ? 320 : 210, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both'
      });
      running.onfinish = settle;
    });
    on(details, 'toggle', () => {
      if (!running) { intended = details.open; summary.setAttribute('aria-expanded', String(intended)); }
    });
    on(motion, 'change', settle);
    cleanups.push(settle);
  });

  // One-shot persona playback, interrupted by manual selection or preference changes.
  const persona = one('.persona-preview');
  const frames = [...persona.querySelectorAll('.persona-illustration img')];
  const sceneButtons = [...persona.querySelectorAll('.persona-scene-controls button')];
  const play = persona.querySelector('.persona-play');
  const scenes = [
    ['Making sense of conflicting information.', 'Conflicting advice makes it hard to know what matters.', 'Clear guidance she can trust.'],
    ['Working out what to do next.', 'Too many decisions compete for limited time.', 'A realistic, manageable starting point.'],
    ['Fitting movement into her day.', 'Exercise has to fit around work and parenting.', 'Small, flexible habits and reassurance that her effort counts.']
  ];
  let personaTimer, playing = false, scene = 0;
  const stopPersona = () => {
    cancelLater(personaTimer);
    playing = false;
    play.textContent = 'Replay Ella’s story';
  };
  function showScene(index) {
    scene = index;
    frames.forEach((image, i) => {
      image.classList.toggle('is-current', i === index);
      image.setAttribute('aria-hidden', String(i !== index));
    });
    pressed(sceneButtons, sceneButtons[index]);
    persona.querySelector('.persona-scene-caption').textContent = scenes[index][0];
    persona.querySelector('[data-persona-pain]').textContent = scenes[index][1];
    persona.querySelector('[data-persona-motivation]').textContent = scenes[index][2];
  }
  sceneButtons.forEach((button, index) => on(button, 'click', () => { stopPersona(); showScene(index); }));
  function nextScene() {
    if (scene < scenes.length - 1) {
      showScene(scene + 1);
      personaTimer = later(nextScene, 1300);
    } else stopPersona();
  }
  on(play, 'click', () => {
    if (playing) { stopPersona(); return; }
    if (motion.matches) return;
    playing = true;
    play.textContent = 'Pause Ella’s story';
    showScene(0);
    personaTimer = later(nextScene, 1300);
  });
  const personaPreference = () => { if (motion.matches) stopPersona(); play.hidden = motion.matches; };
  on(motion, 'change', personaPreference);
  personaPreference();
  showScene(0);
  cleanups.push(stopPersona);

  // Reveal all three quotations as a single accessible unit. Touch retains vertical scrolling.
  const evidence = one('.pull-evidence');
  const tab = evidence.querySelector('.pull-tab');
  const quotes = evidence.querySelector('.pull-quote');
  const windowElement = evidence.querySelector('.pull-window');
  const cover = evidence.querySelector('.pull-cover');
  let quoteOpen = false, pull = null, suppressPullClick = false;
  function revealQuotes(value) {
    quoteOpen = value;
    quotes.inert = !value;
    quotes.setAttribute('aria-hidden', String(!value));
    cover.setAttribute('aria-hidden', String(value));
    evidence.classList.remove('is-pulling');
    evidence.style.setProperty('--pull', value ? '100%' : '0%');
    evidence.style.setProperty('--tab-travel', '0px');
    windowElement.style.height = value ? `${quotes.scrollHeight}px` : '170px';
    tab.setAttribute('aria-expanded', String(value));
    tab.querySelector('span').textContent = value ? 'Hide the interview quotes' : 'Reveal three interview quotes';
    evidence.querySelector('.pull-hint').textContent = value ? 'Pull left or tap to close.' : 'Pull right or tap to reveal.';
  }
  on(tab, 'click', event => { if (suppressPullClick) { event.preventDefault(); return; } revealQuotes(!quoteOpen); });
  on(tab, 'pointerdown', event => {
    if (event.button !== 0 || pull) return;
    pull = { id: event.pointerId, x: event.clientX, y: event.clientY, progress: quoteOpen ? 1 : 0, dragged: false };
    suppressPullClick = false;
  });
  on(tab, 'pointermove', event => {
    if (event.pointerId !== pull?.id) return;
    const dx = event.clientX - pull.x, dy = event.clientY - pull.y;
    if (!pull.dragged && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) { pull = null; return; }
    if (Math.abs(dx) < 7 && !pull.dragged) return;
    pull.dragged = true;
    tab.setPointerCapture(event.pointerId);
    evidence.classList.add('is-pulling');
    pull.progress = Math.max(0, Math.min(1, (quoteOpen ? 1 : 0) + dx / Math.min(180, evidence.clientWidth * .6)));
    if (!motion.matches) evidence.style.setProperty('--pull', `${pull.progress * 100}%`);
  });
  function releasePull(event, cancelled = false) {
    if (event.pointerId !== pull?.id) return;
    const ended = pull;
    pull = null;
    if (tab.hasPointerCapture(event.pointerId)) tab.releasePointerCapture(event.pointerId);
    if (ended.dragged) {
      suppressPullClick = true;
      revealQuotes(cancelled ? quoteOpen : ended.progress >= .5);
      // Pointer-generated click occurs before this reset; a subsequent keyboard click still works.
      later(() => { suppressPullClick = false; }, 0);
    }
  }
  on(tab, 'pointerup', event => releasePull(event));
  on(tab, 'pointercancel', event => releasePull(event, true));
  on(tab, 'lostpointercapture', event => releasePull(event, true));
  const quoteResize = new ResizeObserver(() => {
    if (quoteOpen) windowElement.style.height = `${quotes.scrollHeight}px`;
  });
  quoteResize.observe(quotes);
  cleanups.push(() => { quoteResize.disconnect(); pull = null; });
  revealQuotes(false);

  // Counts remain aggregate; selecting a theme changes only its design interpretation.
  const previewPriorities = ['Make the next action understandable.', 'Support restarting without shame or pressure.', 'Show when someone has done enough.'];
  const themeButtons = all('[data-preview-theme]');
  themeButtons.forEach((button, index) => on(button, 'click', () => {
    pressed(themeButtons, button);
    one('.preview-priority p').textContent = previewPriorities[index];
    animate(one('.preview-connection span'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }]);
  }));
  const priorities = [
    ['Decision cost and prioritisation appeared across five discovery interviews.', 'Reduce cognitive load: make the next action understandable.'],
    ['Uncertainty about completion appeared in three of five discovery interviews.', 'Clarify progress: show when someone has done enough.'],
    ['Fragile motivation appeared in four of five discovery interviews.', 'Support restarting without shame or pressure.']
  ];
  const priorityButtons = all('[data-priority]');
  priorityButtons.forEach((button, index) => on(button, 'click', () => {
    pressed(priorityButtons, button);
    one('.priority-source p').textContent = priorities[index][0];
    one('.priority-destination p').textContent = priorities[index][1];
    const scale = matchMedia('(max-width:500px)').matches ? 'scaleY' : 'scaleX';
    animate(one('.priority-connector span'), [{ transform: `${scale}(0)` }, { transform: `${scale}(1)` }], 360);
  }));

  // Stable goal panels avoid recreating the artefact or the element holding keyboard focus.
  const wheel = one('.wheel'), rotor = one('.rotor');
  const letters = all('[data-option]'), names = all('[data-jump]'), panels = all('[data-goal-panel]');
  const optionNames = ['Accept or create', 'Adjust in place', 'Easier / same / harder'];
  let selected = 1, angle = -120, turn = null, suppressWheelClick = false;
  function paintAngle(value) {
    rotor.style.transform = `rotate(${value}deg)`;
    letters.forEach((button, index) => {
      button.style.transform = `rotate(${index * 120}deg) translateY(-66px) rotate(${-index * 120 - value}deg)`;
    });
  }
  function paintGoal(announce = false) {
    letters.forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));
    names.forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));
    panels.forEach((panel, index) => { panel.hidden = index !== selected; });
    paintAngle(angle);
    if (announce) {
      one('.goal-announcement').textContent = `${String.fromCharCode(65 + selected)}: ${optionNames[selected]}. ${selected === 1 ? 'Carried forward.' : 'Explored alternative. B remains carried forward.'}`;
      animate(panels[selected].querySelector('.artifact-pair'), [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0)' }]);
    }
  }
  function cancelTurn() {
    if (!turn) return;
    const id = turn.id;
    turn = null;
    if (wheel.hasPointerCapture(id)) wheel.releasePointerCapture(id);
    wheel.classList.remove('dragging');
    paintAngle(angle);
  }
  function chooseGoal(index) {
    cancelTurn();
    let delta = (index - selected + 3) % 3;
    if (delta === 2) delta = -1;
    angle -= delta * 120;
    selected = index;
    paintGoal(true);
  }
  letters.forEach((button, index) => on(button, 'click', () => { if (!suppressWheelClick) chooseGoal(index); }));
  names.forEach((button, index) => on(button, 'click', () => chooseGoal(index)));
  on(one('[data-prev]'), 'click', () => chooseGoal((selected + 2) % 3));
  on(one('[data-next]'), 'click', () => chooseGoal((selected + 1) % 3));
  on(wheel, 'keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    chooseGoal((selected + (event.key === 'ArrowRight' ? 1 : 2)) % 3);
  });
  function point(event) {
    const rect = wheel.getBoundingClientRect();
    return Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - rect.left - rect.width / 2) * 180 / Math.PI;
  }
  on(wheel, 'pointerdown', event => {
    if (event.button !== 0 || turn) return;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(rotor).transform);
    const visible = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    turn = { id: event.pointerId, previous: point(event), travel: 0, base: visible + 360 * Math.round((angle - visible) / 360), dragged: false };
    suppressWheelClick = false;
    wheel.classList.add('dragging');
    paintAngle(turn.base);
  });
  on(wheel, 'pointermove', event => {
    if (event.pointerId !== turn?.id) return;
    const next = point(event);
    let delta = next - turn.previous;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    turn.travel += delta;
    turn.previous = next;
    if (Math.abs(turn.travel) > 6) { turn.dragged = true; wheel.setPointerCapture(event.pointerId); }
    if (turn.dragged && !motion.matches) paintAngle(turn.base + turn.travel);
  });
  function releaseWheel(event, cancelled = false) {
    if (event.pointerId !== turn?.id) return;
    const ended = turn;
    turn = null;
    if (wheel.hasPointerCapture(event.pointerId)) wheel.releasePointerCapture(event.pointerId);
    wheel.classList.remove('dragging');
    if (ended.dragged && !cancelled) {
      angle = Math.round((ended.base + ended.travel) / 120) * 120;
      selected = ((Math.round(-angle / 120) % 3) + 3) % 3;
      paintGoal(true);
    } else paintAngle(angle);
    if (ended.dragged) {
      suppressWheelClick = true;
      later(() => { suppressWheelClick = false; }, 0);
    }
  }
  on(wheel, 'pointerup', event => releaseWheel(event));
  on(wheel, 'pointercancel', event => releaseWheel(event, true));
  on(wheel, 'lostpointercapture', event => releaseWheel(event, true));
  paintGoal();
  cleanups.push(cancelTurn);

  const testing = one('.testing-preview');
  on(one('[data-show-ambiguity]'), 'click', () => {
    testing.classList.add('is-demonstrating');
    testing.querySelector('.ambiguity-caption').textContent = 'Five days this week, or five in a row? Illustration of the issue found in testing.';
    animate(testing.querySelector('.testing-highlight'), [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0)' }], 420);
  });

  // Compare genuine screenshots. The slider is only relevant to the wording revision.
  const versions = {
    tested: ['Tested version', '“String together 5 days this week and you’re on a streak” mixed a consecutive-day term with a rule that allowed missed days.', 'Mid-fidelity screen recorded in the refinement page.', 'Tested weekly explanation: string together five days and you are on a streak.'],
    revised: ['Wording revised', 'The revision names the five-day target directly and explicitly says the days do not need to be in a row.', 'Documented wording revision, before the final visual treatment.', 'Revised weekly explanation: work towards five days this week; you do not need five days in a row.'],
    final: ['Final design', 'The finished screen carries the clearer rule into the dark-mode design, with the weekly bonus explained alongside it.', 'Final colour prototype. Delivered design, not evidence of a successful retest.', 'Final dark-mode screen: reach your personal goal on five days this week; they do not need to be consecutive.']
  };
  const weekly = one('.weekly-images'), revised = one('[data-weekly-image="revised"]'), finalImage = one('[data-weekly-image="final"]');
  const slider = one('#hh-revision-reveal'), divider = one('.comparison-divider');
  const weeklyButtons = all('[data-weekly]');
  weekly.setAttribute('role', 'img');
  weekly.setAttribute('aria-label', versions.tested[3]);
  all('[data-weekly-image]').forEach(image => { image.alt = ''; });
  const fullLink = document.createElement('a');
  fullLink.className = 'weekly-full-link case-study-expandable';
  fullLink.textContent = 'Open the weekly screen at full size';
  fullLink.href = one('[data-weekly-image="tested"]').getAttribute('src');
  one('.weekly-figure').append(fullLink);
  function scrub() {
    revised.style.clipPath = `inset(0 ${100 - Number(slider.value)}% 0 0)`;
    divider.style.left = `${slider.value}%`;
    slider.setAttribute('aria-valuetext', `${slider.value} percent revised wording visible`);
  }
  weeklyButtons.forEach(button => on(button, 'click', () => {
    const key = button.dataset.weekly, version = versions[key];
    pressed(weeklyButtons, button);
    weekly.classList.remove('scrubbing');
    one('.reveal-control').hidden = key !== 'revised';
    divider.hidden = key !== 'revised';
    finalImage.style.clipPath = key === 'final' ? 'inset(0)' : 'inset(0 100% 0 0)';
    slider.value = key === 'tested' ? '0' : '100';
    scrub();
    weekly.setAttribute('aria-label', version[3]);
    one('.weekly-version').textContent = version[0];
    one('.weekly-description').textContent = version[1];
    one('.weekly-caption').textContent = version[2];
    fullLink.href = one(`[data-weekly-image="${key}"]`).getAttribute('src');
  }));
  on(slider, 'input', () => { weekly.classList.add('scrubbing'); scrub(); });
  on(slider, 'change', () => weekly.classList.remove('scrubbing'));

  const changes = [
    ['Five of seven sessions revealed confusion about how daily status was calculated.', 'Added explanations of active times during onboarding and routes to review those times.'],
    ['Six of seven sessions exposed unclear weekly-success criteria, especially “streaks”.', 'Replaced the main terminology with active days and weeks, and explained that five days need not be consecutive.'],
    ['Four of seven sessions revealed a need for more control over notifications.', 'Added automatic, manual and disabled modes, with reminder-level and pause controls.']
  ];
  const topics = all('[data-topic]');
  topics.forEach((button, index) => on(button, 'click', () => {
    pressed(topics, button);
    one('.revision-content').querySelectorAll('p').forEach((paragraph, i) => { paragraph.textContent = changes[index][i]; });
  }));

  const delivery = one('.delivery-preview'), journey = one('[data-show-journey]');
  const deliveredFigures = [...delivery.querySelectorAll('figure')];
  const journeyLabels = ['A personalised starting goal.', 'Daily status and remaining effort.', 'A weekly review that allows missed days.'];
  let journeyTimer, journeyIndex = 0;
  function stopJourney() { cancelLater(journeyTimer); journey.textContent = 'Replay the final journey'; }
  function wholeJourney() {
    stopJourney();
    deliveredFigures.forEach(figure => figure.classList.add('is-current'));
    delivery.querySelector('.delivery-caption').textContent = 'Personalised goal → daily guidance → weekly review. Final prototype; behavioural impact not yet validated.';
  }
  function journeyStep() {
    deliveredFigures.forEach((figure, index) => figure.classList.toggle('is-current', index === journeyIndex));
    delivery.querySelector('.delivery-caption').textContent = `${journeyLabels[journeyIndex]} Final prototype; behavioural impact not yet validated.`;
    if (journeyIndex < 2) { journeyIndex++; journeyTimer = later(journeyStep, 650); }
    else stopJourney();
  }
  on(journey, 'click', () => {
    stopJourney();
    if (motion.matches) { wholeJourney(); return; }
    journey.textContent = 'Restart the final journey';
    journeyIndex = 0;
    journeyStep();
  });
  cleanups.push(stopJourney);
  on(motion, 'change', () => {
    if (!motion.matches) return;
    cancelTurn();
    all('*').forEach(element => element.getAnimations().forEach(animation => animation.cancel()));
    wholeJourney();
    revealQuotes(quoteOpen);
  });
  if (motion.matches) wholeJourney();

  // Use the site's existing image viewer, including images introduced by enhancement.
  const dialog = document.querySelector('.case-study-lightbox');
  const dialogImage = dialog?.querySelector('img');
  let imageTrigger;
  if (dialog) {
    all('img:not(.persona-illustration img):not(.weekly-images img)').forEach(image => {
      const link = document.createElement('a');
      link.href = image.getAttribute('src');
      link.className = 'case-study-expandable';
      link.setAttribute('aria-label', `Open full-size image: ${image.alt}`);
      image.before(link);
      link.append(image);
    });
    on(study, 'click', event => {
      const link = event.target.closest('a.case-study-expandable');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      imageTrigger = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector('img')?.alt || weekly.getAttribute('aria-label');
      dialog.showModal();
      document.body.classList.add('lightbox-open');
    });
    on(dialog, 'close', () => { document.body.classList.remove('lightbox-open'); imageTrigger?.focus(); });
  }
  on(document, 'visibilitychange', () => { if (document.hidden) { stopPersona(); stopJourney(); } });
  on(window, 'pagehide', event => {
    cleanups.forEach(cleanup => cleanup());
    if (!event.persisted) lifecycle.abort();
  });
  study.classList.add('is-enhanced');
})();
