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
    <li v-for="modeKey in modeKeys" :key="modeKey">
      <input
        type="radio"
        name="drawing-controls-dropdown"
        class="text-nowrap w-full btn btn-sm btn-block btn-ghost justify-start"
        :aria-label="modes[modeKey]?.label"
        :value="modeKey" 
        :checked="modes[modeKey]?.active"
        @change="updateCursorMode"/>
    </li>
  </ul>
</div>
</template>
<script lang="ts" setup>
import { useControlsStore } from './stores/controls'
import { usePanMode } from './panMode'
import { useHorizontalLineMode } from './horizontalLineMode'
import { onMounted, watch, ref  } from 'vue'

const controlsStore = useControlsStore()
const cursorModeEnum = controlsStore.CursorModeEnum

// const modes: Record<string, {label: string; composable: Function; active: boolean}> = {}
// const modes : Record<string, {label: string; composable: Function; active: boolean}> = {}
// const modes: Record<string, {label: string; composable: Function; active: boolean}>> = ref({
//     [cursorModeEnum.PAN]: {label: 'Pan',  composable: usePanMode, active: false},
//     [cursorModeEnum.HORIZONTAL_LINE]: {label: 'Horizontal Line', composable: useHorizontalLineMode, active: true}
// })

const modes = ref({
    [cursorModeEnum.PAN]: {label: 'Pan',  composable: usePanMode, active: false},
    [cursorModeEnum.HORIZONTAL_LINE]: {label: 'Horizontal Line', composable: useHorizontalLineMode, active: true}
})


const modeKeys = Object.keys(modes.value) as (keyof typeof modes.value)[]

var useCursorMode = ref(Object.values(modes.value).find(m => m.active)?.composable || usePanMode)
var tearDownCursorMode: Function | null = null


const updateCursorMode = (event: Event) => {
    const target = event.target as HTMLInputElement
    controlsStore.setCursorMode(target.value as typeof cursorModeEnum[keyof typeof cursorModeEnum])
    target.blur()
}

watch(() => controlsStore.cursorMode, (newMode) => {
    console.log('Cursor mode changed to:', newMode)
    if(tearDownCursorMode) {
        tearDownCursorMode()
    }

    Object.keys(modes.value).forEach(key => {
        if(!modes.value[key as keyof typeof modes.value]) return
        modes.value[key as keyof typeof modes.value].active = key === newMode
    })

    const mode = modes.value[newMode]
    if(mode) {
        useCursorMode.value = mode.composable
        tearDownCursorMode  = useCursorMode.value()
    }
})

onMounted(() => {
     tearDownCursorMode  = useCursorMode.value()
})


</script>
<style scoped></style>