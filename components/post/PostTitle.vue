<template>
  <div class="post-title">
    Value: <b>{{ post.value }}</b>
    <br />
    GAS Price: <b>{{ post.gasPrice }}</b>
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
