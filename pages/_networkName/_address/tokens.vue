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
    return this.typedStore.address.ERC20Transactions
  }

  get hasAllPages(): boolean {
    return this.typedStore.address.hasAllERC20TransactionsPages
  }

  async fetch() {
    /** не делаем запрос:
     * если уже получен полный список транзакций,
     * если сменился адрес, но в сторе адрес еще старый,
     * если сменилась сеть, но в сторе сеть еще старая,
     *
     * из-за этого транзакции стора и пагинатор относятся еще к старому адресу
     * должен отработать метод clearTransactions() в beforeCreate
     */
    if (this.hasAllPages || this.isNotSyncedAddressWithStore) {
      return
    }

    const address =
      String(this.$route.query.address) || this.$route.params.address
    const contractAddress = this.$route.query.address
      ? this.$route.params.address
      : ''

    await this.typedStore.address.getTransactions({
      address,
      contractAddress,
      transactionType: ETransactionStoreType.erc20
    })
  }
}
</script>
