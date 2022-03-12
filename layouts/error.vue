<template>
  <div class="error-page">
    <div class="error-page__icon">
      <icon type="error" />
    </div>
    <div class="error-page__title">
      {{ error.message }}
    </div>
    <div class="error-page__back">
      Back to the <NuxtLink to="/">home page</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
  components: {
    icon: async () => await import('~/components/icons/Icon.vue')
  }
})
export default class ErrorLayout extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly error!: {
    message: string
  }
}
</script>
