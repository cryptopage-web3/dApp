<template>
  <div class="profile-more-bottom">
    <div class="profile-more-follows">
      <div class="profile-more-follow">
        <strong> {{ $humanizeCount(user.transactions) }} </strong> Transactions
      </div>
      <div class="profile-more-follow">
        <strong> {{ $humanizeCount(user.blocks) }} </strong> Blocks
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        address: '0x7eE2BBC5d5004683ed84035591582be1Fc4953F5',
        transactions: 58400,
        blocks: 106
      })
    }
  }
}
</script>
