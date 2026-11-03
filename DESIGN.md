# DESIGN.md — Personal Website Redesign

> **Document status:** Active design specification  
> **Target branch:** `dev`  
> **Project:** Federico Prask — Personal Website  
> **Last updated:** 2026-11-03  
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

- Page and section surfaces.
- Important typographic emphasis.
- Selected diagram or annotation elements.
- Rules and structural boundaries.
- Selected work presentation or visual blocks.

Do not paint every element blue. The strength comes from the relationship between blue surfaces, neutral areas, text and fine structural lines.

A deep blue such as `#263D58` may be evaluated as an additional supporting color, but it is not a mandatory token until its use is visually confirmed.

### 4.4 Hero-to-content color transition

The Hero's opening treatment is monochrome. The content destination is blue-based.

During K3, interpolate these properties as one coordinated transition:

- Page background.
- Part backgrounds.
- Part title text.
- Horizontal rules.
- Left and right dashed boundaries.
- Other structural borders.
- Cursor color.

The final Part background must blend into the same color as the page background at the bottom of the page. The structure should remain legible through its boundaries and spacing, rather than through a visually separate card fill.

### 4.5 Light and Dark modes

**Confirmed: keep both Light and Dark modes.**

The two modes are not merely filters over the same composition. Each mode needs a coherent version of the blue-based content palette with sufficient contrast.

The K3 transition must work in both modes:

- Light mode: transition from the Hero's monochrome state into the light blue / light neutral content palette.
- Dark mode: transition from the Hero's monochrome state into the dark blue / dark neutral content palette.

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

Every horizontal or vertical straight segment in those original paths receives one corresponding **dashed guide line**. The current source geometry contains eighteen such segments: four on the background plate and fourteen on the FP monogram. Each guide remains a separate SVG element with a stable ID.

The guide set is selective, not a background grid: no evenly spaced rows, columns or unrelated grid lines may be added. Each guide lies exactly on its source segment's original horizontal or vertical coordinate, with **no perpendicular offset**. A horizontal guide spans the full original Logo viewBox width (`x = 0` through `x = 256`); a vertical guide spans its full original height (`y = 0` through `y = 256`). The guides therefore extend to the boundaries of the Logo's own 256 × 256 frame and never enlarge that frame. Each guide uses the active theme's brand-blue token (`--site-brand`) at full opacity: dark blue in light mode and light blue in dark mode. It must not use the monochrome Hero foreground token. The rounded background-plate frame and the FP monogram use the same 1.7px solid outline width. Guide strokes use square/butt dash ends and remain visibly thinner at 0.65px. Where a guide coincides with the solid Logo outline, the underlying outline remains solid; the dashed rhythm is visible along the guide's extension beyond the Logo segment.

The eighteen guide paths are the persistent elements carried into K2. The original Logo outline, coordinate labels and Force handles are temporary construction elements and are removed when K2 begins.

### 5.4 Coordinate annotations

Every dashed guide has one coordinate label at its source segment's **starting point**, expressed in the Logo's original 256 × 256 viewBox coordinate system:

- Use the bracketed format `[ x , y ]`.
- Labels associated with horizontal segments remain horizontal.
- Labels associated with vertical segments use a five-line arrangement: opening square bracket, x-coordinate, comma, y-coordinate, closing square bracket. Each item occupies its own line, in the exact order `[`, `x`, `,`, `y`, `]`. The two square-bracket glyphs are each rotated 90 degrees so they read horizontally; the x-coordinate, comma and y-coordinate remain unrotated and each occupies its own line. All five rows share the same horizontal center axis (`text-anchor="middle"`). The two square-bracket glyphs use a larger font size than the coordinate text.
- The numbers identify the original Logo path coordinates, not screen or viewport positions.
- Coordinate labels use the active theme foreground color directly. Do not add a background-colored stroke, outline or halo around the text in either theme.

Coordinate labels must be treated as one layout of eighteen rendered annotations. Calculate their text bounding boxes using the active technical font and the larger bracket size; check horizontal-to-horizontal and horizontal-to-vertical collisions, not merely the baseline positions. Reposition conflicting labels with separate rows or offsets while preserving each label's association with its source point. Keep a visible clearance between distinct labels, and ensure the two lower-edge labels do not occupy the same row. Do not replace these point coordinates with generic `x` / `y` axis labels. For the current K1 arrangement, the collision-adjusted label placements are intentionally staggered: `[153,72]` uses baseline y=55.5; `[86,102]` uses y=98; `[121,159]` uses y=167; `[148,131]` is end-aligned at x=152, y=147; and `[153,256]` uses y=285. These are presentation offsets only; the displayed coordinate values remain the original source start points. The current conservative estimate uses 6.2px monospace text at 0.6em advance and 8.5px bracket glyphs, producing no label-to-label intersections and a minimum estimated clearance of 5.49 SVG units. Browser verification with the actual loaded technical font is still required.

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

- The Title Page and left-side text remain unchanged.
- The normal filled Logo is no longer visible.
- The complete original FP Logo outline remains visible, including the rounded background-plate frame.
- All eighteen source-derived dashed guides remain visible, with their coordinate labels at the corresponding segment starts.
- The eight rounded corners retain their Force nodes and solid tangent/control handles.
- No background grid is present.
- The annotation does not morph or move before the first downward scroll.

This waiting state is important. Do not start the layout transformation automatically after an arbitrary timeout.

## 6. First-scroll transition: K2

K2 converts the SVG annotation into the initial layout framework for the four Parts.

### 6.1 Trigger

**Confirmed: K2 is triggered by the user's first downward scroll.**

This is a one-time state transition, not a continuous animation mapped to scroll distance.

Do not bind the transformation to `scrollY` progress. Scrolling back up must not reverse the animation or replay it.

Support real downward input across desktop and touch devices. Keyboard-based downward navigation should also be considered.

The trigger must not fire repeatedly.

### 6.2 Remove temporary SVG construction details

When K2 starts, these annotation elements disappear:

- x/y labels and their position markers.
- Force nodes.
- Force tangent/control handles.
- The complete original FP Logo outline, including the rounded background-plate frame.

The normal Logo has already disappeared during K1.

After these elements are removed, only the designated original annotation frame/reference lines remain.

### 6.3 Preserve the original lines

**Critical continuity requirement:** the surviving lines must be the same SVG line elements that were already present in K1.

Do not destroy the original annotation lines and create visually similar HTML borders or a second set of SVG lines.

The surviving line geometry must be carried into the page-layout state. The implementation may reorganize the SVG structure internally, but the visible line paths must retain continuity.

A useful implementation contract is to identify line groups explicitly, for example:

- Persistent guide/frame lines.
- Temporary coordinate annotations.
- Temporary Force handles.
- Temporary Logo outline.

The exact grouping and which guide IDs survive should be made explicit in the SVG source. Do not infer persistence from visual appearance at runtime.

### 6.4 Move guides to the Title Page boundary

The persistent lines move toward the bottom edge of the **entire Title Page content region**.

The destination is not:

- Under the name text.
- Under the website subtitle.
- Under the Logo.
- Under one particular title line.

It is the lower boundary of the complete Hero / Title Page composition.

The movement should visually establish the boundary between the Title Page and the following Part framework.

### 6.5 Expand the guide layout

After reaching the Title Page's lower boundary, the horizontal guide lines expand into their final page-width positions.

Their spacing becomes more even, forming the horizontal structure from which the Part regions are established.

Use a fast ease-out motion, preferably in the Out Cubic family:

```text
ease-out / Out Cubic
```

The animation should feel like a compact structural diagram rapidly opening into a page grid.

The lines are not one generic divider duplicated four times after the fact. They are the continuing guide system that becomes the Part framework.

### 6.6 Part title reveal

After the guide expansion finishes, allow a short pause. Then reveal the Part titles in vertical order:

1. Part.01 Introduction
2. Part.02 Works
3. Part.03 Milestones
4. Part.04 Beyond

The earlier numeric strings such as `111111` and `222222` were layout placeholders only. They are not final titles.

The titles should appear quickly, with a type-in / rapid reveal quality. Their exact speed and per-title delay remain open.

### 6.7 Cursor treatment

Each Part title ends with a terminal-inspired **underline cursor**.

Requirements:

- It is an underline-like cursor, not a block cursor.
- It is visually attached to the end of the title.
- It should stay close to the final title character.
- It blinks during the title reveal and the initial framework state.
- It is a title-ending cue, not a separate decorative element floating elsewhere.

Because the title font is proportional sans-serif, the cursor should be implemented as a separate inline visual mark if necessary. Do not switch the title to a monospace font just to obtain a cursor.

### 6.8 K2 end state

At the end of K2:

- The initial Title Page has completed its role in the scene.
- The Part titles are visible in vertical order.
- Horizontal separators / guide lines establish the initial Part divisions.
- The left/right dashed outer boundaries have not yet completed their appearance.
- The overall palette has not yet completed the content-theme transition.

---

## 7. Part framework and visual transition: K3

K3 converts the expanded guide layout into the final narrow Part framework while the page changes from the Hero's monochrome visual system to the content's blue-based visual system.

This is one coordinated transition, not several unrelated effects.

### 7.1 Hero departure

By the end of K3, the Hero / Title Page content is no longer visible.

The page continues from the Part titles and horizontal separators established in K2.

The departure of the Hero's content must not cause the overall scene background to jump abruptly to the content color. The color transition is still running as part of K3.

### 7.2 Left and right boundary movement

The left and right dashed boundaries begin outside the visible content region and move inward toward the center.

This is a directional movement, not a plain opacity fade.

Both sides move toward the center simultaneously. As they enter the content region, the width of each Part becomes narrower.

The final result should resemble a clean page-edge framework: strong enough to define the content width, but light enough not to make every Part look like a card.

### 7.3 Part title scaling

At the same time as the side boundaries move inward:

- Each Part title scales down.
- The title's scale remains coordinated with its corresponding Part width.
- The title's horizontal rule / extension line shortens with the title.
- The title, title line and side boundaries maintain a coherent spatial relationship.

The title must not remain oversized after the boundaries have already reached their final position.

The exact scale ratio and transformation origin remain open for visual tuning.

### 7.4 Synchronized theme transition

The page transitions from the Hero's black-and-white visual system to the content's dark-blue / light-blue system.

The following properties must transition together:

| Element | Hero-stage appearance | Content-stage appearance |
|---|---|---|
| Page background | Monochrome | Blue-based page palette |
| Part title | Hero-compatible monochrome | Content text color |
| Horizontal rules | Hero-compatible line color | Content boundary color |
| Left/right boundaries | Hero-compatible dashed lines | Content boundary color |
| Part background | Initial framework surface | Same color as the page background at the bottom |
| Cursor | High-contrast Hero color | Content-compatible color |

The transition should use coordinated color interpolation. Do not make the background change first and then animate text, borders and the cursor independently after it.

The colors must maintain readable contrast throughout the transition, not only at the beginning and end.

The same principle applies in both Light and Dark modes, with different destination palettes.

### 7.5 Part background blending

The Part framework may initially read as a more visible group of regions. During K3, the Part background colors transition toward the same color used by the page background at the bottom.

The final layout should not resemble four isolated cards placed on a page. Its structure should be communicated primarily by the outer dashed boundaries, horizontal rules, spacing and typography.

### 7.6 Cursor deceleration

The cursor participates in the K3 color transition.

Its behavior:

1. It begins with the Hero-stage contrast color.
2. Its color interpolates with the other visual elements.
3. Its blink frequency gradually decreases.
4. Its blinking eventually stops.
5. It remains visible after stopping, in the final content-compatible color.

Do not remove the cursor at the end of K3.

### 7.7 K3 end state

At the end of K3:

- The Hero content is gone.
- The four Parts form a vertical framework.
- The left and right dashed boundaries have reached their final positions.
- Part titles and their extension lines have reached their reduced sizes.
- Page background, title text, borders, separators, Part surfaces and cursors use the content visual system.
- The cursor remains visible but no longer blinks.

---

## 8. Part.01 expansion: K4

K4 begins after the Part framework and theme transition are complete.

### 8.1 Expand Part.01

Part.01 expands downward to create a sufficiently large content area.

Its title remains at the upper-left portion of the Part. The surrounding boundary structure remains visible.

The expansion should be perceived as the first Part opening into a content canvas, not as a generic accordion opening.

The exact final height is not fixed. It should be determined by the actual Introduction composition and responsive layout.

### 8.2 Other Parts remain compact

During K4:

- Part.02 remains compact.
- Part.03 remains compact.
- Part.04 remains compact.

They remain vertically ordered below Part.01.

Do not start their falling animation during K4. That belongs to K5.

### 8.3 K4 end state

Part.01 has a sufficiently large empty content area, but its actual content has not yet started revealing.

The other three Parts remain in their compact framework state.

---

## 9. Part fall and content reveal: K5

K5 moves from framework construction into the presentation of actual content.

### 9.1 Part.02–04 falling motion

Part.02, Part.03 and Part.04 move downward to make room for Part.01's content.

Use an ease-in curve, preferably in the In Cubic family.

The motion should have an unmistakable falling quality:

- It accelerates into the downward movement.
- It should not read as a simple gentle push.
- It should not be reduced to ordinary layout reflow.
- Its timing and acceleration should be tuned through visual testing.

The exact distance, overlap behavior and final resting positions remain open.

The final layout must remain stable after the animation. Do not leave the Parts dependent on a temporary transform that causes later content to overlap or jump when the animation ends.

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

---

## 10. Complete animation sequence

| Stage | Name | Main action | Important constraint |
|---|---|---|---|
| K0 | Logo Reveal | Supplied FP Logo extends into view | Use `public/images/fp-logo.svg`; preserve its source geometry |
| K1 | SVG Annotation | Logo crossfades into vector annotation | Logo and annotation are not both fully visible |
| K2 | First Scroll | First downward scroll removes temporary annotations; original guide lines move and expand; Part titles appear | One-time trigger; not scroll-progress-driven |
| K3 | Part Framework & Theme Transition | Side boundaries move inward; titles/rules shrink; all colors transition | Layout and theme transition are synchronized |
| K4 | Part.01 Expansion | Part.01 expands vertically | Other Parts remain compact |
| K5 | Part Fall & Content Reveal | Parts 02–04 fall; Part.01 content flows into view | Text and large components use different reveal granularity |

### 10.1 High-level state model

The implementation should have an explicit, one-way state model. A practical naming scheme is:

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
- K2 can be entered only once.
- Scrolling upward never reverses the state.
- K3 does not begin before the K2 guide expansion and title reveal have reached their intended completion point.
- K4 does not begin before the K3 framework and theme transition are complete.
- K5 does not begin before Part.01 has finished expanding.
- Once the content state is complete, ordinary scrolling and reading behave like a normal page.

### 10.3 Timing

No exact duration is fixed in this document.

The relative ordering is fixed, but the following parameters must be tuned in-browser:

- K0 Logo extension direction, distance and duration.
- K1 crossfade duration.
- K2 guide movement and expansion duration.
- Pause before Part title reveal.
- Part title reveal speed and stagger.
- K3 boundary travel distance and duration.
- K3 title scale ratio.
- K3 color interpolation curve.
- Cursor starting blink frequency and deceleration curve.
- K4 expansion height and duration.
- K5 falling distance, acceleration and duration.
- Text reveal phrase size, delay and opacity duration.
- Large-component reveal duration.

Do not hardcode arbitrary values as if they were approved design decisions.

---

## 11. Interaction and page behavior

### 11.1 First-scroll semantics

The first downward scroll is a **trigger**, not a progress controller.

The animation sequence runs according to its own timeline after it has been triggered. Moving the wheel farther must not accelerate it or skip stages; scrolling upward must not reverse it.

Do not implement scroll-jacking that continuously maps the entire animation to a large scroll distance.

Whether browser scrolling should be temporarily held during the K2–K5 choreography is still an open interaction detail. It must be tested deliberately: the user should not lose the initial gesture, experience an accidental page jump, or feel that scrolling is broken.

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
- No reverse transformation when scrolling upward.
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

If the viewport changes during K0–K5, the implementation must not leave guide lines at stale coordinates or cause the Part framework to break.

The exact behavior—recalculate the remaining animation geometry, finish at the new layout, or defer resize handling until the sequence completes—must be tested and chosen deliberately.

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

The Logo source geometry is available at `public/images/fp-logo.svg`. The annotation now reuses the supplied FP Logo geometry. Its eighteen dashed guide paths are the original visible K1 elements that survive into K2; browser verification is still required.

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

- One-time downward-scroll trigger.
- Remove temporary SVG details.
- Preserve original guide lines.
- Move guides to the full Title Page lower boundary.
- Expand guide spacing.
- Reveal Part titles and underline cursors.

**Acceptance criteria**

- The trigger fires once.
- The animation is not controlled by scroll distance.
- Scrolling upward does not reverse it.
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
- Background, text, lines, borders, surfaces and cursor all participate.
- The final Part surface blends with the page background.
- The cursor remains visible and stops blinking.

### Phase 5 — K4 and K5 Introduction reveal

**Scope**

- Part.01 expansion.
- Part.02–04 downward fall.
- Ordered text reveal.
- Complete-component reveal.

**Acceptance criteria**

- Other Parts remain compact throughout K4.
- Part.02–04 do not fall until K5.
- Their motion has a perceptible ease-in / falling quality.
- Part.01 content reveals top-to-bottom and left-to-right.
- Text appears in short groups at a brisk pace.
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
- No accidental replays or reverse transitions occur.
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
- Final Part boundary inset and dashed-line pattern.

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
- [ ] The guides move to the bottom edge of the whole Title Page.
- [ ] Guide expansion uses a fast ease-out character.
- [ ] Part titles appear after guide expansion and a short pause.
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
- [ ] The animation never reverses when scrolling upward.
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
- Implement K2 using the original eighteen persistent SVG guide paths.
- Verify the complete sequence at desktop, tablet and mobile sizes.

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

**A local Vite production build and browser visual review have not yet been run.** Do not report the current implementation as build-verified or visually approved.

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
