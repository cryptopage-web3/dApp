<template>
  <comments v-if="transaction.nft.comments" :transaction="transaction" />
  <activate-comments v-else-if="isOwner" :transaction="transaction" />
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'

@Component({
  components: {
    comments: async () => await import('~/components/post/Comments.vue'),
    activateComments: async () =>
      await import('~/components/post/ActivateComments.vue')
  }
})
export default class PostBottom extends mixins(TransactionMixin) {
  get isOwner() {
    return (
      this.typedStore.address.address.toLowerCase() ===
      this.typedStore.auth.selectedAddress.toLowerCase()
    )
  }
}
</script>
