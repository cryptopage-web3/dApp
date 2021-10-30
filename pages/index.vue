<template>
  <div class="start-page">
    <div class="start-page__logo">
      <icon type="logo" />
    </div>
    <div class="start-page__header">
      <div class="start-page__header-title">Welcome to Crypto.Page</div>
      <div class="start-page__header-subtitle">The Best crypto app</div>
    </div>
    <div v-if="!isAuth" class="start-page__signin">
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
    <div v-if="isAuth" class="start-page__auth">
      <div class="start-page__auth-container">
        <connect />
      </div>
    </div>
    <signin ref="signin" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'

@Component({
  layout: 'empty',
  fetchOnServer: false,

  components: {
    connect: async () => await import('@/components/connect/Connect.vue'),
    signin: async () => await import('@/components/auth/Signin.vue'),
    icon: async () => await import('@/components/icons/Icon.vue')
  }
})
export default class extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  $refs!: {
    signin: any
  }

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  signin() {
    this.$refs.signin.init()
  }
}
</script>
