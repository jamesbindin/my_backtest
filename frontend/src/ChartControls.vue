<template>
  <div class="buttons flex gap-4 mt-2 items-center">
     <label v-for="mode, key in controlsStore.modes" :key="mode.label" class="flex gap-2 items-center border-base-300 border rounded-box p-3 bg-base-100">
        <span class="label">{{ mode.label }}</span>
        <input type="checkbox" className="toggle toggle-md" :checked="isChecked(key)" @change="checkboxChanged(key)" />
     </label>
    <DaisyUiThemeSelector></DaisyUiThemeSelector>
  </div>
</template>
<script lang="ts" setup>
import DaisyUiThemeSelector from './DaisyUiThemeSelector.vue'
import { useControlsStore } from './stores/controls'

const controlsStore = useControlsStore()

const props = defineProps({
    width: {
        type: Number,
        default: 640
    },
    height: {
        type: Number,
        default: 400
    },
})

function isChecked(key: string) {
    return (controlsStore.activeModes as Record<string, any>)[key]
}

function checkboxChanged(key: string) {
    const isActive = isChecked(key)
    const modeKey = key as keyof typeof controlsStore.modes

    if(isActive) {
        var activeModesCopy = {...controlsStore.activeModes}
        delete activeModesCopy[modeKey]
        controlsStore.activeModes = activeModesCopy
    } else {
        var activeModesCopy = {...controlsStore.activeModes}
        activeModesCopy[modeKey] = controlsStore.modes[modeKey]
        controlsStore.activeModes = activeModesCopy
    }
}

</script>
<style scoped>
</style>