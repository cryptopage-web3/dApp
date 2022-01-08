<template>
  <div class="main-left">
    <header id="left-sidebar" class="header">
      <div class="header__top">
        <router-link to="/" class="header-logo">
          <img src="@/assets/img/header-logo_img@x2.png" />
        </router-link>
        <a href="#" class="header-toggle d-xl-none" @click.prevent="toggleMenu">
          <img src="@/assets/img/nav_bg2.svg" />
        </a>
      </div>
      <left-menu v-if="isAuth" />
    </header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'
import { init as stickySidebarInit } from '~/utils/stickySidebar'

@Component({
  components: {
    'left-menu': async () =>
      await import('~/components/sidebar/left/SidebarLeftMenu.vue')
  }
})
export default class SidebarLeft extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  get address(): string {
    return this.typedStore.auth.selectedAddress
  }

  get networkName(): string {
    return this.typedStore.auth.selectedNetworkSlug
  }

  mounted() {
    if (Number($(window).width()) > 767) {
      stickySidebarInit('#left-sidebar', '.main-left')
    }

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
