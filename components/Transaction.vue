<template>
  <div class="post">
    <div class="post-cont">
      <div class="post-right">
        <div class="row">
          <avatar class="column" :address="transaction.from" />
          <div class="column">
            <span> {{ $web3.utils.fromWei(transaction.value) }} ETH </span>
            <span
              v-if="isContract || isTransfer"
              style="font-size: 12px; margin-top: 1em"
            >
              {{ token ? token.symbol : 'Unknown' }} contract call
              <span style="color: #768895">
                {{ isTransfer ? 'transfer' : 'unknown' }}
              </span>
              function
            </span>
          </div>
          <avatar
            v-if="transfer && transfer.receiver"
            class="column"
            :address="transfer.receiver"
          />
          <avatar v-else class="column" :address="transaction.to" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tokens } from '~/constants/tokens'
export default {
  components: {
    avatar: async () => await import('@/components/UserAvatar')
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
  async fetch() {
    const address = this.$web3.utils.toChecksumAddress(this.transaction.to)
    if (this.isTransfer) {
      this.transfer = await this.$getERC20TransferByHash(this.transaction.hash)
    }
    const code = await this.$web3.eth.getCode(this.transaction.to)
    this.isContract = code !== '0x'
    if (this.isContract) {
      this.token = tokens.find((token) => {
        return this.$web3.utils.toChecksumAddress(token.address) === address
      })
    }
  },
  fetchOnServer: false,
  computed: {
    isTransfer() {
      return this.transaction.input.startsWith('0xa9059cbb')
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
