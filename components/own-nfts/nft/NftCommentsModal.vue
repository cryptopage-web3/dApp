<template>
  <div
    ref="modal"
    class="modal fade modal-celar-history modal-comment-nft"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-top mb_20">
            <div class="modal-creat__title modal-creat__title_comment">
              Your reaction
              <CommentLikeActiveIcon v-if="commentType === 'like'" />
              <CommentDislikeActiveIcon v-else />
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <NftCloseIcon />
            </button>
          </div>
          <div class="modal-comment-nft-wrap">
            <div class="modal-comment-nft-thumb">
              <NftVideo
                v-if="nft.type === ETypeNft.video && nft.contentUrl"
                :nft="nft"
              />
              <NftAudio
                v-else-if="nft.type === ETypeNft.audio && nft.contentUrl"
                :nft="nft"
              />
              <NftImage
                v-else-if="nft.type === ETypeNft.image && nft.contentUrl"
                :nft="nft"
              />
              <div v-else class="market-product__media-image">
                <div class="market-product__media-image-empty">
                  <NftTextIcon />
                </div>
              </div>
            </div>
            <ul class="market-product-ld">
              <li>
                <a>
                  <CommentLikeEmptyIcon />
                  <span> {{ likes }} </span>
                </a>
              </li>
              <li>
                <a class="market-product-dislike">
                  <CommentDislikeEmptyIcon />
                  <span> {{ dislikes }} </span>
                </a>
              </li>
            </ul>
            <div class="profile-content__comment">
              <input
                v-model="commentText"
                type="text"
                placeholder="Your comment text"
                class="global-input"
              />
              <a
                v-show="!loading"
                href="#"
                class="profile-content__comment-close"
                @click.prevent="close"
              >
                <CommentCloseIcon />
              </a>
              <button
                v-show="!loading"
                class="profile-content__comment-send"
                @click.prevent="sendComment"
              >
                <CommentSendIcon />
              </button>
              <div v-if="loading" class="profile-content__comment-loading">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { EErrorType, ENftTransactionAccessType, ETypeNft, INft } from '~/types';
import CommentLikeEmptyIcon from '~/components/icon/nft/CommentLikeEmptyIcon.vue';
import CommentDislikeEmptyIcon from '~/components/icon/nft/CommentDislikeEmptyIcon.vue';
import CommentLikeActiveIcon from '~/components/icon/nft/CommentLikeActiveIcon.vue';
import CommentDislikeActiveIcon from '~/components/icon/nft/CommentDislikeActiveIcon.vue';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import CommentSendIcon from '~/components/icon/nft/CommentSendIcon.vue';
import NftImage from '~/components/own-nfts/nft/NftImage.vue';
import NftVideo from '~/components/own-nfts/nft/NftVideo.vue';
import NftAudio from '~/components/own-nfts/nft/NftAudio.vue';
import NftCloseIcon from '~/components/icon/nft/NftCloseIcon.vue';
import NftTextIcon from '~/components/icon/nft/NftTextIcon.vue';
import { ISendCommentParams, TCommentType } from '~/types/comment-form';
import {
  profileCommentClose,
  profileCommentControlVisible,
} from '~/utils/nftsComment';
import { addressModule, authModule } from '~/store';
import { IPFSService, Web3Service } from '~/services';
import { saveError } from '~/utils/saveError';
import { notify } from '~/utils/notify';

type TNft = INft;

const ipfsService = new IPFSService();

@Component({
  components: {
    CommentLikeEmptyIcon,
    CommentDislikeEmptyIcon,
    CommentLikeActiveIcon,
    CommentDislikeActiveIcon,
    NftCloseIcon,
    CommentCloseIcon,
    CommentSendIcon,
    NftImage,
    NftVideo,
    NftAudio,
    NftTextIcon,
  },
})
export default class NftCommentsModal extends Vue {
  loading = false;
  ETypeNft = ETypeNft;

  commentType: TCommentType = null;
  commentText = '';

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    modal: HTMLDivElement;
  };

  get likes(): number {
    return (this.nft.comments || []).filter((item) => item.isUp).length;
  }

  get dislikes(): number {
    return (this.nft.comments || []).filter((item) => item.isDown).length;
  }

  get isSameChain(): boolean {
    return authModule.chainSlug === addressModule.chainSlug;
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  get addressChainName(): string {
    return addressModule.chainName;
  }

  @Watch('commentText')
  onCommentTextChanged(value: string) {
    profileCommentControlVisible(value, this.$refs.modal);
  }

  show(type: TCommentType) {
    this.commentType = type;
    this.commentText = '';

    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  close(event: PointerEvent) {
    this.commentText = '';

    const elem = event.currentTarget;

    if (!elem) {
      return;
    }

    profileCommentClose(elem);
  }

  resetComment() {
    this.commentText = '';
    this.commentType = null;

    this.hide();
  }

  async haveAccessToSeePost() {
    if (
      !this.nft.isEncrypted ||
      this.nft.accessType === ENftTransactionAccessType.has_access
    ) {
      return true;
    }

    if (this.nft.accessType === ENftTransactionAccessType.has_not_access) {
      return false;
    }

    const web3Service = new Web3Service(authModule.provider);

    try {
      this.loading = true;

      const access = await web3Service.checkIfHaveAccessToEncryptedPost(
        authModule.address,
        this.nft.tokenId,
        authModule.chainSlug,
      );

      addressModule.updateOwnNftDetails({
        nft: this.nft,
        updatedDetails: {
          accessType: access
            ? ENftTransactionAccessType.has_access
            : ENftTransactionAccessType.has_not_access,
        },
      });

      this.loading = false;

      return !!access;
    } catch {
      this.loading = false;

      saveError(
        EErrorType.checkIfHaveAccessToEncryptedPost,
        'Error to check access',
        {
          address: authModule.address,
          tokenId: this.nft.tokenId,
          chainSlug: authModule.chainSlug,
        },
      );

      notify.error('Error to check access');
      return false;
    }
  }

  async sendComment() {
    if (!this.commentText) {
      notify.error('No comment text');
      return;
    }

    /** проверяем, что подключен кошелек нужной сети */

    if (!this.isAuth) {
      ($('.modal-profile-login') as any).modal('show');
      return;
    }

    if (!this.isSameChain) {
      notify.error(`Need connect to ${this.addressChainName}`);
      return;
    }

    /** проверяем, что нет реакции от этого пользователя ранее */

    const hasComment = (this.nft.comments || []).some(
      (item) => item.creator.toLowerCase() === authModule.address.toLowerCase(),
    );

    if (hasComment) {
      notify.error(`You have already commented this Post`);
      return;
    }

    /** проверяем, что есть доступ к посту */

    const haveAccess = await this.haveAccessToSeePost();

    if (!haveAccess) {
      notify.error(
        `You don't have access to the post and you can't add a comment`,
      );
      return;
    }

    this.loading = true;

    /** сохраняем текст в IPFS */

    let ipfsHash = '';

    try {
      ipfsHash = await ipfsService.saveComment(this.commentText);

      notify.info('Got Comment hash from IPFS');
    } catch {
      saveError(
        EErrorType.saveIpfsComment,
        'Failed to save Comment into IPFS',
        {
          address: authModule.address,
          commentText: this.commentText,
        },
      );

      notify.error('Failed to save Comment into IPFS');

      this.loading = false;
      return;
    }

    /** создаем комментарий в контракт через web3 */

    const sendCommentParams: ISendCommentParams = {
      authChainSlug: authModule.chainSlug,
      authAddress: authModule.address,
      nftTokenId: this.nft.tokenId,
      ipfsHash,
      isUp: this.commentType === 'like',
      isDown: this.commentType === 'dislike',
    };

    let txHash = '';
    const self = this;

    /** создаем web3 с провайдером авторизации */

    const web3Service = new Web3Service(authModule.provider);

    web3Service.writeComment({
      params: sendCommentParams,
      callbacks: {
        onTransactionHash(hash: string) {
          txHash = hash;

          notify.info(`${txHash}: Transaction on pending`);
        },
        onReceipt() {
          notify.success('Transaction completed');

          self.loading = false;
          self.resetComment();

          /** обновляем информацию NFT */

          addressModule.fetchOwnNftComments(self.nft);
        },
        onError() {
          saveError(
            EErrorType.createCommentTransaction,
            'Transaction has some error',
            sendCommentParams,
          );

          notify.error('Transaction has some error');

          self.loading = false;
        },
      },
    });
  }
}
</script>
