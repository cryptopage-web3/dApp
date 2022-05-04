<template>
  <div class="market-main-right">
    <div class="market-sidebar-wrap">
      <account-sidebar-nfts />
      <account-sidebar-tokens />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import { marketSidebarInit } from '~/utils/marketSidebar';

@Component({})
export default class AccountRightSidebar extends Vue {
  stickySidebar: any = null;

  @Watch('$route')
  onRouteChanged() {
    setTimeout(() => {
      this.stickySidebar && this.stickySidebar.destroy();
      this.stickySidebar = marketSidebarInit();
    }, 100);
  }

  mounted() {
    setTimeout(() => {
      this.stickySidebar = marketSidebarInit();
    }, 100);
  }
}
</script>
