<template>
<q-page padding>
  <div class="row justify-center">
    <div class="col-xs-6 q-ma-sm">
      <q-card class="text-center" text-color="primary">
        <span class="q-display-3">{{eosdacBalance}}</span><span class="q-headline"> eosDAC</span>
      </q-card>
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-xs-6 q-ma-sm">
      <q-card class="q-pa-xl" color="white" text-color="black">
        <q-checkbox v-model="addContact" label="Add to contacts" />
        <q-field class="q-mb-md" :error="accountError" :error-label="accountErrorLabel" label="To:" :label-width="12">
          <q-input v-model="account">
            <q-btn-dropdown :disabled="!getContacts" flat color="primary" label="Contacts">
              <q-list link>
          <q-item v-for="(contact, index) in getContacts" :key="index" v-close-overlay @click.native="pickContact(contact)">
            <q-item-main>
              <q-item-tile label>{{contact}}</q-item-tile>
            </q-item-main>
            <q-item-side right color="red" icon="clear" @click.native="removeContact(contact)"/>
          </q-item>
        </q-list>
      </q-btn-dropdown>
          </q-input>
        </q-field>
        <q-field :error="amountError" :error-label="amountErrorLabel" label="Amount" :label-width="12">
          <q-input type="number" suffix="eosDAC" v-model="amount">
          </q-input>
        </q-field>
        <q-field class="q-mt-md" label="Memo" :label-width="12">
        <q-input v-model="memo" type="textarea" rows="2" />
        </q-field>
        <q-card-actions align="end">
            <q-btn :disable="badSend" class="q-ma-sm" color="primary" label="Transfer" @click="transfer()"/>
        </q-card-actions>
      </q-card>
  </div>
</div>
  <Loading :visible="loading" :text="loadingText" />
</q-page>
</template>

<script>
import Loading from 'components/loading'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'wallet',
  components: {
    Loading
  },
  data () {
    return {
      loading: false,
      loadingText: '',
      badSend: true,
      addContact: false,
      account: '',
      accountError: false,
      accountErrorLabel: '',
      amount: null,
      amountError: false,
      amountErrorLabel: '',
      memo: '',
      sendaction: false,
      hasEosdac: false,
      eosdacBalance: null
    }
  },
  methods: {
    transfer () {
      this.loading = true
      this.loadingText = 'Pushing transaction...'
      if (this.addContact) {
        this.$store.commit('account/ADD_CONTACT', this.account)
      }
      this.$store.dispatch('api/transfer', {to: this.account, amount: this.amount, token: 'EOSDAC', memo: this.memo}).then((res) => {
        this.getBalances()
        this.loading = false
      }, (err) => {
        this.loading = false
        if (JSON.parse(err.message).error.name === 'account_query_exception') {
          this.accountError = true
          this.accountErrorLabel = 'Account does not exist'
        }
      })
    },
    pickContact (contact) {
      this.account = contact
    },
    removeContact (contact) {
      this.$store.commit('account/REMOVE_CONTACT', contact)
    },
    checkTransfer () {
      if (!this.accountError && !this.amountError && this.amount && this.account) {
        this.badSend = false
      } else {
        this.badSend = true
      }
    },
    getBalances () {
      this.loading = true
      this.loadingText = 'Retrieving balances...'
      this.$store.dispatch('api/getBalances', {account: 'alice'}).then((res) => {
        for (let i = 0; i < res.rows.length; i++) {
          let balance = res.rows[i].balance
          if (balance.split(' ')[1] === 'EOSDAC') {
            this.eosdacBalance = Number(balance.split(' ')[0])
            this.hasEosdac = true
          }
        }
        if (!this.eosdacBalance) {
          this.hasEosdac = false
        }
        this.loading = false
      }, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getAccount: 'account/getAccount',
      getContacts: 'account/getContacts',
      unlocked: 'account/unlocked'
    })
  },
  watch: {
    amount (val) {
      if (!val) {
        this.amountError = false
        this.amountErrorLabel = ''
        this.checkTransfer()
      } else if (isNaN(val)) {
        this.amountError = true
        this.amountErrorLabel = 'Invalid amount'
        this.checkTransfer()
      } else if (this.eosdacBalance < val) {
        this.amountError = true
        this.amountErrorLabel = 'Invalid amount'
        this.checkTransfer()
      } else {
        this.amountError = false
        this.amountErrorLabel = ''
        this.checkTransfer()
      }
    },
    account (val) {
      if (!val) {
        this.accountError = false
        this.accountErrorLabel = ''
        this.checkTransfer()
      } else if (!/(^[a-z1-5.]{0,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/.test(val)) {
        this.accountError = true
        this.accountErrorLabel = 'Invalid account name'
        this.checkTransfer()
      } else {
        this.accountError = false
        this.accountErrorLabel = ''
        this.checkTransfer()
      }
    }
  },
  mounted () {
    this.getBalances()
  }
}
</script>

<style>
.noshadow {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
