<template>
  <div>
    <PageLoadBG v-if="!isReadyStore" />
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
  </div>
</template>

<script>
export default {
  components: {
    'sidebar-left': async () =>
      await import('@/components/sidebar/left/SidebarLeft'),
    'sidebar-right': async () =>
      await import('@/components/sidebar/right/SidebarRight'),
    'footer-section': async () => await import('@/components/footer/Footer')
  },
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
