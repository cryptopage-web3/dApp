<template>
  <nuxt-link :to="`/${address}`" style="margin: 1em">
    <img v-if="src" :src="src" :width="`${diameter}`" :height="`${diameter}`" />
    <jazzicon v-else :seed="10211" :diameter="diameter" :address="address" />
    <span v-if="showAddress">{{ address | shortAddress(5, 7) }}</span>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      default: () => ''
    },
    src: {
      type: String,
      default: () => ''
    },
    showAddress: {
      type: Boolean,
      default: () => true
    },
    diameter: {
      type: Number,
      default: () => 25
    }
  }
}
</script>
