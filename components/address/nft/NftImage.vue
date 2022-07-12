<template>
  <a
    v-if="nft.url && !isError"
    ref="container"
    :href="nft.url"
    target="_blank"
    class="profile-content__image loading-bg"
    @click.prevent="$emit('show-modal')"
  />
  <div v-else class="profile-content__image">
    <div class="profile-content__image-empty">Failed to get nft data</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftImage extends Vue {
  isError = false;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    container: HTMLDivElement;
  };

  mounted() {
    this.$nextTick(() => {
      if (!this.nft.url) {
        this.isError = true;
        return;
      }

      const image = new Image();
      image.src = this.nft.url;

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
