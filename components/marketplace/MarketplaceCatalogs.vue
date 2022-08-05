<template>
  <div class="market-main-catalogs-wrap">
    <div class="market-main-catalogs-body">
      <a href="#" class="market-main-catalog disabled">All NFT’s</a>
      <a href="#" class="market-main-catalog red">Art</a>
      <a href="#" class="market-main-catalog success">Collectibles</a>
      <a href="#" class="market-main-catalog">Domain Names</a>
      <a href="#" class="market-main-catalog">Music</a>
      <a href="#" class="market-main-catalog">Photography</a>
      <a href="#" class="market-main-catalog">Trading cards</a>
      <a href="#" class="market-main-catalog">Utility</a>
      <a href="#" class="market-main-catalog">Virtual worlds</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class MarketplaceCatalogs extends Vue {}
</script>
