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
import { Component } from 'nuxt-property-decorator';
import Recommendations from './right/Recommendations.vue';
import NewUsers from './right/NewUsers.vue';
import { marketSidebarInit } from '~/utils/marketSidebar';

@Component({
  components: {
    Recommendations,
    NewUsers,
  },
})
export default class HomeRight extends Vue {
  stickySidebar: any = null;

  mounted() {
    setTimeout(() => {
      this.stickySidebar = marketSidebarInit();
    }, 100);
  }

  refreshSticky() {
    setTimeout(() => {
      this.stickySidebar && this.stickySidebar.destroy();
      this.stickySidebar = marketSidebarInit();
    }, 100);
  }
}
</script>
