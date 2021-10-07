<template>
  <div class="post post-image">
    <top :address="transaction.nft.owner" :date="transaction.timeStamp" />
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
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import { TransactionType } from '~/logic/transactions/types'
@Component({
  components: {
    top: async () => await import('@/components/post/PostTop.vue'),
    textBlock: async () => await import('@/components/post/PostTextBlock.vue'),
    bottom: async () => await import('@/components/post/PostBottom.vue')
  }
})
export default class ERC721Transaction extends Vue {
  @Prop({ required: true }) readonly transaction!: TransactionType
  private fetchOnServer = false
}
</script>
