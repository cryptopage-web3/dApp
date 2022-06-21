<template>
  <div>
    <ul class="market-product-ld">
      <li>
        <a href="#">
          <CommentLikeIcon />
          <span> 0 </span>
        </a>
      </li>
      <li>
        <a href="#" class="market-product-dislike">
          <CommentDislikeIcon />
          <span> 0 </span>
        </a>
      </li>
    </ul>
    <div class="profile-content__comment">
      <input type="text" placeholder="Your comment text" class="global-input" />
      <a href="#" class="profile-content__comment-close">
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
}
</script>
