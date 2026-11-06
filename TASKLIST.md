# TASKLIST.md — Implementation Tracker

> **Project:** Federico Prask — Personal Website  
> **Branch:** `dev`  
> **Last updated:** 2026-11-04  
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
- The full-screen Title Page structure exists, with Chinese/English and theme controls.
- The Hero name and FP Logo now use a compact base scale from K0 onward (approximately 84% of their previous CSS sizing); the overall layout width and column gap are reduced. The `DARK` / `LANGUAGE` controls and website designation retain their prior sizes. Visual sizing still needs browser review.
- K0 has a source-level two-stage prototype: opacity-and-blur plate entrance, reverse contour trace of the original monogram path, then the original solid fill. Visual interpretation and timing still require browser review.
- K1 has a source-derived construction view of the complete FP Logo: solid plate/monogram outlines, nineteen dashed guides, coordinate labels and Force handles. K0/K1 are not yet visually approved.
- K2 has been rewritten at source level. The five original paths become full viewport-width rules during the first movement, while the document scrolls 22% of the Hero height with In-Out Cubic. After a short hold, the lowest line becomes the visual anchor; the remaining document scroll and the four upper lines move with matching Out Cubic timing, unfolding upward from the anchor. The annotation SVG is not stretched. Four Part titles then reveal together, character by character. Source files are fetched and checked; local build, animation rendering and input behavior remain unverified.
- Part titles use the original local SF Pro variable TTF at public/fonts/SF-Pro.ttf. Its wght axis (1–1000) and opsz axis (17–28) are confirmed; titles request weight 800 (Heavy), and the TTF is preloaded. Browser rendering still requires verification.
- K3 is implemented at source level with one shared 1500ms Out Cubic progress driver. Full-height vertical rules start at the viewport/browser edges and move inward; title position, title scale, title-row height and full-width horizontal-rule spacing are computed from that same progress. At the end of K3, the top horizontal rule and left vertical rule have matching distances from their respective viewport edges, using the same measured inset. The synchronized cursors now wait one 900ms blink cycle rather than two before K3 begins. Local build and browser review remain pending.
- K4/K5 are implemented as one continuous source-level transition: after K3, Part.01 expands toward 60% of the viewport while Parts 02–04 fall from the same first frame. One 1250ms In Cubic progress value drives both effects; the lower four rules and titles travel together, beyond the viewport. Part.02–04 title font sizes and scales remain unchanged during the fall. A copy of the Part.01/Part.02 shared rule is captured before the expansion and remains close to the Part.01 title, while the original moves away with Parts 02–04. Reduced-motion users get the expanded Part.01 with Parts 02–04 still visible. The actual Part.01 content and reveal sequence are not implemented; current revision needs a fresh build and browser review.
- A local production build and browser visual review have not been completed.

**Next implementation target:** pull dev, run a local production build, then verify K0–K5 in the browser. Check the compact K0 Hero dimensions at desktop/mobile sizes, SF Pro Display Heavy loading, the complete K0–K2 choreography, K3's equal top/left page-edge insets and shortened wait, both palettes, K4's 60%-viewport expansion, and K5's simultaneous scale-and-fall, acceleration, off-screen exit and retained Part.01 bottom rule.

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
- [ ] Verify the compact K0 name/Logo composition at desktop, intermediate and narrow viewport widths; confirm the DARK / LANGUAGE controls and website designation retain their prior sizes.
- [x] Make reduced-motion users enter the static K1 annotation state without playing K0/K1 motion.
- [x] Reduce the Hero name and Logo base dimensions from K0 onward while leaving the language/theme controls and website designation unchanged.
- [ ] Verify the compact Hero composition at desktop, intermediate and narrow mobile widths.

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

### 4.1 K2 — First-scroll framework choreography

- [x] Preserve and animate only the five original horizontal path elements: `guide-plate-h-01`, `guide-mono-h-04`, `guide-mono-h-06`, `guide-mono-h-07`, `guide-plate-h-02`.
- [x] Convert those five paths to 0.35px solid framework rules with the existing inverse blue theme mapping; hide all other construction guides and fade out the Logo outline, coordinates and Force handles.
- [x] Move all five original paths directly from their K1 coordinates into a moderately spaced compact group.
- [x] Make the five rules full viewport width during the first line movement; do not wait until the second stage to widen them.
- [x] Position the lowest compact rule near the viewport bottom after the initial partial scroll, with the other four rules stacked above it.
- [x] Add a real document scroll of 22% Hero height using In-Out Cubic; keep the Hero visibly present.
- [x] Hold the compact full-width composition for 170ms.
- [x] Use Out Cubic for the remaining document scroll and for the lowest rule's matching document-space movement, keeping that rule visually anchored in the viewport.
- [x] Expand the four upper rules upward from the lowest rule, starting immediately above the anchor and staggering bottom-to-top by 65ms.
- [x] Keep all five rules full width during Stage C; do not add a second horizontal expansion.
- [x] Add the following full-viewport framework stage to the document so the Hero can physically leave the viewport.
- [x] Reveal all four Part titles only after the upward line expansion; start all four rows simultaneously.
- [x] Replace the clipped whole-line title reveal with individual character pop-in animation using Out Cubic and a 36ms per-character delay.
- [x] Use a shared page-edge inset for title text; keep the rules edge-to-edge.
- [x] Use a baseline-aligned single-color underline cursor with binary 0%/100% opacity blink; keep each cursor attached to its title's final character.
- [x] Start all four cursor blink cycles together, after the longest title has completed, using one shared delay and period.
- [x] Set desktop title line-box size to at least 0.4 of the adjacent rule spacing; preserve the current mobile size.
- [ ] Verify wheel, touch, keyboard and scrollbar-triggered input; confirm K2 runs once and upward scrolling never reverses it.
- [ ] Verify that the initial 22% document movement leaves the Hero visible and the five full-width rules occupy the lower area with moderate spacing.
- [ ] Verify that the lowest rule remains fixed in the viewport while the remaining scroll and upper-rule expansion use the same Out Cubic curve.
- [ ] Verify that the four upper lines unfold upward in bottom-to-top order without changing horizontal width.
- [ ] Verify that all four titles begin simultaneously, characters pop one by one, cursor alignment remains exact, and the desktop/mobile size rules hold.

### 4.2 K3 — Framework and theme transition

- [x] Add two continuous viewport-height vertical rules at the measured Hero-name inset and its mirrored right position.
- [x] Start both vertical rules exactly at the viewport/browser edges and move them inward by the measured Hero-name inset.
- [x] Drive vertical guides, title position/scale/row height and horizontal-rule spacing from one shared 1500ms Out Cubic progress value; do not use independent geometry transitions.
- [x] Calculate the horizontal guide-to-title clear space from the same row geometry as the vertical title-to-horizontal-rule clear space, keeping the two distances equal throughout K3.
- [x] Keep all five horizontal rules full viewport width; anchor the top rule to the same interpolated top inset as the left vertical guide's final inset, and compress the four row gaps below it.
- [x] Give horizontal and vertical rules the same 0.35px solid stroke and shared theme colors.
- [x] Align the Part-title container with the vertical guides and scale titles/row spacing to the final 0.72 ratio.
- [x] Remove the four Part background rectangles and the extra title extension line; retain only the original underline cursor.
- [x] Keep the page background identical to the Hero background in Light and Dark modes; transition only titles, rules, boundaries and cursor through K3 content colors.
- [x] Decelerate cursor blinking and leave the underline visible.
- [x] Keep the Hero at its compact K0 base size; do not add a second K3 Hero scale-down.
- [x] Drive the K3 top horizontal-rule inset from the same shared progress as the side boundaries, ending with equal top/left distances from the viewport edges.
- [x] Reduce the pre-K3 cursor hold from two 900ms cycles to one.
- [ ] Verify in the browser that the horizontal distance from each vertical guide to the title edge exactly matches the vertical clear space from the title line box to its adjacent horizontal rule throughout the 1500ms K3 motion.
- [ ] Verify the top horizontal rule and left vertical boundary finish at equal page-edge distances.
- [ ] Verify the single shared Out Cubic progress keeps both guides, titles and all five horizontal rules synchronized, with no premature fast entry.
- [ ] Verify the complete transition in both Light and Dark modes, including a theme change during/after K3.
- [ ] Verify the shortened pre-K3 wait, cursor timing, mobile fit and reduced-motion final state.

## 5. Phase 3 — Part.01 introduction reveal

### 5.1 K4 — Part expansion

- [x] Start K4 automatically after the K3 shared geometry transition completes.
- [x] Expand Part.01 to a first-row height of 60% of the measured viewport height.
- [x] Combine K4 expansion and K5 falling motion on one shared 1250ms In Cubic progress value; do not run them sequentially.
- [x] Keep the uppermost horizontal rule fixed; move the four lower rules as part of the single shared K4/K5 trajectory.
- [x] Keep the Part.01 title anchored in its original compact header zone; start Parts 02–04 falling at the same time as the expansion without shrinking their title text.
- [x] Increase the framework scroll-stage height by the same amount so document flow matches the expanded layout.
- [x] Skip interpolation and enter the final K4 geometry for reduced-motion users.
- [ ] Verify the expansion timing, title anchor, rule alignment, lower-Part spacing and page scroll range in the browser.

### 5.2 K5 — Part fall and content reveal

- [x] Start Part.01 expansion and the Parts 02–04 fall together after K3; there is only one 1250ms In Cubic timeline.
- [x] Drive the position-only fall from the same progress value starting at the first frame; preserve Part.02–04 title font sizes and scales.
- [x] Move the four lower horizontal rules with the falling Parts, far enough that the titles and rules leave the viewport.
- [x] Duplicate the shared Part.01/Part.02 rule at its exact pre-expansion position, close to the Part.01 title; keep that copy fixed while the original rule falls away.
- [x] Skip the falling motion for reduced-motion users and retain Parts 02–04 in their compact positions.
- [ ] Verify the acceleration, unchanged title scale, final off-screen displacement and duplicate rule position in the browser.
- [x] Reveal Part.01 content from top to bottom and left to right.
- [x] Reveal ordinary text in short phrase groups, with each complete group as one unit rather than character-by-character.
- [x] Use the Part-title-style upward pop on each group (0.42em rise, 0.94 to 1 scale, 420ms Out Cubic) with a 58ms stagger.
- [x] Keep the Introduction in normal document flow so the page grows to fit the complete copy.
- [x] Provide a reduced-motion presentation with all copy immediately readable.
- [ ] Verify the complete reveal sequence and reading order in the browser.
- [ ] Verify the content start position against the retained Part.01/Part.02 divider at desktop and mobile widths.

### 5.3 Introduction content

- [x] Use the supplied biographical and technical information without inventing personal history, awards or project details.
- [x] Preserve the supplied Chinese copy.
- [x] Provide an English translation for the existing language selector.
- [x] Highlight only “丰朴 FedericoPrask” in the opening sentence with the uploaded LXGW WenKai Lite face and a blue-toned highlighter treatment.
- [ ] Review the English translation and verify the handwritten font/highlighter treatment and smaller closing tagline in the browser.

## 6. Phase 4 — Remaining content Parts

### 6.1 Part.02 — Works

- [x] Specify Part.02 as a structured, table-like information section in `DESIGN.md`.
- [x] Specify a one-piece upward pull-out entrance using In-Out Cubic easing, beginning below the final Part.01 content.
- [x] Keep Part.02 typography at its designed final size during the entrance; do not scale its title or content.
- [ ] Design the exact Works rows, columns and content hierarchy.
- [ ] Implement and browser-test the Part.02 pull-out entrance.
- [ ] Define separate entrance behavior for Parts 03 and 04; do not assume they share Part.02's motion.
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

### Part title typeface

- [x] Register the original variable TTF at `public/fonts/SF-Pro.ttf`; its `wght` axis spans 1–1000 and its `opsz` axis spans 17–28.
- [x] Request SF Pro Display Heavy with CSS weight 800; enable optical sizing for the `opsz` axis.
- [x] Preload the original variable TTF in `index.html` so it is fetched before the Part title reveal.
- [x] Keep the separate italic WOFF face at `public/fonts/SF-Pro-Italic.woff`, registered as static weight 400.
- [!] Determine whether separate Text / Display / Rounded aliases or additional font files are needed; the inspected TTF identifies its family as SF Pro and exposes only `opsz` and `wght` axes.
- [ ] Verify in the browser that the original variable TTF is loaded and visibly renders weight 800, and that the desktop/mobile size rules remain correct.

## 8. Current next actions

1. Run the local app and inspect the opacity-and-blur plate entrance, reverse contour trace, final fill and K1 handoff; decide whether the contour trace matches the intended F-to-P growth.
2. Check Logo sizing at several viewport widths; tune the minimum, preferred and maximum sizes if the Logo still feels too sensitive to window width.
3. Review and calibrate revised K0/K1 in a local browser, including the full waiting state, reduced-motion behavior and responsive sizes.
4. Browser-test the revised K2 sequence: full-width Stage A rules, the lower-rule viewport anchor, bottom-to-top upward unfolding with matched Out Cubic scroll, and simultaneous character-by-character Part title reveals.
5. Browser-test K3–K5: verify equal top/left page-edge insets, the shorter pre-K3 wait, and that Part.01 expansion plus Parts 02–04 scale-and-fall form one continuous motion with no two-stage drop; verify the retained shared rule stays close to the Part.01 title.
6. Browser-review Introduction: check the start position below the retained divider, paragraph spacing and full-page scroll range; verify the LXGW WenKai Lite name mark in both themes and at mobile widths.
7. Verify Chinese/English switching, reduced-motion behavior and on-demand font loading.
8. Update this file and `DESIGN.md` after each completed implementation slice.
9. Do not mark visual verification tasks complete until they have been checked in a browser.
