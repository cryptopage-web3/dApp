<template>
  <div class="post-bottom">
    <post-button type="comments" :count="post.comments" />
    <post-button type="retweets" :count="post.retweets" />
    <post-button type="likes" :count="post.likes" />
    <post-button type="share" />
  </div>
</template>
<script>
export default {
  components: {
    'post-button': async () => await import('@/components/post/PostButton')
  },
  props: {
    post: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
