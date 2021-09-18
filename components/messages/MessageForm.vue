<template>
  <div class="main-center-count">
    <div class="tweet-add chat-add d-flex align-start justify-space-between">
      <div class="tweet-add__user">
        <nuxt-link to="/media/1" class="tweet-add__user-image">
          <img src="default_profile_normal.png" />
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
</template>
<script>
export default {
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
    checked: false,
    labelShow: true,
    count: null,
    maxCount: 30,
    text: ''
  }),
  methods: {
    handleInput(e) {
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
    async send() {
      if (this.text && this.receiver.epub && this.sender) {
        const enc = await this.$encrypt(
          this.text,
          this.receiver.epub,
          this.sender
        )
        this.$sendMessage(enc, this.room)
        this.text = ''
        this.count = 0
        this.labelShow = true
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
</style>
