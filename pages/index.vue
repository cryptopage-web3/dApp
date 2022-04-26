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

@Component({})
export default class IndexPage extends Vue {}
</script>
