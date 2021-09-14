<template>
  <div class="post">
    <div class="post-cont">
      <nuxt-link :to="`/${post.from}`" class="post-logo">
        <jazzicon :diameter="50" :address="post.from" />
      </nuxt-link>
      <div class="post-right">
        <account :post="post" />
        <post-title :post="post" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    account: async () => await import('@/components/post/PostAccount'),
    postTitle: async () => await import('@/components/post/PostTitle')
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
