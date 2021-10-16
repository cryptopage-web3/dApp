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
            style="color: #a5a5a5"
            :to="`/${income ? transaction.receiver : transaction.sender}`"
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
      <div class="transactions-link__usdt">
        {{ income ? '-' : '' }}
        {{ transaction.amount | normalizeAmount }}
        {{ transaction.token.symbol }}
      </div>
      <!--div class="transactions-link__usd">-$ 1, 185.76 USD</div-->
    </div>
  </a>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
@Component({})
export default class ERC20Transaction extends mixins(TransactionMixin) {}
</script>
