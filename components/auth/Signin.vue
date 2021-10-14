<template>
  <div />
</template>
<script>
export default {
  methods: {
    async init() {
      const response = await this.$store.dispatch('auth/signin')

      this.$notify({
        type: response.status,
        title: response.message.title,
        text: response.message.text
      })

      if (response.status === 'success' && this.$route.path === '/') {
        const address = await this.$store.getters['auth/selectedAddress']
        this.$router.push(`/${address}`)
      }
    }
  }
}
</script>
