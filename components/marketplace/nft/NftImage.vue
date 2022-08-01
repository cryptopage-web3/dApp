<template>
  <div
    v-if="url && !isError"
    ref="container"
    class="market-product__image loading-bg"
  />
  <div v-else class="market-product__image">
    <div class="market-product__image-empty">
      {{ isError ? 'Failed to get nft data' : 'No NFT Content' }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ICollectionNft } from '~/types';

type TCollectionNft = ICollectionNft;

@Component({})
export default class NftImage extends Vue {
  isError = false;

  @Prop({ required: true })
  readonly nft!: TCollectionNft;

  $refs!: {
    container: HTMLDivElement;
  };

  get url(): string {
    const images = this.nft.meta.filter(({ type }) => type === 'IMAGE');

    if (!images.length) {
      return '';
    }

    const preview = images.find(
      ({ representation }) => representation === 'PREVIEW',
    );

    if (preview) {
      return preview.url;
    }

    const big = images.find(({ representation }) => representation === 'BIG');

    if (big) {
      return big.url;
    }

    return images[0].url;
  }

  mounted() {
    this.$nextTick(() => {
      if (!this.url) {
        return;
      }

      const image = new Image();
      image.src = this.url;

      const timeout = setTimeout(() => {
        this.isError = true;
      }, 15000);

      image.onload = () => {
        clearTimeout(timeout);
        this.$refs.container?.append(image);
      };
      image.onerror = () => {
        this.isError = true;
      };
    });
  }
}
</script>
