<template>
  <div class="main-profile-wallet-cont">
    <table class="main-profile-wallet-table">
      <tr v-for="(token, index) in tokens" :key="`${token.name}_${index}`">
        <td>
          <div>
            <img v-if="token.logo_url" :src="token.logo_url" alt="" />
            <span> Your {{ token.symbol }}: </span>
          </div>
        </td>
        <td :title="token.amount">
          {{ token.amount | formatNumberFloatDigits }}
        </td>
      </tr>
    </table>
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
}
</script>
