<template>
  <div class="main-item">
    <a href="#" class="transactions-link">
      <div class="transactions-link-left">
        <img
          v-if="income"
          src="@/assets/img/transactions-link_img2.svg"
          alt=""
        />
        <img v-else src="@/assets/img/transactions-link_img1.svg" alt="" />
        <div class="transactions-link__text">
          <div class="transactions-link__tool">
            {{ income ? 'Receive' : 'Send' }} {{ tokenSymbol }}
          </div>
          <div
            v-if="transaction.decodedInput"
            class="transactions-link__number"
          >
            Method: {{ transaction.decodedInput.name }}
          </div>
          <div class="transactions-link__number">
            {{ transaction.timeStamp | shortMonthAndDay }} /
            {{ income ? 'From' : 'To' }}:
            <template v-if="transaction.token">
              {{ transaction.token.name }} ({{ transaction.token.symbol }})
            </template>
            <template v-else>{{ address | shortAddress }}</template>
          </div>
          <div class="transactions-link__number">
            Txn Hash:
            <a href="#">{{ transaction.hash | shortAddress(5, 7) }}</a>
          </div>
        </div>
      </div>
      <div class="transactions-link-right">
        <div class="transactions-link__usdt">
          {{ income ? '' : '-' }}
          {{ (transaction.value / 10 ** 18) | normalizeAmount }}
          {{ tokenSymbol }}
        </div>
        <div class="transactions-link__usd">
          Fee: {{ transaction.fee }} {{ tokenSymbol }}
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
@Component({})
export default class Transaction extends mixins(TransactionMixin) {}
</script>
