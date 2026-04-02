import { ref, watch } from 'vue'
import { useChartStore } from './stores/chart'
import * as d3 from 'd3'
import { useHorizontalLinesStore } from './stores/shapes'
import { useMouseCoordinatesRelativeToSvg } from './mouseCoordsRelativeToSvg'

export function useHorizontalLineMode() {
  const chartStore = useChartStore()
  const horizontalLinesStore = useHorizontalLinesStore()


  const onPointerDown = function (event: PointerEvent) {
    const coords = useMouseCoordinatesRelativeToSvg(chartStore.svgTemplateRef as SVGSVGElement, event)
    horizontalLinesStore.addHorizontalLine(chartStore.y.invert(coords.y), new Date(), 0)
  }


  chartStore.svgTemplateRef?.addEventListener('pointerdown', onPointerDown)

  const tearDown = function() {
    chartStore.svgTemplateRef?.removeEventListener('pointerdown', onPointerDown)
  }

  return tearDown 
}