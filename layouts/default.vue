<template>
  <div>
    <notifications width="350" />
    <layout-header />
    <nuxt />
    <layout-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class DefaultLayout extends Vue {}
</script>
