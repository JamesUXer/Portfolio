/* A route-to-decision explorer with supporting sources in native disclosures. */
(() => {
  'use strict';
  const explorer = document.querySelector('[data-ac-explorer]');
  if (!explorer) return;
  const controls = explorer.querySelector('.ac-explorer-controls');
  const buttons = [...explorer.querySelectorAll('[data-ac-choice]')];
  const views = [...explorer.querySelectorAll('[data-ac-view]')];
  const stage = explorer.querySelector('.ac-explorer-stage');
  const status = explorer.querySelector('.ac-explorer-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const choices = new Set(buttons.map(button => button.dataset.acChoice));
  if (choices.size !== 3 || views.length !== 6) return;

  let selected = 'need';
  function select(choice, announce = true) {
    if (!choices.has(choice)) return;
    selected = choice;
    views.forEach(view => {
      const inactive = view.dataset.acView !== choice;
      view.setAttribute('aria-hidden', String(inactive));
      view.inert = inactive;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.acChoice === choice)));
    explorer.dataset.acSelected = choice;
    if (announce) {
      const label = buttons.find(button => button.dataset.acChoice === choice).textContent;
      status.textContent = `${label}. The highlighted route and design response are shown below. The source reveal follows the same selection.`;
      stage.getAnimations().forEach(animation => animation.cancel());
      if (!motion.matches && stage.animate) {
        stage.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 180, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    }
  }

  explorer.classList.add('ac-explorer-ready');
  select(selected, false);
  controls.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.acChoice !== selected) select(button.dataset.acChoice);
  }));
  controls.addEventListener('keydown', event => {
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    buttons[next].focus();
    select(buttons[next].dataset.acChoice);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) stage.getAnimations().forEach(animation => animation.cancel());
  });
})();

/* The surrounding exhibits share selection and keyboard behaviour. */
(() => {
  'use strict';
  document.querySelectorAll('[data-ac-switch]').forEach(exhibit => {
    const controls = exhibit.querySelector('[data-ac-controls]');
    const buttons = [...exhibit.querySelectorAll('[data-ac-option]')];
    const panels = [...exhibit.querySelectorAll('[data-ac-panel]')];
    const highlights = [...exhibit.querySelectorAll('[data-ac-highlight]')];
    const choices = new Set(buttons.map(button => button.dataset.acOption));
    if (!controls || !choices.has(exhibit.dataset.acDefault) || !panels.length) return;
    const status = document.createElement('p');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    exhibit.append(status);
    function select(choice, announce = true) {
      if (!choices.has(choice)) return;
      exhibit.dataset.acSelection = choice;
      panels.forEach(panel => {
        const inactive = !panel.dataset.acPanel.split(' ').includes(choice);
        panel.setAttribute('aria-hidden', String(inactive));
        panel.inert = inactive;
      });
      highlights.forEach(node => node.classList.toggle('is-emphasised', node.dataset.acHighlight === choice));
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.acOption === choice)));
      if (announce) status.textContent = `${buttons.find(button => button.dataset.acOption === choice).textContent} selected.`;
    }
    exhibit.classList.add('ac-switch-ready');
    select(exhibit.dataset.acDefault, false);
    controls.hidden = false;
    buttons.forEach(button => button.addEventListener('click', () => {
      if (button.dataset.acOption !== exhibit.dataset.acSelection) select(button.dataset.acOption);
    }));
    controls.addEventListener('keydown', event => {
      const index = buttons.indexOf(document.activeElement);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus();
      select(buttons[next].dataset.acOption);
    });
  });
})();

/* Only the local component frame can resize its comparison area. */
(() => {
  const frame = document.querySelector('.ac-live-card iframe');
  if (!frame) return;
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow || event.data?.type !== 'ac-service-card-size') return;
    const height = event.data.height;
    if (Number.isFinite(height) && height >= 200 && height <= 700) frame.style.height = `${height}px`;
  });
})();
