<template>
  <div class="modal-creat-text mb_20">
    <div class="modal-creat__title2">Blockchain</div>
    <div
      ref="drop"
      class="profile-content-drop modal-creat-drop2 market-filtr__drop mt_5"
    >
      <a href="#" class="profile-content-drop__link">
        <template v-if="chainInfo">
          <div class="thumb">
            <img :src="chainInfo.icon" alt="" />
          </div>
          <span> {{ chainInfo.title }} </span>
        </template>
        <span v-else> Select value </span>
      </a>
      <div class="drop-down__col">
        <ul class="drop-down__list">
          <li v-for="item in chainList" :key="item.slug">
            <a href="#" @click.prevent="select(item.slug)">
              <div class="thumb">
                <img :src="item.icon" alt="" />
              </div>
              <span> {{ item.title }} </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { nftFormModule, authModule } from '~/store';
import { EChainSlug } from '~/types';

@Component({})
export default class ModalBlockchain extends Vue {
  chainList = [
    {
      slug: EChainSlug.eth,
      title: 'Ethereum',
      icon: require('@/assets/img/market-header__wallet_icon2.svg'),
    },
    {
      slug: EChainSlug.bsc,
      title: 'Binance Smart Chain',
      icon: require('@/assets/img/market-header__wallet_icon3.svg'),
    },
    {
      slug: EChainSlug.polygon,
      title: 'Polygon',
      icon: require('@/assets/img/market-header__wallet_icon4.svg'),
    },
    {
      slug: EChainSlug.tron,
      title: 'Tron',
      icon: require('@/assets/img/market-header__wallet_icon5.svg'),
    },
    {
      slug: EChainSlug.solana,
      title: 'Solana',
      icon: require('@/assets/img/market-header__wallet_icon6.svg'),
    },
  ];

  $refs!: {
    drop: HTMLDivElement;
  };

  get chain(): string {
    return nftFormModule.values.chain;
  }

  get chainInfo() {
    return this.chainList.find(({ slug }) => slug === this.chain);
  }

  get authChainSlug(): string {
    return authModule.chainSlug;
  }

  @Watch('authChainSlug', { immediate: true })
  onAuthChainSlugChanged(slug: string) {
    if (process.client && slug !== this.chain) {
      nftFormModule.setChain(slug);
    }
  }

  select(slug: EChainSlug) {
    nftFormModule.setChain(slug);
    this.hideDrop();
  }

  hideDrop() {
    $(this.$refs.drop).find('.drop-down__col').slideUp(300);
    $(this.$refs.drop).removeClass('active');
  }
}
</script>
