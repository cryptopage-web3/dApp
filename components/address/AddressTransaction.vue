<template>
  <div class="transactions">
    <address-transaction-tabs :address="$route.params.address" />
    <div class="tab-content">
      <div class="tab-pane fade show active">
        <nuxt-child :transactions-count="transactionsCount" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    transactionsCount: {
      type: Number,
      required: true
    }
  }
}
</script>
