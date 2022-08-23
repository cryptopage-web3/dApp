<template>
  <div class="market-main-left">
    <div class="market-main-catalogs">
      <marketplace-filters-btn />
      <marketplace-catalogs />
    </div>
    <div class="market-main-default-wrap">
      <marketplace-top-images />
      <marketplace-hot-collection />
      <marketplace-recommended />
    </div>
    <marketplace-filters />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { favoriteSelectInit } from '~/utils/favoriteSelect';

@Component({})
export default class MarketplaceContent extends Vue {
  mounted() {
    favoriteSelectInit();
  }
}
</script>
