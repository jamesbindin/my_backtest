import { ref, watch } from 'vue'
import { useChartStore } from './stores/chart'
import * as d3 from 'd3'

export function usePanMode() {
  const chartStore = useChartStore()
  let pointerDown = ref(false)
  let pointerDragStartX = ref<number | null>(null)
  let pointerDragDistanceX = ref<number | null>(null)
  let pointerDragtStartDomain: [Date, Date] | null = null

  const onPointerDown = function (event: PointerEvent) {
      event.preventDefault()
      pointerDown.value = true
      pointerDragStartX.value = event.clientX
      pointerDragtStartDomain = chartStore.x.domain()
  }

  const onPointerMove = function (event: PointerEvent) {
      event.preventDefault()
      if(pointerDown.value) {
          pointerDragDistanceX.value = event.clientX - (pointerDragStartX.value ?? event.clientX)
      }
  }

  const onPointerUpOrCancel = function (event: PointerEvent) {
      event.preventDefault()
      pointerDown.value = false
  } 

  chartStore.svgTemplateRef?.addEventListener('pointerdown', onPointerDown)
  chartStore.svgTemplateRef?.addEventListener('pointermove', onPointerMove)
  chartStore.svgTemplateRef?.addEventListener('pointerup', onPointerUpOrCancel)
  chartStore.svgTemplateRef?.addEventListener('pointercancel', onPointerUpOrCancel)


watch(pointerDragDistanceX, (newDistance) => {
    if(newDistance === null || pointerDragtStartDomain === null || pointerDragStartX.value === null || !chartStore.data || chartStore.data.length === 0) return
    const delta = chartStore.x.invert(pointerDragStartX.value) - chartStore.x.invert(pointerDragStartX.value - newDistance)
    const newStartTime = pointerDragtStartDomain[0].getTime() - delta
    const newEndTime = pointerDragtStartDomain[1].getTime() - delta

    chartStore.updateX(chartStore.x.copy().domain([new Date(newStartTime), new Date(newEndTime)])) 
    chartStore.updateY(chartStore.y.copy().domain([
        d3.max(chartStore.data as Array<any>, (d) => {
            const time = new Date(d.time).getTime()
            if(time >= newStartTime && time <= newEndTime) return d?.high
            else return null
        }),
        d3.min(chartStore.data as Array<any>, (d) => {
            const time = new Date(d.time).getTime()
            if(time >= newStartTime && time <= newEndTime) return d?.low
            else return null
        })
    ]))
    chartStore.updateXScaleRequiresUpdate(true)
    chartStore.updateYScaleRequiresUpdate(true)
})

  const tearDown = function() {
    chartStore.svgTemplateRef?.removeEventListener('pointerdown', onPointerDown)
    chartStore.svgTemplateRef?.removeEventListener('pointermove', onPointerMove)
    chartStore.svgTemplateRef?.removeEventListener('pointerup', onPointerUpOrCancel)
    chartStore.svgTemplateRef?.removeEventListener('pointercancel', onPointerUpOrCancel)
  }

  return { tearDown }
}