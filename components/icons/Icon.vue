<template>
  <div class="no-style" v-html="icon"></div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import iconList from '~/constants/icons'

@Component({})
export default class Icon extends Vue {
  @Prop({ type: String, default: '' })
  readonly type!: string

  get icon(): string {
    return iconList[this.type] || ''
  }
}
</script>
<style>
.no-style {
  display: contents !important;
}
</style>
