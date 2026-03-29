import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {
  const data = ref<{ time: string, open: number, high: number, low: number, close: number }[]>([])
  const chartData = ref<{ time: string, open: number, high: number, low: number, close: number }[]>([])
  const limit = ref(100)
  const numberOfBarsOnChart = ref(20)
  const chartIndexRange = ref({ from: limit.value - numberOfBarsOnChart.value, to: limit.value })

  function updateData(newData: any) {
    console.log('Updating data in store', newData)
    data.value = newData
  }

  function updateChartData(newChartData: any) {
    console.log('Updating chart data in store', newChartData)
    chartData.value = newChartData
  }

  function updateChartIndexRange(newRange: { from: number, to: number }) {
    console.log('Updating chart index range in store', newRange)
    chartIndexRange.value = newRange
  }

  return { chartIndexRange, chartData, limit, numberOfBarsOnChart, data, updateChartData, updateChartIndexRange, updateData }
})
