<template>
  <div class="post post-audio">
    <top :transaction="transaction" />
    <div class="post-audio-wr">
      <loader v-if="loading" />
      <div
        v-show="!loading"
        :id="transaction.hash"
        class="post-audio-item green-audio-player"
      >
        <audio crossorigin="" preload="none">
          <source :src="transaction.nft.audio" type="audio/mpeg" />
        </audio>
      </div>
    </div>
    <text-block :text="transaction.nft.description" />
    <bottom v-if="transaction.nft.comments" :transaction="transaction" />
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'

@Component({
  components: {
    top: async () => await import('~/components/post/PostTop.vue'),
    loader: () => import('~/components/loaders/Skeleton.vue'),
    textBlock: async () => await import('~/components/post/PostTextBlock.vue'),
    bottom: async () => await import('~/components/post/PostBottom.vue')
  }
})
export default class ERC721TransactionAudio extends mixins(TransactionMixin) {
  player = null
  loading = true

  mounted() {
    this.$nextTick(() => {
      if (!this.player) {
        this.player = new (window as any).GreenAudioPlayer(
          `[id="${this.transaction.hash}"]`,
          {
            showTooltips: true,
            showDownloadButton: false,
            enableKeystrokes: true
          }
        )
      }
      this.loading = false
    })
  }
}
</script>
