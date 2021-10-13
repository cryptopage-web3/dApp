<template>
  <div class="white-post-top">
    <div class="post-date">
      <a href="#" class="post-date__link">
        <img src="@/assets/img/post-date__link_img.png" alt="" />
      </a>
      <div class="post-date__text">{{ date | normalizeDate }}</div>
    </div>
    <div class="white-post-id">Eth: {{ hash | shortAddress(5, 7) }}</div>
  </div>
</template>
<script>
export default {
  props: {
    hash: {
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
