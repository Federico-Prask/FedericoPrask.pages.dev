<script setup lang="ts">
import { useI18n } from "../composables/useI18n";
import Figure from "./Figure.vue";
import Icon from "./ui/Icon.vue";
import Pill from "./ui/Pill.vue";
import Reveal from "./ui/Reveal.vue";
import SectionHeader from "./ui/SectionHeader.vue";

const { locale, t } = useI18n();
</script>

<template>
  <section id="work" class="scroll-mt-20 border-t border-line dark:border-line-d">
    <div class="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeader
        :index="'03'"
        :title="locale === 'zh' ? '精选作品' : 'Selected Work'"
        note="Work Collections"
      />

      <div class="grid gap-5 md:grid-cols-2">
        <Reveal v-for="(p, i) in t.projects" :key="p.title" :delay="(i % 2) * 80" class="h-full">
          <article
            class="group frame relative flex h-full flex-col bg-paper-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[6px_6px_0_0_rgba(24,24,27,0.1)] dark:bg-paper-d3 dark:hover:border-accent-d dark:hover:shadow-[6px_6px_0_0_rgba(231,231,228,0.08)]"
          >
            <Figure :index="i" :year="p.year" :future="p.future" />

            <div class="flex flex-1 flex-col p-5">
              <div class="flex items-center justify-between gap-3">
                <h3
                  class="text-lg font-semibold text-ink transition-colors group-hover:text-accent-ink dark:text-ink-d dark:group-hover:text-accent-ink-d"
                >
                  {{ p.title }}
                </h3>
                <span v-if="!p.future" class="flex shrink-0 gap-1.5">
                  <a
                    :href="p.demo"
                    :aria-label="p.title + ' — ' + (locale === 'zh' ? '在线演示' : 'live demo')"
                    class="text-ink-3 transition-colors hover:text-accent-ink dark:text-ink-d3 dark:hover:text-accent-ink-d"
                  >
                    <Icon name="arrow-up-right" :size="16" />
                  </a>
                  <a
                    :href="p.source"
                    target="_blank"
                    rel="noreferrer"
                    :aria-label="p.title + ' — ' + (locale === 'zh' ? '源代码' : 'source code')"
                    class="text-ink-3 transition-colors hover:text-accent-ink dark:text-ink-d3 dark:hover:text-accent-ink-d"
                  >
                    <Icon name="github" :size="16" />
                  </a>
                </span>
                <span
                  v-else
                  class="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3 dark:text-ink-d3"
                  >…</span
                >
              </div>

              <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-2 dark:text-ink-d2">
                {{ p.desc }}
              </p>

              <div class="mt-4 flex flex-wrap gap-2">
                <Pill v-for="tag in p.tags" :key="tag">{{ tag }}</Pill>
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal :delay="120" class="mt-8 text-right">
        <a
          :href="t.meta.github"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 border border-dashed border-line px-4 py-2.5 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent-ink dark:border-line-d dark:text-ink-d2 dark:hover:border-accent-d dark:hover:text-accent-ink-d"
        >
          {{ locale === 'zh' ? '查看全部作品' : 'VIEW FULL ARCHIVE' }}
          <Icon name="arrow-up-right" :size="14" />
        </a>
      </Reveal>
    </div>
  </section>
</template>
