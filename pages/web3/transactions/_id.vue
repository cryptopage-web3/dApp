<template>
  <div>
    <div v-if="transaction">
      <div>
        Block hash:
        <nuxt-link :to="`/web3/blocks/${transaction.blockNumber}`">
          {{ transaction.blockHash }}
        </nuxt-link>
      </div>
      <div>
        Block number:
        <nuxt-link :to="`/web3/blocks/${transaction.blockNumber}`">
          {{ transaction.blockNumber }}
        </nuxt-link>
      </div>
      <p>
        From:
        <nuxt-link :to="`/${transaction.from}`">{{
          transaction.from
        }}</nuxt-link>
      </p>
      <p>Gas: {{ transaction.gas }}</p>
      <p>Gas price: {{ transaction.gasPrice }}</p>
      <p>Hash: {{ transaction.hash }}</p>
      <p>Input: {{ transaction.input }}</p>
      <p>
        To:
        <nuxt-link :to="`/${transaction.to}`">{{ transaction.to }}</nuxt-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  validate({ params }) {
    return params.id.match(/^0x([A-Fa-f0-9]{64})$/)
  },
  data: () => ({
    transaction: null
  }),
  async fetch() {
    const txHash = this.$route.params.id
    try {
      this.transaction = await this.$web3.eth.getTransaction(txHash)
    } catch (error) {
      console.error(`ERROR in transactions/${txHash}:`, error) // eslint-disable-line no-console
      this.$nuxt.error({ statusCode: 400, message: 'Invalid transaction hash' })
      if (process.server) this.$nuxt.context.res.statusCode = 400
    }
  },
  fetchOnServer: false
}
</script>
