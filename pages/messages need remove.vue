<template>
  <div class="home chat">
    <div id="profile-other" class="profile-other">
      <div class="profile-other-left">
        <img
          class="menu-mobile-avatar"
          :src="require('@/assets/img_old/post-logo_img6.jpg')"
          @click="mobileOpen"
        />
        <router-link
          to="/"
          exact-active-class=""
          active-class=""
          class="profile-other-name"
        >
          <div class="profile-other-name__top">
            <span
              >Messages <b>{{ messages.length }}</b></span
            >
          </div>
        </router-link>
      </div>
      <a
        href="#"
        onclick="return false;"
        class="btn-info btn btn_blue btn_blue--bg"
        @click="modalKeys"
        >My keys</a
      >
    </div>
    <div class="chat-content">
      <div class="messages">
        <div
          v-for="message in messages"
          :id="message.id"
          :key="message.id"
          class="post-follow"
        >
          <div class="msg-ava tweet-add__user-image">
            <img
              :src="require('@/assets/img_old/default_profile_normal.png')"
            />
          </div>
          <div class="post-follow-right" style="margin-left: 15px">
            <div class="post-follow-top">
              <div class="post-follow-account">
                <a href="#"> Blackmaze </a>
                <span>{{ extractMessage(message) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!messages.length"
          class="msg-not-found d-flex justify-center align-center flex-column"
        >
          <Icon type="messages_empty" />
          <span>Messages not found</span>
        </div>
      </div>
    </div>
    <div class="main-center-count">
      <div class="tweet-add chat-add d-flex align-start justify-space-between">
        <div class="tweet-add__user">
          <nuxt-link to="/media/1" class="tweet-add__user-image">
            <img
              :src="require('@/assets/img_old/default_profile_normal.png')"
            />
          </nuxt-link>
        </div>
        <div
          class="tweet-add__form d-flex flex-column"
          :class="checked ? `` : `disabled`"
        >
          <form @submit.prevent="send">
            <div class="tweet-add__message">
              <label v-if="labelShow">What's happening?</label>
              <input
                v-model="text"
                class="tweet-add__input"
                type="text"
                @input="handleInput"
              />
            </div>
            <div
              class="
                tweet-add__buttons
                d-flex
                align-center
                justify-start
                flex-wrap
              "
            >
              <div class="tweet-add__send d-flex align-center">
                <button
                  type="submit"
                  href="#"
                  class="post-follow-top__link btn btn_blue btn_blue--bg"
                  :disabled="!checked"
                  style="margin-right: 10px"
                >
                  Send
                </button>
                <Progress
                  v-if="!labelShow"
                  :value="count"
                  :radius="14"
                  :stroke-width="2"
                  stroke-color="#1da1f2"
                >
                  <div class="content">{{ text.length }}</div>
                </Progress>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalKeys from '@/components/modals/messages/Keys.vue'
import MobileMenu from '@/components/modals/globals/MobileMenu.vue'
import { authMixin } from '@/mixins/auth'

export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon')
  },
  mixins: [authMixin],
  data: () => ({
    sender: null,
    receiver: null,
    checked: false,
    labelShow: true,
    count: null,
    maxCount: 30,
    topic: 'messages',
    text: '',
    messages: []
  }),
  async mounted() {
    await this.$nextTick(async () => {
      this.sender = await this.$pair()
      this.receiver = await this.$pair()
      this.$subscribeMessage(this.topic, this.messageHandler)
    })
  },
  methods: {
    mobileOpen() {
      this.$modal.show(
        MobileMenu,
        { classes: '' },
        {
          width: 280,
          height: 'auto',
          adaptive: true,
          shiftY: 0,
          shiftX: 0,
          name: 'MobileMenu'
        }
      )
    },
    handleInput() {
      if (this.count >= this.maxCount) {
        this.count = 0
      }
      this.count = (this.text.length * 100) / this.maxCount
      if (this.text.length <= 0) {
        this.labelShow = true
      } else {
        this.labelShow = false
        this.checked = true
      }
      if (this.text.length >= this.maxCount + 1) {
        this.count = 100
        this.checked = false
      }
      if (this.text.length <= 0) {
        this.checked = false
      }
    },
    scrollHeight() {
      const container = this.$el.querySelector('.messages')
      container.scrollTop = container.scrollHeight
    },
    messageHandler(value, key, _msg, _ev) {
      this.messages.push({ id: key, data: value })
      this.scrollHeight()
    },
    extractMessage(message) {
      if (message.data.startsWith('SEA')) {
        this.$decrypt(message.data, this.sender.epub, this.receiver).then(
          (dec) => {
            if (dec) {
              document.getElementById(message.id).innerHTML = `
                <div class="msg-ava tweet-add__user-image">
                  <img src="${require('@/assets/img_old/default_profile_normal.png')}">
                </div>
                <div class="post-follow-right" style="margin-left: 15px;">
                  <div class="post-follow-top">
                    <div class="post-follow-account">
                      <a href="#">Blackmaze</a>
                      <span>${dec}</span>
                    </div>
                  </div>
                </div>
              `
              this.scrollHeight()
            }
          }
        )
        return JSON.parse(message.data.slice(3, message.data.length)).ct
      }
      return message
    },
    modalKeys() {
      this.$modal.show(
        ModalKeys,
        { classes: 'modal-message-keys' },
        {
          width: 600,
          height: 'auto',
          adaptive: true,
          shiftY: 0.1,
          name: 'messageKeys'
        }
      )
    },
    async send() {
      const enc = await this.$encrypt(
        this.text,
        this.receiver.epub,
        this.sender
      )
      this.$sendMessage(enc, this.topic)
      this.text = ''
      this.count = 0
      this.labelShow = true
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
