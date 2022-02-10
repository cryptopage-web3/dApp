<template>
  <div
    class="loader-skeleton"
    :class="[className]"
    :style="{
      height: height ? `${height}px` : undefined,
      width: width ? `${width}px` : undefined
    }"
  ></div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Skeleton extends Vue {
  @Prop({ type: Number, default: 0 })
  readonly height!: number

  @Prop({ type: Number, default: 0 })
  readonly width!: number

  @Prop({ type: String, default: '' })
  readonly className!: string
}
</script>
