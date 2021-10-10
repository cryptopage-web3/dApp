<template>
  <div class="main-right">
    <div id="right-sidebar">
      <div class="main-right-item">
        <connect />
      </div>
      <div class="main-right-item">
        <form>
          <div class="search-wr">
            <button class="search__btn">
              <img src="@/assets/img/search__btn_img2.png" alt="" />
            </button>
            <input
              type="text"
              placeholder="Search items, collections"
              class="search__input"
            />
          </div>
        </form>
      </div>
      <div class="main-right-item">
        <banner v-if="isAuth" />
        <balance />
      </div>
    </div>
  </div>
</template>
<script>
import { init as stickySidebarInit } from '~/utils/stickySidebar'

export default {
  components: {
    banner: async () =>
      await import('@/components/sidebar/right/SidebarRightBanner'),
    balance: async () =>
      await import('@/components/sidebar/right/SidebarRightBalance'),
    connect: async () =>
      await import('@/components/sidebar/right/SidebarRightConnect.vue')
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  },
  mounted() {
    stickySidebarInit('#right-sidebar', '.main-right')
  }
}
</script>
