<template>
  <div class="main-left">
    <header id="left-sidebar" class="header">
      <router-link to="/" class="header-logo">
        <img src="@/assets/img/header-logo_img.png" />
        <div class="header-logo__text"><span>Crypto.</span>page</div>
      </router-link>
      <a href="#" class="header-toggle d-xl-none" @click.prevent="toggleMenu">
        <img src="@/assets/img/nav_bg2.svg" />
      </a>
      <left-menu v-if="isAuth" />
    </header>
  </div>
</template>
<script>
import { init as stickySidebarInit } from '~/utils/stickySidebar'

export default {
  components: {
    'left-menu': async () =>
      await import('@/components/sidebar/left/SidebarLeftMenu')
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  },
  mounted() {
    stickySidebarInit('#left-sidebar', '.main-left')

    // Hide mobile menu

    document.addEventListener('click', function (event) {
      const e = $('.header-list')
      for (let i = 0; i < e.length; i++) {
        if (
          !e.get(i).contains(event.target) &&
          !$('.header-toggle').get(0).contains(event.target)
        ) {
          $(e.get(i)).slideUp(300)
        }
      }
    })
  },
  methods: {
    toggleMenu() {
      if ($('.header-list').is(':visible')) {
        $('.header-list').slideUp(300)
      } else {
        $('.header-list').slideDown(300)
      }
    }
  }
}
</script>
