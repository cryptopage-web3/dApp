<template>
  <div class="post post-image">
    <top :hash="transaction.hash" :date="transaction.timeStamp" />
    <a
      href="#"
      :style="{ backgroundImage: `url(${transaction.nft.image})` }"
      class="post-image__link"
    />
    <text-block :text="transaction.nft.description" />
    <bottom />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'
Component.registerHooks(['fetchOnServer'])
@Component({
  components: {
    top: async () => await import('@/components/post/PostTop.vue'),
    textBlock: async () => await import('@/components/post/PostTextBlock.vue'),
    bottom: async () => await import('@/components/post/PostBottom.vue')
  }
})
export default class ERC721Transaction extends Vue {
  @Prop({ required: true }) readonly transaction!: TransactionType
  fetchOnServer(): boolean {
    return true
  }
}
</script>
