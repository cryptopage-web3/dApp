<template>
  <div class="container">
    <page-loader v-if="!isReadyStore" />
    <template v-else>
      <notifications width="350" />
      <nuxt />
    </template>
  </div>
</template>

<script>
export default {
  components: {
    'page-loader': () => import('@/components/loaders/PageLoadBG.vue')
  },
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
