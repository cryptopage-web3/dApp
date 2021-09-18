<template>
  <div id="app" class="main">
    <PageLoadBG v-if="!isReadyStore" />
    <template v-else>
      <notifications />
      <div class="container">
        <div class="main-wr">
          <sidebar-left />
          <div class="main-center">
            <nuxt />
          </div>
          <sidebar-right />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    'sidebar-left': async () =>
      await import('@/components/sidebar/left/SidebarLeft'),
    'sidebar-right': async () =>
      await import('@/components/sidebar/right/SidebarRight')
  },
  middleware: ['signature'],
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
