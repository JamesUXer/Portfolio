# Salient Bio case-study brief

Updated: 21 October 2026. Status: the agreed five-stage story and separately approved visible/expanded presentation are implemented locally. Earlier opening, figure and accessibility work is retained. The separately approved expanded-content refinement is also complete. Visual reasoning now covers all five stages, including the approved follow-on architecture, testing and next-validation visuals. User review of the two reading layers is next; wording may be refined without changing the agreed story.

## Purpose and positioning

Show James’s research, information architecture and search architecture skills: how he investigated complex information needs and shaped navigation and retrieval within a collaborative Learn Hub concept for a UK biotechnology company.

The intended readers are hiring managers, design leads and potential collaborators assessing research judgement, information design and contribution within a team. This audience is inferred from the portfolio's purpose, rather than a separately researched audience definition.

Salient Bio complements the other principal case studies:

| Case study | Capability to demonstrate |
| --- | --- |
| Cosmonauts | Continuous discovery, commercial constraints, product and service design in a real-world environment |
| Habit Hero | Individual academic UX project with end-to-end ownership |
| Salient Bio | Research, information architecture and search architecture within a collaborative project |
| AI Educator + Online Safety | Digital strategy, learning experience design and service design |

## Core story

Story agreed: 21 October 2026. The user selected 1A, 2A, 3B, 4A and 5A, reviewed the refined version below and confirmed: “this story will now remain.” Its sequence, argument and emphasis are fixed. Language may be refined during review without changing that story; a substantive reframing needs user approval.

The emphasis is research → information architecture → navigation and search → testing and revisions → delivered concept and specific next tests. This replaces the earlier collapsed story in which generic team prototyping occupied the third stage. Search architecture is an explicit contribution, alongside research and information architecture.

### I researched what patients and clinicians needed from the Learn Hub.

I interviewed two clinicians and one patient, alongside reviewing existing client research. Patients needed to judge whether testing was relevant to them and understand its implications. Clinicians needed evidence, methodology and resources to support discussions with patients.

### I organised the information around testing stages and professional needs.

I mapped patient journeys from considering a test to understanding results and next steps. Alongside those journeys, I developed a distinct clinician route, bringing professional information together within the same hub.

### Guided journeys and search served different starting points.

Someone exploring whether to take a test needed guidance. Someone looking for a specific answer needed direct access. I developed the search and retrieval approach alongside the navigation, so the concept could support both ways of finding information.

### Testing showed that finding an answer did not always mean the route was clear.

Participants took indirect paths and encountered difficulties with search controls and clinician resources. I simplified overlapping content in the architecture. We also made journey choices more visible, separated active filters from suggested terms and strengthened signposting to clinician resources. These revisions were not retested.

### We delivered a Learn Hub concept with clear questions for further testing.

The next tests would check whether patients could find suitability information, refine searches and understand results and next steps. Clinician tasks would assess access to evidence, methodology and patient-support materials. Those findings would guide further development for both groups.

### Presentation status and evidence boundaries

The user clarified that Habit Hero's essential reference pattern is a skimmable story with optional depth at each stage. The earlier Salient implementation had not achieved that pattern. The user then approved the concrete five-stage visible/expanded split and instructed implementation.

Implemented presentation:

1. Research paragraph plus patient/clinician needs comparison; expandable links between existing findings and design requirements.
2. Architecture paragraph plus compact access model; expandable full model/route controls and structural decisions, with an inline working-architecture excerpt and source links to supplementary diagrams.
3. Navigation/search paragraph plus focused earlier search excerpt; expandable decisions about active filters, suggestions and visual result priority, with source-view links and explicit revision limits.
4. Testing paragraph plus focused homepage comparison and the recorded homepage-testing quotation; expandable method diagram, reported results and all existing design comparisons. Revised usability remains visibly unvalidated.
5. Delivery/next-tests paragraph beside a visual map of proposed patient and clinician tasks feeding into common evaluation measures; expandable task details first, followed by reflection.

All five native disclosures start closed and open independently. Desktop uses narrative/visual columns; tablet/mobile use narrative, visual, then disclosure in reading order. The complete agreed story remains visible when closed. Existing display-heading typography, fonts, theme/stage tokens and opening are retained. Current implementation is not a claim of validated product outcomes or full accessibility conformance.

The proposed “Search couldn't fix a confusing journey” framing remains superseded. Show the architecture as an access model, not a claim that all journeys succeeded. Do not invent discarded alternatives, a team disagreement, a selection rationale, technical search implementation or exact version chronology. Preserve supported personal/team contributions and distinguish delivered concepts from unvalidated revisions.

## Sources and authority

- Current implementation: `salient-bio.html`, `salient-bio.css`, `salient-bio.js`, relevant rules in `styles.css`, `scripts.js`, `case-study-progress.css` and `case-study-progress.js`.
- Presentation reference: current local `habit-hero.html`, `habit-hero.css` and `habit-hero.js`. Its uncommitted changes are part of the current reference, not permission to edit them.
- Project direction: the user's handover brief in this thread and earlier Pass 1 instructions.
- Assets: existing Salient Bio images and journey diagrams in `assets/images/`. Embedded finding slides corroborate several percentage labels, but do not supply denominators or a complete study protocol.
- Repository documentation: `README.md`. No original study records, previous audit reports, implementation plans or UX portfolio rubric were found in the repository baseline search.
- Live URLs were supplied as references, but retrieval failed during this baseline. Local files remain authoritative; local/live parity is unverified.

An existing page claim is evidence of what is currently published in the source. It is not independent verification of the underlying research.

## Evidence register

| Item | Available basis | Status and boundary |
| --- | --- | --- |
| Discovery interviews | `#discover` says James interviewed two clinicians and one patient, alongside reviewing client research/content | Existing approved page wording; original records unavailable. Keep separate from usability testing |
| Seven patients and three clinicians | User's handover | User-supplied research context; phase, overlap and task-level participation need confirmation |
| Entry/suitability: 71% success and 71% significant path deviation | Results strip, `#entry-ia-title` and `salient-bio-entry-before.png`; handover describes 71% homepage early-path deviation | Definitions may differ. Confirm whether these name the same task, measure and denominator |
| Search: 86% task success and 71% filter/chip issues | Results strip, `#search-title` and `salient-bio-search-before.png`; handover confirms search success despite filter friction | Task success and friction are different measures. Counts, scoring criteria and denominator not independently verified |
| Clinician route: 33% partial success and 67% high deviation | `#clinician-title` and handover | Confirm task sample and partial-success/high-deviation definitions; do not label partial success as full success |
| Results and next steps: 100% success and 100% next-step clarity | Results strip | Task wording, sample, scoring and underlying evidence unresolved |
| Glossary: 33% full completion and 67% significant deviation | Supporting finding under `#clinician-title` and `salient-bio-glossary-before.png` | Denominator unresolved. Do not assume it matches either the patient or clinician cohort |
| Later revisions not retested | Intro image caption, validation note, comparison captions and outcome | Preserve this limitation beside revised designs and in the conclusion |

Do not derive participant counts by reversing rounded percentages. Five of seven, six of seven, one of three and two of three may be plausible arithmetic, but are not verified observations. Do not combine discovery and testing samples, or imply all ten people attempted every task.

### Asset/content corrections and remaining uncertainty

- Pass 2 relabelled `salient-bio-clinician-home.png` as a clinician resource concept, not an earlier failed route. Captions explain design intent and distinguish the two concept slides from a tested before-and-after comparison. The precise tested/delivered version chronology remains unresolved.
- Pass 2 corrected the glossary prose and alt text to reflect the in-context panel already visible in `salient-bio-glossary-before.png`. The supported change is clearer signposting and a refined panel, not introducing contextual definitions for the first time. Revised usability remains unvalidated.
- Pass 5 uses focused interface excerpts for homepage/search/glossary, with complete source-slide links and explicit revision limits. Crops are CSS viewports over the unchanged original PNGs, retaining lazy loading. Embedded slide claims are not promoted into validated outcomes. Clinician images retain concept-view status.
- User direction, 20 October 2026: proceed with existing material. Original records may be in Figma; do not block ordinary presentation work on locating them. Keep unresolved counts/definitions in this register and revisit when a relevant file is supplied. Do not infer missing evidence.

## Individual and team contribution

Existing source attributes these activities to James: leading discovery research; interviewing two clinicians and one patient; mapping user flows; developing and simplifying information architecture; exploring search/retrieval; bringing competing proposals to the team for critique; designing the usability study and success criteria; interpreting evidence; contributing to the prototype and testing with users.

The overall Learn Hub concept and design revisions are collaborative work. Preserve “I” for supported personal contributions and “we” for team decisions. Do not imply sole ownership of the complete prototype or introduce team size, named collaborators, client stakeholders or responsibilities without a source.

## Design principles and constraints

Visitor mode: Experience, with readable evidence and reasoning supporting the product artefacts.

- The compact access model is the main first-reading architecture visual. The full Pass 4 model and approved Pass 6 route controls now sit inside the architecture-stage disclosure; supplementary diagrams and detailed architecture are available through ordinary source links. The user has removed the requirement to label their own explanatory diagrams as retrospective reconstructions; captions describe the routes instead.
- Entry/search evidence retains the distinctions between findings, interpretation, individual/team response and validation limits. Detailed findings now sit inside the testing-stage disclosure beneath the agreed first-reading story and homepage preview.
- Keep Pass 1's concise opening. The purpose, patient/clinician problem, role, contribution, client/team context and product image should remain visible together at desktop sizes.
- Reuse Habit Hero's hierarchy, concise narrative headings, proximity between evidence and decisions, accessible disclosures and explicit validation boundaries. Adapt these patterns to journeys and information architecture rather than copying its phone-led page structure.
- Preserve Archivo Black, Archivo and Lato; shared spacing/container conventions; semantic light/dark tokens; navigation, image viewer and accessibility controls.
- Preserve Discover, Define, Develop and Outcome colours through existing stage tokens. Do not add a competing palette or design system.
- Use British English and make the smallest necessary copy changes. Avoid unsupported outcomes and marketing claims.
- The user explicitly rejected retrospective labels for newly drawn diagrams of their own work. Describe what those diagrams show. Preserve relevant tested/unvalidated distinctions for product revisions.

## Interaction principles

Evaluate opportunities in this order:

1. A patient/clinician journey diagram that connects difficulties to evidence and decisions.
2. Before/after information architecture comparisons that explain structural changes.
3. Expandable evidence and design reasoning.
4. Annotated screenshots showing what changed and why.

The approved Pass 6 enhancement offers All routes, Patient journeys, Clinician resources and Search and direct access. It starts with the full model; selection highlights one route and updates a short explanation, without hiding or dimming the others. Controls are revealed only after successful script initialisation. There is no automatic motion or selection.

Implementation priority depends on evidence readiness and reader benefit. Keep core findings and reasoning available without hover, motion or JavaScript. Use native controls, keyboard access, visible focus and reduced-motion support. Do not hide all revised evidence behind a comparison slider.

## Validation and release boundaries

Prototype usability findings do not establish clinical accuracy, commercial impact, reduced support demand, improved conversion or lasting changes in understanding. The AI summary is an unvalidated hypothesis with unresolved clinical/content guardrails.

The user retired the previous portfolio rubric and the 80/100 target on 20 October 2026. Use concise, issue-led Impeccable reviews for hierarchy, readability, responsiveness and accessibility. Research accuracy remains a separate source check. Do not introduce a replacement numeric scoring requirement or wait for the old rubric.

Work in small reviewable passes. Read this brief, the plan and the progress file first. Update progress after each pass. The user subsequently required approval for every design decision. Develop concrete proposals for review, then obtain approval before implementing layout, visual or interaction decisions. Approval of the IA story direction does not approve an unspecified page redesign. Do not repeatedly seek approval for decisions already explicitly approved. Do not commit, push or deploy without explicit user instruction; deployment always needs approval.


## Visual reasoning direction, 21 October 2026

The user authorised the proposed visual additions and will review them after implementation. Within this scope, no further design approval is needed before making the suggestions concrete. This supersedes the earlier per-decision approval gate for this pass.

Research uses finding-to-requirement pairs with directional connectors. The compact architecture overview shows connected patient and clinician branches, with search available across both. Expanded search places focused earlier/revised control and result excerpts beside the existing reasoning. Captions identify visible details; full source slides remain available. No participant quotes were added. Opening, five-stage story and existing validation limits are preserved.


## Follow-on stage visuals, 21 October 2026

The user instructed continued implementation of visuals for each stage. Existing research pairs and search comparisons are retained. The architecture now includes a focused excerpt of the working content structure. Testing highlights “It felt a little buried”, transcribed from the existing homepage finding slide, with a direct source link; no speaker identity or further quote is inferred. The study framework is a native HTML branching diagram using the existing questions and measures. The final overview now includes a native HTML map of proposed patient/clinician tasks and common evaluation measures. Its future status stays explicit. No additional scripts or assets are introduced.
