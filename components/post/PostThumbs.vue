<template>
  <div class="post-thumbs">
    <img :src="src" class="post-thumb" />
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: () => ''
    }
  }
}
</script>
