# TASKLIST.md — Implementation Tracker

> **Project:** Federico Prask — Personal Website  
> **Branch:** `dev`  
> **Last updated:** 2026-11-03  
> **Design authority:** `DESIGN.md`
>
> This file tracks implementation work only. It must not redefine visual or interaction requirements. When a design decision changes, update `DESIGN.md` first, then update the corresponding task here.

## 0. Status legend

- [x] Completed and source-checked.
- [ ] Not started or not yet verified.
- [~] In progress.
- [!] Blocked by a decision or external dependency.

A task is not complete merely because code has been written. Build, runtime and visual verification are tracked separately.

## 1. Current project state

The active application is a deliberately small Vue page. The old page composition and its component tree have been removed from this branch. The supplied FP Logo is now rendered by an inline SVG component.

**Current implementation boundary:**
- The full-screen Title Page structure exists.
- Language and theme controls remain available.
- The Logo uses the original SVG viewBox, path data and fills.
- K0 has a provisional left-to-right clipping reveal with a reduced-motion final-state fallback.
- K2–K5 are not implemented.
- The four content Parts are not implemented.
- K0 has not yet been reviewed in a local browser; a local production build and visual review have not been completed.

**Next implementation target:** verify and tune K0 in a browser, then implement K1 as a separate SVG annotation layer. Preserve the F outline through the entire K1 waiting state; it disappears only when K2 begins.

## 2. Foundation and repository cleanup

### 2.1 Design and application foundation

- [x] Establish `DESIGN.md` as the design source of truth.
- [x] Record the four-Part information architecture and the K0–K5 motion sequence.
- [x] Add semantic design tokens for typography, blue identity, neutral surfaces and Hero colors.
- [x] Replace the old global styling with a small Tailwind/base stylesheet.
- [x] Reduce `App.vue` to the new application shell and Title Page.
- [x] Create the full-viewport Title Page structure.
- [x] Preserve Chinese / English selection.
- [x] Preserve Light / Dark / System theme selection.
- [x] Display the supplied asset at `public/images/fp-logo.svg`.
- [x] Simplify `useI18n.ts` so it no longer imports the old content model.
- [x] Remove unused Font Awesome initialization from `main.ts`.

### 2.2 Legacy cleanup

- [x] Remove obsolete page components: About, Card, Contact, Experience, Figure, Footer, Hero, Projects, Stack, Ticker and TopBar.
- [x] Remove the orphaned legacy `src/views/Homepage.vue` view.
- [x] Remove obsolete UI primitives: Corners, Frame, Icon, Pill, Reveal, SectionHeader and TaggedFrame.
- [x] Remove the old `data.ts` / `data-en.ts` content model.
- [x] Remove unused `fonts.css` and embedded Space Mono stylesheet.
- [x] Remove the empty router placeholder.
- [ ] Audit `public/images/1.png`, `2.png` and `3.png`; retain, rename or remove them only after confirming their purpose.
- [ ] Audit dependencies that were used by the old implementation and remove unused packages through the selected package manager.
- [ ] Regenerate and verify the lockfile after dependency cleanup; do not edit lockfile contents by hand.
- [ ] Review README and repository metadata so they describe the redesigned site rather than the old implementation.

## 3. Phase 1 — Title Page and Logo sequence

### 3.1 SVG preparation

- [x] Replace the static `<img>` presentation with `LogoMark.vue`, an inline SVG component with separately addressable vector layers.
- [x] Preserve the original `0 0 256 256` viewBox.
- [x] Preserve the source white rounded-square path exactly.
- [x] Preserve the source black FP monogram path exactly.
- [x] Add stable IDs / grouping around the existing paths without redrawing the Logo.
- [x] Keep the explanatory F-outline annotation as a separate construction layer; do not replace the FP Logo with an invented final mark.
- [x] Define explicit groups for persistent guide lines and temporary annotation elements.

### 3.2 K0 — Logo Reveal

- [x] Implement the first provisional left-to-right clipping reveal described in `DESIGN.md`.
- [ ] Tune direction, distance, duration and easing through browser iteration.
- [ ] Tune K0 and K1 together so the crossfade begins exactly after the reveal completes.
- [x] Keep the Logo aligned within the right side of the Title Page.
- [ ] Verify the reveal in Light and Dark modes and at narrow viewport widths.
- [x] Make reduced-motion users enter the static K1 annotation state without playing K0/K1 motion.

### 3.3 K1 — SVG Annotation

- [x] Crossfade the normal Logo into the SVG construction annotation when K0's SVG animation completes.
- [x] Build the F outline, five horizontal guides and four vertical guides.
- [x] Add x/y coordinate annotations and dimension ticks.
- [x] Add Force nodes and tangent/control handles for the rounded upper-left curve.
- [x] Connect each tangent handle to its corresponding vector node.
- [x] Keep Force values and a visible “Force” label out of the annotation.
- [x] Keep the annotation still after K1; do not use a timeout to start K2.
- [ ] Visually verify that the F outline, x/y annotations, Force handles and guides remain visible throughout the K1 waiting state.
- [ ] Visually verify that the normal Logo is fully gone at the end of the crossfade.
- [ ] Tune K1 crossfade timing, label positions, guide spacing and line contrast in the browser.

## 4. Phase 2 — First-scroll transition

### 4.1 K2 — Guide conversion

- [ ] Trigger K2 on the first downward user scroll only.
- [ ] Make the trigger one-shot; upward scrolling must not reverse or replay it.
- [ ] Remove x/y annotations, Force nodes, Force handles and the F outline when K2 begins.
- [ ] Preserve the original designated SVG guide-line elements; do not replace them with newly created borders.
- [ ] Move the surviving guides to the bottom boundary of the entire Title Page composition.
- [ ] Expand guide spacing horizontally with the specified fast Out Cubic character.
- [ ] Pause briefly after guide expansion.
- [ ] Reveal the four Part titles in vertical order.
- [ ] Attach a blinking underline cursor to every Part title.

### 4.2 K3 — Framework and theme transition

- [ ] Move the left and right dashed boundaries inward from outside the scene.
- [ ] Shrink the Part frames, titles and title rules in a coordinated layout transformation.
- [ ] Transition the entire scene palette, including backgrounds, text, borders, dividers, cursor and Part surfaces.
- [ ] Make Part surfaces blend into the page background at the end of the transition.
- [ ] Change cursor color, reduce its blink frequency and stop its blinking while keeping the underline visible.
- [ ] Verify the complete transition in both Light and Dark modes.

## 5. Phase 3 — Part.01 introduction reveal

### 5.1 K4 — Part expansion

- [ ] Expand Part.01 to create room for its content.
- [ ] Keep Parts 02–04 compact and in their established order.

### 5.2 K5 — Part fall and content reveal

- [ ] Animate Parts 02–04 downward with a perceptible ease-in / falling character.
- [ ] Reveal Part.01 content from top to bottom and left to right.
- [ ] Reveal ordinary text in short, fast phrase/token groups.
- [ ] Reveal small UI elements with tight sequential staggering.
- [ ] Reveal large visual components as complete objects rather than fragmented pieces.

### 5.3 Introduction content

- [ ] Curate real biographical and technical information.
- [ ] Select the facts and experiences that should appear in the introduction.
- [ ] Write and review Chinese and English copy.
- [ ] Do not invent personal history, awards or project details.

## 6. Phase 4 — Remaining content Parts

### 6.1 Part.02 — Works

- [ ] Curate Development projects.
- [ ] Curate Graphic Design works.
- [ ] Establish a distinctive editorial composition for the portfolio.
- [ ] Ensure work previews appear as complete visual objects.
- [ ] Keep the structure expandable as more work is added.

### 6.2 Part.03 — Milestones

- [ ] Curate verified competitions, awards and notable experiences.
- [ ] Confirm dates, event names and results before publishing.
- [ ] Choose a layout that prioritizes scanability.

### 6.3 Part.04 — Beyond

- [ ] Curate interests and creative activity beyond the main technical portfolio.
- [ ] Select suitable media and presentation formats.
- [ ] Keep this Part distinct from a miscellaneous content dump.

## 7. Phase 5 — Quality and verification

- [ ] Run the local Vite production build.
- [ ] Resolve TypeScript, Vue and CSS build errors.
- [ ] Review the initial state in a browser at desktop width.
- [ ] Review the initial state at tablet and mobile widths.
- [ ] Verify K0–K5 sequencing and first-scroll behavior.
- [ ] Verify no transition reverses or replays after upward scrolling.
- [ ] Verify language and theme controls throughout the animation sequence.
- [ ] Verify Light and Dark palettes.
- [ ] Implement and verify reduced-motion behavior.
- [ ] Check keyboard accessibility, focus visibility and semantic structure.
- [ ] Check console output and asset loading.
- [ ] Re-test after final responsive and performance refinements.

## 8. Current next actions

1. Review and calibrate the K0/K1 sequence in a local browser, including the full waiting state, reduced-motion behavior and responsive sizes.
2. Implement K2 against the persistent guide elements; do not recreate the lines.
3. Update this file and `DESIGN.md` after each completed implementation slice.
4. Do not mark visual verification tasks complete until they have been checked in a browser.
