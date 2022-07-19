<template>
  <div class="modal-post-user">
    <nuxt-link :to="`/${chainSlug}/${nft.from}`" class="modal-post-user__icon">
      <jazzicon :seed="10211" :address="nft.from" :diameter="34" />
    </nuxt-link>
    <div class="modal-post-user-right">
      <div class="modal-post-user__wallet">
        From:
        <nuxt-link :to="`/${chainSlug}/${nft.from}`">
          {{ nft.from | shortAddress }}
        </nuxt-link>
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
import { INftTransaction } from '~/types';
import { addressModule } from '~/store';
import userBg from '~/assets/img/modal-post-user__thumb_bg.png';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftModalTopUser extends Vue {
  userBg = userBg;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  get chainSlug(): string {
    return addressModule.chainSlug;
  }
}
</script>
