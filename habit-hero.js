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

  // These original screens share the same canvas and fixed visual positions.
  // Keep the labelled figures as the fallback; enhance only this matched pair.
  const weekly = one('.weekly-example');
  const slider = one('#hh-revision-reveal');
  const weeklyButtons = all('[data-weekly-position]');
  function scrub() {
    const value = Math.max(0, Math.min(100, Number(slider.value)));
    weekly.style.setProperty('--weekly-split', `${value}%`);
    slider.setAttribute('aria-valuetext', `${value}% tested, ${100 - value}% revised`);
    weeklyButtons.forEach(button => {
      const position = Number(button.dataset.weeklyPosition);
      button.setAttribute('aria-pressed', String(position === 50 ? value > 0 && value < 100 : value === position));
    });
  }
  weeklyButtons.forEach(button => on(button, 'click', () => {
    slider.value = button.dataset.weeklyPosition;
    scrub();
  }));
  on(slider, 'input', scrub);
  scrub();
  weekly.classList.add('is-ready');

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
    all('*').forEach(element => element.getAnimations().forEach(animation => animation.cancel()));
    wholeJourney();
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
      dialogImage.alt = link.dataset.imageAlt || link.querySelector('img')?.alt || '';
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
