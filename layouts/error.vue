<template>
  <div class="error-page">
    <div class="error-page__icon">
      <img :src="image" alt="" />
    </div>
    <div class="error-page__title">
      {{ title }}
    </div>
    <div class="error-page__back">
      <NuxtLink
        to="/"
        class="btn-blue-transparent_button btn_large error-page__back-btn"
      >
        Go Homepage
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ErrorLayout extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly error!: {
    message: string;
    statusCode: number;
  };

  get image() {
    switch (this.error.statusCode) {
      case 404:
        return require('@/assets/img-custom/404.svg');

      case 400:
        return require('@/assets/img-custom/400.svg');

      default:
        return require('@/assets/img-custom/500.svg');
    }
  }

  get title() {
    switch (this.error.statusCode) {
      case 404:
        return 'Page Not Found';

      case 400:
        return 'Bad Request';

      default:
        return 'Server Error';
    }
  }
}
</script>
