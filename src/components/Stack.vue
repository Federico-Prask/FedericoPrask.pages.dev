<script setup lang="ts">
import { useI18n } from "../composables/useI18n";
import Frame from "./ui/Frame.vue";
import Pill from "./ui/Pill.vue";
import Reveal from "./ui/Reveal.vue";
import SectionHeader from "./ui/SectionHeader.vue";

const { locale, t } = useI18n();
</script>

<template>
  <section
    id="stack"
    class="scroll-mt-20 border-t border-line bg-paper-2/40 dark:border-line-d dark:bg-paper-d2/40"
  >
    <div class="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeader
        :index="'02'"
        :title="locale === 'zh' ? '荣誉' : 'Honors'"
        note="ls ~/honors"
      />

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(cell, i) in t.stack" :key="cell.id" :delay="i * 60" class="h-full">
          <Frame
            dashed
            class="group h-full p-5 transition-colors hover:border-accent dark:hover:border-accent-d"
          >
            <div
              class="mb-4 flex items-center justify-between gap-3 border-b border-dashed border-line pb-3 dark:border-line-d"
            >
              <span class="font-mono text-xs text-accent-ink dark:text-accent-ink-d">{{
                cell.id
              }}</span>
              <div class="flex flex-wrap justify-end gap-1.5">
                <Pill v-for="tag in cell.tags" :key="tag">{{ tag }}</Pill>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-ink dark:text-ink-d">
                {{ cell.title }}
              </h3>
            </div>
          </Frame>
        </Reveal>
      </div>
    </div>
  </section>
</template>
