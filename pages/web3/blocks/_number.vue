<template>
  <div>
    <div v-if="block">
      <div>Block hash {{ block.hash }}</div>
      <div class="block">Block #{{ block.number }} transactions</div>
      <transactions :block="block" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    transactions: () => import('~/components/TransactionList.vue')
  },
  async validate({ params, $web3 }) {
    const latest = await $web3.eth.getBlockNumber()
    return isNaN(params.number) && Number(params.number) <= latest
  },
  data: () => ({
    block: null
  }),
  async fetch() {
    try {
      this.block = await this.$web3.eth.getBlock(this.$route.params.number)
    } catch (error) {
      console.error(`ERROR in blocks/${this.$route.params.number}:`, error) // eslint-disable-line no-console
      this.$nuxt.error({ statusCode: 400, message: 'Invalid block number' })
      if (process.server) this.$nuxt.context.res.statusCode = 400
    }
  },
  fetchOnServer: false
}
</script>
<style scoped>
.block {
  margin-top: 2em;
}
</style>
