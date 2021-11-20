<template>
  <div class="post-text-block">
    <div class="post-text">
      <div v-if="title" class="post-text__title">
        {{ title }}
      </div>
      <div v-if="description" class="post-text__description">
        {{ description }}
      </div>
    </div>
    <div class="post-text-right">
      <a href="#" class="post-text__link">
        <img src="@/assets/img/post-text__link_img1_2.png" alt="" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'

@Component({})
export default class PostTextBlock extends Vue {
  @Prop({ required: true }) readonly transaction!: TransactionType

  get title(): string {
    return this.transaction.nft?.title || ''
  }

  get description(): string {
    return this.transaction.nft?.description || ''
  }
}
</script>
