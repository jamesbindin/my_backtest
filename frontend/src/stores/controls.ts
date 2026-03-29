import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useControlsStore = defineStore('controls', () => {
  const pointerDragDistanceX = ref<number | null>(null)
  function updatePointerDragDistanceX(newDistance: number | null) {
    console.log('Updating pointer drag distance X in store', newDistance)
    pointerDragDistanceX.value = newDistance
  }
  return {pointerDragDistanceX, updatePointerDragDistanceX}
})
