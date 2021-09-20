<template>
  <div class="post-account">
    <div class="post-account-left">
      <nuxt-link :to="`/${address}`" class="post-logo">
        <jazzicon :seed="10211" :diameter="38" :address="address" />
      </nuxt-link>
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
  props: {
    address: {
      type: String,
      default: () => ''
    }
  }
}
</script>
