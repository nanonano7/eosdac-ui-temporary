<template>
<q-page padding>
  <div class="row justify-center">
    <div class="col-xs-8">
      <q-card class="text-center" text-color="primary">
        <span class="q-display-3">4852.0262101</span><span class="q-headline"> eosDAC</span>
      </q-card>
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-xs-12 text-center">
      <q-btn class="q-ma-sm" size="xl" color="primary" icon="call_made" label="SEND" @click="sendaction = true"/>
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-xs-12">
      <q-card class="q-ma-sm text-center">
        <q-tabs class="tab-tranp" align="center" no-pane-border>
          <q-tab color="primary" default slot="title" name="tab-1">All</q-tab>
          <q-tab color="primary" slot="title" name="tab-2">Sent</q-tab>
          <q-tab color="primary" slot="title" name="tab-3">Recieved</q-tab>
          <q-tab-pane name="tab-1">
            <q-list>
              <q-item>
                <q-item-side icon="call_made" color="primary" />
                <q-item-main>
                  <b>245.02450245601</b> eosDac sent to <b>accounname</b>
                </q-item-main>
                <q-item-side right>
                  <q-item-tile stamp>1 week ago</q-item-tile>
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-side icon="call_received" color="primary" />
                <q-item-main>
                  <b>245.02450245601</b> eosDac received from <b>accounname</b>
                </q-item-main>
                <q-item-side right>
                  <q-item-tile stamp>1 week ago</q-item-tile>
                </q-item-side>
              </q-item>
            </q-list>
          </q-tab-pane>
        </q-tabs>
      </q-card>
    </div>
  </div>
  <q-modal v-model="sendaction" ref="sendModal" v-on:hide="clearImport()" :content-css="{minWidth: '50vw', minHeight: '80vh', background: 'none', boxShadow: 'none'}">
    <q-modal-layout>
      <q-btn class="noshadow" @click="sendaction = false" icon="clear" color="red" />
      <Send ref="Send" v-on:closeSendModal="closeSendModal()" />
    </q-modal-layout>
  </q-modal>
</q-page>
</template>

<script>
import Send from 'components/send'
export default {
  name: 'wallet',
  components: {
    Send
  },
  data () {
    return {
      sendaction: false
    }
  },
  methods: {
    clearImport () {
      this.$refs.Send.clear()
    },
    closeSendModal () {
      this.$refs.sendModal.hide()
    }
  }
}
</script>

<style>
.noshadow {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
