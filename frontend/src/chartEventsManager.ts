import { watch } from 'vue'
import { useChartStore } from './stores/chart'
import { useControlsStore } from './stores/controls'

export default function useChartEventsManager() {
    const chartStore = useChartStore()
    const controlsStore = useControlsStore()

    watch(() => controlsStore.activeModes, (newActiveModes, oldActiveModes) => {
        for(const modeKey in oldActiveModes) {
            
           // remove mode
           if(Object.keys(newActiveModes).indexOf(modeKey) === -1){
               oldActiveModes[modeKey]?.tearDown()
           }
        }

        for(const modeKey in newActiveModes) {
            // add mode
            if(Object.keys(oldActiveModes).indexOf(modeKey) === -1){
                const tearDown = newActiveModes[modeKey]?.composable()
                let modesCopy = {...controlsStore.modes}
                modesCopy[modeKey as keyof typeof controlsStore.modes].tearDown = tearDown ? tearDown.tearDown : () => {}
                controlsStore.modes = modesCopy
            }
        }
    }, { deep: true })
    
    // controlsStore.activeModes = {[controlsStore.ModesEnum.PAN]: controlsStore.modes[controlsStore.ModesEnum.PAN]}

}
