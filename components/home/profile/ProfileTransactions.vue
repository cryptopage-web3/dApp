<template>
  <div class="main-profile-statistics">
    <div class="main-profile-statistic">
      <div class="title">286</div>
      <div class="text">Transaction</div>
    </div>
    <div class="main-profile-statistic">
      <div class="title">106</div>
      <div class="text">Inputs</div>
    </div>
    <div class="main-profile-statistic">
      <div class="title">58,4K</div>
      <div class="text">Outputs from</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ProfileTransactions extends Vue {}
</script>
