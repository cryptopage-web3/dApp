<template>
  <div
    v-if="!messages.length"
    class="msg-not-found d-flex justify-center align-center flex-column"
  >
    <icon type="messages_empty" />
    <span>Messages not found</span>
  </div>
</template>
<script>
export default {
  components: {
    icon: async () => await import('@/components/icons/Icon')
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  }
}
</script>
