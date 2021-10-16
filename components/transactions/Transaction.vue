<template>
  <nft v-if="transaction.nft" :transaction="transaction" />
  <token v-else-if="transaction.tokenInfo" :transaction="transaction" />
  <a v-else href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img1.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img2.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Send' : 'Receive' }} ETH
        </div>
        <div class="transactions-link__number">
          {{ transaction.timeStamp | humanizeDate }} /
          {{ income ? 'To' : 'From' }} :
          <nuxt-link
            style="color: #a5a5a5"
            :to="`/${income ? transaction.receiver : transaction.sender}`"
          >
            {{ address | shortAddress(5, 7) }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt">
        {{ income ? '-' : '' }}
        {{ transaction.amount | normalizeAmount }} ETH
      </div>
      <!--div class="transactions-link__usd">-$ 1, 185.76 USD</div-->
    </div>
  </a>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
@Component({
  components: {
    token: async () =>
      await import('~/components/transactions/ERC20Transaction.vue'),
    nft: async () =>
      await import('~/components/transactions/ERC721Transaction.vue')
  }
})
export default class Transaction extends mixins(TransactionMixin) {}
</script>
