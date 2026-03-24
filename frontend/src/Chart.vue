<template>
   <svg :width="width" :height="height">
    <g ref="gx" :transform="`translate(0, ${height - 40})`"></g>
    <g ref="gy" :transform="`translate(40, 0)`"></g>
  </svg> 
</template>

<script setup lang="ts">

import * as d3 from 'd3'
import { onMounted, ref, useTemplateRef } from 'vue'

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

const gx = useTemplateRef('gx')
const gy = useTemplateRef('gy')
const yMax = d3.max(props.data as Array<any>, (d) => d?.high)
const yMin = d3.min(props.data as Array<any>, (d) => d?.low)

onMounted(() => {
    let y = d3.scaleLinear([yMax, yMin], [props.marginY, props.height - props.marginY])
    let x = d3.scaleUtc([new Date(props.data[0].time), new Date(props.data[props.data.length - 1].time)], [props.marginX, props.width - props.marginX])
    if(gx.value && gy.value) {
      d3.select(gx.value).call(d3.axisBottom(x));
      d3.select(gy.value).call(d3.axisLeft(y));
    }
})
</script>