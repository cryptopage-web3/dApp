<template>
  <div class="page-load">
    <icon type="logo" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  components: {
    icon: async () => await import('@/components/icons/Icon.vue')
  }
})
export default class PageLoadBG extends Vue {}
</script>
