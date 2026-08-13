import { computed, ref } from "vue";
import { zh, type Content } from "../data";
import { en } from "../data-en";

export type Locale = "zh" | "en";

const KEY = "co-locale";

function readInitial(): Locale {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "zh" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return "zh"; // 默认中文
}

// 模块级单例，所有组件共享同一语言状态
const locale = ref<Locale>(readInitial());

function apply() {
  try {
    localStorage.setItem(KEY, locale.value);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale.value === "zh" ? "zh-CN" : "en";
}

apply();

export function useI18n() {
  const t = computed<Content>(() => (locale.value === "zh" ? zh : en));

  const setLocale = (l: Locale) => {
    locale.value = l;
    apply();
  };

  const toggleLocale = () => {
    locale.value = locale.value === "zh" ? "en" : "zh";
    apply();
  };

  return { locale, t, setLocale, toggleLocale };
}
