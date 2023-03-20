<template>
  <div ref="root" class="col-xl-4 col-md-4 col-12">
    <div class="market-product">
      <div class="thumb">
        <Skeleton
          v-if="loading || !visible"
          class-name="market-product__media-loading"
        />
        <div v-else class="market-product__media">
          <NftVideo v-if="nft.type === ETypeNft.video" :nft="nft" />
          <NftAudio v-else-if="nft.type === ETypeNft.audio" :nft="nft" />
          <NftImage
            v-else-if="nft.type === ETypeNft.image"
            :nft="nft"
            @show-modal="showNftModal"
          />
          <div v-else class="market-product__media-image">
            <div class="market-product__media-image-empty">No NFT Content</div>
          </div>

          <NftAccessControl
            :loading="decryptLoading"
            :is-encrypted="isEncrypted"
            :access-duration="accessDuration"
            :access-price="accessPrice"
            :access-type="accessType"
            @check-access="checkIfHaveAccessToSeePost"
            @decrypt="decryptPostContent"
            @unlock="showConfirmModal"
          />
        </div>
        <NftFavorite :nft="nft" />
        <NftDropdown />
      </div>
      <NftText :nft="nft" @show-modal="showNftModal" />
      <NftComments :nft="nft" @select="selectReaction" />
    </div>

    <NftCommentsModal ref="commentsModal" :nft="nft" />

    <NftModal
      ref="nftModal"
      :nft="nft"
      :decrypt-loading="decryptLoading"
      @check-access="checkIfHaveAccessToSeePost"
      @decrypt="decryptPostContent"
      @unlock="showConfirmModal"
    />

    <NftAccessConfirmModal
      ref="confirmBuyModal"
      :access-duration="accessDuration"
      :access-price="accessPrice"
      @accept="buyPostAccess"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import NftModal from './modal/Modal.vue';
import NftAccessConfirmModal from '~/components/shared/nft-access/NftAccessConfirmModal.vue';
import { ENftTransactionAccessType, ETypeNft, INft } from '~/types';
import NftDropdown from '~/components/own-nfts/nft/NftDropdown.vue';
import NftText from '~/components/own-nfts/nft/NftText.vue';
import NftComments from '~/components/own-nfts/nft/NftComments.vue';
import NftImage from '~/components/own-nfts/nft/NftImage.vue';
import NftVideo from '~/components/own-nfts/nft/NftVideo.vue';
import NftAudio from '~/components/own-nfts/nft/NftAudio.vue';
import NftFavorite from '~/components/own-nfts/nft/NftFavorite.vue';
import NftCommentsModal from '~/components/own-nfts/nft/NftCommentsModal.vue';
import Skeleton from '~/components/loaders/Skeleton.vue';
import NftAccessControl from '~/components/shared/nft-access/NftAccessControl.vue';
import { addressModule, authModule } from '~/store';
import { TCommentType } from '~/types/comment-form';
import { MetadataService, Web3Service } from '~/services';

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
    Skeleton,
    NftCommentsModal,
    NftModal,
    NftAccessConfirmModal,
    NftAccessControl,
  },
})
export default class Nft extends Vue {
  loading = true;
  visible = false;
  decryptLoading = false;
  ETypeNft = ETypeNft;
  ENftTransactionAccessType = ENftTransactionAccessType;

  scrollListener: null | (() => void) = null;

  @Prop({ required: true })
  readonly nft!: TNft;

  get isEncrypted(): boolean {
    return this.nft.isEncrypted || false;
  }

  get accessType(): ENftTransactionAccessType {
    return this.nft.accessType || ENftTransactionAccessType.has_access;
  }

  get accessPrice(): number {
    return this.nft.accessPrice || 0;
  }

  get accessDuration(): number {
    return this.nft.accessDuration || 0;
  }

  $refs!: {
    commentsModal: NftCommentsModal;
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
      $(window).scrollTop(0);

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
    const nftHeight = 530;

    /** если до видимости NFT осталось проскроллить больше одной NFT, то ничего не делаем */
    if (windowScrollTop + windowHeight < elemOffsetTop - nftHeight) {
      return;
    }

    /** если NFT скоро покажется, то помечаем ее видимой и делаем запрос на детали */
    this.visible = true;
    this.fetchDetails();
  }

  selectReaction(type: TCommentType) {
    this.$refs.commentsModal.show(type);
  }

  showNftModal() {
    this.$refs.nftModal.show();
  }

  async fetchDetails() {
    this.loading = true;

    await addressModule.fetchOwnNftDetails(this.nft);

    this.loading = false;
  }

  /** access methods */

  async checkIfHaveAccessToSeePost() {
    const web3Service = new Web3Service(authModule.provider);

    try {
      this.decryptLoading = true;

      const access = await web3Service.checkIfHaveAccessToEncryptedPost(
        this.nft.tokenId,
      );

      addressModule.updateOwnNftDetails({
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

      addressModule.updateOwnNftDetails({
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

      addressModule.updateOwnNftDetails({
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
}
</script>
