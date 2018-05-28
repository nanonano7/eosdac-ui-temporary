<template>
<q-card class="q-pa-xl" color="white" text-color="black">
  <q-field class="q-mb-md" :error="accountError" :error-label="accountErrorLabel" label="To:" :label-width="12">
    <q-checkbox v-model="addContact" label="Add contact" />
    <q-input v-model="account">
      <q-btn-dropdown flat color="primary" label="Contacts">
        <q-list link>
    <q-item>
      <q-item-main>
        <q-item-tile label>my.buddy</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</q-btn-dropdown>
    </q-input>
  </q-field>
  <q-field :error="amountError" :error-label="amountErrorLabel" label="Amount" :label-width="12">
    <q-input type="number" v-model="amount">
      <q-select suffix v-model="select" :options="[
          {
            label: 'eosDAC',
            value: 'eosDAC'
          }]" />
    </q-input>
  </q-field>
  <q-input v-model="area" type="textarea" float-label="Memo" rows="2" />
  <LoadingSpinner :visible="loading" :text="loadingText" />
</q-card>
</template>

<script>
import LoadingSpinner from 'components/loading-spinner'
export default {
  name: 'send',
  components: {
    LoadingSpinner
  },
  data () {
    return {
      loading: false,
      loadingText: '',
      select: 'eosDAC',
      badSend: true,
      addContact: false,
      account: '',
      accountError: false,
      accountErrorLabel: '',
      amount: 0,
      amountError: false,
      amountErrorLabel: '',
      area: ''
    }
  },
  methods: {
    clear () {
      Object.assign(this.$data, this.$options.data())
    }
  },
  watch: {
    amount (val) {
      if (!val) {
        this.amountError = false
        this.amountErrorLabel = ''
        this.badsend = true
      } else if (isNaN(val)) {
        this.amountError = true
        this.amountErrorLabel = 'Invalid amount'
        this.badsend = true
      } else {
        this.amountError = false
        this.amountErrorLabel = ''
        this.badsend = false
      }
    }
  }
}
</script>

<style>
</style>
