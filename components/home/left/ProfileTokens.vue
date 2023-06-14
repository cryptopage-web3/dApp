<template>
  <div class="main-profile-wallet-cont">
    <table class="main-profile-wallet-table">
      <tr v-for="token in tokens" :key="token.address">
        <td>
          <div>
            <img v-if="token.logo" :src="token.logo" alt="" />
            <span> Your {{ token.symbol }}: </span>
          </div>
        </td>
        <td :title="token.balance">
          {{ token.balance | formatNumberFloatDigits }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';
import { IToken } from '~/types';

@Component({})
export default class ProfileTokens extends Vue {
  get tokens(): IToken[] {
    return authModule.tokens;
  }
}
</script>
