<template>
  <div class="main-left">
    <header class="sidebar">
      <div class="sidebar-top">
        <router-link to="/" class="logo">
          <div>
            <Icon type="twitter-logo" />
          </div>
        </router-link>
        <SidebarLeftMenu v-if="isAuth" />
        <SidebarLeftBanner v-else />
      </div>
      <profile />
    </header>
  </div>
</template>
<script>
export default {
  components: {
    profile: async () =>
      await import('@/components/sidebar/left/SidebarLeftProfile'),
    Icon: async () => await import('@/components/icons/Icon')
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  }
}
</script>
