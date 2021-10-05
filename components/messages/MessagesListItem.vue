<template>
  <div class="post-follow">
    <div class="msg-ava tweet-add__user-image">
      <img src="default_profile_normal.png" />
    </div>
    <div class="post-follow-right" style="margin-left: 15px">
      <div class="post-follow-top">
        <div class="post-follow-account">
          <a href="#">
            <span :id="`address-${message.id}`"></span>
          </a>
          <span :id="`message-${message.id}`">
            {{ extractMessage(message) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => ({})
    },
    sender: {
      type: Object,
      default: () => ({})
    },
    receiver: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    extractMessage(message) {
      if (message.data.startsWith('SEA')) {
        const dec = JSON.parse(message.data.slice(3, message.data.length)).ct
        if (
          this.receiver &&
          this.receiver.epub &&
          this.sender &&
          this.sender.epub
        ) {
          try {
            this.$decrypt(message.data, this.receiver.epub, this.sender).then(
              (dec) => {
                if (dec) {
                  // document.getElementById(`address-${message.id}`).innerHTML =
                  // shortAddress(this.sender.address)
                  document.getElementById(`message-${message.id}`).innerHTML =
                    dec
                  return dec
                }
              }
            )
          } catch (error) {
            // document.getElementById(`address-${message.id}`).innerHTML =
            // 'Undefined user'
            document.getElementById(`message-${message.id}`).innerHTML = dec
          }
          return dec
        }
        return message
      }
    }
  }
}
</script>
