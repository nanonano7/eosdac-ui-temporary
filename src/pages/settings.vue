<template>
<q-page padding>
  <div class="row">
    <div class="col-xs-12 col-sm-4">
      <q-card class="q-ma-sm relative-position">
        <q-card-title>
          Endpoints
          <q-btn color="primary" class="float-right" label="Add" @click="addendpoint = true" />
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div v-if="getCurrentEndpoint">
          <q-item dark>
            <q-item-side>
              <q-icon v-if="getCurrentEndpoint.lastConnectionStatus === 0" color="green" name="done" size="2rem"/>
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
        <q-card class="q-pa-sm no-shadow">

        <q-field
          class="q-ma-sm"
          label="Update interval"
          :error="intervalError"
          :error-label="intervalErrorText"
          >
          <span>{{connInterval}} seconds</span>
          <q-slider
          v-model="connInterval"
          :min="1"
          :max="300"
          :step="1"
        />
        </q-field>
        <q-field
          class="q-ma-sm"
          label="Connection timeout"
          :error="timeoutError"
          :error-label="timeoutErrorText"
          >
          <span>{{timeout}} seconds</span>
          <q-slider
          v-model="timeout"
          :min="1"
          :max="15"
          :step="1"
        />
        </q-field>
        <q-card-actions>
          <q-btn @click="changeIntervals()" v-if="timeout !== getConnectionTimeout / 1000 || connInterval !== getConnectionInterval / 1000" color="primary" label="Update"/>
        </q-card-actions>
      </q-card>
      <Loading :visible="loading" :text="loadingText" />
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-4">
      <q-card class="q-ma-sm">
        <q-card-title>
          Miscellaneous
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-item>
            <q-item-main label="">
              <q-field
                class="q-ma-sm"
                label="Autolock account"
                >
                <q-toggle @input="setAutolock()" v-model="autolock" />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item v-if="autolock">
            <q-item-main label="">
              <q-field
                class="q-ma-sm"
                label="Lock account after "
                >
                <q-select @input="setAutolock()" v-model="autoLockTimeout" :options="[
            {
            label: '30 seconds',
            value: 30
            },
            {
              label: '60 seconds',
              value: 60
            },
            {
              label: '5 Minutes',
              value: 300
            },
            {
              label: '10 Minutes',
              value: 600
            },
            {
              label: '30 Minutes',
              value: 1800
            },
            {
              label: '1 Hour',
              value: 3600
            }
            ]" />
              </q-field>
            </q-item-main>
          </q-item>
        </q-card-main>
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
import Loading from 'components/loading'
import AddEndpoint from 'components/add-endpoint'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'settings',
  components: {
    AddEndpoint,
    Loading
  },
  data () {
    return {
      addendpoint: false,
      loading: false,
      loadingText: '',
      connError: false,
      connErrorText: '',
      connErrorTextDetail: '',
      connErrorIcon: null,
      connInterval: 0,
      intervalError: false,
      intervalErrorText: '',
      timeout: 0,
      timeoutError: false,
      timeoutErrorText: '',
      autolock: true,
      autoLockTimeout: 300
    }
  },
  computed: {
    ...mapGetters({
      getCurrentEndpoint: 'api/getCurrentEndpoint',
      getEndpoints: 'api/getEndpoints',
      getConnectionTimeout: 'api/getConnectionTimeout',
      getConnectionInterval: 'api/getConnectionInterval'
    })
  },
  methods: {
    changeIntervals () {
      this.$store.commit('api/CHANGE_INTERVALS', {connectionTimeoutMilSec: this.timeout * 1000, checkIntervalMilSec: this.connInterval * 1000})
    },
    setAutolock () {
      this.$store.commit('account/SET_AUTOLOCK', {autolock: this.autolock, autolockIntervalSec: this.autoLockTimeout})
    },
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
  watch: {
    timeout (val) {
      this.timeout = Math.round(val)
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
    this.timeout = this.getConnectionTimeout / 1000
    this.connInterval = this.getConnectionInterval / 1000
  }
}
</script>

<style>
</style>
