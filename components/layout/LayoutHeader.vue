<template>
  <header class="market-header">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <nuxt-link to="/" class="navbar-brand">
          <img src="@/assets/img/market-header-logo.svg" alt="" />
        </nuxt-link>
        <div class="market-header-search">
          <div class="market-header-search__top">
            <input
              type="text"
              placeholder="Search items, collections"
              class="market-header-search__input"
            />
            <a href="#" class="market-header-search__clear">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L6.29289 16.2929ZM17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L17.7071 7.70711ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L7.70711 6.29289ZM16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L16.2929 17.7071ZM7.70711 17.7071L17.7071 7.70711L16.2929 6.29289L6.29289 16.2929L7.70711 17.7071ZM6.29289 7.70711L16.2929 17.7071L17.7071 16.2929L7.70711 6.29289L6.29289 7.70711Z"
                  fill="#687684"
                />
              </svg>
            </a>
          </div>
          <div class="market-header-search__drop">
            <div class="market-header-search__body">
              <div class="market-header-search__item">
                <div class="title">Collections</div>
                <ul class="market-header-search__list">
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar1.png"
                          alt=""
                        />
                        <span> CryptoPunk </span>
                        <img
                          src="@/assets/img/market-header-search-ident.svg"
                          alt=""
                          class="ident"
                        />
                      </div>
                      <div class="count">
                        <img
                          src="@/assets/img/market-header-search_eth.svg"
                          alt=""
                        />
                        <span> 23 456 items </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar2.png"
                          alt=""
                        />
                        <span> Punk Punk </span>
                      </div>
                      <div class="count">
                        <img
                          src="@/assets/img/market-header-search_eth.svg"
                          alt=""
                        />
                        <span> 9 456 items </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar3.png"
                          alt=""
                        />
                        <span> Punky is </span>
                        <img
                          src="@/assets/img/market-header-search-ident.svg"
                          alt=""
                          class="ident"
                        />
                      </div>
                      <div class="count">
                        <img
                          src="@/assets/img/market-header-search_eth.svg"
                          alt=""
                        />
                        <span> 4 456 items </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar4.png"
                          alt=""
                        />
                        <span> Punk Neon </span>
                      </div>
                      <div class="count">
                        <img
                          src="@/assets/img/market-header-search_eth.svg"
                          alt=""
                        />
                        <span> 2 456 items </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="market-header-search__item">
                <div class="title">Accounts</div>
                <ul class="market-header-search__list">
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar1.png"
                          alt=""
                        />
                        <span> CryptoPunk </span>
                        <img
                          src="@/assets/img/market-header-search-ident.svg"
                          alt=""
                          class="ident"
                        />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar2.png"
                          alt=""
                        />
                        <span> Punk Punk </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar3.png"
                          alt=""
                        />
                        <span> Punky is </span>
                        <img
                          src="@/assets/img/market-header-search-ident.svg"
                          alt=""
                          class="ident"
                        />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="left">
                        <img
                          class="avatar"
                          src="@/assets/img/market-header-search-avatar4.png"
                          alt=""
                        />
                        <span> Punk Neon </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#" class="market-header-search__all">
                See all 32 673 results
              </a>
            </div>
          </div>
        </div>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="market-header-menu">
            <li><a href="#">Explore</a></li>
            <li><a href="#">Activity</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>
        <div class="market-header__right">
          <HeaderConnect />
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src="@/assets/img/nav_bg2.svg" alt="" />
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import HeaderConnect from './HeaderConnect.vue';
import { headerSearchInit } from '~/utils/headerSearch';
import { dropdownMenuInit } from '~/utils/dropdownMenu';

@Component({
  components: {
    HeaderConnect,
  },
})
export default class LayoutHeader extends Vue {
  mounted() {
    headerSearchInit();
    dropdownMenuInit();
  }
}
</script>
