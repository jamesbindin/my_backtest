<script setup lang="ts">
import { onMounted } from 'vue'
import { inject } from 'vue'

const axios: any = inject('axios')

onMounted(() => {
  axios.get('bars/EURUSD/D1', {
    params: {
      timefrom: '2020-01-01T00:00',
      timeto: '2020-12-31T23:59'
    }
  }).then((response: any) => {
    console.log(response)
    console.log(response.data)
  }).catch((error: any) => {
    console.error('Error fetching data:', error)
  })
})

</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
