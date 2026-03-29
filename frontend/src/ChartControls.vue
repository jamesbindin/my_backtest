<template>
  <div class="buttons flex gap-2">
      <button class="btn" @click="stepBack">Step Back</button>
      <button class="btn" @click="stepForward">Step Forward</button>
  </div>
</template>
<script lang="ts" setup>
import * as d3 from 'd3'
import { onMounted, watch, ref } from 'vue'
import { useChartStore } from './stores/chart'

const chartStore = useChartStore()


const props = defineProps({
    svg: {
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
  if(chartStore.chartIndexRange.from <= 0) return
    chartStore.updateChartIndexRange({
        from: chartStore.chartIndexRange.from - 1,
        to: chartStore.chartIndexRange.to - 1
    })
    let chartData = chartStore.data.slice(chartStore.chartIndexRange.from, chartStore.chartIndexRange.to)
    chartStore.updateChartData(chartData)
}

function stepForward() {
  if(chartStore.chartIndexRange.to >= chartStore.data.length) return
    chartStore.updateChartIndexRange({
        from: chartStore.chartIndexRange.from + 1,
        to: chartStore.chartIndexRange.to + 1
    })
  let chartData = chartStore.data.slice(chartStore.chartIndexRange.from, chartStore.chartIndexRange.to)
  chartStore.updateChartData(chartData)
}

let pointerDown = ref(false)
let pointerDragStartX = ref<number | null>(null)
let pointerDragDistanceX = ref<number | null>(null)
let pointerDragtStartDomain: [Date, Date] | null = null

onMounted(() => {
    props.svg?.addEventListener('pointerdown', (event: PointerEvent) => {
        event.preventDefault()
        pointerDown.value = true
        pointerDragStartX.value = event.clientX
        pointerDragtStartDomain = chartStore.x.domain()
    })
    props.svg?.addEventListener('pointermove', (event: PointerEvent) => {
        event.preventDefault()
        if(pointerDown.value) {
            pointerDragDistanceX.value = event.clientX - (pointerDragStartX.value ?? event.clientX)
        }
    })
    props.svg?.addEventListener('pointerup', (event: PointerEvent) => {
        event.preventDefault()
        pointerDown.value = false
    })
    props.svg?.addEventListener('pointercancel', (event: PointerEvent) => {
        event.preventDefault()
        pointerDown.value = false
    })
})

watch(pointerDragDistanceX, (newDistance) => {
    if(newDistance === null || pointerDragtStartDomain === null || pointerDragStartX.value === null) return
    const delta = chartStore.x.invert(pointerDragStartX.value) - chartStore.x.invert(pointerDragStartX.value - newDistance)
    const newStartTime = pointerDragtStartDomain[0].getTime() - delta
    const newEndTime = pointerDragtStartDomain[1].getTime() - delta

    chartStore.updateX(chartStore.x.copy().domain([new Date(newStartTime), new Date(newEndTime)])) 
})

</script>
<style scoped>
</style>