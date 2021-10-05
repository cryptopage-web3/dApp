<template>
  <nft v-if="transaction.nft" :transaction="transaction" />
  <token v-else-if="transaction.tokenInfo" :transaction="transaction" />
  <a v-else href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img1.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img2.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Send' : 'Reseive' }}
          ETH
        </div>
        <div class="transactions-link__number">
          {{ transaction.timestamp }} / To:
          {{ transaction.to | shortAddress }}
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt">
        {{ income ? '' : '-' }}
        {{ transaction.value / 10 ** 18 }}
        ETH
      </div>
      <!--div class="transactions-link__usd">-$ 1, 185.76 USD</div-->
    </div>
  </a>
</template>
<script>
// import { tokens } from '~/constants/tokens'
export default {
  components: {
    token: async () =>
      await import('@/components/transactions/ERC20Transaction'),
    nft: async () => await import('@/components/transactions/ERC721Transaction')
  },
  props: {
    transaction: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    transfer: null,
    token: null,
    isContract: false
  }),
  /*
  async fetch() {
    const address = this.$web3.utils.toChecksumAddress(this.transaction.to)
    // if (this.isTransfer) {
    // this.transfer = await this.$getERC20TransferByHash(this.transaction.hash)
    // }
    const code = await this.$web3.eth.getCode(this.transaction.to)
    this.isContract = code !== '0x'
    if (this.isContract) {
      this.token = tokens.find((token) => {
        return this.$web3.utils.toChecksumAddress(token.address) === address
      })
    }
  },
  */
  fetchOnServer: false,
  computed: {
    income() {
      const from = this.$web3.utils.toChecksumAddress(this.transaction.from)
      const address = this.$web3.utils.toChecksumAddress(
        this.$route.params.address
      )
      return from === address
    }
  }
}
</script>
<style scoped="">
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.column {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 1em 1em;
  color: black;
}
</style>
