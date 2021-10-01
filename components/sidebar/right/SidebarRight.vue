<template>
  <div class="main-right">
    <search />
    <div v-sticky="{ topSpacing: 65, bottomSpacing: 30 }" class="right-sidebar">
      <!-- <mems /> -->
      <messages v-if="isAuth" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    // mems: async () =>
    // await import('@/components/sidebar/right/SidebarRightMems'),
    search: async () =>
      await import('@/components/sidebar/right/SidebarRightSearch'),
    messages: async () =>
      await import('@/components/sidebar/right/SidebarRightMessages')
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  }
}
</script>
