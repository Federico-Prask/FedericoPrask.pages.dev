<script setup lang="ts">
import { useI18n } from "../composables/useI18n";
import Reveal from "./ui/Reveal.vue";
import SectionHeader from "./ui/SectionHeader.vue";

const { locale, t } = useI18n();
</script>

<template>
  <section id="journey" class="scroll-mt-20 border-t border-line dark:border-line-d">
    <div class="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeader
        :index="'04'"
        :title="locale === 'zh' ? '项目经验' : 'Experiences'"
        :note="locale === 'zh' ? '历程' : 'history'"
      />

      <div class="relative">
        <div
          aria-hidden="true"
          class="absolute bottom-4 left-[7px] top-2 border-l border-dashed border-line dark:border-line-d md:left-[calc(25%-0.5px)]"
        ></div>

        <Reveal v-for="(job, i) in t.experience" :key="job.company" :delay="i * 70">
          <div class="relative grid gap-2 pb-[12px] pl-9 md:grid-cols-12 md:gap-0 md:pl-0">
            <span
              aria-hidden="true"
              class="absolute left-[1px] top-[7px] h-3 w-3 rotate-45 border border-accent bg-paper dark:bg-paper-d md:left-[calc(25%-7px)]"
            ></span>

            <div class="md:col-span-3 md:pr-10 md:text-right">
              <span class="font-mono text-sm text-accent-ink dark:text-accent-ink-d">{{
                job.period
              }}</span>
            </div>

            <div class="md:col-span-9 md:pl-10">
              <h3 class="text-lg font-semibold text-ink dark:text-ink-d">{{ job.role }}</h3>
              <p class="mt-0.5 font-mono text-xs text-ink-3 dark:text-ink-d3">
                {{ job.company }} · {{ job.type }}
              </p>
              <ul class="mt-0.5 space-y-[-4px] text-sm leading-relaxed text-ink-2 dark:text-ink-d2">
                <li v-for="pt in job.points" :key="pt" class="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    class="mt-[7px] h-1 w-1 shrink-0 bg-accent dark:bg-accent-d"
                  ></span>
                  {{ pt }}
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
