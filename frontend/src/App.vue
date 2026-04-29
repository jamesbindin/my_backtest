<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { inject, ref } from 'vue'
import Chart from './chart/Chart.vue'
import { useChartStore } from '@/stores/chart'
import Tooltips from './chart/Tooltips.vue'
import ChartControls from './chart/ChartControls.vue'

const chartStore = useChartStore()

const axios: any = inject('axios')

function retrieveData(){
  axios.get(`bars/EURUSD/${chartStore.timeframe}`, {
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
