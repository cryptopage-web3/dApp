<template>
  <div>
    <blocks />
  </div>
</template>
<script>
export default {
  components: {
    blocks: () => import('~/components/BlockList.vue')
  }
}
</script>
<style scoped>
.block {
  margin: 1em;
}
</style>
