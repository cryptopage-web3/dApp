<template>
  <div class="transactions-body__loading">
    <div class="spinner-grow text-secondary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default class GrowLoader extends Vue {}
</script>
