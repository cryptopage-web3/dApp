<template>
  <div v-if="cryptoPageNft" ref="root" class="profile-content__bottom">
    <ul class="market-product-ld">
      <li>
        <a ref="like" href="#" @click.prevent="select('like', $event)">
          <CommentLikeActiveIcon v-if="commentType === 'like'" />
          <CommentLikeEmptyIcon v-else />
          <span> {{ likes }} </span>
        </a>
      </li>
      <li>
        <a
          ref="dislike"
          href="#"
          class="market-product-dislike"
          @click.prevent="select('dislike', $event)"
        >
          <CommentDislikeActiveIcon v-if="commentType === 'dislike'" />
          <CommentDislikeEmptyIcon v-else />
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { INft } from '~/types';
import { ISendCommentParams, TCommentType } from '~/types/comment-form';
import { IPFSService, Web3Service } from '~/services';
import { nftContractAddress } from '~/contracts';
import CommentLikeEmptyIcon from '~/components/icon/nft/CommentLikeEmptyIcon.vue';
import CommentLikeActiveIcon from '~/components/icon/nft/CommentLikeActiveIcon.vue';
import CommentDislikeEmptyIcon from '~/components/icon/nft/CommentDislikeEmptyIcon.vue';
import CommentDislikeActiveIcon from '~/components/icon/nft/CommentDislikeActiveIcon.vue';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import CommentSendIcon from '~/components/icon/nft/CommentSendIcon.vue';
import {
  profileCommentSelect,
  profileCommentControlVisible,
  profileCommentClose,
} from '~/utils/nftsComment';
import { addressModule, authModule } from '~/store';

type TNft = INft;

const ipfsService = new IPFSService();

@Component({
  components: {
    CommentLikeEmptyIcon,
    CommentLikeActiveIcon,
    CommentDislikeEmptyIcon,
    CommentDislikeActiveIcon,
    CommentCloseIcon,
    CommentSendIcon,
  },
})
export default class ControlComments extends Vue {
  loading = false;

  @Prop({ required: true })
  readonly nft!: TNft;

  @Prop({ type: Boolean, default: false })
  readonly hideBurn!: false;

  $refs!: {
    root: HTMLDivElement;
    like: HTMLDivElement;
    dislike: HTMLDivElement;
  };

  commentType: TCommentType = null;
  commentText = '';

  get cryptoPageNft(): boolean {
    const address = nftContractAddress[addressModule.chainId] || '';

    return address.toLowerCase() === this.nft.contract_address?.toLowerCase();
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

  get likes(): number {
    return (this.nft.comments || []).filter((item) => item.isUp).length;
  }

  get dislikes(): number {
    return (this.nft.comments || []).filter((item) => item.isDown).length;
  }

  select(type: TCommentType, event: PointerEvent) {
    this.commentType = this.commentType === type ? null : type;
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
    const elem =
      this.commentType === 'like' ? this.$refs.like : this.$refs.dislike;

    this.commentText = '';
    this.commentType = null;

    profileCommentSelect(elem, this.$refs.root);
  }

  async sendComment() {
    if (!this.commentType) {
      this.$notify({
        type: 'error',
        title: 'No comment type',
      });
      return;
    }

    if (!this.commentText) {
      this.$notify({
        type: 'error',
        title: 'No comment text',
      });
      return;
    }

    /** ??????????????????, ?????? ?????????????????? ?????????????? ???????????? ???????? */

    if (!this.isAuth || !this.isSameChain) {
      this.$notify({
        type: 'error',
        title: `Need connect to ${this.addressChainName}`,
      });
      return;
    }

    /** ??????????????????, ?????? ?????? ?????????????? ???? ?????????? ???????????????????????? ?????????? */

    const hasComment = (this.nft.comments || []).some(
      (item) => item.creator.toLowerCase() === authModule.address.toLowerCase(),
    );

    if (hasComment) {
      this.$notify({
        type: 'error',
        title: `You have already commented this NFT`,
      });
      return;
    }

    this.loading = true;

    /** ?????????????????? ?????????? ?? IPFS */

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

    /** ?????????????? ?????????????????????? ?? ???????????????? ?????????? web3 */

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

    /** ?????????????? web3 ?? ?????????????????????? ?????????????????????? */

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

          /** ?????????????????? ???????????????????? NFT */

          addressModule.fetchOwnNftComments(self.nft);
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
