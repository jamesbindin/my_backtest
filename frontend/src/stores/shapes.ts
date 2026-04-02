import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHorizontalLinesStore = defineStore('horizontalLines', () => {
    const horizontalLines = ref<Array<{price: number, date: Date, id: number}>>([])

    function addHorizontalLine(price: number, date: Date, id: number) {
        horizontalLines.value.push({ price, date, id })
    }

    function removeHorizontalLine(id: number) {
        horizontalLines.value = horizontalLines.value.filter(line => line.id !== id)
    }

    return { horizontalLines, addHorizontalLine, removeHorizontalLine }
})

