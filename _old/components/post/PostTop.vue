<template>
  <div class="white-post-top">
    <div class="post-date">
      <a href="#" class="post-date__link">
        <img src="@/assets/img/post-date__link_img2.svg" alt="" />
      </a>
      <div class="post-date__text">
        {{ transaction.timeStamp | normalizeDate }}
      </div>
    </div>
    <div class="white-post-id">
      txid:
      <a ref="hash" href="#" @click.prevent="copyHash">{{
        transaction.hash | shortAddress(5, 7)
      }}</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
import NetworkNameMixin from '~/mixins/networkName'
import { copyToClipboard } from '~/utils/copyToClipboard'

@Component({})
export default class PostTop extends mixins(
  TransactionMixin,
  NetworkNameMixin
) {
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
