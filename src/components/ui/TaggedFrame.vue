<script setup lang="ts">
withDefaults(defineProps<{ tag: string; dashed?: boolean }>(), { dashed: false });
</script>

<template>
  <div v-bind="$attrs" :class="['relative', dashed ? 'frame-dashed' : 'frame']">
    <span
      class="absolute -top-[11px] left-4 z-10 bg-paper px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 dark:bg-paper-d dark:text-ink-d3"
    >
      {{ tag }}
    </span>
    <slot />
  </div>
</template>
