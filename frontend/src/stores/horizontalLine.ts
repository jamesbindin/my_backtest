import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHorizontalLinesStore = defineStore('horizontalLines', () => {
    const horizontalLines = ref<Array<{price: number, date: Date, uuid: string}>>([])

    function addHorizontalLine(price: number, date: Date, uuid: string) {
        horizontalLines.value.push({ price, date, uuid })
    }

    function updateHorizontalLine(uuid: string, newPrice: number) {
        const line = horizontalLines.value.find(line => line.uuid === uuid)
        if(line) line.price = newPrice
    }

    function removeHorizontalLine(uuid: string) {
        horizontalLines.value = horizontalLines.value.filter(line => line.uuid !== uuid)
    }

    return { horizontalLines, addHorizontalLine, updateHorizontalLine, removeHorizontalLine }
})

