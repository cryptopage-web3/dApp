<template>
  <div>
    <div class="main-profile-wallet-top">
      <h3 class="market-sidebar__title">My Wallet</h3>
      <a href="#" class="main-profile-wallet-link" @click.prevent="logout">
        <HomeExitIcon />
      </a>
    </div>
    <div class="main-profile-copy-wrap global-copy">
      <input
        value="0xd7765d5feddd42c8ddf..."
        type="text"
        class="global-input global-input_large"
      />
      <a
        href="#"
        class="global-copy__link main-profile-copy"
        data-clipboard-text="0xd7765d5feddd42c8ddf..."
        data-toggle="tooltip"
        title="Copied!"
        data-trigger="focus"
      >
        <img src="@/assets/img/spaces_copy_icon.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import HomeExitIcon from '~/components/icon/home/HomeExitIcon.vue';
import { authModule } from '~/store';

@Component({
  components: {
    HomeExitIcon,
  },
})
export default class ProfileWallet extends Vue {
  async logout() {
    await authModule.logout();
  }
}
</script>
