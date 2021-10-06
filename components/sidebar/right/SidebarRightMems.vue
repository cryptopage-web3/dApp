<template>
  <div v-if="$store.getters['auth/isAuth']">
    <draggable
      v-model="$store.getters['auth/tokens']"
      class="main-mems"
      group="mems"
      @start="drag = true"
      @end="drag = false"
    >
      <item
        v-for="token in tokens"
        :key="token.tokenInfo.address"
        :token="token"
      />
    </draggable>
  </div>
</template>
<script>
export default {
  components: {
    item: async () =>
      await import('@/components/sidebar/right/SidebarRightMem'),
    draggable: async () => await import('vuedraggable')
  }
}
</script>
