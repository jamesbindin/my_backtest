<template>
    <g @mouseout="candlestickMouseOut" @mousemove="candlestickMouseOver">
        <polygon
        :points="calculateOuterRectangle()"
        stroke-width="0"
        class="fill-base-content"
        />
        <polygon
        :points="calculateInnerRectangle()"
        stroke-width="0"
        :class="barClasses()"
        />
        <line 
        :x1="barMiddle()" 
        :y1="y(d.high)" 
        :x2="barMiddle()" 
        :y2="y(Math.max(d.open, d.close))" 
        :stroke-width="strokeWidthPx"
        class="stroke-base-content"
        />
        <line 
        :x1="barMiddle()" 
        :y1="y(d.low)" 
        :x2="barMiddle()" 
        :y2="y(Math.min(d.open, d.close))" 
        :stroke-width="strokeWidthPx"
        class="stroke-base-content"
        />
    </g>
</template>
<script setup lang="ts">
import * as d3 from 'd3'
import { computed, type PropType, ref } from 'vue';
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
    default: 0.1,

  }, 
  marginWidth: {
    type: Number,
    default: 0.1
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

const isBull = props.d.open < props.d.close
const chartStore = useChartStore()
const tooltipStore = useTooltipStore()

const timeWidth = chartStore.timeFrameSteps[chartStore.timeframe] ?? 0
const timeStamp = new Date(props.d.time).getTime()

var widthPx = 0
var xEndPx = 0

var marginWidthPx = 0
var strokeWidthPx = 0

function updateWidth() {
    widthPx = timeWidth > 0 ? props.x(timeStamp) - props.x(timeStamp - timeWidth) : 0
}

function updateXEnd() {
    xEndPx = props.x(timeStamp)
}

function updateMarginWidthPx() {
    marginWidthPx = props.marginWidth * widthPx
}

function updateStrokeWidthPx() {
    strokeWidthPx = props.strokeWidth * widthPx
}

var outerXEnd = 0
var outerXStart = 0
var outerYOpen = 0
var outerYClose = 0

function calculateOuterRectangle() {
    updateWidth()
    updateXEnd()
    updateMarginWidthPx()
    updateStrokeWidthPx()

    outerXEnd = xEndPx - marginWidthPx
    outerXStart = (xEndPx - widthPx) + marginWidthPx
    outerYOpen = props.y(props.d.open)
    outerYClose = props.y(props.d.close)
    const yIsZero = Math.abs(outerYOpen - outerYClose) === 0 

    const yOpen = yIsZero ? outerYOpen + 1 : outerYOpen
    const yClose = yIsZero ? outerYClose - 1 : outerYClose

    return `${outerXEnd},${yOpen} ${outerXStart},${yOpen} ${outerXStart},${yClose} ${outerXEnd},${yClose}`
}

function calculateInnerRectangle() {

    if (Math.abs(outerYOpen - outerYClose) < 2 * strokeWidthPx) {
        return 
    }
    updateWidth()
    updateXEnd()
    updateMarginWidthPx()
    updateStrokeWidthPx()

    var xEnd = outerXEnd - strokeWidthPx
    var xStart = outerXStart + strokeWidthPx
    var yOpen = outerYOpen 
    var yClose = outerYClose

    const x1 = xEnd
    const y1 = Math.max(yOpen, yClose) - strokeWidthPx
    const x2 = xStart
    const y2 = y1
    const x3 = xStart
    const y3 = Math.min(yOpen, yClose) + strokeWidthPx
    const x4 = xEnd
    const y4 = y3

    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`
}

function barMiddle() {
    return props.x(timeStamp - timeWidth / 2)
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

function barClasses() {
    if(props.d.open === props.d.close) return 'fill-base-content'
    return isBull ? 'fill-primary' : 'fill-secondary'
}

function candlestickMouseOut() {
    tooltipStore.clearTooltips()
}
</script>
