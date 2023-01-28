<template>
  <a
    v-if="nft.contentUrl && !isError"
    ref="container"
    href="#"
    class="market-product__media-image loading-bg"
    @click.prevent="$emit('show-modal')"
  />
  <div v-else class="market-product__media-image">
    <div class="market-product__media-image-empty">Failed to get nft data</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';

type TNft = INft;

@Component({})
export default class NftImage extends Vue {
  isError = false;

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    container: HTMLDivElement;
  };

  mounted() {
    this.$nextTick(() => {
      if (!this.nft.contentUrl) {
        this.isError = true;
        return;
      }

      const image = new Image();
      image.src = this.nft.contentUrl;

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
