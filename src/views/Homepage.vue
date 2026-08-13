<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '../components/Card.vue'

const windowWidth = ref(0)

const updateWidth = () => {
	windowWidth.value = window.innerWidth
}

onMounted(() => {
	updateWidth()
	window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateWidth)
})

</script>
