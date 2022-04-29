<template>
  <section class="market-main">
    <div class="container">
      <div class="market-main-wr">
        <start-content />
        <start-sidebar />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  head: {
    title: 'Crypto.Page - decentralized cross-chain social network',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Your bridge to the metaverse An anonymous uncensored social network where users own NFT content personally',
      },
    ],
  },
})
export default class IndexPage extends Vue {}
</script>
