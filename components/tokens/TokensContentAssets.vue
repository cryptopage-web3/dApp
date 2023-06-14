<template>
  <div
    id="profile-tabs1"
    class="tab-pane fade show active"
    role="tabpanel"
    aria-labelledby="profile-tabs1-tab"
  >
    <Loader v-if="loading" />
    <div v-else-if="!tokens.length" class="transactions__empty">No Tokens</div>
    <Token
      v-for="(token, index) in tokens"
      v-else
      :key="token.address || index"
      :token="token"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Token from './token/Token.vue';
import Loader from '~/components/loaders/GrowLoader.vue';
import { IToken } from '~/types';
import { addressModule } from '~/store';

@Component({
  components: {
    Token,
    Loader,
  },
})
export default class TokensContentAssets extends Vue {
  loading = true;

  get tokens(): IToken[] {
    return addressModule.tokens;
  }

  async mounted() {
    await this.fetchTokens();
  }

  async fetchTokens() {
    this.loading = true;

    await addressModule.fetchTokens();

    this.loading = false;
  }
}
</script>
