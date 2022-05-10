<template>
  <div class="drop-down market-header__wallet">
    <a
      data-toggle="collapse"
      href="#market-header__wallet-col"
      role="button"
      aria-expanded="false"
      class="drop-down__link"
    >
      <div class="thumb">
        <img :src="authNetworkIcon" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ authNetworkName }}</div>
        <div v-if="authAddress" class="status">
          {{ authAddress | shortAddress }}
        </div>
        <div v-else class="status">Connect wallet</div>
      </div>
    </a>
    <div id="market-header__wallet-col" class="collapse drop-down__col">
      <ul class="drop-down__list">
        <li>
          <a href="#" @click.prevent="switchChain(EMainChain.eth)">
            <div class="thumb">
              <img src="@/assets/img/market-header__wallet_icon2.svg" alt="" />
            </div>
            <span> Ethereum </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="switchChain(EMainChain.bsc)">
            <div class="thumb">
              <img src="@/assets/img/market-header__wallet_icon3.svg" alt="" />
            </div>
            <span> Binance Smart Chain </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="switchChain(EMainChain.polygon)">
            <div class="thumb">
              <img src="@/assets/img/market-header__wallet_icon4.svg" alt="" />
            </div>
            <span> Polygon </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="switchChain(EMainChain.tron)">
            <div class="thumb">
              <img src="@/assets/img/market-header__wallet_icon5.svg" alt="" />
            </div>
            <span> Tron </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="switchChain(EMainChain.solana)">
            <div class="thumb">
              <img src="@/assets/img/market-header__wallet_icon6.svg" alt="" />
            </div>
            <span> Solana </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { EMainChain } from '~/types/EMainChain';
import { authModule } from '~/store';

@Component({})
export default class LayoutHeaderConnect extends Vue {
  EMainChain = EMainChain;

  get authAddress(): string {
    return authModule.address;
  }

  get authNetworkName() {
    return authModule.networkName;
  }

  get authNetworkIcon(): string {
    const icons: Record<string, string> = {
      eth: require('@/assets/img/market-header__wallet_icon1.svg'),
      bsc: require('@/assets/img/market-header__wallet_icon3.svg'),
      polygon: require('@/assets/img/market-header__wallet_icon4.svg'),
      tron: require('@/assets/img/market-header__wallet_icon5.svg'),
      solana: require('@/assets/img/market-header__wallet_icon6.svg'),
    };

    return icons[authModule.networkType];
  }

  switchChain(chain: EMainChain) {
    authModule.selectMainChain(chain);

    this.$router.push(`/connect`);

    /** закрываем дропдаун сетей */

    ($('#market-header__wallet-col') as any).collapse('hide');
  }
}
</script>
