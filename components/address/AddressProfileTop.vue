<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <img v-if="image" :src="image" :width="diameter" :height="diameter" />
        <jazzicon
          v-else
          :seed="10211"
          :address="address"
          :diameter="diameter"
        />
      </div>
      <div class="profile-info">
        <div v-if="tokenName" class="profile-info__title">
          {{ tokenName }}
        </div>
        <div v-else class="profile-info__title">
          {{ address | shortAddress }}
        </div>
        <div class="profile-status">Status: <a href="#">Hello, World!</a></div>
        <div class="profile-info__text">
          {{ transactionsCount | humanizeCount }}
          transactions<br />
          0 inputs / 0 outputs
        </div>
      </div>
    </div>
    <div class="profile-right">
      <a href="#" class="profile-ring active">
        <img src="@/assets/img/profile-ring_img2.png" alt="" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    diameter: $(window).width() > 767 ? 90 : 40
  }),
  computed: {
    address() {
      return this.$store.getters['address/address']
    },
    image() {
      return this.$store.getters['address/image']
    },
    transactionsCount() {
      return this.$store.getters['address/transactionsCount']
    },
    tokenName() {
      const tokenName = this.$store.getters['address/name']
      const tokenSymbol = this.$store.getters['address/symbol']
      return tokenName && tokenSymbol ? `${tokenName} (${tokenSymbol})` : ''
    }
  }
}
</script>
