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
    <!-- ConnectModal вынес из sidebar-right, т.к. должен открываться вне компонента -->
    <connectModal @success-login="successLogin" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'

@Component({
  components: {
    'page-loader': () => import('@/components/loaders/PageLoadBG.vue'),
    'sidebar-left': async () =>
      await import('@/components/start/StartSidebarLeft.vue'),
    'sidebar-right': async () =>
      await import('@/components/start/StartSidebarRight.vue'),
    'footer-section': async () =>
      await import('@/components/footer/Footer.vue'),
    connectModal: async () =>
      await import('@/components/connect/ConnectModal.vue')
  }
})
export default class StartLayout extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

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

  successLogin() {
    const address = this.typedStore.auth.selectedAddress
    const network = this.typedStore.auth.selectedNetworkSlug

    this.$router.push(`/${network}/${address}/nft`)
  }
}
</script>
