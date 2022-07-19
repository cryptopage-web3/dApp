<template>
  <div class="post-videos">
    <div class="post-video">
      <div class="video">
        <div class="video-player">
          <video
            ref="video"
            style="z-index: 10"
            tabindex="-1"
            data-video=""
            allowfullscreen="false"
            controlslist="nodownload"
          >
            <source :src="nft.url" type="video/mp4" />
          </video>
        </div>
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
    video: HTMLVideoElement;
  };

  mounted() {
    this.$nextTick(() => {
      playOneVideoInit(this.$refs.video);
    });
  }
}
</script>
