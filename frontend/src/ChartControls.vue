<template>
  <div class="buttons flex gap-4">
    <CursorControls></CursorControls>
    <DrawingControls></DrawingControls>
    <DaisyUiThemeSelector></DaisyUiThemeSelector>
  </div>
</template>
<script lang="ts" setup>
import { useChartStore } from './stores/chart'
import DaisyUiThemeSelector from './DaisyUiThemeSelector.vue'
import DrawingControls from './DrawingControls.vue'
import CursorControls from './CursorControls.vue'

const chartStore = useChartStore()

const props = defineProps({
    width: {
        type: Number,
        default: 640
    },
    height: {
        type: Number,
        default: 400
    },
})


</script>
<style scoped>
</style>