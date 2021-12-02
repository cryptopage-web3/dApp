<template>
  <div class="transactions-body">
    <transaction
      v-for="transaction in transactions"
      :key="transaction.hash"
      :transaction="transaction"
    />
    <loader v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error" class="transactions-body__empty">
      Error while fetching transactions
    </div>
    <div v-else-if="!transactions.length" class="transactions-body__empty">
      No transactions
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
    transaction: () =>
      import('~/components/transactions/NormalTransaction.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue')
  }
})
export default class NormalTransactionsTab extends mixins(PaginationMixin) {
  get transactions(): TransactionType[] {
    return this.$store.getters['address/normalTransactions']
  }

  get hasAllPages(): boolean {
    return this.$store.getters['address/hasAllNormalTransactionsPages']
  }

  async fetch() {
    /** не делаем запрос:
     * если уже получен полный список транзакций,
     * если сменился адрес, но в сторе адрес еще старый,
     * из-за этого транзакции стора и пагинатор относятся еще к старому адресу
     * должен отработать метод reset() в pagination перед fetch
     */
    if (
      this.hasAllPages ||
      (this.address && this.address !== this.$route.params.address)
    ) {
      return
    }

    await this.$store.dispatch('address/getTransactions', {
      address: this.$route.params.address,
      transactionType: ETransactionStoreType.normal
    })
  }
}
</script>
