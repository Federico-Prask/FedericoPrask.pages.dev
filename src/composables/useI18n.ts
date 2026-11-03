import { ref } from "vue";

export type Locale = "zh" | "en";

const KEY = "co-locale";

function readInitial(): Locale {
  try {
    const value = localStorage.getItem(KEY);
    if (value === "zh" || value === "en") return value;
  } catch {
    /* Storage may be unavailable in restricted browsing contexts. */
  }
  return "zh";
}

const locale = ref<Locale>(readInitial());

function applyLocale() {
  try {
    localStorage.setItem(KEY, locale.value);
  } catch {
    /* The language still works for the current session without persistence. */
  }

  document.documentElement.lang = locale.value === "zh" ? "zh-CN" : "en";
}

applyLocale();

export function useI18n() {
  function setLocale(nextLocale: Locale) {
    locale.value = nextLocale;
    applyLocale();
  }

  return { locale, setLocale };
}
