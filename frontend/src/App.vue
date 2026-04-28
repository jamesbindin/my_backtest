<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { inject, ref } from 'vue'
import Chart from './chart/Chart.vue'
import { useChartStore } from '@/stores/chart'
import Tooltips from './chart/Tooltips.vue'
import ChartControls from './chart/ChartControls.vue'

const chartStore = useChartStore()

const axios: any = inject('axios')
const timeFrame = 'M5'

function retrieveData(){
  axios.get(`bars/EURUSD/${timeFrame}`, {
    params: {
      timefrom: '2020-01-01T00:00',
      limit: chartStore.limit
    }
  }).then((response: any) => {
    chartStore.updateData(response.data)
    chartStore.updateChartData(chartStore.data.slice(chartStore.chartIndexRange.from, chartStore.chartIndexRange.to))
  }).catch((error: any) => {
    console.error('Error fetching data:', error)
  })
}

onMounted(() => {
  retrieveData()
})

const timeFrameSteps: Record<string, number> = {
  'M1': 60 * 1000,
  'M5': 5 * 60 * 1000,
  'M15': 15 * 60 * 1000,
  'M30': 30 * 60 * 1000,
  'H1': 60 * 60 * 1000,
  'H4': 4 * 60 * 60 * 1000,
  'D1': 24 * 60 * 60 * 1000,
}

const barColours: Record<string, string> = {
    up: 'rgba(255, 0, 0, 0.2)',
    down: 'rgba(0, 255, 0, 0.2)'
}

provide('timeFrameSteps', timeFrameSteps)
provide('timeframe', timeFrame)
provide('barColours', barColours)


</script>
<template>
  <div class="flex flex-col items-center content-center gap-4">
    <ChartControls v-if="chartStore.svgTemplateRef"/>
    <div class="w-11/12 h-11/12 border p-4">
      <Chart v-if="chartStore.chartData.length" :margin-x="34" :margin-y="20"/>
    </div>
  </div>
  <Tooltips />
  
</template>

<style>
@import "tailwindcss";
@plugin "daisyui" {
  themes: all; 
}
</style>
