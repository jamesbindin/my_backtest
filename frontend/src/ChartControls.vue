<template>
  <div class="buttons flex gap-4">
    <DrawingControls></DrawingControls>
      <DaisyUiThemeSelector></DaisyUiThemeSelector>
  </div>
</template>
<script lang="ts" setup>
import * as d3 from 'd3'
import { onMounted, watch, ref } from 'vue'
import { useChartStore } from './stores/chart'
import DaisyUiThemeSelector from './DaisyUiThemeSelector.vue'
import DrawingControls from './DrawingControls.vue'
import { useControlsStore } from './stores/controls'

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