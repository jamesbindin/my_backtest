import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {

  const timeframe = ref<string>('M5')

  const timeFrameSteps = ref<Record<string, number>>({
    'M1': 60 * 1000,
    'M5': 5 * 60 * 1000,
    'M15': 15 * 60 * 1000,
    'M30': 30 * 60 * 1000,
    'H1': 60 * 60 * 1000,
    'H4': 4 * 60 * 60 * 1000,
    'D1': 24 * 60 * 60 * 1000,
  })

  const barColours = ref<Record<string, string>>({
      up: 'rgba(255, 0, 0, 0.2)',
      down: 'rgba(0, 255, 0, 0.2)'
  })

  const data = ref<{ time: string, open: number, high: number, low: number, close: number }[]>([])
  const chartData = ref<{ time: string, open: number, high: number, low: number, close: number }[]>([])
  const gaps = ref<Array<[Date, Date]>>([])
  const x = ref<any>(null)
  const y = ref<any>(null)

  const axisStrokeWidth = 2 // px
  const axisFontSize = 1 // rem
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

  function updateGaps(newGaps: any) {
    gaps.value = newGaps
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

  return { chartData, data, x, y, xScaleRequiresUpdate, yScaleRequiresUpdate, chartItemsRequireUpdate, chartContainer, svgTemplateRef, updateChartData, updateData, updateX, updateY, updateXScaleRequiresUpdate, updateYScaleRequiresUpdate, updateChartItemsRequireUpdate, setChartContainer, setSvgTemplateRef, timeframe, timeFrameSteps, barColours, axisStrokeWidth, axisFontSize, gaps, updateGaps }
})
