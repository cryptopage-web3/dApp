<template>
  <div class="post post-video-wr">
    <div class="post-videos">
      <div class="post-video">
        <div class="video">
          <div class="video-player">
            <video
              style="z-index: 10"
              tabindex="-1"
              data-video=""
              allowfullscreen="false"
              controls
            >
              <source :src="transaction.nft.video" type="video/mp4" />
            </video>
          </div>
          <div class="video-contextMenu">
            <button class="video-contextMenu-btn">Copy Video Adress</button>
          </div>
        </div>
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
    textBlock: async () => await import('~/components/post/PostTextBlock.vue'),
    bottom: async () => await import('~/components/post/PostBottom.vue')
  }
})
export default class ERC721TransactionVideo extends mixins(TransactionMixin) {}
</script>
