<template>
  <div class="market-product__media-video">
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';

type TNft = INft;

@Component({})
export default class NftVideo extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
