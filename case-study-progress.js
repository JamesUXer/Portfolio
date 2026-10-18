/* Decorative article progress. No indicator or layout dependency without JavaScript. */
(() => {
  'use strict';
  const article = document.querySelector('article[data-reading-progress]');
  if (!article || document.querySelector('.case-study-reading-progress')) return;

  const header = document.querySelector('.site-header');
  const indicator = document.createElement('div');
  indicator.className = 'case-study-reading-progress';
  indicator.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('span');
  indicator.append(fill);
  document.body.append(indicator);
  let pendingFrame = 0;

  function update() {
    pendingFrame = 0;
    const viewportHeight = window.innerHeight;
    let headerInset = 0;
    if (header) {
      const position = getComputedStyle(header).position;
      const headerRect = header.getBoundingClientRect();
      if (position === 'fixed' || (position === 'sticky' && headerRect.top <= 0)) {
        headerInset = Math.min(viewportHeight, Math.max(0, headerRect.bottom));
      }
    }
    const rect = article.getBoundingClientRect();
    // Zero at article top = reading-area top; full at article bottom = viewport bottom.
    const distance = rect.height - (viewportHeight - headerInset);
    let progress = 0;
    if (rect.height > 0) {
      // A short article has no scrollable reading interval. Complete once its top passes.
      progress = distance > 0 ? (headerInset - rect.top) / distance : (rect.top < headerInset ? 1 : 0);
    }
    progress = Math.max(0, Math.min(1, progress));
    indicator.style.top = `${headerInset}px`;
    fill.style.transform = `scaleX(${progress})`;
  }

  function schedule() {
    if (!pendingFrame) pendingFrame = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('load', schedule, { once: true });
  window.visualViewport?.addEventListener('resize', schedule);
  // Capturing load/error also covers lazy images, which do not bubble load events.
  article.addEventListener('load', schedule, true);
  article.addEventListener('error', schedule, true);
  article.addEventListener('toggle', schedule, true);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    if (header) observer.observe(header);
  }
  if (document.fonts) {
    document.fonts.ready.then(schedule);
    document.fonts.addEventListener('loadingdone', schedule);
  }
  schedule();
})();
