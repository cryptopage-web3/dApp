<template>
  <div class="market-sidebar__nft-video">
    <audio ref="audio" crossorigin="" preload="none">
      <source :src="nft.url" type="audio/mpeg" />
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
  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    audio: HTMLAudioElement;
  };

  mounted() {
    this.$nextTick(() => {
      playOneVideoInit(this.$refs.audio);
    });
  }
}
</script>
