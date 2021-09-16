<template>
  <div class="profile-more-bottom">
    <div class="profile-more-follows">
      <div class="profile-more-follow">
        <strong> {{ $humanizeCount(transactionsCount) }} </strong> Transactions
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    transactionsCount: {
      type: Number,
      default: () => 0
    }
  }
}
</script>
