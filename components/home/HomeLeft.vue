<template>
  <div class="profile-left2">
    <div class="profile-menu-wrap">
      <div>
        <Header />
        <Connect v-if="!isAuth" />
        <Profile v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import Header from './left/Header.vue';
import Connect from './left/Connect.vue';
import Profile from './left/Profile.vue';
import { authModule, stickyModule } from '~/store';
import { accountLeftSidebarInit } from '~/utils/accountLeftSidebar';
import { leftStickySidebarInit } from '~/utils/leftStickySidebar';

@Component({
  components: {
    Header,
    Connect,
    Profile,
  },
})
export default class HomeLeft extends Vue {
  stickySidebar: any = null;
  timeout: any = null;

  get refresh() {
    return stickyModule.leftRefresh;
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  @Watch('isAuth')
  onIsAuthChange() {
    this.refreshSticky();
  }

  @Watch('refresh')
  onRefreshChange(refresh: boolean) {
    if (!refresh) {
      return;
    }

    this.refreshSticky();
    stickyModule.cleanLeft();
  }

  mounted() {
    accountLeftSidebarInit();

    setTimeout(() => {
      this.stickySidebar = leftStickySidebarInit();
    }, 100);
  }

  refreshSticky() {
    this.timeout && clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.stickySidebar && this.stickySidebar.updateSticky();
    }, 500);
  }
}
</script>
