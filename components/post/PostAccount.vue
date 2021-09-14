<template>
  <div class="post-account">
    <div class="post-account-left">
      <div class="post-account__link">
        <span>
          {{ $shortAddress(post.from) }}
        </span>
      </div>
      to {{ $shortAddress(post.to) }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
