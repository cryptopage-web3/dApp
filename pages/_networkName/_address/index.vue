<template>
  <div class="transactions-body">
    <transaction
      v-for="transaction in transactions"
      :key="transaction.hash"
      :transaction="transaction"
    />
    <loader v-if="loading" />
  </div>
</template>
<script>
import { paginationMixin } from '@/mixins/pagination'
export default {
  components: {
    transaction: () => import('~/components/transactions/Transaction.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue')
  },

  mixins: [paginationMixin],

  data: () => ({
    loading: true
  }),

  async fetch() {
    this.loading = true

    await this.$store.dispatch('address/getTransactions', {
      address: this.$route.params.address,
      page: this.page,
      offset: this.pageSize
    })

    this.loading = false
  },

  computed: {
    transactions() {
      return this.$store.getters['address/allTransactions']
    }
  }
}
</script>
