/* Progressive enhancement: every authentic example stays readable without JavaScript. */
(() => {
  const explorer = document.querySelector('[data-scenario-explorer]');
  if (!explorer) return;
  const controls = explorer.querySelector('[data-scenario-controls]');
  const buttons = [...controls.querySelectorAll('button[aria-controls]')];
  const panels = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
  const status = explorer.querySelector('[data-scenario-status]');
  if (panels.some(panel => !panel)) return;
  function select(index) {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    select(index);
    status.textContent = `Showing ${button.textContent.trim().toLowerCase()}.`;
  }));
  select(0);
  controls.hidden = false;
})();
