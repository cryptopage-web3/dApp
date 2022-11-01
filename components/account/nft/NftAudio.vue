<template>
  <div ref="player" class="market-sidebar__nft-audio green-audio-player">
    <audio ref="audio" crossorigin="" preload="none">
      <source :src="nft.contentUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import { playOneVideoInit } from '~/utils/playOneVideo';

type TNft = INft;

@Component({})
export default class NftAudio extends Vue {
  gap: any = null;

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    audio: HTMLAudioElement;
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
