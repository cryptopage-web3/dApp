<template>
  <div>
    <layout-notification />
    <layout-cookies />
    <layout-header />

    <nuxt />

    <layout-footer />
    <onboarding-modals />

    <client-only>
      <NftFormModal />
      <NftSuccessModal />
      <ConnectModal />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import NftFormModal from '~/components/nft-form/modal/Modal.vue';
import NftSuccessModal from '~/components/nft-form/modal-success/ModalSuccess.vue';
import ConnectModal from '~/components/connect/ConnectModal.vue';

@Component({
  components: {
    NftFormModal,
    NftSuccessModal,
    ConnectModal,
  },
})
export default class DefaultLayout extends Vue {}
</script>
