<template>
  <div>
    <section class="main">
      <notifications :duration="10000" />
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class StartLayout extends Vue {}
</script>
