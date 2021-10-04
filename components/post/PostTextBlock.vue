<template>
  <div class="post-text-block">
    <div class="post-text">{{ text }}</div>
    <div class="post-text-right">
      <a href="#" class="post-text__link">
        <img src="@/assets/img/post-text__link_img1_2.png" alt="" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
