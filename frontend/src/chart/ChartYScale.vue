<template>
    <g ref="gy" :transform="`translate(${props.width}, 0)`" stroke-width="0.5"></g>
</template>

<script lang="ts" setup>
import * as d3 from 'd3'
import { useTemplateRef, watch, onMounted } from 'vue';
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

const gy = useTemplateRef('gy')

watch(() => chartStore.yScaleRequiresUpdate, () => {
    if(!gy.value) return
    d3.select(gy.value).call(d3.axisRight(chartStore.y));
    chartStore.updateYScaleRequiresUpdate(false)
    chartStore.updateChartItemsRequireUpdate(true)
})  

function setScales(newData?: any) {
  if(!gy.value) return
  const dataToUse = newData ?? chartStore.chartData
  const yMax = d3.max(dataToUse as Array<any>, (d) => d?.high)
  const yMin = d3.min(dataToUse as Array<any>, (d) => d?.low)
  const y = d3.scaleLinear([yMax, yMin], [0, props.height])
  d3.select(gy.value).call(d3.axisRight(y));
  chartStore.updateY(y)
}

onMounted(() => {
    setScales()
})

</script>

<style scoped>
</style>

