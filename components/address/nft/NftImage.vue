<template>
  <a
    v-if="nft.contentUrl && !isError"
    ref="container"
    :href="nft.contentUrl"
    target="_blank"
    class="profile-content__image"
    :class="{ 'loading-bg': loading }"
    @click.prevent="$emit('show-modal')"
  >
    <template v-if="!loading">
      <div
        class="profile-content__image-tag profile-content__image-tag_backdrop"
      />
      <img
        :src="nft.contentUrl"
        class="profile-content__image-tag profile-content__image-tag_bg"
      />
      <img
        :src="nft.contentUrl"
        class="profile-content__image-tag profile-content__image-tag_main"
      />
    </template>
  </a>
  <div v-else class="profile-content__image">
    <div class="profile-content__image-empty">Failed to get nft data</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftImage extends Vue {
  isError = false;
  loading = true;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    container: HTMLDivElement;
  };

  @Watch('nft.contentUrl')
  onContentUrlChange() {
    this.loadNftContent();
  }

  loadNftContent() {
    this.loading = true;

    if (!this.nft.contentUrl) {
      this.isError = true;
      this.loading = false;
      return;
    }

    const image = new Image();
    image.src = this.nft.contentUrl;

    image.onload = () => {
      this.loading = false;
    };
    image.onerror = () => {
      this.isError = true;
      this.loading = false;
    };
  }

  mounted() {
    this.$nextTick(this.loadNftContent);
  }
}
</script>
