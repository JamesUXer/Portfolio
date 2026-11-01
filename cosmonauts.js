/* Fictional walkthrough: all example content stays in the document. No persistence or submission. */
(() => {
  'use strict';
  const tour = document.querySelector('[data-study-tour]');
  if (!tour) return;
  const rail = tour.querySelector('.tour-tabs');
  const tabs = [...rail.querySelectorAll('button')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const play = tour.querySelector('[data-tour-play]');
  const previous = tour.querySelector('[data-tour-prev]');
  const next = tour.querySelector('[data-tour-next]');
  const status = tour.querySelector('[data-tour-status]');
  if (tabs.length !== 4 || panels.some(panel => !panel)) return;
  let index = 0;
  let timer = 0;
  let playing = false;
  let completed = false;
  const labels = tabs.map(tab => tab.textContent.trim());
  rail.setAttribute('role', 'tablist');
  function stop() {
    clearTimeout(timer);
    timer = 0;
    playing = false;
    play.querySelector('span').textContent = completed ? 'Replay walkthrough' : 'Play walkthrough';
    play.querySelector('use').setAttribute('href', '#icon-play');
    play.setAttribute('aria-pressed', 'false');
  }
  function select(selected, focus = false) {
    index = selected;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    previous.disabled = index === 0;
    next.disabled = index === tabs.length - 1;
    status.textContent = `Step ${index + 1} of ${tabs.length}: ${labels[index]}`;
    if (focus) tabs[index].focus();
  }
  function advancePlayback() {
    if (!playing) return;
    if (index === tabs.length - 1) {
      completed = true;
      stop();
      status.textContent = 'Walkthrough complete. Explore any stage again.';
      return;
    }
    select(index + 1);
    timer = setTimeout(advancePlayback, 10000);
  }
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
    tab.addEventListener('click', () => { stop(); select(i); });
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      stop();
      select(target, true);
    });
  });
  play.addEventListener('click', () => {
    if (playing) { stop(); return; }
    completed = false;
    select(0);
    playing = true;
    play.querySelector('span').textContent = 'Pause walkthrough';
    play.querySelector('use').setAttribute('href', '#icon-pause');
    play.setAttribute('aria-pressed', 'true');
    timer = setTimeout(advancePlayback, 10000);
  });
  previous.addEventListener('click', () => { stop(); select(Math.max(0, index - 1)); });
  next.addEventListener('click', () => { stop(); select(Math.min(tabs.length - 1, index + 1)); });
  tour.addEventListener('toggle', stop, true);
  tour.addEventListener('focusin', event => {
    if (playing && event.target !== play) stop();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) stop();
    });
    observer.observe(tour);
  }
  select(0);
  rail.hidden = false;
  play.hidden = false;
  play.setAttribute('aria-pressed', 'false');
  tour.querySelector('.tour-footer').hidden = false;
  tour.dataset.tourReady = '';
})();
