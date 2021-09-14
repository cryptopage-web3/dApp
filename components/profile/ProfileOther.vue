<template>
  <div id="profile-other" class="profile-other">
    <div class="profile-other-left">
      <router-link
        to="/"
        exact-active-class=""
        active-class=""
        class="profile-other__back"
      >
        <jazzicon :address="user.address" :diameter="38" />
      </router-link>
      <router-link
        to="/"
        exact-active-class=""
        active-class=""
        class="profile-other-name"
      >
        <div class="profile-other-name__top">
          <span>
            {{ shortAddress }}
          </span>
        </div>
        <span> {{ $humanizeCount(user.transactions) }} Transactions </span>
      </router-link>
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
        transactions: 14900
      })
    }
  },
  computed: {
    shortAddress() {
      return this.$shortAddress(this.user.address)
    }
  }
}
</script>
