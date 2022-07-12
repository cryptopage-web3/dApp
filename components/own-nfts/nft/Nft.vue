<template>
  <div class="col-xl-4 col-md-4 col-12">
    <div class="market-product">
      <div class="thumb">
        <div class="market-product__media">
          <NftVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
          <NftAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
          <NftImage v-else-if="nft.type === ETypeNft.image" :nft="nft" />
          <div v-else class="market-product__media-image">
            <div class="market-product__media-image-empty">No NFT Content</div>
          </div>
        </div>
        <NftFavorite :nft="nft" />
        <NftDropdown />
      </div>
      <NftText :nft="nft" />
      <NftComments :nft="nft" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { ETypeNft, INft } from '~/types';
import NftDropdown from '~/components/own-nfts/nft/NftDropdown.vue';
import NftText from '~/components/own-nfts/nft/NftText.vue';
import NftComments from '~/components/own-nfts/nft/NftComments.vue';
import NftImage from '~/components/own-nfts/nft/NftImage.vue';
import NftVideo from '~/components/own-nfts/nft/NftVideo.vue';
import NftAudio from '~/components/own-nfts/nft/NftAudio.vue';
import NftFavorite from '~/components/own-nfts/nft/NftFavorite.vue';

type TNft = INft;

@Component({
  components: {
    NftFavorite,
    NftDropdown,
    NftText,
    NftComments,
    NftImage,
    NftVideo,
    NftAudio,
  },
})
export default class Nft extends Vue {
  ETypeNft = ETypeNft;

  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
