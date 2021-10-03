<template>
  <div class="post">
    <div class="post-cont">
      <div class="post-right">
        <div class="row">
          <avatar class="column" :address="transaction.from" />
          <div class="column">
            <avatar
              :address="
                transaction.transfer
                  ? transaction.transfer.contractAddress
                  : transaction.to
              "
              :src="meta ? meta.logo_url : ''"
              :show-address="false"
            />
            <span v-if="transaction.tokenInfo" style="margin-top: 0.5em">
              {{
                transaction.value
                  | toDecimals(transaction.tokenInfo.tokenDecimal)
              }}
            </span>
            <span v-if="transaction.tokenInfo" style="margin-top: 0.5em">
              {{ transaction.tokenInfo.tokenSymbol }} ({{
                transaction.tokenInfo.tokenName
              }})
            </span>
          </div>
          <avatar class="column" :address="transaction.to" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    meta: null
  }),
  mounted() {
    this.$nextTick(() => {
      /*
      const searchResults = this.$lunr.search(this.transaction.contractAddress)
      const ref = searchResults[0] ? searchResults[0].ref : null
      if (ref) this.meta = this.$lunr.getMeta(ref)
      */
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
