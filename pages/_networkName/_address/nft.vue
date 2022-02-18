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
      import('~/components/transactions/ERC721Transaction.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue')
  }
})
export default class ERC721TransactionsTab extends mixins(PaginationMixin) {
  get transactions(): TransactionType[] {
    return this.$store.getters['address/ERC721Transactions']
  }

  get hasAllPages(): boolean {
    return this.$store.getters['address/hasAllERC721TransactionsPages']
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

    await this.$store.dispatch('address/getTransactions', {
      address: this.$route.params.address,
      transactionType: ETransactionStoreType.erc721
    })
  }
}
</script>
