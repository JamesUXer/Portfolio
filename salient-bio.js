/* Progressive route highlighting; the complete architecture remains in the HTML. */
(() => {
  'use strict';

  const model = document.querySelector('[data-architecture-model]');
  if (!model) return;

  const explorer = model.querySelector('.salient-route-explorer');
  const explanation = model.querySelector('.salient-route-explanation');
  const controls = [...model.querySelectorAll('[data-route-choice]')];
  const routes = [...model.querySelectorAll('[data-architecture-route]')];
  if (!explorer || !explanation || controls.length !== 4 || routes.length !== 3) return;

  const explanations = {
    all: 'Guided patient journeys, clinician resources and search provide different routes through the same Learn Hub.',
    patient: 'The patient route groups information by testing stage: considering a test, taking it, and understanding results and next steps.',
    clinician: 'The professional route brings together credibility, methods, suitability, evidence and resources for interpreting results and supporting patients.',
    search: 'Search and direct access provide a cross-cutting route to specific information for people who know what they need.'
  };

  function selectRoute(choice) {
    if (!Object.prototype.hasOwnProperty.call(explanations, choice)) return;
    if (model.dataset.activeRoute === choice) return;

    controls.forEach(control => {
      control.setAttribute('aria-pressed', String(control.dataset.routeChoice === choice));
    });
    routes.forEach(route => {
      route.classList.toggle('is-route-highlighted', route.dataset.architectureRoute === choice);
    });
    explanation.textContent = explanations[choice];
    model.dataset.activeRoute = choice;
  }

  controls.forEach(control => {
    control.addEventListener('click', () => selectRoute(control.dataset.routeChoice));
  });

  selectRoute('all');
  explorer.hidden = false;
})();
