<template>
  <div class="market-main-right">
    <div class="market-sidebar-wrap">
      <Recommendations />
      <NewUsers />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import Recommendations from './right/Recommendations.vue';
import NewUsers from './right/NewUsers.vue';
import { marketSidebarInit } from '~/utils/marketSidebar';
import { stickyModule } from '~/store';

@Component({
  components: {
    Recommendations,
    NewUsers,
  },
})
export default class HomeRight extends Vue {
  stickySidebar: any = null;
  timeout: any = null;

  get refresh() {
    return stickyModule.rightRefresh;
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
      this.stickySidebar && this.stickySidebar.updateSticky();
    }, 500);
  }
}
</script>
