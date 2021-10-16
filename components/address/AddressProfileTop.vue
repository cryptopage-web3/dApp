<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <img
          v-if="$store.getters['address/image']"
          :src="$store.getters['address/image']"
          :width="diameter"
          :height="diameter"
        />
        <jazzicon
          v-else
          :seed="10211"
          :address="$store.getters['address/address']"
          :diameter="diameter"
        />
      </div>
      <div class="profile-info">
        <div v-if="tokenName" class="profile-info__title">
          {{ tokenName }}
        </div>
        <div v-else class="profile-info__title">
          {{ $store.getters['address/address'] | shortAddress }}
        </div>
        <div class="profile-status">Status: <a href="#">Hello, World!</a></div>
        <div class="profile-info__text">
          {{ $store.getters['address/transactionsCount'] | humanizeCount }}
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
    tokenName() {
      const tokenName = this.$store.getters['address/name']
      const tokenSymbol = this.$store.getters['address/symbol']
      return tokenName && tokenSymbol ? `${tokenName} (${tokenSymbol})` : ''
    }
  }
}
</script>
