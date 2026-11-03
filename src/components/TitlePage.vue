<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "../composables/useI18n";
import { useTheme } from "../composables/useTheme";
import LogoMark from "./LogoMark.vue";
import LogoAnnotation from "./LogoAnnotation.vue";

const { locale, setLocale } = useI18n();
const { pref, resolved, cycle } = useTheme();

type LogoStage = "reveal" | "crossfade" | "waiting";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const logoStage = ref<LogoStage>(prefersReducedMotion ? "waiting" : "reveal");

function handleLogoRevealEnd() {
  if (logoStage.value === "reveal") {
    logoStage.value = "crossfade";
  }
}

function handleAnnotationFadeEnd(event: TransitionEvent) {
  if (event.propertyName === "opacity" && logoStage.value === "crossfade") {
    logoStage.value = "waiting";
  }
}
</script>

<template>
  <section id="title-page" class="title-page" aria-labelledby="page-title">
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

      <div class="title-page__mark-space">
        <div
          class="title-page__logo-sequence"
          :class="`is-${logoStage}`"
          role="img"
          :aria-label="locale === 'zh' ? 'FP 标志' : 'FP monogram'"
        >
          <div
            v-if="logoStage !== 'waiting'"
            class="title-page__logo-normal"
            aria-hidden="true"
          >
            <LogoMark @reveal-end="handleLogoRevealEnd" />
          </div>
          <div
            class="title-page__logo-annotation"
            :aria-hidden="logoStage === 'reveal'"
            @transitionend.self="handleAnnotationFadeEnd"
          >
            <LogoAnnotation />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title-page {
  position: relative;
  display: grid;
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

.title-page__logo-normal,
.title-page__logo-annotation {
  position: absolute;
  inset: 0;
  transition: opacity 700ms cubic-bezier(0.22, 0.7, 0.24, 1);
}

.title-page__logo-normal {
  opacity: 1;
}

.title-page__logo-annotation {
  opacity: 0;
  pointer-events: none;
}

.title-page__logo-sequence.is-crossfade .title-page__logo-normal {
  opacity: 0;
}

.title-page__logo-sequence.is-crossfade .title-page__logo-annotation,
.title-page__logo-sequence.is-waiting .title-page__logo-annotation {
  opacity: 1;
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
}
</style>
