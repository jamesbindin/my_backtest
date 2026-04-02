<template>
    <!-- <ChartControls v-if="svg" :svg="svg"/> -->
    <div ref="chart-container" class="w-full h-full">
      <template v-if="containerWidth && containerHeight">
      <svg ref="svg" width="100%" height="100%" :viewBox="`0 0 ${containerWidth + props.marginX} ${containerHeight + props.marginY}`">
        <ChartXScale :width="containerWidth" :height="containerHeight"/>
        <ChartYScale :width="containerWidth" :height="containerHeight"/>
        <ChartItems v-if="chartStore.chartData"></ChartItems>
      </svg> 
      </template>
    </div>
</template>

<script setup lang="ts">

import * as d3 from 'd3'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
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
  marginX: {
    type: Number,
    default: 40
  },
  marginY: {
    type: Number,
    default: 40
  }
})

const containerWidth = computed(() => {
  return 1020;
})

const containerHeight = computed(() => {
  return 600;
    // return chartContainer.value?.clientHeight ?? 0; 
})


</script>

<style scoped>
</style>