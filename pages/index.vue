<template>
  <div class="start-page">
    <div class="start-page__logo">
      <Icon type="logo" />
    </div>
    <div class="start-page__header">
      <div class="start-page__header-title">Welcome to Crypto.Page</div>
      <div class="start-page__header-subtitle">The Best crypto app</div>
    </div>
    <div v-if="!isAuth" class="start-page__signin">
      <div class="start-page__signin-control">
        <button class="start-page__signin-btn" type="button" @click="signin">
          Sign in
        </button>
      </div>
      <div class="start-page__signin-title">Join Crypto.Page now!</div>
    </div>
    <div v-if="isAuth" class="start-page__auth">
      <Profile />
    </div>
    <Signin ref="signin" />
  </div>
</template>
<script>
export default {
  components: {
    Profile: async () =>
      await import('@/components/sidebar/left/SidebarLeftProfile'),
    Signin: async () => await import('@/components/auth/Signin.vue'),
    Icon: async () => await import('@/components/icons/Icon')
  },
  layout: 'empty',
  fetchOnServer: false,
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  },
  methods: {
    signin() {
      this.$refs.signin.init()
    }
  }
}
</script>
