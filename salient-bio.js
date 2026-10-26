/* Progressive enhancements: the complete story and evidence remain in the HTML. */
(() => {
  'use strict';
  const study = document.getElementById('salient-study');
  if (!study) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(.16,1,.3,1)';
  const settleLayouts = new Set();
  const resizeTasks = new Set();
  const pressed = (buttons, selected) => buttons.forEach(button => {
    button.setAttribute('aria-pressed', String(button === selected));
  });

  // Native details remain usable without JS. Each animation starts from its
  // current rendered height, so a second click reverses rather than queues it.
  study.querySelectorAll('.salient-story-detail').forEach(details => {
    const summary = details.querySelector('summary');
    let running = null;
    let intended = details.open;
    const settle = () => {
      if (running) { running.onfinish = null; running.cancel(); }
      running = null;
      details.open = intended;
      details.style.height = '';
      details.style.overflow = '';
      summary.setAttribute('aria-expanded', String(intended));
    };
    summary.setAttribute('aria-expanded', String(intended));
    summary.addEventListener('click', event => {
      if (motion.matches || !details.animate) return;
      event.preventDefault();
      const from = details.getBoundingClientRect().height;
      intended = !intended;
      if (running) { running.onfinish = null; running.cancel(); }
      details.style.height = '';
      details.style.overflow = 'clip';
      details.open = true;
      // Include the disclosure borders in the closed height.
      const style = getComputedStyle(details);
      const borders = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      const target = intended ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + borders;
      summary.setAttribute('aria-expanded', String(intended));
      if (!intended && details.contains(document.activeElement)) summary.focus();
      running = details.animate([{ height: `${from}px` }, { height: `${target}px` }], {
        duration: intended ? 320 : 210, easing, fill: 'both'
      });
      running.onfinish = settle;
    });
    details.addEventListener('toggle', () => {
      if (!running) { intended = details.open; summary.setAttribute('aria-expanded', String(intended)); }
    });
    settleLayouts.add(settle);
  });

  const model = study.querySelector('[data-architecture-model]');
  if (model) {
    const explorer = model.querySelector('.salient-route-explorer');
    const explanation = model.querySelector('.salient-route-explanation');
    const controls = [...model.querySelectorAll('[data-route-choice]')];
    const routes = [...model.querySelectorAll('[data-architecture-route]')];
    const explanations = {
      all: 'Guided patient journeys, clinician resources and search provide different routes through the same Learn Hub.',
      patient: 'The patient route groups information by testing stage: considering a test, taking it, and understanding results and next steps.',
      clinician: 'The professional route brings together credibility, methods, suitability, evidence and resources for interpreting results and supporting patients.',
      search: 'Search and direct access provide a cross-cutting route to specific information for people who know what they need.'
    };
    if (explorer && explanation && controls.length === 4 && routes.length === 3) {
      // An off-screen copy reserves the longest explanation at the actual width,
      // without cycling through text in the live region or moving the next section.
      const measureExplanation = () => {
        const probe = document.createElement('p');
        probe.className = 'salient-route-explanation salient-route-measure';
        probe.setAttribute('aria-hidden', 'true');
        probe.style.width = `${explanation.getBoundingClientRect().width}px`;
        model.append(probe);
        let height = 0;
        Object.values(explanations).forEach(text => {
          probe.textContent = text;
          height = Math.max(height, probe.getBoundingClientRect().height);
        });
        probe.remove();
        explanation.style.minHeight = `${Math.ceil(height)}px`;
      };
      const selectRoute = choice => {
        if (!Object.prototype.hasOwnProperty.call(explanations, choice) || model.dataset.activeRoute === choice) return;
        pressed(controls, controls.find(control => control.dataset.routeChoice === choice));
        routes.forEach(route => route.classList.toggle('is-route-highlighted', route.dataset.architectureRoute === choice));
        explanation.textContent = explanations[choice];
        model.dataset.activeRoute = choice;
      };
      controls.forEach(control => control.addEventListener('click', () => selectRoute(control.dataset.routeChoice)));
      // Initialise silently, before exposing the controls and live explanation.
      model.dataset.activeRoute = 'all';
      explorer.hidden = false;
      explanation.hidden = false;
      measureExplanation();
      resizeTasks.add(measureExplanation);
    }
  }

  study.querySelectorAll('[data-comparison]').forEach((pair, index) => {
    const figures = [...pair.children].filter(child => child.tagName === 'FIGURE');
    if (figures.length !== 2) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'salient-guided-comparison';
    pair.before(wrapper);
    wrapper.append(pair);
    pair.id = `salient-comparison-${index + 1}`;
    const toolbar = document.createElement('div');
    toolbar.className = 'salient-comparison-controls';
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', `Compare ${pair.dataset.comparison.toLowerCase()}`);
    const buttons = ['Earlier', 'Revision', 'Both'].map((label, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.comparisonChoice = ['earlier', 'revision', 'both'][i];
      button.setAttribute('aria-controls', pair.id);
      button.setAttribute('aria-pressed', String(i === 2));
      toolbar.append(button);
      return button;
    });
    wrapper.prepend(toolbar);
    pair.dataset.view = 'both';
    let running = null;
    let reveals = [];
    const settle = () => {
      if (running) { running.onfinish = null; running.cancel(); }
      running = null;
      reveals.forEach(animation => animation.cancel());
      reveals = [];
      pair.style.height = '';
      pair.style.overflow = '';
    };
    const selectView = choice => {
      if (pair.dataset.view === choice) return;
      // Finish a parent disclosure transition before measuring its new contents.
      const from = pair.getBoundingClientRect().height;
      settleLayouts.forEach(finish => finish());
      settle();
      pair.dataset.view = choice;
      figures.forEach((figure, i) => { figure.hidden = choice !== 'both' && i !== (choice === 'earlier' ? 0 : 1); });
      pressed(buttons, buttons.find(button => button.dataset.comparisonChoice === choice));
      const target = pair.getBoundingClientRect().height;
      if (!motion.matches && pair.animate) {
        pair.style.overflow = 'clip';
        reveals = figures.filter(figure => !figure.hidden).map(figure => {
          const image = figure.querySelector('.salient-figure-frame, .salient-exhibit-link');
          return image?.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 200, easing });
        }).filter(Boolean);
        running = pair.animate([{ height: `${from}px` }, { height: `${target}px` }], { duration: 200, easing, fill: 'both' });
        running.onfinish = settle;
      }
    };
    buttons.forEach(button => button.addEventListener('click', () => selectView(button.dataset.comparisonChoice)));
    settleLayouts.add(settle);
  });

  // Resize and preference changes settle to the intended state, without stale
  // inline heights. No animation, timer or observer runs while the page is idle.
  let resizeFrame;
  const refresh = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      settleLayouts.forEach(settle => settle());
      resizeTasks.forEach(task => task());
    });
  };
  window.addEventListener('resize', refresh, { passive: true });
  window.addEventListener('pageshow', refresh);
  motion.addEventListener('change', refresh);
  document.fonts?.ready.then(refresh);
  document.fonts?.addEventListener('loadingdone', refresh);
})();
