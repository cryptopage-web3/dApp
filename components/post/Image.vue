<template>
  <div class="post post-image">
    <top :transaction="transaction" />
    <a
      v-if="transaction.nft.image"
      href="#"
      class="post-image__link loading-bg"
    >
      <img :src="transaction.nft.image" class="post-image__link-img" />
    </a>
    <text-block :text="transaction.nft.description" />
    <bottom :transaction="transaction" />
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
Component.registerHooks(['mounted'])
@Component({
  components: {
    top: async () => await import('@/components/post/PostTop.vue'),
    textBlock: async () => await import('@/components/post/PostTextBlock.vue'),
    bottom: async () => await import('@/components/post/PostBottom.vue')
  }
})
export default class ERC721TransactionImage extends mixins(TransactionMixin) {}
</script>
