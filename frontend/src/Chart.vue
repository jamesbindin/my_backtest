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
  }
})

const width = ref(640);
const height = ref(400);
const marginX = ref(40)
const marginY = ref(40)
const gx = useTemplateRef('gx')
const gy = useTemplateRef('gy')
const yMax = d3.max(props.data as Array<any>, (d) => d?.high)
const yMin = d3.min(props.data as Array<any>, (d) => d?.low)
onMounted(() => {
    let y = d3.scaleLinear([yMax, yMin], [marginY.value, height.value - marginY.value])
    let x = d3.scaleUtc([new Date(props.data[0].time), new Date(props.data[props.data.length - 1].time)], [marginX.value, width.value - marginX.value])
    if(gx.value && gy.value) {
      d3.select(gx.value).call(d3.axisBottom(x));
      d3.select(gy.value).call(d3.axisLeft(y));
    }
})
</script>