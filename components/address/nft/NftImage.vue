<template>
  <a
    v-if="nft.contentUrl && !isError"
    ref="container"
    :href="nft.contentUrl"
    target="_blank"
    class="profile-content__image"
    @click.prevent="$emit('show-modal')"
  >
    <!-- общий лоадер до подгрузки картинки -->
    <div
      v-if="loading"
      class="profile-content__image-tag profile-content__image-tag_loading"
    >
      <div class="loading-bg" />
    </div>
    <!-- сервый фон между фоновой картинкой и основной -->
    <div
      class="profile-content__image-tag profile-content__image-tag_backdrop"
    />
    <!-- фоновая картинка -->
    <img
      :src="nft.contentUrl"
      class="profile-content__image-tag profile-content__image-tag_bg"
    />
    <!-- основная картинка -->
    <img
      :src="nft.contentUrl"
      class="profile-content__image-tag profile-content__image-tag_main"
      @load="handleLoad"
      @error="handleError"
    />
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

  handleLoad() {
    this.loading = false;
  }

  handleError() {
    this.isError = true;
    this.loading = false;
  }

  loadNftContent() {
    if (this.nft.contentUrl) {
      return;
    }

    this.isError = true;
    this.loading = false;
  }

  mounted() {
    this.$nextTick(this.loadNftContent);
  }
}
</script>
