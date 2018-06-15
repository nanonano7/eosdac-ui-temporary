<template>
<q-card class="q-pa-xl" color="white" text-color="black">
  <q-field class="q-mb-md" :error="urlError" :error-label="urlErrorLabel" label="Endpoint URL (SSL strongly recommended)" :label-width="12">
    <q-input v-model="url">
    </q-input>
  </q-field>
  <q-btn class="q-ma-sm float-right" :disable="badEndpoint" color="primary" @click="add()">Add</q-btn>
  <Loading :visible="loading" :text="loadingText" />
</q-card>
</template>

<script>
import Loading from 'components/loading'
export default {
  name: 'addendpoint',
  components: {
    Loading
  },
  data () {
    return {
      loading: false,
      loadingText: '',
      url: 'https://',
      urlError: false,
      urlErrorLabel: '',
      badEndpoint: true
    }
  },
  methods: {
    clear () {
      Object.assign(this.$data, this.$options.data())
      this.$emit('closeendpointModal', true)
    },
    add () {
      let newEndpoint = {
        keyProvider: null,
        httpEndpoint: this.url,
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: true,
        ping: null,
        lastConnectionUnix: null,
        lastConnection: null,
        lastConnectionStatus: null
      }
      this.$store.commit('api/ADD_ENDPOINT', newEndpoint)
      this.clear()
    },
    validate (url) {
      var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
      if (pattern.test(url)) {
        return true
      }
      return false
    }
  },
  watch: {
    url (val) {
      if (!val) {
        this.urlError = false
        this.urlErrorLabel = ''
        this.badEndpoint = true
      } else if (!this.validate(val)) {
        this.urlError = true
        this.urlErrorLabel = 'Invalid URL'
        this.badEndpoint = true
      } else {
        this.urlError = false
        this.urlErrorLabel = ''
        this.badEndpoint = false
      }
    }
  }
}
</script>

<style>
</style>
