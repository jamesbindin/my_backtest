<template>
    <ChartControls v-if="svg" :svg="svg" :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" />
    <div ref="chart-container">
      <svg ref="svg" :width="width" :height="height">
        <ChartXScale :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" />
        <ChartYScale :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY"/>
        <ChartItems v-if="chartStore.chartData"></ChartItems>
      </svg> 
    </div>
</template>

<script setup lang="ts">

import * as d3 from 'd3'
import { onMounted, ref, useTemplateRef } from 'vue'
import ChartXScale from './ChartXScale.vue'
import ChartYScale from './ChartYScale.vue'
import ChartControls from './ChartControls.vue'
import ChartItems from './ChartItems.vue'
import { useChartStore } from './stores/chart'


const chartStore = useChartStore()

const svg = useTemplateRef('svg')
const chartContainer = useTemplateRef('chart-container')

onMounted(() => {
    if(chartContainer.value) {
        chartStore.setChartContainer(chartContainer.value)
    }
})

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


</script>

<style scoped>
</style>