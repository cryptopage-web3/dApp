<template>
  <div class="modal-post-user">
    <nuxt-link
      :to="`/${chainSlug}/${fromAddress}`"
      class="modal-post-user__icon"
    >
      <client-only>
        <jazzicon :seed="10211" :address="fromAddress" :diameter="34" />
      </client-only>
    </nuxt-link>
    <div class="modal-post-user-right">
      <div class="modal-post-user__wallet">
        From:
        <nuxt-link :to="`/${chainSlug}/${fromAddress}`">
          {{ fromAddress | shortAddress }}
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
import { addressModule, authModule } from '~/store';
import userBg from '~/assets/img/modal-post-user__thumb_bg.png';
import { ZERO_ADDRESS } from '~/constants';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftModalTopUser extends Vue {
  userBg = userBg;
  chainModule = this.$route.name === 'index' ? authModule : addressModule;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  get chainSlug(): string {
    return this.chainModule.chainSlug;
  }

  get fromAddress(): string {
    return this.nft.from === ZERO_ADDRESS ? this.nft.to : this.nft.from;
  }
}
</script>
