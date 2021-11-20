<template>
  <div class="post post-audio">
    <top :transaction="transaction" />
    <div class="post-audio-wr">
      <div ref="audio" class="post-audio-item green-audio-player">
        <audio crossorigin="" preload="none">
          <source :src="transaction.nft.audio" type="audio/mpeg" />
        </audio>
      </div>
    </div>
    <text-block :transaction="transaction" />
    <bottom :transaction="transaction" />
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

  $refs!: {
    audio: HTMLDivElement
  }

  mounted() {
    this.$nextTick(() => {
      if (!this.player) {
        this.player = new (window as any).GreenAudioPlayer(this.$refs.audio, {
          showTooltips: true,
          showDownloadButton: false,
          enableKeystrokes: true
        })
      }
    })
  }
}
</script>
