import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useControlsStore = defineStore('controls', () => {
  const pointerDragDistanceX = ref<number | null>(null)

  enum CursorModeEnum {
    PAN = 'pan',
    HORIZONTAL_LINE = 'horizontal_line',
  }

  const cursorMode = ref<CursorModeEnum>(CursorModeEnum.PAN)
  
  function updatePointerDragDistanceX(newDistance: number | null) {
    pointerDragDistanceX.value = newDistance
  }

  function setCursorMode(newCursorMode: CursorModeEnum) {
    cursorMode.value = newCursorMode
  }

  return {pointerDragDistanceX, updatePointerDragDistanceX, cursorMode, setCursorMode, CursorModeEnum}
})
