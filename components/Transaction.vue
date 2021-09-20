<template>
  <div class="post">
    <div class="post-cont">
      <div class="post-right">
        <div class="row">
          <nuxt-link class="column" :to="`/${transaction.from}`">
            <jazzicon
              :seed="10211"
              :diameter="25"
              :address="transaction.from"
            />
            <span>{{ transaction.from | shortAddress(5, 7) }}</span>
          </nuxt-link>
          <div class="column">
            <span> {{ $web3.utils.fromWei(transaction.value) }} ETH </span>
            <span v-if="isContract" style="font-size: 12px; margin-top: 1em">
              {{ token ? token.symbol : 'Unknown' }} contract call
              <span style="color: #768895">
                {{ isTransfer ? 'transfer' : 'unknown' }}
              </span>
              function
            </span>
          </div>
          <nuxt-link
            v-if="transfer"
            class="column"
            :to="`/${transfer.receiver}`"
          >
            <jazzicon
              :seed="10211"
              :diameter="25"
              :address="transfer.receiver"
            />
            <span>{{ transfer.receiver | shortAddress(5, 7) }}</span>
          </nuxt-link>
          <nuxt-link v-else class="column" :to="`/${transaction.to}`">
            <jazzicon :seed="10211" :diameter="25" :address="transaction.to" />
            <span>{{ transaction.to | shortAddress(5, 7) }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tokens } from '~/constants/tokens'
export default {
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
      return this.transaction.input.startsWith('0xa9059')
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
