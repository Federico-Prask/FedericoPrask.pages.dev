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
- K0 now has a source-level two-stage prototype: opacity-and-blur plate entrance, reverse contour trace of the original monogram path, then the original solid fill. The contour interpretation, plate focus-in appearance, theme inversion and timing still require browser review.
- K1 now has a source-derived construction view of the complete FP Logo: solid plate/monogram outlines, nineteen unshifted full-span dashed guides using the dedicated theme-adaptive `--site-guide` token (light blue in Light mode, dark blue in Dark mode), bracketed start coordinates and solid Force handles at eight rounded corners. K0/K1 are not yet visually approved.
- K2–K5 are not implemented.
- The four content Parts are not implemented.
- A local production build and browser visual review have not been completed.

**Next implementation target:** run and visually inspect the K0/K1 prototype. The K1 guide paths now follow their exact source coordinates and span the original Logo frame; coordinate-label placement, handle scale and line rhythm still need browser review. Preserve the complete FP Logo outline through the K1 waiting state; it disappears only when K2 begins.

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
- [x] Build the construction outline from the complete supplied FP Logo geometry, including the rounded background plate; do not substitute a standalone F.
- [x] Define explicit groups for the nineteen persistent source-derived guide lines and temporary outline/coordinate/Force elements.

### 3.2 K0 — Logo Reveal

- [x] Implement the original first-pass left-to-right clipping reveal (obsolete prototype; retained only as implementation history).
- [x] Replace the old left-to-right clip with a two-stage source prototype: reveal the white plate from the bottom using a opacity-and-blur focus transition, then trace the original monogram contour in reverse from its final path point near the F stem's lower terminal.
- [x] Preserve the original filled monogram path geometry; use a separate no-fill trace layer and restore the exact solid fill after tracing. (Visual interpretation remains unverified.)
- [x] Loosen the Title Page name tracking from -0.085em to -0.035em. (Final spacing still needs browser review.)
- [ ] Tune the revised K0 stage timing and easing through browser iteration.
- [ ] Tune K0 and K1 together so the crossfade begins exactly after the reveal completes.
- [x] Keep the Logo aligned within the right side of the Title Page.
- [x] Apply whole-Logo inversion in Light mode while retaining the original colors in Dark mode, with a 100ms filter transition.
- [ ] Verify the opacity-and-blur plate entrance and theme inversion in Light and Dark modes and at narrow viewport widths.
- [ ] Verify the bounded responsive Logo sizing at desktop, intermediate and narrow viewport widths.
- [x] Make reduced-motion users enter the static K1 annotation state without playing K0/K1 motion.

### 3.3 K1 — SVG Annotation

- [x] Crossfade the normal Logo into the SVG construction annotation when K0's SVG animation completes.
- [x] Reuse the exact source paths for the complete FP monogram and rounded background-plate frame as solid outlines.
- [x] Derive nineteen separate dashed guide paths from the original horizontal/vertical segments: four plate segments and fifteen monogram segments; include the F's closing left stem edge from (52,199) to (52,40); align each guide to its exact source coordinate and extend it to the corresponding edge-to-edge boundary of the original 256 × 256 Logo frame; do not add unrelated background-grid lines.
- [x] Add one `[ x , y ]` coordinate label at the original start point of every guide; for vertical guides stack five centered rows in the order `[`, x-coordinate, comma, y-coordinate, `]`; draw the larger horizontal square brackets as centered SVG paths, and use `dominant-baseline="middle"` for all coordinate text rows; render labels in the active theme color without a text outline or halo.
- [x] Add Force anchor nodes and solid tangent/control handles at all eight rounded corners: four on the plate and four on the FP monogram.
- [x] Keep Force values and a visible “Force” text label out of the annotation.
- [x] Keep the annotation still after K1; do not use a timeout to start K2.
- [ ] Visually verify that the complete FP outline, all nineteen guides, coordinate labels and Force handles remain visible throughout the K1 waiting state.
- [ ] Visually verify that the normal filled Logo is fully gone at the end of the crossfade.
- [ ] Visually verify the rounded plate frame and FP monogram have matching 1.7px solid outline widths, both clearly heavier than the 0.65px butt-ended dashed guides.
- [ ] Verify in the browser that all nineteen coordinate labels remain clear of one another and of the rounded background-plate outline, with the actual loaded technical font and at the rendered K1 Logo size.
- [x] Calculate the coordinate-label text bounds and reposition the colliding labels; the conservative monospace estimate now has zero label-to-label intersections and approximately 3.62 SVG units of minimum clearance; the left/right plate labels are inset to clear the frame strokes. Browser/font-metric verification remains pending.
- [ ] Visually tune K1 dashed-line rhythm, coordinate-label positions, handle scale and crossfade timing in the browser.

## 4. Phase 2 — First-scroll transition

### 4.1 K2 — Guide conversion

- [ ] Verify all K2 navigation inputs in the browser: wheel, touch swipe measured from the initial touch point, keyboard navigation, and actual downward document scrolling. Inputs received during K1 must be queued and applied once the annotation reaches its waiting state.
- [x] Make the trigger one-shot; upward scrolling must not reverse or replay it.
- [x] Fade out and then hide coordinate labels, Force nodes, Force handles and the complete original FP Logo outline when K2 begins, while leaving the original persistent guide group untouched.
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

### K0/K1 handoff correction

- [x] Bind the K0 completion listener directly to the final monogram-fill path; rely on the dedicated target instead of comparing a potentially rewritten scoped keyframe name.
- [ ] Verify locally that K0 crossfades into the complete K1 annotation and that the normal Logo is fully gone.
- [ ] Verify the complete FP Logo outline, all nineteen dashed guides and their bracketed start-coordinate labels, and all solid Force handles remain visible in the K1 waiting state.

## 8. Current next actions

1. Run the local app and inspect the opacity-and-blur plate entrance, reverse contour trace, final fill and K1 handoff; decide whether the contour trace matches the intended F-to-P growth.
2. Check Logo sizing at several viewport widths; tune the minimum, preferred and maximum sizes if the Logo still feels too sensitive to window width.
3. Review and calibrate revised K0/K1 in a local browser, including the full waiting state, reduced-motion behavior and responsive sizes.
4. Implement K2 against the persistent guide elements; do not recreate the lines.
5. Update this file and `DESIGN.md` after each completed implementation slice.
6. Do not mark visual verification tasks complete until they have been checked in a browser.
