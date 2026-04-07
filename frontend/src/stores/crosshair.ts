import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCrosshairStore = defineStore('crosshair', () => {

    const crosshairData = ref<{ x: number, y: number } | null>(null)

    function setCrosshairData(coords: { x: number, y: number } | null) {
        crosshairData.value = coords
    }

    return { crosshairData, setCrosshairData }
})

