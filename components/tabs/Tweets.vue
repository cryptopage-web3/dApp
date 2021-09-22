<template>
  <div class="posts">
    <div v-for="post in posts" :key="post.id">
      <post />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    posts: [
      {
        id: 0,
        user: {
          username: 'elonmusk',
          firstName: 'Elon',
          lastName: 'Musk'
        },
        title:
          'Dragon has autonomously re-docked with the <a href="#">@Space_Station</a>',
        date: 123123123
      }
    ],
    settings: {
      infinite: false,
      variableWidth: true
    }
  })
}
</script>
