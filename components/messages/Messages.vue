<template>
  <div class="home chat">
    <messages-header
      v-if="sender && receiver"
      :sender="sender"
      :receiver="receiver"
    />
    <messages-list
      v-if="sender && receiver"
      :sender="sender"
      :receiver="receiver"
      :room="room"
    />
    <message-form
      v-if="sender && receiver"
      :sender="sender"
      :receiver="receiver"
      :room="room"
    />
  </div>
</template>
<script>
// import { shortAddress } from '~/utils'
export default {
  components: {
    messageForm: async () => await import('@/components/messages/MessageForm'),
    messagesList: async () =>
      await import('@/components/messages/MessagesList'),
    messagesHeader: async () =>
      await import('@/components/messages/MessagesHeader')
  },
  props: {
    sender: {
      type: Object,
      default: () => ({})
    },
    receiver: {
      type: Object,
      default: () => ({})
    },
    room: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    receiver: {
      deep: true,
      handler(pair) {
        if (!pair.epub && pair.address) {
          this.$notify({
            type: 'error',
            title: `${pair.address} has no keys`
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  max-width: 100%;
  min-width: 100%;
  min-height: 52px;
  max-height: 52px;
  border: 0;
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    width: 1px; /* ширина для вертикального скролла */
    height: 8px; /* высота для горизонтального скролла */
    background-color: transparent;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 50px;
    box-shadow: inset 1px 1px 10px #f3faf7;
  }
}
.post-follow-right {
  width: calc(100% - 72px);
}
.post-follow-top span {
  word-break: break-word;
  line-height: 24px;
}
.post-follow {
  &:hover {
    background: transparent;
    color: default;
  }
}
.profile-other-name__top span {
  display: flex;
  align-items: center;
}
.profile-other-name__top span > b {
  color: #fff;
  font-size: 14px;
  width: 26px;
  border-radius: 50px;
  background: rgba(#1da1f2, 0.2);
  color: #1da1f2;
  height: 26px;
  display: flex;
  text-align: center;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
</style>
