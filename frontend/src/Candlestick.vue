<template>
    <rect 
    :x="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0)))" 
    :y="y(Math.max(d.open, d.close))" 
    :width="barWidth"
    :height="Math.abs(y(d.open) - y(d.close))" 
    :fill="fillColour(d.open, d.close)" 
    :stroke-width="strokeWidth"
    :stroke="stroke"
    />
    <line 
    :x1="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y1="y(d.high)" 
    :x2="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y2="y(Math.max(d.open, d.close))" 
    :stroke-width="strokeWidth"
    :stroke="stroke"
    />
    <line 
    :x1="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y1="y(d.low)" 
    :x2="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
    :y2="y(Math.min(d.open, d.close))" 
    :stroke-width="strokeWidth"
    :stroke="stroke"
    />
</template>
<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
  d: {
    type: Object,
    required: true
  },
  stroke: {
    type: String,
    default: 'black'
  },
  strokeWidth: {
    type: Number,
    default: 0.5
  }, 
    upFillColour: {
        type: Object,
        default: {r: 255, g: 0, b: 0, a: 0.5}
    },
    downFillColour: {
        type: Object,
        default: {r: 0, g: 255, b: 0, a: 0.5}
    },
    x: {
        type: Function,
        required: true
    },
    y: {
        type: Function,
        required: true
    }
})

const timeFrameSteps = inject('timeFrameSteps') as Record<string, number>
const timeframe = inject('timeframe') as string
const barColours = inject('barColours') as Record<string, string>

const fillColour = (open: number, close: number): string => {
    return open < close ? (barColours.up ?? '') : (barColours.down ?? '')
}

let barWidth = props.x((timeFrameSteps[timeframe] ?? 0) * 2) - props.x(timeFrameSteps[timeframe] ?? 0)
</script>
