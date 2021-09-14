<template>
  <div class="main-tabs">
    <div class="main-tabs-links">
      <a
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['', { active: currentTab === tab.name }]"
        class="main-tabs-link"
        @click="currentTab = tab.name"
      >
        <span>{{ tab.name }}</span></a
      >
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    currentTab: 'Tweets',
    tabs: [
      {
        name: 'Tweets'
      },
      {
        name: 'Tweets & replies'
      },
      {
        name: 'Media'
      },
      {
        name: 'Likes'
      }
    ]
  })
}
</script>
