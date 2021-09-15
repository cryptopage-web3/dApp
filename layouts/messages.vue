<template>
  <div class="main">
    <PageLoadBG v-if="!isReadyStore" />
    <template v-else>
      <notifications />
      <nuxt />
    </template>
  </div>
</template>

<script>
import { authMixin } from '@/mixins/auth'

export default {
  mixins: [authMixin],
  computed: {
    isReadyStore() {
      return this.$store.state.auth.status
    }
  }
}
</script>
