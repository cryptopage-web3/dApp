<template>
  <div>
    <layout-notification />
    <layout-cookies />
    <layout-header />

    <nuxt />

    <layout-footer />
    <onboarding-modals />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class DefaultLayout extends Vue {}
</script>
