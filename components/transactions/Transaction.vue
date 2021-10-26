<template>
  <nft v-if="transaction.nft" :transaction="transaction" />
  <token v-else-if="transaction.token" :transaction="transaction" />
  <a v-else href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img1.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img2.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Send' : 'Receive' }} ETH
        </div>
        <div class="transactions-link__number">
          {{ transaction.timeStamp | humanizeDate }} ago
          {{ income ? 'to' : 'from' }}
          <nuxt-link
            style="color: #a5a5a5"
            :to="`/${networkName}/${
              income ? transaction.receiver : transaction.sender
            }`"
          >
            {{
              income
                ? transaction.receiver
                : transaction.sender | shortAddress(5, 7)
            }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt" style="text-align: right">
        {{ income ? '-' : '' }}
        {{ transaction.amount | normalizeAmount }} ETH
      </div>
      <div class="transactions-link__usd" style="text-align: right">
        {{ transaction.gas | normalizeAmount }} GAS
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
import NetworkNameMixin from '~/mixins/networkName'
@Component({
  components: {
    token: async () =>
      await import('~/components/transactions/ERC20Transaction.vue'),
    nft: async () =>
      await import('~/components/transactions/ERC721Transaction.vue')
  }
})
export default class Transaction extends mixins(
  TransactionMixin,
  NetworkNameMixin
) {}
</script>
