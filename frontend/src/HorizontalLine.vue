<template>
    <line
        :x1="0"
        :y1="convertPriceToY(props.horizontalLine.price)"
        x2="100%"
        :y2="convertPriceToY(props.horizontalLine.price)"
        class="stroke-primary"
        :stroke-width="1"
    />


</template>    
<script setup lang="ts">
import { useChartStore } from './stores/chart';
const props = defineProps({
    horizontalLine: {
        type: Object,
        required: true
    }
})

const chartStore = useChartStore()

function convertPriceToY(price: number) {
    console.log(price)
    if(chartStore.y) {
        return chartStore.y(price)
    }
    return 0
}

</script>
<style scoped>
</style>    