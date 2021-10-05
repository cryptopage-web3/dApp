<template>
  <a href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img1.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img2.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Send' : 'Reseive' }}
          {{ transaction.tokenInfo.tokenSymbol }}
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
        {{ transaction.value / 10 ** transaction.tokenInfo.tokenDecimal }}
        {{ transaction.tokenInfo.tokenSymbol }}
      </div>
      <!--div class="transactions-link__usd">-$ 1, 185.76 USD</div-->
    </div>
  </a>
</template>
<script>
export default {
  props: {
    transaction: {
      type: Object,
      default: () => ({})
    }
  },
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
