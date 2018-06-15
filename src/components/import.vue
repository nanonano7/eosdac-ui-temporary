<template>
  <div class="row bg-white">
    <div class="col-xs-12" v-if="chooseImport">
<q-stepper class="no-shadow" style="background: #fff;" ref="stepper" no-header-navigation>
  <q-step icon="account circle" title="Account name">
    <q-field :error="accountError" :error-label="accountErrorLabel" label="Your EOS account name">
      <q-input v-model="account" />
    </q-field>
    <q-stepper-navigation>
      <q-btn :disable="badAccount" color="primary" @click="checkAccount()">Continue</q-btn>
    </q-stepper-navigation>
  </q-step>
  <q-step title="Permissions">
    <q-list class="no-border">
      <q-list-header>Permission Threshold: {{permissionThreshold}}</q-list-header>
      <q-item v-for="(perm, index) in permissions" :key="index">
        <q-item-side>
          <p class="text-truncate">Key: <b><small>{{perm.key}}</small></b></p>
          <p>Weight: <b>{{perm.weight}}</b></p>
          <q-field :error="perm.error" :error-label="perm.errorLabel" label="Private key" :label-width="12">
            <q-input @input="validatePermission(index)" type="password" v-model="permissions[index].privateKey"/>
          </q-field>
        </q-item-side>
      </q-item>
    </q-list>
    <q-stepper-navigation>
      <q-btn :disable="badPermissions" color="primary" @click="nextStep()">Continue</q-btn>
    </q-stepper-navigation>
  </q-step>
  <q-step title="Password">
    <q-field :error="passwordError" :error-label="passwordErrorLabel" label="Password" :label-width="12">
      <q-input v-model="password"  type="password" />
    </q-field>
    <q-field :error="password2Error" :error-label="password2ErrorLabel" label="Confirm Password" :label-width="12">
      <q-input v-model="password2"  type="password" />
    </q-field>
    <q-stepper-navigation>
      <q-btn :disable="finishImport" color="primary" @click="importAccount()">Continue</q-btn>
    </q-stepper-navigation>
  </q-step>
</q-stepper>
</div>
<div class="col-xs-6 text-center full-height" v-if="!chooseImport">
  <q-btn class="q-ma-xl" color="primary" @click="importKeys()">Import private key(s)</q-btn>
</div>
<div class="col-xs-6 text-center full-height" v-if="!chooseImport">
  <q-btn :disabled="!hasScatter" class="q-ma-xl" color="primary" @click="useScatter()">Use Scatter</q-btn>
  <q-alert v-if="scatterError" color="white" text-color="primary" :message="scatterErrorText" icon="info" class="q-mb-sm"/>
</div>
<Loading :visible="loading" :text="loadingText" />
</div>
</template>

<script>
import ecc from 'eosjs-ecc'
import CryptoJS from 'crypto-js'
import Loading from 'components/loading'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'import',
  components: {
    Loading
  },
  data () {
    return {
      chooseImport: false,
      account: '',
      accountObj: null,
      accountNotFound: 'lol',
      accountError: false,
      accountErrorLabel: '',
      badAccount: true,
      badPermissions: true,
      loading: false,
      loadingText: 'loading',
      permissionThreshold: 0,
      permissions: [],
      password: [],
      password2: [],
      passwordErrorLabel: '',
      password2ErrorLabel: '',
      passwordError: false,
      password2Error: false,
      finishImport: true,
      scatter: false,
      scatterError: false,
      scatterErrorText: ''
    }
  },
  computed: {
    ...mapGetters({
      hasScatter: 'api/hasScatter',
      getScatter: 'api/getScatter',
      getCurrentEndpoint: 'api/getCurrentEndpoint'
    })
  },
  methods: {
    importKeys () {
      this.chooseImport = true
    },
    useScatter () {
      this.loading = true
      this.loadingText = 'Waiting for scatter...'
      this.scatterError = false
      this.getScatter.getIdentity().then(identity => {
        console.log(identity)
        this.scatterError = false
        let current = this.getCurrentEndpoint
        const network = {
          blockchain: 'eos',
          host: current.httpEndpoint.split(':')[1].replace(/\//g, ''),
          port: current.httpEndpoint.split(':')[2] || 80,
          chainId: null
        }
        this.getScatter.suggestNetwork(network).then(() => {
          this.loading = false
          this.$store.dispatch('api/getAccount', {
            account_name: identity.name
          }).then((res) => {
            this.loading = false
            this.$store.commit('account/IMPORT_ACCOUNT', {info: this.accountObj, keys: []})
          }, (err) => {
            this.loading = false
            if (err === 'Error: notFound') {
              this.scatterError = true
              this.scatterErrorText = 'Could not find account.'
            }
          })
        }, (err) => {
          if (err) {
          }
          this.loading = false
          this.scatterError = true
          this.scatterErrorText = 'Network request was denyed. Please try again and accept the request'
        })
      }, (err) => {
        this.loading = false
        if (err.type === 'locked') {
          this.scatterError = true
          this.scatterErrorText = 'Scatter is locked. Please unlock to continue'
        } else if (err.type === 'identity_rejected') {
          this.scatterError = true
          this.scatterErrorText = 'Identity request was denyed. Please try again and accept the request'
        } else {
          this.scatterError = true
          this.scatterErrorText = err
        }
      })
    },
    checkPasswords () {
      if (this.password.length > 7) {
        if (this.password !== this.password2) {
          this.passwordError = true
          this.password2Error = true
          this.passwordErrorLabel = 'Passwords do not match'
          this.password2ErrorLabel = 'Passwords do not match'
        } else {
          this.passwordError = false
          this.password2Error = false
          this.passwordErrorLabel = ''
          this.password2ErrorLabel = ''
          this.finishImport = false
        }
      } else {
        this.passwordError = true
        this.passwordErrorLabel = 'Password has to be at least eight characters long'
      }
    },
    importAccount () {
      this.loading = true
      this.loadingText = 'Encrypting keys'
      for (let i = 0; i < this.permissions.length; i++) {
        delete this.permissions[i].error
        delete this.permissions[i].errorLabel
        if (this.permissions[i].privateKey.length && this.permissions[i].key) {
          let key = this.permissions[i].privateKey
          let encrypted = CryptoJS.AES.encrypt(key, this.password).toString()
          this.permissions[i].privateKey = encrypted
        }
      }
      this.$store.commit('account/IMPORT_ACCOUNT', {info: this.accountObj, keys: this.permissions})
      this.loading = false
      this.$emit('closeImportModal', true)
    },
    nextStep () {
      this.$refs.stepper.next()
    },
    gatherPermissions (perms) {
      for (let perm in perms) {
        if (perms[perm].perm_name === 'active') {
          let keys = perms[perm].required_auth.keys
          this.permissionThreshold = perms[perm].required_auth.threshold
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i].key
            let weight = keys[i].weight
            this.permissions.push({
              key,
              weight,
              privateKey: '',
              error: false,
              errorLabel: ''
            })
          }
        }
      }
      this.$refs.stepper.next()
      this.loading = false
    },
    validatePermission (i) {
      if (!this.permissions[i].privateKey.length) {
        this.permissions[i].error = false
        this.permissions[i].errorLabel = ''
      } else if (ecc.isValidPrivate(this.permissions[i].privateKey)) {
        if (ecc.privateToPublic(this.permissions[i].privateKey) === this.permissions[i].key) {
          this.permissions[i].error = false
          this.permissions[i].errorLabel = ''
        } else {
          this.permissions[i].error = true
          this.permissions[i].errorLabel = 'The provided private key does not match the public key'
        }
      } else {
        this.permissions[i].error = true
        this.permissions[i].errorLabel = 'The provided value is not a valid private key'
      }
      this.compareThreshold()
    },
    compareThreshold () {
      let threshold = 0
      for (let i = 0; i < this.permissions.length; i++) {
        if (!this.permissions[i].error && this.permissions[i].privateKey.length) {
          threshold++
        }
      }
      if (threshold >= this.permissionThreshold) {
        this.badPermissions = false
      } else {
        this.badPermissions = true
      }
    },
    checkAccount () {
      this.loading = true
      this.loadingText = 'Looking up account'
      this.$store.dispatch('api/getAccount', {
        account_name: this.account
      }).then((res) => {
        if (!res.permissions.length) {
          this.loading = false
          this.badAccount = true
          this.accountError = true
          this.accountErrorLabel = 'Could not find account on network'
        } else {
          this.accountObj = res
          this.gatherPermissions(res.permissions)
        }
      }, () => {
        this.badAccount = true
        this.accountError = true
        this.accountErrorLabel = 'Network error'
        this.loading = false
      })
    },
    clear () {
      this.$refs.stepper.reset()
      Object.assign(this.$data, this.$options.data())
    }
  },
  watch: {
    password () {
      this.checkPasswords()
    },
    password2 () {
      this.checkPasswords()
    },
    account (val) {
      if (!val) {
        this.accountError = false
        this.accountErrorLabel = ''
        this.badAccount = true
      } else if (!/(^[a-z1-5.]{0,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/.test(val)) {
        this.accountError = true
        this.accountErrorLabel = 'Invalid account name'
        this.badAccount = true
      } else {
        this.accountError = false
        this.accountErrorLabel = ''
        this.badAccount = false
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
