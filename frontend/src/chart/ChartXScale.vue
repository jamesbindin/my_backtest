<template>
    <g ref="gx" :transform="`translate(0, ${props.height})`" stroke-width="0.5"></g>
</template>

<script lang="ts" setup>
import * as d3 from 'd3'
import { inject, useTemplateRef, watch, onMounted } from 'vue';
import { useChartStore } from '@/stores/chart'

const chartStore = useChartStore()

const props = defineProps({
  width: {
    type: Number,
    default: 640
  },
  height: {
    type: Number,
    default: 400
  }
})

const gx = useTemplateRef('gx')

const timeFrameSteps = inject('timeFrameSteps') as Record<string, number>
const timeframe = inject('timeframe') as string

watch(() => chartStore.xScaleRequiresUpdate, () => {
    if(!gx.value) return
    d3.select(gx.value).call(d3.axisBottom(chartStore.x));
    chartStore.updateXScaleRequiresUpdate(false)
    chartStore.updateChartItemsRequireUpdate(true)
})

function setScales(newData?: any) {
  const dataToUse = newData ?? chartStore.chartData
    if(!gx.value) return
    const x = d3.scaleUtc([new Date(dataToUse[0].time).getTime() - (timeFrameSteps[timeframe] ?? 0), new Date(dataToUse[dataToUse.length - 1].time)], [0, props.width])
    d3.select(gx.value).call(d3.axisBottom(x));
    chartStore.updateX(x)
}

onMounted(() => {
    setScales()
})


</script>

<style scoped>
</style>

