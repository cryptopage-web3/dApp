<template>
  <div class="error-page">
    <div class="error-page__icon">
      <Icon type="error" />
    </div>
    <div class="error-page__title">
      {{ error.message }}
    </div>
    <div class="error-page__back">
      Back to the <NuxtLink to="/">home page</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon')
  },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
