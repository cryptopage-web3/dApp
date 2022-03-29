<template>
  <div class="main-item">
    <image-post v-if="isImage" :transaction="transaction" />
    <audio-post v-else-if="isAudio" :transaction="transaction" />
    <video-post v-else-if="isVideo" :transaction="transaction" />
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
export default class ERC721Transaction extends mixins(TransactionMixin) {
  get isImage(): boolean {
    return Boolean(this.transaction.nft?.image)
  }

  get isAudio(): boolean {
    return Boolean(this.transaction.nft?.audio)
  }

  get isVideo(): boolean {
    return Boolean(this.transaction.nft?.video)
  }
}
</script>
