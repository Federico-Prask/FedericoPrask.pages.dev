# DESIGN.md — Personal Website Redesign

> **Document status:** Active design specification  
> **Target branch:** `dev`  
> **Project:** Federico Prask — Personal Website  
> **Last updated:** 2026-11-07  
>
> This document is the source of truth for the redesign. Implementation decisions should follow it. If a later discussion changes a confirmed requirement, update this document before or together with the corresponding code change.

---

## 0. How to read this document

The labels below distinguish settled requirements from decisions that still need visual testing:

- **Confirmed** — explicitly agreed by the owner. Do not change during implementation without discussing it.
- **Design constraint** — a requirement that constrains implementation, even if its exact numerical value is not fixed.
- **Provisional** — a practical starting point that may be adjusted after seeing the result.
- **Open** — not decided yet. Do not silently invent a final answer.

The document intentionally separates *what the experience must do* from *how it will be implemented*. Animation durations, easing parameters, exact responsive breakpoints and some color mappings remain open until they can be evaluated in the browser.

## 1. Product intent

### 1.1 Purpose

The website is a short personal homepage that introduces Federico Prask and presents selected work, milestones and interests.

The first impression should be driven by a distinctive visual composition and a carefully choreographed animation. Visitors who continue reading should discover substantial, concrete information rather than an empty animated landing screen.

The intended impression is that the owner is technically capable, creative, active and optimistic. The site should communicate this through actual projects, design work, experiences and interests—not through inflated claims or generic marketing copy.

### 1.2 Design priorities

In descending order:

1. **Visual identity and motion quality.** The opening composition and the transition into the content are the defining feature of the site.
2. **Content quality.** The four Parts must contain meaningful information and real work.
3. **Visual rhythm.** Each Part should have its own layout and visual composition.
4. **Clarity and usability.** Typography, reading order, navigation through the page and controls must remain understandable.
5. **Performance and resilience.** Animation must not make the site feel heavy or prevent access to content.

### 1.3 Reference direction

The primary visual references are:

- **Tailwind CSS website:** strong page-edge structure, restrained rules, clear grid relationships and deliberate whitespace.
- **VOID ZERO:** minimal composition, typographic confidence, spatial tension and a strong relationship between content and empty space.

These are references for design principles, not templates to copy. The result must have its own identity.

### 1.4 What this redesign is—and is not

This is a complete redesign of the page composition and content presentation. It is not a visual refresh of the old component structure.

Do not carry forward old page layouts or decorations merely because they already exist. In particular, the old terminal-style Hero, ticker, old section arrangement, old card patterns, old header/navigation composition and old decorative framing are not design requirements.

The previous implementation is relevant only where it contains useful implementation infrastructure or the established color values documented in Section 4. Existing language and theme behavior should remain available, but their controls may be redesigned.

---

## 2. Page architecture

### 2.1 Overall structure

The page consists of one Title Page followed by four vertically arranged content Parts:

| Order | Part | Main subject | Content status |
|---|---|---|---|
| 01 | Introduction | Personal introduction and selected background | Structure confirmed; copy to be curated |
| 02 | Works | Development and Graphic Design | Structure confirmed; works to be selected and added |
| 03 | Milestones | Competitions, awards and notable experiences | Structure confirmed; entries to be curated |
| 04 | Beyond | Interests and creative activity beyond the main technical work | Structure confirmed; entries to be curated |

Use the spelling **Beyond** in the interface and documentation. “BYD” may appear as informal shorthand in conversation, but it is not the section title.

### 2.2 No Header

**Confirmed: do not add a traditional Header.**

The homepage is intentionally short and should read as one continuous composition. It does not need a persistent horizontal navigation bar or a conventional menu.

Do not reintroduce a Header simply to house the language and theme controls. Those controls are still required, but their placement must be integrated into the composition without creating a Header-like band. Their exact placement is an open visual decision.

The four Parts are the page's primary structure. The expected browsing model is natural vertical reading and scrolling, not navigation between many independent pages.

### 2.3 Content hierarchy

The page should feel like a single designed system, but it must not make every Part look like a repeated card.

Avoid a repeated pattern of:

1. Section title
2. One-line description
3. A row or grid of identical cards

Instead, give each Part a distinct composition while retaining shared rules such as typography, alignment, spacing logic, color tokens and edge treatment.

### 2.4 Part content direction

#### Part 01 — Introduction

This is the first full content area after the transition.

It should introduce the owner in a concise but informative way. Possible subjects include:

- Personal identity and current stage of study.
- Technical interests and development experience.
- Competitive programming or competition experience.
- Selected personal achievements.
- Creative interests outside programming.

Do not turn this into a conventional résumé or a long list of self-descriptions. The writing should sound personal, concrete and natural.

The current content has not been finalized. Do not invent biographical facts, achievements or project details to fill visual space.

#### Part 02 — Works

This is the main portfolio area. It contains two principal categories:

- **Development:** software, websites, utilities, experiments and other development projects.
- **Graphic Design:** posters, layout, typography, visual systems and other graphic-design work.

The two categories may be arranged in one continuous composition, but their identities must remain clear. They do not need to be separated into two identical card grids.

Use varied image ratios, varied visual scale and deliberate asymmetry where appropriate. A selected group of featured works can coexist with a structure that allows more work to be added later.

A work item should be presented as a complete visual object where possible. Do not split a large project preview into many independently animated fragments.

#### Part 03 — Milestones

This area presents competition results, awards, notable experiences and other milestones.

Prioritize scanability and hierarchy. The layout may use a timeline, grouped records, a compact editorial arrangement or another suitable form; the final form is not yet fixed.

Do not fabricate dates, rankings, awards or event participation.

#### Part 04 — Beyond

This area presents interests, experiments and creative activities beyond the main development portfolio.

It should broaden the picture of the owner without becoming an unrelated dump of everything. The design should allow different media and content types where relevant.

### 2.5 Content authenticity

All content and assets must be real or clearly identified as placeholders during development.

- Do not invent project names, screenshots, awards, competition results or personal details.
- Do not use a fabricated logo.
- Do not treat a temporary layout placeholder as final portfolio content.
- Keep the page structure expandable as new works and milestones are added.

---

## 3. Title Page / Hero

### 3.1 Terminology

In this project, **Hero**, **Hero Section** and **Title Page** refer to the initial full-screen page composition. They do not refer to a navigation header.

### 3.2 Initial viewport

**Confirmed: the Title Page fills the initial viewport.**

Use the dynamic viewport height as the starting layout target:

```css
min-height: 100svh;
```

The intended result is a full-screen opening composition, not a short banner with the next section already visible.

Account for mobile browser chrome and viewport changes. The implementation should use modern viewport units and avoid assuming that `100vh` always represents the visible mobile viewport.

### 3.3 Initial composition

The Title Page uses a left/right composition:

| Left area | Right area |
|---|---|
| Federico Prask | Supplied FP Logo |
| Personal Website | Logo reveal / vector annotation presentation |

The left side presents the owner's name and the website designation. The name is the principal typographic anchor.

The initial Hero composition uses a deliberately reduced base scale for the two primary visual elements—the name and the FP Logo—rather than allowing them to dominate the full viewport. This compact sizing is present from K0 and remains consistent through K1 and K2; it is not a scale-down animation reserved for K3. The current first sizing pass reduces the name and Logo dimensions to approximately 84% of their previous CSS sizing and slightly narrows the overall layout width and inter-column gap. The `DARK` and `LANGUAGE` controls and the “Personal Website” / “个人网站” designation are excluded and retain their existing sizes. The measured left edge of the Hero name remains the reference for K3's final left boundary; the right boundary mirrors that inset.

The right side displays the supplied Logo asset at `public/images/fp-logo.svg`. The SVG has a `0 0 256 256` viewBox and exactly two path elements: a white rounded-square background and a black FP monogram. The source paths currently have no animation-specific IDs or grouping. Preserve both path geometries and their fills; any animation wrapper or IDs must be added without redrawing or changing the mark.

### 3.4 Typography

**Confirmed title-font constraints:**

- Use a non-serif typeface.
- Use a proportional (non-monospace) typeface.
- Do not use Serif fonts for titles.
- Do not use Mono fonts for titles.
- The terminal-style cursor is an independent visual element; it does not imply that the title text should be monospace.

A sans-serif family such as Inter may be used as the current implementation starting point, but exact family, weight, optical size, line-height and tracking should be evaluated in the final composition.

**Tracking feedback:** the current lettering feels too tightly spaced. Loosen letter spacing in the next typography pass, with particular attention to the large name heading. The current strongly negative tracking on the name (`-0.085em`) is too compressed and must be reduced substantially or removed. Do not apply one indiscriminate tracking value to every text role; tune headings, subtitles, controls and technical annotations according to their scale and function.

Monospace typography may still be used selectively for technical annotations, coordinates, short labels or metadata where it improves the visual language. It must not become the main title face.

### 3.5 Hero controls

The following functions must remain available:

- Chinese / English language selection.
- Light / Dark theme selection.

Their new visual treatment and exact placement are not yet fixed. They must remain visually subordinate to the Title Page composition and must not create a conventional Header.

The old control layout is not a requirement.

---

## 4. Color system

### 4.1 Color direction

The established blue is an important part of the site's identity and must remain recognizable.

The content area transitions toward a **dark-blue / light-blue visual system**. The Hero begins with a restrained monochrome treatment. During K3, the whole visual system transitions from the Hero treatment into the content treatment.

The color transition must affect the entire scene rather than only selected accents.

### 4.2 Existing color anchors

The following values are retained from the previous site's established palette. They are the starting color references for the redesign, not a mandate to preserve the previous component styling.

| Role | Token / previous name | Value |
|---|---|---|
| Primary blue | Accent | `#9CB8D7` |
| Secondary blue | Accent 2 | `#7E9FC5` |
| Blue for text on light surfaces | Accent ink | `#5B7DA3` |
| Warm light page | Paper | `#F4F3EE` |
| Warm secondary surface | Paper 2 | `#E9E8E1` |
| Warm light panel | Paper 3 | `#FBFAF6` |
| Light primary text | Ink | `#18181B` |
| Light secondary text | Ink 2 | `#3F3F46` |
| Light muted text | Ink 3 | `#6E6E76` |
| Dark page | Paper D | `#0B0B0C` |
| Dark secondary surface | Paper D2 | `#111114` |
| Dark panel | Paper D3 | `#16161B` |
| Dark primary text | Ink D | `#E7E7E4` |
| Dark secondary text | Ink D2 | `#A3A3AD` |
| Dark muted text | Ink D3 | `#6F6F7A` |

The previous implementation also used translucent rule colors derived from the corresponding light or dark text values. New rule colors should be defined semantically and tuned for the actual background, rather than copied as arbitrary decoration.

### 4.3 Blue usage

Blue should be a meaningful part of the visual composition, not merely a tiny accent on buttons or icons.

Use the blue family to establish the content-stage identity through an intentional combination of:

- Important typographic emphasis.
- Selected diagram or annotation elements.
- Rules and structural boundaries.
- Selected work presentation or visual blocks.

Keep the overall page background identical to the Hero background in both Light and Dark modes. Do not introduce a separate blue-tinted page surface during K3. Do not paint every element blue; the identity should come from the relationship between the consistent neutral background, text and fine blue structural lines.

A deep blue such as `#263D58` may be evaluated as an additional supporting color, but it is not a mandatory token until its use is visually confirmed.

### 4.4 Hero-to-content color transition

The Hero's opening treatment is monochrome. The content framework adds blue-based typography and structural accents, but the overall page background remains unchanged.

During K3, interpolate these properties as one coordinated transition:

- Part title text.
- Horizontal rules.
- Left and right boundaries.
- Other structural borders.
- Cursor color.

Do not interpolate the page background or switch it to a blue-tinted content surface. The page background must remain exactly the active Hero background in both Light and Dark modes. Part backgrounds remain transparent; the structure is communicated through boundaries and spacing rather than separate card fills.

### 4.5 Light and Dark modes

**Confirmed: keep both Light and Dark modes.**

The two modes are not merely filters over the same composition. Each mode needs a coherent version of the blue-based typography and structural accents with sufficient contrast, while preserving the Hero background.

The K3 transition must work in both modes:

- Light mode: retain the Hero's warm light background and transition text and structural accents into their light content colors.
- Dark mode: retain the Hero's near-black background and transition text and structural accents into their dark content colors.

The user's selected mode and the animation stage are separate concepts. The transition changes the page from its Hero visual state to its content visual state; it must not accidentally toggle the user's Light / Dark preference.

Exact destination values and intermediate color stops remain subject to visual calibration.

---

## 5. Hero vector presentation: K0–K1

The opening sequence presents the Logo and then its vector construction.

### 5.1 K0 — Logo Reveal

The Logo is the initial visual focus on the right side of the Title Page. Its reveal is a **two-stage, sequential animation**:

1. **Background plate — bottom-up reveal.** The white rounded-square background plate begins to appear at the Logo's bottom edge and reveals upward until the complete plate is visible. The black FP monogram remains hidden during this first stage. Preserve the original background path geometry and fill.
2. **FP monogram — path-following growth.** Once the background plate is fully visible, the black FP monogram grows along the actual designed line/path. Growth begins at the bottom terminal of the F and proceeds continuously through the mark, finishing at the terminal end of the P. The reveal must follow the Logo's vector geometry rather than using a generic rectangular wipe, whole-mark fade or scale-in.

Preserve the original monogram path geometry and fill. The implementation may use a path-derived mask, clip or another geometry-aware reveal technique, but must not redraw the monogram as a different outline or distort the supplied path. The visual result should read as the Logo's strokes being drawn from the F's bottom toward the P's endpoint.

The exact duration, easing, stroke-growth pacing and technical masking strategy remain open for visual implementation and browser tuning. K0 completion is detected only after **both** stages have finished. K1 begins from that actual completion event; it must not depend on a hard-coded timer that can drift from the reveal.

### 5.2 K1 — SVG Annotation

After the Logo reveal, the normal Logo transitions into a construction view of the **complete supplied FP Logo**. The annotation must be derived from the actual FP monogram and its rounded-square background plate. It must never substitute a standalone F or a newly invented approximation.

This is a crossfade, started automatically when K0's reveal animation finishes:

- Normal Logo opacity: 100% → 0%.
- SVG annotation opacity: 0% → 100%.

Both occupy the same 256 × 256 visual region and remain geometrically undistorted. They must not remain simultaneously fully visible. The initial crossfade implementation uses a 700 ms opacity transition; treat this as a provisional value for browser tuning.

At the end of the crossfade, the normal filled Logo is completely gone. The complete source-derived FP outline, including the rounded background-plate frame, the dashed axis guides, coordinate labels and Force handles, remains visible throughout the K1 waiting state. These construction elements are removed or retained only according to their explicit K2 grouping.

K1 completion changes the presentation to a static waiting state. There is no K1 completion timer and no automatic continuation into K2.

### 5.3 Original Logo outline and axis guides

The construction view reuses the exact source path geometry from the supplied Logo:

- The rounded-square background plate is shown as a **solid outline**.
- The complete FP monogram is shown as a **solid outline**, preserving both its outer and inner contours.
- The source fills are omitted in this construction view; no replacement F shape is drawn.

Every horizontal or vertical straight segment in those original paths receives one corresponding **dashed guide line**. The source geometry contains nineteen such segments: four on the background plate and fifteen on the FP monogram. The fifteenth monogram segment is the F's leftmost vertical stem edge, which closes the source path from (52,199) back to (52,40). Each guide remains a separate SVG element with a stable ID.

The guide set is selective, not a background grid: no evenly spaced rows, columns or unrelated grid lines may be added. Each guide lies exactly on its source segment's original horizontal or vertical coordinate, with **no perpendicular offset**. A horizontal guide spans the full original Logo viewBox width (`x = 0` through `x = 256`); a vertical guide spans its full original height (`y = 0` through `y = 256`). The guides therefore extend to the boundaries of the Logo's own 256 × 256 frame and never enlarge that frame. Each guide uses its dedicated `--site-guide` token at full opacity: light blue (`#a9c5e4`) in light mode and dark blue (`#5b7da3`) in dark mode. Do not use `--site-brand` or the monochrome Hero foreground token for these guides. The rounded background-plate frame and the FP monogram use the same 1.7px solid outline width. Guide strokes use square/butt dash ends and remain visibly thinner at 0.65px. Where a guide coincides with the solid Logo outline, the underlying outline remains solid; the dashed rhythm is visible along the guide's extension beyond the Logo segment.

The nineteen guide paths are the persistent elements carried into K2. The original Logo outline, coordinate labels and Force handles are temporary construction elements and are removed when K2 begins.

### 5.4 Coordinate annotations

Every dashed guide has one coordinate label at its source segment's **starting point**, expressed in the Logo's original 256 × 256 viewBox coordinate system:

- Use the bracketed format `[ x , y ]`.
- Labels associated with horizontal segments remain horizontal.
- Labels associated with vertical segments use a five-line arrangement: opening square bracket, x-coordinate, comma, y-coordinate, closing square bracket. Each item occupies its own line, in the exact order `[`, `x`, `,`, `y`, `]`. The top and bottom square brackets are drawn as horizontal SVG paths rather than rotated font glyphs. Their geometric centers align with the same column as the x-coordinate, comma and y-coordinate; the text rows use `dominant-baseline="middle"` so their visual centers align with the bracket paths.
- The numbers identify the original Logo path coordinates, not screen or viewport positions.
- Coordinate labels use the active theme foreground color directly. Do not add a background-colored stroke, outline or halo around the text in either theme.

Coordinate labels must be treated as one layout of nineteen rendered annotations. Calculate each text bounding box using the active technical font and each bracket path's geometric bounds; check label-to-label collisions and intersections with the rounded background-plate outline, including its 1.7px stroke. Reposition conflicting labels with separate rows or offsets while preserving each label's association with its source point. Keep a visible clearance between distinct labels, and ensure the two lower-edge labels do not occupy the same row. Do not replace these point coordinates with generic `x` / `y` axis labels. For the current K1 arrangement, the collision-adjusted label placements are intentionally staggered: `[153,72]` uses baseline y=55.5; `[86,102]` uses y=98; `[121,159]` uses y=167; `[148,131]` is end-aligned at x=152, y=147; and `[153,256]` uses y=285. These are presentation offsets only; the displayed coordinate values remain the original source start points. The current conservative estimate uses 6.2px monospace text at 0.6em advance and 0.85px bracket strokes, producing no label-to-label intersections; the closest estimated label pair is separated by approximately 3.62 SVG units. Browser verification with the actual loaded technical font is still required.

### 5.5 Force annotation

Force handles mark the rounded curve corners in the actual Logo geometry:

- Mark all four rounded corners of the background plate.
- Mark all four curved transitions in the FP monogram.
- A solid connector joins each curve anchor to its corresponding tangent/control point.
- Anchor nodes and control points remain visually distinct.
- Force connector lines are **solid**, never dashed.
- Do not display numeric Force values or a separate visible “Force” text label.

Handle directions and lengths must follow the curve tangents and curvature. They are construction handles, not decorative rays or a generic set of corner markers.

### 5.6 K1 waiting state

After K1 finishes, the scene remains still while waiting for the first downward user scroll.

At this point:

- The Title Page and left-side text remain at their compact K0 base scale; K1 introduces no additional resizing.
- The normal filled Logo is no longer visible.
- The complete original FP Logo outline remains visible, including the rounded background-plate frame.
- All nineteen source-derived dashed guides remain visible, with their coordinate labels at the corresponding segment starts.
- The eight rounded corners retain their Force nodes and solid tangent/control handles.
- No background grid is present.
- The annotation does not morph or move before the first downward scroll.

This waiting state is important. Do not start the layout transformation automatically after an arbitrary timeout.

## 6. First-scroll transition: K2

K2 converts the SVG annotation into the initial layout framework for the four Parts.

### 6.1 Trigger

**Confirmed: K2 is triggered by the user's first downward scroll.**

The first downward input starts the forward sequence once; after it completes, the defined Hero/Part.01 boundary can retrace that sequence in reverse.

Do not bind the transformation to `scrollY` progress. Ordinary upward reading scroll must not reverse or replay it; reverse playback is allowed only at the explicitly defined completed boundary.

Support real downward input across desktop and touch devices. Keyboard-based downward navigation should also be considered.

Repeated input during an active forward or reverse sequence must be consumed rather than restarting or queuing the transition. After a complete reverse returns the page to the K1 waiting state, a new downward gesture may intentionally start another cycle.

### 6.2 Remove temporary SVG construction details

When K2 starts, these annotation elements disappear:

- x/y labels and their position markers.
- Force nodes.
- Force tangent/control handles.
- The complete original FP Logo outline, including the rounded background-plate frame.

The normal Logo has already disappeared during K1.

After these elements are removed, only the designated original annotation frame/reference lines remain.

### 6.3 The five persistent horizontal lines

**Confirmed: K2 retains exactly five horizontal guide paths.** These five lines define the four Part regions and both outer horizontal limits of the framework:

1. The boundary between the Hero and Part.01.
2. The boundary between Part.01 and Part.02.
3. The boundary between Part.02 and Part.03.
4. The boundary between Part.03 and Part.04.
5. The boundary between Part.04 and the not-yet-designed content below it.

The five surviving paths are selected from the original K1 SVG guide elements:

| Framework order | Original guide ID | Original source coordinate |
|---|---|---|
| 1 — Hero / Part.01 | `guide-plate-h-01` | `y = 0` |
| 2 — Part.01 / Part.02 | `guide-mono-h-04` | `y = 72` |
| 3 — Part.02 / Part.03 | `guide-mono-h-06` | `y = 131` |
| 4 — Part.03 / Part.04 | `guide-mono-h-07` | `y = 199` |
| 5 — Part.04 / future page content | `guide-plate-h-02` | `y = 256` |

These are the original SVG elements, not newly drawn substitutes. Their source coordinates identify their K1 construction positions only; K2 animates the same elements into the five final framework positions.

All vertical guide paths and the four unselected horizontal guide paths are temporary construction guides. They disappear during K2. Do not retain vertical guides as Part side boundaries; those belong to the later K3 boundary animation.

### 6.4 Convert the five guides into framework rules

As K2 begins, the five selected horizontal guides:

- Lose their dashed pattern and become continuous solid rules.
- Become thinner than the K1 construction guides. Current target: **0.35 CSS px**; verify visibility on real displays.
- Change to the inverse blue mapping from the K1 construction guides:
  - Light mode: dark blue `#5b7da3`.
  - Dark mode: light blue `#a9c5e4`.
- Remain visually subordinate to the Part titles and page content.

Use the dedicated `--site-framework-rule` token. Do not reuse `--site-guide`, whose K1 light/dark mapping is intentionally the opposite.

### 6.5 K2 motion sequence

K2–K5 form a controlled choreography triggered by downward input at the K1 boundary. After completion, the animation can be retraced in reverse when the user returns to that boundary and scrolls upward. The browser document itself scrolls; the Hero must move upward through the viewport rather than being translated independently. Preserve the five designated original SVG path elements and transform them individually. Never stretch the annotation SVG or replace those paths with newly drawn rules.

**Stage A — Recompose into five full-width rules**

The five original paths move directly from their K1 coordinates into a moderately spaced parallel group in the lower part of the Hero. By the end of this first line movement, every rule is already **the full width of the page**: its horizontal transform begins at the page's left edge and spans the viewport width. There must be no later horizontal widening during Stage C.

The compact group is positioned relative to its bottom rule. At the end of the short initial document scroll, that lower rule sits close to the viewport bottom; the other four rules are stacked above it with a moderate gap (24% of the final Part-row gap, clamped to 22–48 CSS px). At the same time, the document scrolls only **22% of the Hero height** over 560ms with In-Out Cubic. The Hero remains visibly present. The five paths reach their full-width compact arrangement over 720ms using Out Cubic.

**Stage B — Brief held composition**

Hold the compact, full-width five-rule arrangement for 170ms. The Hero is still visible, all five lines are distinct, and the bottom rule establishes the anchor for the next movement.

**Stage C — Expand upward from the fixed lower rule**

The **lowest rule is the visual anchor**. As the page scrolls through the remaining 78% of the Hero height, that lowest rule moves downward in document coordinates by exactly the same distance and with the same 1100ms Out Cubic timing. This counter-movement keeps the lowest rule stationary in the viewport.

The four rules above it expand **upward**, increasing their separation from the lower anchor until the five rules reach the four Part boundaries. Begin with the rule immediately above the anchor, then stagger the remaining rules upward in sequence (65ms between starts); the topmost rule starts last. Their horizontal width remains unchanged at the full page width. The document's remaining scroll uses the same Out Cubic easing as the lower anchor rule, not In-Out Cubic. The Hero leaves the viewport as the upper rules unfold.

At the end, the five full-width rules frame four Part rows. No line is added, removed, or replaced.

**Reverse playback at the completed Hero/Part.01 boundary:** First retract the four Part titles in reverse character order. Then return the four upper rules toward the compact group from top to bottom (the reverse of their bottom-to-top entrance), using the time-reversed In Cubic trajectory while the document scroll returns from the Hero/Part.01 boundary to the 22% scroll position. After the compact group settles, reverse the initial Stage A recomposition and return the document to the top. Restore the original K1 Logo outline, coordinate labels and Force handles with a final 420ms inverse-eased fade; only after that fade completes is input restored. Ordinary upward scrolling within the reading area remains native; only the completed boundary starts this sequence.

**Part title reveal**

Only after the upward line expansion completes, all four Part titles begin together. Each title is split into individual characters; characters pop into place one by one with a restrained upward movement and scale settle, using an Out Cubic curve. The four rows share the same start time and per-character cadence; do not delay one row behind another or reveal each title as one clipped block.

Each title's underline cursor remains attached immediately after its final character. All four cursors wait until the longest title has completed, then begin blinking at the exact same time with one shared delay and one shared 900ms cycle. All cursors use the same current text color and only two opacity states (100% / 0%).

The title text keeps its left inset from the page edge. Desktop title size/line-box height must be at least **0.4 times the distance between adjacent rules** (one part in 2.5); mobile keeps the current title size unchanged.

**Initial source timings:** 720ms for Stage A line movement; 560ms for the initial 22% In-Out Cubic document scroll; 170ms intermediate hold; 1100ms for Stage C document scroll and each rule's Out Cubic movement; 65ms between upward rule starts. The title characters use a 36ms per-character delay and a 420ms Out Cubic pop. These are implementation starting points and still require browser calibration.

The annotation overlay stays at its measured K1 Logo bounds throughout. Only the five original path elements receive matrix transforms. A following full-viewport document stage provides the final scroll destination.
## 7. Part framework and visual transition: K3

K3 converts the expanded guide layout into the final narrow Part framework while the page changes from the Hero's monochrome visual system to the content's blue-based visual system.

This is one coordinated transition, not several unrelated effects.

### 7.1 Hero departure

By the end of K3, the Hero / Title Page content is no longer visible.

The Hero's name and Logo already use their reduced base dimensions from K0. Do not add a second Hero scale-down effect in K3; its departure follows the established page movement. The `DARK` and `LANGUAGE` controls and the website designation are not part of the Hero scale reduction.

The page continues from the Part titles and horizontal separators established in K2.

The departure of the Hero's content must not cause the overall scene background to jump abruptly to the content color. The color transition is still running as part of K3.

### 7.2 Left and right boundary movement

The left and right vertical boundaries begin at the browser's viewport edges and move inward toward the center. This is a directional movement, not a plain opacity fade.

Both vertical guides finish at the measured Hero-name inset and its mirrored right-side position. The left final position is measured from the actual left edge of “Federico Prask”; it is not an independently guessed percentage.

At the end of K3, the top horizontal rule's distance from the top viewport edge must equal the left vertical guide's distance from the left viewport edge. Both use the same final measured inset. During K3, the horizontal top inset interpolates from its initial vertical spacing to that same final inset on the shared progress value; it must not be positioned using an unrelated padding value.

The vertical guides are continuous page-height lines, not the short sides of a rectangular card. At the start of K3, the left guide coincides with the viewport's left browser edge and the right guide coincides with its right browser edge. They move horizontally inward by the measured Hero-name inset. They do not grow vertically.

The geometry must be driven by one shared progress value, not by separate CSS transitions that merely happen to have the same duration. Let p run from 0 to 1 using one 1500ms Out Cubic curve. The vertical-guide positions, title size and row-group height, and the vertical spacing between all five full-width horizontal rules must all be calculated from this same p. This guarantees that their relative positions remain mathematically coordinated throughout the motion.

The title must sit inside the two vertical guides with a deliberate horizontal clear space. That horizontal clear space must equal the vertical clear space between the title's line box and either adjacent horizontal rule. Calculate the vertical clear space from the current row height, current title line-box height and the 0.35px rule stroke. Then position the title from the guide using exactly that calculated gap plus the guide stroke width. Mirror the same calculation on the right side. Do not set the title edge directly on top of the vertical guide.

All five horizontal rules remain full viewport width and are never shortened horizontally. The top rule stays anchored to the shared top inset: as K3 progresses, its distance from the top viewport edge interpolates toward the same measured inset reached by the left vertical guide. The remaining four row gaps compress below that anchored top rule to 72%; do not compress around the group's center and displace the top rule. The lines are continuous layout guides, not card borders.

### 7.3 Part title scaling

At the same time as the side boundaries move inward:

- Each Part title scales down.
- The title scale is coordinated with the inward-moving vertical guides.
- The four title rows compress vertically together with the spacing between the five horizontal rules.
- The existing short underline cursor remains attached to the end of the title and scales with it.
- Do not add a separate long extension line after the cursor.

The title must not remain oversized after the boundaries have already reached their final position.

The initial title sizing is derived from the same row geometry used to calculate the title-to-rule clear space. During K3, the shared Out Cubic progress changes the horizontal guide positions, title position, title scale, title-row group height and horizontal-rule spacing together. The final title scale and horizontal-rule spacing ratio are both 0.72. At every intermediate frame, the horizontal space from each vertical guide to its neighboring title edge equals the vertical clear space from the title line box to the adjacent horizontal rule. The underline cursor remains the only line attached to the title. There is no additional extension rule.

### 7.4 Synchronized theme transition

The page transitions from the Hero's black-and-white visual system to the content's dark-blue / light-blue system.

The following properties must transition together:

| Element | Hero-stage appearance | Content-stage appearance |
|---|---|---|
| Page background | Monochrome | Blue-based page palette |
| Part title | Hero-compatible monochrome | Content text color |
| Horizontal rules | Hero-compatible line color | Content boundary color |
| Left/right boundaries | Hero-compatible solid rules | Content boundary color |
| Part background | No separate title background block | Same surface as the page background |
| Cursor | High-contrast Hero color | Content-compatible color |

The transition should use coordinated color interpolation. Do not make the background change first and then animate text, borders and the cursor independently after it.

The colors must maintain readable contrast throughout the transition, not only at the beginning and end.

The first source implementation uses a cool blue-neutral destination palette: Light mode targets a pale blue surface (hex #eaf0f7) with dark blue-gray text. Dark mode targets a much darker, lower-saturation blue-black surface (hex #080d14), with subdued blue-gray text and rules (the framework rule is #596a7e). These are first-pass values for browser review.

The same principle applies in both Light and Dark modes, with different destination palettes.

When the completed Hero/Part.01 transition is reversed, the K3 geometry, page palette, annotation color, title color and boundary-rule colors retrace their forward trajectories over the same 1500ms duration. The reverse uses the time-reversed Out Cubic curve (the corresponding In Cubic interpolation); it must not jump directly to the Hero palette.

### 7.5 Part background blending

Do not create separate background rectangles, panels or color blocks behind the four Part titles. Titles sit directly on the page surface.

The final layout is an open framework, not four isolated cards. Its structure is communicated by the continuous page-height vertical rules, the five full-width horizontal rules, spacing and typography.

### 7.6 Cursor deceleration

The cursor participates in the K3 color transition.

Its behavior:

1. It begins with the Hero-stage contrast color.
2. Its color interpolates with the other visual elements.
3. Its blink frequency gradually decreases.
4. Its blinking eventually stops.
5. It remains visible after stopping, in the final content-compatible color.

Do not remove the cursor at the end of K3.

The current sequence allows the synchronized cursors to complete one 900ms blink cycle after the longest title finishes before K3 begins. Do not add a second idle cycle. K3 then eases the blinking down over approximately 3.2 seconds. Both timings remain subject to browser review.

### 7.7 K3 end state

At the end of K3:

- The Hero content is gone.
- The four Parts form a vertical framework.
- The left and right dashed boundaries have reached their final positions.
- Part titles and the spacing between horizontal rules have reached their reduced sizes.
- Page background, title text, vertical guides, horizontal rules and cursors use the content visual system.
- The cursor remains visible but no longer blinks.

---

## 8. Part.01 expansion: K4

K4 and K5 begin together automatically when the shared K3 framework geometry reaches its final state. They are two coordinated effects in one continuous animation timeline, not sequential movements.

### 8.1 Expand Part.01

Part.01 opens downward into a content canvas.

The first implementation targets a Part.01 row height of **60% of the measured viewport height**. The current compact row height is preserved as the header zone; the extra height is added below it. This is an initial implementation value and remains subject to browser calibration.

The expansion is part of the same **1250ms In Cubic** timeline as the Part.02–04 fall. A single eased progress value drives Part.01's row height, the lower Parts' downward movement, the lower horizontal rules, and the framework scroll-stage height. Part titles retain their K3 font size and scale throughout the fall. There is no preliminary downward displacement followed by a second fall.

The uppermost horizontal rule remains fixed. The four lower horizontal rules move down with the expanding first row and continue through the same uninterrupted fall. The Part.01 title stays anchored in its original compact header zone; Parts 02–04 move down from the very first frame without shrinking their title text.

The document flow grows by the same amount as the expansion. Do not rely on an overflowing transform that leaves the next Parts in their old document positions.

The expansion should be perceived as the first Part opening into a content canvas, not as a generic accordion opening.

### 8.2 Other Parts remain compact

During K4:

- Part.02 remains compact.
- Part.03 remains compact.
- Part.04 remains compact.

Their compact row heights and order remain unchanged. Their titles begin falling at the same instant that Part.01 opens, but retain their original K3 font size and scale. The fall changes position only.

### 8.3 K4 end state

Part.01 has a 60%-of-viewport-height empty content area, but its actual content has not yet started revealing.

The other three Parts have already moved through the first part of their continuous fall. There is no second downward animation stage after the expansion.

For reduced-motion users, skip the interpolation and enter this final K4 geometry directly. Do not run the K5 falling motion for reduced-motion users; keep Parts 02–04 available in their compact positions.
---

## 9. Part fall and content reveal: K5

K5 moves from framework construction into the presentation of actual content.

### 9.1 Part.02–04 falling motion

Part.02, Part.03 and Part.04 move downward to make room for Part.01's content.

The fall begins on the same frame as K4 expansion; it does not wait for K4 to complete. K4 and K5 share one **1250ms In Cubic** animation driver and one progress value for downward movement. This is a position-only translation: Part.02–04 title font sizes and scales remain unchanged throughout. Do not split the movement into an expansion displacement followed by a second fall.

The final fall distance is calculated from the Introduction's measured rendered end, not from a fixed viewport-sized constant. At the end of the shared In Cubic timeline, the lower rule of the Part.02 row sits one compact Part.02 title-row height plus a 24px breathing gap after the Introduction. The Part.02 title begins 24px after the Introduction; its row uses the exact shared framework typography and line geometry. Part.03 and Part.04 retain their later document-flow headings until their own layouts are designed.

The rule directly above Part.02 (`guide-mono-h-04`) is shared by Part.01 and Part.02. Before the combined animation starts, duplicate it at its exact pre-expansion position, close to the Part.01 title. Keep this copy fixed as Part.01's boundary. The original shared rule moves down with Part.02–04 and the other lower rules. Do not place the retained copy at the expanded 60vh boundary or move it during the fall.

The fall is a one-time transform, not ordinary layout reflow. For reduced-motion users, skip the interpolation and place Parts 02–04 directly at their measured final positions after the Introduction, preserving their compact row heights.

### 9.2 Part.01 content reading order

Part.01 content appears in this order:

1. Top to bottom.
2. Within a row or content group, left to right.

The visual reveal should follow the actual reading order. It must not reveal a lower-left object before the preceding upper content merely because the lower object is easier to animate.

### 9.3 Ordinary text

Ordinary text appears in short phrases or small groups, not as a slow character-by-character typewriter effect.

Target perception:

- Approximately **10–15 tokens per second**.
- Multiple characters or words may appear in one reveal step.
- Adjacent reveal steps should have very short intervals.
- The overall impression should be continuous content flowing into view.

The token rate is a visual target, not a requirement to implement natural-language tokenization in code.

Each text group transitions from opacity 0% to 100%, using Out Cubic or a similar ease-out curve.

### 9.4 Small elements and components

- Small text and metadata can reveal in quick consecutive steps.
- Small decorative or informational elements can reveal continuously with very short delays.
- Small components can appear one after another.

Do not make each icon, punctuation mark or tiny border its own slow animation event.

### 9.5 Large visual components

Large components—such as a project preview, poster image, large work presentation or substantial media block—must appear as one complete visual object.

Do not split a large component into many little fragments that reveal separately.

The reveal unit should match the visual object the visitor perceives.

### 9.6 Reveal implementation constraints

The reveal timeline should be controllable independently from the page-layout animation.

At minimum, separate:

- Layout movement and expansion.
- Text and component reveal.
- Color interpolation.
- Cursor behavior.

They may overlap in time when the design specifies synchronization, but they should not be forced into one monolithic animation rule.

### 9.7 Introduction identity and copy

The Introduction begins below the retained Part.01/Part.02 divider copy, within the expanded Part.01 reading area. Its content stays in normal document flow so the page can grow naturally as the full introduction extends beyond the initial viewport.

The opening sentence reads “你好，我是丰朴 FedericoPrask，这是我的个人网站” in Chinese. Only the name uses **LXGW WenKai Lite**, as a handwritten signature-like accent. The name is emphasized with a translucent, angled highlighter mark derived from the site's blue identity color. The surrounding greeting, paragraphs and controls retain the existing sans-serif typography. Do not apply the handwritten face to the whole Introduction.

The Chinese copy is the supplied first-person text and must not be rewritten into invented claims. The English locale provides a faithful translation so the existing language switch continues to work. The closing phrase “Explore. Experiment. Create.” remains a display-style sign-off, but should be visually subordinate to the main Introduction: use a smaller display size rather than a large hero-like heading.

**Text reveal motion:** Reveal the Introduction in its existing short text chunks, not character by character and not as one whole paragraph. The greeting, handwritten name, website suffix, each prepared phrase in the paragraphs, and the closing tagline are separate motion units. Keep their original reading order and use a restrained stagger between units. Each complete chunk should rise into place while its opacity changes from 0 to 1: begin at `translateY(0.42em)`, then settle at `translateY(0)`. Do not scale the text or change its font size during the reveal. Use a 420ms Out Cubic transition and a 58ms stagger. Do not split the text into individual glyphs. The chunks remain readable as normal flowing copy once settled; preserve the paragraph structure and all supplied wording. Under reduced motion, show every chunk immediately with no offset or opacity animation.


### 9.8 Part.02 — Works: shared framework row

Part.02 uses the second row from the same four-Part title framework. Do not create a second title strip or duplicate title element. The shared title uses the same SF Pro Display Heavy face, font size, scale, row alignment and horizontal-rule system as Part.01.

At the end of K5, the second row is positioned 24px after the actual rendered end of the Introduction. Its lower horizontal rule sits after one complete compact row height; the same amount of space is reserved in normal document flow. This keeps the framework title aligned with the Works section while preserving a clear gap after the Part.01 tagline.

The Part.02 transition has two coordinated stages and reuses the original four-title / five-rule framework; it does not create a second title strip.

**Stage A — Recompose the framework and move the document.** When the reader scrolls down to the Part.02 approach boundary (currently 36% of the viewport height above the measured Part.02 row), begin a 760ms Out Cubic transition. The Part.01 title moves down to rejoin the compact four-Part title group, and the uppermost horizontal rule moves to the corresponding top of the group. The other three titles and four lower rules stay aligned to the same four compact rows. At the same time, the document scrolls to the measured Part.02 row position. Part.01's Introduction and title move upward with the document and leave the viewport; Part.02 stays at its original document coordinate and becomes the first visible row.

**Stage B — Pull Part.02 out of the framework.** Expand the second framework row using the same 60%-of-viewport target height and 1250ms In Cubic timing already used by Part.01. The title itself retains the shared Part.01 font, size, scale and alignment. The lower three rules and Parts 03–04 move down with the expanding Part.02 row. The Part.02 title remains anchored at its original row position. Its full expanded row height is reserved in document flow before the Works content, so the Works content begins after the framework row and its 24px gap.

After the transition, the page continues as one normal document. Native scrolling handles Works, Milestones and Beyond; do not create a nested scroll container or manually add wheel deltas during ordinary reading. At the top boundary of Part.02, first stop a gesture that merely crosses the boundary; a separate upward wheel/key/touch gesture then reverses the Part.02 expansion and framework reassembly. Do not cover Part.01 with a fixed layer.

Treat Part.02 as an editorial portfolio composed of alternating collage-and-copy rows, not as a table or a grid of uniform project cards. The first row places its collage on the left and copy on the right; the second reverses those sides; subsequent rows continue the alternation. Each collage uses overlapping, differently sized media surfaces with intentional offsets and varied aspect ratios. On narrow screens, stack the collage above its copy while preserving the row sequence. The four initial editorial groups are Development, Visual Design, Music Production, and Video & Motion. The current colored surfaces are format placeholders, not claimed portfolio artifacts; replace them with the user's actual selected media when supplied.
---

## 10. Complete animation sequence

| Stage | Name | Main action | Important constraint |
|---|---|---|---|
| K0 | Logo Reveal | Supplied FP Logo extends into view | Use `public/images/fp-logo.svg`; preserve its source geometry |
| K1 | SVG Annotation | Logo crossfades into vector annotation | Logo and annotation are not both fully visible |
| K2 | First Scroll | First downward scroll removes temporary annotations; original guide lines move and expand; Part titles appear | Controlled directional transition; reverses at the completed boundary |
| K3 | Part Framework & Theme Transition | Side boundaries move inward; titles/rules shrink; all colors transition | Layout and theme transition are synchronized |
| K4 | Part.01 Expansion | Part.01 expands vertically | Other Parts remain compact |
| K5 | Part Fall & Content Reveal | Parts 02–04 translate downward without title scaling; Part.01 content flows into view | Text and large components use different reveal granularity |

### 10.1 High-level state model

The implementation should have an explicit state model with reversible transition boundaries. A practical naming scheme is:

```text
K0_LOGO_REVEAL
  -> K1_SVG_ANNOTATION
  -> WAITING_FOR_FIRST_DOWN_SCROLL
  -> K2_GUIDE_TRANSFORM
  -> K2_PART_TITLES
  -> K3_FRAMEWORK_AND_THEME
  -> K4_INTRO_EXPANSION
  -> K5_CONTENT_REVEAL
  -> COMPLETE
```

The names may change in code, but the ordering and state boundaries must remain explicit.

### 10.2 State invariants

- K1 must finish before the layout transformation begins.
- The SVG annotation remains still while waiting.
- K2–K5 run as one controlled forward transition and can be retraced in reverse at the completed Hero/Part.01 boundary.
- During reverse, Introduction text chunks leave in reverse reading order; after their exit animation completes, the entire Introduction article is unmounted from normal document flow before Part.01 contracts.
- Input received during either direction is consumed and never queued.
- Part.01 reading and its intentional gap remain native, unrestricted document scrolling.
- Part.02 has its own controlled forward/reverse boundary; no other Part is assumed to behave this way.
- K3 does not begin before the K2 guide expansion and title reveal have reached their intended completion point.
- K4 and K5 begin together after the K3 framework and theme transition is complete.
- Part.01 expansion and the Part.02–04 position-only fall share one continuous 1250ms In Cubic timeline; preserve title font sizes and scales, with no intermediate downward hold or second fall.
- The original Part.02 top rule falls with the lower framework, while an exact-position copy remains at the bottom of Part.01.
- The falling titles and lower rules travel beyond the viewport; reduced-motion users retain the compact Parts without the fall.
- Once the Hero → Part.01 transition is complete, ordinary scrolling and reading behave like a normal page except at its explicitly defined reverse boundary.

### 10.3 Timing

Values recorded for implemented stages are first-pass source parameters, not visual approval. The relative ordering is fixed, and the following parameters must still be calibrated in-browser:

- K0 Logo extension direction, distance and duration.
- K1 crossfade duration.
- K2 guide movement and expansion duration.
- Pause before Part title reveal.
- Part title reveal speed and stagger.
- K3 boundary travel distance and duration.
- K3 title scale ratio.
- K3 color interpolation curve.
- Cursor starting blink frequency and deceleration curve.
- K4/K5 shared first-row target height (initially 60% of viewport height), fall distance and 1250ms In Cubic duration.
- Text reveal phrase size, delay and opacity duration.
- Large-component reveal duration.

Do not hardcode arbitrary values as if they were approved design decisions.

---

## 11. Interaction and page behavior

### 11.1 Controlled directional transitions

The site intercepts scroll input only at explicit animation boundaries; it does not take over ordinary reading.

For Hero → Part.01:

- A downward gesture at the K1 waiting state starts K2–K5.
- Additional wheel, touch or keyboard input is consumed until the complete forward choreography finishes. Input is never queued.
- Only single-finger vertical touch gestures participate in the choreography; multi-touch gestures such as pinch zoom pass through unchanged.
- Ctrl+wheel trackpad pinch/zoom gestures pass through unchanged so browser zoom remains available.
- A single-finger touch gesture or held scroll key that overlaps an active transition remains consumed until `touchend` or `keyup`, even when the transition finishes before that input gesture ends.
- Normal document scrolling is restored so the user can read Part.01 and its complete Introduction.
- After returning naturally to the Hero/Part.01 boundary, an upward gesture starts the reverse sequence.
- The Introduction text chunks animate out from their current rendered opacity and transform in reverse reading order. Once all chunks have exited, the entire Introduction article is unmounted from normal flow; only then does Part.01 contract.
- The reverse continues through K4/K5, K3, the title reveal and K2, returning to the K1 waiting state.
- Input is restored only after the reverse has completed.

For Part.01 → Part.02:

- Ordinary scrolling through Part.01 and the intentional gap remains native.
- A downward gesture at the Part.02 entrance boundary starts the pull-out and locks further input until completion.
- An upward gesture at the completed boundary reverses the same pull-out. No other Part receives an assumed entrance animation.

Do not globally prevent wheel events, force page snapping, or continuously map the whole document's scroll position to animation progress.

### 11.2 Language selection

Chinese and English remain supported.

- Language switching must continue to update all user-facing copy.
- The chosen language should remain consistent across all Parts.
- Language switching must not reset or replay the animation state.
- Text-length differences between Chinese and English must be accounted for in title widths and responsive layouts.

The control's new visual design and position remain open.

### 11.3 Theme selection

Light and Dark modes remain supported.

- The selected mode must remain consistent while the animation runs.
- Switching the mode must not reset the animation.
- The Hero monochrome state and content blue state must each have a valid appearance in both modes.
- A mode change must not be mistaken for K3's Hero-to-content visual transition.

The control's new visual design and position remain open.

### 11.4 Ordinary scrolling after the transition

After the choreography finishes, the page should behave like an ordinary long-form homepage:

- Natural vertical scrolling.
- No persistent navigation header.
- No repeated entrance transition when revisiting a Part.
- Reverse playback occurs only at explicitly defined completed boundaries; ordinary upward reading scroll remains native.
- Content remains available after animation completion.

### 11.5 Reduced motion

Respect `prefers-reduced-motion: reduce`.

The reduced-motion presentation must preserve access to all information and must not leave content hidden because an animation was skipped.

A suitable reduced-motion result is a stable final layout with the Logo/annotation choreography, large spatial movements and staggered reveals shortened or omitted. The exact reduced-motion opening state can be tuned, but the content must be immediately understandable and usable.

---

## 12. Responsive design

### 12.1 General rule

The page must remain a designed composition at desktop, tablet and narrow mobile widths. Responsive behavior is not simply the desktop layout scaled down.

The Title Page still targets the full visible viewport height, subject to content and device constraints. Avoid clipping the name, controls, SVG annotation or scroll affordance.

### 12.2 Title Page

Desktop uses the left/right layout described in Section 3.

On narrow screens, the two areas may need to stack or otherwise reorganize. The exact arrangement is open, but these constraints remain:

- The name remains the primary anchor.
- The Logo/annotation area remains identifiable.
- The full-screen composition must not become cramped.
- Annotation labels and handles must not overflow the viewport.
- The language/theme controls must remain reachable without becoming a Header.

Do not shrink the entire desktop layout uniformly until all text and SVG labels become too small.

### 12.3 Part framework

The four Parts remain in a vertical sequence at every breakpoint.

The final content width, boundary inset, line density and title scale may vary by viewport. The side boundaries must not collide with text or make the content area unusably narrow.

### 12.4 Works and media

Project previews and Graphic Design work should retain their intended aspect ratios. On smaller screens, reflow the content rather than cropping important material simply to preserve a desktop mosaic.

---

## 13. Accessibility, performance and robustness

### 13.1 Accessibility

- Use semantic headings and sections.
- Keep the reading order aligned with the visual reveal order.
- Provide accessible names for the language and theme controls.
- Expose the selected language and theme state to assistive technology.
- Keep text contrast readable during the K3 color interpolation.
- Do not rely on color alone to communicate Part boundaries or states.
- Do not make essential content available only after a pointer hover.
- Respect reduced-motion preferences.

Animations must not create duplicate screen-reader content or make important information inaccessible merely because an element's opacity is zero during its reveal.

### 13.2 Performance

Prefer animation of transform, opacity and SVG geometry where appropriate. Background and text color interpolation is required by the design, but it should be scoped and measured.

Avoid:

- Repeated full-document layout reads and writes in the same frame.
- Expensive filters or large blurred layers without a visual reason.
- Animating every text character independently.
- Recreating the SVG guide lines between states.
- Running continuous animation loops after the sequence has finished.
- Adding a large animation dependency before confirming that the existing stack cannot meet the requirements.

The animation should run smoothly on normal desktop and mobile hardware.

### 13.3 Resize and orientation changes

The guide-line target positions depend on the Title Page and viewport geometry.

If the viewport changes during K0–K5, all measured annotation bounds, Hero dimensions, framework geometry, and active scroll destinations are recalculated from the new viewport.

The K2 document-scroll driver retains its current animation progress and easing, but resolves the target position from the current Hero height on every frame. This keeps the 22%-of-Hero and full-Hero scroll destinations aligned with the live viewport without restarting the choreography. If a resize occurs during a scroll segment, the active segment rebases at its current eased progress and scaled document position, then continues along the remaining part of the same easing curve. During non-scrolling forward/reverse phases, the document position is scaled with the new Hero height so the framework remains aligned.

During ordinary Part.01 reading, a viewport resize preserves the reader's offset relative to the top of the Introduction area as the Hero height changes. A layout-induced scroll adjustment must never be interpreted as an upward gesture at the reverse boundary; reverse playback starts only after actual upward scrolling crosses that boundary.

Resize and orientation changes during K0–K5 must not leave guide lines at stale coordinates, create scroll jumps, or trigger an unintended transition.

### 13.4 Failure-safe content

If an animation fails, is interrupted or is disabled, the user must still be able to reach the final page content.

The page must not remain trapped in a blank Hero, an incomplete SVG overlay or a Part framework with hidden content.

---

## 14. Suggested implementation architecture

This section proposes boundaries for maintainable code. It does not prescribe exact filenames if the implementation reveals a better structure.

### 14.1 Separate design tokens

Keep the new visual tokens separate from page-specific component styles.

Suggested concerns:

- Color tokens for Light and Dark modes.
- Typography tokens.
- Layout width and spacing tokens.
- Border / rule tokens.
- Motion easing and duration tokens.

Do not scatter unrelated hard-coded colors throughout the components. K3 requires coordinated changes, so semantic tokens are important.

### 14.2 Separate animation concerns

Keep the following concerns independently controllable:

1. Hero Logo reveal.
2. SVG annotation crossfade.
3. First-scroll trigger and one-time state.
4. Persistent SVG guide-line transformation.
5. Part title reveal and cursor.
6. Part boundary movement and title scaling.
7. Theme interpolation.
8. Part.01 expansion.
9. Part fall.
10. Content reveal sequence.

Shared timing can coordinate these layers without merging them into one opaque component.

### 14.3 SVG structure

The SVG source should distinguish persistent and temporary elements explicitly.

A conceptual structure:

```text
SVG
├── persistent-guide-lines
├── temporary-logo-outline
├── temporary-coordinate-labels
└── temporary-force-handles
```

The Logo source geometry is available at `public/images/fp-logo.svg`. The annotation now reuses the supplied FP Logo geometry. Its nineteen dashed guide paths are the original visible K1 elements that survive into K2; browser verification is still required.

### 14.4 Part components

A reusable Part frame may share:

- Part number and title.
- Title cursor.
- Horizontal separator.
- Left/right boundary relationship.
- Expansion state.

However, the content inside each Part should not be forced into a shared card template. Shared structural primitives are encouraged; identical section compositions are not.

### 14.5 Content data

Keep repeatable content—such as work items and milestones—separate from visual frame logic where practical.

This allows new works and milestones to be added without rewriting the transition system.

### 14.6 Technology baseline

The current repository uses:

- Vue 3.
- TypeScript.
- Vite.
- Tailwind CSS 4.

Keep the redesign within this stack unless a concrete requirement justifies a change.

No new animation library is mandated by this document. First evaluate whether the required timeline and SVG geometry can be implemented cleanly with the existing browser APIs and Vue structure. Add a dependency only when it provides a clear, measured benefit.

---

## 15. Implementation phases and acceptance criteria

### Phase 0 — Design Foundation

**Scope**

- Define semantic Light and Dark color tokens.
- Define the sans-serif heading and body typography.
- Define proportional title sizing and line-height rules.
- Establish content width, page edges, spacing scale and structural rule styles.
- Define motion token placeholders without pretending their values are final.

**Acceptance criteria**

- The blue identity is recognizable.
- Both Light and Dark color systems are coherent.
- Titles use non-serif, non-monospace typography.
- The foundation does not carry old layout or decorative patterns forward.
- The foundation can express both the Hero monochrome stage and the blue-based content stage.

### Phase 1 — Title Page

**Scope**

- Full-viewport initial composition.
- Left name / website designation.
- Supplied FP Logo in the right-side Title Page area.
- Language and theme controls in a non-Header placement.
- Responsive layout.

**Acceptance criteria**

- The initial page fills the visible viewport.
- No traditional Header exists.
- The name remains visually dominant.
- The supplied Logo is used without redrawing or substituting its geometry.
- Both language and theme functions work.

### Phase 2 — K0 and K1

**Scope**

- Logo extension reveal.
- Logo-to-SVG crossfade.
- SVG annotation layout.
- Still waiting state.

**Acceptance criteria**

- Logo and annotation crossfade in the same visual area.
- The annotation is an outline construction, not a filled Logo.
- x/y and Force details are visible in the waiting state.
- Nothing starts moving before the first downward scroll.

### Phase 3 — K2 First-scroll conversion

**Scope**

- Downward-scroll trigger from the K1 waiting state; a new cycle is permitted only after a complete reverse returns to K1.
- Remove temporary SVG details.
- Preserve original guide lines.
- Move guides to the full Title Page lower boundary.
- Expand guide spacing.
- Reveal Part titles and underline cursors.

**Acceptance criteria**

- The trigger fires at most once per K1 waiting-state activation; it cannot restart during the active forward or reverse sequence.
- The animation is not controlled by scroll distance.
- Reverse playback is available only at the completed Hero/Part.01 boundary; the initial forward trigger does not repeat.
- The surviving lines visibly continue from the original SVG lines.
- Guides target the bottom edge of the entire Title Page, not a text baseline.
- Part titles appear after guide expansion and a short pause.

### Phase 4 — K3 Framework and theme transition

**Scope**

- Left/right dashed boundary movement.
- Part title and title-line scaling.
- Full synchronized color transition.
- Part background blending.
- Cursor color interpolation and blink deceleration.

**Acceptance criteria**

- Both side boundaries visibly move inward.
- Title scale and boundary movement remain synchronized.
- The page background remains identical to the Hero; Part titles, rules, boundaries and cursor transition to the K3 content palette.
- The final Part surface blends with the page background.
- The cursor remains visible and stops blinking.

### Phase 5 — K4 and K5 Introduction reveal

**Scope**

- Part.01 expansion.
- Part.02–04 downward fall.
- Ordered text reveal.
- Complete-component reveal.

**Acceptance criteria**

- Part.01 expands toward 60% of the viewport height while Parts 02–04 begin falling on the same frame, driven by one shared 1250ms In Cubic progress value; their title font sizes and scales do not change.
- The uppermost rule and Part.01 title remain anchored; the lower rules move with their associated Parts.
- The Part.01/Part.02 shared divider is duplicated at its pre-expansion position and retained close to the Part.01 title.
- The document flow grows to fit both the expanded Part.01 region and its complete Introduction copy.
- Parts 02–04 fall beyond the viewport; do not create a second downward animation stage.
- Part.01 content reveals top-to-bottom and left-to-right.
- Ordinary text appears in short groups at a brisk pace.
- Large visual components appear whole.

### Phase 6 — Parts 02–04

**Scope**

- Works.
- Milestones.
- Beyond.

**Acceptance criteria**

- Each Part has its own visual composition.
- No repeated generic card-grid treatment is applied to every Part.
- All displayed content is real or explicitly marked as a temporary placeholder.
- Works can be expanded as more projects and design pieces are created.

### Phase 7 — Polish

**Scope**

- Responsive refinements.
- Light/Dark and Chinese/English verification.
- Reduced-motion behavior.
- Accessibility and keyboard behavior.
- Performance checks.
- Viewport resize and interrupted-animation testing.

**Acceptance criteria**

- The page remains usable on narrow and wide viewports.
- No essential content depends on animation.
- No accidental replays or reverse transitions occur outside the explicitly defined completed boundaries.
- The final layout remains stable after all transitions.
- Both language and theme controls work through the complete sequence.

---

## 16. Open decisions

The following are intentionally not fixed yet. They should be resolved through visual iteration rather than guessed in advance.

### 16.1 Visual details

- Exact font family and weights.
- Exact desktop and mobile grid dimensions.
- Title Page side-by-side proportions and internal alignment.
- Exact placement of language and theme controls.
- Final on-screen Logo scale and placement.
- Exact SVG line positions and which explicit line IDs persist through K2.
- Final Light and Dark destination colors for the content stage.
- Whether the deep-blue extension color is used, and where.
- Final framework rule weight and title-scale ratio after browser review.

### 16.2 Motion details

- Background plate bottom-up reveal duration and easing.
- FP monogram path-growth pacing, duration and easing from the F bottom terminal to the P endpoint.
- Exact geometry-aware masking / reveal technique for the supplied filled monogram path.
- Logo / annotation crossfade duration.
- Guide movement and expansion duration.
- Pause before Part title reveal.
- Title reveal speed and stagger.
- Side-boundary travel distance and duration.
- Title scale ratio and transformation origin.
- Theme interpolation curve and duration.
- Cursor blink starting rate and deceleration.
- Part.01 expansion height and duration.
- Part.02–04 fall distance, acceleration and duration.
- Phrase size and delay for text reveal.
- Duration for large-component reveal.

### 16.3 Interaction details

- Whether the first downward gesture is temporarily held during the choreography, or whether natural page scrolling continues while the animation runs.
- How an early downward gesture during K0/K1 is handled before the first-scroll trigger is armed.
- How the animation geometry responds to a resize or orientation change mid-transition.
- Exact reduced-motion opening state.

### 16.4 Content details

- Final Introduction copy.
- Which Development projects are featured.
- Which Graphic Design works are featured.
- Which competition and award records belong in Milestones.
- Which interests and creative activities belong in Beyond.
- Final images, thumbnails, poster assets and project links.

An open item is not permission to fill it with arbitrary placeholder content or an unreviewed design decision.

---

## 17. Non-negotiable constraints checklist

Use this checklist when reviewing implementation changes.

- [ ] The initial Title Page fills the viewport.
- [ ] There is no traditional Header.
- [ ] The page contains four vertically arranged Parts.
- [ ] The existing blue identity is retained as a color reference.
- [ ] Chinese / English switching remains available.
- [ ] Light / Dark switching remains available.
- [ ] Title typography is sans-serif and proportional.
- [ ] K0 first reveals the white rounded-square background plate from bottom to top, then grows the FP monogram along its vector path from the F bottom terminal to the P endpoint.
- [ ] K1 crossfades the Logo into SVG annotation.
- [ ] The annotation remains still while waiting.
- [ ] K2 starts on the first downward user scroll only.
- [ ] K2 removes x/y, Force handles and the Logo outline.
- [ ] K2 preserves the original designated SVG guide lines.
- [ ] The five designated guides become full-viewport-width rules during Stage A.
- [ ] The lowest rule remains visually anchored while the document and four upper rules move with Out Cubic.
- [ ] The four upper rules unfold upward from the lowest rule, with bottom-to-top stagger.
- [ ] Part titles begin together after line expansion and appear character by character with an Out Cubic pop.
- [ ] Every Part title has an attached underline cursor.
- [ ] K3 side boundaries move inward from outside toward the center.
- [ ] Part titles and title rules shrink with the boundaries.
- [ ] K3 changes the entire visual theme, not only the cursor.
- [ ] Part surfaces blend into the page background.
- [ ] The cursor changes color, slows its blink and remains visible.
- [ ] K4 expands only Part.01.
- [ ] K5 makes Parts 02–04 fall with an ease-in character.
- [ ] K5 reveals Part.01 content in reading order.
- [ ] Ordinary text appears in short, fast groups.
- [ ] Large visual components appear as complete objects.
- [ ] Reverse playback occurs only at the explicitly defined completed boundaries; ordinary upward reading scroll remains native.
- [ ] Reduced-motion users can access all content.
- [ ] No fake Logo, project, award or biographical detail is introduced.

---

## 18. Change control

This document is expected to evolve as the design is tested.

When a requirement changes:

1. Update the relevant section in this document.
2. Update the open/confirmed status if needed.
3. Implement the change.
4. Verify that the change does not violate another confirmed requirement.
5. Record any new unresolved decision under Section 16.

Do not let implementation details silently redefine the intended design.

**This document describes the desired experience. The code should implement the document—not the other way around.**

---

## 19. Current implementation status

This section records implementation progress. It does not weaken or replace the requirements above.

### 19.1 Phase 0 — Design Foundation

**Status: initial foundation created; visual calibration remains open.**

Implemented:

- Added `src/styles/design-tokens.css`.
- Added semantic typography tokens for proportional headings/body text and technical annotations.
- Added semantic aliases for the established blue palette.
- Added Hero monochrome foreground, background and rule tokens for Light and Dark modes.
- Added neutral reference tokens for both modes.
- Imported the token file through `src/index.css`.
- Replaced the old global style sheet with a small reset/base layer. Old grid, frame, marquee, reveal and legacy utility styling is no longer part of the active global stylesheet.

Not yet completed:

- Final content-stage background/surface mapping.
- Final K3 transition endpoints and intermediate color stops.
- Font asset/loading decision and final type scale.
- Final grid, spacing and page-edge measurements.

### 19.2 Phase 1 — Title Page

**Status: first structural implementation created; supplied Logo asset is now available; animation and visual review pending.**

Implemented:

- Added `src/components/TitlePage.vue`.
- Title Page targets `100svh`.
- Left area contains the name “Federico Prask” and the website designation.
- Right area displays the supplied `public/images/fp-logo.svg` without modifying its source geometry.
- Added `src/components/LogoMark.vue` with an event-driven K0 reveal.
- Added `src/components/LogoAnnotation.vue` with persistent guide paths and separate temporary construction groups.
- K0 now hands off to K1 through the actual SVG animation completion event.
- K1 crossfades the normal Logo out and the annotation in, then remains still.
- Reduced-motion users start in the static K1 waiting composition.
- Added `src/components/LogoMark.vue` with inline background and monogram groups preserving the original path elements.
- Added a first-pass left-to-right clip-path reveal for K0; this is now an obsolete prototype and must be replaced by the two-stage bottom-up plate reveal and path-following monogram growth.
- Added a reduced-motion fallback that shows the full Logo immediately.
- Chinese / English selection remains functional.
- Theme selection remains functional and retains the existing system/light/dark preference cycle.
- Controls are integrated into the Title Page; no Header is rendered.
- Added a narrow-screen layout that stacks the identity and Logo area.

Not yet completed:

- Tune K0 and K1 timing, geometry, contrast and visual balance in a local browser.
- Rebuild K2 using the five designated original SVG guide paths; the current source rewrite is recorded in Section 19.10.
- Verify the complete K0–K2 sequence at desktop, tablet and mobile sizes.

### 19.3 Application entry and active files

The active application is intentionally small:

- `src/main.ts` — imports the global stylesheet and mounts the Vue application.
- `src/App.vue` — minimal application shell.
- `src/components/TitlePage.vue` — full-viewport opening composition, settings and K0/K1 sequence controller.
- `src/components/LogoMark.vue` — original FP Logo geometry and K0 reveal.
- `src/components/LogoAnnotation.vue` — K1 construction overlay and persistent guide paths.
- `src/styles/design-tokens.css` — semantic visual tokens.
- `src/index.css` — Tailwind import and global base layer.
- `src/composables/useI18n.ts` — lightweight shared locale state and persistence.
- `src/composables/useTheme.ts` — shared theme preference and system-theme synchronization.

Legacy page components, their UI primitives, the old content-data model, unused font stylesheets and the empty router placeholder have been removed from the redesign branch. The old content data is not used as a source for the new page; new content will be curated against the four-Part structure in this document.

### 19.4 Verification status

Source files have been fetched again from the target branch after the changes, and the import relationship and application entry were inspected.

Cloudflare Pages completed the production build and preview deployment successfully for the current `dev` head. A local `vp build` and browser visual review have not yet been run. Deployment success is not visual approval.

### 19.5 Current K0 source implementation

The obsolete left-to-right clip has been replaced with a first source-level implementation of the two-stage reveal:

- The original white plate path is revealed bottom-to-top using an inset clip.
- The original black monogram path is retained unchanged and duplicated into two SVG layers: a no-fill trace layer and the final filled layer.
- The trace layer uses SVG path dashing with a normalized `pathLength` to draw the existing closed contour in reverse path direction, beginning at the path's final point near the F stem's lower terminal and proceeding toward the path's initial point.
- The filled monogram appears immediately after the contour trace, restoring the exact original solid mark before K1 begins.
- The K0 completion event is emitted only when the final fill animation ends; this event starts the existing K1 crossfade.
- Reduced-motion users still receive the complete static Logo and enter the existing static K1 waiting state.

This is a **geometry-preserving contour-trace prototype**, not yet a visually approved interpretation of the requested stroke growth. The supplied monogram is a closed filled outline, not a set of centerline strokes. The current trace therefore follows its perimeter rather than an inferred centerline. Browser review must determine whether this reads as the intended F-to-P growth; do not claim that centerline data exists in the source asset.

Provisional timing: plate 820ms after 180ms delay; contour trace 1,650ms after 1,050ms delay; final fill 140ms after 2,620ms delay. These values are implementation starting points, not approved motion specifications.

**Next step:** run the local app and visually inspect the direction and pacing of the contour trace, plate reveal, final fill and K1 handoff. If the trace does not match the intended visual, revise the reveal method before implementing K2. K0/K1 have not yet been locally build-verified or visually approved.


### 19.6 Responsive Logo sizing and plate focus-in refinement

The K0 plate entrance uses a simultaneous opacity-and-focus transition: opacity rises from 0 to 1 while blur decreases from 24px to 1px over the same duration and easing. This is a whole-plate soft-focus entrance, not a gradient mask or a moving clip edge. The original SVG path geometry and fill remain unchanged.

In Light mode, the normal Logo is inverted as a whole so its white plate becomes dark and its black monogram becomes light; in Dark mode, the source colors are retained. The inversion is applied to the normal Logo layer only, not the separate construction annotation. Its filter transition is 100ms.

The Logo sizing is also being decoupled from small viewport-width changes. Desktop layout gives the Logo column a larger minimum width and reduces the viewport-proportional inter-column gap; the Logo itself uses a bounded responsive size. Narrow layouts use a wider viewport-relative range with a larger minimum and maximum than the previous 28vw rule. These are first-pass CSS values and require browser review at desktop, intermediate and narrow widths.

### 19.7 K0-to-K1 handoff reliability correction

The K0 completion listener is bound directly to the final monogram-fill path. Because Vue scoped styles may rewrite component-local keyframe identifiers, the handler does not compare `AnimationEvent.animationName` with the source-level keyframe name; the listener's placement on the dedicated final-fill path is the event filter. It emits the completion event when that path's animation ends, allowing TitlePage to advance from K0 reveal to the K1 annotation crossfade. This is a source-level correction; local runtime behavior and the complete K1 annotation still require browser verification.


### 19.8 Part title typeface — original SF Pro variable TTF

The Climate Crisis trial is superseded. `public/fonts/SF-Pro.ttf` is the original variable font uploaded to `dev`. Its name records identify the family as `SF Pro` and the default subfamily as `Regular`; its `fvar` table exposes `wght` (1–1000, default 400) and `opsz` (17–28, default 28). The `OS/2.usWeightClass` value of 400 describes the default instance only; it does not mean the file is static. Part titles request CSS weight 800 (Heavy), and optical sizing is enabled. The normal face is registered from the TTF with a `1 1000` weight range and preloaded from that same local asset. The existing `SF-Pro-Italic.woff` remains a separate italic face registered at weight 400 until its original TTF axes are independently checked. The normal font is loaded locally, not through Google Fonts.

### 19.9 Part title size refinement

The current mobile size is considered approximately correct and must be retained. Desktop titles were still too small. The desktop rule must be viewport-height-aware and ensure the title size/line-box height is at least 0.4 times the distance between adjacent rules. The mobile breakpoint keeps the existing `clamp(1.5rem, 3.6vw, 3.4rem)` size unchanged. Part titles use SF Pro Display Heavy (weight 800).


### 19.10 K2 source rewrite — full-width rules and upward unfolding

The previous outward/horizontal spring-open behavior is superseded. The annotation overlay stays at its measured K1 Logo bounds and applies independent matrix transforms to the same five original SVG path nodes. No viewport-sized SVG stretch is used.

The current source sequence is:
1. The five paths move from their individual K1 coordinates into a moderately spaced compact group. By the end of this first movement they are already full viewport width, edge to edge. The compact group's lowest rule is placed close to the viewport bottom after the partial scroll; the other four sit above it.
2. The document scrolls 22% of the Hero height over 560ms with In-Out Cubic. The Hero remains visible while the full-width rules settle over 720ms with Out Cubic.
3. The compact composition holds for 170ms.
4. The remaining document scroll uses 1100ms Out Cubic. The lowest rule receives a matching document-space translation over the same duration and easing, so it stays visually anchored in the viewport. The four upper rules then unfold upward from that anchor, starting with the rule immediately above it and staggering upward by 65ms. The rule width does not change during this stage.
5. After the uppermost rule finishes, all four Part titles start together. Each title is rendered character by character; every glyph pops upward into place with a 36ms per-character delay and a 420ms Out Cubic transition. All four underline cursors use one shared start delay calculated from the longest title, so their blink cycles start and remain synchronized; they share the title color and binary opacity blinking.

6. At the completed boundary, title characters exit in the exact reverse of their shared entrance cadence: all rows use the same longest-title timeline, so the last character of the longest title exits first and earlier character positions follow in reverse order. The four upper rules retract top-to-bottom into the compact group with inverse In Cubic timing and a 65ms stagger, while document scrolling returns to the 22% position. The initial recomposition and 22%-to-top scroll then reverse to restore the K1 waiting state.

Rules remain 0.35px solid. Title text retains its page-edge inset; desktop title size/line-box height remains 0.4 of each Part-row height, while the existing mobile size is unchanged. The normal face is loaded from public/fonts/SF-Pro.ttf, whose wght axis spans 1–1000 and whose opsz axis spans 17–28; the existing SF-Pro-Italic.woff remains a separate italic face registered at weight 400. Part titles request weight 800 (Heavy) with optical sizing enabled. Separate Text/Display/Rounded aliases have not yet been established from the inspected font metadata.

This is a source-level implementation only. **No local production build or browser verification has been run.** Check the full-width Stage A composition, the lower-rule viewport anchor, bottom-to-top upward unfolding, matched Out Cubic scroll, character pop timing, title size, responsive behavior and reduced-motion state before treating K2 as approved.

### 19.11 K3 source implementation — measured page-edge framework

K3 starts automatically after the Part titles have appeared and their shared cursors have completed one initial 900ms blink cycle. A single JavaScript animation driver computes p over 1500ms with Out Cubic easing and writes the same progress into the reactive layout geometry every frame. The left and right vertical guides begin exactly at the viewport's browser edges and move inward by the measured Hero-name inset; they span the viewport height continuously and use the same 0.35px solid stroke as the five horizontal rules.

The horizontal and vertical clear spaces are derived from one calculation. For a title row of height R, title line-box height F, shared compression c and rule stroke width w, the vertical clear space is g = max(0, ((R - F) * c - w) / 2). Each title edge is positioned exactly g + w inside its adjacent vertical guide, so the horizontal clear space equals the vertical clear space to the neighboring horizontal rule. The right side mirrors the same calculation. Title scale, title-row height and the five horizontal-rule intervals all use the same c = 1 - 0.28p, ending at 0.72. This removes independent CSS geometry transitions and keeps relative positions consistent at every intermediate frame.

All five horizontal rules remain full viewport width. The top rule follows the interpolated shared top inset and ends at the same page-edge distance as the left vertical guide; the four lower gaps compress below it to 72%. The existing short underline cursor remains attached to each title. No additional extension line or Part background rectangles are created.

A single k3-content-theme class activates the Light/Dark content colors. The page background remains bound to --site-hero-background and does not change during K3; Part titles, horizontal rules, vertical rules and cursors transition together. Cursor blinking slows through a 3.2-second sequence and ends with the underline visible. Reduced-motion mode skips the transition and presents the final framework immediately.

This is source-level geometry with a successful Cloudflare Pages build/deploy for the current `dev` head; local build and browser visual verification remain pending. Verify boundary alignment against the actual Hero name, the equal final top/left page-edge inset, synchronized vertical-line travel, top-anchored horizontal-rule compression, simultaneous title scaling, both palettes, the shortened cursor wait, theme switching during/after K3, mobile fit and reduced-motion behavior.

### 19.12 K4/K5 source implementation — one continuous opening and fall

K4 and K5 start together after K3 completes. One 1250ms In Cubic animation driver writes the same eased progress to Part.01 expansion and the Parts 02–04 downward translation. The first row expands toward 60% of the measured viewport height while the lower Parts begin moving down on the very same frame. Part titles keep their K3 font size and scale: there is no title shrink. There is no K4 displacement followed by a second K5 fall.

The top horizontal rule stays anchored. The lower four horizontal rules receive their K4 row-expansion offset and continue moving down with the same shared progress; Parts 02–04 titles are displaced by the expanding first row and translated farther by the same fall progress. Their font size and scale remain at their K3 values throughout. The combined displacement target is one viewport height plus the expanded framework height plus 48px, taking all three Parts and their associated moving rules out of the viewport.

Before the shared animation begins, the current transform of `guide-mono-h-04`—the line shared by Part.01 and Part.02—is copied into a separate SVG path. This copy is kept at the exact pre-expansion position, close to the Part.01 title. The original line moves with Part.02–04; the copy remains fixed as Part.01's divider. It must not be captured after the Part.01 expansion offset has already been applied.

Reduced-motion users receive the expanded K4 geometry without the fall; Parts 02–04 remain visible. The retained divider copy stays in place and the complete Introduction copy is readable without reveal animation.

Cloudflare Pages completed a production build/deploy for an earlier animation revision. The current Introduction implementation still needs a fresh build check and browser review.

### 19.13 Introduction content and typography implementation

The Introduction is rendered inside the framework scroll stage in normal document flow. Its top padding is derived from the final K3 stage inset and the compact Part.01 row height, placing the opening copy immediately below the retained pre-expansion divider copy. Horizontal padding uses the same final title inset as the Part titles. The document therefore grows to fit the copy instead of clipping it to the initial viewport.

The user-supplied Chinese Introduction is preserved as five paragraphs. A matching English translation is provided for the existing language selector. Each paragraph is divided into short inline text groups, and each group is one reveal unit; the text is not split into individual characters. The greeting, name, website suffix, paragraph groups and closing tagline reveal in reading order with a 58ms stagger. Each group uses a 420ms Out Cubic reveal: it begins 0.42em below its final position with opacity 0, then translates to its final position while opacity rises to 1. No scaling or font-size change is applied. The spans use inline-block layout with a maximum width so longer groups can wrap within the content width. The text reveal is separate from the shared K4/K5 geometry driver. Reduced-motion mode presents all groups immediately with no transform or opacity animation.

Only “丰朴 FedericoPrask” in the opening sentence uses the uploaded `LXGWWenKaiLite-Regular.ttf` face, registered as `LXGW WenKai Lite`. Light and Medium faces are also registered for future use. The handwritten face is not preloaded, so it is requested only when the Introduction is rendered. The name receives an angled translucent highlight based on `--site-brand`; all other copy retains the regular site typography. Reduced-motion mode displays the complete text without its reveal animation and retains the Part.01/Part.02 divider copy.



## 6.6 Part.02 — Works visual composition

The first implementation uses four editorial rows, not project cards. Each row alternates the collage and copy columns: media-left/copy-right, then copy-left/media-right. On narrow screens, each row stacks media above its copy.

The four current editorial groups are Development, Visual Design, Music Production, and Video & Motion. Copy describes the user's established areas of practice at category level; it does not claim specific project outcomes or awards.

Until the user supplies the final curated media, each collage is represented by three overlapping, differently sized color fields. These are layout placeholders only, not portfolio images. Replace each field with a real work preview when its corresponding asset is available; preserve the collage geometry and varied aspect ratios rather than turning the media area into a uniform card grid.

The section is placed after the Introduction in normal document flow as part of the single page Scene. Its title is rendered by the shared second row of the four-Part framework; the Works content remains in normal document flow.


### 6.7 Part.02 as part of one page Scene

The page is implemented as one Vue page Scene, owned by `TitlePage.vue`. Introduction, Works, Milestones and Beyond are part of the same page-level document structure. Works content is inline in that Scene; it is not a separately mounted page or an independent nested-scroll component.

Part.02 reuses the second title row from the original four-Part framework. It does not create a separate title strip or duplicate title element: the same `.framework-title` markup, SF Pro Display typography, sizing, row alignment and original horizontal rules are used for Part.01 and Part.02.

K5 measures the rendered end of the Introduction and translates the lower framework rows together. The lower rule of Part.02 is aligned after the Introduction by one compact framework row height plus a 24px breathing gap. The Part.02 title therefore begins 24px after the Introduction; a matching normal-flow spacer reserves the title row's full height. Part.03 and Part.04 retain their later document-flow headings until their own layouts are designed.

The Part.02 pull-out is a dedicated two-stage transition inside the same framework. First, the four titles and five SVG rules reassemble while the document scrolls to the measured Part.02 row, pushing Part.01 fully out of the viewport. Second, the existing Part.01 expansion geometry is reused to expand the Part.02 row to 60vh. Part.02 remains at its document position; its title is the same framework title node, not a copied heading.

Only the transition boundaries intercept wheel, trackpad, touch, keyboard and scrollbar input. Once the animation completes, the browser's native page scrolling handles Works, Milestones and Beyond without a nested scroll container or manually applied deltas. A fresh upward gesture at the top of Part.02 reverses the pull-out.

The page-edge vertical rails remain part of the shared Scene and use the measured K3 left/right insets. The shared title framework is decorative only; each content section retains its own semantic heading for assistive technology. Reduced-motion users enter the same final layout directly and use native page scrolling.
