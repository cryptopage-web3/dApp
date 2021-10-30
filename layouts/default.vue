<template>
  <div>
    <page-loader v-if="!isReadyStore" />
    <template v-else>
      <section class="main">
        <notifications :duration="10000" />
        <div class="container">
          <div class="main-wr">
            <sidebar-left />
            <div class="main-center">
              <nuxt />
            </div>
            <sidebar-right />
          </div>
        </div>
      </section>
      <footer-section />
    </template>
    <connect-modal />
    <nft-form-modal />
  </div>
</template>

<script>
export default {
  components: {
    'page-loader': () => import('@/components/loaders/PageLoadBG.vue'),
    'sidebar-left': async () =>
      await import('@/components/sidebar/left/SidebarLeft'),
    'sidebar-right': async () =>
      await import('@/components/sidebar/right/SidebarRight'),
    'footer-section': async () => await import('@/components/footer/Footer'),
    'connect-modal': async () =>
      await import('@/components/connect/ConnectModal.vue'),
    'nft-form-modal': async () =>
      await import('@/components/nft-form/NFTFormModal.vue')
  },
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
