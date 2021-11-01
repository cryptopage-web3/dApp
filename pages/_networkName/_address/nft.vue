<template>
  <div class="transactions-body">
    <transaction
      v-for="transaction in transactions"
      :key="transaction.hash"
      :transaction="transaction"
    />
    <loader v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error" class="transactions-body__empty">
      Error while fetching NFT
    </div>
    <div v-else-if="!transactions.length" class="transactions-body__empty">
      No NFT
    </div>
  </div>
</template>
<script>
import { paginationMixin } from '@/mixins/pagination'
export default {
  components: {
    transaction: () =>
      import('~/components/transactions/ERC721Transaction.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue')
  },
  mixins: [paginationMixin],
  async fetch() {
    await this.$store.dispatch('address/getERC721Transactions', {
      address: this.$route.params.address,
      page: this.page,
      offset: this.pageSize
    })
  },
  computed: {
    transactions() {
      return this.$store.getters['address/ERC721Transactions']
    }
  }
}
</script>
