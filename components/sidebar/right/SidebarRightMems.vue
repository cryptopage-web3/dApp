<template>
  <div v-if="$store.getters['auth/isAuth']">
    <draggable
      v-model="mems"
      class="main-mems"
      group="mems"
      @start="drag = true"
      @end="drag = false"
    >
      <nuxt-link
        v-for="mem in mems"
        :key="mem.address"
        :to="`/${mem.address}`"
        class="text-center"
        style="margin: 1em"
      >
        <img :src="getImage(mem.address)" class="main-mem" />
        <div style="color: black">
          {{ getBalance(mem.address) }}
        </div>
      </nuxt-link>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data: () => ({
    mems: [
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
  }),
  methods: {
    getImage(address) {
      const searchResults = this.$lunr.lunr.search(address)
      const ref = searchResults[0] ? searchResults[0].ref : null
      const data = this.$lunr.getMeta(ref)
      return data ? data.logo_url.replace('32x32', '128x128') : ''
    },
    getBalance(contractAddress) {
      let balance = 0
      this.$getERC20Balance(
        this.$store.getters.selectedAddress,
        contractAddress
      ).then((result) => {
        balance = result
      })
      return balance
    }
  }
}
</script>
