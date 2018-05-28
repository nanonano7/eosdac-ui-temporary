<template>
<q-modal v-model="active">
  <q-card flat class="q-mb-sm">
    <q-card-title class="text-primary">
      <div class="q-title">Transaction</div>
    </q-card-title>
    <q-card-main>
      <q-list no-border>
        <q-item>
          <q-item-main label="Code" />
          <q-item-side right>
            eosdac
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Action" />
          <q-item-side right>
            approveproposal
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Data" />
          <q-item-side right>
            000000000041934b000000008041934be803000000000000
          </q-item-side>
        </q-item>
      </q-list>
    </q-card-main>
    <q-card-actions>
      <q-btn color="red">Cancel</q-btn>
      <q-btn class="float-right" color="primary">Send</q-btn>
    </q-card-actions>
  </q-card>
</q-modal>
</template>

<script>
export default {
  name: 'TransactionPopUp',
  model: {
    prop: 'active',
    event: 'transactionpopup'
  },
  props: {
    active: Boolean
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
