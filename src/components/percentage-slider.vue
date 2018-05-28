<template>
  <q-progress
  :percentage="value"
  color="green"
  height="10px"/>
</template>

<script>
export default {
  name: 'PercentageSlider',
  props: [
    'value'
  ],
  data () {
    return {}
  },
  computed: {
    label () {
      return this.value + '%'
    }
  }
}
</script>

<style scoped>
.q-slider-label {
  left: 0 !important;
}
.q-slider-track {
  min-height: 10px !important;
}
</style>
