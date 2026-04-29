<template>
    <g @mouseout="candlestickMouseOut" @mousemove="candlestickMouseOver">
        <rect 
        :x="x(new Date(new Date(d.time).getTime() - (chartStore.timeFrameSteps[chartStore.timeframe] ?? 0)))" 
        :y="y(Math.max(d.open, d.close))" 
        :width="barWidth"
        :height="Math.abs(y(d.open) - y(d.close))" 
        :stroke-width="strokeWidth"
        :class="d.open > d.close ? 'fill-primary stroke-base-content' : 'fill-secondary stroke-base-content'"
        />
        <line 
        :x1="x(new Date(new Date(d.time).getTime() - (chartStore.timeFrameSteps[chartStore.timeframe] ?? 0))) + barWidth / 2" 
        :y1="y(d.high)" 
        :x2="x(new Date(new Date(d.time).getTime() - (chartStore.timeFrameSteps[chartStore.timeframe] ?? 0))) + barWidth / 2" 
        :y2="y(Math.max(d.open, d.close))" 
        :stroke-width="strokeWidth"
        class="stroke-base-content"
        />
        <line 
        :x1="x(new Date(new Date(d.time).getTime() - (chartStore.timeFrameSteps[chartStore.timeframe] ?? 0))) + barWidth / 2" 
        :y1="y(d.low)" 
        :x2="x(new Date(new Date(d.time).getTime() - (chartStore.timeFrameSteps[chartStore.timeframe] ?? 0))) + barWidth / 2" 
        :y2="y(Math.min(d.open, d.close))" 
        :stroke-width="strokeWidth"
        class="stroke-base-content"
        />
    </g>
</template>
<script setup lang="ts">
import * as d3 from 'd3'
import { watch, type PropType } from 'vue';
import { useTooltipStore } from '../../stores/tooltips';
import { useChartStore } from '@/stores/chart'

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
        type: Object as PropType<d3.ScaleTime<number, number>>,
        required: true
    },
    y: {
        type: Object as PropType<d3.ScaleLinear<number, number>>,
        required: true
    }
})
const chartStore = useChartStore()

const tooltipStore = useTooltipStore()

let barWidth = calculateBarWidth(props.x)

watch(() => props.x, (newX) => {
    barWidth = calculateBarWidth(newX)
})

function calculateBarWidth(x: d3.ScaleTime<number, number>) {
    if(x && chartStore.timeFrameSteps[chartStore.timeframe]) {
        const timeFrameStep = chartStore.timeFrameSteps[chartStore.timeframe] ?? 0
        return x(timeFrameStep * 2) - x(timeFrameStep) - props.strokeWidth
    }
    return 0
}

function candlestickMouseOver(event: MouseEvent) {
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
