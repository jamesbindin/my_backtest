<template>
  <div class="buttons flex gap-2">
      <button class="btn" @click="stepBack">Step Back</button>
      <button class="btn" @click="stepForward">Step Forward</button>
  </div>
</template>
<script lang="ts" setup>

import { useChartStore } from './stores/chart'

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

</script>
<style scoped>
</style>