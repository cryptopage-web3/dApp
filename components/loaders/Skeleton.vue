<template>
  <div
    class="loader-skeleton"
    :style="{
      height: `${height}px`,
      width: width ? `${width}px` : `100%`
    }"
  ></div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Skeleton extends Vue {
  @Prop({ type: Number, default: 100 })
  readonly height!: number

  @Prop({ type: Number, default: 0 })
  readonly width!: number
}
</script>
