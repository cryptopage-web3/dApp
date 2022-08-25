<template>
  <div class="profile-content">
    <div v-if="loading" class="profile-content__loading">
      <Skeleton class-name="profile-content__loading-top" />
      <Skeleton class-name="profile-content__loading-img" />
      <Skeleton class-name="profile-content__loading-text" />
    </div>
    <div v-else class="profile-content__content">
      <NftTop :nft="nft" />

      <NftVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
      <NftAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
      <NftImage
        v-else-if="nft.type === ETypeNft.image"
        :nft="nft"
        @show-modal="showModal"
      />
      <div v-else class="profile-content__image">
        <div class="profile-content__image-empty">No NFT Content</div>
      </div>

      <NftText :nft="nft" @show-modal="showModal" />

      <NftComments :nft="nft" />

      <NftModal ref="modal" :nft="nft" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { INftTransaction, ETypeNft } from '~/types';
import { addressModule } from '~/store';
import NftTop from '~/components/address/nft/NftTop.vue';
import NftText from '~/components/address/nft/NftText.vue';
import NftImage from '~/components/address/nft/NftImage.vue';
import NftVideo from '~/components/address/nft/NftVideo.vue';
import NftAudio from '~/components/address/nft/NftAudio.vue';
import NftComments from '~/components/address/nft/NftComments.vue';
import NftModal from '~/components/address/nft/NftModal.vue';
import Skeleton from '~/components/loaders/Skeleton.vue';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    NftTop,
    NftText,
    NftImage,
    NftVideo,
    NftAudio,
    NftComments,
    NftModal,
    Skeleton,
  },
})
export default class Nft extends Vue {
  ETypeNft = ETypeNft;
  loading = false;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    modal: NftModal;
  };

  get hasDetails() {
    return this.nft.hasDetails;
  }

  @Watch('hasDetails', { immediate: true })
  async onHasDetailsChanged(hasDetails?: boolean) {
    if (hasDetails) {
      return;
    }

    this.loading = true;

    await addressModule.fetchNftTransactionDetails(this.nft);

    this.loading = false;
  }

  showModal() {
    this.$refs.modal.show();
  }
}
</script>
