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
      v-else-if="nft.image && !isError"
      ref="container"
      :href="nft.image"
      target="_blank"
      class="market-sidebar__nft-image loading-bg"
    />
    <div v-else class="market-sidebar__nft-image">
      <div class="market-sidebar__nft-image-empty">Failed to get nft data</div>
    </div>
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
  isError = false;

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    video: HTMLVideoElement;
    container: HTMLDivElement;
  };

  get isMedia(): boolean {
    return this.nft.type === ETypeNft.video || this.nft.type === ETypeNft.audio;
  }

  mounted() {
    this.$nextTick(() => {
      /** для медиа */

      if (this.isMedia) {
        playOneVideoInit(this.$refs.video);
        return;
      }

      /** для картинок */

      if (!this.nft.image) {
        this.isError = true;
        return;
      }

      const image = new Image();
      image.src = this.nft.image;

      image.onload = () => {
        this.$refs.container?.append(image);
      };
      image.onerror = () => {
        this.isError = true;
      };
    });
  }
}
</script>
