<script setup lang="ts">
import { useI18n } from "./composables/useI18n";
import TopBar from "./components/TopBar.vue";
import Hero from "./components/Hero.vue";
import Ticker from "./components/Ticker.vue";
import About from "./components/About.vue";
import Stack from "./components/Stack.vue";
import Projects from "./components/Projects.vue";
import Experience from "./components/Experience.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";

const { locale } = useI18n();
</script>

<template>
  <div
    class="min-h-screen overflow-x-clip bg-paper font-sans text-ink antialiased dark:bg-paper-d dark:text-ink-d"
  >
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-line focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
    >
      {{ locale === 'zh' ? '跳到主要内容' : 'Skip to content' }}
    </a>

    <TopBar />

    <main id="main">
      <Hero />
      <Ticker />
      <About />
      <Stack />
      <Projects />
      <Experience />
      <Contact />
    </main>

    <Footer />
  </div>
</template>
