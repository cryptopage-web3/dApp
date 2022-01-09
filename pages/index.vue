<template>
  <div class="start-page">
    <top-images />
    <hot-collections />
    <top-collections-bar />
    <div v-if="!isMounted" class="start-page__loading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'

@Component({
  layout: 'start',
  fetchOnServer: false,

  components: {
    'top-images': async () =>
      await import('@/components/start/StartTopImages.vue'),
    'hot-collections': async () =>
      await import('@/components/start/StartHotCollections.vue'),
    'top-collections-bar': async () =>
      await import('@/components/start/StartTopCollectionsBar.vue')
  }
})
export default class IndexPage extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  isMounted = false

  mounted() {
    /** Нужно время, чтобы подключиться к расширению */
    setTimeout(() => {
      this.isMounted = true
    }, 500)
  }
}
</script>
