<template>
  <div class="chat-content">
    <div class="messages">
      <messages-list-item
        v-for="message in messages"
        :id="message.id"
        :key="message.id"
        :message="message"
        :sender="sender"
        :receiver="receiver"
      />
      <messages-list-empty :messages="messages" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    messagesListItem: async () =>
      await import('@/components/messages/MessagesListItem'),
    messagesListEmpty: async () =>
      await import('@/components/messages/MessagesListEmpty')
  },
  props: {
    receiver: {
      type: Object,
      default: () => ({})
    },
    sender: {
      type: Object,
      default: () => ({})
    },
    room: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    messages: []
  }),
  watch: {
    room: {
      handler(room) {
        this.subscribeMessage()
      }
    }
  },
  methods: {
    subscribeMessage() {
      setTimeout(() => {
        if (!this.room || !this.sender || !this.receiver) {
          return this.subscribeMessage()
        } else {
          this.messages = []
          this.$subscribeMessage(this.room, this.messageHandler)
        }
      }, 1000)
    },
    messageHandler(value, key, _msg, _ev) {
      if (!this.messages.some((message) => message.id === key)) {
        this.messages.push({ id: key, data: value })
        this.scrollHeight()
      }
    },
    scrollHeight() {
      const container = this.$el.querySelector('.messages')
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>
