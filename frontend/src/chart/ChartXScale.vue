<template>
    <g ref="gx" :transform="`translate(0, ${props.height})`" :stroke-width="chartStore.axisStrokeWidth" :style="`font-size: ${chartStore.axisFontSize}rem;`"></g>
</template>

<script lang="ts" setup>
import * as d3 from 'd3'
import { useTemplateRef, watch, onMounted } from 'vue';
import { useChartStore } from '@/stores/chart'

import { scaleDiscontinuous, discontinuityRange } from 'd3fc';

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

watch(() => chartStore.xScaleRequiresUpdate, () => {
    if(!gx.value || !chartStore.xScaleRequiresUpdate) return
    if(chartStore.x === null || chartStore.x === undefined){ 
      const firstTime = chartStore.chartData?.[0]?.time
      const lastTime = chartStore.chartData?.[chartStore.chartData.length - 1]?.time

      if (!firstTime || !lastTime) return
      const scaleUTC = d3.scaleUtc([new Date(firstTime).getTime() - (chartStore.timeFrameSteps?.[chartStore.timeframe] ?? 0), new Date(lastTime)], [0, props.width]).range([0, props.width])
      const scale = scaleDiscontinuous(scaleUTC)
          .discontinuityProvider(discontinuityRange(...chartStore.gaps))
      chartStore.updateX(scale)
    }
    d3.select(gx.value).call(d3.axisBottom(chartStore.x));
    chartStore.updateXScaleRequiresUpdate(false)
    chartStore.updateChartItemsRequireUpdate(true)
})

onMounted(() => {
  chartStore.updateXScaleRequiresUpdate(true)
})


</script>

<style scoped>
</style>

