<template>
  <div class="left-banner">
    <div class="left-banner__logo">
      <Icon type="twitter-logo" />
    </div>
    <div class="left-banner__title">Crypto.Page</div>
    <div class="left-banner__features">
      <div class="left-banner__feature">The future is here</div>
      <div class="left-banner__feature">Many accounts</div>
      <div class="left-banner__feature">Many features</div>
    </div>
    <div class="left-banner__login">
      <div class="left-banner__login-link" @click="signin">Log in</div>
      <div class="left-banner__login-desc">to get all benefits</div>
    </div>
    <Signin ref="signin" />
  </div>
</template>
<script>
export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon'),
    Signin: async () => await import('@/components/auth/Signin.vue')
  },
  methods: {
    signin() {
      this.$refs.signin.init()
    }
  }
}
</script>
