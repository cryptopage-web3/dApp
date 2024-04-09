<template>
  <div class="main-profile-wallet-cont">
    <table class="main-profile-wallet-table">
      <tr
        v-for="(token, index) in visibleTokens"
        :key="`${token.name}_${index}`"
      >
        <td>
          <div>
            <img v-if="token.logo_url" :src="token.logo_url" alt="" />
            <span>{{ token.symbol }}: </span>
          </div>
        </td>
        <td :title="token.amount">
          {{ token.amount | formatNumberFloatDigits }}
        </td>
      </tr>
    </table>
    <nuxt-link
      v-if="showMore"
      :to="`/${chainSlug}/${address}/tokens`"
      class="main-profile-wallet__more"
    >
      Show more
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';
import { IUserToken } from '~/types';

@Component({})
export default class ProfileTokens extends Vue {
  get tokens(): IUserToken[] {
    return authModule.tokens;
  }

  get visibleTokens(): IUserToken[] {
    return this.tokens.slice(0, 10);
  }

  get showMore(): boolean {
    return this.tokens.length > this.visibleTokens.length;
  }

  get address(): string {
    return authModule.address;
  }

  get chainSlug(): string {
    return authModule.chainSlug;
  }
}
</script>
