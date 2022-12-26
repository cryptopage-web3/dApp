<template>
  <div>
    <div class="profile-iu mb_20">
      <div class="profile-iu__avatar">
        <jazzicon :seed="10211" :address="address" :diameter="diameter" />
      </div>
      <div class="profile-iu__right">
        <div class="profile-iu__top mb-0">
          <div class="profile-iu__nik">
            <a ref="address" href="#" @click.prevent="copyAddress">
              {{ address | shortAddress }}
            </a>
            <div v-if="isVerified" class="profile-iu__nik-icon">
              <ProfileVerifiedIcon />
            </div>
          </div>
          <div v-if="!isOwner" class="d-flex align-items-center">
            <a href="#" class="other-profile-share">
              <ProfileShareIcon />
            </a>
            <a
              href="#"
              class="btn-blue-transparent_button btn_transparent-img profile-iu__status"
              @click.prevent="sendMessage"
            >
              <span>Send message</span>
              <ProfileMessageIcon />
            </a>
          </div>
        </div>
        <nuxt-link
          v-if="isOwner"
          to="/profile/settings"
          class="profile-iu__status2"
        >
          Set the status
        </nuxt-link>
        <a v-else href="#" class="profile-iu__status2" @click.prevent="">
          User status not set
        </a>
        <div class="profile-iu__middle mb-0">
          <strong>{{ transactionCount }}</strong> transactions /
          <strong>{{ inputs }}</strong> inputs /
          <strong>{{ outputs }}</strong> outputs
        </div>
      </div>
    </div>
    <nft-form />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { addressModule, authModule } from '~/store';
import { copyToClipboard } from '~/utils/copyToClipboard';
import ProfileShareIcon from '~/components/icon/profile/ProfileShareIcon.vue';
import ProfileMessageIcon from '~/components/icon/profile/ProfileMessageIcon.vue';
import ProfileVerifiedIcon from '~/components/icon/profile/ProfileVerifiedIcon.vue';

@Component({
  components: {
    ProfileShareIcon,
    ProfileMessageIcon,
    ProfileVerifiedIcon,
  },
})
export default class AddressProfile extends Vue {
  diameter = process.browser
    ? Number($(window).width()) > 767
      ? 100
      : 50
    : 100;

  $refs!: {
    address: HTMLSpanElement;
  };

  get address(): string {
    return addressModule.address;
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  get transactionCount() {
    return addressModule.transactions.count;
  }

  get inputs() {
    return addressModule.inputs;
  }

  get outputs() {
    return addressModule.outputs;
  }

  get isVerified() {
    return authModule.verifiedStatus.isVerified;
  }

  mounted() {
    this.$nextTick(() => {
      /** tooltip копирование адреса */
      ($(this.$refs.address) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy',
      });
    });
  }

  // methods

  copyAddress() {
    copyToClipboard(this.address);
    ($(this.$refs.address) as any).tooltip('hide');

    this.$notify({
      type: 'success',
      title: 'Address copied to clipboard',
    });
  }

  sendMessage() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to send a message',
      });

      return;
    }

    this.$notify({
      type: 'error',
      title: 'Sending a message is temporarily unavailable',
    });
  }
}
</script>
