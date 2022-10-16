<template>
  <div class="modal-post-comment">
    <nuxt-link
      :to="`/${chainSlug}/${comment.creator}`"
      class="modal-post-comment__thumb"
    >
      <client-only>
        <jazzicon :seed="10211" :address="comment.creator" :diameter="36" />
      </client-only>
    </nuxt-link>
    <div class="modal-post-comment-center">
      <div class="modal-post-comment-top">
        <div class="modal-post-comment__wallet">
          <nuxt-link :to="`/${chainSlug}/${comment.creator}`">
            {{ comment.creator | shortAddress }}
          </nuxt-link>
        </div>
        <div class="modal-post-comment-top-right">
          <img
            v-if="comment.isUp"
            src="@/assets/img/modal-post-comment_img1.svg"
            alt=""
            class="modal-post-comment__ld"
          />

          <img
            v-if="comment.isDown"
            src="@/assets/img/modal-post-comment_img2.svg"
            alt=""
            class="modal-post-comment__ld"
          />
        </div>
      </div>
      <div class="modal-post-comment__text">
        {{ comment.ipfsHash }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftComment } from '~/types';
import { addressModule } from '~/store';

@Component({})
export default class NftModalCommentItem extends Vue {
  @Prop({ required: true })
  readonly comment!: INftComment;

  get chainSlug(): string {
    return addressModule.chainSlug;
  }
}
</script>
