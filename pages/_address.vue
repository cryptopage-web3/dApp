<template>
  <div class="main-top">
    <address-profile />
    <address-transaction />
  </div>
</template>
<script>
export default {
  validate({ params, $web3 }) {
    return $web3.utils.isAddress(params.address)
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit('address/setAddressInfo', {
        address: this.$route.params.address,
        tokenInfo: null,
        tokens: [],
        transactionsCount: 0
      })
    })
  }
}
</script>
