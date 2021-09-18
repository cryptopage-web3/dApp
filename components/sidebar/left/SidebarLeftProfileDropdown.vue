<template>
  <div class="dropdown dropdown-profile">
    <div class="sidebar-profile">
      <router-link :to="`/${address}`" class="sidebar-profile__link">
        <div>
          <div class="sidebar-profile__link-logo">
            <jazzicon :address="address" :diameter="40" />
          </div>
          <span>
            <mark>{{ shortAddress }}</mark>
          </span>
        </div>
      </router-link>
    </div>
    <button
      class="list-dropdown__link d-flex align-center justify-content-center"
      @click="signout"
    >
      Log out
    </button>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    }
  },
  computed: {
    shortAddress() {
      return this.$shortAddress(this.address)
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('auth/signout')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-profile__link {
  border-radius: 0;
}

.list-dropdown__link {
  border: none;
}

.sidebar-profile {
  position: relative;
  border-bottom: 1.6px solid #eff3f4;
}
</style>
