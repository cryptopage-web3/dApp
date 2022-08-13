<template>
  <div class="modal-creat-text mb_20">
    <div class="modal-creat__title2">Blockchain</div>
    <div class="profile-content-drop modal-creat-drop2 market-filtr__drop mt_5">
      <a href="#" class="profile-content-drop__link">
        <div class="thumb">
          <img src="@/assets/img/market-header__wallet_icon2.svg" alt="" />
        </div>
        <span> Ethereum </span>
      </a>
      <div class="drop-down__col">
        <ul class="drop-down__list">
          <li>
            <a href="#">
              <div class="thumb">
                <img
                  src="@/assets/img/market-header__wallet_icon2.svg"
                  alt=""
                />
              </div>
              <span> Ethereum </span>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="thumb">
                <img
                  src="@/assets/img/market-header__wallet_icon3.svg"
                  alt=""
                />
              </div>
              <span> Binance Smart Chain </span>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="thumb">
                <img
                  src="@/assets/img/market-header__wallet_icon4.svg"
                  alt=""
                />
              </div>
              <span> Polygon </span>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="thumb">
                <img
                  src="@/assets/img/market-header__wallet_icon5.svg"
                  alt=""
                />
              </div>
              <span> Tron </span>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="thumb">
                <img
                  src="@/assets/img/market-header__wallet_icon6.svg"
                  alt=""
                />
              </div>
              <span> Solana </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalBlockchain extends Vue {
  get chain(): string {
    return nftFormModule.values.chain;
  }

  updateChain(e: InputEvent) {
    nftFormModule.setChain((e.target as HTMLInputElement)?.value || '');
  }
}
</script>
