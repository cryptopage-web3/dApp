<template>
  <div class="market-main-right">
    <div class="market-sidebar-wrap">
      <account-sidebar-nfts v-if="showSidebarNfts" />
      <account-sidebar-tokens v-if="showSidebarTokens" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { marketSidebarInit } from '~/utils/marketSidebar';

@Component({})
export default class AccountRightSidebar extends Vue {
  get showSidebarNfts(): boolean {
    return !(
      this.$route.name && ['network-address-nfts'].includes(this.$route.name)
    );
  }

  get showSidebarTokens(): boolean {
    return !(
      this.$route.name && ['network-address-tokens'].includes(this.$route.name)
    );
  }

  mounted() {
    marketSidebarInit();
  }
}
</script>
