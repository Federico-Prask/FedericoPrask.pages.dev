<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../composables/useI18n";
import { useTheme } from "../composables/useTheme";
import Icon from "./ui/Icon.vue";

const { locale, t, setLocale } = useI18n();
const { pref, resolved, cycle } = useTheme();
const open = ref(false);
const active = ref("");
let io: IntersectionObserver | null = null;

// scrollspy — 区域达到视口一半以上时高亮对应导航；
// Hero（#top）占据过半时清除高亮（回到顶部不应有任何导航亮起）
onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          active.value = e.target.id === "top" ? "" : e.target.id;
        }
      }
    },
    { threshold: 0.5 }
  );
  const ids = ["top", ...t.value.nav.map((n) => n.id)];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io?.observe(el);
  });
});

onBeforeUnmount(() => io?.disconnect());

const themeLabel = computed(() => {
  const labels: Record<string, string> = {
    system: t.value.locale === "zh" ? "自动" : "auto",
    light: t.value.locale === "zh" ? "浅色" : "light",
    dark: t.value.locale === "zh" ? "深色" : "dark",
  };
  return labels[pref.value] ?? pref.value;
});
</script>

<template>
  <header class="sticky top-0 z-50">
    <div class="h-[3px] bg-accent dark:bg-accent-d"></div>
    <div
      class="border-b border-dashed border-line bg-paper/85 backdrop-blur-md dark:border-line-d dark:bg-paper-d/85"
    >
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <a
          href="#top"
          class="flex flex-wrap items-baseline gap-x-1.5 font-sans text-sm font-semibold tracking-tight text-ink dark:text-ink-d"
        >
          <template v-if="locale === 'zh'">
            <span class="whitespace-nowrap text-accent-ink dark:text-accent-ink-d">Federico Prask</span>
            <span class="whitespace-nowrap">的个人网站</span>
          </template>
          <template v-else>
            <span class="whitespace-nowrap text-accent-ink dark:text-accent-ink-d">Federico Prask's</span>
            <span class="whitespace-nowrap">Personal Website</span>
          </template>
        </a>

        <nav class="hidden items-center gap-8 md:flex">
          <a
            v-for="(item, i) in t.nav"
            :key="item.id"
            :href="'#' + item.id"
            :class="
              active === item.id
                ? 'text-accent-ink dark:text-accent-ink-d'
                : 'text-ink-2 hover:text-ink dark:text-ink-d2 dark:hover:text-ink-d'
            "
            class="font-mono text-xs tracking-wide transition-colors"
          >
            <span class="mr-1 whitespace-nowrap text-ink-3 dark:text-ink-d3">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="whitespace-nowrap">{{ item.label }}</span>
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <!-- 语言选择栏 -->
          <div class="flex h-9 items-stretch border border-line dark:border-line-d">
            <button
              type="button"
              @click="setLocale('zh')"
              :aria-pressed="locale === 'zh'"
              :title="locale === 'zh' ? '中文' : 'Switch to 中文'"
              class="flex items-center px-2.5 font-mono text-xs transition-colors"
              :class="
                locale === 'zh'
                  ? 'bg-ink text-paper dark:bg-accent-d dark:text-ink'
                  : 'text-ink-2 hover:text-ink dark:text-ink-d2 dark:hover:text-ink-d'
              "
            >
              中
            </button>
            <span aria-hidden="true" class="my-2 w-px bg-line dark:bg-line-d"></span>
            <button
              type="button"
              @click="setLocale('en')"
              :aria-pressed="locale === 'en'"
              :title="locale === 'en' ? 'English' : 'Switch to English'"
              class="flex items-center px-2.5 font-mono text-xs transition-colors"
              :class="
                locale === 'en'
                  ? 'bg-ink text-paper dark:bg-accent-d dark:text-ink'
                  : 'text-ink-2 hover:text-ink dark:text-ink-d2 dark:hover:text-ink-d'
              "
            >
              EN
            </button>
          </div>

          <button
            type="button"
            @click="cycle"
            :title="'Theme: ' + themeLabel"
            :aria-label="'Theme: ' + themeLabel"
            class="flex h-9 items-center gap-2 border border-line px-3 font-mono text-[11px] uppercase tracking-widest text-ink-2 transition-colors hover:border-accent hover:text-accent-ink dark:border-line-d dark:text-ink-d2 dark:hover:border-accent-d dark:hover:text-accent-ink-d"
          >
            <Icon v-if="pref === 'system'" name="monitor" :size="14" />
            <Icon v-else-if="resolved === 'dark'" name="moon" :size="14" />
            <Icon v-else name="sun" :size="14" />
            <span class="hidden sm:inline">{{ themeLabel }}</span>
          </button>
          <button
            type="button"
            @click="open = !open"
            :aria-expanded="open"
            :aria-label="locale === 'zh' ? '切换菜单' : 'Toggle menu'"
            class="flex h-9 w-9 items-center justify-center border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent-ink dark:border-line-d dark:text-ink-d2 dark:hover:border-accent-d dark:hover:text-accent-ink-d md:hidden"
          >
            <Icon :name="open ? 'close' : 'menu'" :size="16" />
          </button>
        </div>
      </div>

      <nav v-if="open" class="border-t border-dashed border-line dark:border-line-d md:hidden">
        <div class="mx-auto max-w-6xl px-4">
          <a
            v-for="(item, i) in t.nav"
            :key="item.id"
            :href="'#' + item.id"
            @click="open = false"
            class="flex items-center gap-3 border-b border-dashed border-line/60 py-3.5 font-mono text-sm text-ink last:border-0 dark:border-line-d/60 dark:text-ink-d"
          >
            <span class="whitespace-nowrap text-accent-ink dark:text-accent-ink-d">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="whitespace-nowrap">{{ item.label }}</span>
            <span class="ml-auto text-ink-3 dark:text-ink-d3">→</span>
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>
