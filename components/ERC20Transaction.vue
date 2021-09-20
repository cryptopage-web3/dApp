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
            <span>{{ $shortAddress(transaction.from, 5, 7) }}</span>
          </nuxt-link>
          <div class="column">
            <jazzicon
              :seed="10211"
              :diameter="25"
              :address="transaction.contractAddress"
            />
            <span>
              {{ transaction.value }}
              {{ transaction.tokenSymbol }} ({{ transaction.tokenName }})
            </span>
          </div>
          <nuxt-link class="column" :to="`/${transaction.to}`">
            <jazzicon :seed="10211" :diameter="25" :address="transaction.to" />
            <span>{{ $shortAddress(transaction.to, 5, 7) }}</span>
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
