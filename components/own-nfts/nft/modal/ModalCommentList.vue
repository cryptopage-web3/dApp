<template>
  <div class="modal-post-bottom">
    <div class="modal-post-comments">
      <ModalCommentItem
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
import ModalCommentItem from './ModalCommentItem.vue';
import { INft, INftComment } from '~/types';

type TNft = INft;

@Component({
  components: {
    ModalCommentItem,
  },
})
export default class ModalCommentList extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  get comments(): INftComment[] {
    return (this.nft.comments || []).filter((item) => item.ipfsHash);
  }

  uniqKey(comment: INftComment) {
    return `${comment.ipfsHash}_${comment.creator}_${this.nft.contract_address}_${this.nft.tokenId}`;
  }
}
</script>
