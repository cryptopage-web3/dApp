<template>
  <div class="transactions">
    <transactions :address="$route.params.address" :types="types" />
  </div>
</template>
<script>
export default {
  components: {
    transactions: () => import('~/components/AddressTransactionList.vue')
  },
  data: () => ({
    types: ['transactions', 'nft', 'tokens', 'likes']
  })
}
</script>
