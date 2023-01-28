<template>
  <div class="modal-post-user">
    <nuxt-link
      :to="`/${chainSlug}/${nft.contract_address}`"
      class="modal-post-user__icon"
    >
      <client-only>
        <jazzicon
          :seed="10211"
          :address="nft.contract_address"
          :diameter="34"
        />
      </client-only>
    </nuxt-link>
    <div class="modal-post-user-right">
      <div class="modal-post-user__wallet">
        Collection: {{ nft.collectionName }}
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
import { addressModule } from '~/store';
import userBg from '~/assets/img/modal-post-user__thumb_bg.png';

type TNft = INft;

@Component({})
export default class NftModalTopUser extends Vue {
  userBg = userBg;

  @Prop({ required: true })
  readonly nft!: TNft;

  get chainSlug(): string {
    return addressModule.chainSlug;
  }
}
</script>
