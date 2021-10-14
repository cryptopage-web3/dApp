<template>
  <div class="main-center-cont">
    <div v-if="isOwner" class="tweet">
      <nft-form :settings="settings" />
    </div>
    <profile-bottom :transactions-count="transactionsCount" />
  </div>
</template>
<script>
export default {
  components: {
    'nft-form': async () => await import('@/components/nft-form/NFTForm.vue'),
    'profile-bottom': async () =>
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
