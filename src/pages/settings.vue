<template>
<q-page padding>
  <div class="row">
    <div class="col-xs-12 col-sm-4">
      <q-card class="relative-position">
        <q-card-title>
          Endpoints
          <q-btn color="primary" class="float-right" label="Add" @click="addendpoint = true" />
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div v-if="getCurrentEndpoint">
          <q-item dark>
            <q-item-side>
              <q-icon v-if="!connError" color="green" name="done" size="2rem"/>
              <q-icon v-else color="warning" name="warning" size="2rem"/>
            </q-item-side>
            <q-item-main :label="getCurrentEndpoint.httpEndpoint">
              <span class="q-caption">Ping: {{getCurrentEndpoint.ping + ' ms'}} | </span>
              <span class="q-caption">Last connection: {{ tsToDate(getCurrentEndpoint.lastConnection) | moment('from', 'now')}}</span>
            </q-item-main>
          </q-item>
        </div>
          <q-list no-border>
            <q-item inset v-for="(item, index) in getEndpoints" :key="index" v-if="item.httpEndpoint !== getCurrentEndpoint.httpEndpoint">
              <q-item-side>
                <q-btn color="primary" @click="change(item.httpEndpoint)">Use</q-btn>
              </q-item-side>
              <q-item-main :label="item.httpEndpoint">
                <span class="q-caption">Ping: {{item.ping + ' ms'}} | </span>
                <span class="q-caption">Last connection: {{ tsToDate(item.lastConnection) | moment('from', 'now')}}</span>
              </q-item-main>
              <q-item-side right>
                <q-btn flat color="red" @click="remove(item.httpEndpoint)" icon="clear" />
              </q-item-side>
            </q-item>
          </q-list>
        </q-card-main>
        <LoadingSpinner :visible="loading" :text="loadingText" />
      </q-card>
    </div>
  </div>
  <q-modal v-model="addendpoint" ref="endpointModal" v-on:hide="clearendpointref()" :content-css="{minWidth: '50vw', minHeight: '80vh', background: 'none', boxShadow: 'none'}">
    <q-modal-layout>
      <q-btn class="noshadow" @click="addendpoint = false" icon="clear" color="red" />
      <AddEndpoint ref="endpointref" v-on:closeendpointModal="closeendpointModal()" />
    </q-modal-layout>
  </q-modal>
</q-page>
</template>

<script>
import LoadingSpinner from 'components/loading-spinner'
import AddEndpoint from 'components/add-endpoint'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'settings',
  components: {
    AddEndpoint,
    LoadingSpinner
  },
  data () {
    return {
      addendpoint: false,
      loading: false,
      loadingText: '',
      connError: false,
      connErrorText: '',
      connErrorTextDetail: '',
      connErrorIcon: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrentEndpoint: 'api/getCurrentEndpoint',
      getEndpoints: 'api/getEndpoints'
    })
  },
  methods: {
    clearendpointref () {
      this.$refs.endpointref.clear()
    },
    closeendpointModal () {
      this.$refs.endpointModal.hide()
    },
    remove (url) {
      this.$store.commit('api/REMOVE_ENDPOINT', url)
    },
    change (url) {
      this.loading = true
      this.loadingText = 'connecting...'
      this.$store.dispatch('api/changeEndpoint', url).then(() => {
        this.$store.dispatch('api/pingAndGetInfo').then(() => {
          this.loading = false
          if (this.getCurrentEndpoint.lastConnectionStatus === 2) {
            this.connError = true
            this.connErrorText = 'Blockchain data is out of sync!'
            this.connErrorIcon = 'warning'
            this.connErrorTextDetail = 'The api endpoint might be stuck or your local time is incorrect.'
          } else if (this.getCurrentEndpoint.lastConnectionStatus === 1) {
            this.connError = true
            this.connErrorText = 'Could not connect to endpoint!'
            this.connErrorIcon = 'warning'
            this.connErrorTextDetail = 'The api endpoint maybe offline or set up incorrectly.'
          } else {
            this.connError = false
          }
        }, (err) => {
          if (err) {
            this.connError = true
            this.connErrorText = 'Could not connect to endpoint!'
            this.connErrorIcon = 'warning'
            this.connErrorTextDetail = 'The api endpoint maybe offline or set up incorrectly.'
            this.loading = false
          }
        })
      })
    },
    tsToDate (ts) {
      return new Date(ts).toISOString()
    }
  },
  mounted () {
    this.$store.dispatch('api/pingAndGetInfo').then(() => {
      this.loading = false
      if (this.getCurrentEndpoint.lastConnectionStatus === 2) {
        this.connError = true
        this.connErrorText = 'Blockchain data is out of sync!'
        this.connErrorIcon = 'warning'
        this.connErrorTextDetail = 'The api endpoint might be stuck or your local time is incorrect.'
      } else if (this.getCurrentEndpoint.lastConnectionStatus === 1) {
        this.connError = true
        this.connErrorText = 'Could not connect to endpoint!'
        this.connErrorIcon = 'warning'
        this.connErrorTextDetail = 'The api endpoint maybe offline or set up incorrectly.'
      } else {
        this.connError = false
      }
    }, (err) => {
      if (err) {
        this.connError = true
        this.connErrorText = 'Could not connect to endpoint!'
        this.connErrorIcon = 'warning'
        this.connErrorTextDetail = 'The api endpoint maybe offline or set up incorrectly.'
        this.loading = false
      }
    })
  }
}
</script>

<style>
</style>
