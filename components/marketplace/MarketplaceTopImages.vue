<template>
  <div class="row">
    <div class="col-12">
      <div class="market-main-default-top">
        <div class="left">
          <h2 class="title">Top images</h2>
          <div class="main-page-dropdown">
            <button
              id="dropdownMenuButton"
              class="main-page-dropdown__btn"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              day
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">hour</a>
              <a class="dropdown-item" href="#">month</a>
              <a class="dropdown-item" href="#">year</a>
            </div>
          </div>
        </div>
        <a href="#" class="more-nfts">
          <span> Discover more NFT’s </span>
          <MarketplaceMoreArrowIcon />
        </a>
      </div>
    </div>
    <Loader v-if="loading" />
    <div v-else-if="!nfts.length" class="market-nft-block__empty">No Nft's</div>
    <template v-else>
      <Nft v-for="nft in nfts" :key="nft.id" :nft="nft" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Nft from './nft/Nft.vue';
import { marketModule } from '~/store';
import Loader from '~/components/loaders/GrowLoader.vue';
import MarketplaceMoreArrowIcon from '~/components/icon/marketplace/MarketplaceMoreArrowIcon.vue';
import { ICollectionNft } from '~/types';

@Component({
  components: {
    MarketplaceMoreArrowIcon,
    Loader,
    Nft,
  },
})
export default class MarketplaceTopImages extends Vue {
  loading = true;

  get nfts(): ICollectionNft[] {
    return marketModule.lastUpdatedNfts;
  }

  mounted() {
    this.fetchNft();
  }

  async fetchNft() {
    this.loading = true;

    await marketModule.fetchLastUpdated();

    this.loading = false;
  }
}
</script>
