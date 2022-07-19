<template>
  <div class="modal-post-bottom">
    <div class="modal-post-comments">
      <div class="modal-post-comment">
        <a
          href="#"
          class="modal-post-comment__thumb"
          :style="{
            backgroundImage: `url(${modalBg1})`,
          }"
        ></a>
        <div class="modal-post-comment-center">
          <div class="modal-post-comment-top">
            <div class="modal-post-comment__wallet">
              <a href="#">0xfB9...687</a> / Bernard Show
            </div>
            <div class="modal-post-comment-top-right">
              <img
                src="@/assets/img/modal-post-comment_img1.svg"
                alt=""
                class="modal-post-comment__ld"
              />
              <div class="modal-post-comment__date">Today 12:59</div>
            </div>
          </div>
          <div class="modal-post-comment__text">
            Mauris maximus arcu ac metus imdasdardiet dapibus. Maecenas
            malesuada ex vel risudsadsadsadsadasdsadsadas dapibus
          </div>
        </div>
        <a href="#" class="modal-post-comment__close">
          <img src="@/assets/img/modal-post-comment__close_img.svg" alt="" />
        </a>
      </div>
      <div class="modal-post-comment">
        <a
          href="#"
          class="modal-post-comment__thumb"
          :style="{
            backgroundImage: `url(${modalBg2})`,
          }"
        ></a>
        <div class="modal-post-comment-center">
          <div class="modal-post-comment-top">
            <div class="modal-post-comment__wallet">
              <a href="#">0xf3D...611</a> / Jerom Jerom
            </div>
            <div class="modal-post-comment-top-right">
              <img
                src="@/assets/img/modal-post-comment_img2.svg"
                alt=""
                class="modal-post-comment__ld"
              />
              <div class="modal-post-comment__date">Last month</div>
            </div>
          </div>
          <div class="modal-post-comment__text">
            Mauris maximus arcu ac metus imdasdardiet dapibus. Maecenas
            malesuada ex vel risudsadsadsadsadasdsadsadas dapibus
          </div>
        </div>
        <a href="#" class="modal-post-comment__close">
          <img src="@/assets/img/modal-post-comment__close_img.svg" alt="" />
        </a>
      </div>
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
import { INftTransaction } from '~/types';
import modalBg1 from '~/assets/img/modal-post-comment_bg1.png';
import modalBg2 from '~/assets/img/modal-post-comment_bg2.png';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftModalCommentList extends Vue {
  modalBg1 = modalBg1;
  modalBg2 = modalBg2;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;
}
</script>
