<template>
  <div class="tokens-top">
    <div class="tokens__overview">Overview</div>
    <div class="tokens-wallets">
      <div class="tokens-wallet">
        <div class="tokens-wallet__title">Net Worth in USD</div>
        <div class="tokens-wallet__count">$ 0</div>
      </div>
      <div class="tokens-wallet">
        <div class="tokens-wallet__title">Net Worth in {{ chainSymbol }}</div>
        <div class="tokens-wallet__count">
          <img :src="chainIcon" alt="" />
          0
        </div>
      </div>
      <div class="tokens-wallet">
        <div class="tokens-wallet__title">Total Balance Change (24H)</div>
        <div class="tokens-wallet__procent tokens-wallet__procent-green">
          0%
        </div>
        <div class="tokens-wallet__procent tokens-wallet__procent-red">0%</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { addressModule } from '~/store';

@Component({})
export default class TokensOverview extends Vue {
  get chainSymbol(): string {
    return addressModule.chainSymbol;
  }

  get chainIcon(): string {
    const icons: Record<string, string> = {
      eth: require('@/assets/img/market-header__wallet_icon1.svg'),
      goerli: require('@/assets/img-custom/profile-login-accordion_img9.png'),
      bsc: require('@/assets/img/market-header__wallet_icon3.svg'),
      polygon: require('@/assets/img/market-header__wallet_icon4.svg'),
      mumbai: require('@/assets/img-custom/profile-login-accordion_img10.png'),
      tron: require('@/assets/img/market-header__wallet_icon5.svg'),
      solana: require('@/assets/img/market-header__wallet_icon6.svg'),
    };

    return icons[addressModule.chainType];
  }
}
</script>
