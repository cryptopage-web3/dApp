<template>
  <div>
    <OwnNftsFilter />
    <div class="profile-my-nfts-wrap row">
      <Nft v-for="nft in nfts" :key="uniqueKey(nft)" :nft="nft" />
      <Loader v-if="$fetchState.pending || initLoading" />
      <div v-else-if="!nfts.length" class="transactions__empty">No NFTs</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import OwnNftsFilter from './OwnNftsFilter.vue';
import Nft from './nft/Nft.vue';
import Loader from '~/components/loaders/GrowLoader.vue';
import { addressModule, stickyModule } from '~/store';
import { INft } from '~/types';
import { getNftUniqueKey } from '~/utils/array';

@Component({
  components: {
    Nft,
    Loader,
    OwnNftsFilter,
  },
})
export default class OwnNftsList extends Vue {
  initLoading = true;

  scrollListener: null | (() => void) = null;

  get nfts(): INft[] {
    return addressModule.ownNfts.nfts;
  }

  get hasAllPages(): boolean {
    return addressModule.ownNfts.hasAllPages;
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
    const elemOffsetTop = Number($('.profile-my-nfts-wrap').offset()?.top);
    const elemHeight = Number($('.profile-my-nfts-wrap').height());

    if (windowScrollTop + windowHeight > elemOffsetTop + elemHeight) {
      this.next();
    }
  }

  async fetch() {
    /** не делаем запрос:
     * если уже получен полный список транзакций,
     */
    if (this.hasAllPages || process.server) {
      return;
    }

    await addressModule.fetchOwnNfts();
  }

  uniqueKey(nft: INft) {
    return getNftUniqueKey(nft);
  }
}
</script>
