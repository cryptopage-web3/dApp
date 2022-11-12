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
import { stickyModule } from '~/store';

@Component({})
export default class AccountRightSidebar extends Vue {
  stickySidebar: any = null;
  timeout: any = null;

  get refresh() {
    return stickyModule.rightRefresh;
  }

  @Watch('$route')
  onRouteChanged() {
    this.refreshSticky();
  }

  @Watch('refresh')
  onRefreshChange(refresh: boolean) {
    if (!refresh) {
      return;
    }

    this.refreshSticky();
    stickyModule.cleanRight();
  }

  mounted() {
    setTimeout(() => {
      this.stickySidebar = marketSidebarInit();
    }, 100);
  }

  refreshSticky() {
    this.timeout && clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.stickySidebar && this.stickySidebar.destroy();
      const elements = $('.market-main-right .inner-wrapper-sticky > *');
      $('.market-sidebar-wrap').append(elements);
      $('.market-main-right .inner-wrapper-sticky').remove();

      this.$nextTick(() => {
        this.stickySidebar = marketSidebarInit();
      });
    }, 500);
  }
}
</script>
