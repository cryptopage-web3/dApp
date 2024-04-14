<template>
  <div class="drop-down market-header__wallet">
    <div class="drop-down__link">
      <a
        class="thumb"
        data-toggle="collapse"
        href="#market-header__wallet-col"
        role="button"
        aria-expanded="false"
      >
        <img :src="authChainIcon" alt="" />
      </a>
      <div class="right">
        <div class="title">{{ authChainName }}</div>
        <a
          v-if="isAuth"
          class="status"
          data-toggle="collapse"
          href="#market-header__wallet-col2"
          role="button"
          aria-expanded="false"
        >
          <span>{{ authAddress | shortAddress }}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.98583 7.42575L4.92083 5.36075C4.81154 5.2521 4.66369 5.19112 4.50958 5.19112C4.35547 5.19112 4.20762 5.2521 4.09833 5.36075C4.04366 5.41497 4.00026 5.47949 3.97064 5.55058C3.94103 5.62166 3.92578 5.6979 3.92578 5.77491C3.92578 5.85192 3.94103 5.92816 3.97064 5.99925C4.00026 6.07033 4.04366 6.13485 4.09833 6.18908L6.57166 8.66241C6.62589 8.71709 6.69041 8.76048 6.76149 8.7901C6.83258 8.81971 6.90882 8.83496 6.98583 8.83496C7.06284 8.83496 7.13908 8.81971 7.21017 8.7901C7.28125 8.76048 7.34577 8.71709 7.4 8.66241L9.9025 6.18908C9.95656 6.13457 9.99933 6.06993 10.0284 5.99886C10.0574 5.92779 10.0721 5.85168 10.0717 5.77491C10.0721 5.69814 10.0574 5.62204 10.0284 5.55097C9.99933 5.47989 9.95656 5.41525 9.9025 5.36074C9.7932 5.2521 9.64536 5.19112 9.49125 5.19112C9.33714 5.19112 9.18929 5.2521 9.08 5.36074L6.98583 7.42575Z"
              fill="#1886FF"
            />
          </svg>
        </a>
        <a v-else href="#" class="status" @click.prevent="showConnectModal">
          <span>Connect Wallet</span>
        </a>
      </div>
    </div>
    <div id="market-header__wallet-col" class="collapse drop-down__col">
      <ul class="drop-down__list">
        <li>
          <a href="#" @click.prevent="switchChain(EMainChain.polygon)">
            <div class="thumb">
              <img src="@/assets/img/market-header__wallet_icon4.svg" alt="" />
            </div>
            <span> Polygon </span>
          </a>
        </li>
      </ul>
    </div>
    <div id="market-header__wallet-col2" class="collapse drop-down__col">
      <ul class="drop-down__list">
        <li>
          <nuxt-link :to="`/${authChainSlug}/${authAddress}`">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon2.svg" alt="" />
            </div>
            <span> Profile </span>
          </nuxt-link>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon3.svg" alt="" />
            </div>
            <span> Favorites </span>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon4.svg" alt="" />
            </div>
            <span> My collections </span>
          </a>
        </li>
        <li>
          <a :href="MESSENGER_URL" target="_blank">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon5.svg" alt="" />
            </div>
            <span> Messages </span>
          </a>
        </li>
        <li>
          <nuxt-link to="/profile/settings">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon6.svg" alt="" />
            </div>
            <span> Settings </span>
          </nuxt-link>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon7.svg" alt="" />
            </div>
            <span> Night Mode </span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="logout()">
            <div class="thumb">
              <img src="@/assets/img/market-header__cabinet_icon8.svg" alt="" />
            </div>
            <span> Log Out </span>
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
import { MESSENGER_URL } from '~/constants';
import { networkHelper } from '~/utils/networkHelper';
import { notify } from '~/utils/notify';

@Component({})
export default class HeaderConnect extends Vue {
  MESSENGER_URL = MESSENGER_URL;
  EMainChain = EMainChain;

  get isAuth() {
    return authModule.isAuth;
  }

  get authAddress(): string {
    return authModule.address;
  }

  get authChainSlug(): string {
    return authModule.chainSlug;
  }

  get authChainName() {
    return authModule.chainName;
  }

  get authChainIcon(): string {
    const icons: Record<string, string> = {
      eth: require('@/assets/img/market-header__wallet_icon1.svg'),
      goerli: require('@/assets/img-custom/profile-login-accordion_img9.png'),
      bsc: require('@/assets/img/market-header__wallet_icon3.svg'),
      polygon: require('@/assets/img/market-header__wallet_icon4.svg'),
      mumbai: require('@/assets/img-custom/profile-login-accordion_img10.png'),
      tron: require('@/assets/img/market-header__wallet_icon5.svg'),
      solana: require('@/assets/img/market-header__wallet_icon6.svg'),
    };

    return icons[authModule.chainType];
  }

  mounted() {
    this.$nextTick(() => {
      $('#market-header__wallet-col').on('show.bs.collapse', function () {
        ($('#market-header__wallet-col2') as any).collapse('hide');
      });

      $('#market-header__wallet-col2').on('show.bs.collapse', function () {
        ($('#market-header__wallet-col') as any).collapse('hide');
      });
    });
  }

  showConnectModal() {
    ($('.modal-profile-login') as any).modal('show');
  }

  async switchChain(chain: EMainChain) {
    if (!networkHelper.isAvailableBySlug(chain)) {
      notify.error('Chosen unsupported chain');
      return;
    }

    if (this.authChainSlug === chain) {
      notify.info('Chosen same chain');
      return;
    }

    await authModule.logout();
    authModule.selectMainChain(chain);

    this.$router.push(`/connect`);

    /** закрываем дропдаун сетей */

    ($('#market-header__wallet-col') as any).collapse('hide');
  }

  async logout() {
    await authModule.logout();

    this.$router.push(`/`);
  }
}
</script>
