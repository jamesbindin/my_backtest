<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { inject, ref } from 'vue'
import Chart from './Chart.vue'

const axios: any = inject('axios')
const data = ref([])
const timeFrame = 'M5'

onMounted(() => {
  axios.get(`bars/EURUSD/${timeFrame}`, {
    params: {
      timefrom: '2020-01-01T00:00',
      limit: 100
    }
  }).then((response: any) => {
    data.value = response.data
  }).catch((error: any) => {
    console.error('Error fetching data:', error)
  })
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
  <Chart v-if="data.length" :data="data" :width="1200" :height="600" :margin-x="50" :margin-y="50"/>
</template>

<style>
@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, cupcake;
}
</style>
