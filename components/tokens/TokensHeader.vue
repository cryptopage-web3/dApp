<template>
  <div class="profile-my-nfts-top">
    <div class="profile-my-nfts__title">
      <nuxt-link :to="`/${chainSlug}/${address}`" class="market-sidebar__more">
        <TokensBackIcon />
      </nuxt-link>
      <h2 class="global-zag">{{ isOwner ? 'My' : 'Account' }} Token's</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import TokensBackIcon from '~/components/icon/tokens/TokensBackIcon.vue';
import { addressModule, authModule } from '~/store';

@Component({
  components: {
    TokensBackIcon,
  },
})
export default class TokensHeader extends Vue {
  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get address(): string {
    return addressModule.address;
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }
}
</script>
