<template>
  <div class="transactions">
    <transaction
      v-for="transaction in $store.getters['transactions/ERC721Transactions']"
      :key="transaction.hash"
      :transaction="transaction"
    />
  </div>
</template>
<script>
import { paginationMixin } from '@/mixins/pagination'
export default {
  components: {
    transaction: () => import('~/components/ERC721Transaction.vue')
  },
  mixins: [paginationMixin],
  async fetch() {
    await this.$store.dispatch('transactions/getERC721Transactions', {
      address: this.$route.params.address,
      page: this.page,
      offset: this.pageSize
    })
  },
  watch: {
    page: '$fetch',
    pageSize: '$fetch'
  }
}
</script>
