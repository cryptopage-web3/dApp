<template>
  <div class="main-right">
    <div id="start-right-sidebar">
      <div class="main-right-item">
        <connect @success-login="successLogin" />
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
    <connectModal />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import collectionBarPath from '~/assets/img/collection-bar_bg.jpg'
import { init as stickySidebarInit } from '~/utils/stickySidebar'
import TypedStore from '~/logic/store'

@Component({
  components: {
    connect: async () => await import('@/components/connect/Connect.vue'),
    connectModal: async () =>
      await import('@/components/connect/ConnectModal.vue')
  }
})
export default class StartSidebarRight extends Vue {
  public typedStore: TypedStore = useStore(this.$store)
  collectionBarUrl = collectionBarPath

  mounted() {
    if (Number($(window).width()) > 767) {
      stickySidebarInit('#start-right-sidebar', '.main-right')
    }
  }

  successLogin() {
    const address = this.typedStore.auth.selectedAddress
    const network = this.typedStore.auth.selectedNetworkSlug

    this.$router.push(`/${network}/${address}`)
  }
}
</script>
