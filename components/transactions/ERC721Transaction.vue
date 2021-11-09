<template>
  <div style="padding: 1em 0">
    <image-post v-if="transaction.nft.image" :transaction="transaction" />
    <audio-post v-else-if="transaction.nft.audio" :transaction="transaction" />
    <video-post v-else-if="transaction.nft.video" :transaction="transaction" />
    <text-post v-else :transaction="transaction" />
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'

@Component({
  components: {
    imagePost: async () => await import('@/components/post/Image.vue'),
    audioPost: async () => await import('@/components/post/Audio.vue'),
    videoPost: async () => await import('@/components/post/Video.vue'),
    textPost: async () => await import('@/components/post/TextNFT.vue')
  }
})
export default class ERC721Transaction extends mixins(TransactionMixin) {}
</script>
