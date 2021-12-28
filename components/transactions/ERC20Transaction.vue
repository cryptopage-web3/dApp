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
            {{ income ? 'Receive' : 'Send' }} {{ transaction.token.symbol }}
          </div>
          <div class="transactions-link__number">
            {{ transaction.timeStamp | shortMonthAndDay }} /
            {{ income ? 'From' : 'To' }}:
            {{ address | shortAddress(5, 7) }}
          </div>
          <div class="transactions-link__number transactions-link__number_hash">
            Txn Hash:
            <a href="#">{{ transaction.hash | shortAddress(5, 7) }}</a>
          </div>
        </div>
      </div>
      <div class="transactions-link-right">
        <div class="transactions-link__usdt">
          {{ income ? '' : '-' }}
          {{ transaction.amount | normalizeAmount }}
          {{ transaction.token.symbol }}
        </div>
        <div class="transactions-link__usd">
          Fee: {{ transaction.fee | normalizeAmount }} {{ tokenSymbol }}
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
@Component({})
export default class ERC20Transaction extends mixins(TransactionMixin) {}
</script>
