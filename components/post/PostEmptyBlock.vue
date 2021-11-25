<template>
  <div class="post-empty-block">
    <div class="post-empty-block__title">Empty NTF data</div>
    <div class="post-empty-block__subtitle">
      Failed to get nft data for transaction
      {{ transaction.hash | shortAddress(5, 7) }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'

@Component({})
export default class PostEmptyBlock extends Vue {
  @Prop({ required: true }) readonly transaction!: TransactionType
}
</script>
