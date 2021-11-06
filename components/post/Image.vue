<template>
  <div class="post post-image">
    <top :transaction="transaction" />
    <loader v-if="loading" />
    <a
      v-if="transaction.nft.image"
      href="#"
      :style="{ backgroundImage: `url(${transaction.nft.image})` }"
      class="post-image__link"
    />
    <text-block :text="transaction.nft.description" />
    <bottom />
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
Component.registerHooks(['mounted'])
@Component({
  components: {
    top: async () => await import('@/components/post/PostTop.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue'),
    textBlock: async () => await import('@/components/post/PostTextBlock.vue'),
    bottom: async () => await import('@/components/post/PostBottom.vue')
  }
})
export default class ERC721TransactionImage extends mixins(TransactionMixin) {
  loading = true
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => (this.loading = false), 1000)
    })
  }
}
</script>
