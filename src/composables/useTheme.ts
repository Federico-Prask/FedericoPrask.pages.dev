import { onBeforeUnmount, onMounted, ref, watch } from "vue";

export type ThemePref = "system" | "light" | "dark";

const KEY = "co-theme";

function readInitial(): ThemePref {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "system"; // default follows the OS
}

/**
 * Theme state — defaults to the system preference.
 * Toggling `.dark` on <html>; persisted to localStorage under `co-theme`.
 */
export function useTheme() {
  const pref = ref<ThemePref>(readInitial());
  const resolved = ref<"light" | "dark">(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  let mq: MediaQueryList | null = null;

  const apply = () => {
    const dark =
      pref.value === "dark" || (pref.value === "system" && (mq?.matches ?? false));
    document.documentElement.classList.toggle("dark", dark);
    resolved.value = dark ? "dark" : "light";
  };

  const syncListener = () => {
    if (!mq) return;
    if (pref.value === "system") mq.addEventListener("change", apply);
    else mq.removeEventListener("change", apply);
  };

  onMounted(() => {
    mq = window.matchMedia("(prefers-color-scheme: dark)");
    apply();
    syncListener();
  });

  onBeforeUnmount(() => mq?.removeEventListener("change", apply));

  watch(pref, () => {
    try {
      localStorage.setItem(KEY, pref.value);
    } catch {
      /* ignore */
    }
    apply();
    syncListener();
  });

  const cycle = () => {
    pref.value =
      pref.value === "system" ? "light" : pref.value === "light" ? "dark" : "system";
  };

  return { pref, resolved, cycle };
}
