<template>
    <g v-if="chartStore.x && chartStore.y" v-for="d in chartStore.chartData" :key="d.time">
      <Candlestick :d="d" :stroke-width="1" :x="chartStore.x" :y="chartStore.y"/>
    </g>
</template>
<script lang="ts" setup>
import { useChartStore } from './stores/chart';
import Candlestick from './Candlestick.vue'
import { watch, ref } from 'vue';

const chartStore = useChartStore()
const oldX = ref(chartStore.x)
const oldY = ref(chartStore.y)

function updateChartData() {
    if(!chartStore.chartItemsRequireUpdate) return
    if(chartStore.x.domain()[0].getTime() == oldX.value?.domain()[0].getTime() && chartStore.x.domain()[1].getTime() == oldX.value?.domain()[1].getTime()
    && chartStore.y.domain()[0] == oldY.value?.domain()[0] && chartStore.y.domain()[1] == oldY.value?.domain()[1]){
        console.log('Scales have not changed, skipping chart data update.')
        return
    }
    oldX.value = chartStore.x
    oldY.value = chartStore.y

    if(chartStore.x && chartStore.y) {
        let filteredData = chartStore.data.filter((d: any) => {
            const time = new Date(d.time).getTime()
            return time >= chartStore.x.domain()[0].getTime() && time <= chartStore.x.domain()[1].getTime()
        })
        console.log(filteredData)
        chartStore.updateChartData(filteredData)
    }

    chartStore.updateChartItemsRequireUpdate(false)
}   

watch([() => chartStore.chartItemsRequireUpdate], () => {
    updateChartData()
})

</script>
<style scoped></style>
