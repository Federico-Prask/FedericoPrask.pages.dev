<script setup lang="ts">
withDefaults(defineProps<{ markClass?: string }>(), { markClass: "" });
</script>

<template>
  <span
    aria-hidden="true"
    :class="[
      'pointer-events-none absolute z-20 select-none font-mono text-sm leading-none',
      markClass || 'text-line-strong dark:text-line-d-strong',
      'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
    ]"
    >+</span
  >
  <span
    aria-hidden="true"
    :class="[
      'pointer-events-none absolute z-20 select-none font-mono text-sm leading-none',
      markClass || 'text-line-strong dark:text-line-d-strong',
      'right-0 top-0 translate-x-1/2 -translate-y-1/2',
    ]"
    >+</span
  >
  <span
    aria-hidden="true"
    :class="[
      'pointer-events-none absolute z-20 select-none font-mono text-sm leading-none',
      markClass || 'text-line-strong dark:text-line-d-strong',
      'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    ]"
    >+</span
  >
  <span
    aria-hidden="true"
    :class="[
      'pointer-events-none absolute z-20 select-none font-mono text-sm leading-none',
      markClass || 'text-line-strong dark:text-line-d-strong',
      'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    ]"
    >+</span
  >
</template>
