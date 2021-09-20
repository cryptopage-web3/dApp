<template>
  <div class="post">
    <div class="post-cont">
      <div v-if="transfer && type === 'tokens'" class="post-right">
        <div class="row">
          <nuxt-link class="column" :to="`/${transfer.sender}`">
            <jazzicon :seed="10211" :diameter="25" :address="transfer.sender" />
            <span>{{ $shortAddress(transfer.sender, 5, 7) }}</span>
          </nuxt-link>
          <div class="column">
            <span>
              {{ transfer.amount }}
              {{ token.symbol }}
            </span>
            <span
              v-if="!token.symbol"
              style="font-size: 12px; margin-top: 0.5em"
            >
              Unknown contract call
              <span style="color: #768895">
                {{ isTransfer ? 'transfer' : 'unknown' }}
              </span>
              function
            </span>
          </div>
          <nuxt-link class="column" :to="`/${transfer.receiver}`">
            <jazzicon
              :seed="10211"
              :diameter="25"
              :address="transfer.receiver"
            />
            <span>{{ $shortAddress(transfer.receiver, 5, 7) }}</span>
          </nuxt-link>
        </div>
      </div>
      <div v-else-if="!transfer && type === 'transactions'" class="post-right">
        <div class="row">
          <nuxt-link class="column" :to="`/${post.from}`">
            <jazzicon :seed="10211" :diameter="25" :address="post.from" />
            <span>{{ $shortAddress(post.from, 5, 7) }}</span>
          </nuxt-link>
          <div class="column">
            <span> {{ post.value }} ETH </span>
          </div>
          <nuxt-link class="column" :to="`/${post.to}`">
            <jazzicon :seed="10211" :diameter="25" :address="post.to" />
            <span>{{ $shortAddress(post.to, 5, 7) }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({})
    },
    token: {
      type: Object,
      default: () => ({})
    },
    types: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    transactionReceipt: null,
    transfer: null
  }),
  async fetch() {
    if (this.isTransfer) {
      this.transfer = await this.$getERC20TransferByHash(this.post.hash)
    }
  },
  fetchOnServer: false,
  computed: {
    isTransfer() {
      return this.post.input.startsWith('0xa9059')
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
