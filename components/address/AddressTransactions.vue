<template>
  <div
    id="profile-tabs2"
    class="tab-pane fade"
    role="tabpanel"
    aria-labelledby="profile-tabs2-tab"
  >
    <Loader v-if="newTransactionLoading" />
    <Transaction
      v-for="transaction in transactions"
      :key="uniqueKey(transaction)"
      :transaction="transaction"
    />
    <Loader v-if="$fetchState.pending" />
    <EmptyNfts v-else-if="!transactions.length" is-transaction />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import Loader from '~/components/loaders/GrowLoader.vue';
import Transaction from '~/components/address/transaction/Transaction.vue';
import EmptyNfts from '~/components/empty-nfts/EmptyNfts.vue';
import { addressModule, stickyModule } from '~/store';
import { ITransaction } from '~/types';
import { getUniqueKey } from '~/utils/array';

@Component({
  components: {
    Loader,
    Transaction,
    EmptyNfts,
  },
})
export default class AddressTransactions extends Vue {
  @Prop({ required: true })
  readonly isActive!: boolean;

  scrollListener: null | (() => void) = null;

  get transactions(): ITransaction[] {
    return addressModule.transactions.transactions;
  }

  get hasAllPages(): boolean {
    return addressModule.transactions.hasAllPages;
  }

  get newTransactionLoading(): boolean {
    return addressModule.syncTransactionsLoading;
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      !this.isActive ||
        this.hasAllPages ||
        this.$fetchState.pending ||
        this.$fetchState.error,
    );
  }

  @Watch('transactions')
  onTransactionsChanged() {
    stickyModule.update();
  }

  @Watch('isActive')
  onIsActiveChanged() {
    this.$fetch();
  }

  // lifecycle hooks

  async mounted() {
    /**
     * делаем запрос напрямую, т.к. это первый запрос при монтировании,
     * isActive на этот момент еще false
     * чтобы показать количество на вкладке
     */
    await addressModule.fetchTransactions();

    this.$nextTick(() => {
      this.scrollListener = this.scrollHandler.bind(this);
      $(window).on('scroll', this.scrollListener);
    });
  }

  beforeDestroy() {
    if (!this.scrollListener) {
      return;
    }

    $(window).off('scroll', this.scrollListener);
    this.scrollListener = null;
  }

  // methods

  next() {
    /** нельзя вызвать $fetch, если уже получили полный список транзакций,
     * либо текущий статус запроса pending или error */
    if (this.isFetchDisabled) return;

    this.$fetch();
  }

  scrollHandler() {
    /** пагинатор только для транзакций,
     * если доскролили до низа блока транзакций, то делаем запрос на следующую страницу
     */
    const windowHeight = Number($(window).height());
    const windowScrollTop = Number($(window).scrollTop());
    const elemOffsetTop = Number($('#profile-tabs2').offset()?.top);
    const elemHeight = Number($('#profile-tabs2').height());

    if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
      this.next();
    }
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
