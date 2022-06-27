<template>
  <div ref="root" class="profile-content__bottom">
    <ul class="market-product-ld">
      <li>
        <a href="#" @click.prevent="select('like', $event)">
          <CommentLikeIcon />
          <span> {{ nft.likes }} </span>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="market-product-dislike"
          @click.prevent="select('dislike', $event)"
        >
          <CommentDislikeIcon />
          <span> {{ nft.dislikes }} </span>
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

    <NftBurn :nft="nft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import { INft } from '~/types';
import NftBurn from '~/components/address/nft/NftBurn.vue';
import CommentLikeIcon from '~/components/icon/nft/CommentLikeIcon.vue';
import CommentDislikeIcon from '~/components/icon/nft/CommentDislikeIcon.vue';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import CommentSendIcon from '~/components/icon/nft/CommentSendIcon.vue';

type TNft = INft;
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
  readonly nft!: TNft;

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

    if (!$(elem).hasClass('active')) {
      $(elem).addClass('active');
      $(this.$refs.root).find('.profile-content__comment').slideDown(300);
      $(this.$refs.root).addClass('active');
      $(elem)
        .closest('.market-product-ld')
        .find('a')
        .not($(elem) as any)
        .removeClass('active');
    } else {
      $(elem).closest('.market-product-ld').find('a').removeClass('active');
      $(this.$refs.root).removeClass('active');
      $(this.$refs.root).find('.profile-content__comment').slideUp(300);
      $(this.$refs.root)
        .find('.profile-content__comment .profile-content__comment-close')
        .removeClass('active');
      $(this.$refs.root)
        .find('.profile-content__comment .profile-content__comment-send')
        .removeClass('active');
    }
  }

  @Watch('commentText')
  onCommentTextChanged(value: string) {
    if (value.length > 1) {
      $(this.$refs.root)
        .find('.profile-content__comment-close')
        .addClass('active');
      $(this.$refs.root)
        .find('.profile-content__comment-send')
        .addClass('active');
    } else {
      $(this.$refs.root)
        .find('.profile-content__comment-close')
        .removeClass('active');
      $(this.$refs.root)
        .find('.profile-content__comment-send')
        .removeClass('active');
    }
  }

  close(event: PointerEvent) {
    this.commentText = '';

    const elem = event.currentTarget;

    if (!elem) {
      return;
    }

    $(elem).removeClass('active');
    $(elem)
      .closest('.profile-content__comment')
      .find('.profile-content__comment-send')
      .removeClass('active');
  }
}
</script>
