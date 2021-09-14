<template>
  <div class="right-sidebar-follow">
    <div class="right-sidebar-follow-cont">
      <div class="right-sidebar-follow__title">
        {{ message.title }}
      </div>
      <div class="right-sidebar-follow__text">
        {{ message.text }}
      </div>
    </div>
    <a class="right-sidebar-follow__close" @click="$emit('remove', message)">
      <icon type="remove" />
    </a>
  </div>
</template>
<script>
export default {
  components: {
    icon: async () => await import('@/components/icons/Icon')
  },
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
