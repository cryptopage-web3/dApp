<template>
  <div class="profile">
    <address-profile-top
      :address="address"
      :transactions-count="transactionsCount"
    />
    <address-profile-bottom />
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    },
    transactionsCount: {
      type: Number,
      required: true
    }
  }
}
</script>
