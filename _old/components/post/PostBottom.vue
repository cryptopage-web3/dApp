<template>
  <comments :transaction="transaction" />
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'

@Component({
  components: {
    comments: async () => await import('~/components/post/Comments.vue')
  }
})
export default class PostBottom extends mixins(TransactionMixin) {}
</script>
