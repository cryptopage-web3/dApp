<template>
  <div class="start-page__loading">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { authModule } from '~/store';

@Component({
  head: {
    title: 'Crypto.Page - decentralized cross-chain social network',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Your bridge to the metaverse An anonymous uncensored social network where users own NFT content personally',
      },
    ],
  },
})
export default class IndexPage extends Vue {
  get initLoading() {
    return authModule.initLoading;
  }

  get isAuth() {
    return authModule.isAuth;
  }

  get authAddress(): string {
    return authModule.address;
  }

  get authChainSlug(): string {
    return authModule.chainSlug;
  }

  mounted() {
    if (!this.initLoading) {
      this.redirect();
    }
  }

  @Watch('initLoading')
  initLoadingChanged() {
    this.redirect();
  }

  redirect() {
    setTimeout(() => {
      const url = this.isAuth
        ? `/${this.authChainSlug}/${this.authAddress}`
        : `/connect`;

      this.$router.push(url);
    }, 500);
  }
}
</script>
