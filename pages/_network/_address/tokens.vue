<template>
  <div class="profile-center profile-my-nfts tokens">
    <TokensHeader />
    <TokensOverview />
    <TokensContent />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import TokensHeader from '~/components/tokens/TokensHeader.vue';
import TokensOverview from '~/components/tokens/TokensOverview.vue';
import TokensContent from '~/components/tokens/TokensContent.vue';

@Component({
  head: {
    title: 'My Tokens | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My Tokens | Crypto.Page',
      },
    ],
  },
  components: {
    TokensHeader,
    TokensOverview,
    TokensContent,
  },
})
export default class TokensPage extends Vue {}
</script>
