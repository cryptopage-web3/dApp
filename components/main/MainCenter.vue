<template>
  <div class="main-center-cont">
    <div v-if="isOwner" class="tweet">
      <TweetAddForm :settings="settings" />
    </div>
    <ProfileBottom :user="user" />
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
    user: {
      type: Object,
      default: () => ({
        address: '0x7eE2BBC5d5004683ed84035591582be1Fc4953F5',
        transactions: 58400,
        blocks: 106
      })
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
