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
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="29"
            height="29"
            rx="4.5"
            stroke="#1886FF"
          ></rect>
          <path
            d="M15.6079 15.0206L12.6579 17.9706C12.5027 18.1267 12.4156 18.3379 12.4156 18.5581C12.4156 18.7782 12.5027 18.9895 12.6579 19.1456C12.7354 19.2237 12.8276 19.2857 12.9291 19.328C13.0307 19.3703 13.1396 19.3921 13.2496 19.3921C13.3596 19.3921 13.4685 19.3703 13.5701 19.328C13.6716 19.2857 13.7638 19.2237 13.8413 19.1456L17.3746 15.6123C17.4527 15.5348 17.5147 15.4426 17.557 15.3411C17.5993 15.2395 17.6211 15.1306 17.6211 15.0206C17.6211 14.9106 17.5993 14.8017 17.557 14.7001C17.5147 14.5986 17.4527 14.5064 17.3746 14.4289L13.8413 10.8539C13.7634 10.7767 13.671 10.7156 13.5695 10.6741C13.468 10.6326 13.3593 10.6116 13.2496 10.6123C13.1399 10.6116 13.0312 10.6326 12.9297 10.6741C12.8281 10.7156 12.7358 10.7767 12.6579 10.8539C12.5027 11.0101 12.4156 11.2213 12.4156 11.4414C12.4156 11.6616 12.5027 11.8728 12.6579 12.0289L15.6079 15.0206Z"
            fill="#1886FF"
          ></path>
        </svg>
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
      <template v-else-if="!nfts.length">
        <li class="market-sidebar__list2-empty">No NFTs</li>
      </template>
      <template v-else>
        <li v-for="(nft, index) in nfts" :key="index">
          <SidebarNft :nft="nft" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import SidebarNft from './SidebarNft.vue';
import { addressModule, authModule, stickyModule } from '~/store';
import { IAddressInfo, INft } from '~/types';
import Skeleton from '~/components/loaders/Skeleton.vue';

type TAddressInfo = IAddressInfo;

@Component({
  components: {
    Skeleton,
    SidebarNft,
  },
})
export default class AccountSidebarNfts extends Vue {
  loading = false;

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

  get nfts(): INft[] {
    return [];
  }

  @Watch('nfts')
  onNftsChanged() {
    stickyModule.update();
  }

  @Watch('info', { immediate: true })
  onInfoChanged(info: TAddressInfo) {
    if (!info.address || !info.chainId) {
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>
