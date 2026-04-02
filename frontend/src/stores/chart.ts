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
  const xScaleRequiresUpdate = ref(false)
  const yScaleRequiresUpdate = ref(false)
  const chartItemsRequireUpdate = ref(false)
  const chartContainer = ref<HTMLElement | null>(null)
  const svgTemplateRef = ref<SVGSVGElement | null>(null)

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

  function updateXScaleRequiresUpdate(newValue: boolean) {
    xScaleRequiresUpdate.value = newValue
  }

  function updateYScaleRequiresUpdate(newValue: boolean) {
    yScaleRequiresUpdate.value = newValue
  }

  function updateChartItemsRequireUpdate(newValue: boolean) {
    chartItemsRequireUpdate.value = newValue
  }

  function setChartContainer(element: HTMLElement) {
    chartContainer.value = element
  }

  function setSvgTemplateRef(element: SVGSVGElement) {
    svgTemplateRef.value = element
  }

  return { chartIndexRange, chartData, limit, numberOfBarsOnChart, data, x, y, xScaleRequiresUpdate, yScaleRequiresUpdate, chartItemsRequireUpdate, chartContainer, svgTemplateRef, updateChartData, updateChartIndexRange, updateData, updateX, updateY, updateXScaleRequiresUpdate, updateYScaleRequiresUpdate, updateChartItemsRequireUpdate, setChartContainer, setSvgTemplateRef }
})
