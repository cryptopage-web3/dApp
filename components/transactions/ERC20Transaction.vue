<template>
  <a href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img1.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img2.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Send' : 'Receive' }} {{ transaction.token.symbol }}
        </div>
        <div class="transactions-link__number">
          {{ transaction.timeStamp | humanizeDate }} ago
          {{ income ? 'to' : 'from' }}
          <nuxt-link
            v-if="income"
            style="color: #a5a5a5"
            :to="`/${networkName}/${transaction.receiver}`"
          >
            {{ transaction.receiver | shortAddress(5, 7) }}
          </nuxt-link>
          <nuxt-link
            v-else-if="!income && transaction.token"
            style="color: #a5a5a5"
            :to="`/${networkName}/${transaction.sender}`"
          >
            {{ transaction.token.name }} ({{ transaction.token.symbol }})
          </nuxt-link>
          <nuxt-link
            v-else-if="!income && !transaction.token"
            style="color: #a5a5a5"
            :to="`/${networkName}/${transaction.sender}`"
          >
            {{ transaction.sender | shortAddress(5, 7) }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt" style="text-align: right">
        {{ income ? '-' : '' }}
        {{ transaction.amount | normalizeAmount }}
        {{ transaction.token.symbol }}
      </div>
      <div class="transactions-link__usd" style="text-align: right">
        Fee: {{ transaction.fee }} {{ networkName.toUpperCase() }}
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
import NetworkNameMixin from '~/mixins/networkName'
@Component({})
export default class ERC20Transaction extends mixins(
  TransactionMixin,
  NetworkNameMixin
) {}
</script>
