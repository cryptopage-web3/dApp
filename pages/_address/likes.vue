<template>
  <div class="posts">
    <div v-for="post in posts" :key="post.id">
      <post :post="post" />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    posts: []
  })
}
</script>
