<script setup lang="ts">
import Corners from "./Corners.vue";

withDefaults(defineProps<{ dashed?: boolean; corners?: boolean }>(), {
  dashed: false,
  corners: false,
});
</script>

<template>
  <div :class="['relative', dashed ? 'frame-dashed' : 'frame']">
    <Corners v-if="corners" />
    <slot />
  </div>
</template>
