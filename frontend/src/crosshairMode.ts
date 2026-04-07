import { ref, watch } from 'vue'
import { useChartStore } from './stores/chart'
import { useCrosshairStore } from './stores/crosshair'
import { useMouseCoordinatesRelativeToSvg } from './mouseCoordsRelativeToSvg'

export function useCrosshairMode() {
  const chartStore = useChartStore()
  const crosshairStore = useCrosshairStore()
  
  const coords = ref<{x: number, y: number} | null>(null)
  const onPointerMove = function (event: PointerEvent) {
    coords.value = useMouseCoordinatesRelativeToSvg(chartStore.svgTemplateRef as SVGSVGElement, event)
    const scaledX = chartStore.x.invert(coords.value.x)
    const scaledY = chartStore.y.invert(coords.value.y)
    crosshairStore.setCrosshairData({ x: scaledX, y: scaledY })
  }

  chartStore.svgTemplateRef?.addEventListener('pointermove', onPointerMove)

  const tearDown = function() {
    chartStore.svgTemplateRef?.removeEventListener('pointermove', onPointerMove)
  }

  return { tearDown }
}