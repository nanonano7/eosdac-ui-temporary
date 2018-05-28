<template>
<q-card flat class="q-mb-sm">
  <q-card-title class="text-primary">
    <div class="q-title">Unlock account: <b>{{getAccount.account_name}}</b></div>
  </q-card-title>
  <q-card-main>
    <q-field :error="error" icon="vpn key" label="Password" error-label="Incorrect password" :label-width="12">
      <q-input type="password" v-model="password" />
    </q-field>
  </q-card-main>
  <q-card-actions>
    <q-btn color="primary" @click="unlock()">Login</q-btn>
  </q-card-actions>
</q-card>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      error: false
    }
  },
  methods: {
    unlock () {
      this.$store.dispatch('account/unlockAccount', this.password).then(() => {

      }, (err) => {
        if (err) {
          this.error = true
        }
      })
    },
    clear () {
      Object.assign(this.$data, this.$options.data())
      this.$emit('closeLoginModal', true)
    }
  },
  computed: {
    ...mapGetters({
      getAccount: 'account/getAccount'
    })
  },
  watch: {
    password () {
      this.error = false
    }
  }
}
</script>

<style>
</style>
