<template>
  <div class="market-main-right">
    <div class="market-sidebar-wrap">
      <start-sidebar-top />
      <start-sidebar-activity />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { marketSidebarInit } from '~/utils/marketSidebar';

@Component({})
export default class StartSidebar extends Vue {
  mounted() {
    marketSidebarInit();
  }
}
</script>
