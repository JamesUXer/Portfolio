(() => {
  const button = document.querySelector('.demo-toggle');
  const controls = document.querySelector('.demo-comparison-controls');
  const versions = [...controls.querySelectorAll('[data-version]')];
  const panels = [...document.querySelectorAll('.demo-comparison-panel')];
  const resetPreview = () => {
    document.body.classList.remove('is-previewing');
    button.setAttribute('aria-pressed', 'false');
    button.textContent = 'Preview hover state';
  };
  const select = version => {
    resetPreview();
    versions.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.version === version)));
    panels.forEach(panel => {
      panel.hidden = panel.id !== `${version}-card`;
      panel.inert = panel.hidden;
    });
  };
  controls.hidden = false;
  button.hidden = false;
  select('shipped');
  versions.forEach(item => item.addEventListener('click', () => select(item.dataset.version)));
  controls.addEventListener('keydown', event => {
    const index = versions.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = 1 - index;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = 1;
    if (next === undefined) return;
    event.preventDefault();
    versions[next].focus();
    select(versions[next].dataset.version);
  });
  button.addEventListener('click', () => {
    const active = document.body.classList.toggle('is-previewing');
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? 'Show front of card' : 'Preview hover state';
  });
  const reportSize = () => parent.postMessage({type: 'ac-service-card-size', height: Math.ceil(document.body.getBoundingClientRect().height) + 8}, location.origin);
  new ResizeObserver(reportSize).observe(document.body);
  reportSize();
})();
