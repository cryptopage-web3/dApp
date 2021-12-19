<template>
  <div class="start-page">
    <div class="start-page__logo">
      <icon type="logo" />
    </div>
    <div class="start-page__header">
      <div class="start-page__header-title">Welcome to Crypto.Page</div>
      <div class="start-page__header-subtitle">The Best crypto app</div>
    </div>
    <div class="start-page__signin">
      <div class="start-page__signin-control">
        <button
          class="start-page__signin-btn btn_blue"
          type="button"
          @click="signin"
        >
          Sign in
        </button>
      </div>
      <div class="start-page__signin-title">Join Crypto.Page now!</div>
    </div>
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
  layout: 'empty',
  fetchOnServer: false,

  components: {
    signin: async () => await import('@/components/auth/Signin.vue'),
    icon: async () => await import('@/components/icons/Icon.vue')
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
