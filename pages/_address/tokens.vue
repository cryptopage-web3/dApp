<template>
  <div class="transactions-body">
    <a href="#" class="transactions-link">
      <div class="transactions-link-left">
        <img src="@/assets/img/transactions-link_img1.png" alt="" />
        <div class="transactions-link__text">
          <div class="transactions-link__tool">Send USDT</div>
          <div class="transactions-link__number">Sep 2 / To: 0x655..97cd</div>
        </div>
      </div>
      <div class="transactions-link-right">
        <div class="transactions-link__usdt">-1 168 USDT</div>
        <div class="transactions-link__usd">-$ 1, 185.76 USD</div>
      </div>
    </a>
    <a href="#" class="transactions-link">
      <div class="transactions-link-left">
        <img src="@/assets/img/transactions-link_img2.png" alt="" />
        <div class="transactions-link__text">
          <div class="transactions-link__tool">Reseive USDT</div>
          <div class="transactions-link__number">Sep 2 / To: 0x655..97cd</div>
        </div>
      </div>
      <div class="transactions-link-right">
        <div class="transactions-link__usdt">-1 168 USDT</div>
        <div class="transactions-link__usd">-$ 1, 185.76 USD</div>
      </div>
    </a>
  </div>
  <!-- <div class="transactions">
    <transactions
      :address="$route.params.address"
      type="tokens"
      :total="transactionsCount"
    >
      <transaction
        slot="transaction"
        slot-scope="{ transaction }"
        :transaction="transaction"
      />
    </transactions>
  </div> -->
</template>
<script>
export default {
  components: {
    // transaction: () => import('~/components/ERC20Transaction.vue'),
    // transactions: () => import('~/components/AddressTransactionList.vue')
  },
  props: {
    transactionsCount: {
      type: Number,
      default: () => 0
    }
  }
}
</script>
