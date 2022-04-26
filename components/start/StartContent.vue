<template>
  <div class="market-main-left">
    <div class="market-main-catalogs">
      <start-filters-btn />
      <start-catalogs />
    </div>
    <div class="market-main-default-wrap">
      <start-top-images />
      <start-hot-collection />
      <start-recommended />
    </div>
    <start-filters />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class StartContent extends Vue {}
</script>
