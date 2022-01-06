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
              <img src="@/assets/img/search__btn_img2.svg" alt="" />
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
        <div class="collection-bar">
          <div class="top">
            <h3 class="title">Top collections over</h3>
            <div class="main-page-dropdown">
              <button
                id="dropdownMenuButton2"
                class="main-page-dropdown__btn"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                7 day
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <a class="dropdown-item" href="#">6 day</a>
                <a class="dropdown-item" href="#">5 day</a>
                <a class="dropdown-item" href="#">4 day</a>
              </div>
            </div>
          </div>
          <div class="wrap">
            <div class="item">
              <div class="left">
                <a
                  href="#"
                  class="thumb"
                  :style="{ backgroundImage: `url(${collectionBarUrl})` }"
                ></a>
                <div>
                  <a href="#" class="title"> CryptoPunks </a>
                  <div class="coin">
                    <img src="@/assets/img/collection-bar_icon1.svg" alt="" />
                    <span> 5, 807 </span>
                  </div>
                </div>
              </div>
              <div class="procent">+ 695%</div>
            </div>
            <div class="item">
              <div class="left">
                <a
                  href="#"
                  class="thumb"
                  :style="{ backgroundImage: `url(${collectionBarUrl})` }"
                ></a>
                <div>
                  <a href="#" class="title"> CryptoPunks </a>
                  <div class="coin">
                    <img src="@/assets/img/collection-bar_icon1.svg" alt="" />
                    <span> 5, 807 </span>
                  </div>
                </div>
              </div>
              <div class="procent">+ 695%</div>
            </div>
            <div class="item">
              <div class="left">
                <a
                  href="#"
                  class="thumb"
                  :style="{ backgroundImage: `url(${collectionBarUrl})` }"
                ></a>
                <div>
                  <a href="#" class="title"> CryptoPunks </a>
                  <div class="coin">
                    <img src="@/assets/img/collection-bar_icon1.svg" alt="" />
                    <span> 5, 807 </span>
                  </div>
                </div>
              </div>
              <div class="procent">+ 695%</div>
            </div>
            <div class="item">
              <div class="left">
                <a
                  href="#"
                  class="thumb"
                  :style="{ backgroundImage: `url(${collectionBarUrl})` }"
                ></a>
                <div>
                  <a href="#" class="title"> CryptoPunks </a>
                  <div class="coin">
                    <img src="@/assets/img/collection-bar_icon1.svg" alt="" />
                    <span> 5, 807 </span>
                  </div>
                </div>
              </div>
              <div class="procent">+ 695%</div>
            </div>
            <div class="item">
              <div class="left">
                <a
                  href="#"
                  class="thumb"
                  :style="{ backgroundImage: `url(${collectionBarUrl})` }"
                ></a>
                <div>
                  <a href="#" class="title"> CryptoPunks </a>
                  <div class="coin">
                    <img src="@/assets/img/collection-bar_icon1.svg" alt="" />
                    <span> 5, 807 </span>
                  </div>
                </div>
              </div>
              <div class="procent">+ 695%</div>
            </div>
          </div>
          <div class="collection-bar__bottom">
            <a href="#" class="main-page-top__see"> See all </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import collectionBarPath from '~/assets/img/collection-bar_bg.jpg'

@Component({})
export default class StartSidebarRight extends Vue {
  collectionBarUrl = collectionBarPath
}
</script>
