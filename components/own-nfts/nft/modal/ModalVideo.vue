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
            controls
          >
            <source :src="nft.contentUrl" />
          </video>
        </div>
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
export default class ModalVideo extends Vue {
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
