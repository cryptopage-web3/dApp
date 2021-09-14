<template>
  <div class="main-tabs">
    <div class="main-tabs-links">
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="`/${address}/${tab.link}`"
        :exact-active-class="address"
        active-class="active"
        class="main-tabs-link"
        exact
      >
        <span>{{ tab.name }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data: () => ({
    tabs: [
      {
        link: '',
        name: 'Transactions'
      },
      {
        link: 'replies',
        name: 'Tweets & replies'
      },
      {
        link: 'media',
        name: 'Media'
      },
      {
        link: 'likes',
        name: 'Likes'
      }
    ]
  })
}
</script>
