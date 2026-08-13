<script setup lang="ts">
defineProps<{
	width: number
	height: number
	dark?: boolean
}>()
</script>

<template>
	<div class="card" :class="{ 'card-dark': dark }" :style="{ width: `${width}px`, height: `${height}px` }">
		<div class="card-content">
			<p> I am content. </p>
      	<p>宽: {{ width }}px, 高: {{ height }}px</p>
		</div>
	</div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, color 0.3s;
}

.card-content {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}
.card.card-dark {
  background: #2c3e50;
}
.card.card-dark .card-content {
  color: #ccc;
}
</style>