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
  validate({ params, $web3 }) {
    return $web3.utils.isHex(params.hash)
  },
  data: () => ({
    block: null
  }),
  async fetch() {
    try {
      this.block = await this.$web3.eth.getBlock(this.$route.params.hash)
    } catch (error) {
      console.error(`ERROR in blocks/${this.$route.params.hash}:`, error) // eslint-disable-line no-console
      this.$nuxt.error({ statusCode: 400, message: 'Invalid block hash' })
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
