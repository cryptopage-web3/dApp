<template>
  <div class="white-post-top">
    <div class="post-date">
      <a href="#" class="post-date__link">
        <img src="@/assets/img/post-date__link_img.png" alt="" />
      </a>
      <div class="post-date__text">{{ date | humanizeDate }}</div>
    </div>
    <nuxt-link :to="`/${address}`">
      <div class="white-post-id">Eth: {{ address | shortAddress(5, 7) }}</div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }
}
</script>
