<template>
  <div class="start-page">
    <top-images />
    <hot-collections />
    <top-collections-bar />
    <!-- TODO: нужно вернуть v-if="!isMounted" -->
    <div v-if="true" class="start-page__loading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'
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

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  get selectedAddress(): string {
    return this.typedStore.auth.selectedAddress
  }

  get selectedNetworkSlug(): string {
    return this.typedStore.auth.selectedNetworkSlug
  }

  mounted() {
    /** Нужно время, чтобы подключиться к расширению */
    setTimeout(() => {
      this.isMounted = true
    }, 500)
  }

  beforeDestroy() {
    /** закрываем модалку перед уходом со страницы, иначе сохраняется черный фон */
    ;($('#modal-connect') as any).removeClass('fade').modal('hide')
  }

  @Watch('isMounted')
  onIsMountedChanged(isMounted: boolean) {
    if (!isMounted) {
      return
    }

    /** TODO: это временное решение.
     * Нужно убрать открытие модалки и редирект,
     * когда стартовая старница будет готова
     **/

    if (this.isAuth) {
      this.homeRedirect()
      return
    }

    /** Из-за возможности изменения isAuth в момент открытия модалки, убираем анимацию fade
     * иначе возможны баги с закрытием модалки в момент редиректа
     **/
    ;($('#modal-connect') as any).removeClass('fade').modal('show')
  }

  @Watch('isAuth')
  onIsAuthChanged() {
    if (this.isAuth && this.isMounted) {
      this.homeRedirect()
    }
  }

  homeRedirect() {
    ;($('#modal-connect') as any).modal('hide')

    setTimeout(() => {
      this.$router.push(
        `/${this.selectedNetworkSlug}/${this.selectedAddress}/nft`
      )
    }, 300)
  }
}
</script>
