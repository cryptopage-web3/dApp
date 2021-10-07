<template>
  <div id="profile-other" class="profile-other">
    <div class="profile-other-left">
      <nuxt-link
        :to="`/${address}`"
        exact-active-class=""
        active-class=""
        class="profile-other-name"
      >
        <avatar
          :src="meta ? meta.logo_url : ''"
          :address="address"
          :diameter="38"
          :show-address="false"
        />
      </nuxt-link>
      <nuxt-link
        :to="`/${address}`"
        exact-active-class=""
        active-class=""
        class="profile-other-name"
      >
        <div class="profile-other-name__top">
          <span> {{ address | shortAddress }} </span>
        </div>
        <span> {{ transactionsCount | humanizeCount }} Transactions </span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    avatar: async () => await import('~/components/UserAvatar')
  },
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
