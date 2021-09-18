<template>
  <div class="home">
    <div id="profile-other" class="profile-other">
      <div class="profile-other-left">
        <img
          class="menu-mobile-avatar"
          src="post-logo_img6.jpg"
          @click="mobileOpen"
        />
        <router-link
          to="/"
          exact-active-class=""
          active-class=""
          class="profile-other-name"
        >
          <div class="profile-other-name__top">
            <span>Profile</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import MobileMenu from '@/components/modals/globals/MobileMenu.vue'
import { authMixin } from '@/mixins/auth'

export default {
  mixins: [authMixin],
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
    }
  }
}
</script>
