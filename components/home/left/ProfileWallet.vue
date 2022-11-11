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
        :value="address"
        readonly
        type="text"
        class="global-input global-input_large"
      />
      <a
        ref="refCopy"
        href="#"
        class="global-copy__link main-profile-copy"
        @click.prevent.stop="copyAddress"
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
import { copyToClipboard } from '~/utils/copyToClipboard';

@Component({
  components: {
    HomeExitIcon,
  },
})
export default class ProfileWallet extends Vue {
  get address(): string {
    return authModule.address;
  }

  $refs!: {
    refCopy: HTMLAnchorElement;
  };

  mounted() {
    this.$nextTick(() => {
      ($(this.$refs.refCopy) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy',
      });
    });
  }

  async logout() {
    await authModule.logout();
  }

  copyAddress() {
    copyToClipboard(this.address);
    ($(this.$refs.refCopy) as any).tooltip('hide');

    this.$notify({
      type: 'success',
      title: 'Address copied to clipboard',
    });
  }
}
</script>
