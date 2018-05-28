<template>
<q-page padding>
  <!-- content -->
  <TransactionPopUp v-model="lol"></TransactionPopUp>
</q-page>
</template>

<script>
import TransactionPopUp from 'components/transaction-popup'
export default {
  components: {
    TransactionPopUp
  },
  data () {
    return {
      lol: true
    }
  }
}
// name: 'PageName',
</script>

<style>
</style>
