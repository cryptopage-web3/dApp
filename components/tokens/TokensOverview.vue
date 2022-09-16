<template>
  <div class="tokens-top">
    <div class="tokens__overview">Overview</div>
    <div class="tokens-wallets">
      <div class="tokens-wallet">
        <div class="tokens-wallet__title">Net Worth in USD</div>
        <div class="tokens-wallet__count">$ 9,825,630.73</div>
      </div>
      <div class="tokens-wallet">
        <div class="tokens-wallet__title">Net Worth in ETH</div>
        <div class="tokens-wallet__count">
          <img src="@/assets/img/tokens-wallet_eth.svg" alt="" />
          3263.526793
        </div>
      </div>
      <div class="tokens-wallet">
        <div class="tokens-wallet__title">Total Balance Change (24H)</div>
        <div class="tokens-wallet__procent tokens-wallet__procent-green">
          4.00%
        </div>
        <div class="tokens-wallet__procent tokens-wallet__procent-red">
          - 4.00%
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class TokensOverview extends Vue {}
</script>
