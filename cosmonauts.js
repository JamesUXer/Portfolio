/* Static stories remain readable if this enhancement is unavailable. */
(() => {
  'use strict';
  const explorer = document.querySelector('[data-evidence-explorer]');
  if (!explorer) return;
  const rail = explorer.querySelector('.evidence-tabs');
  const tabs = [...rail.querySelectorAll('button')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (!tabs.length || panels.some(panel => !panel)) return;
  const mobile = window.matchMedia('(max-width: 640px)');
  rail.setAttribute('role', 'tablist');
  function orient() {
    rail.setAttribute('aria-orientation', mobile.matches ? 'vertical' : 'horizontal');
  }
  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      const previousKey = mobile.matches ? 'ArrowUp' : 'ArrowLeft';
      const nextKey = mobile.matches ? 'ArrowDown' : 'ArrowRight';
      if (event.key === nextKey) next = (index + 1) % tabs.length;
      if (event.key === previousKey) next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });
  orient();
  mobile.addEventListener('change', orient);
  select(0);
  rail.hidden = false;
})();
