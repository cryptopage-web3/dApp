<template>
  <div class="main-left">
    <header id="left-sidebar" class="header">
      <router-link to="/" class="header-logo">
        <img src="@/assets/img/header-logo_img.png" />
        <div class="header-logo__text"><span>Crypto.</span>page</div>
      </router-link>
      <router-link to="/" class="header-toggle d-xl-none">
        <img src="@/assets/img/nav_bg2.svg" />
      </router-link>
      <SidebarLeftMenu v-if="isAuth" />
      <SidebarLeftBanner v-else />
    </header>
    <profile />
  </div>
</template>
<script>
export default {
  components: {
    profile: async () =>
      await import('@/components/sidebar/left/SidebarLeftProfile')
  },
  data: () => ({
    stickySidebar: null
  }),
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  },
  mounted() {
    this.stickySidebar = new StickySidebar('#left-sidebar', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.main-left',
      innerWrapperSelector: '#left-sidebar',
      resizeSensor: true,
      minWidth: 1199.5
    })
  }
}
</script>
