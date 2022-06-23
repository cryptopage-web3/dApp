<template>
  <div class="profile-content">
    <NftTop :nft="nft" />

    <NftVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
    <NftAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
    <NftImage v-else :nft="nft" />

    <NftText :nft="nft" />

    <NftComments :nft="nft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft, ETypeNft } from '~/types';
import NftTop from '~/components/address/nft/NftTop.vue';
import NftText from '~/components/address/nft/NftText.vue';
import NftImage from '~/components/address/nft/NftImage.vue';
import NftVideo from '~/components/address/nft/NftVideo.vue';
import NftAudio from '~/components/address/nft/NftAudio.vue';
import NftComments from '~/components/address/nft/NftComments.vue';

type TNft = INft;

@Component({
  components: {
    NftTop,
    NftText,
    NftImage,
    NftVideo,
    NftAudio,
    NftComments,
  },
})
export default class Nft extends Vue {
  ETypeNft = ETypeNft;

  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
