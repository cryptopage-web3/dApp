<template>
  <div class="post-title">{{ title }}</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    }
  }
}
</script>
