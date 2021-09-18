<template>
  <div class="main-center-cont">
    <div v-if="isOwner" class="tweet">
      <TweetAddForm :settings="settings" />
    </div>
    <ProfileBottom :transactions-count="transactionsCount" />
  </div>
</template>
<script>
export default {
  components: {
    TweetAddForm: async () =>
      await import('@/components/globals/tweets/TweetAddForm.vue'),
    ProfileBottom: async () =>
      await import('@/components/profile/ProfileMoreBottom')
  },
  props: {
    address: {
      type: String,
      required: true
    },
    transactionsCount: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({
    settings: {
      maxCount: 75,
      radius: 14,
      strokeColor: '#1da1f2',
      strokeWidth: 2,
      minHeight: 100
    }
  }),
  computed: {
    isOwner() {
      return this.$store.getters['auth/selectedAddress'] === this.address
    }
  }
}
</script>
