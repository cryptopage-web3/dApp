<template>
  <div class="start-page">start</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  layout: 'start'
})
export default class IndexPage extends Vue {}
</script>
