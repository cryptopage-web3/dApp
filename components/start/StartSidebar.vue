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

@Component({})
export default class StartSidebar extends Vue {}
</script>
