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
<script>
export default {
  components: {
    connect: async () => await import('@/components/connect/Connect.vue'),
    signin: async () => await import('@/components/auth/Signin.vue'),
    icon: async () => await import('@/components/icons/Icon')
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
