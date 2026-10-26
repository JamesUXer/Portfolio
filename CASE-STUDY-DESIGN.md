# Shared case-study styles

Habit Hero is the visual reference. `styles.css` remains the source for the
portfolio's colours, font families, themes, image viewer and navigation.
`case-study-system.css` contains the reusable narrative styles extracted from
Habit Hero. Its existing appearance is the baseline, not a new visual direction.

## Adoption

Load styles in this order:

1. `styles.css`
2. The project's own stylesheet
3. `case-study-system.css`
4. `case-study-progress.css`, if used

Add `class="case-study-system"` to the case-study article. Habit Hero and Salient
Bio both use it. Salient's local adoption rules preserve its desktop product
imagery and compact diagram labels while consuming the shared type roles.

The `#hh-goal-study` alternative in shared `:is()` selectors deliberately retains
the specificity of the original rules. It is a migration adapter for Habit
Hero's older ID-scoped CSS; another page only needs the opt-in class. Do not add
more project IDs to the shared stylesheet. Review conflicting local overrides
when adopting the shared system, rather than adding `!important` declarations.

## Typography

| Role | Desktop | Up to 760px |
| --- | --- | --- |
| Main title | `clamp(3rem, 4.2vw, 4rem)`, line-height 1.05 | `clamp(2rem, 9.5vw, 3.5rem)` |
| Chapter heading | 2.5rem, line-height 1.35 | `clamp(1.65rem, 7.2vw, 2rem)`, line-height 1.3 |
| Supporting heading | 1.5rem, line-height 1.3 | Same |
| Body | 1.125rem, line-height approximately 1.556 | 1rem, line-height 1.5 |
| Caption / qualification | .9375rem, line-height 1.5 | Same |
| Control | 1rem, line-height 1.5 | Same |
| Disclosure label | Body size, heading font, weight 600 | Mobile body size |
| Stage label | .875rem, heading font, weight 700 | Same |

Display headings use `--font-display`; supporting headings use `--font-heading`;
prose and captions use `--font-body`. The prose measure is 70ch. Shorter columns
may be appropriate beside evidence, but heading roles should keep the same scale.
Project-specific evidence labels and annotations remain in the project's CSS.

## Reusable components

- `.story-chapter` and `.group-start`: established chapter separation and spacing.
- `.chapter-copy`, `.chapter-bridge`, `.reading` and `.detail-body`: prose measure,
  introductory spacing and supporting reading roles.
- `.discover`, `.define`, `.develop` and `.deliver`: existing green, teal, amber
  and coral tokens. Deliver maps to the portfolio's `--stage-outcome-*` tokens.
- `.stage-label`: editorial text, without button or badge styling.
- Native `details` / `summary`: disclosure row typography, dimensions and focus
  treatment. Preserve native keyboard behaviour. Existing project-specific
  expand icons and disclosure interiors remain local.
- `.narrative-body`, `.narrative-line`, `.narrative-heading` and
  `.narrative-marker`: decorative desktop reading rail. Line and marker elements
  must be `aria-hidden="true"`; they are not controls. Hidden below 960px.
- Figures and existing caption aliases: consistent text size, colour and leading.

Spacing roles use `--cs-prose-gap`, `--cs-copy-gap`, `--cs-chapter-gap`,
`--cs-caption-gap` and `--cs-rail-offset`. Do not introduce a separate copy of the
type scale in a project's CSS.

Phone dimensions, desktop product compositions, screenshot crops, comparison
sliders, carousels and persona playback stay project-specific. They do not define
the shared system. Existing image enlargement remains in `styles.css` and
`scripts.js`.

## Verification for a migration

Compare against Habit Hero at 390px, 768px, 1280px and 1440px, in dark and light
themes, with disclosures closed and expanded. Check title/heading wrapping, body
measure, captions, stage colours, spacing and horizontal overflow. Exercise
disclosure keyboard controls, focus visibility, image enlargement and reduced
motion. Preserve evidence, attribution and validation boundaries.
