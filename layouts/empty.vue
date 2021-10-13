<template>
  <div class="container">
    <PageLoadBG v-if="!isReadyStore" />
    <template v-else>
      <notifications width="350" />
      <nuxt />
    </template>
    <connect-modal />
  </div>
</template>

<script>
export default {
  components: {
    'connect-modal': async () =>
      await import('@/components/connect/ConnectModal.vue')
  },
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
