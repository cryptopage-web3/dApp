<template>
  <div class="modal-post-user">
    <a
      href="#"
      class="modal-post-user__thumb"
      :style="{
        backgroundImage: `url(${userBg})`,
      }"
    ></a>
    <div class="modal-post-user-right">
      <div class="modal-post-user__wallet">
        From: <a href="#">{{ nft.from | shortAddress }}</a>
      </div>
      <div class="modal-post-user__date">
        {{ nft.date | formatDate }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import userBg from '~/assets/img/modal-post-user__thumb_bg.png';

type TNft = INft;

@Component({})
export default class NftModalTopUser extends Vue {
  userBg = userBg;

  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
