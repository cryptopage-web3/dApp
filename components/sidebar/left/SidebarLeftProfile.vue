<template>
  <div class="sidebar-profile">
    <template v-if="isAuth">
      <SidebarLeftProfileDropdown v-if="dropdownShow" :address="address" />
      <a to="#" class="sidebar-profile__link" @click="dropdownOpen">
        <div>
          <div class="sidebar-profile__link-logo">
            <jazzicon :address="address" :diameter="40" />
          </div>
          <span>
            <mark>{{ shortAddress }}</mark>
          </span>
        </div>
        <Icon type="dots" />
      </a>
    </template>
    <template v-else>
      <button class="sidebar-profile__signin-btn" type="button" @click="signin">
        Sign in
      </button>
      <Signin ref="signin" />
    </template>
  </div>
</template>
<script>
export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon'),
    SidebarLeftProfileDropdown: async () =>
      await import('./SidebarLeftProfileDropdown.vue'),
    Signin: async () => await import('@/components/auth/Signin.vue')
  },
  data() {
    return {
      dropdownShow: false
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    },
    address() {
      return this.$store.getters['auth/selectedAddress']
    },
    shortAddress() {
      return this.$shortAddress(this.address)
    }
  },
  beforeMount() {
    if (process.browser) {
      const onClickOutside = (e) =>
        (this.dropdownShow = this.$el.contains(e.target) && this.dropdownShow)

      document.addEventListener('click', onClickOutside)
      this.$on('hook:beforeDestroy', () => {
        document.removeEventListener('click', onClickOutside)
      })
    }
  },
  methods: {
    dropdownOpen() {
      this.dropdownShow = !this.dropdownShow
    },
    signin() {
      this.$refs.signin.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-profile__link,
.sidebar-profile__link span mark,
.sidebar-profile__link span {
  cursor: pointer;
}
.sidebar-profile {
  position: relative;
}
</style>
