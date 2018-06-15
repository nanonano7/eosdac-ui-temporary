<template>
<q-inner-loading  v-bind:visible="visible" v-on:change="$emit('change', $event.target.visible)">
  <span class="q-headline animate-blink">{{text}}</span>
</q-inner-loading>
</template>

<script>
export default {
  name: 'Loading',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: Boolean,
    text: String
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
