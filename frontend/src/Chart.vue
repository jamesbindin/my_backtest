<template>
   <svg ref="svg" :width="width" :height="height">
      <ChartXScale :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" @update:x="updateX"/>
      <ChartYScale :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" @update:y="updateY"/>
    <g v-if="x && y" v-for="d in chartStore.chartData" :key="d.time">
      <Candlestick :d="d" :stroke-width="0.3" :x="x" :y="y"/>
    </g>
  </svg> 
  <ChartControls :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" />
{{ pointer }}
</template>

<script setup lang="ts">

import { ref, useTemplateRef } from 'vue'
import Candlestick from './Candlestick.vue'
import ChartXScale from './ChartXScale.vue'
import ChartYScale from './ChartYScale.vue'
import ChartControls from './ChartControls.vue'
import { usePointer } from '@vueuse/core'
import { useChartStore } from './stores/chart'

const chartStore = useChartStore()

const svg = useTemplateRef('svg')

const pointer = usePointer({target: svg})

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


let y = ref();
let x = ref();

function updateX(newX: any) {
  x.value = newX
}

function updateY(newY: any) {
  y.value = newY
}

</script>

<style scoped>
</style>