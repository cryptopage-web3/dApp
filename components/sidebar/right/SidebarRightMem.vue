<template>
  <nuxt-link
    :key="address"
    :to="`/${address}`"
    class="text-center"
    style="margin: 1em"
  >
    <img v-if="showImage" :src="src" class="main-mem" />
    <div style="color: black">{{ balance }}</div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    },
    showImage: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    balance: 0,
    src: ''
  }),
  async mounted() {
    await this.$nextTick(async () => {
      const selectedAddress = this.$store.getters['auth/selectedAddress']
      if (this.showImage) {
        this.src = await this.getSrc()
      }
      this.balance = await this.$getERC20Balance(selectedAddress, this.address)
    })
  },
  methods: {
    async getSrc() {
      const searchResults = await this.$lunr.lunr.search(this.address)
      const ref = searchResults[0] ? searchResults[0].ref : null
      const data = this.$lunr.getMeta(ref)
      return data ? data.logo_url.replace('32x32', '128x128') : ''
    }
  }
}
</script>
