<script setup lang="ts">
import TitlePage from "./components/TitlePage.vue";
import { useI18n } from "./composables/useI18n";

const { locale } = useI18n();
</script>

<template>
  <a class="skip-link" href="#main-content">
    {{ locale === 'zh' ? '跳至正文' : 'Skip to content' }}
  </a>

  <main id="main-content">
    <TitlePage />
  </main>
</template>

<style>
:root {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  min-height: 100svh;
  margin: 0;
}

#root,
#main-content {
  min-height: 100svh;
}

.skip-link {
  position: fixed;
  z-index: 10;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
  padding: 0.65rem 0.85rem;
  transform: translateY(-180%);
  background: var(--site-page-background);
  color: var(--site-text-primary);
  font: 0.75rem var(--font-technical);
}

.skip-link:focus {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
