<template>
    <g ref="gx" :transform="`translate(0, ${height - props.marginY})`" stroke-width="0.5"></g>
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

const emit = defineEmits(['update:x'])

watch(() => chartStore.chartData, (newData) => {
  setScales(newData)
})

function setScales(this: any, newData?: any) {
    if(!gx.value) return
    const dataToUse = newData ?? chartStore.chartData
    const x = d3.scaleUtc([new Date(dataToUse[0].time).getTime() - (timeFrameSteps[timeframe] ?? 0), new Date(dataToUse[dataToUse.length - 1].time)], [props.marginX, props.width])
    d3.select(gx.value).call(d3.axisBottom(x));
    emit('update:x', x)
}

onMounted(() => {
    setScales()
})

</script>

<style scoped>
</style>

