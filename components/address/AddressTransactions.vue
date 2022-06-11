<template>
  <div
    id="profile-tabs2"
    class="tab-pane fade"
    role="tabpanel"
    aria-labelledby="profile-tabs2-tab"
  >
    <TransactionItem
      v-for="transaction in transactions"
      :key="uniqueKey(transaction)"
      :transaction="transaction"
    />
    <Loader v-if="$fetchState.pending" />
    <div v-else-if="!transactions.length" class="transactions__empty">
      No transactions
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import Loader from '~/components/loaders/GrowLoader.vue';
import TransactionItem from '~/components/address/TransactionItem.vue';
import { addressModule } from '~/store';
import { ITransaction } from '~/types';
import { getUniqueKey } from '~/utils/array';

@Component({
  components: {
    Loader,
    TransactionItem,
  },
})
export default class AddressTransactions extends Vue {
  @Prop({ required: true })
  readonly isActive!: boolean;

  get transactions(): ITransaction[] {
    return addressModule.transactions.transactions;
  }

  get hasAllPages(): boolean {
    return addressModule.transactions.hasAllPages;
  }

  @Watch('isActive')
  onIsActiveChanged() {
    this.$fetch();
  }

  async fetch() {
    /** не делаем запрос:
     * если вкладка не активна
     * если уже получен полный список транзакций,
     */
    if (!this.isActive || this.hasAllPages) {
      return;
    }

    await addressModule.fetchTransactions();
  }

  uniqueKey(transaction: ITransaction) {
    return getUniqueKey(transaction);
  }
}
</script>
