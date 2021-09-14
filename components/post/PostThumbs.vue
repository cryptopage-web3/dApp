<template>
  <div class="post-thumbs">
    <a href="#" class="post-thumb" :style="style" />
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: `url(${this.post.image ? this.post.image : ''})`
      }
    }
  }
}
</script>
