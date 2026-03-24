<template>
   <svg :width="width" :height="height">
    <g ref="gx" :transform="`translate(0, ${height - props.marginY})`"></g>
    <g ref="gy" :transform="`translate(${props.marginX}, 0)`"></g>
    <g v-for="d in data" :key="d.time">
      <Candlestick :d="d"/>
    </g>
  </svg> 
</template>

<script setup lang="ts">

import * as d3 from 'd3'
import { onMounted, ref, useTemplateRef, provide, inject } from 'vue'
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

const yMax = d3.max(props.data as Array<any>, (d) => d?.high)
const yMin = d3.min(props.data as Array<any>, (d) => d?.low)
// let y = d3.scaleLinear([yMax, yMin], [props.marginY, props.height - props.marginY])
// let x = d3.scaleUtc([new Date(props.data[0].time).getTime() - (timeFrameSteps[props.timeframe] ?? 0), new Date(props.data[props.data.length - 1].time)], [props.marginX, props.width - props.marginX])
let y = d3.scaleLinear([yMax, yMin], [0, props.height - props.marginY])
let x = d3.scaleUtc([new Date(props.data[0].time).getTime() - (timeFrameSteps[timeframe] ?? 0), new Date(props.data[props.data.length - 1].time)], [props.marginX, props.width])
provide('x', x)
provide('y', y)

onMounted(() => {
    console.log(props.data)
    if(gx.value && gy.value) {
      d3.select(gx.value).call(d3.axisBottom(x));
      d3.select(gy.value).call(d3.axisLeft(y));
    }
})
</script>

<style scoped>
</style>