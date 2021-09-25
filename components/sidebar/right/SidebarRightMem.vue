<template>
  <div class="column">
    <nuxt-link
      :key="token.tokenInfo.address"
      :to="`/${token.tokenInfo.address}`"
    >
      <img :src="token.tokenInfo.image" height="50px" width="50px" />
    </nuxt-link>
    <div style="color: black">{{ token.normalBalance.toFixed(2) }}</div>
    <div style="color: black">{{ token.USDBalance.toFixed(2) }} $</div>
  </div>
</template>
<script>
export default {
  props: {
    token: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
  text-align: center;
  width: 75px;
}
</style>
