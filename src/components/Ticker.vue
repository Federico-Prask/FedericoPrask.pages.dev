<script setup lang="ts">
import { useI18n } from "../composables/useI18n";

const { locale, t } = useI18n();
</script>

<template>
  <section
    aria-hidden="true"
    class="relative overflow-hidden border-y border-dashed border-line bg-paper-2/60 py-3 dark:border-line-d dark:bg-paper-d2/60"
  >
    <div
      class="marquee-track flex w-max [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div v-for="r in 4" :key="r" class="flex shrink-0 items-center">
        <span
          v-for="tick in t.ticker"
          :key="tick"
          class="flex items-center font-mono text-[11px] uppercase tracking-[0.28em] text-ink-2 dark:text-ink-d2"
        >
          <span class="px-5">{{ tick }}</span>
          <span class="text-accent dark:text-accent-d">+</span>
        </span>
      </div>
    </div>
    <span
      class="absolute left-4 top-1/2 -translate-y-1/2 border border-line bg-paper px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.22em] text-accent-ink dark:border-line-d dark:bg-paper-d dark:text-accent-ink-d"
      >{{ '// Coder {Objective}' }}</span
    >
  </section>
</template>
