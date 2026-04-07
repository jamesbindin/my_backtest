import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useControlsStore = defineStore('controls', () => {
  const pointerDragDistanceX = ref<number | null>(null)

  enum DrawingModeEnum {
    NONE = 'none',
    HORIZONTAL_LINE = 'horizontal_line',
  }

  const drawingMode = ref<DrawingModeEnum>(DrawingModeEnum.NONE)

  const theme = ref<string>(document.documentElement.getAttribute('data-theme') || 'default')


  const cursorModeEnum = {
    PAN: 'pan',
    CROSSHAIR: 'crosshair',
  }

  const cursorMode = ref<string>(cursorModeEnum.PAN)

  function updatePointerDragDistanceX(newDistance: number | null) {
    pointerDragDistanceX.value = newDistance
  }

  function setDrawingMode(newDrawingMode: DrawingModeEnum) {
    drawingMode.value = newDrawingMode
  }

  function setTheme(newTheme: string) {
    console.log('Setting theme to', newTheme)
    theme.value = newTheme
  }

  function setCursorMode(newCursorMode: string) {
    cursorMode.value = newCursorMode
  }

  return {pointerDragDistanceX, updatePointerDragDistanceX, drawingMode, setDrawingMode, DrawingModeEnum, theme, setTheme, cursorMode, cursorModeEnum, setCursorMode}
})
