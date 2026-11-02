/* Public illustration only. No recording, persistence or submission. */
(() => {
  'use strict';
  const host = document.getElementById('testing-journeys-content');
  const stageButtons = [...host.querySelectorAll('[data-testing-step]')];
  const contexts = [...host.querySelectorAll('[data-testing-context]')];
  const previous = document.getElementById('testing-previous');
  const next = document.getElementById('testing-next');
  const play = document.getElementById('testing-play');
  const content = document.getElementById('testing-stage-content');
  const status = document.getElementById('testing-status');
  let context = 'classroom', step = 0, active = false, reduced = false, timer = null;
  const examples = {
    classroom: {
      task:'Round 86,000 to the nearest 10,000. Move the marker before choosing your answer.',
      stages:[
        ['Start with a focused task.', '<p class="testing-large-prompt">Where does <strong>86,000</strong> sit?</p><div class="testing-task-route"><span>Read the number</span><svg viewBox="0 0 100 30" aria-hidden="true"><path d="M3 20 Q48 -5 92 15 M83 6 L92 15 L80 21"/></svg><span>Place your estimate</span></div><p>A rounding activity gives the child something concrete to try.</p>', 'Keep the task beside the activity.', 'I set the task and chose what evidence to gather, then built a testing environment around the games with AI coding assistance.', 'Children could work independently while I gathered usability research.'],
        ['Move before choosing.', '<p>Round <strong>86,000</strong> to the nearest <strong>10,000</strong>.</p><label class="testing-range-label" for="testing-estimate">Place your estimate: <output id="testing-estimate-value">85,000</output></label><div class="testing-numberline"><input id="testing-estimate" type="range" min="80000" max="90000" step="1000" value="85000"><div aria-hidden="true"><span>80,000</span><span>85,000</span><span>90,000</span></div></div><p class="testing-small" id="testing-move-hint">The marker starts halfway. Move it to unlock the choices.</p><div class="testing-answer-options"><button type="button" data-round-choice="80000" disabled>80,000</button><button type="button" data-round-choice="90000" disabled>90,000</button></div><p id="testing-choice-status" class="testing-small" role="status">Illustrative activity, not a recorded pupil session.</p>', 'Make the thinking visible.', 'Some children were answering without estimating. I added the number-line step so they had to position the marker before confirming an answer.', 'A correct answer alone did not show how the child reached it.'],
        ['Ask one useful question.', '<p class="testing-large-prompt">Which part felt unclear?</p><div class="testing-example-response"><span>Example response</span><strong>Moving the marker</strong></div><p class="testing-small">Fictional wording and response. Nothing is submitted.</p>', 'Decide what evidence the question needs.', 'I used short questions to understand what children found difficult and how they felt about the activity.', 'The questions took too long. Some children were losing concentration.'],
        ['Read the evidence together.', '<dl class="testing-reader"><div><dt>Task check</dt><dd>Chose 90,000.</dd></div><div><dt>Researcher observation</dt><dd>Paused before moving the marker.</dd></div><div><dt>Pupil feedback</dt><dd>“Moving the marker” felt unclear.</dd></div></dl><p class="testing-small">One fictional example, not a real pupil record or an automatic activity log.</p>', 'Next time: ask less.', 'Compare the task check, what I observed and what the pupil said. Each tells me something different.', 'Fewer, more focused questions would make each test easier to complete and more useful for the next small design change.']
      ]
    },
    prototype: {
      task:'Review this proposed audience. What information do you think it is based on?',
      stages:[
        ['Give the activity a context.', '<p class="testing-large-prompt">Review a proposed audience.</p><p>The task stays available while the participant explores a simplified prototype.</p><p class="testing-small">This is a fictional example of the study structure, not client software.</p>', 'Keep the task beside the experience.', 'I designed the study structure, task prompts and activity boundaries around the question I wanted to investigate.', 'The prompt asks for an explanation, rather than treating completion as evidence of understanding.'],
        ['Inspect the proposal.', '<div class="testing-proposal"><h3>Proposed audience</h3><p>People working in product design</p><dl><div><dt>Role</dt><dd>Product designer</dd></div><div><dt>Organisation</dt><dd>Design studio</dd></div></dl><details><summary>Inspect source</summary><p>Fictional project brief: an event for product designers working in design studios.</p></details></div>', 'Make the explanation inspectable.', 'A participant can inspect the source, then explain what they think the proposal is based on.', 'Opening an explanation is an action. It does not establish that someone understood it.'],
        ['Bring the session back.', '<div class="testing-example-response"><span>Sample answer</span><strong>The uploaded brief.</strong></div><p>Sample confidence: <strong>4 out of 5</strong></p><details class="testing-handover"><summary>See the sample handover</summary><p>The participant returns a results code. I import it into a separate reader.</p><code>DEMO · SESSION · EXAMPLE</code><p class="testing-small">Illustrative code only. Nothing is sent from this page.</p></details>', 'Make the handover explicit.', 'In the professional study, participants returned a results code for import into a reader. Results became available once returned, rather than streaming to a live dashboard.', 'The sample answer and confidence rating here are fictional.'],
        ['Read answers alongside actions.', '<dl class="testing-reader"><div><dt>Recorded action</dt><dd>Opened “Inspect source”.</dd></div><div><dt>Answer</dt><dd>The uploaded brief.</dd></div><div><dt>Confidence</dt><dd>4 out of 5.</dd></div></dl><p class="testing-small">Fictional imported session. This page does not record your interactions.</p>', 'Confidence needs context.', 'The reader gives analysis a traceable starting point. Compare the answer with the recorded sequence, then interpret both in context.', 'A confident answer and an opened explanation still need interpretation.']
      ]
    }
  };
  function setText(id, value) { document.getElementById(id).textContent = value; }
  function playbackLabel() {
    play.disabled = reduced;
    play.textContent = reduced ? 'Use the manual stages' : timer ? 'Pause walkthrough' : step === 3 ? 'Replay walkthrough' : 'Play walkthrough';
    play.setAttribute('aria-pressed', String(Boolean(timer)));
  }
  function stop() { if (timer) clearInterval(timer); timer = null; playbackLabel(); }
  function render() {
    const example = examples[context], scene = example.stages[step];
    host.dataset.context = context;
    host.dataset.step = String(step);
    setText('testing-task-copy', example.task);
    setText('testing-stage-title', scene[0]);
    content.innerHTML = scene[1]; // Authored static templates, never visitor input.
    setText('testing-decision-title', scene[2]);
    setText('testing-decision-copy', scene[3]);
    setText('testing-reflection', scene[4]);
    document.getElementById('testing-classroom-reference').hidden = context !== 'classroom';
    document.getElementById('testing-case-study').hidden = context !== 'prototype';
    contexts.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.testingContext === context)));
    stageButtons.forEach((button, index) => {
      if (index === step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    previous.disabled = step === 0;
    next.disabled = step === 3;
    status.textContent = `Stage ${step + 1} of 4: ${stageButtons[step].textContent}. ${context === 'classroom' ? 'Classroom' : 'Prototype research'}.`;
    playbackLabel();
  }
  function select(index) { stop(); step = index; render(); }
  stageButtons.forEach((button, index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (step + 1) % 4;
      if (event.key === 'ArrowLeft') target = (step + 3) % 4;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = 3;
      if (target === undefined) return;
      event.preventDefault(); select(target); stageButtons[target].focus();
    });
  });
  contexts.forEach(button => button.addEventListener('click', () => {
    stop(); context = button.dataset.testingContext; step = 0; render();
  }));
  previous.addEventListener('click', () => select(Math.max(0, step - 1)));
  next.addEventListener('click', () => select(Math.min(3, step + 1)));
  play.addEventListener('click', () => {
    if (timer) { stop(); return; }
    if (!active || reduced) return;
    if (step === 3) step = 0;
    timer = setInterval(() => {
      if (!active || reduced || document.hidden) { stop(); return; }
      step = Math.min(3, step + 1); render();
      if (step === 3) stop();
    }, 6500);
    render();
  });
  // Exploring an example pauses the demonstration so it cannot move away mid-task.
  content.addEventListener('pointerdown', stop);
  content.addEventListener('keydown', stop);
  content.addEventListener('input', event => {
    if (event.target.id !== 'testing-estimate') return;
    stop();
    setText('testing-estimate-value', Number(event.target.value).toLocaleString('en-GB'));
    content.querySelectorAll('[data-round-choice]').forEach(button => { button.disabled = false; });
    setText('testing-move-hint', 'Now choose the nearest 10,000.');
  });
  content.addEventListener('click', event => {
    const choice = event.target.closest('[data-round-choice]');
    if (!choice) return;
    content.querySelectorAll('[data-round-choice]').forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
    setText('testing-choice-status', `Example choice: ${Number(choice.dataset.roundChoice).toLocaleString('en-GB')}. Nothing is submitted.`);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.playgroundTesting = Object.freeze({
    setActive(value) { active = Boolean(value); if (!active) stop(); },
    setReducedMotion(value) { reduced = Boolean(value); if (reduced) stop(); else playbackLabel(); }
  });
  render();
})();
