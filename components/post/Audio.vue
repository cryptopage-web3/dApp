<template>
  <div class="post post-audio">
    <top :transaction="transaction" />
    <div class="post-audio-wr">
      <loader v-if="loading" />
      <div :id="transaction.hash" class="post-audio-item green-audio-player">
        <audio crossorigin="" preload="none">
          <source :src="transaction.nft.audio" type="audio/mpeg" />
        </audio>
      </div>
    </div>
    <text-block :text="transaction.nft.description" />
    <bottom v-if="transaction.nft.commentsEnabled" />
  </div>
</template>
<script>
import TransactionMixin from '~/mixins/transaction'
export default {
  components: {
    top: async () => await import('@/components/post/PostTop.vue'),
    loader: () => import('~/components/loaders/GrowLoader.vue'),
    textBlock: async () => await import('@/components/post/PostTextBlock.vue'),
    bottom: async () => await import('@/components/post/PostBottom.vue')
  },
  mixins: [TransactionMixin],
  data: () => ({
    player: null,
    loading: true
  }),
  mounted() {
    this.$nextTick(() => {
      if (!this.player) {
        this.player = new GreenAudioPlayer(`[id="${this.transaction.hash}"]`, {
          showTooltips: true,
          showDownloadButton: false,
          enableKeystrokes: true
        })
      }
      this.loading = false
    })
  }
}
</script>
