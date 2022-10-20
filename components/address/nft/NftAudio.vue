<template>
  <div class="post-videos">
    <div class="post-video">
      <div class="audio-player">
        <audio ref="audio" style="z-index: 10" controls>
          <source :src="nft.url" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';
import { playOneVideoInit } from '~/utils/playOneVideo';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftAudio extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;

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
