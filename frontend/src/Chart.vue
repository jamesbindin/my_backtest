<template>
   <svg :width="width" :height="height">
    <g ref="gx" :transform="`translate(0, ${height - props.marginY})`" stroke-width="0.5"></g>
    <g ref="gy" :transform="`translate(${props.marginX}, 0)`" stroke-width="0.5"></g>
    <g v-if="x && y" v-for="d in data" :key="d.time">
      <Candlestick :d="d" :stroke-width="0.3"/>
    </g>
  </svg> 
  <div class="buttons flex gap-2">
      <button class="btn" @click="$emit('step-back')">Step Back</button>
      <button class="btn" @click="$emit('step-forward')">Step Forward</button>
  </div>
</template>

<script setup lang="ts">

import * as d3 from 'd3'
import { onMounted, ref, useTemplateRef, provide, inject, watch } from 'vue'
import Candlestick from './Candlestick.vue'

const props = defineProps({
  data: {
    type: [Object],
    required: true
  }, 
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

const timeFrameSteps = inject('timeFrameSteps') as Record<string, number>
const timeframe = inject('timeframe') as string

const gx = useTemplateRef('gx')
const gy = useTemplateRef('gy')

let y = ref();
let x = ref();

watch(() => props.data, (newData) => {
  setScales(newData)
    setTicks()
})

function setScales(newData?: any) {
  console.log('Setting scales with data:', newData ?? props.data)
  const dataToUse = newData ?? props.data
  const yMax = d3.max(dataToUse as Array<any>, (d) => d?.high)
  const yMin = d3.min(dataToUse as Array<any>, (d) => d?.low)
  y.value = d3.scaleLinear([yMax, yMin], [0, props.height - props.marginY])
  x.value = d3.scaleUtc([new Date(dataToUse[0].time).getTime() - (timeFrameSteps[timeframe] ?? 0), new Date(dataToUse[dataToUse.length - 1].time)], [props.marginX, props.width])
}

function setTicks() {
  if(gx.value && gy.value) {
    d3.select(gx.value).call(d3.axisBottom(x.value));
    d3.select(gy.value).call(d3.axisLeft(y.value));
   }
}

onMounted(() => {
    setScales()
    setTicks()
})

provide('x', x)
provide('y', y)
</script>

<style scoped>
</style>