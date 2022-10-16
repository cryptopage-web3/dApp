<template>
  <div class="modal-post-bottom">
    <div class="modal-post-comments">
      <NftModalCommentItem
        v-for="comment in comments"
        :key="uniqKey(comment)"
        :comment="comment"
      />
    </div>
    <div class="modal-post-bottom__text">
      <span> Comments are disabled, to enable them, click on the icon </span>
      <img src="@/assets/img/chat-menu_icon.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftComment, INftTransaction } from '~/types';
import NftModalCommentItem from '~/components/address/nft/NftModalCommentItem.vue';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    NftModalCommentItem,
  },
})
export default class NftModalCommentList extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  get comments(): INftComment[] {
    return this.nft.comments || [];
  }

  uniqKey(comment: INftComment) {
    return `${comment.ipfsHash}_${comment.creator}_${comment.price}`;
  }
}
</script>
