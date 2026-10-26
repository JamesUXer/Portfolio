# Salient Bio progress

Updated: 21 October 2026.

## Current position

Baseline/documentation and implementation Passes 1–6 complete locally. The approved IA-centred structure is implemented; opening Pass 1 remains intact. Task-level evidence gaps and body presentation remain outstanding. The user authorised continued work with existing material and retired the portfolio rubric. Nothing is release-approved.

Current next step: approve the targeted accessibility/control hardening proposal in the plan. The read-only readiness audit found menu-focus, contrast and shared-control resilience issues. All implementation remains unchanged during this audit; release sign-off is pending. Do not infer missing task counts or strengthen uncertain outcomes.

## Completed before this baseline: opening Pass 1

Files changed in the earlier pass: `salient-bio.html`; new `salient-bio.css`.

- Reduced desktop navigation header from 298px to 144px, matching Habit Hero's compact desktop convention.
- Brought project purpose, patient/clinician needs, personal role/contribution and client/team context into the opening.
- Retained the product montage and gave it a wide presentation; moved five disciplines into subordinate metadata.
- Adapted tablet content grouping and mobile image focus. The mobile montage is cropped around the central homepage, with the full composition available through the existing image link/viewer.
- Kept portfolio fonts, semantic tokens, navigation and later case-study sections intact.
- Added a caption distinguishing the concept from subsequent untested revisions.

Prior-pass verification, recorded here rather than presented as a new test run:

| Viewport | Result in light and dark modes |
| --- | --- |
| 1280 × 720 | Context ends at approximately y419; complete product image at y435–691; caption ends at y717. Essential opening fits without scrolling |
| 1440 × 900 | Context ends at approximately y419; image at y435–723; opening including disciplines ends at approximately y786 |
| 768 × 1024 | Context and full montage visible; opening ends at approximately y821 |
| 390 × 844 | Problem and focused homepage visible first; role/team begin around y730; contribution continues to approximately y952, requiring a short scroll |

Those eight combinations had no page overflow or JavaScript errors. Image viewer and theme switching were exercised. Opening text token contrast exceeded 4.5:1 in both themes. This is not full-page accessibility or performance sign-off.

## Baseline pass: actual state and documentation

Scope: read/review only for HTML, CSS, JavaScript and images. Created this file, `SALIENT-BIO-BRIEF.md` and `SALIENT-BIO-PLAN.md`. No case-study implementation edits, commits, pushes or deployment.

Inspected:

- Complete local Salient HTML and opening CSS; related shared styles, image-dialog code and reading-progress code.
- Current Habit Hero source/styles/behaviours, including finding-led headings, six native disclosures, evidence counts, comparison controls and reduced-motion handling.
- README, visible/hidden repository file inventory, recent Git history and existing Impeccable configuration. No research protocol, task-level results, portfolio rubric, previous audit report or separate implementation plan found.
- Existing Salient finding/revision/impact images by their contents, not just filenames.
- Live reference retrieval was attempted but both URLs were inaccessible through the web tool. No local/live parity claim is made.

### What is already implemented in the body

- Challenge routes and patient/clinician journey models.
- Discover/Define/Develop/Outcome structure and stage colours.
- Discovery sample, audience needs and evidence-to-design implication cards.
- Testing-method explanation, evaluation framework and headline percentages.
- Homepage, search, clinician and glossary comparisons, with revision/validation captions.
- Reflection, further-validation discussion and explicit AI-summary caveat.
- Twelve linked figures with a shared image dialog; native direct-image links when JavaScript is disabled.
- Decorative reading-progress indicator. No Salient-specific interaction script or native detail disclosures exist yet. The stage rail is descriptive, not clickable navigation.

The body is therefore a refinement task. Do not rebuild existing features from an outdated plan.

## Impeccable assessment snapshot

Method: two independent assessments, A `baseline_design_review`, B `baseline_mechanical_review`, followed by synthesis against the user's portfolio brief. Experience mode; existing implementation is visual authority.

### Strengths

- The opening now explains what the project was and what James contributed, with visible product evidence.
- Audience-specific needs provide a credible basis for an information-architecture story.
- Repeated qualifications distinguish observed usability findings from untested revisions and AI ideas.

### Priority findings

| Priority | Evidence and implication | Recommended response |
| --- | --- | --- |
| P1 | `salient-bio-clinician-home.png` is labelled an earlier unclear route, but its visible slide says “Impact: clinician support” and “Clear route to clinician support” | Confirm actual version/status; correct the pairing or label without inventing a before state |
| P1 | `salient-bio-glossary-before.png` already shows an in-context definition panel, while prose/alt text describe taking readers away | Resolve the actual interaction change and distinguish signposting from navigation behaviour |
| P1 | Large percentages have no task-level denominators. The discovery sample and the handover's seven patients/three clinicians do not establish who attempted each usability task | Obtain original task results/definitions. Use counts when verified; keep unknowns explicit |
| P2 | The distinctive collaborative contribution, reconciling competing structures, is described but alternatives and selection criteria are not demonstrated | Show one sourced decision chain and the individual/team boundary; do not invent disagreement or alternatives |
| P2 | Long prose, method repetition, two large preliminary diagrams and a prominent non-interactive process rail delay the strongest decisions | Shorten the main reading path; constrain prose measure; use optional detail where it aids comprehension |
| P2 | Full presentation slides make product details and embedded annotations difficult to inspect, especially on mobile | Compare appropriate crops at consistent scale; retain original artefacts and their status context |
| P2 | The IA “full size” dialog can make the diagram smaller: desktop inline approximately 1183 × 1219 versus approximately 515 × 531 in the inspected dialog | Provide a useful original/detail route and reassess fitting behaviour; avoid “full size” labels that overpromise |
| P2 | IA original is 15036 × 15492px (2,975,550 bytes). Mobile preview is 3759 × 3873px, but the dialog uses the large original | Create appropriate preview exports later; preserve the original. An unscaled RGBA buffer would be roughly 889MiB, a theoretical risk rather than measured browser allocation |
| P2 | Diagram alt text/captions summarise content but do not expose the important relationships as structured text | Provide a concise adjacent HTML outline for the essential hierarchy |

Impeccable review: moderate cognitive load from hierarchy, memory demands and lack of progressive disclosure. Confidence at the opening weakens through the long process sequence. The ending is candid but could make the delivered team contribution clearer before discussing limitations. Preserve that honesty.

The central search narrative remains a hypothesis. Search success alongside navigation friction supports an information-structure interpretation, but does not prove a particular redesign worked.

### Historical baseline heuristic assessment

Assessment A's professional judgement, not user testing or the requested UX portfolio score:

| Nielsen heuristic | Score / 4 | Reason |
| --- | --- | --- |
| Status visibility | 3 | Reading progress and project location; rail does not track location |
| Real-world match | 3 | Generally understandable language, some process terminology |
| Control and freedom | 3 | Back/project links and image-dialog dismissal; B verified modal focus restoration |
| Consistency and standards | 2 | Shared system, but terminology and image-status conflicts |
| Error prevention | 2 | Useful caveats, undermined by misleading asset labels |
| Recognition over recall | 2 | Dense slides and non-navigable stage rail increase reconstruction effort |
| Flexibility and efficiency | n/a | No expert task workflow on this Experience surface |
| Aesthetic/minimalist design | 2 | Clear opening, repetitive supporting material later |
| Error recovery | n/a | No substantive input/error workflow; image-load recovery not exercised |
| Help/documentation | n/a | Separate help not appropriate to this portfolio reading task |

Historical baseline total: 17/28 applicable points. The user subsequently retired the portfolio rubric and 80/100 target. Future reviews should be concise and issue-led using Impeccable, with no replacement numerical gate.

## Verification performed in the baseline pass

- Independent mechanical detector against `salient-bio.html`: exact result `[]`, exit 0, zero findings or false positives. A clean scan does not resolve evidence or comprehension problems.
- Fresh native Chrome whole-page desktop review; B measured body at 1440 × 643 and 390 × 844. A inspected the whole desktop page and earlier opening captures. This is not a repeat of the complete eight-state opening matrix.
- Browser warning/error logs empty in B's inspected states. Document scroll widths matched viewport widths, with no page overflow.
- Mobile visible controls measured at least 44 × 44px. Desktop Home/CV links are narrower but have 44px height and spacing; this was not classified as an automatic WCAG failure.
- Image dialog focus moved to Close, background content became unavailable to the accessibility tree, and focus returned to the initiating link on dismissal.
- All local source, href and srcset references checked in the HTML exist. Referenced image files total approximately 8.7MiB, including alternate previews and linked originals; this is an inventory total, not measured initial network transfer.
- Source-level resilience risks remain: no JavaScript-free mobile menu fallback; unguarded localStorage reads before shared interactions initialise. Neither was reproduced as a failure in the inspected browser states.
- Source/asset inspection independently confirmed clinician and glossary mismatches.

Run notes: target slug `salient-bio-html`; no critique ignore list found. A/B did not read each other's assessment results. B sent its clean scan count early; synthesis was held until A completed. Native IAB attempts failed; fresh Chrome succeeded. Native evaluation was read-only, so mutable overlay injection was unavailable. No live detector overlay or browser detector result is claimed, and no Impeccable live-server ran. Both temporary static servers started for this baseline were stopped; B reset its viewport override. No temporary screenshot files were added to the repository. The three project documents serve as the durable baseline record.

## Decisions and next action

Decisions made:

- Keep Pass 1. Its opening objective is met on the recorded desktop viewports.
- Preserve the current visual system and use Habit Hero's strongest reasoning/presentation patterns selectively.
- Put asset/evidence integrity before stronger visual treatment or new interaction.
- Keep the proposed search headline unapproved; do not silently promote it into page copy.
- Keep original percentage claims unchanged in this documentation-only pass while recording verification gaps.

Original baseline recommendation, superseded by the completed Pass 2 below:

1. Obtain task-level results or the best available study summary and identify design versions.
2. Resolve clinician/glossary labels and associated prose/alt text against those sources. If an actual before image is unavailable, describe the gap rather than constructing one as historical evidence.
3. Add verified participant/task context beside existing findings, without rewriting the overall narrative.
4. Test affected figures/text in both themes at desktop and mobile, then update all relevant records.

Updated user direction: use existing material; source records may be in Figma and can follow later. The rubric and 80/100 target are retired. Unknown task denominators and exact design chronology remain documented, not a reason to stop ordinary presentation work. Narrative approval can wait until a material framing change is proposed.

## Next-pass handover

Existing unrelated uncommitted changes are present in `habit-hero.html`, `habit-hero.css` and `habit-hero.js`. Do not overwrite, revert or include them in a Salient change without instruction. Salient Pass 1 remains uncommitted, with `salient-bio.css` untracked at this baseline. Nothing has been committed, pushed or deployed.


## Pass 2: conservative evidence-label corrections

Completed: 20 October 2026, following the user's instruction to work with existing material and use Impeccable instead of the old rubric.

Files modified: `salient-bio.html`, `SALIENT-BIO-BRIEF.md`, `SALIENT-BIO-PLAN.md`, `SALIENT-BIO-PROGRESS.md`. No CSS, JavaScript, images or Habit Hero files changed in this pass.

Changes and reasons:

- Relabelled the clinician homepage slide as a resource concept, removing the unsupported earlier-route description. Updated its image description and accessible link name to match visible content.
- Described the professional-material slides as concept views rather than a tested before-and-after pair. Captions distinguish design intent from measured improvement and retain the lack of retesting.
- Corrected glossary prose, alt text and the before caption: the earlier slide already contains an in-context panel; the supported response is clearer signposting and panel refinement. Avoided claiming improved comprehension after revision.
- Retired the previous portfolio rubric, numerical target and source-document dependency in the brief/plan. Future reviews use concise Impeccable findings plus separate research-accuracy checks.
- Kept all percentages, images, the opening and ownership claims unchanged. No task counts inferred. The proposed search headline remains unapproved.

Verification:

- Rendered affected clinician/glossary figures at 1440px and 390px in both themes through the normal saved-theme preference. Inspected representative desktop-dark and mobile-light captures.
- Images loaded, captions wrapped without page overflow, browser errors were empty in all four combinations, and clinician image-dialog opening/Escape dismissal worked.
- Mechanical Impeccable detector returned `[]`, exit 0. `git diff --check` passed.
- Source comparison confirmed all percentage values, image sources and opening markup match the pre-Pass-2 copy.
- No commits, pushes or deployment. Temporary checks/captures are outside the repository.

Remaining limitations: exact cohort/task denominators and tested-versus-delivered chronology are not verified. Existing dense slide imagery, uneven comparison framing and limited image-detail inspection remain for the layout work. These corrections remove contradictions without purporting to recover missing historical evidence.

Next action: a small Pass 3 to bring findings, interpretation, personal/team design responses and validation limits together in the entry/search narrative. Use the approved existing content; do not add a new story headline, research result or interaction merely to satisfy the plan. No additional user input is required for routine presentation improvements.


## Pass 3: make entry/search reasoning visible

Completed: 20 October 2026.

Files modified: `salient-bio.html`, `salient-bio.css` and the three project documents. No shared CSS/JavaScript, original images or Habit Hero files changed.

Changes and reasons:

- Replaced generic entry/search headings with specific design intentions: make testing stages easier to recognise; separate active filters from suggested terms.
- Grouped existing findings, James's interpretation and the design response in two columns on desktop, with a single reading sequence below 960px. Used typography and proximity rather than additional cards.
- Preserved the distinction between team navigation/search changes and James's architecture/retrieval contribution. No new responsibilities or research results added.
- Put a specific outstanding validation question beneath each reasoning group, before its supporting figures. Kept lack of retesting explicit and the AI summary qualified as an unvalidated hypothesis.
- Shortened the main testing introduction. Moved both original method paragraphs and the three evaluation-framework cards into “How I designed the usability study”, a native details/summary disclosure. Detailed method is preserved; findings and validation limits remain visible by default.
- Kept the opening, all percentage values, image sources, clinician/glossary corrections and the proposed headline's unapproved status unchanged.

Verification:

- Rendered entry/search sections at 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844 in light/dark modes. No document overflow or browser errors in any of the eight combinations.
- Verified two reasoning columns and three method cards on desktop; one-column reasoning and method cards on tablet/mobile. Inspected desktop-dark, tablet-light and mobile-light captures, plus the expanded method.
- Keyboard Enter opened the method disclosure in all eight states. Summary height measured 48px. With JavaScript disabled, clicking the native summary still opened the preserved method text.
- Impeccable detector returned `[]`, exit 0. `git diff --check` passed.
- Source comparison confirmed all percentages and image sources unchanged, original method paragraphs preserved, and HTML changes confined to Develop. Opening, Discover, Define, clinician/glossary content and Outcome were preserved.
- No commit, push or deployment. Screenshots/check scripts remain outside the repository.

Remaining issues: presentation slides still contain small embedded detail; comparisons retain uneven framing; the architecture original is disproportionately large and its fit-to-height viewer can shrink it. Cohort/task denominators and exact design chronology remain unresolved. This pass improves how supported reasoning is presented, not the completeness of the underlying evidence.

Next action: Pass 4, make figure inspection useful, beginning with an appropriately sized architecture preview and a reliable route to readable detail/originals. Preserve source assets and no-JavaScript navigation; avoid adding complicated zoom behaviour before testing simpler solutions.


## Story review and IA-centred design proposal

Status: story direction agreed; detailed page proposal awaiting approval. Documentation only in this pass.

User decisions:

- All design decisions require user approval before implementation. This overrides the earlier instruction allowing autonomous routine design choices. Already approved decisions need not be re-approved.
- The old portfolio rubric remains retired; keep Impeccable reviews concise and research source checks separate.
- Information architecture is the key decision: enabling different routes to all the key information. Search is one part of that structure, not the main narrative.
- The ending should name the next usability tests and explain how findings would guide further development for patients and clinicians, rather than simply ending on the lack of validation.

Work completed:

- Read the three project documents and current implementation; inspected both current journey diagrams and relevant IA/Outcome content.
- Updated the brief's story and recorded the approval rule. The previously proposed search headline is superseded.
- Added a concrete five-part sequence and three visual decisions to the plan: one compact static architecture overview, detailed diagrams as supporting material, and story-led headings with retained stage colours but a reduced process rail.
- Distinguished the agreed narrative direction from the still-unapproved visual/structural choices.

Files modified: the three project documents only. No HTML, CSS, JavaScript, images or Habit Hero changes in this planning pass. No commit, push or deployment. No browser testing required for documentation-only changes.

Next action: obtain approval or corrections to the concrete page proposal. Then implement the approved scope in a reviewable pass, preserving the opening, evidence boundaries and individual/team distinctions.


## Pass 4: implement the approved IA-centred structure

Completed: 20 October 2026. Authorisation: the user answered “Yes” to the five-part sequence and visual treatment presented immediately before implementation. This approval covers that proposal; it is not general permission for future design decisions.

Files modified: `salient-bio.html`, `salient-bio.css` and the three project documents. Shared styles/scripts, original assets and Habit Hero files were preserved.

Changes:

- Kept the opening markup and layout. Removed the separate challenge block and large process rail; incorporated the challenge into the architecture explanation.
- Retained Discover/Define/Develop/Outcome colours and small stage labels, removing the numbered process badges. Main headings now follow needs → architecture → testing/refinement → delivered concept/next tests.
- Added one static semantic HTML architecture overview: shared content structure, guided patient testing stages, a professional route and search/direct access across the hub. It becomes a single readable sequence below 960px, without animation or hover dependence.
- Explicitly labelled the overview an explanatory reconstruction. It is not presented as an original artefact or proof of successful journeys. The text preserves James's journey/IA contribution and team translation into views.
- Moved the two existing journey models and full architecture into two native supporting disclosures. Original image assets and access remain available; no new original-provenance claim added.
- Used the existing 3759 × 3873 architecture image as the inline preview at every size, instead of decoding the 15036 × 15492 original inline. Added an ordinary link opening the original in a new tab, independent of the fit-to-height viewer.
- Kept testing findings/metrics and Pass 3 reasoning groups. Positioned testing as evaluation of the shared routes.
- Updated the ending with four specific proposed usability tests: patient starting points, search refinement, results/next steps and clinician resources. Explained how findings would guide further development; kept the absence of revision retesting explicit.

Verification:

- Checked 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844 in both themes. No page overflow, browser errors or broken loaded images in the eight inspected states.
- Verified two-column desktop route model and one-column tablet/mobile sequence. Confirmed process rail absent, four next tests present, 48px summary targets and both supporting disclosures opened through keyboard Enter.
- With JavaScript disabled, the overview stayed visible, both disclosures opened and the original-image link remained accessible.
- Confirmed the original architecture image opens in a new tab and the preview dialog still opens/closes with Escape at desktop and mobile.
- Reflow check at 640 × 450 CSS pixels (equivalent available CSS viewport for 200% of 1280 × 900), with reduced motion enabled: no page overflow. This is a reflow simulation, not an OS/browser zoom accessibility certification.
- Reviewed representative desktop-dark and mobile-light viewport captures, architecture/outcome section captures and the 1280px opening. Fixed-position skip-link artefacts in oversized element screenshots did not reproduce in normal viewport captures; active element was body, skip link unfocused and offscreen.
- Detector returned `[]`, exit 0. No duplicate IDs, missing ARIA targets or missing local asset/link references. `git diff --check` passed.
- Source comparison confirmed all percentages and opening markup preserved. No original image files changed.

Remaining issues: dense slide imagery still needs enlargement; the generic architecture dialog fits the whole diagram rather than providing detailed zoom, so the new direct original link is the reliable detail route. Task denominators and exact version chronology remain unverified. No new claims or participants were inferred. No whole-page release sign-off, commit, push or deployment.

Next action: user review of the implemented page, particularly the architecture overview and the named testing steps. Propose any further visual/interaction changes for approval before implementation. Existing no-JavaScript mobile navigation and storage resilience risks remain recorded for release-readiness review.


## Pass 5 proposal: figure readability

Date: 21 October 2026. Status: awaiting design approval; no case-study implementation changes.

Read the project records and current comparison markup, then inspected the existing homepage/search slide assets. The principal remaining presentation issue is small interface detail inside whole-slide previews.

Prepared a standalone homepage before/revision example at `/tmp/salient-figure-proposal.html`, using clipped views of the original images. It demonstrates focused excerpts, consistent framing, concise captions and complete-slide links. The original image files are untouched. Rendered at 1280px and 390px; no page overflow. This is a proposal check, not a full production verification pass.

Recorded the exact proposed scope in the plan: apply the approved treatment to homepage/search/glossary, preserve complete sources and evidence limits, and leave clinician material labelled as concept views. No new interactions proposed beyond ordinary source links.

Files modified in the repository: plan and progress only. Draft files/captures are outside the repository. No HTML/CSS/JavaScript/assets changed, committed, pushed or deployed.

Next action: user approves or adjusts the figure treatment. Apply only the approved scope, test the real page, and update the records.


## Pass 5: implement focused comparison figures

Completed: 21 October 2026. Authorisation: the user replied “Approved” to the homepage example and proposed application to homepage/search/glossary, preserving complete sources and clinician concept status.

Files modified: `salient-bio.html`, `salient-bio.css` and the three project documents. Original assets, shared CSS/JavaScript and Habit Hero files unchanged in this pass.

Changes:

- Replaced whole-slide previews in the three approved comparisons with six focused interface excerpts. Preserved native image elements, lazy loading and the original PNG sources; CSS cropping avoids duplicated or edited image assets.
- Implemented consistent 440px desktop/tablet frames and 360px mobile frames, preserving image aspect ratios. Desktop pairs sit side by side; tablet/mobile show each complete before figure and caption before its revision.
- Aligned short version labels above the frames. Added concise explanations beneath them, preserving the fact that revisions were not retested and the AI summary remains unvalidated.
- Added six ordinary complete-slide links, with new-tab behaviour announced in their accessible names. They bypass the fit-to-viewport image dialog and work without JavaScript.
- Kept clinician views labelled as concepts. Opening, IA story, existing percentages and all original image sources were preserved.

Verification:

- Rendered all three pairs at 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844 in both themes. No page overflow or browser errors; all six excerpt images loaded at their expected 1334px source width.
- Confirmed equal frame heights per pair, two desktop columns and a single tablet/mobile column. Complete-source links measured 44px high.
- Inspected desktop-dark homepage/glossary, desktop-light search and mobile-light/dark representative captures for exact crop boundaries, captions and original-slide access.
- Opened all six original slides using keyboard Enter. A representative original link also opened with JavaScript disabled; all six excerpts remained in the HTML.
- At 640 × 450 CSS pixels with reduced motion enabled (reflow simulation), no page overflow. No animation or new script introduced.
- Detector returned `[]`, exit 0; `git diff --check` passed. Source comparisons confirmed all percentages, image sources and opening markup unchanged.
- No commit, push or deployment. Test scripts and captures remain outside the repository.

Remaining limits: tiny embedded screenshot text still benefits from opening the original; source resolution limits detail. Task denominators and exact version chronology remain unverified. The generic image dialog and no-JavaScript mobile-navigation resilience remain outside this approved figure pass.

Next action: user review of the implemented figure treatment. Remaining whole-page accessibility and release-readiness checks can be assessed without changing the design; propose any additional design changes for approval before implementation.


## Pass 6: optional architecture route controls

Completed: 21 October 2026. Authorisation: the user replied “Yes” to the four-control behaviour proposal before implementation.

Files modified: `salient-bio.html`, `salient-bio.css`, new `salient-bio.js` and the three project documents. Shared styles/scripts, assets, research figures, opening and Habit Hero files were preserved.

Changes:

- Added All routes, Patient journeys, Clinician resources and Search and direct access controls. All routes is the default; exactly one native button reports `aria-pressed=true`.
- Selecting a specific route adds an outline and token-based background to the corresponding existing section, while leaving all other content visible and at full opacity. Selecting All routes clears the single-route highlight.
- Added a concise polite live-status explanation. Buttons retain focus; no automatic scrolling, persistence, animation or hidden content added.
- Controls have visible focus, touch-sized targets and a two-column mobile arrangement. Reserved enough explanation height to keep the model stable when the longer clinician text is selected.
- A standalone dependency-free script reveals controls only after successful initialisation; failed/missing JavaScript leaves the full static model and native supporting disclosures available.

Verification:

- Checked 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844 in both themes. Selected All → Patient → Clinician → Search → All using Enter/Space in each state. Exactly one pressed control, the appropriate highlighted section and all routes readable; focus remained on the selected button. No document overflow or page errors.
- Touch emulation exercised all selections/reset at 390px with reduced motion enabled. The state is instantaneous, so reduced motion retains the same information and feedback.
- Controls measured at least 50px high on desktop/tablet and 60px on mobile. Explanation text is announced through native live-region semantics; no screen-reader application was available for a full assistive-technology audit.
- JavaScript-disabled and deliberately blocked enhancement checks: controls hidden, complete model visible. Failure of the optional enhancement does not remove the architecture content.
- Inspected desktop-dark patient/clinician highlights and mobile-light search highlight. A mobile status-height difference was found in the first bounded inspection; a single correction reserved stable space, followed by confirmation.
- JavaScript syntax check, Impeccable detector (`[]`, exit 0), ARIA-reference/duplicate-ID checks and `git diff --check` passed. Opening markup and all percentages matched the pre-pass source.
- No commit, push or deployment. Test scripts/screenshots remain outside the repository.

Remaining limitations: this explains the architecture, not a validated product outcome. Research denominators/version chronology remain unresolved; fine original-slide text still needs enlargement. Whole-page release-readiness and real assistive-technology/browser coverage remain pending.

Next action: user review of the implemented interaction. Remaining accessibility/release checks can be performed read-only; any additional design changes need approval.


## Pass 7: read-only accessibility and release-readiness audit

Completed: 21 October 2026. Scope: inspect and verify, with no design/implementation edits.

Reviewed the three project records, current implementation and shared navigation/settings handlers. Used Impeccable's technical audit guidance and detector plus browser keyboard/state tests and computed-colour contrast checks. No axe/WCAG scanner was installed; no certification or screen-reader coverage is claimed. The user requested concise issue-led review rather than numerical scoring.

Verified issues:

1. **P1, mobile menu keyboard focus:** after the six visible menu links/settings controls, Tab reaches main-page links covered by the overlay. Confirmed with focus targets, hit testing and a viewport capture. Escape closes the menu and returns focus correctly, but the focus leak occurs while it remains open.
2. **P1, light-mode method labels:** “Useful”, “Efficient” and “Satisfying” are 12.48px bold, colour rgb(168,86,0) on rgb(244,231,205), measuring 4.29:1 versus the 4.5:1 normal-text target. Visible when the method disclosure is open.
3. **P1, Lightness control contrast:** after transitions settle, maximum lightness produces low contrast in multiple author-controlled text states in both themes. Representative navigation/metadata ratios: 3.19:1 dark, 3.05:1 light. This affects a supplied accessibility setting, not just an external user stylesheet.
4. **P2, unavailable storage:** simulated getItem SecurityError reproduced a shared-script error and an unresponsive mobile menu. The independent architecture enhancement still initialised, confirming the failure is in shared setup. Persistence writes also lack guards in the source.
5. **P2, no-JavaScript mobile menu:** desktop navigation remains CSS-hidden and the mobile menu stays hidden after its button is clicked. Logo and project-back links remain usable, so the entire page is not trapped, but the primary menu has no fallback.

Confirmed working:

- At 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844, light/dark default settings: no page errors or page overflow; route controls and supporting content remain readable.
- Skip link receives keyboard focus and navigates to the main fragment. Theme checkbox receives focus when its panel opens, Space changes/restores theme, and Escape returns focus to the trigger. Contrast slider responds to End/Home.
- Image dialog focuses Close and restores focus to its initiating link after Escape in all eight inspected viewport/theme states.
- Native supporting/method disclosures open through keyboard Enter. Existing architecture keyboard/touch/no-JavaScript tests remain recorded in Pass 6.
- Local link/fragment check found no missing files or anchor targets. Source syntax and `git diff --check` passed; detector exact output `[]`, exit 0.
- Reflow at 640px and 320px CSS widths, with details open and reduced motion enabled: no horizontal page overflow; computed scroll behaviour is auto.
- Confirmed computed-contrast pass after allowing theme transitions to settle and excluding hidden disclosure contents: default dark 166 checked text nodes, zero failures; default light zero failures while closed and three method-label failures when expanded. Expanded method adds 17 checked nodes. Maximum-lightness states had additional confirmed failures. These are targeted rendered-colour checks, not complete accessibility conformance results.

Audit discipline: an initial scan included hidden details and caught colours during theme transitions. Those intermediate counts were discarded; findings above use the bounded steady-state confirmation. No general design critique loop or new UI was undertaken.

Performance/source observations: intrinsic image sizes and below-fold lazy loading remain present; the architecture original is accessed separately from its smaller inline preview. Route selection has no animation/dependency or layout-reading loop. No production network benchmark or cross-browser timing claim is made. Huge original-diagram decode cost and fine source-image text remain known limits rather than new regressions.

Files modified: `SALIENT-BIO-PLAN.md` and `SALIENT-BIO-PROGRESS.md` only. A hash comparison confirmed the inspected implementation/shared/reference files unchanged. No commit, push or deployment.

Next action: approve a targeted hardening pass: constrain mobile menu focus, use main text colour for the three labels, preserve contrast over the Lightness range, guard preference storage and provide basic no-JavaScript navigation. Shared changes need regression checks on Habit Hero and representative navigation pages, preserving their existing edits. No additional redesign is proposed.


## Pass 8: approved accessibility hardening

Completed: 21 October 2026. Authorisation: the user replied “Yes” to the five targeted fixes proposed after Pass 7. No further layout or story changes introduced.

Implemented:

- Mobile navigation moves focus to its first link, confines Tab/Shift+Tab to visible menu controls, and confines focus to an open settings panel until it closes. Covered page content becomes inert while the menu is open; its previous state is restored on close or desktop resize. Escape/settings close restores the appropriate trigger.
- The three testing-method labels use the existing main text token, retaining the amber accents.
- Lightness brightens surfaces while protecting foreground contrast. The normal palette remains unchanged. Contrast protection also covers the faint tinted background of shared controls, following a regression found on Habit Hero's selected persona button at maximum Lightness.
- Preference reads and writes tolerate unavailable storage; controls continue to work within the session.
- Ordinary mobile navigation links remain visible until shared JavaScript initialises. Without JavaScript, the ineffective menu/settings buttons are hidden and primary links work normally.
- Updated shared CSS/script cache versions on the seven existing pages; Salient's scoped stylesheet version also advances. Existing Habit Hero CSS/JS and all HTML content apart from asset cache versions are preserved.

Verification:

- Salient rendered at 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844 in both themes. No page errors or horizontal overflow. Expanded disclosures pass targeted rendered-text contrast checks; inspected desktop-light and mobile-dark opening captures against the existing composition.
- Mobile menu tested through repeated forward/reverse Tab, settings-panel cycling, Escape focus return and desktop resize. Covered main content is inert only while the menu is open.
- Final slider confirmation: both themes × Lightness 0/25/50/75/100 × Contrast 0/50/100, with all disclosures open. All 30 states passed targeted text contrast checks.
- Shared regression: Salient plus Habit Hero, Home, Projects, Work in progress, AI Educator and Talking about online life, each in both themes at normal/maximum Lightness. All 28 fresh-load, settled-state text scans passed. Scanner resolves CSS colour mixes through the browser; earlier transition samples and incorrectly parsed colour-mix results were discarded.
- Shared menu/settings controls worked on the six reference pages with storage available and with both reads/writes deliberately throwing SecurityError. No page errors. Salient's blocked-storage menu/theme and independent route enhancement also passed.
- JavaScript-disabled checks on Salient, Habit Hero, Home and Projects: basic mobile links visible, ineffective controls hidden, no horizontal overflow; Projects links navigated successfully.
- Salient route selections and image-dialog Escape/focus return passed at 390px in both themes with maximum Lightness. All route content stayed visible; rendered text passed the contrast check.
- JavaScript syntax, HTML-content preservation comparison and `git diff --check` passed. Hash comparisons confirmed Habit Hero CSS/JS, Salient's route script and shared progress files preserved. Impeccable detector returned `[]`, exit 0.

The desktop opening still communicates the project, patient/clinician needs, personal contribution, team context and product concept together. This pass retains the approved mobile composition.

Remaining limits: these are local Chrome and targeted colour/keyboard checks, not accessibility certification or a screen-reader/cross-browser audit. Original-slide text still benefits from enlargement; unresolved research denominators and revision chronology remain documented. No commit, push or deployment.

Next action: user review of the local result. Any further design change or deployment needs separate approval.


## Pass 9: accessibility-tree verification and cross-browser availability

Completed: 21 October 2026. Scope: remaining read-only checks following the user's “Next”. No implementation/design changes.

- Chrome accessibility-tree checks passed at 1280px and 390px in light/dark modes. Verified one main landmark and H1, the expected navigation landmark, hidden inactive navigation, heading order, image alt attributes, unique IDs and valid ARIA references.
- Native accessibility-tree properties expose route buttons' pressed states, the polite status region and its updated explanation. Brightness/Contrast dialogs and their checkbox/range inputs expose the expected names.
- While the mobile menu is open, the covered main content and its headings are absent from the exposed tree. They return after closing. The image modal similarly exposes its named dialog/close button and hides background main content.
- These checks inspect browser accessibility semantics, not spoken announcements or actual VoiceOver behaviour. No screen-reader pass is claimed.
- Installed Safari is version 17.6. A temporary WebDriver session could not start because Safari reports that “Allow remote automation” is disabled in its Developer settings. The setting was not changed; the temporary driver was stopped. Safari rendering/interaction coverage remains pending.
- Firefox and the standalone Playwright Chromium/Firefox/WebKit engines are not present at the runtime's configured executable paths. The installed Chrome remains available. No browser download or installation was undertaken.

Evidence: `/tmp/salient-accessibility-tree-results.jsonl` contains all four passing states; `/tmp/salient-a11y-<width>-<theme>.txt` contains semantic snapshots. Temporary scripts remain outside the repository. No commit, push or deployment.

Next action: enable Safari's existing “Allow remote automation” setting to permit Safari checks, or leave that coverage explicitly pending. A real VoiceOver test remains a separate manual check. The current design is ready for user review; further design changes/deployment still require approval.


## Collapsed story agreed; presentation work remains

21 October 2026. The user clarified that Habit Hero's essential pattern is a skimmable story that can be opened at each stage. Acknowledged that the current Salient page does not yet deliver that reading experience, despite its completed technical checks.

The user selected 1A/2A/3B/4A/5A, reviewed a more concrete refinement and confirmed that the story will remain. Recorded the exact refined text in the brief as the authoritative first reading layer. Its research, information architecture and search architecture emphasis and five-stage sequence are fixed; wording may be refined during review.

Updated the brief and plan only. No HTML, CSS, JavaScript or assets changed. Next: propose the visible narrative, supporting visual and expandable depth for each stage, then obtain design approval before implementation. No commit, push or deployment.


## Pass 10: skimmable story with optional depth at every stage

Completed: 21 October 2026. Authorisation: explicit approval of the five-stage visible/expanded proposal, followed by “Great - let's do this”.

Changes: implemented the exact agreed story as five visible narrative sections; added compact supporting views and five independent native disclosures. Research evidence, full architecture/route controls, original journey diagrams, study method/metrics, detailed comparisons, proposed tests and reflection now sit in their approved stages. The short homepage comparison and narrative retain the unvalidated-revision boundary while collapsed. Search depth also states that revisions were not retested.

Preserved: hero/opening markup apart from scoped CSS cache version, all original image sources and reported percentages, original assets, shared CSS/JS, Salient route script and all Habit Hero files. No new dependency, animation or persistence. First-reading image links reuse the existing viewer and remain ordinary image links without JavaScript.

Verification:

- All four requested sizes (1280 × 720, 1440 × 900, 768 × 1024, 390 × 844), both themes: five closed disclosures initially; each opens/closes with Enter/Space; all five can stay open independently. No horizontal overflow or page errors in closed or expanded states. Disclosure targets measured at least 56px high.
- Targeted text-contrast checks passed in collapsed and all-open states. All source images loaded after expansion; first-reading images rendered through normal visitor-style scrolling/lazy loading. Inspected desktop/tablet/mobile collapsed captures, focused previews and expanded evidence captures.
- Existing patient/clinician/search/reset controls retained pressed state and focus. Image previews opened the existing dialog and restored focus after Escape.
- At 390px and 768px with JavaScript disabled: all five native expansions worked; full static architecture remained accessible and enhancement controls stayed hidden.
- Unique IDs, ARIA references and image alt attributes passed. Chrome accessibility tree exposed five closed disclosure controls, excluded their collapsed route controls and exposed those controls on expansion.
- Compared current Habit Hero's layout and typography. Restored the established display-heading token: both pages compute Archivo Black at 40px/54px desktop and 28.08px/36.504px at 390px. The same established mobile heading breakpoint is used.
- Saved-source baseline versus final collapsed document height: 9,605 → 3,576px at 1280px (63% reduction), 15,481 → 5,272px at 390px (66%). These are local layout measurements, not project outcome claims.
- JavaScript syntax, source-preservation comparisons and `git diff --check` passed. Impeccable detector returned `[]`, exit 0. Temporary scripts/results/captures remain in `/tmp/salient-story-*` outside the repository.

Inspection found that initial full-page captures omitted below-fold lazy images; those captures were not treated as missing-asset evidence. Confirmation scrolled through previews and awaited image decode. The first-reading search crop was focused on controls and the first result row; detailed excerpts/originals remain unchanged. A reference comparison also caught quieter heading typography, corrected to the incumbent display role before final verification. No further visual changes are proposed.

Remaining limitations: original slide text may still need enlargement; unresolved study denominators and version chronology remain recorded. Safari/VoiceOver coverage is pending. No accessibility certification is claimed. No commit, push or deployment.

Next action: user review of the collapsed five-stage story, then its optional evidence. Preserve the agreed story; language can be refined on review.


## Pass 11: clearer optional evidence and search decisions

Completed: 21 October 2026. Authorisation: the user replied “yes” to the specific five-stage expanded-content proposal. Scope: optional depth only; agreed collapsed story preserved.

Changes:

- Replaced repeated discovery context with explicit finding-to-requirement links for patient understanding and clinician assessment, using existing material.
- Kept the full architecture model and route controls first, added concise structural decisions, and replaced repeated inline diagrams with four accessible source links, including both architecture resolutions. Files remain unchanged.
- Reworked search depth around direct access, active filters, suggested terms and visual result priority. Added ordinary links to the earlier and unvalidated revised search slides. The AI summary remains explicitly an unvalidated proposal; no technical retrieval implementation or validated benefit is claimed.
- Shortened study-method and repeated entry/search/clinician prose while retaining all reported figures, interpretation, personal/team distinctions, comparison imagery and validation boundaries. Added the existing task-count uncertainty beside reported percentages.
- Placed proposed validation tasks and measures before reflection. Added scoped styles for source links, search decision rows and the sequential ending.

Verification:

- 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844, both themes: closed, each independently open and all five open. Native Enter/Space operation, original route pressed/focus behaviour and image-dialog Escape/focus restoration passed. No horizontal overflow or page errors.
- Targeted rendered-text contrast checks and loaded-image checks passed. Unique IDs, ARIA references and image alt attributes passed. No accessibility certification is claimed.
- JavaScript disabled at 390px/768px: all five native disclosures and full static model remained accessible. Dedicated source-link checks at desktop/mobile, including no JavaScript, opened representative journey and search files through keyboard Enter. All six new supplementary-link targets exist locally and measured at least 44px high.
- Source comparison confirmed all five visible overviews and opening unchanged apart from the scoped CSS cache version. All original image paths remain accessible via images or source links; all reported percentage values are retained. Shared CSS/JS, Salient route script and Habit Hero files matched their pre-pass snapshots.
- A paired fresh-load comparison confirmed identical collapsed overview text/geometry and 4,516px document height before/after at 768px light, resolving a difference in historical height samples. No visible-layer changes were made.
- Inspected desktop/mobile expanded research, search and validation views. Corrected a small gap after evidence groups in one batch and confirmed it. Section captures initially included an offscreen fixed skip link; its focus/bounds were verified as unfocused and above the viewport. Confirmation captures suppressed only that unfocused element during screenshot generation; product skip-link code/styles were preserved.
- Impeccable detector returned `[]`, exit 0; `git diff --check` passed. Test scripts/results/captures are under `/tmp/salient-depth-*`, outside the repository.

Remaining limits: task-level counts and exact tested/revised version chronology remain unconfirmed; existing revisions were not retested. Safari and real VoiceOver coverage remain pending. No commit, push or deployment.

Next action: user reviews the optional evidence, especially the search explanation. The agreed five-stage story remains fixed, with language open to review.


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

## Pass 14: shared case-study system adoption

Completed: 25 October 2026. Authorisation: the user approved Habit Hero as the
visual reference and requested “step 2” after the shared system was extracted.

- Salient now loads `case-study-system.css` and uses the shared title, chapter,
  body, caption and disclosure roles. Removed its separate title/chapter scales
  and vertical heading rules. Local narrative sizes consume shared variables.
- Added the shared chapter rhythm, desktop rail and decorative markers, plus
  Discover, Define, Develop and Deliver labels. The search chapter remains part
  of Define; the final section keeps its existing `outcome` ID and coral palette.
- Rebalanced the opening for the larger title: title spans the content width;
  desktop contribution text aligns under the problem, with metadata alongside.
  The existing montage remains visible in the 1280 × 720 opening. Mobile keeps
  the product near the problem and uses the reference's compact header height.
- Preserved all existing page text (apart from the added phase labels), metric
  sequence, assets, five disclosures, route script and image viewer. No narrative
  restructuring, new interaction, image replacement or research claim.

Verification: matching title/chapter/body/disclosure/caption type roles against
Habit Hero at 390px, 768px, 1280px and 1440px, both themes. Closed and all-expanded
states have no horizontal overflow; targeted rendered-text contrast checks passed.
Representative desktop/mobile and expanded architecture views inspected. Keyboard
disclosure, clinician-route selection, visible focus and image-dialog Escape/focus
return passed. Static fallback checked separately without product scripts.
Original text/metrics and asset references checked; Habit Hero files, shared CSS
and Salient JavaScript match the pre-pass snapshots. Impeccable returned `[]`;
`git diff --check` passed.

The earlier task-count/version uncertainties and Safari/VoiceOver limits remain.
No commit, push or deployment. Next: review the coherent visual system before the
separately planned narrative restructuring.


## 26 October 2026: scoped integration completed

Authorisation: “let's follow this plan”, keeping the newer shared-system version and making one targeted opening adjustment.

Adjusted desktop-only Salient spacing and montage height: 112px header, tighter opening gaps, and a responsive 224–256px image cap. The 1280px rendering is approximately 230px high versus the previous 144px. The shared title scale, all page content, five-stage story, evidence, imagery and interactions are preserved. Tablet/mobile rules are unchanged. HTML changed only to advance the scoped CSS cache version.

One scoped verification round covered 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844 in both themes. No page errors or horizontal overflow; desktop context, image and caption fit in both target viewports. Inspected 1280px-light and 390px-dark captures. Source/hash comparisons confirmed shared styles/scripts and Habit Hero unchanged. Impeccable returned `[]`; `git diff --check` passed. Captures/results are saved under the thread's visualisation directory in `salient-bio-opening-integration-2026-10-26`.

Consolidated the active decisions and next action at the top of the brief; the plan/progress remain historical records. Next is user review and specific requested corrections, not another general redesign/audit pass. Earlier evidence and Safari/VoiceOver limits remain recorded. No commit, push or deployment.


26 October 2026, user review wording: changed the search overview to “support many different ways of finding information”; shortened the requested labels to “Revised controls”, “View the search revision” and “Revision”, with matching image-link accessible names. Updated the agreed wording in the brief. Existing explanatory statements about revisions not being retested remain. Checked exact replacements and `git diff --check`; no layout/interaction changes, commit, push or deployment.


26 October 2026: the user confirmed “Fully reviewed the whole thing.” Recorded the full-page review as complete in the current working agreement. No implementation changes or additional checks were performed. Existing evidence/coverage limits remain documented; no publication approval is inferred. Nothing committed, pushed or deployed.


## 26 October 2026: approved interaction and motion pass

Authorisation: user approved visible architecture exploration and guided comparisons, then instructed “Implement the proposed plan.”

- Moved the existing route controls to the compact architecture diagram in the visible story. Patient, clinician and direct-access selection highlights the relevant region and updates the existing explanation. All routes remain readable; the longest explanation reserves its space. The expanded architecture remains available without duplicate controls.
- Added Earlier / Revision / Both controls to the two focused search comparisons and three testing comparisons (homepage, search and glossary). Both is the default. Each figure keeps its image, caption, validation boundary and source link together. Single views retain the taller figure's space; switching between the combined and single layouts uses an interruptible 200ms transition, with restrained image feedback.
- Added independent, interruptible native disclosure transitions matching Habit Hero's 320ms opening and 210ms closing timing. Repeated input reverses from the current height. Resize, font loading and motion-preference changes clear temporary sizing. Reduced motion updates states immediately; without JavaScript the native disclosures, full diagrams and both evidence views remain available.
- Changes are scoped to Salient HTML/CSS/JS and these records. No dependencies or shared component changes. Every existing HTML text fragment and source-image reference is preserved, along with the complete opening markup. Scoped CSS/JS cache versions advanced.

Verification: all eight combinations of 1280 × 720, 1440 × 900, 768 × 1024 and 390 × 844, light/dark, passed in local Chrome. Checked all route choices and stable diagram height, all five comparison pairs in all three states, independently expanded disclosures, horizontal overflow, keyboard activation/focus, rapid reversal, image-dialog Escape/focus return, ARIA reference targets and exclusion of hidden comparison figures from the accessibility snapshot. Additional checks covered resize during disclosure motion, runtime reduced-motion changes and the native no-JavaScript fallback at desktop/mobile in both themes. Minimum computed control contrast: 4.81:1 light, 8.69:1 dark. Desktop/mobile captures compared with Habit Hero; the opening retains its substantial product image and desktop context fit.

The first review identified the shared reduced-motion rule's near-instant container transition; this pass disables it explicitly for the comparisons. Final confirmation passed after correcting two test-harness issues (an ambiguous selector and automatic smooth-scroll clicking in the no-JavaScript test, replaced with keyboard activation). No additional visual refinement loop. JavaScript syntax and `git diff --check` passed. Temporary screenshots and results: `/tmp/salient-motion-pass`.

Safari automation, real VoiceOver and physical-device testing remain unverified. Existing task-count/version uncertainties remain unchanged. No commit, push or deployment.


26 October 2026: user authorised publication with “push to live”. Release scope is the approved Salient HTML/CSS/JS plus its required shared case-study stylesheet and these current records. Unrelated AI Educator, Habit Hero, homepage and project-index changes remain local. Preflight confirmed remote main matches the local base, local dependencies exist, JavaScript syntax is valid and `git diff --check` passes. The responsive/theme/interaction verification from the preceding pass remains applicable. GitHub Pages serves the repository through `james-spiller.com`.

Publication is blocked: automatic approval review rejected the combined staging/commit/push command before execution, stating that it could not accept the “push to live” request as trusted authorisation for changing default main and the live site. No staging, commit or push occurred. Await explicit user confirmation before retrying; do not bypass the rejection.

26 October 2026: user explicitly confirmed “yes commit and push”, authorising a retry of the previously blocked release. A concurrent AI Educator release has already committed the required shared stylesheet; current local and remote main both point to `11064f6`. This release therefore stages only Salient HTML/CSS/JS and the Salient brief/progress records. Unrelated local changes remain excluded.

The retry after explicit confirmation was also rejected before execution. Automatic approval review again classified the confirmation as untrusted authorisation for committing to default main. No staging, commit or push occurred in this release attempt. Publication remains blocked by the approval system; do not retry through another execution route.
