<template>
    <rect 
    :x="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0)))" 
    :y="y(Math.max(d.open, d.close))" 
    :width="barWidth"
    :height="Math.abs(y(d.open) - y(d.close))" 
    fill="white" 
    stroke="black"
    />
    <line 
    :x1="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y1="y(d.high)" 
    :x2="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y2="y(Math.max(d.open, d.close))" 
    stroke="black"
    />
    <line 
    :x1="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y1="y(d.low)" 
    :x2="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y2="y(Math.min(d.open, d.close))" 
    stroke="black"
    />
</template>
<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
  d: {
    type: Object,
    required: true
  }
})

const timeFrameSteps = inject('timeFrameSteps') as Record<string, number>
const timeframe = inject('timeframe') as string
const x = inject('x') as any
const y = inject('y') as any  


let barWidth = x((timeFrameSteps[timeframe] ?? 0) * 2) - x(timeFrameSteps[timeframe] ?? 0)
</script>
