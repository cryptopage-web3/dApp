<template>
  <div class="post-videos">
    <div class="post-video">
      <div ref="player" class="post-audio-item green-audio-player">
        <audio crossorigin="" preload="none">
          <source :src="nft.contentUrl" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import { playOneVideoInit } from '~/utils/playOneVideo';

type TNft = INft;

@Component({})
export default class ModalAudio extends Vue {
  gap: any = null;

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    player: HTMLDivElement;
  };

  mounted() {
    this.$nextTick(() => {
      if (!this.gap && this.$refs.player) {
        this.gap = new (window as any).GreenAudioPlayer(this.$refs.player, {
          showTooltips: true,
          showDownloadButton: false,
          enableKeystrokes: true,
        });

        playOneVideoInit(this.gap.player);
      }
    });
  }
}
</script>
