<template>
    <div ref="tooltipRef" class="absolute pointer-events-none text-nowrap bg-white border border-gray-300 rounded p-2" :style="calculateTooltipPosition()">
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="text-sm text-gray-800">{{ paragraph }}</p>
    </div>
</template>
<script lang="ts" setup>
import { useTemplateRef } from 'vue';


const props = defineProps({
    paragraphs: {
        type: Array as () => string[],
        required: true
    },
    position: {
        type: Object as () => {x: number, y: number},
        required: true
    }
})

const tooltipRef = useTemplateRef('tooltipRef')

function calculateTooltipPosition() {
    const tooltipWidth = tooltipRef.value?.offsetWidth ?? 0
    const tooltipHeight = tooltipRef.value?.offsetHeight ?? 0
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    let positionX = props.position.x
    let positionY = props.position.y
    console.log(positionX)
    if(positionX + tooltipWidth > viewportWidth) {
        positionX = viewportWidth - tooltipWidth - 10
    } 
    if(positionY + tooltipHeight > viewportHeight) {
        positionY = viewportHeight - tooltipHeight - 10
    }
    return {
        left: positionX + 'px',
        top: positionY + 'px'
    }
}

</script>
<style scoped></style>