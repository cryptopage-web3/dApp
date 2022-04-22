<template>
  <div class="main-right">
    <div id="right-sidebar" class="main-right__container">
      <div class="main-right-item">
        <connect />
      </div>
      <div class="main-right-item">
        <form>
          <div class="search-wr">
            <button class="search__btn">
              <img src="@/assets/img/search__btn_img2.svg" alt="" />
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
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import { init as stickySidebarInit } from '~/utils/stickySidebar'
import TypedStore from '~/logic/store'

@Component({
  components: {
    banner: async () =>
      await import('~/components/sidebar/right/SidebarRightBanner.vue'),
    balance: async () =>
      await import('~/components/sidebar/right/SidebarRightBalance.vue'),
    connect: async () => await import('@/components/connect/Connect.vue')
  }
})
export default class SidebarRight extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  mounted() {
    stickySidebarInit('#right-sidebar', '.main-right')
  }
}
</script>
