<template>
  <div class="dropdown">
  <div tabindex="0" role="button" class="btn" >
    <p>Theme</p>
    <svg
      width="12px"
      height="12px"
      class="inline-block h-2 w-2 fill-current opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    </svg>
  </div>
  <ul tabindex="-1" class="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl h-96 overflow-y-auto">
    <li v-for="theme in daisyUiThemes" :key="theme">
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        :aria-label="theme"
        :value="theme"
        :checked="controlsStore.theme === theme"
        @change="event => setTheme(event)"/>
    </li>
  </ul>
</div>
</template>

<script lang="ts" setup>
import { useControlsStore } from './stores/controls'
import { useTemplateRef } from 'vue'

const controlsStore = useControlsStore()

const dropdown = useTemplateRef('dropdown')

let daisyUiThemes = [
    'light',
    'dark', 
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abiss',
    'silk'
]



function setTheme(event: Event) {
    const theme = (event.target as HTMLInputElement).value;
    controlsStore.setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    (event.target as HTMLInputElement).blur();

}

</script>
<style scoped></style>