import { ref, watch } from 'vue'
import { useChartStore } from '../../stores/chart'
import * as d3 from 'd3'

export function useZoomMode() {
    const chartStore = useChartStore()

    let wheelValues: number[] = []
    let timer : ReturnType<typeof setTimeout> | null = null

    function setScales(){
        const currentStartTime = chartStore.x.domain()[0].getTime()
        const currentEndTime = chartStore.x.domain()[1].getTime()
        
        const wheelValuesTotal = wheelValues.reduce((acc, val) => acc + val, 0)
        let newStartTime = currentStartTime + wheelValuesTotal * 10000

        let newEndTime = currentEndTime
        wheelValues = []

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
    }

    function onWheel(event: WheelEvent) {
        event.preventDefault()
        wheelValues.push(event.deltaY)

        if(timer) return;
        timer = setTimeout(() => {
            setScales()
            wheelValues = []
            clearTimeout(timer as ReturnType<typeof setTimeout>)
            timer = null
        }, 10)
    }

    chartStore.svgTemplateRef?.addEventListener('wheel', onWheel)

    function tearDown(){
        chartStore.svgTemplateRef?.removeEventListener('wheel', onWheel)
    }

    return { tearDown }
}