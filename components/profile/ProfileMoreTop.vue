<template>
  <div class="profile-more">
    <div class="profile-more-top">
      <jazzicon :address="user.username" :diameter="128" />
      <div>
        <div class="profile-more-top-menu">
          <router-link to="/" exact-active-class="" active-class="">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </g>
            </svg>
          </router-link>
        </div>
        <router-link
          id="profile-more-top__follow"
          to="/"
          exact-active-class=""
          active-class=""
          class="profile-more-top__follow btn btn_blue btn_transparent"
        >
          Follow
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        username: 'elonmusk',
        firstName: 'Elon',
        lastName: 'Musk',
        tweets: 14900,
        followers: 58400,
        following: 106,
        text: 'meme necromancy while u wait',
        joined: 'June 2009',
        topThumbnail: require('@/assets/img/profile-more-top__thumb_bg.png'),
        centerThumbnail: require('@/assets/img/main-center-thumbnail_bg.jpg')
      })
    }
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  }
}
</script>
