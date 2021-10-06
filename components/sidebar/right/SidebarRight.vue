<template>
  <div class="main-right">
    <div id="right-sidebar">
      <div class="main-right-item">
        <div class="connect-wallet-wr">
          <div class="connect-wallet-col connect-wallet__link-hover">
            <a
              href="#"
              data-toggle="modal"
              data-target="#modal-connect"
              role="button"
              class="connect-wallet__link"
            >
              <div class="connect-wallet__link-thumb">
                <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
              </div>
              <div class="connect-wallet__link-text">
                <div class="connect-wallet__link-tool">Etherum</div>
                <div class="connect-wallet__link-status">Connect wallet</div>
              </div>
            </a>
            <div class="connect-wallet-col-body">
              <ul class="connect-wallet__list">
                <li><a href="#">Activate layer 2</a></li>
                <li><a href="#">Copy Address</a></li>
                <li><a href="#">Transaction history</a></li>
                <li><a href="#">Claim</a></li>
                <li><a href="#">Change Wallet</a></li>
                <li><a href="#">Disconnect</a></li>
              </ul>
            </div>
          </div>
          <a href="#" class="dark-white">
            <img src="@/assets/img/dark-white_img2.png" alt="" />
          </a>
        </div>
      </div>
      <div class="main-right-item">
        <form>
          <div class="search-wr">
            <button class="search__btn">
              <img src="@/assets/img/search__btn_img2.png" alt="" />
            </button>
            <input
              type="text"
              placeholder="Search items, collections"
              class="search__input"
            />
          </div>
        </form>
      </div>
      <div class="main-right-item">
        <div class="banner">
          <a href="#" class="banner__close">
            <img src="@/assets/img/banner__close_img.png" alt="" />
          </a>
          <div class="banner__text">
            Создай NFT <br />
            и участвуй в розыгрыше <br />
            <span>10000 page</span>
          </div>
          <a href="#" class="btn btn_white btn_banner">
            <span> Создать NFT </span>
          </a>
        </div>
        <balance />
      </div>
      <div class="main-right-item">
        <div class="connect-wallet-wr">
          <div class="connect-wallet-col connect-wallet__link-hover">
            <a
              href="#"
              data-toggle="modal"
              data-target="#modal-connect"
              role="button"
              class="connect-wallet__link"
            >
              <div class="connect-wallet__link-thumb">
                <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
              </div>
              <div class="connect-wallet__link-text">
                <div class="connect-wallet__link-tool">Etherum</div>
                <div class="connect-wallet__link-status">Connect wallet</div>
              </div>
            </a>
            <div class="connect-wallet-col-body">
              <ul class="connect-wallet__list">
                <li><a href="#">Activate layer 2</a></li>
                <li><a href="#">Copy Address</a></li>
                <li><a href="#">Transaction history</a></li>
                <li><a href="#">Claim</a></li>
                <li><a href="#">Change Wallet</a></li>
                <li><a href="#">Disconnect</a></li>
              </ul>
            </div>
          </div>
          <a href="#" class="dark-white">
            <img src="@/assets/img/dark-white_img2.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  components: {
    balance: async () =>
      await import('@/components/sidebar/right/SidebarRightBalance.vue')
  }
})
export default class SidebarRight extends Vue {}
</script>
