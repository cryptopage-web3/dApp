<template>
  <div class="market-sidebar__nft-video">
    <video
      ref="video"
      style="z-index: 10"
      tabindex="-1"
      data-video=""
      allowfullscreen="false"
      controls
    >
      <source :src="nft.contentUrl" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import { playOneVideoInit } from '~/utils/playOneVideo';

type TNft = INft;

@Component({})
export default class NftVideo extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

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
