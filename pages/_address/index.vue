<template>
  <div class="transactions-body">
    <transaction
      v-for="transaction in $store.getters['address/allTransactions']"
      :key="transaction.hash"
      :transaction="transaction"
    />
  </div>
</template>
<script>
import { paginationMixin } from '@/mixins/pagination'
export default {
  components: {
    transaction: () => import('~/components/transactions/Transaction.vue')
  },
  mixins: [paginationMixin],
  async fetch() {
    await this.$store.dispatch('address/getTransactions', {
      address: this.$route.params.address,
      page: this.page,
      offset: this.pageSize
    })
  }
}
</script>
