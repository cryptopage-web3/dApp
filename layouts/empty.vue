<template>
  <div class="container">
    <layout-notification />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class EmptyLayout extends Vue {}
</script>
