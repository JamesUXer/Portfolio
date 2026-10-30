/* Explain two authentic interaction states. Both remain available without JavaScript. */
(() => {
  const evidence = document.querySelector('[data-interaction-evidence]');
  if (!evidence) return;
  const controls = evidence.querySelector('[data-state-controls]');
  const buttons = [...controls.querySelectorAll('button[aria-controls]')];
  const panels = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
  const status = evidence.querySelector('[data-state-status]');
  if (panels.some(panel => !panel)) return;
  function show(index) {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    show(index);
    status.textContent = `Showing ${button.textContent.trim().toLowerCase()}.`;
  }));
  show(0);
  controls.hidden = false;
})();
