<template>
  <div class="main">
    <page-loader v-if="!isReadyStore" />
    <template v-else>
      <notifications />
      <nuxt />
    </template>
  </div>
</template>

<script>
import { authMixin } from '@/mixins/auth'

export default {
  components: {
    'page-loader': () => import('@/components/loaders/PageLoadBG.vue')
  },
  mixins: [authMixin],
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
