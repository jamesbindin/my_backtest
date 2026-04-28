<template>
  <div class="dropdown">
  <div tabindex="0" role="button" class="btn">
    <p>{{ dropdownLabel() }}</p>
    
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
        @change="updateDrawingMode"/>
    </li>
  </ul>
</div>
    
     <!-- <label v-for="modeKey in modeKeys" :key="modeKey" class="flex gap-2 items-center border-base-300 border rounded-box p-3 bg-base-100">
        <span class="label">{{ modes[modeKey]?.label }}</span>
        <input type="checkbox" className="toggle toggle-md"/>
     </label> -->
</template>
<script lang="ts" setup>
import { useControlsStore } from './stores/controls'
import { useHorizontalLineMode } from './horizontalLineMode'
import { onMounted, watch, ref  } from 'vue'

const controlsStore = useControlsStore()
const drawingModeEnum = controlsStore.DrawingModeEnum

const modes = ref({
    [drawingModeEnum.NONE]: {label: 'None',  composable: () => {}, active: true},
    [drawingModeEnum.HORIZONTAL_LINE]: {label: 'Horizontal Line', composable: useHorizontalLineMode, active: false}
})

const modeKeys = Object.keys(modes.value) as (keyof typeof modes.value)[]

var useDrawingMode = ref(Object.values(modes.value).find(m => m.active)?.composable || (() => {}))
var tearDownDrawingMode: Function | null = null

function dropdownLabel() {
  if(controlsStore.drawingMode === drawingModeEnum.NONE) {
    return 'Drawing Mode'
  }
  const activeMode = Object.values(modes.value).find(m => m.active)
  return activeMode ? activeMode.label : 'Drawing Mode'
}

const callDrawingMode = () => {
    const result = useDrawingMode.value()
    return typeof result === 'function' ? result : null
}


const updateDrawingMode = (event: Event) => {
    const target = event.target as HTMLInputElement
    controlsStore.setDrawingMode(target.value as typeof drawingModeEnum[keyof typeof drawingModeEnum  ])
    target.blur()
}

watch(() => controlsStore.drawingMode, (newMode) => {
    console.log('Drawing mode changed to:', newMode)
    if(tearDownDrawingMode) {
        tearDownDrawingMode()
    }

    Object.keys(modes.value).forEach(key => {
        if(!modes.value[key as keyof typeof modes.value]) return
        modes.value[key as keyof typeof modes.value].active = key === newMode
    })

    const mode = modes.value[newMode]
    if(mode) {
        useDrawingMode.value = mode.composable
        tearDownDrawingMode  = callDrawingMode()
    }
})

onMounted(() => {
     tearDownDrawingMode  = callDrawingMode()
})


</script>
<style scoped></style>