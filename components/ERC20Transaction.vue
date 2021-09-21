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
            <img v-if="meta" :src="meta.logo_url" width="25" height="25" />
            <jazzicon
              v-else
              :seed="10211"
              :diameter="25"
              :address="transaction.contractAddress"
            />
            <span style="margin-top: 0.5em">
              {{ transaction.value | toDecimals(transaction.tokenDecimal) }}
            </span>
            <span style="margin-top: 0.5em">
              {{ transaction.tokenSymbol }} ({{ transaction.tokenName }})
            </span>
          </div>
          <nuxt-link class="column" :to="`/${transaction.to}`">
            <jazzicon :seed="10211" :diameter="25" :address="transaction.to" />
            <span>{{ transaction.to | shortAddress(5, 7) }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    transaction: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    meta: null
  }),
  mounted() {
    this.$nextTick(() => {
      const searchResults = this.$lunr.lunr.search(
        this.transaction.contractAddress
      )
      if (searchResults) {
        this.meta = this.$lunr.getMeta(searchResults[0].ref)
      }
    })
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
