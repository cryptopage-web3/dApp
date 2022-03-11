<template>
  <div id="profile-other" class="profile-other">
    <div class="profile-other-left">
      <img class="menu-mobile-avatar" src="post-logo_img6.jpg" />
      <jazzicon
        :seed="10211"
        :diameter="35"
        :address="sender.address"
        style="margin: 0 0.5em"
      />
      <jazzicon
        :seed="10211"
        :diameter="35"
        :address="receiver.address"
        style="margin: 0 0.5em"
      />
    </div>
    <a
      href="#"
      onclick="return false;"
      class="btn-info btn btn_blue btn_blue--bg"
      @click="modalKeys"
    >
      My keys
    </a>
  </div>
</template>
<script>
import modalKeys from './modals/Keys.vue'
export default {
  props: {
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
    modalKeys() {
      this.$modal.show(
        modalKeys,
        { classes: 'modal-message-keys' },
        {
          width: 600,
          height: 'auto',
          adaptive: true,
          shiftY: 0.1,
          name: 'messageKeys'
        }
      )
    }
  }
}
</script>
