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
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import PaginationMixin from '~/mixins/pagination'
import {
  ETransactionStoreType,
  TransactionType
} from '~/logic/transactions/types'

@Component({
  components: {
    transaction: () => import('~/components/transactions/ERC20Transaction.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue')
  }
})
export default class ERC20TransactionsTab extends mixins(PaginationMixin) {
  get transactions(): TransactionType[] {
    return this.$store.getters['address/ERC20Transactions']
  }

  get hasAllPages(): boolean {
    return this.$store.getters['address/hasAllERC20TransactionsPages']
  }

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

    const address = this.$route.query.address
      ? this.$route.query.address
      : this.$route.params.address
    const contractAddress = this.$route.query.address
      ? this.$route.params.address
      : ''

    await this.$store.dispatch('address/getTransactions', {
      address,
      contractAddress,
      transactionType: ETransactionStoreType.erc20
    })
  }
}
</script>
