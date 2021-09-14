<template>
  <div v-if="!messages.length == 0" class="right-sidebar-follows">
    <div class="right-sidebar-follows__top">Last messages</div>
    <sidebar-right-message
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @remove="remove"
    />
    <div class="post-follow-bottom">
      <a href="/" class="post-follow-bottom__link"> Show more </a>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'sidebar-right-message': async () =>
      await import('@/components/sidebar/right/SidebarRightMessage')
  },
  data: () => ({
    messages: [
      {
        id: 0,
        title: 'Blackmaze',
        text: 'hghghdhdghdgd',
        href: '#'
      },
      {
        id: 1,
        title: 'Blackmaze',
        text: 'hghghdhdghdgd',
        href: '#'
      },
      {
        id: 2,
        title: 'Blackmaze',
        text: 'hghghdhdghdgd',
        href: '#'
      },
      {
        id: 3,
        title: 'Blackmaze',
        text: 'hghghdhdghdgd',
        href: '#'
      },
      {
        id: 4,
        title: 'Blackmaze',
        text: 'hghghdhdghdgd',
        href: '#'
      }
    ]
  }),
  methods: {
    remove(data) {
      this.messages = this.messages.filter((message) => message.id !== data.id)
    }
  }
}
</script>
