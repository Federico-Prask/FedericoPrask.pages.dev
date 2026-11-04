<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../composables/useI18n";
import { useTheme } from "../composables/useTheme";
import LogoMark from "./LogoMark.vue";
import LogoAnnotation from "./LogoAnnotation.vue";

const { locale, setLocale } = useI18n();
const { pref, resolved, cycle } = useTheme();

type LogoStage = "reveal" | "crossfade" | "waiting";
type K2Phase = "idle" | "recompose" | "travel" | "expand" | "titles";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const logoStage = ref<LogoStage>(prefersReducedMotion ? "waiting" : "reveal");
const k2Started = ref(false);
const k2Phase = ref<K2Phase>("idle");
const markSpaceRef = ref<HTMLElement | null>(null);

const annotationBounds = ref({ left: 0, top: 0, width: 0, height: 0 });
const viewport = ref({
  width: typeof window === "undefined" ? 0 : window.innerWidth,
  height: typeof window === "undefined" ? 0 : window.innerHeight,
});

const lineDefinitions = [
  { id: "guide-plate-h-01", y: 0 },
  { id: "guide-mono-h-04", y: 72 },
  { id: "guide-mono-h-06", y: 131 },
  { id: "guide-mono-h-07", y: 199 },
  { id: "guide-plate-h-02", y: 256 },
] as const;

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

const compactLineGap = computed(() =>
  Math.max(6, Math.min(9, viewport.value.height * 0.01)),
);

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

  const compactTop = height + 28;
  const finalRowGap = (height - verticalInset.value * 2) / 4;
  const targetWidth = width - horizontalInset.value * 2;

  return Object.fromEntries(
    lineDefinitions.map((line, index) => {
      let targetX = (width - bounds.width) / 2;
      let targetY = compactTop + index * compactLineGap.value;
      let lineWidth = bounds.width;

      if (k2Phase.value === "travel" || k2Phase.value === "expand" || k2Phase.value === "titles") {
        targetX = horizontalInset.value;
        lineWidth = targetWidth;
      }

      if (k2Phase.value === "expand" || k2Phase.value === "titles") {
        targetY = height + verticalInset.value + index * finalRowGap;
      }

      return [
        line.id,
        makeLineMatrix(line.y, targetX, targetY, lineWidth),
      ];
    }),
  );
});

const k2LineDelays = computed<Record<string, string>>(() =>
  Object.fromEntries(
    lineDefinitions.map((line, index) => [
      line.id,
      k2Phase.value === "expand" ? index * 70 + "ms" : "0ms",
    ]),
  ),
);

const frameworkTitlesStyle = computed(() => {
  const bounds = annotationBounds.value;
  const { width, height } = viewport.value;
  return {
    left: horizontalInset.value - bounds.left + "px",
    top: height + verticalInset.value - bounds.top + "px",
    width: width - horizontalInset.value * 2 + "px",
    height: height - verticalInset.value * 2 + "px",
  };
});

let k2RecomposeTimer: number | undefined;
let k2TravelTimer: number | undefined;
let k2ExpandTimer: number | undefined;
let scrollFrame: number | undefined;
let touchStartY: number | null = null;
let pendingK2 = false;
let lastScrollY = 0;

const K2_RECOMPOSE_DURATION = 760;
const K2_SCROLL_DURATION = 920;
const K2_LINE_TRAVEL_DURATION = 1100;
const K2_LINE_EXPAND_DURATION = 920;
const K2_LINE_STAGGER = 70;

function easeInOutCubic(value: number): number {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function animateDocumentScroll(targetY: number, duration: number) {
  if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  const frame = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = easeInOutCubic(progress);
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
  window.scrollTo(0, viewport.value.height);
  document.documentElement.style.scrollBehavior = previousBehavior;
  lastScrollY = window.scrollY;
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
    return;
  }

  k2Phase.value = "recompose";
  k2RecomposeTimer = window.setTimeout(() => {
    k2Phase.value = "travel";
    animateDocumentScroll(viewport.value.height, K2_SCROLL_DURATION);

    k2TravelTimer = window.setTimeout(() => {
      k2Phase.value = "expand";
      const totalExpandTime =
        K2_LINE_EXPAND_DURATION + (lineDefinitions.length - 1) * K2_LINE_STAGGER;
      k2ExpandTimer = window.setTimeout(() => {
        k2Phase.value = "titles";
      }, totalExpandTime + 80);
    }, K2_LINE_TRAVEL_DURATION);
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
  const rect = markSpaceRef.value.getBoundingClientRect();
  annotationBounds.value = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

function handleResize() {
  viewport.value = { width: window.innerWidth, height: window.innerHeight };
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
  if (k2TravelTimer !== undefined) window.clearTimeout(k2TravelTimer);
  if (k2ExpandTimer !== undefined) window.clearTimeout(k2ExpandTimer);
  if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);

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
        <h1 id="page-title" class="title-page__name">
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

  <div class="title-page__framework-scroll-stage" aria-hidden="true"></div>

  <div
    v-if="annotationBounds.width"
    class="title-page__logo-annotation"
    :class="{ 'is-visible': logoStage === 'crossfade' || logoStage === 'waiting' }"
    :style="annotationStyle"
    @transitionend.self="handleAnnotationFadeEnd"
  >
    <LogoAnnotation
      :k2-started="k2Started"
      :k2-phase="k2Phase"
      :k2-line-transforms="k2LineTransforms"
      :k2-line-delays="k2LineDelays"
    />
    <div
      v-if="k2Phase === 'titles'"
      class="framework-titles"
      :style="frameworkTitlesStyle"
      aria-hidden="true"
    >
      <div
        v-for="part in [
          'Part.01 Introduction',
          'Part.02 Works',
          'Part.03 Milestones',
          'Part.04 Beyond',
        ]"
        :key="part"
        class="framework-title"
      >
        <span class="framework-title__text">{{ part }}</span>
        <span class="framework-title__cursor"></span>
      </div>
    </div>
  </div>
</template>

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
  width: min(100%, 88rem);
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.82fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
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
  font-size: clamp(4.25rem, 10.4vw, 9.75rem);
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
  width: clamp(18rem, 28vw, 25rem);
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

.title-page__logo-annotation > .logo-annotation {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.framework-titles {
  position: absolute;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  color: var(--site-hero-foreground);
  pointer-events: none;
}

.framework-title {
  display: flex;
  align-items: baseline;
  min-width: 0;
  font-family: "SF Pro Display", var(--font-heading);
  font-size: clamp(3rem, min(10svh, 7vw), 7rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
  white-space: nowrap;
  clip-path: inset(0 100% 0 0);
  animation: framework-title-reveal 1800ms cubic-bezier(0.33, 1, 0.68, 1) both;
}

.framework-title__text {
  display: inline-block;
  line-height: 1;
}

.framework-title__cursor {
  display: inline-block;
  flex: 0 0 0.9em;
  width: 0.9em;
  height: 0;
  margin-inline-start: 0.13em;
  border-bottom: 0.06em solid currentColor;
  transform: translateY(0.12em);
  animation: framework-cursor-blink 900ms steps(1, end) infinite;
}

@keyframes framework-title-reveal {
  to {
    clip-path: inset(0 0 0 0);
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
    font-size: clamp(4rem, 17vw, 7.25rem);
  }

  .title-page__mark-space {
    width: clamp(12rem, 42vw, 16rem);
    justify-self: center;
  }

  .framework-title {
    font-size: clamp(1.5rem, 3.6vw, 3.4rem);
    letter-spacing: -0.025em;
  }
}

@media (max-width: 360px) {
  .title-page__name {
    font-size: clamp(3.55rem, 16vw, 4rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .title-page__control,
  .title-page__logo-normal,
  .title-page__logo-annotation {
    transition: none;
  }

  .framework-title {
    clip-path: none;
    animation: none;
  }

  .framework-title__cursor {
    animation: none;
  }
}
</style>

</style>
