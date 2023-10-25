<template>
  <div class="row">
    <div class="col-12">
      <div class="market-main-default-top mb-0 pr_70">
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
      </div>
    </div>

    <Loader v-if="loading" />
    <div v-else-if="!nfts.length" class="market-nft-block__empty">
      No Content
    </div>
    <div v-else ref="root" class="main-slider">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(sliderNfts, index) in sliders"
            :key="index"
            class="swiper-slide"
          >
            <Nft v-for="nft in sliderNfts" :key="nft.id" :nft="nft" />
          </div>
        </div>
      </div>

      <div class="main-slider-arrows">
        <div class="swiper-button-prev main-slider-arrow">
          <MarketplaceLeftArrowIcon />
        </div>
        <div class="swiper-button-next main-slider-arrow">
          <MarketplaceRightArrowIcon />
        </div>
      </div>

      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import Nft from './nft/Nft.vue';
import { marketModule } from '~/store';
import Loader from '~/components/loaders/GrowLoader.vue';
import MarketplaceRightArrowIcon from '~/components/icon/marketplace/MarketplaceRightArrowIcon.vue';
import MarketplaceLeftArrowIcon from '~/components/icon/marketplace/MarketplaceLeftArrowIcon.vue';
import { ICollectionNft } from '~/types';
import { marketplaceSlider } from '~/utils/marketplaceSlider';

@Component({
  components: {
    MarketplaceRightArrowIcon,
    MarketplaceLeftArrowIcon,
    Loader,
    Nft,
  },
})
export default class MarketplaceTopImages extends Vue {
  loading = true;

  $refs!: {
    root: HTMLDivElement;
  };

  get nfts(): ICollectionNft[] {
    return marketModule.marketDashboardNfts;
  }

  get sliders() {
    const groups = [];
    const nfts = this.nfts;

    for (let i = 0; i < nfts.length; i += 2) {
      const chunk = nfts.slice(i, i + 2);
      groups.push(chunk);
    }

    return groups;
  }

  @Watch('nfts')
  onNftsChange(nfts: ICollectionNft[]) {
    if (nfts.length) {
      setTimeout(() => {
        marketplaceSlider(this.$refs.root);
      });
    }
  }

  mounted() {
    this.fetchNft();
  }

  async fetchNft() {
    this.loading = true;

    await marketModule.fetchMarketDashboard();

    this.loading = false;
  }
}
</script>
