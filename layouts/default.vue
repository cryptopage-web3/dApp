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

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'

@Component({
  components: {
    'page-loader': () => import('@/components/loaders/PageLoadBG.vue'),
    'sidebar-left': async () =>
      await import('@/components/sidebar/left/SidebarLeft.vue'),
    'sidebar-right': async () =>
      await import('@/components/sidebar/right/SidebarRight.vue'),
    'footer-section': async () =>
      await import('@/components/footer/Footer.vue'),
    'connect-modal': async () =>
      await import('@/components/connect/ConnectModal.vue'),
    'nft-form-modal': async () =>
      await import('@/components/nft-form/NFTFormModal.vue')
  }
})
export default class DefaultLayout extends Vue {
  get isReadyStore(): boolean {
    return this.$store.state.auth.status
  }

  /** в момент изменения роута необходим триггер скролла
   * чтобы обновилось положение сайдбаров
   */
  @Watch('$route')
  onRouteChanged() {
    setTimeout(() => {
      $(window).trigger('scroll')
    }, 100)
  }
}
</script>
