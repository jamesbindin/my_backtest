<template>
    <g ref="gy" :transform="`translate(${props.marginX}, 0)`" stroke-width="0.5"></g>
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

const gy = useTemplateRef('gy')

function setScales(newData?: any) {
  if(!gy.value) return
  const dataToUse = newData ?? chartStore.chartData
  const yMax = d3.max(dataToUse as Array<any>, (d) => d?.high)
  const yMin = d3.min(dataToUse as Array<any>, (d) => d?.low)
  const y = d3.scaleLinear([yMax, yMin], [0, props.height - props.marginY])
  d3.select(gy.value).call(d3.axisLeft(y));
  chartStore.updateY(y)
}

onMounted(() => {
    setScales()
})

watch(() => chartStore.chartData, (newData) => {
  setScales(newData)
})

</script>

<style scoped>
</style>

