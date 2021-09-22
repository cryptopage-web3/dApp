<template>
  <div class="post-account">
    <div class="post-account-left">
      <avatar
        class="post-logo"
        :address="address"
        :show-address="false"
        :diameter="38"
      />
      <div class="post-account__link">
        <nuxt-link :to="`/${address}`">
          <span>
            {{ address | shortAddress }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    avatar: async () => await import('@/components/UserAvatar')
  },
  props: {
    address: {
      type: String,
      default: () => ''
    }
  }
}
</script>
