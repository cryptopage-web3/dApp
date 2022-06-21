<template>
  <div class="profile-content__bottom-comments">
    <ul class="market-product-ld">
      <li>
        <a href="#" @click.prevent="select('like', $event)">
          <CommentLikeIcon />
          <span> 0 </span>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="market-product-dislike"
          @click.prevent="select('dislike', $event)"
        >
          <CommentDislikeIcon />
          <span> 0 </span>
        </a>
      </li>
    </ul>
    <div class="profile-content__comment">
      <input type="text" placeholder="Your comment text" class="global-input" />
      <a href="#" class="profile-content__comment-close" @click.prevent="close">
        <CommentCloseIcon />
      </a>
      <button class="profile-content__comment-send">
        <CommentSendIcon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import CommentLikeIcon from '~/components/icon/nft/CommentLikeIcon.vue';
import CommentDislikeIcon from '~/components/icon/nft/CommentDislikeIcon.vue';
import CommentCloseIcon from '~/components/icon/nft/CommentCloseIcon.vue';
import CommentSendIcon from '~/components/icon/nft/CommentSendIcon.vue';

type TNft = INft;
type TCommentType = null | 'like' | 'dislike';

@Component({
  components: {
    CommentLikeIcon,
    CommentDislikeIcon,
    CommentCloseIcon,
    CommentSendIcon,
  },
})
export default class NftComments extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  commentType: TCommentType = null;

  select(type: TCommentType, event: PointerEvent) {
    this.commentType = type;

    const elem = event.currentTarget;

    if (!elem) {
      return;
    }

    $(elem).addClass('active');
    $(elem)
      .closest('.profile-content__bottom')
      .find('.profile-content__comment')
      .slideDown(300);
  }

  close(event: PointerEvent) {
    this.commentType = null;

    const elem = event.currentTarget;

    if (!elem) {
      return;
    }

    $(elem).removeClass('active');
    $(elem).closest('.profile-content__comment').slideUp(300);
    $(elem)
      .closest('.profile-content__bottom')
      .find('.market-product-ld a')
      .removeClass('active');
  }
}
</script>
