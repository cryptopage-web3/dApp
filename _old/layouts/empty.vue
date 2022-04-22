<template>
  <div class="container">
    <page-loader v-if="!isReadyStore" />
    <template v-else>
      <notifications width="350" />
      <nuxt />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  components: {
    'page-loader': () => import('@/components/loaders/PageLoadBG.vue')
  }
})
export default class EmptyLayout extends Vue {
  get isReadyStore(): boolean {
    return this.$store.state.auth.status
  }
}
</script>
