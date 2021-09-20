<template>
  <div class="home">
    <profile-other
      :address="$route.params.address"
      :transactions-count="transactionsCount"
    />
    <main-center
      :address="$route.params.address"
      :transactions-count="transactionsCount"
    />
    <main-tabs-links :address="$route.params.address" />
    <div class="main-tabs-cont">
      <div class="main-tab show">
        <nuxt-child :transactions-count="transactionsCount" />
      </div>
    </div>
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
