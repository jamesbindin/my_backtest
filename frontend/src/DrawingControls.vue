<template>
  <div class="dropdown dropdown-hover">
  <div tabindex="0" role="button" class="btn">
    Cursor Mode 
    <svg
      width="12px"
      height="12px"
      class="inline-block h-2 w-2 fill-current opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    </svg>
  </div>
  <ul tabindex="-1" class="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl overflow-y-auto">
    <li v-for="mode in modes" :key="mode.value">
      <input
        type="radio"
        name="drawing-controls-dropdown"
        class="text-nowrap w-full btn btn-sm btn-block btn-ghost justify-start"
        :aria-label="mode.label"
        :value="mode.value" 
        :checked="mode.default"
        @change="updateCursorMode"/>
    </li>
  </ul>
</div>
</template>
<script lang="ts" setup>
import { useControlsStore } from './stores/controls'
import { usePanMode } from './panMode'
import { useHorizontalLineMode } from './horizontalLineMode'
import { onMounted, watch, ref } from 'vue'

const controlsStore = useControlsStore()
const cursorModeEnum = controlsStore.CursorModeEnum

const modes = [
    {label: 'Pan', value: cursorModeEnum.PAN, composable: usePanMode},
    {label: 'Horizontal Line', value: cursorModeEnum.HORIZONTAL_LINE, composable: useHorizontalLineMode, default: true}
]

var useCursorMode = ref(modes.find(m => m.default)?.composable ?? usePanMode)
var tearDownCursorMode: Function | null = null


const updateCursorMode = (event: Event) => {

    const target = event.target as HTMLInputElement
    if(tearDownCursorMode) {
        tearDownCursorMode()
    }

    if(target.value === cursorModeEnum.PAN) {
        useCursorMode.value = usePanMode
    } else if(target.value === cursorModeEnum.HORIZONTAL_LINE) {
        useCursorMode.value = useHorizontalLineMode
    }    

    controlsStore.setCursorMode(target.value as typeof cursorModeEnum[keyof typeof cursorModeEnum])
    tearDownCursorMode  = useCursorMode.value()
    target.blur()
}

onMounted(() => {
     tearDownCursorMode  = useCursorMode.value()
})


</script>
<style scoped></style>