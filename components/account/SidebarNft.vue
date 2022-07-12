<template>
  <div class="market-sidebar__nft">
    <div v-if="isMedia" class="market-sidebar__nft-video">
      <video
        ref="video"
        style="z-index: 10"
        tabindex="-1"
        data-video=""
        allowfullscreen="false"
        controls
      >
        <source :src="nft.url" type="video/mp4" />
      </video>
    </div>
    <a
      v-else-if="nft.image"
      :href="nft.image"
      target="_blank"
      class="market-sidebar__nft-image loading-bg"
    >
      <img :src="nft.image" />
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ETypeNft, INft } from '~/types';
import { playOneVideoInit } from '~/utils/playOneVideo';

type TNft = INft;

@Component({})
export default class SidebarNft extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    video: HTMLVideoElement;
  };

  get isMedia(): boolean {
    return this.nft.type === ETypeNft.video || this.nft.type === ETypeNft.audio;
  }

  mounted() {
    this.$nextTick(() => {
      playOneVideoInit(this.$refs.video);
    });
  }
}
</script>
