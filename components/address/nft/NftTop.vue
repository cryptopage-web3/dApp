<template>
  <div class="profile-content-top">
    <nuxt-link :to="`/${chainSlug}/${nft.from}`" class="profile-content__user">
      <div class="profile-content__user-icon">
        <jazzicon :seed="10211" :address="nft.from" :diameter="30" />
      </div>
      <div>
        From:
        <span>
          {{ nft.from | shortAddress }}
        </span>
      </div>
    </nuxt-link>
    <div class="right">
      <div class="profile-content__date">
        {{ nft.date | formatDate }}
      </div>

      <NftDropdown :nft="nft" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';
import { addressModule } from '~/store';
import NftDropdown from '~/components/address/nft/NftDropdown.vue';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    NftDropdown,
  },
})
export default class NftTop extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  get chainSlug(): string {
    return addressModule.chainSlug;
  }
}
</script>
