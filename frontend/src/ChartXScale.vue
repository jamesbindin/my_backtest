<template>
    <g ref="gx" :transform="`translate(0, ${height - props.marginY})`" stroke-width="0.5"></g>
</template>

<script lang="ts" setup>
import * as d3 from 'd3'
import { inject, useTemplateRef, watch, onMounted } from 'vue';
import { useChartStore } from '@/stores/chart'
import { useControlsStore } from '@/stores/controls'

const chartStore = useChartStore()
const controlsStore = useControlsStore()

const props = defineProps({
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

const gx = useTemplateRef('gx')

const timeFrameSteps = inject('timeFrameSteps') as Record<string, number>
const timeframe = inject('timeframe') as string

watch(() => chartStore.chartData, (newData) => {
  setScales(newData)
})

function setScales(this: any, newData?: any) {
    if(!gx.value) return
    const dataToUse = newData ?? chartStore.chartData
    const x = d3.scaleUtc([new Date(dataToUse[0].time).getTime() - (timeFrameSteps[timeframe] ?? 0), new Date(dataToUse[dataToUse.length - 1].time)], [props.marginX, props.width])
    d3.select(gx.value).call(d3.axisBottom(x));
    chartStore.updateX(x)
}

onMounted(() => {
    setScales()
})

watch(() => controlsStore.pointerDragDistanceX, (newDistance) => {
  console.log('Pointer drag distance X changed in ChartXScale component', newDistance)
})

</script>

<style scoped>
</style>

