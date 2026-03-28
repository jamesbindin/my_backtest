<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { inject, ref } from 'vue'
import Chart from './Chart.vue'

const axios: any = inject('axios')
const data = ref([])
const chartData = ref([])
const timeFrame = 'M5'
const limit = 100
const numberOfBarsOnChart = 20
const chartIndexRange = ref({
  from: limit - numberOfBarsOnChart,
  to: limit 
})

function retrieveData(){
  axios.get(`bars/EURUSD/${timeFrame}`, {
    params: {
      timefrom: '2020-01-01T00:00',
      limit: limit 
    }
  }).then((response: any) => {
    data.value = response.data
    chartData.value = data.value.slice(chartIndexRange.value.from, chartIndexRange.value.to)
  }).catch((error: any) => {
    console.error('Error fetching data:', error)
  })
}

onMounted(() => {
  retrieveData()
})

function stepBack() {
  console.log('Step Back')
  if(chartIndexRange.value.from <= 0) return
  chartIndexRange.value.from -= 1
  chartIndexRange.value.to -= 1
  chartData.value = data.value.slice(chartIndexRange.value.from, chartIndexRange.value.to)
}

function stepForward() {
  console.log('Step Forward')
  if(chartIndexRange.value.to >= data.value.length) return
  chartIndexRange.value.from += 1
  chartIndexRange.value.to += 1
  chartData.value = data.value.slice(chartIndexRange.value.from, chartIndexRange.value.to)
}

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
  <Chart v-if="data.length" :data="chartData" :width="1200" :height="600" :margin-x="50" :margin-y="50" @stepBack="stepBack" @stepForward="stepForward"/>
</template>

<style>
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, cupcake;
}
</style>
