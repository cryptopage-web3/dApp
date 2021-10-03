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
            <mark>{{ address | shortAddress }}</mark>
          </span>
        </div>
        <Icon type="dots" />
      </a>
      <SidebarLeftNetworkDropdown
        v-if="networkDropdownShow"
        :change-chain="changeChain"
      />
      <a
        v-if="$provider.providerName === 'metamask'"
        to="#"
        class="sidebar-profile__link"
        @click="networkDropdownOpen"
      >
        <div>
          <span>
            <mark>{{
              $provider._CHAINS_BY_CHAIN_ID[$store.getters['auth/chainId']]
            }}</mark>
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
    SidebarLeftNetworkDropdown: async () =>
      await import('./SidebarLeftNetworkDropdown.vue'),
    Signin: async () => await import('@/components/auth/Signin.vue')
  },
  data() {
    return {
      dropdownShow: false,
      networkDropdownShow: false
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    },
    address() {
      return this.$store.getters['auth/selectedAddress']
    }
  },
  beforeMount() {
    if (process.browser) {
      const onClickOutside = (e) => {
        this.dropdownShow = this.$el.contains(e.target) && this.dropdownShow
        this.networkDropdownShow =
          this.$el.contains(e.target) && this.networkDropdownShow
      }
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
    changeChain(value) {
      this.networkDropdownOpen()
      this.$provider.switchChain(value)
    },
    networkDropdownOpen() {
      this.networkDropdownShow = !this.networkDropdownShow
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
