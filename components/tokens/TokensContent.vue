<template>
  <div>
    <ul id="myTab" class="nav nav-tabs profile-tabs tokens-tabs" role="tablist">
      <li class="nav-item">
        <a
          id="profile-tabs1-tab"
          class="profile-tabs__link active"
          data-toggle="tab"
          href="#profile-tabs1"
          role="tab"
          aria-controls="profile-tabs1"
          aria-selected="true"
          >Assets in Wallet ({{ tokens.length }})</a
        >
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs2-tab"
          class="profile-tabs__link disabled"
          data-toggle="tab"
          href="#profile-tabs2"
          role="tab"
          aria-controls="profile-tabs2"
          aria-selected="false"
          >Liquidity Pool Assets in Wallet (0)</a
        >
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs3-tab"
          class="profile-tabs__link disabled"
          data-toggle="tab"
          href="#profile-tabs3"
          role="tab"
          aria-controls="profile-tabs3"
          aria-selected="false"
          >Hidden tokens (0)</a
        >
      </li>
    </ul>

    <div id="myTabContent" class="tab-content">
      <TokensContentAssets />
      <TokensContentLiquidity />
      <TokensContentHidden />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import TokensContentAssets from './TokensContentAssets.vue';
import TokensContentHidden from './TokensContentHidden.vue';
import TokensContentLiquidity from './TokensContentLiquidity.vue';
import { IUserToken } from '~/types';
import { addressModule } from '~/store';

@Component({
  components: {
    TokensContentAssets,
    TokensContentHidden,
    TokensContentLiquidity,
  },
})
export default class TokensContent extends Vue {
  get tokens(): IUserToken[] {
    return addressModule.tokens;
  }
}
</script>
