<template>
<q-layout view="lHh Lpr lFf">
  <q-layout-header>
    <q-toolbar color="primary">
      <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" color="white">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title class="text-primary text-white">
        <div class="q-headline">
          <img alt="EOSDAC" style="max-height:30px; color: white; margin-bottom:-5px; margin-right:-5px;" src="~assets/eosdac_logo.png"> eosDAC
        </div>
      </q-toolbar-title>
      <q-btn v-if="getAccount.account_name && !unlocked" @click="loginaction = true" color="white" text-color="primary">unlock account</q-btn>
      <div v-if="!getAccount.account_name">
        <q-chip v-if="getCurrentEndpoint.lastConnectionStatus !== 0" pointing="right" dense square icon="warning" color="secondary">
          Requires active api connection
        </q-chip>
      <q-btn :disabled="getCurrentEndpoint.lastConnectionStatus !== 0" @click="importaction = true" color="white" text-color="primary">import account</q-btn>
    </div>
      <q-btn-dropdown v-if="getAccount.account_name && unlocked" :label="getAccount.account_name" color="white" text-color="primary">
        <q-list>
          <q-item>
            <q-item-main>
              <q-item-tile label>Lock account</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-layout-header>

  <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
    <q-list no-border link inset-delimiter>
      <q-list-header>Proposals</q-list-header>
      <q-item to="/proposals">
        <q-item-side icon="assignment turned in" />
        <q-item-main label="POROPOSALS" sublabel="Index of all proposals" />
        <q-chip color="primary">22</q-chip>
      </q-item>
      <q-item to="/createproposal">
        <q-item-side icon="create" />
        <q-item-main label="CREATE PROPOSAL" sublabel="Create and submit a proposal" />
      </q-item>
      <q-list-header>Custodians</q-list-header>
      <q-item to="/custodians">
        <q-item-side icon="assignment ind" />
        <q-item-main label="CUSTODIANS" sublabel="Index of all custodians and candidates" />
      </q-item>
      <q-list-header>Account</q-list-header>
      <q-item v-if="getAccount.account_name" to="/myaccount">
        <q-item-side icon="perm identity" />
        <q-item-main label="ACCOUNT" sublabel="Change account info and settings" />
      </q-item>
      <q-item to="/wallet">
        <q-item-side icon="toll" />
        <q-item-main label="Wallet" sublabel="Manage your eosDAC tokens" />
      </q-item>
      <q-item to="/settings">
        <q-item-side icon="settings" />
        <q-item-main label="SETTINGS" />
      </q-item>
    </q-list>
  </q-layout-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
  <q-modal v-model="loginaction" ref="loginModal" v-on:hide="clearLogin()" :content-css="{minWidth: '50vw', minHeight: '80vh', background: 'none', boxShadow: 'none'}">
    <q-modal-layout>
      <q-btn @click="loginaction = false" icon="clear" color="red" class="no-shadow"/>
      <Login ref="Login" v-on:closeImportModal="closeLoginModal()" />
    </q-modal-layout>
  </q-modal>
  <q-modal v-model="importaction" ref="importModal" v-on:hide="clearImport()" :content-css="{minWidth: '50vw', minHeight: '80vh', background: 'none', boxShadow: 'none'}">
    <q-modal-layout>
      <q-btn @click="importaction = false" icon="clear" color="red" class="no-shadow"/>
      <Import ref="Import" v-on:closeImportModal="closeImportModal()" />
    </q-modal-layout>
  </q-modal>
  <q-page-sticky position="bottom" v-if="alert.active">
<q-alert :actions="[
          { label: 'Settings', handler: () => { this.$router.push('/settings') } }
        ]" :color="alert.color" :message="alert.errorText" :detail="alert.errorTextDetail" :icon="alert.errorIcon" class="q-mb-sm"/>
  </q-page-sticky>
</q-layout>
</template>

<script>
import {
  openURL
} from 'quasar'
import {
  mapGetters
} from 'vuex'
import Login from 'components/login'
import Import from 'components/import'
export default {
  name: 'LayoutDefault',
  components: {
    Login,
    Import
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      loginaction: false,
      importaction: false,
      alert: {
        active: false,
        color: 'red',
        errorText: '',
        errorTextDetail: '',
        errorIcon: ''
      }

    }
  },
  computed: {
    ...mapGetters({
      getAccount: 'account/getAccount',
      getCurrentEndpoint: 'api/getCurrentEndpoint',
      getConnectionInterval: 'api/getConnectionInterval',
      unlocked: 'account/unlocked'
    })
  },
  methods: {
    clearImport () {
      this.$refs.Import.clear()
    },
    closeImportModal () {
      this.$refs.importModal.hide()
    },
    clearLogin () {
      this.$refs.Login.clear()
    },
    closeLogintModal () {
      this.$refs.loginModal.hide()
    },
    pingCurrentEndpoint () {
      this.$store.dispatch('api/pingAndGetInfo').then(() => {
        if (this.getCurrentEndpoint.lastConnectionStatus === 2) {
          this.alert.active = true
          this.alert.errorText = 'Blockchain data is out of sync!'
          this.alert.color = 'warning'
          this.alert.errorIcon = 'warning'
          this.alert.errorTextDetail = 'The api endpoint might be stuck or your local time is incorrect.'
        } else if (this.getCurrentEndpoint.lastConnectionStatus === 1) {
          this.alert.active = true
          this.alert.errorText = 'Could not connect to endpoint!'
          this.alert.color = 'negative'
          this.alert.errorIcon = 'warning'
          this.alert.errorTextDetail = 'The api endpoint might be offline or is set up incorrectly.'
        } else if (this.getCurrentEndpoint.lastConnectionStatus === 0) {
          this.alert.active = false
        }
      }, () => {
        this.alert.active = true
        this.alert.errorText = 'Could not connect to endpoint!'
        this.alert.color = 'negative'
        this.alert.errorIcon = 'warning'
        this.alert.errorTextDetail = 'The api endpoint might be offline or is set up incorrectly.'
      })
    },
    openURL
  },
  created () {
    document.addEventListener('scatterLoaded', scatterExtension => {
      if (window.scatter) {
        this.$store.commit('api/SCATTER_AVAILABLE', window.scatter)
        window.scatter = null
      } else {
        this.$store.commit('api/SCATTER_UNAVAILABLE')
      }
    })
  },
  mounted () {
    this.pingCurrentEndpoint()
    setInterval(this.pingCurrentEndpoint, this.getConnectionInterval)
  }
}
</script>

<style>
</style>
