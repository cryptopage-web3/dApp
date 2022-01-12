<template>
  <div class="main-left">
    <header id="start-left-sidebar" class="header">
      <div class="header__top">
        <router-link to="/" class="header-logo">
          <img src="@/assets/img/header-logo_img@x2.png" />
        </router-link>
        <a href="#" class="header-toggle d-xl-none" @click.prevent="toggleMenu">
          <img src="@/assets/img/nav_bg2.svg" alt="" />
        </a>
        <ul
          id="main-header-list-accordion"
          class="header-list accordion main-header-list"
        >
          <li class="main-header-list__title">
            <div>
              <icon type="start_sidebar_filter" />
            </div>
            <span> Filter </span>
          </li>
          <li class="card">
            <div id="main-header-list__ac1" class="card-header">
              <button
                class="main-header-list__link"
                type="button"
                data-toggle="collapse"
                data-target="#main-header-list__ac1_2"
                aria-expanded="true"
                aria-controls="main-header-list__ac1_2"
              >
                <div>
                  <icon type="start_sidebar_status" />
                </div>
                <span> Status </span>
                <icon type="start_sidebar_arrow" />
              </button>
            </div>

            <div
              id="main-header-list__ac1_2"
              class="collapse show"
              aria-labelledby="main-header-list__ac1"
              data-parent="#main-header-list-accordion"
            >
              <div class="main-header-list__body">
                <div class="filtr-radio-wrap">
                  <div class="filtr-radio">
                    <input id="radio1" type="radio" name="radio1" />
                    <label for="radio1"> Buy now </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio2" type="radio" name="radio1" />
                    <label for="radio2"> Has offers </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio3" type="radio" name="radio1" />
                    <label for="radio3"> On auction </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio4" checked type="radio" name="radio1" />
                    <label for="radio4"> New </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="card">
            <div id="main-header-list__ac2" class="card-header">
              <button
                class="main-header-list__link"
                type="button"
                data-toggle="collapse"
                data-target="#main-header-list__ac2_2"
                aria-expanded="false"
                aria-controls="main-header-list__ac2_2"
              >
                <div>
                  <icon type="start_sidebar_price" />
                </div>
                <span> Price </span>
                <icon type="start_sidebar_arrow" />
              </button>
            </div>

            <div
              id="main-header-list__ac2_2"
              class="collapse"
              aria-labelledby="main-header-list__ac2"
              data-parent="#main-header-list-accordion"
            >
              <div class="main-header-list__body">
                <div class="filtr-radio-wrap">
                  <div class="filtr-radio">
                    <input id="radio5" type="radio" name="radio2" />
                    <label for="radio5">
                      <img src="@/assets/img/filtr-radio_img1.svg" alt="" />
                      <span> US Dollar </span>
                    </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio6" type="radio" name="radio2" />
                    <label for="radio6">
                      <img src="@/assets/img/filtr-radio_img2.svg" alt="" />
                      <span> Ether </span>
                    </label>
                  </div>
                </div>
                <div class="filtr-min-max">
                  <input type="text" placeholder="Min" class="input" />
                  <span> to </span>
                  <input type="text" placeholder="Max" class="input" />
                </div>
              </div>
            </div>
          </li>
          <li class="card">
            <div id="main-header-list__ac3" class="card-header">
              <button
                class="main-header-list__link"
                type="button"
                data-toggle="collapse"
                data-target="#main-header-list__ac3_2"
                aria-expanded="false"
                aria-controls="main-header-list__ac3_2"
              >
                <div>
                  <icon type="start_sidebar_collections" />
                </div>
                <span> Collections </span>
                <icon type="start_sidebar_arrow" />
              </button>
            </div>

            <div
              id="main-header-list__ac3_2"
              class="collapse"
              aria-labelledby="main-header-list__ac3"
              data-parent="#main-header-list-accordion"
            >
              <div class="main-header-list__body">
                <div class="filtr-search">
                  <button class="btn">
                    <img src="@/assets/img/filtr-search_img.svg" alt="" />
                  </button>
                  <input type="text" placeholder="Search" class="input" />
                </div>
                <div class="filtr-checkboxs">
                  <div class="filtr-checkbox">
                    <input id="checkbox1" type="checkbox" class="checkbox" />
                    <label for="checkbox1">
                      The Sandbox
                      <img
                        src="@/assets/img/filtr-checkbox__recom.svg"
                        alt=""
                      />
                    </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input
                      id="checkbox2"
                      checked
                      type="checkbox"
                      class="checkbox"
                    />
                    <label for="checkbox2">
                      Bored Ape Yacht C...
                      <img
                        src="@/assets/img/filtr-checkbox__recom.svg"
                        alt=""
                      />
                    </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input id="checkbox3" type="checkbox" class="checkbox" />
                    <label for="checkbox3">
                      the littles NFT
                      <img
                        src="@/assets/img/filtr-checkbox__recom.svg"
                        alt=""
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="card">
            <div id="main-header-list__ac4" class="card-header">
              <button
                class="main-header-list__link"
                type="button"
                data-toggle="collapse"
                data-target="#main-header-list__ac4_2"
                aria-expanded="false"
                aria-controls="main-header-list__ac4_2"
              >
                <div>
                  <icon type="start_sidebar_chains" />
                </div>
                <span> Chains </span>
                <icon type="start_sidebar_arrow" />
              </button>
            </div>

            <div
              id="main-header-list__ac4_2"
              class="collapse"
              aria-labelledby="main-header-list__ac4"
              data-parent="#main-header-list-accordion"
            >
              <div class="main-header-list__body">
                <div class="filtr-checkboxs">
                  <div class="filtr-checkbox">
                    <input
                      id="chain-avalanche"
                      type="checkbox"
                      class="checkbox"
                    />
                    <label for="chain-avalanche"> Avalanche </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input id="chain-bsc" type="checkbox" class="checkbox" />
                    <label for="chain-bsc"> Bsc </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input
                      id="chain-ethereum"
                      type="checkbox"
                      class="checkbox"
                    />
                    <label for="chain-ethereum"> Ethereum </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input
                      id="chain-polygon"
                      type="checkbox"
                      class="checkbox"
                    />
                    <label for="chain-polygon"> Polygon </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input id="chain-solana" type="checkbox" class="checkbox" />
                    <label for="chain-solana"> Solana </label>
                  </div>
                  <div class="filtr-checkbox">
                    <input id="chain-tron" type="checkbox" class="checkbox" />
                    <label for="chain-tron"> Tron </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="card">
            <div id="main-header-list__ac5" class="card-header">
              <button
                class="main-header-list__link"
                type="button"
                data-toggle="collapse"
                data-target="#main-header-list__ac5_2"
                aria-expanded="false"
                aria-controls="main-header-list__ac5_2"
              >
                <div>
                  <icon type="start_sidebar_categories" />
                </div>
                <span> Categories </span>
                <icon type="start_sidebar_arrow" />
              </button>
            </div>

            <div
              id="main-header-list__ac5_2"
              class="collapse"
              aria-labelledby="main-header-list__ac5"
              data-parent="#main-header-list-accordion"
            >
              <div class="main-header-list__body">
                <div class="filtr-radio-wrap">
                  <div class="filtr-radio">
                    <input id="radio7" type="radio" name="radio3" />
                    <label for="radio7"> Art </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio8" type="radio" name="radio3" />
                    <label for="radio8"> Music </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio9" type="radio" name="radio3" />
                    <label for="radio9"> Utility </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio10" type="radio" name="radio3" />
                    <label for="radio10"> Collectibles </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio11" type="radio" name="radio3" />
                    <label for="radio11"> Domain Names </label>
                  </div>
                  <div class="filtr-radio">
                    <input
                      id="category-transactions"
                      checked
                      type="radio"
                      name="radio3"
                    />
                    <label for="category-transactions"> Transactions </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="card">
            <div id="main-header-list__ac6" class="card-header">
              <button
                class="main-header-list__link"
                type="button"
                data-toggle="collapse"
                data-target="#main-header-list__ac6_2"
                aria-expanded="false"
                aria-controls="main-header-list__ac6_2"
              >
                <div>
                  <icon type="start_sidebar_sale" />
                </div>
                <span> On sale in </span>
                <icon type="start_sidebar_arrow" />
              </button>
            </div>

            <div
              id="main-header-list__ac6_2"
              class="collapse"
              aria-labelledby="main-header-list__ac6"
              data-parent="#main-header-list-accordion"
            >
              <div class="main-header-list__body">
                <div class="filtr-search">
                  <button class="btn">
                    <img src="@/assets/img/filtr-search_img.svg" alt="" />
                  </button>
                  <input type="text" placeholder="Ether" class="input" />
                </div>
                <div class="filtr-radio-wrap">
                  <div class="filtr-radio">
                    <input id="radio12" type="radio" name="radio4" />
                    <label for="radio12"> ETH </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio13" type="radio" name="radio4" />
                    <label for="radio13"> WETH </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio14" type="radio" name="radio4" />
                    <label for="radio14"> $BASED </label>
                  </div>
                  <div class="filtr-radio">
                    <input id="radio15" type="radio" name="radio4" />
                    <label for="radio15"> 0xBTC </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { init as stickySidebarInit } from '~/utils/stickySidebar'

@Component({
  components: {
    icon: async () => await import('@/components/icons/Icon.vue')
  }
})
export default class StartSidebarLeft extends Vue {
  mounted() {
    if (Number($(window).width()) > 767) {
      stickySidebarInit('#start-left-sidebar', '.main-left')
    }

    this.$nextTick(() => {
      ;($('.filtr-checkbox .checkbox') as any).styler()
    })

    // Hide mobile menu

    document.addEventListener('click', function (event) {
      const e = $('.header-list')

      for (let i = 0; i < e.length; i++) {
        if (
          !e.get(i)?.contains(event.target as Node) &&
          !$('.header-toggle')
            .get(0)
            ?.contains(event.target as Node)
        ) {
          $(e.get(i) as any).slideUp(300)
        }
      }
    })
  }

  toggleMenu() {
    if ($('.header-list').is(':visible')) {
      $('.header-list').slideUp(300)
    } else {
      $('.header-list').slideDown(300)
    }
  }
}
</script>
