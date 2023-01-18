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

        <div
          v-if="nft.isEncrypted"
          class="profile-content__media-encrypted-wrapper"
        >
          <div
            v-if="nft.accessType === ENftTransactionAccessType.not_requested"
          >
            <p>
              This post is encrypted, please check if you have access to see it
            </p>
            <a
              href="#"
              class="btn btn_large btn_default btn-blue"
              @click.prevent="checkIfHaveAccessToSeePost"
            >
              Check access
            </a>
          </div>
          <div
            v-else-if="nft.accessType === ENftTransactionAccessType.has_access"
          >
            <p>This post is encrypted, but you can decrypt it</p>
            <a
              href="#"
              class="btn btn_large btn_default btn-blue"
              @click.prevent="decryptPostContent"
            >
              Decrypt content
            </a>
          </div>
          <div
            v-else-if="
              nft.accessType === ENftTransactionAccessType.has_not_access
            "
          >
            <div>
              <svg
                width="23"
                height="26"
                viewBox="0 0 23 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 11.75V12.75H17.5V11.75H16.5ZM6.5 11.75H5.5V12.75H6.5V11.75ZM12.5 16.75C12.5 16.1977 12.0523 15.75 11.5 15.75C10.9477 15.75 10.5 16.1977 10.5 16.75H12.5ZM10.5 19.25C10.5 19.8023 10.9477 20.25 11.5 20.25C12.0523 20.25 12.5 19.8023 12.5 19.25H10.5ZM4 12.75H19V10.75H4V12.75ZM20.5 14.25V21.75H22.5V14.25H20.5ZM19 23.25H4V25.25H19V23.25ZM2.5 21.75V14.25H0.5V21.75H2.5ZM4 23.25C3.17157 23.25 2.5 22.5784 2.5 21.75H0.5C0.5 23.683 2.067 25.25 4 25.25V23.25ZM20.5 21.75C20.5 22.5784 19.8284 23.25 19 23.25V25.25C20.933 25.25 22.5 23.683 22.5 21.75H20.5ZM19 12.75C19.8284 12.75 20.5 13.4216 20.5 14.25H22.5C22.5 12.317 20.933 10.75 19 10.75V12.75ZM4 10.75C2.067 10.75 0.5 12.317 0.5 14.25H2.5C2.5 13.4216 3.17157 12.75 4 12.75V10.75ZM15.5 6.75V11.75H17.5V6.75H15.5ZM16.5 10.75H6.5V12.75H16.5V10.75ZM7.5 11.75V6.75H5.5V11.75H7.5ZM11.5 2.75C13.7091 2.75 15.5 4.54086 15.5 6.75H17.5C17.5 3.43629 14.8137 0.75 11.5 0.75V2.75ZM11.5 0.75C8.18629 0.75 5.5 3.43629 5.5 6.75H7.5C7.5 4.54086 9.29086 2.75 11.5 2.75V0.75ZM10.5 16.75V19.25H12.5V16.75H10.5Z"
                  fill="#F5F9FD"
                />
              </svg>
            </div>
            <p>To see the post, you need to unblock it</p>
            <a
              href="#"
              class="btn btn_large btn_default btn-blue"
              @click.prevent="buyPostAccess"
            >
              Unlock post for {{ nft.accessPrice / 10 ** 18 }} PAGE
              {{
                nft.accessDuration
                  ? `(${Math.round(nft.accessDuration / (24 * 60 * 60))} days)`
                  : ''
              }}
            </a>
          </div>
        </div>

        <div class="profile-content__media-refresh" @click.prevent="refresh">
          <NftRefreshIcon />
        </div>
      </div>

      <NftText :nft="nft" @show-modal="showModal" />

      <NftComments :nft="nft" />

      <NftModal ref="modal" :nft="nft" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { Web3Service } from '../../../services';
import { MetadataService } from '../../../services/MetadataService';
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
import NftRefreshIcon from '~/components/icon/nft/NftRefreshIcon.vue';

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
  },
})
export default class Nft extends Vue {
  ETypeNft = ETypeNft;
  ENftTransactionAccessType = ENftTransactionAccessType;
  loading = false;
  visible = false;

  scrollListener: null | (() => void) = null;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    modal: NftModal;
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
    this.$refs.modal.show();
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
  }

  async decryptPostContent() {
    const metadataService = new MetadataService();

    const imageData = await metadataService.decryptIpfsFile(this.nft.tokenId);

    addressModule.updateNftDetails({
      nft: this.nft,
      updatedDetails: {
        type: ETypeNft.image,
        contentUrl: imageData,
        isEncrypted: false,
      },
    });
  }

  async buyPostAccess() {
    const web3Service = new Web3Service(authModule.provider);

    await web3Service.buyPostAccess(authModule.address, this.nft.tokenId);

    addressModule.updateNftDetails({
      nft: this.nft,
      updatedDetails: {
        accessType: ENftTransactionAccessType.has_access,
      },
    });
  }

  async refresh() {
    this.loading = true;

    await addressModule.fetchNftTransactionDetails(this.nft);

    this.loading = false;
  }
}
</script>
