<template>
    <g @mouseout="candlestickMouseOut" @mousemove="candlestickMouseOver">
        <rect 
        :x="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0)))" 
        :y="y(Math.max(d.open, d.close))" 
        :width="barWidth"
        :height="Math.abs(y(d.open) - y(d.close))" 
        :stroke-width="strokeWidth"
        :class="d.open > d.close ? 'fill-primary stroke-primary' : 'fill-secondary stroke-secondary'"
        />
        <line 
        :x1="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
        :y1="y(d.high)" 
        :x2="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
        :y2="y(Math.max(d.open, d.close))" 
        :stroke-width="strokeWidth"
        class="stroke-primary"
        />
        <line 
        :x1="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
        :y1="y(d.low)" 
        :x2="x(new Date(new Date(d.time).getTime() - (timeFrameSteps[timeframe] ?? 0))) + barWidth / 2" 
        :y2="y(Math.min(d.open, d.close))" 
        :stroke-width="strokeWidth"
        class="stroke-primary"
        />
    </g>
</template>
<script setup lang="ts">
import { inject, watch } from 'vue';
import { useTooltipStore } from './stores/tooltips';

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
    default: 1.5
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

const tooltipStore = useTooltipStore()
const fillColour = (open: number, close: number): string => {
    
    return open < close ? (barColours.up ?? '') : (barColours.down ?? '')
}

let barWidth = props.x((timeFrameSteps[timeframe] ?? 0) * 2) - props.x(timeFrameSteps[timeframe] ?? 0)

watch(() => props.x, (newX) => {
    barWidth = newX((timeFrameSteps[timeframe] ?? 0) * 2) - newX(timeFrameSteps[timeframe] ?? 0)
})

function candlestickMouseOver(event: MouseEvent) {
    console.log(event)
    tooltipStore.updateTooltips([{
        paragraphs: [
            `Time: ${new Date(props.d.time).toLocaleString()}`,
            `Open: ${props.d.open}`,
            `High: ${props.d.high}`,
            `Low: ${props.d.low}`,
            `Close: ${props.d.close}`
        ],
        position: { x: event.pageX, y: event.pageY }
    }])
}

function candlestickMouseOut() {
    tooltipStore.clearTooltips()
}
</script>
