<template>
  <Skeleton v-if="loading" class-name="market-sidebar__nft-loading" />
  <div v-else class="market-sidebar__nft">
    <NftVideo v-if="nft.type === ETypeNft.video && nft.contentUrl" :nft="nft" />
    <NftAudio
      v-else-if="nft.type === ETypeNft.audio && nft.contentUrl"
      :nft="nft"
    />
    <NftImage
      v-else-if="nft.type === ETypeNft.image && nft.contentUrl"
      :nft="nft"
      @show-modal="$emit('show-modal', nft)"
    />
    <div
      v-else
      class="market-sidebar__nft-image market-sidebar__nft-image_pointer"
      @click.prevent="$emit('show-modal', nft)"
    >
      <div class="market-sidebar__nft-image-empty">
        <NftTextIcon />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import NftVideo from './NftVideo.vue';
import NftAudio from './NftAudio.vue';
import NftImage from './NftImage.vue';
import NftTextIcon from '~/components/icon/nft/NftTextIcon.vue';
import Skeleton from '~/components/loaders/Skeleton.vue';
import { ETypeNft, INft } from '~/types';
import { addressModule } from '~/store';

type TNft = INft;

@Component({
  components: {
    NftVideo,
    NftAudio,
    NftImage,
    Skeleton,
    NftTextIcon,
  },
})
export default class Nft extends Vue {
  ETypeNft = ETypeNft;
  loading = true;

  @Prop({ required: true })
  readonly nft!: TNft;

  async mounted() {
    if (this.nft.hasDetails) {
      this.loading = false;
      return;
    }

    this.loading = true;

    await addressModule.fetchOwnNftDetails(this.nft);

    this.loading = false;
  }
}
</script>
