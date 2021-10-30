<template>
  <div class="transactions-body">
    <transaction
      v-for="transaction in $store.getters['address/ERC721Transactions']"
      :key="transaction.hash"
      :transaction="transaction"
    />
  </div>
</template>
<script>
import { paginationMixin } from '@/mixins/pagination'
export default {
  components: {
    transaction: () => import('~/components/transactions/ERC721Transaction.vue')
  },

  mixins: [paginationMixin],

  data: () => ({
    loading: true
  }),

  async fetch() {
    this.loading = true

    await this.$store.dispatch('address/getERC721Transactions', {
      address: this.$route.params.address,
      page: this.page,
      offset: this.pageSize
    })

    this.loading = false
  }
}
</script>
