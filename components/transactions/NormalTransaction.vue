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
            <nuxt-link
              v-if="transaction.token"
              :to="`/${networkSlug}/${transactionAddress}/nft`"
            >
              {{ transaction.token.name }} ({{ transaction.token.symbol }})
            </nuxt-link>
            <nuxt-link v-else :to="`/${networkSlug}/${transactionAddress}/nft`">
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
          {{
            (transaction.value / 10 ** (transaction.type === 'tron' ? 6 : 18))
              | normalizeAmount
          }}
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
import { copyToClipboard } from '~/utils/copyToClipboard'

@Component({})
export default class Transaction extends mixins(TransactionMixin) {
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
