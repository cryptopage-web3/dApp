<template>
  <div id="profile-other" class="profile-other">
    <div class="profile-other-left">
      <nuxt-link
        :to="`/${address}`"
        exact-active-class=""
        active-class=""
        class="profile-other-name"
      >
        <jazzicon :address="address" :diameter="38" style="margin-right: 1em" />
      </nuxt-link>
      <nuxt-link
        :to="`/${address}`"
        exact-active-class=""
        active-class=""
        class="profile-other-name"
      >
        <div class="profile-other-name__top">
          <span> {{ $shortAddress(address) }} </span>
        </div>
        <span> {{ $humanizeCount(transactionsCount) }} Transactions </span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      default: () => '0x7eE2BBC5d5004683ed84035591582be1Fc4953F5'
    },
    transactionsCount: {
      type: Number,
      default: () => 0
    }
  }
}
</script>
