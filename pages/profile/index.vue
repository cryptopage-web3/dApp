<template>
  <div class="home">
    <div id="profile-other" class="profile-other">
      <div class="profile-other-left">
        <img
          class="menu-mobile-avatar"
          src="post-logo_img6.jpg"
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
import { authMixin } from '@/mixins/auth'

export default {
  mixins: [authMixin],
}
</script>
