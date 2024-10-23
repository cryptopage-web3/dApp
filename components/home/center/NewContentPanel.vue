<template>
  <div
    :id="tabId"
    :class="{ 'tab-pane': true, fade: true, show: showTab, active: showTab }"
    role="tabpanel"
    :aria-labelledby="tabHeaderId"
  >
    <Nft v-for="nft in nfts" :key="uniqueKey(nft)" :nft="nft" />
    <Loader v-if="$fetchState.pending || initLoading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import Loader from '~/components/loaders/GrowLoader.vue';
import Nft from '~/components/address/nft/Nft.vue';
import { homeModule, stickyModule } from '~/store';
import { INftTransaction } from '~/types';
import { getNftTransactionUniqueKey } from '~/utils/array';

type TContentSource = 'new-content' | 'for-you';

@Component({
  components: {
    Loader,
    Nft,
  },
})
export default class NewContentPanel extends Vue {
  initLoading = true;

  @Prop({ required: false, default: 'new-content' })
  contentSource: TContentSource;

  @Prop({ default: false, required: false })
  showTab: boolean;

  @Prop({ required: true })
  tabIndex: number;

  scrollListener: null | (() => void) = null;

  get nftDataSource() {
    return this.contentSource === 'new-content'
      ? homeModule.newContent
      : homeModule.forYou;
  }

  get nfts(): INftTransaction[] {
    return this.nftDataSource.nfts;
  }

  get hasAllPages(): boolean {
    return this.nftDataSource.hasAllPages;
  }

  get isFetchDisabled(): boolean {
    return Boolean(
      this.hasAllPages || this.$fetchState.pending || this.$fetchState.error,
    );
  }

  get tabId() {
    return 'spaces-tabs' + this.tabIndex;
  }

  get tabHeaderId() {
    return this.tabId + '-tab';
  }

  needLoadDataOnShowtab() {
    return (
      !this.hasAllPages &&
      !this.$fetchState.pending &&
      this.nftDataSource.count === 0
    );
  }

  @Watch('nfts')
  onNftsChanged() {
    stickyModule.update();
  }

  // lifecycle hooks

  mounted() {
    if (!this.showTab) {
      const tabHead = $('#home-tabs .spaces-tabs-link');
      const showTabHandler = (e) => {
        console.log(
          'show',
          e.target.id,
          this.tabHeaderId,
          this.$fetchState.timestamp,
          this.$fetchState.pending,
        );
        if (e.target.id === this.tabHeaderId && this.needLoadDataOnShowtab()) {
          //console.log('load', e.target.id, this.tabHeaderId);
          this.$fetch();
          tabHead.off('shown.bs.tab', showTabHandler);
        }
      };

      tabHead.on('shown.bs.tab', showTabHandler);
    }

    /** делаем запрос при монтировании,
     * т.к. isActive = true по умолчанию и @Watch не отработает
     */

    this.initLoading = false;
    if (this.showTab) {
      this.next();
    }

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
    const elemOffsetTop = Number($('#' + this.tabId).offset()?.top);
    const elemHeight = Number($('#' + this.tabId).height());

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
    // console.log('load', this.contentSource);

    if (this.contentSource === 'new-content') {
      await homeModule.fetchNewContent();
    } else {
      await homeModule.fetchForYou();
    }
  }

  uniqueKey(nft: INftTransaction) {
    return nft
      ? this.contentSource + '_' + getNftTransactionUniqueKey(nft)
      : '_';
  }
}
</script>
