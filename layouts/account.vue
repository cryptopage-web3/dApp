<template>
  <div>
    <notifications width="350" />
    <layout-header />

    <section id="profile" class="profile height-full">
      <div class="container">
        <div class="profile-wrap">
          <account-left-sidebar />
          <nuxt />
          <account-right-sidebar />
        </div>
      </div>
    </section>

    <layout-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  layout: 'default',
})
export default class AccountLayout extends Vue {}
</script>
