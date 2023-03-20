<template>
  <div v-if="show" class="market-sidebar">
    <div class="market-sidebar-top">
      <h3 class="market-sidebar__title">
        {{ isOwner ? 'My' : 'Account' }} NFT’s
      </h3>
      <nuxt-link
        :to="`/${chainSlug}/${address}/nfts`"
        class="market-sidebar__more"
      >
        <SidebarArrowIcon />
      </nuxt-link>
    </div>
    <ul class="market-sidebar__list2">
      <template v-if="loading">
        <li>
          <Skeleton class-name="market-sidebar__list2-loading-item" />
        </li>
        <li>
          <Skeleton class-name="market-sidebar__list2-loading-item" />
        </li>
        <li>
          <Skeleton class-name="market-sidebar__list2-loading-item" />
        </li>
        <li>
          <Skeleton class-name="market-sidebar__list2-loading-item" />
        </li>
      </template>
      <template v-else-if="!visibleNfts.length">
        <li class="market-sidebar__list2-empty">You don't have NFT’s</li>
      </template>
      <template v-else>
        <li v-for="nft in visibleNfts" :key="getNftUniqueKey(nft)">
          <Nft :nft="nft" @show-modal="showNftModal" />
        </li>
      </template>
    </ul>
    <nuxt-link
      v-if="nfts.length > 6"
      :to="`/${chainSlug}/${address}/nfts`"
      class="market-sidebar__show-more"
      @click.prevent="showMore"
    >
      Show more
    </nuxt-link>

    <NftModal v-if="selectedNft" ref="nftModal" :nft="selectedNft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import Nft from './nft/Nft.vue';
import { addressModule, authModule, stickyModule } from '~/store';
import { IAddressInfo, INft } from '~/types';
import Skeleton from '~/components/loaders/Skeleton.vue';
import SidebarArrowIcon from '~/components/icon/account/SidebarArrowIcon.vue';
import NftModal from '~/components/own-nfts/nft/modal/Modal.vue';
import { getNftUniqueKey } from '~/utils/array';

type TAddressInfo = IAddressInfo;

@Component({
  components: {
    Skeleton,
    Nft,
    SidebarArrowIcon,
    NftModal,
  },
})
export default class AccountSidebarNfts extends Vue {
  loading = false;
  selectedNft: INft | null = null;

  $refs!: {
    nftModal: NftModal;
  };

  get show() {
    return this.$route.name !== 'network-address-nfts';
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get address(): string {
    return addressModule.address;
  }

  get info(): TAddressInfo {
    return addressModule.info;
  }

  get hasPage(): boolean {
    return Boolean(addressModule.ownNfts.page);
  }

  get nfts(): INft[] {
    return addressModule.ownNfts.nfts;
  }

  get visibleNfts(): INft[] {
    return this.nfts.slice(0, 6);
  }

  @Watch('nfts', { immediate: true })
  onNftsChanged() {
    stickyModule.update();
  }

  @Watch('info', { immediate: true })
  async onInfoChanged(info: TAddressInfo) {
    if (!info.address || !info.chainId || this.hasPage) {
      return;
    }

    this.loading = true;

    await addressModule.fetchOwnNfts();

    this.loading = false;
  }

  showNftModal(nft: INft) {
    this.selectedNft = nft;
    this.$nextTick(() => {
      this.$refs.nftModal.show();
    });
  }

  getNftUniqueKey(nft: INft) {
    return getNftUniqueKey(nft);
  }
}
</script>
