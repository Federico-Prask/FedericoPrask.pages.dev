<script setup lang="ts">
import { useI18n } from "../composables/useI18n";
import Icon from "./ui/Icon.vue";

const { locale } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-line dark:border-line-d">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 font-mono text-[11px] text-ink-3 dark:text-ink-d3 md:flex-row md:items-center md:justify-between md:px-8"
    >
      <p>
        © {{ year }}
        <span class="mx-1.5 inline-block text-ink dark:text-ink-d">Federico Prask</span>
        <span class="mr-1.5 text-ink-3 dark:text-ink-d3">/</span>
        <span class="text-accent-ink dark:text-accent-ink-d"
          >Coder {{ '{' }} Objective {{ '}' }}</span
        >
      </p>
      <p class="uppercase tracking-[0.2em]">
        {{ locale === 'zh' ? '用热爱奔赴一切美好' : 'pursue all goodness with passion' }}
      </p>
      <a
        href="#top"
        class="inline-flex items-center gap-1.5 text-ink-2 transition-colors hover:text-accent-ink dark:text-ink-d2 dark:hover:text-accent-ink-d"
      >
        {{ locale === 'zh' ? '返回顶部' : 'back to top' }}
        <Icon name="arrow-up" :size="13" />
      </a>
    </div>

    <div
      aria-hidden="true"
      class="select-none overflow-hidden px-4 pb-1 text-center font-display text-[11.5vw] font-bold leading-[0.82] tracking-tight text-ink opacity-[0.045] dark:text-ink-d md:text-[9vw]"
    >
      Coder <br class="md:hidden" />{{ '{' }} Objective {{ '}' }}
    </div>
  </footer>
</template>
