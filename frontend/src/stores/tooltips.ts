import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTooltipStore = defineStore('tooltips', () => {
    const tooltips = ref<{paragraphs: string[], position: {x: number, y: number}}[]>()

    function updateTooltips(newTooltips: [{paragraphs: string[], position: {x: number, y: number}}]) {
        tooltips.value = newTooltips
    }

    function clearTooltips() {
        tooltips.value = []
    }

    return { tooltips, updateTooltips, clearTooltips }
})


