<template>
    <Tooltip v-for="(tooltip, index) in tooltipStore.tooltips" :key="index" :paragraphs="tooltip.paragraphs" :position="tooltip.position"/>
</template>
<script setup lang="ts">
import { useTooltipStore } from './stores/tooltips'
import Tooltip from './Tooltip.vue'

const tooltipStore = useTooltipStore()

</script>
<style></style>