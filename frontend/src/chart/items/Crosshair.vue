<template>
    <g>
        <!-- <line v-if="crosshairStore.crosshairData" :x1="crosshairStore.crosshairData.x" :y1="0" :x2="crosshairStore.crosshairData.x" :y2="crosshairStore.svgHeight" stroke="gray" stroke-width="1" pointer-events="none"/> -->
        <!-- <line v-if="crosshairStore.crosshairData" :x1="0" :y1="crosshairStore.crosshairData.y" :x2="crosshairStore.svgWidth" :y2="crosshairStore.crosshairData.y" stroke="gray" stroke-width="1" pointer-events="none"/> -->
            <line v-if="crosshairStore.crosshairData" :x1="0" :y1="convertPriceToY(crosshairStore.crosshairData.y)" :x2="svgWidthScaled()" :y2="convertPriceToY(crosshairStore.crosshairData.y)" stroke="gray" stroke-width="1" pointer-events="none"/>    
            <line v-if="crosshairStore.crosshairData" :x1="convertTimestampToX(crosshairStore.crosshairData.x)" :y1="svgHeightScaled()" :x2="convertTimestampToX(crosshairStore.crosshairData.x)" :y2="0" stroke="gray" stroke-width="1" pointer-events="none"/>
    </g>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useChartStore } from '../../stores/chart';
import { useCrosshairStore } from '../../stores/crosshair';

const crosshairStore = useCrosshairStore()
const chartStore = useChartStore()

function convertPriceToY(price: number) {
    if(chartStore.y) {
        return chartStore.y(price)
    }
    return 0
}

function convertTimestampToX(timestamp: number) {
    if(chartStore.x) {
        return chartStore.x(timestamp)
    }
    return 0
}

function svgWidthScaled() {
    return chartStore.x ? chartStore.x.range()[1] : 0
}

function svgHeightScaled() {
    return chartStore.y ? chartStore.y.range()[1] : 0
}


</script>
<style scoped></style>