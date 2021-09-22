<template>
  <div class="transactions">
    <transactions
      :address="$route.params.address"
      type="transactions"
      :total="transactionsCount"
    >
      <transaction
        slot="transaction"
        slot-scope="{ transaction }"
        :transaction="transaction"
      />
    </transactions>
  </div>
</template>
<script>
export default {
  components: {
    transaction: () => import('~/components/Transaction.vue'),
    transactions: () => import('~/components/AddressTransactionList.vue')
  },
  props: {
    transactionsCount: {
      type: Number,
      default: () => 0
    }
  }
}
</script>
