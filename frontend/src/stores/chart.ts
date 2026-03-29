import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {
  const data = ref<{ time: string, open: number, high: number, low: number, close: number }[]>([])
  const chartData = ref<{ time: string, open: number, high: number, low: number, close: number }[]>([])
  const limit = ref(100)
  const numberOfBarsOnChart = ref(20)
  const chartIndexRange = ref({ from: limit.value - numberOfBarsOnChart.value, to: limit.value })
  const x = ref<any>(null)
  const y = ref<any>(null)

  function updateData(newData: any) {
    data.value = newData
  }

  function updateChartData(newChartData: any) {
    chartData.value = newChartData
  }

  function updateChartIndexRange(newRange: { from: number, to: number }) {
    chartIndexRange.value = newRange
  }

  function updateX(newX: any) {
    x.value = newX
  }

  function updateY(newY: any) {
    y.value = newY
  }

  return { chartIndexRange, chartData, limit, numberOfBarsOnChart, data, x, y, updateChartData, updateChartIndexRange, updateData, updateX, updateY }
})
