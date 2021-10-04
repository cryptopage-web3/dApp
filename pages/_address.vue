<template>
  <div class="main-top">
    <address-profile
      :address="$route.params.address"
      :transactions-count="transactionsCount"
    />
    <address-transaction :transactions-count="transactionsCount" />
  </div>
</template>
<script>
export default {
  validate({ params, $web3 }) {
    return $web3.utils.isAddress(params.address)
  },
  data: () => ({
    transactionsCount: 0
  }),
  async mounted() {
    await this.$nextTick(async () => {
      const address = this.$web3.utils.toChecksumAddress(
        this.$route.params.address
      )
      this.transactionsCount = await this.$web3.eth.getTransactionCount(address)
    })
  }
}
</script>
