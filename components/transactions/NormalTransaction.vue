<template>
  <a href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img2.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img1.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Receive' : 'Send' }} {{ tokenSymbol }}
        </div>
        <div v-if="transaction.decodedInput" class="transactions-link__number">
          Method: {{ transaction.decodedInput.name }}
        </div>
        <div class="transactions-link__number">
          {{ transaction.timeStamp | humanizeDate }} ago
          {{ income ? 'from' : 'to' }}
          <nuxt-link
            v-if="transaction.token"
            style="color: #a5a5a5"
            :to="`/${networkName}/${address}`"
          >
            {{ transaction.token.name }} ({{ transaction.token.symbol }})
          </nuxt-link>
          <nuxt-link
            v-else
            style="color: #a5a5a5"
            :to="`/${networkName}/${address}`"
          >
            {{ address | shortAddress }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt" style="text-align: right">
        {{ income ? '' : '-' }}
        {{
          (transaction.value / 10 ** (transaction.type === 'tron' ? 6 : 18))
            | normalizeAmount
        }}
        {{ tokenSymbol }}
      </div>
      <div class="transactions-link__usd" style="text-align: right">
        Fee: {{ transaction.fee }} {{ tokenSymbol }}
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
@Component({})
export default class Transaction extends mixins(TransactionMixin) {}
</script>
