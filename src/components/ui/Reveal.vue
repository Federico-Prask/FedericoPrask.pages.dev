<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 });

const el = ref<HTMLElement | null>(null);
const visible = ref(false);
let io: IntersectionObserver | null = null;

onMounted(() => {
  if (!el.value) return;
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true;
          io?.disconnect();
          break;
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  io.observe(el.value);
});

onBeforeUnmount(() => io?.disconnect());
</script>

<template>
  <div
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :style="delay ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </div>
</template>
