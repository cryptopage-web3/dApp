<template>
  <div class="main-profile-statistics">
    <div class="main-profile-statistic">
      <div class="title">{{ transactionCount }}</div>
      <div class="text">Transaction</div>
    </div>
    <div class="main-profile-statistic">
      <div class="title">{{ inputs }}</div>
      <div class="text">Inputs</div>
    </div>
    <div class="main-profile-statistic">
      <div class="title">{{ outputs }}</div>
      <div class="text">Outputs from</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';

@Component({})
export default class ProfileTransactions extends Vue {
  get transactionCount() {
    return authModule.transactions.length;
  }

  get inputs() {
    return authModule.inputs;
  }

  get outputs() {
    return authModule.outputs;
  }
}
</script>
