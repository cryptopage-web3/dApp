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
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  }
}
</script>
