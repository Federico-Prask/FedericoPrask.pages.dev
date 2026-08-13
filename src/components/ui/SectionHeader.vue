<script setup lang="ts">
import Reveal from "./Reveal.vue";

withDefaults(defineProps<{ index: string; title: string; note?: string }>(), { note: "" });
</script>

<template>
  <Reveal class="mb-10 md:mb-14">
    <div class="flex items-center gap-4">
      <span class="font-mono text-sm text-accent-ink dark:text-accent-ink-d">{{ index }}</span>
      <h2 class="text-2xl font-bold uppercase tracking-tight text-ink dark:text-ink-d md:text-4xl">
        {{ title }}
      </h2>
      <span
        aria-hidden="true"
        class="hidden h-px flex-1 border-t border-dashed border-line dark:border-line-d sm:block"
      ></span>
      <span
        v-if="note"
        aria-hidden="true"
        class="hidden font-mono text-xs text-ink-3 dark:text-ink-d3 md:block"
        >{{ note }}</span
      >
    </div>
  </Reveal>
</template>
