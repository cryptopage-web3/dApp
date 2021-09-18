<template>
  <div id="profile-other" class="profile-other">
    <div class="profile-other-left">
      <img
        class="menu-mobile-avatar"
        src="post-logo_img6.jpg"
        @click="mobileOpen"
      />
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
      <!--router-link
          to="/"
          exact-active-class=""
          active-class=""
          class="profile-other-name"
        >
          <div class="profile-other-name__top">
            <span>
              Messages <b>{{ messages.length }}</b>
            </span>
          </div>
        </router-link-->
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
import modalKeys from '@/components/modals/messages/Keys.vue'
import mobileMenu from '@/components/modals/globals/MobileMenu.vue'
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
    mobileOpen() {
      this.$modal.show(
        mobileMenu,
        { classes: '' },
        {
          width: 280,
          height: 'auto',
          adaptive: true,
          shiftY: 0,
          shiftX: 0,
          name: 'mobileMenu'
        }
      )
    },
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
