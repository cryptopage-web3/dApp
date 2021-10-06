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
  async mounted() {
    await this.$nextTick(async () => {
      await this.$store.dispatch(
        'transactions/updateAddressInfo',
        this.$route.params.address
      )
    })
  }
}
</script>
