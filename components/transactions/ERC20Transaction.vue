<template>
  <div class="main-item">
    <a href="#" class="transactions-link" @click.prevent="">
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
            {{ transaction.timeStamp | shortMonthDayYear }} /
            {{ income ? 'From' : 'To' }}:
            <nuxt-link :to="`/${networkSlug}/${transactionAddress}/nft`">
              {{ transactionAddress | shortAddress }}
            </nuxt-link>
          </div>
          <div class="transactions-link__number">
            Txn Hash:
            <a ref="hash" href="#" @click.prevent="copyHash">{{
              transaction.hash | shortAddress(5, 7)
            }}</a>
          </div>
        </div>
      </div>
      <div class="transactions-link-right">
        <div class="transactions-link__usdt">
          {{ income ? '' : '-' }}
          {{ transaction.amount | formatNumber(15) }}
          {{ transaction.token.symbol }}
        </div>
        <div class="transactions-link__usd">
          <nuxt-link :to="`/${networkSlug}/${transaction.token.address}/nft`">
            {{ transaction.token.name }} ({{ transaction.token.symbol }})
          </nuxt-link>
        </div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
import { copyToClipboard } from '~/utils/copyToClipboard'

@Component({})
export default class ERC20Transaction extends mixins(TransactionMixin) {
  $refs!: {
    hash: HTMLAnchorElement
  }

  mounted() {
    this.$nextTick(() => {
      ;($(this.$refs.hash) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy'
      })
    })
  }

  copyHash() {
    copyToClipboard(this.transaction.hash)
    ;($(this.$refs.hash) as any).tooltip('hide')

    this.$notify({
      type: 'success',
      title: 'Transaction Hash copied to clipboard'
    })
  }
}
</script>
