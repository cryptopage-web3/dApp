<template>
  <div ref="root" class="profile-content__bottom">
    <ul class="market-product-ld">
      <li>
        <a ref="like" href="#" @click.prevent="select('like', $event)">
          <CommentLikeIcon />
          <span> {{ nft.likes || 0 }} </span>
        </a>
      </li>
      <li>
        <a
          ref="dislike"
          href="#"
          class="market-product-dislike"
          @click.prevent="select('dislike', $event)"
        >
          <CommentDislikeIcon />
          <span> {{ nft.dislikes || 0 }} </span>
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

    <NftBurn v-if="!hideBurn" :nft="nft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';
import { ISendCommentParams } from '~/types/comment-form';
import { IPFSService, Web3Service } from '~/services';
import NftBurn from '~/components/address/nft/NftBurn.vue';
import CommentLikeIcon from '~/components/icon/nft/CommentLikeIcon.vue';
import CommentDislikeIcon from '~/components/icon/nft/CommentDislikeIcon.vue';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import CommentSendIcon from '~/components/icon/nft/CommentSendIcon.vue';
import {
  profileCommentSelect,
  profileCommentControlVisible,
  profileCommentClose,
} from '~/utils/nftsComment';
import { authModule } from '~/store';

type TNftTransaction = INftTransaction;
type TCommentType = null | 'like' | 'dislike';

const ipfsService = new IPFSService();

@Component({
  components: {
    NftBurn,
    CommentLikeIcon,
    CommentDislikeIcon,
    CommentCloseIcon,
    CommentSendIcon,
  },
})
export default class NftComments extends Vue {
  loading = false;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  @Prop({ type: Boolean, default: false })
  readonly hideBurn!: false;

  $refs!: {
    root: HTMLDivElement;
    like: HTMLDivElement;
    dislike: HTMLDivElement;
  };

  commentType: TCommentType = null;
  commentText = '';

  select(type: TCommentType, event: PointerEvent) {
    this.commentType = type;
    this.commentText = '';

    const elem = event.currentTarget;

    if (!elem) {
      return;
    }

    profileCommentSelect(elem, this.$refs.root);
  }

  @Watch('commentText')
  onCommentTextChanged(value: string) {
    profileCommentControlVisible(value, this.$refs.root);
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
  }

  async sendComment() {
    this.loading = true;

    if (!this.commentText) {
      this.$notify({
        type: 'error',
        title: 'No comment text',
      });
      return;
    }

    /** сохраняем текст в IPFS */

    let ipfsHash = '';

    try {
      ipfsHash = await ipfsService.saveComment(this.commentText);

      this.$notify({
        type: 'info',
        title: 'Got Comment hash from IPFS',
      });
    } catch {
      this.$notify({
        type: 'error',
        title: 'Failed to save Comment into IPFS',
      });

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

          self.$notify({
            type: 'info',
            title: `${txHash}: Transaction on pending`,
          });
        },
        onReceipt() {
          self.$notify({
            type: 'success',
            title: 'Transaction completed',
          });

          self.loading = false;
          self.resetComment();
        },
        onError() {
          self.$notify({
            type: 'error',
            title: 'Transaction has some error',
          });

          self.loading = false;
        },
      },
    });
  }
}
</script>
