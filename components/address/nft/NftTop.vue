<template>
  <div class="profile-content-top">
    <nuxt-link
      :to="`/${chainSlug}/${fromAddress}`"
      class="profile-content__user"
    >
      <div class="profile-content__user-icon">
        <client-only>
          <jazzicon :seed="10211" :address="fromAddress" :diameter="30" />
        </client-only>
      </div>
      <div>
        From:
        <span>
          {{ fromAddress | shortAddress }}
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
import { addressModule, authModule } from '~/store';
import NftDropdown from '~/components/address/nft/NftDropdown.vue';
import { getNftFromAddress } from '~/utils/getNftFromAddress';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    NftDropdown,
  },
})
export default class NftTop extends Vue {
  chainModule = this.$route.name === 'index' ? authModule : addressModule;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  get chainSlug(): string {
    return this.chainModule.chainSlug;
  }

  get fromAddress(): string {
    return getNftFromAddress(this.nft);
  }
}
</script>
