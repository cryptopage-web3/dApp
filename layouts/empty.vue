<template>
  <div class="container">
    <PageLoadBG v-if="!isReadyStore" />
    <template v-else>
      <notifications width="350" />
      <nuxt />
    </template>
  </div>
</template>

<script>
export default {
  middleware: ['signature'],
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
