<script setup lang="ts">
defineProps<{ index: number; year: string; future?: boolean }>();
</script>

<template>
  <div
    class="relative m-3 mb-0 aspect-[16/9] overflow-hidden border border-dashed border-line dark:border-line-d"
  >
    <!-- 未来项目：特殊占位（斜纹底 + 脉冲 ? + COMING SOON） -->
    <div
      v-if="future"
      class="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-paper-2/70 dark:bg-paper-d2/70"
      :style="{
        backgroundImage:
          'repeating-linear-gradient(45deg, var(--color-line) 0 1px, transparent 1px 14px)',
      }"
    >
      <span class="pulse-dot font-display text-5xl text-accent dark:text-accent-d">?</span>
      <span
        class="font-mono text-[11px] uppercase tracking-[0.35em] text-ink-2 dark:text-ink-d2"
        >COMING SOON</span
      >
      <span class="font-mono text-[10px] text-ink-3 dark:text-ink-d3">敬请期待</span>
    </div>

    <!-- 普通项目：图片，等比例缩放、完整显示、居中 -->
    <img
      v-else
      :src="`/images/${index + 1}.png`"
      :alt="`FIG. ${String(index + 1).padStart(3, '0')}`"
      class="absolute inset-0 h-full w-full bg-paper-3 object-contain p-2 dark:bg-paper-d3"
      loading="lazy"
    />

    <span
      class="absolute left-3 top-3 font-mono text-[10px] tracking-[0.25em] text-ink-3 dark:text-ink-d3"
    >
      FIG. {{ String(index + 1).padStart(3, '0') }}
    </span>
    <span class="absolute right-3 top-3 font-mono text-[10px] text-accent-ink dark:text-accent-ink-d">
      {{ year }}
    </span>

    <div
      class="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-dashed border-line bg-paper-3/80 px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-ink-3 backdrop-blur-sm dark:border-line-d dark:bg-paper-d3/80 dark:text-ink-d3"
    >
      <span v-if="future">LOAD ∞</span>
      <span v-else>LOAD 0.2S</span>
      <span :class="future ? 'text-ink-2 dark:text-ink-d2' : 'text-accent-ink dark:text-accent-ink-d'">
        <template v-if="future">PENDING…</template>
        <template v-else>PASS ✓</template>
      </span>
    </div>
  </div>
</template>
