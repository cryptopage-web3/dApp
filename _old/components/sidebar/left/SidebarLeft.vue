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
      <left-menu />
    </header>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { init as stickySidebarInit } from '~/utils/stickySidebar'

@Component({
  components: {
    'left-menu': async () =>
      await import('~/components/sidebar/left/SidebarLeftMenu.vue')
  }
})
export default class SidebarLeft extends Vue {
  mounted() {
    stickySidebarInit('#left-sidebar', '.main-left')

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
