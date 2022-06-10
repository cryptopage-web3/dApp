<template>
  <div class="market-main-right">
    <div class="market-sidebar-wrap">
      <account-sidebar-nfts @updated="handleUpdated" />
      <account-sidebar-tokens @updated="handleUpdated" />
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
      this.refreshSticky();
    }, 100);
  }

  mounted() {
    setTimeout(() => {
      this.stickySidebar = marketSidebarInit();
    }, 100);
  }

  handleUpdated() {
    setTimeout(() => {
      this.refreshSticky();
    }, 300);
  }

  refreshSticky() {
    this.stickySidebar && this.stickySidebar.destroy();
    this.stickySidebar = marketSidebarInit();
  }
}
</script>
