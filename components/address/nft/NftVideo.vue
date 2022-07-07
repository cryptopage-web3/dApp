<template>
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

type TNftTransaction = INftTransaction;

@Component({})
export default class NftVideo extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;
}
</script>
