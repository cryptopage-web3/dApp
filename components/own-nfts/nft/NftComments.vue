<template>
  <div class="market-product-bottom">
    <ul class="market-product-ld">
      <li>
        <a href="#">
          <CommentLikeIcon />
          <span> {{ nft.likes || 0 }} </span>
        </a>
      </li>
      <li>
        <a href="#" class="market-product-dislike">
          <CommentDislikeIcon />
          <span> {{ nft.dislikes || 0 }} </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import CommentLikeIcon from '~/components/icon/nft/CommentLikeIcon.vue';
import CommentDislikeIcon from '~/components/icon/nft/CommentDislikeIcon.vue';

type TNft = INft;

@Component({
  components: {
    CommentLikeIcon,
    CommentDislikeIcon,
  },
})
export default class NftComments extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
