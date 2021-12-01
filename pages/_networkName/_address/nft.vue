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
import { paginationMixin } from '~/mixins/pagination'
export default {
  components: {
    transaction: () =>
      import('~/components/transactions/ERC721Transaction.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue')
  },

  mixins: [paginationMixin],

  async fetch() {
    /** не делаем запрос:
     * если уже получен полный список транзакций,
     * если сменился адрес, но в сторе адрес еще старый,
     * поэтому транзакции стора и пагинатор относятся к старому адресу
     * должен отработать метод reset() в pagination
     */
    if (
      this.hasAllPages ||
      (this.address && this.address !== this.$route.params.address)
    ) {
      return
    }

    await this.$store.dispatch('address/getTransactions', {
      address: this.$route.params.address,
      transactionType: 'erc721'
    })
  },

  computed: {
    transactions() {
      return this.$store.getters['address/ERC721Transactions']
    },

    hasAllPages() {
      return this.$store.getters['address/hasAllERC721TransactionsPages']
    }
  }
}
</script>
