import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useHorizontalLineMode } from '@/chart/events/horizontalLineMode'
import { usePanMode } from '@/chart/events/panMode'
import { useCrosshairMode } from '@/chart/events/crosshairMode'

export const useControlsStore = defineStore('controls', () => {
  const pointerDragDistanceX = ref<number | null>(null)

  const ModesEnum = Object.freeze({
    HORIZONTAL_LINE: 'horizontal_line',
    PAN: 'pan',
    CROSSHAIR: 'crosshair',
  });

  const modes = {
    [ModesEnum.HORIZONTAL_LINE]: {composable: useHorizontalLineMode, label: 'Horizontal Line', tearDown: () => {}},
    [ModesEnum.PAN]: {composable: usePanMode, label: 'Pan', tearDown: () => {}},
    [ModesEnum.CROSSHAIR]: {composable: useCrosshairMode, label: 'Crosshair', tearDown: () => {}},
  }

  const activeModes = ref<Record<string, typeof modes[keyof typeof modes] | undefined>>({})

  const theme = ref<string>(document.documentElement.getAttribute('data-theme') || 'default')

  function updatePointerDragDistanceX(newDistance: number | null) {
    pointerDragDistanceX.value = newDistance
  }
  
  function setTheme(newTheme: string) {
    console.log('Setting theme to', newTheme)
    theme.value = newTheme
  }

  return {ModesEnum, modes, activeModes, pointerDragDistanceX, updatePointerDragDistanceX, theme, setTheme}
})
