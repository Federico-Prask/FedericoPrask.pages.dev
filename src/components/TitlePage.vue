<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../composables/useI18n";
import { useTheme } from "../composables/useTheme";
import LogoMark from "./LogoMark.vue";
import LogoAnnotation from "./LogoAnnotation.vue";

const { locale, setLocale } = useI18n();
const { pref, resolved, cycle } = useTheme();

type LogoStage = "reveal" | "crossfade" | "waiting";
type K2Phase = "idle" | "recompose" | "settled" | "expand" | "titles";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const logoStage = ref<LogoStage>(prefersReducedMotion ? "waiting" : "reveal");
const k2Started = ref(false);
const k2Phase = ref<K2Phase>("idle");
const titlePageRef = ref<HTMLElement | null>(null);
const markSpaceRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const k3Started = ref(false);
const heroNameInset = ref(0);

const annotationBounds = ref({ left: 0, top: 0, width: 0, height: 0 });
const viewport = ref({
  width: typeof window === "undefined" ? 0 : window.innerWidth,
  height: typeof window === "undefined" ? 0 : window.innerHeight,
});
const heroHeight = ref(viewport.value.height);

const lineDefinitions = [
  { id: "guide-plate-h-01", y: 0 },
  { id: "guide-mono-h-04", y: 72 },
  { id: "guide-mono-h-06", y: 131 },
  { id: "guide-mono-h-07", y: 199 },
  { id: "guide-plate-h-02", y: 256 },
] as const;

const frameworkParts = [
  "Part.01 Introduction",
  "Part.02 Works",
  "Part.03 Milestones",
  "Part.04 Beyond",
] as const;

const frameworkTitleRevealDuration =
  Math.max(...frameworkParts.map((part) => part.length - 1)) * 36 + 420;
const frameworkCursorDelay = frameworkTitleRevealDuration + "ms";

const annotationStyle = computed(() => ({
  left: annotationBounds.value.left + "px",
  top: annotationBounds.value.top + "px",
  width: annotationBounds.value.width + "px",
  height: annotationBounds.value.height + "px",
}));

const horizontalInset = computed(() =>
  Math.max(24, Math.min(64, viewport.value.width * 0.04)),
);

const verticalInset = computed(() =>
  Math.max(28, Math.min(72, viewport.value.height * 0.07)),
);

const frameworkInset = computed(() =>
  Math.max(0, Math.min(heroNameInset.value, viewport.value.width / 2 - 1)),
);

const compactLineGap = computed(() => {
  const { height } = viewport.value;
  const rowGap = (height - verticalInset.value * 2) / 4;
  return Math.max(22, Math.min(48, rowGap * 0.24));
});

function makeLineMatrix(
  sourceY: number,
  targetX: number,
  targetY: number,
  targetWidth: number,
): string {
  const bounds = annotationBounds.value;
  const unit = bounds.width / 256;
  if (!unit) return "";
  const scaleX = targetWidth / bounds.width;
  const translateX = (targetX - bounds.left) / unit;
  const translateY = (targetY - bounds.top) / unit - sourceY;
  return "matrix(" + [scaleX, 0, 0, 1, translateX, translateY].join(", ") + ")";
}

const k2LineTransforms = computed<Record<string, string>>(() => {
  const bounds = annotationBounds.value;
  const { width, height } = viewport.value;
  if (!bounds.width || !width || !height || k2Phase.value === "idle") return {};

  const initialScroll = heroHeight.value * K2_INITIAL_SCROLL_RATIO;
  const compactBottomY = initialScroll + heroHeight.value - verticalInset.value;
  const compactTopY =
    compactBottomY - (lineDefinitions.length - 1) * compactLineGap.value;

  // The lowest rule moves in document coordinates by the same distance as
  // the page scroll, keeping it visually anchored in the viewport.
  const finalBottomY = compactBottomY + (heroHeight.value - initialScroll);
  const finalRowGap = (height - verticalInset.value * 2) / (lineDefinitions.length - 1);
  const isExpanding = k2Phase.value === "expand" || k2Phase.value === "titles";

  return Object.fromEntries(
    lineDefinitions.map((line, index) => {
      const targetY = isExpanding
        ? finalBottomY - (lineDefinitions.length - 1 - index) * finalRowGap
        : compactTopY + index * compactLineGap.value;

      // K2 keeps the rules edge-to-edge. K3 draws them inward to the
      // measured Hero-name inset, matching the two new vertical boundaries.
      const inset = k3Started.value ? frameworkInset.value : 0;
      const targetWidth = k3Started.value ? width - inset * 2 : width;
      return [line.id, makeLineMatrix(line.y, inset, targetY, targetWidth)];
    }),
  );
});

const k2LineDelays = computed<Record<string, string>>(() =>
  Object.fromEntries(
    lineDefinitions.map((line, index) => [
      line.id,
      k2Phase.value === "expand"
        ? (lineDefinitions.length - 1 - index) * K2_LINE_STAGGER + "ms"
        : "0ms",
    ]),
  ),
);

const frameworkTitlesStyle = computed(() => {
  const bounds = annotationBounds.value;
  const { width, height } = viewport.value;
  const rowHeight = (height - verticalInset.value * 2) / 4;
  const inset = k3Started.value ? frameworkInset.value : horizontalInset.value;
  return {
    left: inset - bounds.left + "px",
    top: heroHeight.value + verticalInset.value - bounds.top + "px",
    width: width - inset * 2 + "px",
    height: height - verticalInset.value * 2 + "px",
    "--framework-title-size": rowHeight / 2.5 + "px",
    "--framework-title-scale": k3Started.value ? "0.72" : "1",
  };
});

const frameworkBoundaryTop = computed(
  () => heroHeight.value + verticalInset.value - annotationBounds.value.top,
);
const frameworkBoundaryHeight = computed(
  () => viewport.value.height - verticalInset.value * 2,
);
const frameworkBoundaryLeftStyle = computed(() => ({
  left: frameworkInset.value - annotationBounds.value.left + "px",
  top: frameworkBoundaryTop.value + "px",
  height: frameworkBoundaryHeight.value + "px",
}));
const frameworkBoundaryRightStyle = computed(() => ({
  left: viewport.value.width - frameworkInset.value - annotationBounds.value.left + "px",
  top: frameworkBoundaryTop.value + "px",
  height: frameworkBoundaryHeight.value + "px",
}));

let k2RecomposeTimer: number | undefined;
let k2SettleTimer: number | undefined;
let k2ExpandTimer: number | undefined;
let k3StartTimer: number | undefined;
let scrollFrame: number | undefined;
let touchStartY: number | null = null;
let pendingK2 = false;
let lastScrollY = 0;

const K2_RECOMPOSE_DURATION = 720;
const K2_INITIAL_SCROLL_DURATION = 560;
const K2_INITIAL_SCROLL_RATIO = 0.22;
const K2_SETTLE_HOLD = 170;
const K2_OPEN_SCROLL_DURATION = 1100;
const K2_LINE_EXPAND_DURATION = 1100;
const K2_LINE_STAGGER = 65;
const K3_CURSOR_HOLD_CYCLES = 2;

function easeInOutCubic(value: number): number {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function animateDocumentScroll(
  targetY: number,
  duration: number,
  easing: "in-out-cubic" | "out-cubic" = "in-out-cubic",
) {
  if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  const frame = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased =
      easing === "out-cubic"
        ? easeOutCubic(progress)
        : easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      scrollFrame = window.requestAnimationFrame(frame);
    } else {
      scrollFrame = undefined;
      window.scrollTo(0, targetY);
      document.documentElement.style.scrollBehavior = previousBehavior;
      lastScrollY = targetY;
    }
  };

  scrollFrame = window.requestAnimationFrame(frame);
}

function scrollImmediatelyToFramework() {
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, heroHeight.value);
  document.documentElement.style.scrollBehavior = previousBehavior;
  lastScrollY = window.scrollY;
}

function beginK3() {
  if (k3Started.value) return;
  k3Started.value = true;
  document.documentElement.classList.add("k3-content-theme");
}

function beginK2() {
  if (k2Started.value) return;
  if (logoStage.value !== "waiting") {
    pendingK2 = true;
    return;
  }

  k2Started.value = true;
  pendingK2 = false;

  if (prefersReducedMotion) {
    k2Phase.value = "titles";
    scrollImmediatelyToFramework();
    beginK3();
    return;
  }

  k2Phase.value = "recompose";

  // Move the document only a short distance during the first line regrouping.
  // The Hero remains mostly visible while the five paths settle into a
  // moderately spaced group near its lower edge.
  animateDocumentScroll(
    heroHeight.value * K2_INITIAL_SCROLL_RATIO,
    K2_INITIAL_SCROLL_DURATION,
  );

  k2RecomposeTimer = window.setTimeout(() => {
    k2Phase.value = "settled";

    // Hold the intermediate composition briefly, then let the rules open
    // the framework while the document completes its upward-moving scroll.
    k2SettleTimer = window.setTimeout(() => {
      k2Phase.value = "expand";
      animateDocumentScroll(
        heroHeight.value,
        K2_OPEN_SCROLL_DURATION,
        "out-cubic",
      );

      const totalExpandTime =
        K2_LINE_EXPAND_DURATION + (lineDefinitions.length - 1) * K2_LINE_STAGGER;
      k2ExpandTimer = window.setTimeout(() => {
        k2Phase.value = "titles";
        k3StartTimer = window.setTimeout(
          beginK3,
          frameworkTitleRevealDuration + K3_CURSOR_HOLD_CYCLES * 900,
        );
      }, Math.max(totalExpandTime, K2_OPEN_SCROLL_DURATION) + 80);
    }, K2_SETTLE_HOLD);
  }, K2_RECOMPOSE_DURATION);
}

function handleWheel(event: WheelEvent) {
  if (event.deltaY > 0 && !k2Started.value) {
    event.preventDefault();
    beginK2();
  }
}

function handleTouchStart(event: TouchEvent) {
  touchStartY = event.touches[0]?.clientY ?? null;
}

function handleTouchMove(event: TouchEvent) {
  const currentY = event.touches[0]?.clientY;
  if (
    !k2Started.value &&
    touchStartY !== null &&
    currentY !== undefined &&
    touchStartY - currentY > 8
  ) {
    event.preventDefault();
    beginK2();
  }
}

function handleTouchEnd() {
  touchStartY = null;
}

function handleDocumentScroll() {
  const currentY = window.scrollY;
  const movedDown = currentY > lastScrollY;
  lastScrollY = currentY;
  if (movedDown && !k2Started.value) beginK2();
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest("button, a, input, textarea, select, [contenteditable='true']"));
}

function handleKeydown(event: KeyboardEvent) {
  if (
    event.defaultPrevented ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    isInteractiveTarget(event.target)
  ) {
    return;
  }

  if (
    event.key === "ArrowDown" ||
    event.key === "PageDown" ||
    event.key === " " ||
    event.key === "End"
  ) {
    if (!k2Started.value) {
      event.preventDefault();
      beginK2();
    }
  }
}

function updateAnnotationBounds() {
  if (!markSpaceRef.value || k2Started.value) return;
  if (titlePageRef.value) {
    const pageRect = titlePageRef.value.getBoundingClientRect();
    heroHeight.value = pageRect.height;
    viewport.value = { width: pageRect.width, height: pageRect.height };
  }
  const nameRect = nameRef.value?.getBoundingClientRect();
  if (nameRect) heroNameInset.value = nameRect.left;
  const rect = markSpaceRef.value.getBoundingClientRect();
  annotationBounds.value = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

function handleResize() {
  if (titlePageRef.value) {
    const pageRect = titlePageRef.value.getBoundingClientRect();
    heroHeight.value = pageRect.height;
    viewport.value = { width: pageRect.width, height: pageRect.height };
  }
  updateAnnotationBounds();
}

function handleLogoRevealEnd() {
  if (logoStage.value === "reveal") {
    logoStage.value = "crossfade";
  }
}

function handleAnnotationFadeEnd(event: TransitionEvent) {
  if (event.propertyName === "opacity" && logoStage.value === "crossfade") {
    logoStage.value = "waiting";
    if (pendingK2) beginK2();
  }
}

onMounted(() => {
  updateAnnotationBounds();
  lastScrollY = window.scrollY;

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true, capture: true });
  window.addEventListener("touchcancel", handleTouchEnd, { passive: true, capture: true });
  window.addEventListener("keydown", handleKeydown, true);
  window.addEventListener("scroll", handleDocumentScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (k2RecomposeTimer !== undefined) window.clearTimeout(k2RecomposeTimer);
  if (k2SettleTimer !== undefined) window.clearTimeout(k2SettleTimer);
  if (k2ExpandTimer !== undefined) window.clearTimeout(k2ExpandTimer);
  if (k3StartTimer !== undefined) window.clearTimeout(k3StartTimer);
  if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
  document.documentElement.classList.remove("k3-content-theme");

  window.removeEventListener("resize", handleResize);
  window.removeEventListener("wheel", handleWheel, true);
  window.removeEventListener("touchstart", handleTouchStart, true);
  window.removeEventListener("touchmove", handleTouchMove, true);
  window.removeEventListener("touchend", handleTouchEnd, true);
  window.removeEventListener("touchcancel", handleTouchEnd, true);
  window.removeEventListener("keydown", handleKeydown, true);
  window.removeEventListener("scroll", handleDocumentScroll);
});
</script>

<template>
  <section
    id="title-page"
    ref="titlePageRef"
    class="title-page"
    :class="{ 'has-started-k2': k2Started }"
    aria-labelledby="page-title"
  >
    <div class="title-page__controls" role="group" :aria-label="locale === 'zh' ? '页面设置' : 'Page settings'">
      <div class="title-page__language" role="group" :aria-label="locale === 'zh' ? '语言' : 'Language'">
        <button
          type="button"
          class="title-page__control"
          :class="{ 'is-active': locale === 'zh' }"
          :aria-pressed="locale === 'zh'"
          @click="setLocale('zh')"
        >
          中
        </button>
        <span class="title-page__control-divider" aria-hidden="true"></span>
        <button
          type="button"
          class="title-page__control"
          :class="{ 'is-active': locale === 'en' }"
          :aria-pressed="locale === 'en'"
          @click="setLocale('en')"
        >
          EN
        </button>
      </div>

      <span class="title-page__settings-divider" aria-hidden="true"></span>

      <button
        type="button"
        class="title-page__control title-page__theme"
        :aria-label="locale === 'zh' ? '切换明暗主题' : 'Change color theme'"
        :title="locale === 'zh' ? '切换明暗主题' : 'Change color theme'"
        @click="cycle"
      >
        <span class="title-page__theme-indicator" :class="{ 'is-dark': resolved === 'dark' }" aria-hidden="true"></span>
        <span>{{ pref === 'system' ? (locale === 'zh' ? '自动' : 'AUTO') : resolved.toUpperCase() }}</span>
      </button>
    </div>

    <div class="title-page__layout">
      <div class="title-page__identity">
        <h1 id="page-title" ref="nameRef" class="title-page__name">
          <span>Federico</span>
          <span>Prask</span>
        </h1>
        <p class="title-page__subtitle">
          {{ locale === 'zh' ? '个人网站' : 'Personal Website' }}
        </p>
      </div>

      <div ref="markSpaceRef" class="title-page__mark-space">
        <div
          class="title-page__logo-sequence"
          :class="`is-${logoStage}`"
          role="img"
          :aria-label="locale === 'zh' ? 'FP 标志' : 'FP monogram'"
        >
          <div
            v-if="logoStage !== 'waiting'"
            class="title-page__logo-normal"
            :class="{ 'is-inverted': resolved === 'light' }"
            aria-hidden="true"
          >
            <LogoMark @reveal-end="handleLogoRevealEnd" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
    class="title-page__framework-scroll-stage"
    :class="{ 'is-k3': k3Started }"
    aria-hidden="true"
  ></div>

  <div
    v-if="annotationBounds.width"
    class="title-page__logo-annotation"
    :class="{ 'is-visible': logoStage === 'crossfade' || logoStage === 'waiting', 'is-k3': k3Started }"
    :style="annotationStyle"
    @transitionend.self="handleAnnotationFadeEnd"
  >
    <LogoAnnotation
      :k2-started="k2Started"
      :k2-phase="k2Phase"
      :k2-line-transforms="k2LineTransforms"
      :k2-line-delays="k2LineDelays"
      :k3-started="k3Started"
    />
    <div
      v-if="k2Phase === 'titles'"
      class="framework-boundary framework-boundary--left"
      :class="{ 'is-k3': k3Started }"
      :style="frameworkBoundaryLeftStyle"
      aria-hidden="true"
    ></div>
    <div
      v-if="k2Phase === 'titles'"
      class="framework-boundary framework-boundary--right"
      :class="{ 'is-k3': k3Started }"
      :style="frameworkBoundaryRightStyle"
      aria-hidden="true"
    ></div>
    <div
      v-if="k2Phase === 'titles'"
      class="framework-titles"
      :class="{ 'is-k3': k3Started }"
      :style="frameworkTitlesStyle"
      aria-hidden="true"
    >
      <div class="framework-surfaces" :class="{ 'is-k3': k3Started }" aria-hidden="true">
        <span v-for="part in frameworkParts" :key="`surface-${part}`" class="framework-surface"></span>
      </div>
      <div
        v-for="part in frameworkParts"
        :key="part"
        class="framework-title"
      >
        <span class="framework-title__text">
          <span
            v-for="(character, index) in part.split('')"
            :key="`${part}-${index}`"
            class="framework-title__character"
            :style="{ '--character-delay': `${index * 36}ms` }"
          >{{ character === " " ? "\u00A0" : character }}</span>
        </span>
        <span
          class="framework-title__cursor"
          :style="{ '--cursor-delay': frameworkCursorDelay }"
        ></span>
        <span class="framework-title__extension" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-page {
  position: relative;
  display: grid;
  width: 100%;
  height: 100svh;
  min-height: 100svh;
  overflow: clip;
  padding: clamp(1.5rem, 4.2vw, 4.5rem);
  background: var(--site-hero-background);
  color: var(--site-hero-foreground);
}

.title-page__controls {
  position: absolute;
  z-index: 1;
  inset-block-start: clamp(1.5rem, 3.4vw, 3rem);
  inset-inline-end: clamp(1.5rem, 4.2vw, 4.5rem);
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--site-hero-foreground);
  font-family: var(--font-technical);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
}

.title-page__language {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
}

.title-page__control {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2rem;
  padding: 0.25rem 0;
  border: 0;
  background: transparent;
  color: currentColor;
  opacity: 0.48;
  transition: opacity 180ms ease, color 180ms ease;
}

.title-page__control:hover,
.title-page__control:focus-visible,
.title-page__control.is-active {
  opacity: 1;
}

.title-page__control:focus-visible {
  outline: 1px solid var(--site-brand);
  outline-offset: 4px;
}

.title-page__control-divider,
.title-page__settings-divider {
  width: 1px;
  height: 0.8rem;
  background: var(--site-hero-rule-strong);
}

.title-page__theme-indicator {
  width: 0.55rem;
  height: 0.55rem;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: transparent;
}

.title-page__theme-indicator.is-dark {
  background: currentColor;
}

.title-page__layout {
  display: grid;
  width: min(100%, 82rem);
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.82fr);
  align-items: center;
  gap: clamp(1.7rem, 4.2vw, 4.2rem);
  margin: auto;
}

.title-page__identity {
  min-width: 0;
}

.title-page__name {
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.55rem, 8.7vw, 8rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 0.84;
}

.title-page__name span + span {
  margin-block-start: 0.12em;
}

.title-page__subtitle {
  margin: clamp(1.7rem, 3.2vw, 3rem) 0 0 0.12em;
  color: var(--site-hero-foreground);
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 1.45vw, 1.25rem);
  font-weight: 400;
  letter-spacing: -0.015em;
  opacity: 0.62;
}

.title-page__mark-space {
  display: grid;
  width: clamp(15rem, 23.5vw, 21rem);
  max-width: 100%;
  min-width: 0;
  aspect-ratio: 1;
  place-items: center;
  justify-self: end;
}

.title-page__logo-sequence {
  position: relative;
  width: 100%;
  height: 100%;
}

.title-page__logo-normal {
  position: absolute;
  inset: 0;
  opacity: 1;
  filter: none;
  transition: opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1), filter 100ms ease;
}

.title-page__logo-normal.is-inverted {
  filter: invert(1);
}

.title-page__logo-sequence.is-crossfade .title-page__logo-normal {
  opacity: 0;
}

.title-page__framework-scroll-stage {
  min-height: 100svh;
  background: var(--site-hero-background);
  transition: background-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.title-page__framework-scroll-stage.is-k3 {
  background: var(--site-page-background);
}

.title-page__logo-annotation {
  position: absolute;
  z-index: 20;
  display: block;
  overflow: visible;
  color: var(--site-hero-foreground);
  pointer-events: none;
  opacity: 0;
  transition: opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1);
}

.title-page__logo-annotation.is-visible {
  opacity: 1;
}

.title-page__logo-annotation.is-k3 {
  color: var(--site-text-primary);
  transition:
    opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1),
    color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.title-page__logo-annotation > .logo-annotation {
  position: relative;
  z-index: 3;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.framework-titles {
  position: absolute;
  z-index: 2;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  color: var(--site-hero-foreground);
  pointer-events: none;
  transition:
    left 1500ms cubic-bezier(0.333333, 1, 0.666667, 1),
    width 1500ms cubic-bezier(0.333333, 1, 0.666667, 1),
    color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-titles.is-k3 {
  color: var(--site-text-primary);
}

.framework-surfaces {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: 0.35rem;
  pointer-events: none;
}

.framework-surface {
  display: block;
  background: var(--site-panel-background);
  transition: background-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-surfaces.is-k3 .framework-surface {
  background: var(--site-page-background);
}

.framework-boundary {
  position: absolute;
  z-index: 4;
  width: 0;
  border-left: 0.65px dashed var(--site-hero-rule-strong);
  pointer-events: none;
  transform: translateX(-100vw);
  transition:
    transform 1500ms cubic-bezier(0.333333, 1, 0.666667, 1),
    border-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-boundary--right {
  transform: translateX(100vw);
}

.framework-boundary.is-k3 {
  border-color: var(--site-framework-rule);
  transform: translateX(0);
}

.framework-title {
  display: flex;
  align-items: baseline;
  align-self: center;
  width: max-content;
  max-width: 100%;
  min-width: 0;
  font-family: "SF Pro Display", var(--font-heading);
  font-size: var(--framework-title-size);
  font-weight: 800;
  font-optical-sizing: auto;
  font-synthesis: none;
  letter-spacing: -0.035em;
  line-height: 1;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  transform: scale(var(--framework-title-scale, 1));
  transform-origin: left center;
  transition: transform 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-title__text {
  display: inline-flex;
  align-items: baseline;
  white-space: pre;
  line-height: 1;
}

.framework-title__character {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.42em) scale(0.94);
  transform-origin: center bottom;
  animation: framework-character-pop 420ms cubic-bezier(0.333333, 1, 0.666667, 1) both;
  animation-delay: var(--character-delay);
}

.framework-title__cursor {
  display: inline-block;
  flex: 0 0 0.9em;
  width: 0.9em;
  height: 0;
  margin-inline-start: 0.13em;
  border-bottom: 0.06em solid currentColor;
  transform: translateY(0.12em);
  opacity: 0;
  animation: framework-cursor-blink 900ms steps(1, end) var(--cursor-delay) infinite;
  transition: border-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

.framework-titles.is-k3 .framework-title__cursor {
  border-color: var(--site-brand-text);
  animation: framework-cursor-decelerate 3200ms steps(1, end) forwards;
}

.framework-title__extension {
  display: inline-block;
  flex: 0 0 clamp(4rem, 8vw, 10rem);
  width: clamp(4rem, 8vw, 10rem);
  height: 0.35px;
  margin-inline-start: 0.9rem;
  background: currentColor;
  opacity: 0.6;
  transition:
    background-color 1500ms cubic-bezier(0.333333, 1, 0.666667, 1),
    opacity 1500ms cubic-bezier(0.333333, 1, 0.666667, 1);
}

@keyframes framework-cursor-decelerate {
  0%, 9.99% { opacity: 1; }
  10%, 19.99% { opacity: 0; }
  20%, 34.99% { opacity: 1; }
  35%, 49.99% { opacity: 0; }
  50%, 69.99% { opacity: 1; }
  70%, 84.99% { opacity: 0; }
  85%, 100% { opacity: 1; }
}

@keyframes framework-character-pop {
  from {
    opacity: 0;
    transform: translateY(0.42em) scale(0.94);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes framework-cursor-blink {
  0%, 49.999% {
    opacity: 1;
  }

  50%, 100% {
    opacity: 0;
  }
}

@media (max-width: 760px) {
  .framework-title__extension {
    flex-basis: 2rem;
    width: 2rem;
    margin-inline-start: 0.55rem;
  }

  .title-page {
    padding-block-start: 5.5rem;
    padding-inline: clamp(1.25rem, 6vw, 2rem);
  }

  .title-page__controls {
    inset-block-start: 1.5rem;
    inset-inline-end: clamp(1.25rem, 6vw, 2rem);
  }

  .title-page__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .title-page__name {
    font-size: clamp(3.35rem, 14.3vw, 6.1rem);
  }

  .title-page__mark-space {
    width: clamp(10rem, 35.3vw, 13.4rem);
    justify-self: center;
  }

  .framework-title {
    font-size: clamp(1.5rem, 3.6vw, 3.4rem);
    letter-spacing: -0.025em;
  }
}

@media (max-width: 360px) {
  .title-page__name {
    font-size: clamp(2.95rem, 13.4vw, 3.35rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .title-page__control,
  .title-page__logo-normal,
  .title-page__logo-annotation,
  .title-page__logo-annotation.is-k3,
  .title-page__framework-scroll-stage,
  .framework-titles,
  .framework-title,
  .framework-boundary,
  .framework-surface,
  .framework-title__extension {
    transition: none;
  }

  .framework-title__character {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .framework-title__cursor,
  .framework-titles.is-k3 .framework-title__cursor {
    opacity: 1;
    animation: none;
  }

  .framework-boundary {
    border-color: var(--site-framework-rule);
    transform: translateX(0);
    transition: none;
  }

  .framework-title__extension {
    transform: none;
  }
}
</style>
