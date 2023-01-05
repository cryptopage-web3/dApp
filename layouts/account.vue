<template>
  <div>
    <layout-notification />
    <layout-cookies />
    <layout-header />

    <section id="profile" class="profile height-full">
      <div class="container">
        <div class="profile-wrap">
          <account-left-sidebar />
          <nuxt />
          <account-right-sidebar v-if="showRightSidebar" />
        </div>
      </div>
    </section>

    <layout-footer />
    <onboarding-modals />

    <client-only>
      <NftFormModal />
      <NftSuccessModal />
      <SignupModal />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import NftFormModal from '~/components/nft-form/modal/Modal.vue';
import NftSuccessModal from '~/components/nft-form/modal-success/ModalSuccess.vue';
import SignupModal from '~/components/signup-modal/SignupModal.vue';
import { authModule } from '~/store';

@Component({
  components: {
    NftFormModal,
    NftSuccessModal,
    SignupModal,
  },
})
export default class AccountLayout extends Vue {
  get showRightSidebar(): boolean {
    return !(
      this.$route.name && ['profile-settings'].includes(this.$route.name)
    );
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  @Watch('isAuth', { immediate: true })
  onIsAuthChange(isAuth: boolean) {
    if (!isAuth) {
      return;
    }

    this.$nextTick(() => {
      authModule.setShowSignupModal(true);
    });
  }
}
</script>
