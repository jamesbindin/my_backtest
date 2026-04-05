import { ref, watch } from 'vue'
import { useChartStore } from './stores/chart'
import { useHorizontalLinesStore } from './stores/horizontalLine'
import { useMouseCoordinatesRelativeToSvg } from './mouseCoordsRelativeToSvg'
import { v4 as uuidv4 } from 'uuid';

export function useHorizontalLineMode() {
  const chartStore = useChartStore()
  const horizontalLinesStore = useHorizontalLinesStore()

  const coords = ref<{x: number, y: number} | null>(null)
  let uuid = ref<string | null>(null)

const onPointerDown = function (event: PointerEvent) {
    event.preventDefault()
    coords.value = useMouseCoordinatesRelativeToSvg(chartStore.svgTemplateRef as SVGSVGElement, event)
    uuid.value = uuidv4()
    horizontalLinesStore.addHorizontalLine(chartStore.y.invert(coords.value.y), new Date(), uuid.value)
  }

  const onPointerMove = function (event: PointerEvent) {
    if(uuid.value) {
        coords.value = useMouseCoordinatesRelativeToSvg(chartStore.svgTemplateRef as SVGSVGElement, event)
        horizontalLinesStore.updateHorizontalLine(uuid.value, chartStore.y.invert(coords.value.y))
    }
  }

  const onPointerUp = function (event: PointerEvent) {
    event.preventDefault()
    coords.value = null
    uuid.value = null
  }

  


  chartStore.svgTemplateRef?.addEventListener('pointerdown', onPointerDown)
  chartStore.svgTemplateRef?.addEventListener('pointerup', onPointerUp)
  chartStore.svgTemplateRef?.addEventListener('pointermove', onPointerMove)

  const tearDown = function() {
    chartStore.svgTemplateRef?.removeEventListener('pointerdown', onPointerDown)
    chartStore.svgTemplateRef?.removeEventListener('pointerup', onPointerUp)
    chartStore.svgTemplateRef?.removeEventListener('pointermove', onPointerMove)
  }

  return tearDown 
}