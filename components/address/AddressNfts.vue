<template>
  <div
    id="profile-tabs1"
    class="tab-pane fade show active"
    role="tabpanel"
    aria-labelledby="profile-tabs1-tab"
  >
    <Loader v-if="newNftLoading" />
    <Nft v-for="nft in nfts" :key="uniqueKey(nft)" :nft="nft" />
    <Loader v-if="$fetchState.pending || initLoading" />
    <div v-else-if="!nfts.length" class="transactions__empty-block">
      <div class="global-text mb_30 text-center">
        There is not a single NFT on your address<br />
        you can create it here
      </div>
      <div class="text-center">
        <a href="#" class="btn-blue_button btn_large"> + Create NFT </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import Loader from '~/components/loaders/GrowLoader.vue';
import Nft from '~/components/address/nft/Nft.vue';
import { addressModule, stickyModule } from '~/store';
import { INftTransaction } from '~/types';
import { getNftTransactionUniqueKey } from '~/utils/array';

@Component({
  components: {
    Loader,
    Nft,
  },
})
export default class AddressNfts extends Vue {
  initLoading = true;

  @Prop({ required: true })
  readonly isActive!: boolean;

  scrollListener: null | (() => void) = null;

  get nfts(): INftTransaction[] {
    return addressModule.nftTransactions.nfts;
  }

  get hasAllPages(): boolean {
    return addressModule.nftTransactions.hasAllPages;
  }

  get newNftLoading(): boolean {
    return addressModule.syncNftTransactionsLoading;
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      !this.isActive ||
        this.hasAllPages ||
        this.$fetchState.pending ||
        this.$fetchState.error,
    );
  }

  @Watch('nfts')
  onNftsChanged() {
    stickyModule.update();
  }

  @Watch('isActive')
  onIsActiveChanged() {
    this.$fetch();
  }

  // lifecycle hooks

  mounted() {
    /** делаем запрос при монтировании,
     * т.к. isActive = true по умолчанию и @Watch не отработает
     */
    this.initLoading = false;
    this.next();

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
    const elemOffsetTop = Number($('#profile-tabs1').offset()?.top);
    const elemHeight = Number($('#profile-tabs1').height());

    if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
      this.next();
    }
  }

  async fetch() {
    /** не делаем запрос:
     * если вкладка не активна
     * если уже получен полный список транзакций,
     */
    if (!this.isActive || this.hasAllPages || process.server) {
      return;
    }

    await addressModule.fetchNftTransactions();
  }

  uniqueKey(nft: INftTransaction) {
    return nft ? getNftTransactionUniqueKey(nft) : '_';
  }
}
</script>
