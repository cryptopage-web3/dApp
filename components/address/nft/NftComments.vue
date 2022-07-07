<template>
  <div ref="root" class="profile-content__bottom">
    <ul class="market-product-ld">
      <li>
        <a href="#" @click.prevent="select('like', $event)">
          <CommentLikeIcon />
          <span> {{ nft.likes || 0 }} </span>
        </a>
      </li>
      <li>
        <a
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
      <a href="#" class="profile-content__comment-close" @click.prevent="close">
        <CommentCloseIcon />
      </a>
      <button class="profile-content__comment-send">
        <CommentSendIcon />
      </button>
    </div>

    <NftBurn v-if="!hideBurn" :nft="nft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';
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

type TNftTransaction = INftTransaction;
type TCommentType = null | 'like' | 'dislike';

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
  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  @Prop({ type: Boolean, default: false })
  readonly hideBurn!: false;

  $refs!: {
    root: HTMLDivElement;
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
}
</script>
