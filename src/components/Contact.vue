<script setup lang="ts">
import { faBilibili, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useI18n } from "../composables/useI18n";
import Corners from "./ui/Corners.vue";
import Icon from "./ui/Icon.vue";
import Reveal from "./ui/Reveal.vue";

const { locale, t } = useI18n();

const socials = [
  { label: "GitHub", href: t.value.meta.github, icon: faGithub },
  { label: "Bilibili", href: t.value.meta.bilibili, icon: faBilibili },
];
</script>

<template>
  <section id="contact" class="scroll-mt-20 border-t border-line dark:border-line-d">
    <div class="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <div class="frame-dashed relative px-6 py-14 text-center md:px-16 md:py-20">
          <Corners />

          <p
            class="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-ink dark:text-accent-ink-d"
          >
            {{ locale === 'zh' ? '// 联系我' : '// contact me' }}
          </p>
          <h2
            class="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-snug tracking-tight text-ink dark:text-ink-d md:text-4xl"
          >
            {{ locale === 'zh' ? '很高兴与你相会' : 'Nice to meet you' }}
          </h2>
          <p
            class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-2 dark:text-ink-d2"
          >
            {{
              locale === 'zh'
                ? '我可以收取邮件，你也可以在 GitHub、Bilibili 上找到我。'
                : "I can receive emails, and you can also find me on GitHub and Bilibili."
            }}
          </p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              :href="'mailto:' + t.meta.email"
              class="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 font-mono text-sm text-paper transition-colors hover:bg-accent hover:text-ink dark:bg-accent-d dark:text-ink dark:hover:bg-accent-d2"
            >
              {{ t.meta.email }}
              <Icon
                name="arrow-up-right"
                :size="15"
                class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span
              class="mr-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3 dark:text-ink-d3"
              >{{ locale === 'zh' ? '其他平台' : 'elsewhere' }}</span
            >
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 border border-line px-3.5 py-2 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent-ink dark:border-line-d dark:text-ink-d2 dark:hover:border-accent-d dark:hover:text-accent-ink-d"
            >
              <FontAwesomeIcon :icon="s.icon" :size="14" />
              {{ s.label }}
              <Icon name="arrow-up-right" :size="12" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>
