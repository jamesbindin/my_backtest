<script setup lang="ts">
import { onMounted } from 'vue'
import { inject, ref } from 'vue'
import Chart from './Chart.vue'

const axios: any = inject('axios')
const data = ref([])

onMounted(() => {
  axios.get('bars/EURUSD/M15', {
    params: {
      timefrom: '2020-01-01T00:00',
      limit: 150
    }
  }).then((response: any) => {
    data.value = response.data
  }).catch((error: any) => {
    console.error('Error fetching data:', error)
  })
})

</script>
<template>
  <Chart v-if="data.length" :data="data"/>
</template>

<style scoped>
</style>
