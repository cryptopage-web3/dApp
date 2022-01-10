<template>
  <div>
    <ul class="header-list">
      <li>
        <router-link
          :to="`/${networkName}/${address}/nft`"
          class="header-list__item"
        >
          <div>
            <img
              src="@/assets/img/header-list__item_img1_2_2.png"
              class="header-list__item-img1"
            />
            <img
              src="@/assets/img/header-list__item_img1_2.png"
              class="header-list__item-img2"
            />
          </div>
          <span> Home </span>
        </router-link>
      </li>
      <li>
        <router-link to="/messages" class="header-list__item">
          <div>
            <img
              src="@/assets/img/header-list__item_img2_2_2.png"
              class="header-list__item-img1"
            />
            <img
              src="@/assets/img/header-list__item_img2_2.png"
              class="header-list__item-img2"
            />
          </div>
          <span> Messages </span>
        </router-link>
      </li>
      <li class="mb-xl-0">
        <router-link to="/profile" class="header-list__item">
          <div>
            <img
              src="@/assets/img/header-list__item_img3_2_2.png"
              alt=""
              class="header-list__item-img1"
            />
            <img
              src="@/assets/img/header-list__item_img3_2.png"
              alt=""
              class="header-list__item-img2"
            />
          </div>
          <span> Profile </span>
        </router-link>
      </li>
      <li class="header-list_cw d-xl-none">
        <!-- TODO: Поиск и кошелек для мобилки перенести в отдельный компонент -->
        <div class="header-list-wr">
          <div class="header-list__search">
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
          <connect />
        </div>
      </li>
    </ul>
    <div v-if="isShowCreateNft" class="sidebar-left__create">
      <button class="btn btn_blue btn_profile" @click.prevent="openNFTForm">
        <img src="@/assets/img/profile__add_img.svg" alt="" />
        <span>Create NFT</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import NetworkNameMixin from '~/mixins/networkName'

@Component({
  components: {
    connect: async () => await import('~/components/connect/Connect.vue')
  }
})
export default class SidebarLeftMenu extends mixins(NetworkNameMixin) {
  isShowCreateNft = false

  get address(): string {
    return this.typedStore.auth.selectedAddress
  }

  @Watch('$route', { immediate: true })
  onRouteChanged() {
    this.$nextTick(() => {
      $(window).unbind('scroll', this.showCreateNft)

      if (!this.$route.params.address) {
        this.isShowCreateNft = true
        return
      }

      this.showCreateNft()
      $(window).bind('scroll', this.showCreateNft)
    })
  }

  openNFTForm() {
    ;($('#nft-form-modal') as any).modal('show')
  }

  showCreateNft() {
    this.isShowCreateNft = Number($(window).scrollTop()) > 300
  }
}
</script>
