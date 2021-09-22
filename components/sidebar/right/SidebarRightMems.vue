<template>
  <div v-if="$store.getters['auth/isAuth']">
    <draggable
      v-model="items"
      class="main-mems"
      group="mems"
      @start="drag = true"
      @end="drag = false"
    >
      <item
        v-for="item in items"
        :key="item.address"
        :address="item.address"
        :symbol="item.symbol"
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
    items: [
      {
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        symbol: 'USDT'
      },
      {
        symbol: 'ALK',
        address: '0x6C16119B20fa52600230F074b349dA3cb861a7e3'
      },
      {
        symbol: 'L1T',
        address: '0x30baadb0c58a913934082962512c1aab1e596fef'
      },
      {
        symbol: 'PURR',
        address: '0xE581F272706581F9Dcc362dF3C7934E99192c492'
      }
    ]
  })
}
</script>
