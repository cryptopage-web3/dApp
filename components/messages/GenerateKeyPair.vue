<template>
  <button
    class="btn btn_blue btn_transparent post-follow-top__link"
    @click="generateKeyPair"
  >
    Generate key pair
  </button>
</template>
<script>
export default {
  methods: {
    async generateKeyPair() {
      const selectedAddress = this.$store.getters['auth/selectedAddress']
      const address = this.$web3.utils.toChecksumAddress(selectedAddress)
      const message = await this.$sea.work(address, address)
      const password = await this.$provider.provider.request({
        method: 'personal_sign',
        params: [message, address]
      })
      const self = this
      this.$gun.user().create(address, password, function (data) {
        if (data.err && data.err === 'User already created!') {
          self.$notify({
            type: 'error',
            title: 'Something went wrong',
            text: `<div class="notification-content__mt">
              Please try again later.
            </div>`
          })
        } else {
          self.$emit('onGenerateKeyPair', self.$gun.user()._.sea)
        }
      })
    }
  }
}
</script>
