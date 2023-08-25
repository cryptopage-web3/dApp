<template>
  <div
    id="spaces-tabs1"
    class="tab-pane fade show active"
    role="tabpanel"
    aria-labelledby="spaces-tabs1-tab"
  >
    <Nft
      v-for="nft in nfts"
      :key="uniqueKey(nft)"
      :nft="nft"
      :is-home-page="true"
    />
    <Loader v-if="$fetchState.pending || initLoading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import Loader from '~/components/loaders/GrowLoader.vue';
import Nft from '~/components/address/nft/Nft.vue';
import { homeModule, stickyModule } from '~/store';
import { INftTransaction } from '~/types';
import { getNftTransactionUniqueKey } from '~/utils/array';

@Component({
  components: {
    Loader,
    Nft,
  },
})
export default class NewContentPanel extends Vue {
  initLoading = true;

  scrollListener: null | (() => void) = null;

  get nfts(): INftTransaction[] {
    return homeModule.newContent.nfts;
  }

  get hasAllPages(): boolean {
    return homeModule.newContent.hasAllPages;
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      this.hasAllPages || this.$fetchState.pending || this.$fetchState.error,
    );
  }

  @Watch('nfts')
  onNftsChanged() {
    stickyModule.update();
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
    const elemOffsetTop = Number($('#spaces-tabs1').offset()?.top);
    const elemHeight = Number($('#spaces-tabs1').height());

    if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
      this.next();
    }
  }

  async fetch() {
    /** не делаем запрос:
     * если вкладка не активна
     * если уже получен полный список транзакций,
     */
    if (this.hasAllPages || process.server) {
      return;
    }

    await homeModule.fetchNftTransactions();
  }

  uniqueKey(nft: INftTransaction) {
    return nft ? getNftTransactionUniqueKey(nft) : '_';
  }
}
</script>
