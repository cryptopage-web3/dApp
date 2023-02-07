<template>
  <div ref="root" class="profile-content">
    <div v-if="loading || !visible" class="profile-content__loading">
      <Skeleton class-name="profile-content__loading-top" />
      <Skeleton class-name="profile-content__loading-img" />
      <Skeleton class-name="profile-content__loading-text" />
    </div>
    <div v-else class="profile-content__content">
      <NftTop :nft="nft" />

      <div class="profile-content__media">
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

        <NftAccessControl
          :loading="decryptLoading"
          :is-encrypted="nft.isEncrypted"
          :access-duration="nft.accessDuration"
          :access-price="nft.accessPrice"
          :access-type="nft.accessType"
          @check-access="checkIfHaveAccessToSeePost"
          @decrypt="decryptPostContent"
          @unlock="showConfirmModal"
        />

        <div class="profile-content__media-refresh" @click.prevent="refresh">
          <NftRefreshIcon />
        </div>
      </div>

      <NftText :nft="nft" @show-modal="showModal" />

      <NftComments :nft="nft" />

      <NftModal ref="nftModal" :nft="nft" />
    </div>

    <NftAccessConfirmModal
      ref="confirmBuyModal"
      :access-duration="nft.accessDuration"
      :access-price="nft.accessPrice"
      @accept="buyPostAccess"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { MetadataService, Web3Service } from '~/services';
import NftAccessConfirmModal from '~/components/shared/nft-access/NftAccessConfirmModal.vue';
import { INftTransaction, ENftTransactionAccessType, ETypeNft } from '~/types';
import { addressModule, authModule } from '~/store';
import NftTop from '~/components/address/nft/NftTop.vue';
import NftText from '~/components/address/nft/NftText.vue';
import NftImage from '~/components/address/nft/NftImage.vue';
import NftVideo from '~/components/address/nft/NftVideo.vue';
import NftAudio from '~/components/address/nft/NftAudio.vue';
import NftComments from '~/components/address/nft/NftComments.vue';
import NftModal from '~/components/address/nft/NftModal.vue';
import Skeleton from '~/components/loaders/Skeleton.vue';
import NftAccessControl from '~/components/shared/nft-access/NftAccessControl.vue';
import NftRefreshIcon from '~/components/icon/nft/NftRefreshIcon.vue';
import NftLockIcon from '~/components/icon/nft/NftLockIcon.vue';

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
    NftRefreshIcon,
    NftLockIcon,
    NftAccessConfirmModal,
    NftAccessControl,
  },
})
export default class Nft extends Vue {
  ETypeNft = ETypeNft;
  ENftTransactionAccessType = ENftTransactionAccessType;
  loading = false;
  decryptLoading = false;
  visible = false;

  scrollListener: null | (() => void) = null;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    nftModal: NftModal;
    confirmBuyModal: NftAccessConfirmModal;
    root: HTMLDivElement;
  };

  mounted() {
    if (this.nft.hasDetails) {
      this.visible = true;
      this.loading = false;
      return;
    }

    this.$nextTick(() => {
      this.scrollListener = this.scrollHandler.bind(this);
      this.scrollListener();

      $(window).on('scroll', this.scrollListener);
    });
  }

  beforeDestroy() {
    if (!this.scrollListener) {
      return;
    }

    $(window).off('scroll', this.scrollListener);
    this.scrollListener = null;
  }

  showModal() {
    this.$refs.nftModal.show();
  }

  scrollHandler() {
    /** если NFT была показана, то ничего не делаем */
    if (this.visible) {
      return;
    }

    /**
     * NFT имеет некорректное расположение относительно страницы
     * скорее всего скрыто. Например, активен другой таб
     * */
    if (!$(this.$refs.root).offset()?.top) {
      return;
    }

    const windowHeight = Number($(window).height());
    const windowScrollTop = Number($(window).scrollTop());
    const elemOffsetTop = Number($(this.$refs.root).offset()?.top);
    const nftHeight = Number($(window).width()) > 767 ? 530 : 330;

    /** если до видимости NFT осталось проскроллить больше одной NFT, то ничего не делаем */
    if (windowScrollTop + windowHeight < elemOffsetTop - nftHeight) {
      return;
    }

    /** если NFT скоро покажется, то помечаем ее видимой и делаем запрос на детали */
    this.visible = true;
    this.refresh();
  }

  async checkIfHaveAccessToSeePost() {
    const web3Service = new Web3Service(authModule.provider);

    try {
      this.decryptLoading = true;

      const access = await web3Service.checkIfHaveAccessToEncryptedPost(
        this.nft.tokenId,
      );

      addressModule.updateNftDetails({
        nft: this.nft,
        updatedDetails: {
          accessType: access
            ? ENftTransactionAccessType.has_access
            : ENftTransactionAccessType.has_not_access,
        },
      });

      this.decryptLoading = false;
    } catch {
      this.decryptLoading = false;

      this.$notify({
        type: 'error',
        title: 'Error to check access',
      });
    }
  }

  async decryptPostContent() {
    const metadataService = new MetadataService();

    try {
      this.decryptLoading = true;

      const imageData = await metadataService.decryptIpfsFile(this.nft.tokenId);

      addressModule.updateNftDetails({
        nft: this.nft,
        updatedDetails: {
          type: ETypeNft.image,
          contentUrl: imageData,
          isEncrypted: false,
        },
      });

      this.decryptLoading = false;
    } catch {
      this.decryptLoading = false;

      this.$notify({
        type: 'error',
        title: 'Error to decrypt content',
      });
    }
  }

  showConfirmModal() {
    this.$refs.confirmBuyModal.show();
  }

  async buyPostAccess() {
    const web3Service = new Web3Service(authModule.provider);

    try {
      this.decryptLoading = true;

      await web3Service.buyPostAccess(authModule.address, this.nft.tokenId);

      addressModule.updateNftDetails({
        nft: this.nft,
        updatedDetails: {
          accessType: ENftTransactionAccessType.has_access,
        },
      });

      this.decryptLoading = false;
    } catch {
      this.decryptLoading = false;

      this.$notify({
        type: 'error',
        title: 'Error to unlock post',
      });
    }
  }

  async refresh() {
    this.loading = true;

    await addressModule.fetchNftTransactionDetails(this.nft);

    this.loading = false;
  }
}
</script>
