<template>
  <div class="post">
    <top :transaction="transaction" />
    <text-block :transaction="transaction" />
    <bottom :transaction="transaction" />
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
Component.registerHooks(['mounted'])
@Component({
  components: {
    top: async () => await import('~/components/post/PostTop.vue'),
    textBlock: async () => await import('~/components/post/PostTextBlock.vue'),
    bottom: async () => await import('~/components/post/PostBottom.vue')
  }
})
export default class ERC721TransactionText extends mixins(TransactionMixin) {}
</script>
