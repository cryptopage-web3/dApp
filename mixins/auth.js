export const authMixin = {
  middleware: 'auth',
  watch: {
    '$store.state.auth': {
      handler() {
        if (!this.$store.getters['auth/isAuth']) {
          this.$router.push('/')
        }
      },
      immediate: true
    }
  }
}
