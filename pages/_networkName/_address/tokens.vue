<template>
  <div class="transactions-body">
    <transaction
      v-for="transaction in transactions"
      :key="transaction.hash"
      :transaction="transaction"
    />
    <loader v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error" class="transactions-body__empty">
      Error while fetching TOKENS
    </div>
    <div v-else-if="!transactions.length" class="transactions-body__empty">
      No TOKENS
    </div>
  </div>
</template>
<script>
import { paginationMixin } from '@/mixins/pagination'
export default {
  components: {
    transaction: () => import('~/components/transactions/ERC20Transaction.vue'),
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
      this.isCompleted ||
      (this.address && this.address !== this.$route.params.address)
    ) {
      return
    }

    const address = this.$route.query.address
      ? this.$route.query.address
      : this.$route.params.address
    const contractAddress = this.$route.query.address
      ? this.$route.params.address
      : ''

    await this.$store.dispatch('address/getERC20Transactions', {
      address,
      contractAddress
    })
  },

  computed: {
    transactions() {
      return this.$store.getters['address/ERC20Transactions']
    },

    isCompleted() {
      return this.$store.getters['address/isERC20TransactionsCompleted']
    }
  }
}
</script>
