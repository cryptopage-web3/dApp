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
        <img src="@/assets/img/market-header__wallet_icon1.svg" alt="" />
      </div>
      <div class="right">
        <div class="title">Etherum</div>
        <div class="status">Connect wallet</div>
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

@Component({})
export default class LayoutHeaderConnect extends Vue {
  EMainChain = EMainChain;

  switchChain() {
    /** TODO: нужно сохранять type в стор, чтобы потом в форме подключения брать актуальную сеть */
    // console.log(type);

    this.$router.push(`/connect`);

    /** закрываем дропдаун сетей */

    ($('#market-header__wallet-col') as any).collapse('hide');
  }
}
</script>
