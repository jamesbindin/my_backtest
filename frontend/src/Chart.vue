<template>
   <svg :width="width" :height="height">
      <ChartXScale :data="props.data" :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" @update:x="updateX"/>
      <ChartYScale :data="props.data" :width="props.width" :height="props.height" :margin-x="props.marginX" :margin-y="props.marginY" @update:y="updateY"/>
    <g v-if="x && y" v-for="d in data" :key="d.time">
      <Candlestick :d="d" :stroke-width="0.3" :x="x" :y="y"/>
    </g>
  </svg> 
  <div class="buttons flex gap-2">
      <button class="btn" @click="$emit('step-back')">Step Back</button>
      <button class="btn" @click="$emit('step-forward')">Step Forward</button>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import Candlestick from './Candlestick.vue'
import ChartXScale from './ChartXScale.vue'
import ChartYScale from './ChartYScale.vue'

const props = defineProps({
  data: {
    type: [Object],
    required: true
  }, 
  width: {
    type: Number,
    default: 640
  },
  height: {
    type: Number,
    default: 400
  },
  marginX: {
    type: Number,
    default: 40
  },
  marginY: {
    type: Number,
    default: 40
  }
})

defineEmits(['step-back', 'step-forward'])

let y = ref();
let x = ref();

function updateX(newX: any) {
  x.value = newX
}

function updateY(newY: any) {
  y.value = newY
}

</script>

<style scoped>
</style>