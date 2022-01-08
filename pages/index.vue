<template>
  <div class="start-page">
    <top-images />
    <hot-collections />
    <top-collections-bar />
    <div v-if="!isMounted || loading" class="start-page__loading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <signin ref="signin" @success="successLogin" />
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
    signin: async () => await import('@/components/auth/Signin.vue'),
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

  loading = true
  isMounted = false

  $refs!: {
    signin: any
  }

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  @Watch('isAuth', { immediate: true })
  onIsAuthChanged(isAuth: boolean) {
    if (!isAuth) {
      this.loading = false
      return
    }

    this.redirectToHome()
  }

  mounted() {
    /** Нужно время, чтобы подключиться к расширению */
    setTimeout(() => {
      this.isMounted = true
    }, 500)
  }

  redirectToHome() {
    this.loading = true

    const address = this.typedStore.auth.selectedAddress
    const network = this.typedStore.auth.selectedNetworkSlug

    this.$router.push(`/${network}/${address}`)
  }

  signin() {
    this.$refs.signin.init()
  }

  successLogin() {
    this.redirectToHome()
  }
}
</script>
