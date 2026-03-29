<template>
  <div class="buttons flex gap-2">
      <button class="btn" @click="stepBack">Step Back</button>
      <button class="btn" @click="stepForward">Step Forward</button>
  </div>
  {{ pointer }}
</template>
<script lang="ts" setup>

import { watch } from 'vue'
import { useChartStore } from './stores/chart'
import { useControlsStore } from './stores/controls'


const chartStore = useChartStore()
const controlsStore = useControlsStore()


const props = defineProps({
    pointer: {
        type: Object,
        required: true
    },
    width: {
        type: Number,
        default: 640
    },
    height: {
        type: Number,
        default: 400
    },
    marginX: {
        type: Number,
        default: 40
    },
    marginY: {
        type: Number,
        default: 40
    }
})

function stepBack() {
  console.log('Step Back')
  if(chartStore.chartIndexRange.from <= 0) return
    chartStore.updateChartIndexRange({
        from: chartStore.chartIndexRange.from - 1,
        to: chartStore.chartIndexRange.to - 1
    })
    let chartData = chartStore.data.slice(chartStore.chartIndexRange.from, chartStore.chartIndexRange.to)
    chartStore.updateChartData(chartData)
}

function stepForward() {
  console.log('Step Forward')
  if(chartStore.chartIndexRange.to >= chartStore.data.length) return
    chartStore.updateChartIndexRange({
        from: chartStore.chartIndexRange.from + 1,
        to: chartStore.chartIndexRange.to + 1
    })
  let chartData = chartStore.data.slice(chartStore.chartIndexRange.from, chartStore.chartIndexRange.to)
  chartStore.updateChartData(chartData)
}

let pointerDragStartX: number | null = null

watch(() => props.pointer.pressure.value, (newPressure) => {
    console.log(props.pointer.x.value)
    if(newPressure > 0) {
        pointerDragStartX = props.pointer.x.value
        console.log('Pointer is pressing down at x:', props.pointer.x.value)
    } else {
        let pointerDragDistanceX = props.pointer.x.value - (pointerDragStartX ?? props.pointer.x.value)
        console.log('Pointer released at x:', props.pointer.x.value, 'Drag distance:', pointerDragDistanceX)
        controlsStore.updatePointerDragDistanceX(pointerDragDistanceX)
    }
})
</script>
<style scoped>
</style>