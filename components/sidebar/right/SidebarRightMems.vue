<template>
  <div v-if="$store.getters['auth/isAuth']">
    <draggable
      v-model="tokens"
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
  },
  data: () => ({
    tokens: []
  }),
  async mounted() {
    await this.$nextTick(async () => {
      await this.$store.dispatch('wallet/get')
      const tokens = this.$store.getters['wallet/tokens']
      this.tokens = tokens
        .slice(0, 6)
        .sort((a, b) => b.normalBalance - a.normalBalance)
    })
  }
}
</script>
