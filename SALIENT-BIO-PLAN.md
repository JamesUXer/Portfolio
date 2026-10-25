# Salient Bio improvement plan

Updated: 21 October 2026. Baseline: current working tree, including completed opening Pass 1.

Read `SALIENT-BIO-BRIEF.md` and `SALIENT-BIO-PROGRESS.md` before each pass. This is an ordered plan, not authorisation to implement every phase at once.

## 1. Audit and evidence verification

Status: baseline inspected and conservative Pass 2 corrections complete. Task counts and exact version chronology remain recorded as unresolved; the user authorised progress with existing material.

Tasks:

- Record the existing opening, narrative sections, comparison assets, shared behaviours and validation labels.
- Resolve the distinction between personal discovery interviews, overall research cohorts and task-level usability samples.
- For every metric, record source, task, cohort, numerator/denominator, success/deviation definition and tested design version.
- Confirm which images represent tested designs, delivered concepts, later revisions and retrospective explanatory material.
- Completed in Pass 2: remove the unsupported clinician before-state label and correct the glossary description to match the existing panel. Preserve remaining chronology uncertainty; do not swap images based on filenames.
- Use concise Impeccable reviews and source checks. The previous portfolio rubric and numeric target have been retired by the user.

Acceptance criteria: each retained metric is traceable to a source and defined sample, or explicitly recorded as unresolved; no inferred counts are published. The current implementation and prior Pass 1 are distinguished from planned work. Missing evidence is a named dependency, not silently filled in.

Dependencies: original study/version records are needed only to resolve unknown facts. They may be in Figma and can be incorporated later. The user authorised continued work with existing assets and explicit uncertainty; the old rubric is no longer a dependency.

## 2. Narrative and information hierarchy

Status: Passes 3–4 complete. The user approved the IA-centred sequence and three design decisions; these have been implemented and tested locally.

Completed in Pass 3: entry/search decision headings, explicit evidence/interpretation/response groups, adjacent validation limits and a native disclosure preserving the original detailed study method and framework. Task/sample counts remain unresolved and unchanged. Keep these boundaries in subsequent work.

Keep the improved opening layout intact unless a specific change is approved. Retire the proposed search headline. Present entry points, clinician resources and search as expressions of the shared information architecture, then use testing to show how the routes needed refinement.

Acceptance criteria:

- A quick scan explains why guided routes and retrieval needed attention, what James contributed and what the team changed.
- Search success and navigation friction are presented as separate observations; causal conclusions remain interpretation.
- Revised concepts cannot be mistaken for validated outcomes.
- Methods and supporting detail remain available without dominating the main reading path.
- Any new metric labels use verified task counts and definitions; unresolved metrics are not silently rewritten or promoted.

Dependencies: relevant phase 1 evidence and explicit user approval of design decisions. Use existing supported content while sources remain unavailable; do not invent counts. Prepare reviewable proposals rather than implementing unapproved design choices.

## 3. Responsive layout

Status: opening, decision groups and Pass 4 architecture/outcome layouts tested at all requested widths/themes. The full IA uses the existing smaller preview with direct access to its original. Pass 5 focused homepage/search/glossary excerpts and complete-source links are also implemented and checked. Small embedded text and remaining whole-page release checks are outstanding; additional design changes require approval.

Tasks: review the large challenge/journey diagrams, IA image, comparison pairs and metric strip. Give artefacts a readable purpose at their actual display size. Make mobile comparisons understandable without excessive zooming. Keep enough context near every figure for readers to understand why it is present.

Acceptance criteria: check 1280 × 720, 1440 × 900, 768px and 390px widths in both themes; no accidental horizontal page overflow or clipped controls; readable headings, captions and evidence; consistent stage colours and page gutters. Opening essential context remains in the first desktop viewport. At mobile, image focus and reading order remain intentional. Include 200% zoom/reflow in final accessibility verification.

Dependencies: phase 2 content hierarchy; phase 1 image provenance. Scope changes to Salient-specific selectors before considering shared styles.

## 4. Purposeful interactions

Status: supporting/method disclosures complete; optional architecture route controls approved and implemented in Pass 6. No comparison slider, automatic playback or additional scripted interaction has been approved.

The architecture controls explain how guided patient journeys, professional resources and search/direct access serve different information needs within one structure. The full static model remains the baseline. Focused comparison figures and native disclosures already support inspection; further interactions need a concrete comprehension purpose and approval.

Acceptance criteria: each interaction has a written comprehension purpose; equivalent core content works without JavaScript, hover or animation where practical; keyboard/touch controls and visible focus work; state is communicated through native semantics or appropriate ARIA; reduced motion respected; comparison versions and validation labels remain independently accessible. Reject an interaction when a simpler static explanation works as well.

Dependencies: verified evidence and approved narrative model; readable static layout. Do not reuse Habit Hero's interaction code wholesale or add automatic playback for decoration.

## 5. Visual polish

Status: opening, IA-centred body and approved comparison-figure treatments complete. Further visual changes require approval; remaining whole-page accessibility/release checks are ready for review.

Tasks: unify heading rhythm, caption placement, stage emphasis and spacing. Reduce duplicated visual explanations. Make comparison labels consistent and specific. Produce suitable web-sized IA derivatives while preserving original assets and accurately describing their status.

Acceptance criteria: coherent with Habit Hero and existing portfolio tokens, with a distinct journey/IA-led composition; clear primary/secondary information; readable light/dark contrast (4.5:1 normal text, 3:1 large text); no unexplained mechanical detector findings; no unrelated cleanup.

Dependencies: stable hierarchy, interactions and responsive structure. Follow Impeccable's bounded inspection rounds rather than repeated open-ended polishing.

## 6. Accessibility, testing and release readiness

Status: read-only readiness audit completed on 21 October 2026. Verified keyboard-focus, contrast and shared-control resilience issues remain; a targeted hardening proposal below awaits approval. No release sign-off.

Tasks:

- Verify the requested viewport/theme matrix, keyboard navigation, skip link, mobile menu, theme/contrast controls, image viewer, reduced motion, 200% zoom and no-JavaScript fallbacks.
- Check local asset/link integrity, image dimensions/loading, browser errors and material performance risks. Confirm large diagrams use appropriate preview assets.
- Review every research/outcome claim, image status and contribution attribution against the evidence register.
- Run a concise Impeccable review, prioritising remaining issues and reader comprehension. Keep research source checks separate; no portfolio rubric or numeric target is required.
- Prepare a precise change summary and any deployment steps for review. Keep existing unrelated changes separate.

Acceptance criteria: all material issues closed or explicitly accepted; no missing evidence disguised as validation; test results recorded with scope and limitations; user can review the final local page. No commit, push or deployment occurs without the relevant instruction. Deployment approval is a final gate after the result is concrete and reviewable.

Dependencies: completed earlier phases and explicit release approval. A clean detector alone does not establish accessibility, research quality or release readiness.

## Pass protocol

For each pass: read the three documents → identify the highest-priority ready task → explain the change briefly → implement within agreed scope → verify proportionately → update progress → report changes, evidence and remaining issues.

Obtain user approval for every design decision before implementing it, following the user’s later instruction. Do not treat a request to proceed with the story as approval for unspecified layouts or interactions. Preserve current user edits and the established design system. Record assumptions as assumptions. Do not use missing sources as a reason to stop independent work that remains useful and authorised.


## IA-centred page structure: approved and implemented in Pass 4

The user approved this sequence and the three design decisions below. Pass 4 implements that scope; new changes beyond it still require approval.

| Sequence | Reader question and proposed content | Existing basis |
| --- | --- | --- |
| 1. Project and problem | What was the Learn Hub for, who needed it, and what did James contribute? Keep the compact opening and product montage | Current hero, role/team context and approved project facts |
| 2. Different information needs | Why did one linear route not suit everyone? Explain patient relevance/next-step needs and clinician evidence/depth needs without claiming a tested rejection of a specific alternative | Discovery interviews, client research review and audience evidence cards |
| 3. The architecture decision | How did the structure enable access? Put guided patient testing stages, clinician resources and cross-cutting search/direct access into one compact overview; explain James's journey/IA contribution and team translation into views | Current journey models, IA figure and Define text |
| 4. Testing and refinement | Where did people struggle to recognise or use those routes? Connect entry, retrieval and clinician findings to changes within the architecture, with personal/team responses and retest boundaries | Current Develop evidence, Pass 3 decision groups and corrected clinician captions |
| 5. Delivered concept and next tests | What was delivered, and how would testing guide further development? Name tests for patient entry, search refinement, results/next steps and clinician access | Current Outcome and the user's approved ending direction |

Approved design decisions:

- Make one static, readable architecture overview the main explanatory visual. Adapt the presentation to mobile as an ordered text model; do not rely on hover, animation or JavaScript. Any redrawn overview is labelled as an explanatory reconstruction, not an original research artefact.
- Place the full detailed architecture and secondary journey model in supporting disclosures, retaining access to the originals and an accessible text explanation. Do not show multiple full-size diagrams before the reader reaches the decision.
- Retain existing stage colours and small stage labels, while making the main headings tell the IA story. Remove the prominent four-item process rail from the main reading path.

Not approved by the Pass 4 proposal alone: additional interactions (route controls were separately approved for Pass 6), new asset provenance claims, replacement fonts/colours, invented decision alternatives, rewritten metrics or deployment. The existing opening layout and product imagery are retained.

Approval received: the user answered “Yes” to this structure and visual treatment. Scope implemented and tested at desktop/tablet/mobile in both themes. Next gate: user reviews the local result before any additional design decisions are implemented.


## Pass 5: focused comparison figures, approved and implemented

Status: the user approved the homepage example and applying its treatment to homepage/search/glossary. Implemented on 21 October 2026. The standalone draft remains at `/tmp/salient-figure-proposal.html` as a reference.

Approved and implemented scope:

- Replace full-slide previews in the homepage, search and glossary comparisons with focused interface excerpts from the same source images. Keep the complete finding/revision slide accessible by an ordinary link and preserve original files.
- Use consistent frame heights and label positions on desktop, with the complete before figure followed by the revised figure and its caption on mobile. Preserve image proportions and avoid implying equal prototype fidelity.
- Put a short change-specific explanation beneath each excerpt and retain explicit revision/retest limits. Keep existing metrics in the evidence text; do not introduce derived counts or use cropping to change their meaning.
- Retain clinician slides as concept views; do not convert them into a historical before-and-after comparison.

Homepage example: excerpt the earlier search/expandable-route region and the revised smaller search/visible-card region. The draft illustrates the proposed treatment only and does not claim a product benefit was established.

Verified all requested widths/themes, native original-slide links, image descriptions and no-JavaScript access. Source images, metrics, opening and clinician concept views were retained. No new slider, animation or scripted viewer was added. Next step: user review; conduct remaining release-readiness checks before proposing additional design changes.


## Pass 6: architecture route selection, approved and implemented

Authorisation: the user replied “Yes” to four route controls, full model visible by default, selected-route highlighting and a short explanation, with click/tap/keyboard access and a static no-JavaScript fallback.

Implemented scope:

- Four native toggle buttons: All routes, Patient journeys, Clinician resources, Search and direct access. Exactly one pressed state; All routes is the default/reset.
- Selected route receives a contrasting background and outline. Unselected content remains fully readable. No tabs, hidden panels, opacity reduction, automatic scrolling or animation.
- A concise live-status explanation updates without moving keyboard focus. Mobile explanation space is reserved to avoid model movement between the approved states.
- Controls stay hidden if the enhancement is missing; the full static model and supporting disclosures remain available. A separate small `salient-bio.js` keeps the enhancement independent of shared navigation code.

Verification: eight viewport/theme combinations, keyboard Enter/Space, touch emulation with reduced motion, repeated selection/reset, script-blocking and no-JavaScript fallbacks. All relevant state, visibility and focus checks passed; no document overflow or page errors observed. Review the implemented behaviour before proposing additional design decisions. Remaining whole-page accessibility/release checks are still pending.


## Pass 7: read-only readiness audit and proposed hardening

Status: audit complete; no implementation changes. The next fix pass requires approval.

Verified findings, in priority order:

| Priority | Finding and source | Proposed behaviour/change |
| --- | --- | --- |
| P1 | Open mobile menu lets Tab reach Back to projects and the hero link behind its full-screen overlay (`scripts.js`, menu open/close handlers around lines 146–175) | Keep keyboard focus among visible navigation/settings controls while the menu is open, including any active settings panel; Escape/close restores the menu trigger |
| P1 | “Useful”, “Efficient”, “Satisfying” labels measure 4.29:1 against their pale amber cards in light mode (`styles.css`, evidence-card source styles around line 4704) | Use the existing main text colour for these three labels, retaining amber stage accents |
| P1 | Maximum Lightness reduces multiple text contrasts below 4.5:1 in both themes, including navigation/metadata at approximately 3.19:1 dark and 3.05:1 light (`scripts.js`, display-palette mixing around lines 98–106) | Preserve readable text contrast across the lightness range while retaining the existing theme palette and default appearance |
| P2 | Blocked preference storage throws before shared controls initialise (`scripts.js:4–6`; persistence writes around lines 90/114–115) | Read/write saved settings defensively; navigation, theme and contrast controls continue using in-memory defaults when storage is unavailable |
| P2 | With JavaScript disabled, the visible mobile menu button has no usable menu; Home/project links elsewhere remain accessible (`salient-bio.html`, shared navigation setup) | Provide usable basic navigation without JavaScript and avoid presenting an ineffective menu button |

Scope proposal: fix these behaviours without a new layout, interaction animation, palette or story change. Some fixes touch shared navigation/accessibility code; regression-check Habit Hero and representative shared-navigation pages without overwriting their existing edits. Keep any fallback navigation visually consistent with the current design system.

Approval gate: user approves this targeted hardening scope before edits. Then verify default/adjusted themes, mobile keyboard navigation, no-JavaScript and denied-storage states, normal interaction behaviour and local asset/link integrity. Deployment still requires separate approval.


## Pass 8: approved hardening, implemented

The user replied “Yes” to the Pass 7 hardening proposal. Completed the five approved fixes: mobile menu focus containment/restoration, readable method labels, contrast-preserving Lightness, defensive preference storage and basic no-JavaScript navigation.

Shared navigation/settings fixes were checked on Salient and all six reference pages. Existing Habit Hero work was preserved; only shared asset cache versions changed in its HTML. No additional design decision, story change or deployment was introduced.

Verification covered the four requested viewport sizes in both themes, 30 slider combinations, 28 fresh-load shared-page contrast states, menu/settings keyboard behaviour, blocked storage, no-JavaScript links and existing Salient route/image interactions. See Pass 8 in the progress log for evidence and limits. Next gate: user review before any further design changes or deployment.


## Pass 9: remaining verification, partial browser coverage

Read-only accessibility-tree checks passed on desktop/mobile in both themes, including control labels/states, live-status semantics and background exclusion during menu/modal use. This does not constitute a VoiceOver test.

Safari WebDriver could not create a session because Safari's “Allow remote automation” setting is disabled. That setting was preserved; Safari checks remain pending until the user enables it. Other standalone test engines are not installed at the configured paths. No browser installation, implementation change or deployment was undertaken. See the progress log for evidence.


## Agreed collapsed story: presentation reset

Agreed: 21 October 2026. The user confirmed that the refined five-stage story will remain, with wording open to later refinement. The authoritative text is under “Core story” in the brief.

Keep research, information architecture and search architecture explicit. Sequence: research needs; structure around testing stages and professional needs; guided journeys alongside search; testing findings and unvalidated revisions; delivered concept and specific next tests.

The current page has not yet achieved Habit Hero's skimmable narrative with optional depth at each stage. The next step is to map the agreed first reading layer to supporting visuals and expandable evidence for user approval. No page restructuring is authorised by story approval alone. Safari/VoiceOver coverage remains pending and should not displace this presentation work.


## Pass 10: approved five-stage reading structure, implemented

The user approved the visible/expanded split and said “Great - let's do this”. The exact agreed story remains the first reading layer. Each of its five stages now has an independent, initially closed native disclosure containing the approved supporting material. Current presentation and boundaries are recorded in the brief.

Implemented in Salient HTML/scoped CSS only: compact patient/clinician needs comparison, compact reconstructed access model, earlier search excerpt and homepage comparison. Full architecture/route controls, original diagrams, testing method/results, all comparisons and validation tasks remain available inside the appropriate disclosure. Opening, shared controls/styles, assets and Habit Hero files are preserved.

Verification: four target sizes in both themes, closed/individual-open/all-open states, keyboard Enter/Space, no-JavaScript disclosure/static-model access, image-dialog focus, existing route controls, rendered text contrast and semantic references. Display headings match Habit Hero's computed typography at desktop/mobile. Collapsed document height fell from 9,605px to 3,576px at 1280px, and 15,481px to 5,272px at 390px, using the saved pre-change source as the local baseline.

Next: user reviews the collapsed story first, then the optional depth. Wording remains open to refinement while the story stays fixed. Safari and real VoiceOver coverage remain pending as documented; no commit, push or deployment.


## Pass 11: approved expanded-content refinement, implemented

The user approved the five-part refinement proposal with “yes”. The agreed collapsed story, visible supporting views and opening remain unchanged.

Research now connects existing findings to requirements. Architecture leads with the interactive access model and structural decisions, with supporting diagrams available through source links. Search explains documented decisions about active filters, suggested terms and visual result priority, with links to the earlier/revised views. Testing prose is shorter while retaining the evidence/interpretation/response/validation distinctions, all reported figures and comparisons. Proposed tasks/measures now precede reflection. Unconfirmed task-level participant counts are stated beside the figures.

Verified all four target sizes in both themes, native disclosure keyboard behaviour, existing route/image controls, text contrast, asset/reference integrity, source links and no-JavaScript use. A source comparison confirms all five visible story sections and the opening are preserved. Shared and Habit Hero files were not edited in this pass.

Next: user review of the expanded evidence, especially search. Existing research/version uncertainties and Safari/VoiceOver limits remain documented. No commit, push or deployment.


## Pass 12: visual reasoning, approved and implemented

Completed: 21 October 2026. The user authorised proceeding with the visual suggestions, with review after implementation, and rejected retrospective labels for diagrams of their own work.

Implemented in Salient HTML/scoped CSS:

- Research finding-to-requirement pairs, linked horizontally on desktop and vertically on mobile, using the existing findings and requirements.
- Connected branches in the compact architecture overview; descriptive captions replace reconstruction disclaimers in the compact and expanded access models.
- Four focused search excerpts beside the existing explanations: earlier/revised controls and earlier/revised result emphasis. Captions identify the visible changes; the leading revised image is outlined. All four open the existing image viewer and preserve access to complete original slides. The source view illustrates topic-control states; no suggested-term interface has been invented.

Verification: four target sizes in both themes, independent/native disclosures, all-open layouts, text contrast, loaded assets, semantic IDs/references, route controls and image viewer. No horizontal overflow or page errors. No-JavaScript disclosures/static model passed at 390px and 768px. Inspected desktop/mobile research, architecture and search captures; corrected desktop branch alignment in one batch. Confirmed all four new preview links with keyboard Enter, Escape and focus return at 1440px and 390px. Opening, all five visible story paragraphs and reported percentages match the pre-pass source. Impeccable detector returned [], and git diff --check passed.

Temporary verification files: /tmp/salient-visual-*. Only Salient HTML/CSS and the three planning records changed in this pass. Shared files, original image assets and Habit Hero were not edited. Existing Safari/VoiceOver and research-record uncertainties remain as previously documented. No commit, push or deployment.

Next action: review the research pairs, connected architecture overview and expanded search comparisons on the local page.


## Pass 13: visuals across the remaining stages

Completed: 21 October 2026. Authorisation: “Next step let's keep on going with visuals for each stage”.

Changes:

- Architecture: inline focused excerpt of the existing working architecture, linked to its full-resolution original. General Overview, Testing Journey, Health Library and Clinician Resources remain named in the adjacent explanation and image description.
- Testing overview: the exact quotation “It felt a little buried” from the existing homepage finding slide, linked to that source. Attribution is to the recorded homepage-testing feedback, with no invented participant identity. Existing comparison and unvalidated-revision statement retained.
- Study method: replaced the three prose cards with a connected scenario-task/three-lens diagram. Preserved all existing framework questions and measures, separating completion from route, understanding and confidence.
- Final overview: patient and clinician proposed tasks converge on common evaluation measures. This makes the fifth stage visual while preserving the agreed paragraph and explicit future-testing status.

Verification: four target sizes in both themes, collapsed/individual-open/all-open states, keyboard Enter/Space disclosures, semantic IDs/references, text contrast, loaded images and no page overflow/errors. No-JavaScript disclosures and full static model passed at 390px/768px. Original route controls and image viewer passed. The new scenario label initially measured 4.29:1 in light mode; changed it to the existing main-text token and the full matrix passed. Inspected desktop/mobile architecture, testing, study and outcome captures. Tightened the architecture crop to remove unrelated surrounding branches. Confirmed the two new source links via keyboard, Escape/focus return and no-JavaScript navigation.

Source comparisons confirm opening, five agreed story headings/paragraphs, reported percentages, shared files and all Habit Hero files preserved. All local asset links exist. No original images were modified. Impeccable detector returned [], and git diff --check passed. Temporary verification scripts/results/captures are under /tmp/salient-stage-*.

Remaining release limits are unchanged: embedded architecture text benefits from opening the original; research task counts/version chronology and Safari/VoiceOver coverage remain unresolved as previously documented. No commit, push or deployment.

Next: user review of the visuals across the five stages, especially the testing quotation and final proposed-test map.
