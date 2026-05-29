<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { inject, ref } from 'vue'
import Chart from './chart/Chart.vue'
import { useChartStore } from '@/stores/chart'
import Tooltips from './chart/Tooltips.vue'
import ChartControls from './chart/ChartControls.vue'

const chartStore = useChartStore()

const axios: any = inject('axios')
const timeFrom = '2023-07-14T20:55'
const timeTo = '2023-07-17T00:00'
function retrieveData(){
  axios.get(`bars/EURUSD/${chartStore.timeframe}`, {
    params: {
      timefrom: timeFrom,
      timeto:   timeTo 
    }
  }).then((response: any) => {
    chartStore.updateData(response.data)
    chartStore.updateChartData(chartStore.data.slice(0, Math.min(chartStore.data.length, 2000)))
  }).catch((error: any) => {
    console.error('Error fetching data:', error)
  })
  axios.get(`gaps/EURUSD/${chartStore.timeframe}`, {
    params: {
      timefrom: timeFrom,
      timeto:   timeTo 
    }
  }).then((response: any) => {
    console.log('Gaps response:', response.data)
    storeGapsAsDates(response.data)
  }).catch((error: any) => {
    console.error('Error fetching gaps:', error)
  })
}

onMounted(() => {
  retrieveData()
})

function storeGapsAsDates(gaps: number[][]) {
  let dateGaps: Date[][] = []
  gaps.forEach((gap: any) => {
    dateGaps.push([new Date(gap[0]), new Date(gap[1])])
  })
  chartStore.updateGaps(dateGaps)
}

</script>
<template>
  <div class="flex flex-col items-center content-center gap-4">
    <ChartControls v-if="chartStore.svgTemplateRef"/>
    <div class="w-11/12 h-11/12 border p-4">
      <Chart v-if="chartStore.chartData.length && chartStore.gaps.length" :margin-x="64" :margin-y="32"/>
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
